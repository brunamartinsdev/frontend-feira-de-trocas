import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/circulou_logo.png';

import { MdPersonOutline, MdNotificationsNone } from 'react-icons/md';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 justify-content-between">
            <div className="container-fluid"> 
                <div className="d-flex align-items-center flex-grow-1">

                    {/* Logo */}
                    <a className="navbar-brand me-4" href="/"> 
                        <img src={logo} alt="Logo Circulou" style={{ height: '90px' }} />
                    </a> 
                </div> 

                {/* Botão Hambúrguer */}
                <button className="navbar-toggler" type="button" onClick={toggleMobileMenu} aria-controls="navbarNav" aria-expanded={isMobileMenuOpen ? 'true' : 'false'} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="d-none d-lg-flex align-items-center"> 
                    {/* Links de Navegação */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Página Inicial</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/itens">Ver Itens</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/minhas-trocas">Minhas Trocas</a>
                        </li>
                    </ul>

                    {/* Linha Vertical */}
                    <div style={{ borderLeft: '1px solid #CCC', height: '30px', margin: '0 15px' }}></div>

                    {/* Botão Cadastrar Item */}
                    <button className="btn btn-primary me-3" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Cadastrar Item</button>

                    {/* Ícones de Usuário e Notificação */}
                    <a href="/notificacoes" className="text-dark me-2" style={{ fontSize: '1.5em' }}>
                        <MdNotificationsNone />
                    </a>
                    <a href="/perfil" className="text-dark" style={{ fontSize: '1.5em' }}>
                        <MdPersonOutline />
                    </a>
                </div> 
            </div>

            {/* Menu Mobile */}
            {isMobileMenuOpen && (
                <div className="mobile-nav-overlay" onClick={toggleMobileMenu} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}>
                    <div className="mobile-nav-menu bg-white p-4" style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '250px', boxShadow: '-2px 0 5px rgba(0,0,0,0.2)' }}>
                        <button className="btn-close" onClick={toggleMobileMenu} style={{ position: 'absolute', top: '10px', right: '10px' }}></button>
                        <ul className="navbar-nav flex-column">
                            <li className="nav-item"><a className="nav-link" href="/" onClick={toggleMobileMenu}>Página Inicial</a></li>
                            <li className="nav-item"><a className="nav-link" href="/itens" onClick={toggleMobileMenu}>Ver Itens</a></li>
                            <li className="nav-item"><a className="nav-link" href="/minhas-trocas" onClick={toggleMobileMenu}>Minhas Trocas</a></li>
                            <li className="nav-item"><button className="btn btn-primary w-100 mt-2" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }} onClick={toggleMobileMenu}>Cadastrar Item</button></li>
                            <li className="nav-item"><a className="nav-link" href="/notificacoes" onClick={toggleMobileMenu}>Notificações</a></li>
                            <li className="nav-item"><a className="nav-link" href="/perfil" onClick={toggleMobileMenu}>Perfil</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;