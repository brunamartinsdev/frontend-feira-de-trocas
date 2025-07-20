import React from 'react';
import './Footer.css'; 
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
    return (
        
        <footer className="custom-footer-bg text-white mt-auto">

            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-md-4 col-sm-6 mb-3 text-center"> 
                        <h5 className="text-uppercase mb-3">Links</h5> 
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white text-decoration-none footer-link">Página Inicial</a></li>
                            <li><a href="/itens" className="text-white text-decoration-none footer-link">Meus Itens</a></li>
                            <li><a href="/cadastrar-item" className="text-white text-decoration-none footer-link">Cadastrar Item</a></li>
                            <li><a href="/minhas-trocas" className="text-white text-decoration-none footer-link">Minhas Trocas</a></li>
                            <li><a href="/notificacoes" className="text-white text-decoration-none footer-link">Notificações</a></li>
                            <li><a href="/perfil" className="text-white text-decoration-none footer-link">Perfil</a></li>
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