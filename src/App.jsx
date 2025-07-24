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
import MeusItensPage from './pages/MeusItensPage.jsx'; 
import PerfilPage from './pages/PerfilPage.jsx';
import PerfilPublicoPage from './pages/PerfilPublicoPage.jsx';
import MinhasPropostas from './pages/MinhasPropostas.jsx';
import EditarItemPage from './pages/EditarItemPage.jsx';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/itens' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar-item" element={<CadastrarItemPage />} />
        <Route path="/proposta-troca/:itemId" element={<PropostaTrocaPage />} />
        <Route path='/itens/:id' element={<ItemDetalhe />} />
        <Route path="/meus-itens" element={<MeusItensPage />} />
        <Route path="/minhas-propostas" element={<MinhasPropostas />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path='/usuario/:id' element={<PerfilPublicoPage />} />
        <Route path='/editar-item/:id' element={<EditarItemPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
