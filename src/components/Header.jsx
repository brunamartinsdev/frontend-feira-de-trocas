import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/circulou_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdPersonOutline, MdNotificationsNone, MdSearch } from 'react-icons/md';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const deslogar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setNomeUsuario("");
    navigate("/");
  };

  const usuarioLogado = !!localStorage.getItem("token");

  useEffect(() => {
    const usuarioData = localStorage.getItem("usuario");
    if (usuarioData) {
      try {
        const usuario = JSON.parse(usuarioData);
        const primeiroNome = usuario.nome?.split(" ")[0] || "";
        setNomeUsuario(primeiroNome);
      } catch (e) {
        console.error("Erro ao ler nome do usuário:", e);
        setNomeUsuario("");
      }
    }
  }, [usuarioLogado]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 justify-content-between">
      <div className="container-fluid">
        <div className="d-flex align-items-center flex-grow-1">
          <a className="navbar-brand me-4" href="/">
            <img src={logo} alt="Logo Circulou" style={{ height: '90px' }} />
          </a>

          <div className="input-group me-4" style={{ maxWidth: '300px' }}>
            <input type="text" className="form-control" placeholder="Buscar" aria-label="Buscar" />
            <button className="btn btn-info" type="button" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>
              <MdSearch style={{ color: 'white' }} />
            </button>
          </div>
        </div>

        <button className="navbar-toggler" type="button" onClick={toggleMobileMenu} aria-controls="navbarNav" aria-expanded={isMobileMenuOpen ? 'true' : 'false'} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="d-none d-lg-flex align-items-center">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="/">Página Inicial</a></li>
            <li className="nav-item"><a className="nav-link" href="/itens">Ver Itens</a></li>
            <li className="nav-item"><a className="nav-link" href="/minhas-trocas">Minhas Trocas</a></li>
          </ul>

          <div style={{ borderLeft: '1px solid #CCC', height: '30px', margin: '0 15px' }}></div>

          {usuarioLogado ? (
            <a href="/cadastrar-item" className="btn btn-primary me-3" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Cadastrar Item</a>
          ) : (
            <a href="/login" className="btn btn-primary me-3" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Login</a>
          )}

          <a href="/notificacoes" className="text-dark me-2" style={{ fontSize: '1.5em' }}>
            <MdNotificationsNone />
          </a>

          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="btn btn-link p-0 me-2"
              style={{ border: "none" }}
            >
              <MdPersonOutline size={24} />
            </button>

            {usuarioLogado && nomeUsuario && (
              <span style={{ fontSize: "0.95em", fontWeight: "500", color: "#333" }}>
                {nomeUsuario}
              </span>
            )}

            {menuAberto && usuarioLogado && (
              <div style={{
                position: "absolute",
                right: 0,
                top: "100%",
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                padding: "0.5rem",
                zIndex: 1000
              }}>
                <button
                  onClick={deslogar}
                  className="btn btn-sm btn-outline-danger w-100"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={toggleMobileMenu} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}>
          <div className="mobile-nav-menu bg-white p-4" style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '250px', boxShadow: '-2px 0 5px rgba(0,0,0,0.2)' }}>
            <button className="btn-close" onClick={toggleMobileMenu} style={{ position: 'absolute', top: '10px', right: '10px' }}></button>
            <ul className="navbar-nav flex-column">
              <li className="nav-item"><a className="nav-link" href="/" onClick={toggleMobileMenu}>Página Inicial</a></li>
              <li className="nav-item"><a className="nav-link" href="/itens" onClick={toggleMobileMenu}>Ver Itens</a></li>
              <li className="nav-item"><a className="nav-link" href="/minhas-trocas" onClick={toggleMobileMenu}>Minhas Trocas</a></li>
              {usuarioLogado && (
                <li className="nav-item"><a className="nav-link" href="/cadastrar-item" onClick={toggleMobileMenu}>Cadastrar Item</a></li>
              )}
              <li className="nav-item"><a className="nav-link" href="/notificacoes" onClick={toggleMobileMenu}>Notificações</a></li>
              <li className="nav-item"><a className="nav-link" href="/perfil" onClick={toggleMobileMenu}>Perfil</a></li>
              {usuarioLogado && (
                <li className="nav-item"><button className="btn btn-outline-danger w-100 mt-3" onClick={deslogar}>Sair</button></li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
