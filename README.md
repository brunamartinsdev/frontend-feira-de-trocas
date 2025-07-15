# Feira de Trocas Comunitária - Frontend

### **1. Visão Geral do Projeto**

Este repositório contém o frontend do projeto prático desenvolvido para o Bootcamp FullStack da Avanti. A aplicação, nomeada "CIRCULOU", visa oferecer uma interface intuitiva e responsiva para um sistema comunitário de trocas de produtos. 

### **2. Tecnologias Utilizadas**

O frontend foi desenvolvido utilizando as seguintes tecnologias:

* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **Vite:** Ferramenta de build rápido para desenvolvimento web.
* **Axios:** Cliente HTTP baseado em Promises para comunicação com a API backend.
* **Bootstrap:** Framework CSS para design responsivo e componentes pré-estilizados.
* **React Icons:** Biblioteca de ícones.

### **3. Design e Modelagem do Frontend**

O design visual da aplicação foi desenvolvido com base nos mock-ups detalhados fornecidos no documento "Projeto Avanti FrontEnd.pdf".

#### **Conceitos de Design:**

* **Paleta de Cores:** Utiliza um azul/ciano vibrante (#00BCD4) como cor primária (da logo) e tons de laranja pêssego (#FFAB91) como secundária, com neutros de cinza e branco para o fundo e textos.
* **Tipografia:** Foco em fontes sans-serif limpas e legíveis.
* **Componentização:** A interface é dividida em componentes reutilizáveis, seguindo a filosofia do React.

#### **Telas Principais (Mock-ups):**

Para uma visualização das telas, consulte as páginas do documento "Projeto Avanti FrontEnd.pdf":

* **Página Inicial / Listagem de Itens:** Páginas 1 e 2.
* **Minhas Trocas:** Página 3.
* **Meus Produtos:** Página 4.
* **Detalhes do Item:** Página 5.
* **Fazer Proposta (Seleção):** Página 6.
* **Cadastrar Produto:** Página 7.
* **Cadastrar Usuário:** Página 8.
* **Login:** Página 9.
* **Perfil do Usuário:** Página 10.

### **4. Componentes Implementados (Estrutura Inicial)**

A estrutura inicial do projeto React foi organizada da seguinte forma:

* **`src/App.jsx`**: Componente raiz que orquestra as páginas e componentes globais.
* **`src/components/`**: Contém componentes reutilizáveis menores.
    * `Header.jsx`: O cabeçalho da aplicação, com logo, busca, links de navegação e ícones de usuário/notificação.
    * `Footer.jsx`: O rodapé da aplicação, com links e ícones de redes sociais.
    * `ItemCard.jsx`: Componente para exibir um único card de item na listagem.
* **`src/pages/`**: Contém os componentes que representam páginas completas.
    * `HomePage.jsx`: A página inicial, que exibe a seção de hero, botões de filtro e a listagem de `ItemCard`s.
* **`src/assets/`**: Onde as imagens (como a logo e a imagem do título) são armazenadas.

### **5. Como Rodar o Frontend**

### Pré-requisitos:

* Node.js (versão 18 ou superior) e npm (Node Package Manager) instalados.
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

### **6. Conexão com o Backend (Implementação Inicial)**

A `HomePage.jsx` já está configurada para buscar os itens do backend no endpoint `GET /itens` (`http://localhost:8084/itens`).". Os itens recebidos são exibidos usando o componente `ItemCard.jsx`.

### **7. Contribuições da Equipe**

