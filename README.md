## UserManager - Gerenciador de Usuários

## Descrição do Projeto
O UserManager é uma aplicação web completa para gerenciar registros de usuários, permitindo criar, visualizar, editar e deletar informações básicas como nome, email e telefone. Os dados são armazenados de forma persistente em um banco de dados MongoDB. A interface é desenvolvida em React.js com comunicação ao backend feita via Axios.

## Ambiente de Desenvolvimento
- Sistema Operacional: Windows 10

- Editor de Código: Visual Studio Code

- Node.js: Versão 18.x (LTS)

- npm: Versão 9.x

- MongoDB: Local (Community Edition) e/ou Atlas (cloud) para banco de dados

- Navegador: Google Chrome (para teste e desenvolvimento do frontend)

## Tecnologias Utilizadas
- Linguagem de Programação: JavaScript (ES6+)

- Backend: Node.js com Express.js

- Banco de Dados: MongoDB (usando Mongoose para modelagem e comunicação)

- Frontend: React.js (utilizando hooks e componentes funcionais)

- Gerenciador de Pacotes: npm

## Bibliotecas e ferramentas:

- Axios (requisições HTTP)

- Nodemon (hot reload no backend)

## Requisitos do Sistema
- Node.js e npm instalados localmente

- MongoDB instalado localmente ou acesso a cluster MongoDB Atlas

- Navegador moderno para acessar o frontend (Chrome, Firefox, Edge)

- Conexão estável com a internet para instalação das dependências

## Como Instalar e Executar a Aplicação
Backend
- Clone o repositório do projeto.

- Navegue até o diretório do backend

- Instale as dependências com o comando npm install.

- Configure a conexão com o MongoDB no arquivo .env (crie este arquivo na raiz do backend), colocando a variável MONGO_URI com a string de conexão para MongoDB Atlas ou para MongoDB local.

- Inicie o servidor usando npm run dev (ou node server.js / nodemon server.js, conforme configurado).

Frontend
- Navegue até o diretório do frontend (ex: usermanager-frontend).

- Instale as dependências com npm install.

- Execute o frontend com npm start.

- Abra o navegador e acesse http://localhost:3000.

## Como Contribuir
Contribuições são bem-vindas! Para contribuir com o projeto:

- Faça um fork do repositório.

- Crie uma branch para sua feature ou correção (por exemplo: git checkout -b minha-feature).

- Faça suas alterações e commit com mensagens claras (ex: git commit -m "Descrição da sua mudança").

- Envie para sua branch remota (git push origin minha-feature).

- Abra um pull request para o repositório principal.

## Práticas de Código Limpo Aplicadas
- Organização do código em módulos e pastas específicas (controllers, routes, models, frontend components).

- Uso de async/await para operações assíncronas no backend, melhorando a legibilidade.

- Tratamento de erros com mensagens claras e status HTTP apropriados.

- Componentes React funcionais e reutilizáveis, facilitando manutenção e escalabilidade.

- Nomes de variáveis, funções e arquivos descritivos e consistentes.

## Testes Automatizados
- Atualmente, o projeto ainda não possui testes automatizados implementados, mas o ambiente está preparado para futuras implementações utilizando frameworks como Jest para o frontend e backend.

## Padrões de Projeto Aplicados
- MVC (Model-View-Controller): No backend, o padrão MVC foi aplicado, separando claramente a lógica do modelo (Mongoose schemas), controle (funções dos controllers) e rotas (handlers das rotas Express).