# EcoDenúncia — Sistema de Denúncia e Gestão de Resíduos Urbanos

Protótipo acadêmico inicial para o projeto do Grupo 6.

## Conteúdo
- `index.html`: interface do sistema.
- `style.css`: estilos responsivos.
- `app.js`: cadastro e listagem de denúncias, pesquisa, filtro, geolocalização e painel administrativo demonstrativo.
- `database.sql`: estrutura inicial do banco de dados MySQL.

## Como executar
1. Extraia todos os arquivos para uma pasta.
2. Abra `index.html` em um navegador moderno.
3. Para testar a área administrativa, clique em **Área administrativa**.
4. Credenciais demonstrativas: usuário `admin`; senha `admin123`.

Se a geolocalização não funcionar abrindo o arquivo diretamente, execute a pasta por um servidor local (por exemplo, a extensão Live Server do VS Code). O navegador também solicitará permissão para acessar a localização.

## Testes rápidos
1. Cadastre uma denúncia com título, tipo, endereço e bairro.
2. Confira se ela aparece em “Denúncias recentes”.
3. Use a busca por bairro/título e o filtro de status.
4. Entre no painel administrativo e altere o status.
5. Marque uma denúncia como “Resolvida” e confira os indicadores no topo.
6. Recarregue a página e confirme que os dados continuam no mesmo navegador.

## Limitações importantes
Esta entrega é um **protótipo front-end**, não um sistema pronto para produção:
- Os dados ficam no `localStorage` do navegador e não são compartilhados entre computadores.
- A autenticação administrativa é apenas demonstrativa; não é segura para uso real.
- O campo de foto guarda a imagem no armazenamento local do navegador.
- O calendário contém exemplos fictícios que precisam ser substituídos por dados oficiais.
- O arquivo `database.sql` cria a estrutura do MySQL, mas o site ainda não está conectado ao banco.
- Para publicar de verdade, é necessário implementar um backend (por exemplo, Node.js/Express ou PHP), autenticação segura, upload protegido, API e conexão ao MySQL.

Projeto referente a São Gonçalo do Amarante/RN. Os horários de coleta e os registros de denúncia deste protótipo não são dados oficiais.
