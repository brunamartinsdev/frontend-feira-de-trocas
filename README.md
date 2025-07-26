# Feira de Trocas Comunitária - Frontend

### **1. Visão Geral do Projeto**

[Acesse o site](https://frontend-feira-de-trocas.vercel.app/)

Este repositório contém o frontend do projeto prático desenvolvido para o Bootcamp FullStack da Avanti. A aplicação, nomeada "**CIRCULOU**", visa oferecer uma interface intuitiva e responsiva para um sistema comunitário de trocas de produtos. Nosso objetivo é conectar pessoas interessadas em oferecer e receber objetos, promovendo o consumo consciente e o fortalecimento dos vínculos comunitários.

### **2. Tecnologias Utilizadas**

O frontend foi desenvolvido utilizando as seguintes tecnologias:

* **React:** Biblioteca JavaScript para construção de interfaces de usuário reativas e baseadas em componentes.
* **Vite:** Ferramenta de build moderna e ultrarrápida para desenvolvimento web.
* **Axios:** Cliente HTTP baseado em Promises para comunicação com a API backend.
* **Bootstrap & React-Bootstrap:** Framework CSS para design responsivo e componentes pré-estilizados.
* **React Icons:** Biblioteca de ícones populares para uma interface mais visual.
* **React Router DOM:** Biblioteca para gerenciamento de rotas em Single Page Applications (SPAs).
* **jwt-decode:** Biblioteca para decodificar JSON Web Tokens (JWTs) no cliente e gerenciar o estado de autenticação.

### **3. Estrutura do Projeto e Componentes**

A estrutura do projeto React é organizada em componentes e páginas para facilitar a manutenção:

* **`src/assets/`**: Onde as imagens estáticas (logo, imagem do título) são armazenadas.
* **`src/components/`**: Contém componentes reutilizáveis.
    * `Header.jsx`: O cabeçalho da aplicação, com logo, links de navegação, e ícones de usuário e notificação. É totalmente responsivo e gerencia o estado de login/logout.
    * `Footer.jsx`: O rodapé da aplicação.
    * `ItemCard.jsx`: Componente para exibir um único card de item nas listagens.
    * `SinoNotificacao.jsx`: O componente interativo que busca e exibe as notificações do usuário em um dropdown, com contador de não lidas.
* **`src/pages/`**: Contém os componentes que representam as páginas completas da aplicação.
    * `LandingPage.jsx`: Página de boas-vindas e apresentação inicial do projeto.
    * `HomePage.jsx`: A página principal, que exibe a listagem de itens disponíveis para troca, com funcionalidades de busca e filtro por categoria.
    * `LoginPage.jsx`: Página de Login e Registro de usuários.
    * `ItemDetalhe.jsx`: Página para exibir os detalhes completos de um item específico, com a opção de iniciar uma proposta de troca.
    * `MeusItensPage.jsx`: Painel onde o usuário pode ver, editar e excluir seus próprios itens cadastrados.
    * `CadastrarItemPage.jsx` / `EditarItemPage.jsx`: Formulários para criar e atualizar itens, incluindo o upload de imagens para o Cloudinary.
    * `PropostaTrocaPage.jsx`: Página onde o usuário seleciona um de seus itens disponíveis para oferecer em troca de um item desejado.
    * `MinhasPropostas.jsx`: Página onde o usuário gerencia as propostas que **enviou** e **recebeu**, com opções para aceitar, recusar ou cancelar propostas pendentes.
    * `PerfilPage.jsx`: Página onde o usuário logado pode visualizar e editar seus próprios dados de perfil.
    * `PerfilPublicoPage.jsx`: Página que exibe o perfil público de outros usuários, seus itens disponíveis e a contagem de trocas já realizadas.
* **`src/utils/`**: Contém funções utilitárias, como o `formatters.js` para formatação de texto.

### **4. Como Rodar o Frontend**

#### Pré-requisitos:

* Node.js e npm  instalados.
* O **Backend da Feira de Trocas Comunitária** deve estar rodando em `http://localhost:8084`. Você pode encontrar o repositório do backend em: `https://github.com/souzagabs/back_time7`. Certifique-se de seguir as instruções da documentação do backend primeiro.

#### Passos para Iniciar:

1.  **Clonar o Repositório do Frontend:**
    ```bash
    git clone https://github.com/brunamartinsdev/frontend-feira-de-trocas
    cd frontend-feira-de-trocas
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

### **5. Contribuições da Equipe**

* **Bruna Martins Combat:** Responsável pela concepção e início do projeto frontend, incluindo a criação da identidade visual da marca "CIRCULOU", a paleta de cores e o design da logo. Desenvolveu componentes essenciais como `Header`, `Footer`, `ItemCard` e o sistema de `SinoNotificacao`. Implementou páginas-chave, incluindo `HomePage`, `LandingPage`, `ItemDetalhe`, `PerfilPage` e `PerfilPublicoPage`. Ajudou a melhorar a lógica e a usabilidade de toda a aplicação, garantindo a responsividade da interface e contribuindo ativamente na resolução de bugs. Realizou o deploy do projeto.

