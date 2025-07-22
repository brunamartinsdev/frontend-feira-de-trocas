# Feira de Trocas Comunitária - Frontend

### **1. Visão Geral do Projeto**

Este repositório contém o frontend do projeto prático desenvolvido para o Bootcamp FullStack da Avanti. A aplicação, nomeada "**CIRCULOU**", visa oferecer uma interface intuitiva e responsiva para um sistema comunitário de trocas de produtos. Nosso objetivo é conectar pessoas interessadas em oferecer e receber objetos, promovendo o consumo consciente e o fortalecimento dos vínculos comunitários.

### **2. Tecnologias Utilizadas**

O frontend foi desenvolvido utilizando as seguintes tecnologias:

* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **Vite:** Ferramenta de build rápido para desenvolvimento web.
* **Axios:** Cliente HTTP baseado em Promises para comunicação com a API backend.
* **Bootstrap:** Framework CSS para design responsivo e componentes pré-estilizados.
* **React Icons:** Biblioteca de ícones populares.
* **React Router DOM:** Biblioteca para gerenciamento de rotas em Single Page Applications (SPAs).
* **jwt-decode:** Biblioteca para decodificar JSON Web Tokens (JWTs) no cliente.

### **3. Design e Modelagem do Frontend**

O design visual da aplicação foi desenvolvido com base nos mock-ups detalhados fornecidos no documento "Projeto Avanti FrontEnd.pdf".

#### **Conceitos de Design:**

* **Paleta de Cores:** Utiliza um azul/ciano vibrante como cor primária (da logo) e laranja como secundária, com tons de cinza e branco para o fundo e textos.
* **Tipografia:** Foco em fontes sans-serif limpas e legíveis.
* **Componentização:** A interface é dividida em componentes reutilizáveis, seguindo a filosofia do React.
* **Título Visual:** A imagem da logo "CIRCULOU" é utilizada como título principal na `HomePage`, reforçando a identidade visual.

#### **Telas Principais (Mock-ups):**

Para uma visualização das telas, consulte as páginas do documento "Projeto Avanti FrontEnd.pdf":

* **Landing Page:** Rota `/`
* **Página Inicial / Listagem de Itens:** Páginas 1 e 2 (Rota `/itens`).
* **Minhas Trocas:** Página 3 (Rota `/minhas-trocas`).
* **Meus Itens:** Página 4 (Rota `/meus-itens`).
* **Detalhes do Item:** Página 5 (Rota `/itens/:id`).
* **Fazer Proposta (Seleção):** Página 6 (Rota `/propor-troca/:id`).
* **Cadastrar Produto:** Página 7 (Rota `/cadastrar-item`).
* **Cadastrar Usuário:** Página 8 (Rota `/login` no modo de cadastro).
* **Login:** Página 9 (Rota `/login` no modo de login).
* **Perfil do Usuário:** Página 10 (Rota `/perfil`).
* **Perfil Público do Usuário:** Rota `/usuarios/:id`

### **4. Componentes Implementados e Estrutura do Projeto**

A estrutura do projeto React é organizada em componentes e páginas, gerenciadas pelo React Router DOM:

* **`src/App.jsx`**: Componente raiz que configura o `BrowserRouter`, o `Header`, `Footer` e as `Routes` principais da aplicação.
* **`src/components/`**: Contém componentes reutilizáveis.
    * `Header.jsx`: O cabeçalho da aplicação, com logo, links de navegação, botão "Cadastrar Item/Login" e ícones de usuário/notificação (totalmente responsivo, com lógica de login/logout).
    * `Footer.jsx`: O rodapé da aplicação, com links e ícones de redes sociais (com links condicionais por login).
    * `ItemCard.jsx`: Componente para exibir um único card de item na listagem, com navegação para detalhes e botão "Propor Troca" (responsivo, com lógica de login).
* **`src/pages/`**: Contém os componentes que representam páginas completas.
    * `LandingPage.jsx`: Página de boas-vindas e apresentação do projeto (rota `/`).
    * `HomePage.jsx`: A página principal, exibe a seção hero, barra de busca por texto, dropdown de filtro de categoria (dinâmico) e a listagem de `ItemCard`s (rota `/itens`).
    * `LoginPage.jsx`: Página de Login e Registro de usuários, com formulários controlados e comunicação com o backend (rota `/login`).
    * `PropostaTrocaPage.jsx`: Página para fazer uma proposta de troca, buscando o item desejado e os itens do usuário logado para seleção (rota `/propor-troca/:id`).
    * `ItemDetalhe.jsx`: Página para exibir detalhes de um item específico, com link para fazer proposta (rota `/itens/:id`).
    * `PerfilPage.jsx`: Página de perfil do usuário logado, com formulário para atualizar dados e links para gerenciar itens e ver perfil público (rota `/perfil`).
    * `PublicProfilePage.jsx`: Página para exibir o perfil público de qualquer usuário, incluindo seus itens disponíveis para troca (rota `/usuarios/:id`).
    * `CadastrarItemPage.jsx`: Página de formulário para cadastrar novos itens, incluindo upload de fotos (rota `/cadastrar-item`).
    * `MyProductsPage.jsx`: (Ainda um placeholder de rota, mas destinada a listar os itens cadastrados pelo usuário).
    * *(Outras páginas como `MinhasTrocasPage.jsx`, `NotificacoesPage.jsx` etc., estão planejadas, mas podem ser implementadas futuramente.)*
* **`src/assets/`**: Onde as imagens (logo, imagem do título) são armazenadas.
* **`src/utils/`**: Contém funções utilitárias (ex: `formatters.js` para formatação de texto).

### **5. Como Rodar o Frontend**

### Pré-requisitos:

* Node.js e npm (Node Package Manager) instalados.
* O **Backend da Feira de Trocas Comunitária** deve estar rodando em `http://localhost:8084`. Você pode encontrar o repositório do backend em: `https://github.com/souzagabs/back_time7`. Certifique-se de seguir as instruções de setup do backend primeiro.

### Passos para Iniciar:

1.  **Clonar o Repositório do Frontend:**
    ```bash
    git clone https://github.com/brunamartinsdev/frontend-feira-de-trocas
    cd frontend # Navegue para a pasta raiz do projeto frontend
    ```
2.  **Instalar Dependências:**
    ```bash
    npm install
    ```
3.  **Iniciar o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    * O navegador deverá abrir automaticamente (ou você pode acessar `http://localhost:5173` ou a porta indicada).

### **6. Conexão com o Backend**

O frontend se conecta ao backend para buscar e enviar dados através de requisições HTTP:

* **Homepage:** A `HomePage.jsx` busca dinamicamente a lista de itens (`GET /itens`) e as categorias (`GET /categorias`) do backend para popular a listagem e os filtros.
* **Páginas de Perfil e Item:** `PerfilPage.jsx` busca dados do usuário logado (`GET /usuarios/:id`). `PublicProfilePage.jsx` busca dados de perfil público e itens do usuário visualizado (`GET /usuarios/:id` e `GET /itens?usuarioResponsavelId=...`). `ItemDetalhe.jsx` busca detalhes de um item específico (`GET /itens/:id`).
* **Fluxo de Proposta:** `PropostaTrocaPage.jsx` busca detalhes do item desejado e dos itens do usuário logado para seleção, e envia as propostas (`POST /propostas`).
* **Login e Registro:** `LoginPage.jsx` envia dados para `POST /login` e `POST /usuarios`, e salva o JWT e os dados do usuário no `localStorage`.
* **Cadastro de Item:** `CadastrarItemPage.jsx` realiza o upload de imagens (`POST /uploads/upload`) e cadastra o item (`POST /itens`).
* **Proteção de Rotas:** As rotas públicas (`/`, `GET /usuarios`, `GET /usuarios/:id`, `GET /itens`, `GET /itens/:id`, `GET /categorias`, `POST /usuarios`) são acessíveis sem token. As demais rotas são protegidas por autenticação JWT.

### **7. Contribuições da Equipe**
