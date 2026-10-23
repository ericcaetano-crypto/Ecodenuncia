const STORAGE_KEY = "ecodenuncia_reports_v1";
const $ = (id) => document.getElementById(id);
let reports = loadReports();
let isAdmin = false;

function loadReports() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveReports() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  renderAll();
}
function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
function statusClass(status) {
  if (status === "Resolvida") return "resolved";
  if (status === "Em análise") return "analysis";
  return "";
}
function renderStats() {
  $("totalReports").textContent = reports.length;
  $("openReports").textContent = reports.filter(r => r.status !== "Resolvida").length;
  $("resolvedReports").textContent = reports.filter(r => r.status === "Resolvida").length;
}
function renderReports() {
  const query = $("searchReports").value.trim().toLowerCase();
  const filter = $("statusFilter").value;
  const filtered = reports.filter(r =>
    (!filter || r.status === filter) &&
    (!query || `${r.title} ${r.neighborhood} ${r.location} ${r.category}`.toLowerCase().includes(query))
  ).sort((a,b) => b.createdAt - a.createdAt);
  $("reportsList").innerHTML = filtered.map(r => `
    <article class="report-card">
      <span class="report-category">${escapeHTML(r.category)}</span>
      <span class="status ${statusClass(r.status)}">${escapeHTML(r.status)}</span>
      <h3>${escapeHTML(r.title)}</h3>
      <p>📍 ${escapeHTML(r.location)} — ${escapeHTML(r.neighborhood)}</p>
      <p>${escapeHTML(r.description || "Sem descrição adicional.")}</p>
      <p>Registrada em ${new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
      ${r.photo ? `<img class="report-photo" src="${r.photo}" alt="Foto anexada à denúncia">` : ""}
    </article>`).join("");
  $("emptyReports").classList.toggle("hidden", filtered.length > 0);
}
function renderAdmin() {
  $("adminReports").innerHTML = reports.length ? reports.slice().sort((a,b)=>b.createdAt-a.createdAt).map(r => `
    <div class="admin-row">
      <div><strong>${escapeHTML(r.title)}</strong><small>${escapeHTML(r.neighborhood)} • ${escapeHTML(r.location)}</small></div>
      <select aria-label="Status de ${escapeHTML(r.title)}" data-status-id="${r.id}">
        ${["Recebida","Em análise","Resolvida"].map(s=>`<option ${s===r.status?"selected":""}>${s}</option>`).join("")}
      </select>
      <button type="button" data-delete-id="${r.id}">Excluir registro</button>
    </div>`).join("") : `<p class="muted">Nenhuma denúncia registrada.</p>`;
}
function renderAll() { renderStats(); renderReports(); if (isAdmin) renderAdmin(); }
$("reportDate").value = new Date().toISOString().slice(0,10);
$("reportForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = $("reportPhoto").files[0];
  let photo = "";
  if (file) {
    if (!file.type.startsWith("image/")) { $("formMessage").textContent = "Selecione um arquivo de imagem."; return; }
    if (file.size > 1200000) { $("formMessage").textContent = "A imagem deve ter até 1,2 MB neste protótipo."; return; }
    photo = await new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file);
    });
  }
  const report = {
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    title: $("reportTitle").value.trim(), category: $("reportCategory").value,
    location: $("reportLocation").value.trim(), neighborhood: $("reportNeighborhood").value.trim(),
    dateObserved: $("reportDate").value, description: $("reportDescription").value.trim(),
    latitude: $("latitude").value, longitude: $("longitude").value, photo,
    status: "Recebida", createdAt: Date.now()
  };
  reports.push(report); saveReports();
  $("reportForm").reset(); $("reportDate").value = new Date().toISOString().slice(0,10);
  $("formMessage").textContent = "Denúncia registrada neste navegador. Obrigado por contribuir!";
  $("denuncias").scrollIntoView({behavior:"smooth"});
});
$("getLocation").addEventListener("click", () => {
  const msg = $("formMessage");
  if (!navigator.geolocation) { msg.textContent = "Este navegador não oferece geolocalização."; return; }
  msg.textContent = "Solicitando permissão de localização…";
  navigator.geolocation.getCurrentPosition(pos => {
    $("latitude").value = pos.coords.latitude.toFixed(6);
    $("longitude").value = pos.coords.longitude.toFixed(6);
    msg.textContent = "Localização preenchida. Confira o endereço antes de enviar.";
  }, () => { msg.textContent = "Não foi possível obter a localização. Verifique a permissão do navegador."; }, {enableHighAccuracy:true, timeout:10000});
});
$("searchReports").addEventListener("input", renderReports);
$("statusFilter").addEventListener("change", renderReports);
$("adminOpen").addEventListener("click", () => {
  $("adminModal").classList.remove("hidden");
  $("adminLoginView").classList.toggle("hidden", isAdmin);
  $("adminDashboard").classList.toggle("hidden", !isAdmin);
  if (isAdmin) renderAdmin();
});
$("adminClose").addEventListener("click", () => $("adminModal").classList.add("hidden"));
$("adminModal").addEventListener("click", e => { if (e.target === $("adminModal")) $("adminModal").classList.add("hidden"); });
$("adminLoginForm").addEventListener("submit", e => {
  e.preventDefault();
  if ($("adminUser").value === "admin" && $("adminPassword").value === "admin123") {
    isAdmin = true;
    $("adminLoginView").classList.add("hidden");
    $("adminDashboard").classList.remove("hidden");
    $("loginMessage").textContent = "";
    renderAdmin();
  } else $("loginMessage").textContent = "Usuário ou senha inválidos.";
});
$("adminLogout").addEventListener("click", () => {
  isAdmin = false; $("adminPassword").value = "";
  $("adminDashboard").classList.add("hidden"); $("adminLoginView").classList.remove("hidden");
});
$("adminReports").addEventListener("change", e => {
  const id = e.target.dataset.statusId;
  if (!id) return;
  const report = reports.find(r => r.id === id);
  if (report) { report.status = e.target.value; saveReports(); }
});
$("adminReports").addEventListener("click", e => {
  const id = e.target.dataset.deleteId;
  if (!id) return;
  if (confirm("Deseja excluir esta denúncia deste navegador?")) {
    reports = reports.filter(r => r.id !== id); saveReports();
  }
});
renderAll();
