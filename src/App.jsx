import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.jsx';
import CadastrarItemPage from './pages/CadastrarItemPage.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LandingPage from './pages/LandingPage.jsx';
// futuras páginas podem ir aqui:
// import PerfilPage from './pages/PerfilPage';
// import CadastroItemPage from './pages/CadastroItemPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage  />} />
        <Route path='/itens' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar-item" element={<CadastrarItemPage />} />
        {/* Exemplo de páginas futuras:
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/cadastro" element={<CadastroItemPage />} />
        */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
