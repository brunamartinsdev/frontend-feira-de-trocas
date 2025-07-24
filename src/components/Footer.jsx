import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const getInitialLoginStateFooter = () => {
  const token = localStorage.getItem("token");
  if (!token) return { usuarioLogado: false };
  try {
    const decoded = jwtDecode(token);
    const agora = Date.now() / 1000;
    if (decoded.exp > agora) {
      return { usuarioLogado: true };
    }
  } catch (err) {
    console.error("Erro ao decodificar token no carregamento inicial do Footer:", err);
  }
  return { usuarioLogado: false };
};


const Footer = () => {

  const [{ usuarioLogado }, setLoginState] = useState(getInitialLoginStateFooter);

  useEffect(() => {
    const handleLoginStatusChange = () => {
      setLoginState(getInitialLoginStateFooter());
    };

    handleLoginStatusChange();

    window.addEventListener("storage", handleLoginStatusChange);

    window.addEventListener("logoutEvent", handleLoginStatusChange);

    return () => {
      window.removeEventListener("storage", handleLoginStatusChange);
      window.removeEventListener("logoutEvent", handleLoginStatusChange);
    };
  }, []);


  return (
    <footer className="custom-footer-bg text-white py-4 mt-auto">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-4 col-sm-6 mb-3 text-center">
            <h5 className="text-uppercase mb-3">Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none footer-link">Página Inicial</Link></li>
              <li><Link to="/itens" className="text-white text-decoration-none footer-link">Ver Itens</Link></li>

              {usuarioLogado && (
                <>
                  <li><Link to="/meus-itens" className="text-white text-decoration-none footer-link">Meus Itens</Link></li>
                  <li><Link to="/cadastrar-item" className="text-white text-decoration-none footer-link">Cadastrar Item</Link></li>
                  <li><Link to="/minhas-propostas" className="text-white text-decoration-none footer-link">Minhas Propostas</Link></li>
                  <li><Link to="/notificacoes" className="text-white text-decoration-none footer-link">Notificações</Link></li>
                  <li><Link to="/perfil" className="text-white text-decoration-none footer-link">Perfil</Link></li>
                </>
              )}
            </ul>
          </div>

          <div className="col-md-4 col-sm-6 mb-3 text-center">
            <h5 className="text-uppercase mb-3">Siga Nossas Redes</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white social-icon-link">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white social-icon-link">
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div className="col-md-4 col-12 text-center mb-3">
            <h5 className="text-uppercase mb-3">Circulou</h5>
            <p className="text-white small">Tudo ganha novo sentido quando circula.</p>
            <p className="text-white small">&copy; {new Date().getFullYear()} Circulou. Todos os direitos reservados.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;