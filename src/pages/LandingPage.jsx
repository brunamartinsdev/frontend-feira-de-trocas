import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import tituloCirculou from '../assets/tituloCirculou.jpg';

const LandingPage = () => {
    return (
        <main className="landing-page-container bg-light">
            <section className="text-center mb-4">
                <img src={tituloCirculou} alt="Circulou" className="img-fluid" style={{ maxWidth: '200px', borderBottom: 'solid 2px orange' }} />
                <p className="lead py-4">TUDO GANHA NOVO SENTIDO QUANDO CIRCULA.</p>

                <p className="landing-description lead text-muted mt-4 px-5">
                    Em muitas comunidades, acumulamos itens em bom estado que não usamos mais.
                    A plataforma <strong>CIRCULOU</strong> é a a solução ideal para conectar você e seus vizinhos,
                    facilitando a troca desses objetos e promovendo o consumo consciente.
                    Dê um novo propósito a brinquedos, livros, roupas e ferramentas, fortalecendo os vínculos comunitários.
                    Descubra como é fácil trocar e fazer a diferença!
                </p>

                <div className="landing-buttons mt-5 px-5">
                    <Link to="/itens" className="btn btn-primary btn-lg me-3"  style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Ver Itens Disponíveis</Link>
                    <Link to="/login" className="btn btn-outline-primary btn-lg">Cadastre-se / Login</Link>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;