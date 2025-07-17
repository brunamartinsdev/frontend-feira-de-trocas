import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import CadastrarItemPage from './pages/CadastrarItemPage';
import PropostaTrocaPage from './pages/PropostaTrocaPage';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
// futuras páginas podem ir aqui:
// import PerfilPage from './pages/PerfilPage';
// import CadastroItemPage from './pages/CadastroItemPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar-item" element={<CadastrarItemPage />} />
        <Route path="/propor-troca/:id" element={<PropostaTrocaPage />} />
         {}
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
