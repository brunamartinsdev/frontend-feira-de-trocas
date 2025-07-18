import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.jsx';
import CadastrarItemPage from './pages/CadastrarItemPage.jsx';
import PropostaTrocaPage from './pages/PropostaTrocaPage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ItemDetalhe from './pages/ItemDetalhe.jsx';
// futuras páginas podem ir aqui:
// import PerfilPage from './pages/PerfilPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage  />} />
        <Route path='/itens' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar-item" element={<CadastrarItemPage />} />
        <Route path="/proposta-troca/:itemId" element={<PropostaTrocaPage />} />
        <Route path='/itens/:id' element={<ItemDetalhe />}></Route>

         {}
        {/* Exemplo de páginas futuras:
        <Route path="/perfil" element={<PerfilPage />} />
        */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
