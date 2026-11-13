# EcoDenúncia

> Sistema de Denúncia e Gestão de Resíduos Urbanos

![Status](https://img.shields.io/badge/status-protótipo%20acadêmico-yellow)
![Front-end](https://img.shields.io/badge/front--end-HTML%20%7C%20CSS%20%7C%20JS-1a6b4f)
![IFRN](https://img.shields.io/badge/IFRN-PDS%20%E2%80%A2%20Grupo%206-blue)

<!-- Opcional: adicione aqui uma captura de tela da aplicação -->
<!-- ![Tela inicial do EcoDenúncia](docs/tela-inicial.png) -->

## Sumário

- [Descrição](#descrição)
- [Objetivos](#objetivos)
- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Limitações do protótipo](#limitações-do-protótipo)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Equipe](#equipe)

---

## Descrição

O **EcoDenúncia** é um protótipo de aplicação web para **denúncia e gestão de resíduos urbanos** no município de **São Gonçalo do Amarante/RN**.

O problema que o projeto busca enfrentar é o descarte irregular de lixo e entulho em locais inadequados, que costuma ser difícil de registrar e acompanhar. Com o EcoDenúncia, o cidadão registra a ocorrência informando tipo, endereço, bairro e foto, e uma pessoa administradora acompanha cada denúncia e atualiza seu status.

> **Atenção:** esta entrega é um **protótipo front-end acadêmico**, não um sistema pronto para produção. Os horários de coleta e os registros de denúncia são **fictícios** e não representam dados oficiais. Veja as [limitações](#limitações-do-protótipo).

Projeto desenvolvido na disciplina de **PDS** do **IFRN**, pelo Grupo 6.

## Objetivos

**Objetivo geral:** facilitar o registro, o acompanhamento e a resolução de ocorrências de descarte irregular de resíduos urbanos.

**Objetivos específicos:**

- Permitir que o cidadão cadastre denúncias com título, tipo, endereço, bairro e foto;
- Disponibilizar a consulta das denúncias, com pesquisa por bairro/título e filtro por status;
- Apoiar o registro da localização por meio da geolocalização do navegador;
- Permitir que a administração altere o status das denúncias;
- Apresentar indicadores resumidos das ocorrências;
- Servir de base para uma futura versão com back-end e banco de dados MySQL.

## Funcionalidades

| Funcionalidade | Descrição | Status |
|---|---|---|
| Cadastro de denúncia | Registro com título, tipo, endereço e bairro | ✅ Disponível |
| Foto da denúncia | Envio de imagem junto à denúncia (armazenada no `localStorage` do navegador) | ✅ Disponível (somente local) |
| Geolocalização | Preenchimento da localização a partir do navegador, mediante permissão do usuário | ✅ Disponível |
| Listagem de denúncias recentes | Exibe as denúncias cadastradas | ✅ Disponível |
| Pesquisa e filtro | Busca por bairro/título e filtro por status | ✅ Disponível |
| Painel administrativo | Alteração do status das denúncias (ex.: marcar como "Resolvida") | ✅ Disponível (autenticação demonstrativa) |
| Indicadores | Resumo das denúncias no topo da página | ✅ Disponível |
| Calendário de coleta | Exibição de dias e horários de coleta | 🚧 Parcial (apenas exemplos fictícios, sem dados oficiais) |
| Persistência dos dados | Dados mantidos ao recarregar a página | 🚧 Parcial (apenas no `localStorage` do mesmo navegador) |
| Conexão com o banco MySQL | Gravação e consulta das denúncias no banco | 📅 Prevista (ainda não disponível) |
| Autenticação segura | Login administrativo com senha protegida (hash) | 📅 Prevista (ainda não disponível) |
| Relatórios por período/bairro | Geração de relatórios filtrados | 📅 Prevista (não identificada no protótipo atual) |

## Tecnologias utilizadas

| Categoria | Tecnologia |
|---|---|
| Linguagens | HTML, CSS e JavaScript |
| Armazenamento atual | `localStorage` do navegador |
| Banco de dados (estrutura) | MySQL — script `database.sql` (ainda não conectado ao site) |
| Ferramentas | Git, GitHub, VS Code (opcional: extensão Live Server) |
| Navegadores | Chrome, Firefox ou Edge atualizados |

## Pré-requisitos

- Um **navegador moderno** (Chrome, Firefox ou Edge);
- Opcional: [VS Code](https://code.visualstudio.com/) com a extensão **Live Server**, para servir a pasta localmente (necessário se a geolocalização não funcionar ao abrir o arquivo diretamente);
- Opcional: [MySQL](https://www.mysql.com/), apenas para criar a estrutura do banco com `database.sql` (o site ainda não usa o banco).

Não é necessário instalar dependências nem compilar o projeto.

## Instalação e execução

### 1. Obter o projeto

```bash
git clone https://github.com/ericcaetano-crypto/Ecodenuncia.git
cd Ecodenuncia/Codigo_EcoDenuncia_Grupo6
```

Ou baixe o ZIP pelo GitHub (**Code → Download ZIP**) e extraia todos os arquivos para uma pasta.

### 2. Abrir a aplicação

Abra o arquivo `index.html` em um navegador moderno.

> **Geolocalização:** se ela não funcionar abrindo o arquivo diretamente, execute a pasta por um servidor local, como a extensão **Live Server** do VS Code (clique com o botão direito em `index.html` → *Open with Live Server*). O navegador também solicitará permissão para acessar a localização.

### 3. Acessar a área administrativa

Clique em **Área administrativa** e use as credenciais demonstrativas:

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `admin123` |

### 4. (Opcional) Criar a estrutura do banco de dados

```bash
mysql -u root -p -e "CREATE DATABASE ecodenuncia;"
mysql -u root -p ecodenuncia < database.sql
```

> O site **ainda não está conectado** ao banco; este passo apenas cria a estrutura para a futura versão.

### Roteiro rápido de teste

1. Cadastre uma denúncia com título, tipo, endereço e bairro.
2. Confira se ela aparece em **Denúncias recentes**.
3. Use a busca por bairro/título e o filtro de status.
4. Entre no painel administrativo e altere o status.
5. Marque uma denúncia como **Resolvida** e confira os indicadores no topo.
6. Recarregue a página e confirme que os dados continuam no mesmo navegador.

## Limitações do protótipo

- Os dados ficam no `localStorage` e **não são compartilhados** entre computadores ou navegadores;
- A autenticação administrativa é **apenas demonstrativa** e não é segura para uso real;
- As fotos são guardadas no armazenamento local do navegador;
- O calendário de coleta contém **exemplos fictícios**, que precisam ser substituídos por dados oficiais;
- O `database.sql` cria a estrutura do MySQL, mas o site **não está conectado** ao banco;
- Para uso real, é necessário implementar um back-end (por exemplo, Node.js/Express ou PHP), autenticação segura, upload protegido de arquivos, uma API e a conexão com o MySQL.

## Estrutura do projeto

```
Codigo_EcoDenuncia_Grupo6/
├── index.html     # Interface do sistema
├── style.css      # Estilos responsivos
├── app.js         # Cadastro e listagem, pesquisa, filtro, geolocalização e painel administrativo
├── database.sql   # Estrutura inicial do banco de dados MySQL
└── README.md      # Documentação do projeto
```

## Equipe

**Grupo 6 — PDS — IFRN**

| Integrantes |
|---|
| Samuellyson Jacó |
| Pedro Lucas |
| Eric Caetano |
| José Henrique |

**Professora:** Raquel Lopes de Olieveira
