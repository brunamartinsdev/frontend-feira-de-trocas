import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import tituloCirculou from '../assets/tituloCirculou.jpg';
import { jwtDecode } from 'jwt-decode';

const getInitialLoginState = () => {
    const token = localStorage.getItem("token");
    if (!token) return { usuarioLogado: false, nomeUsuario: "" };
    try {
        const decoded = jwtDecode(token);
        const agora = Date.now() / 1000;
        if (decoded.exp > agora) {
            const usuarioData = localStorage.getItem("usuario");
            if (usuarioData) {
                const usuario = JSON.parse(usuarioData);
                return { usuarioLogado: true, nomeUsuario: usuario.nome?.split(" ")[0] || "" };
            }
        }
    } catch (err) {
        console.error("Erro ao decodificar token no carregamento inicial da Landing Page:", err);
    }
    return { usuarioLogado: false, nomeUsuario: "" };
};

const LandingPage = () => {
    const [{ usuarioLogado }, setLoginState] = useState(getInitialLoginState);
    useEffect(() => {
        const handleLoginStatusChange = () => {
            setLoginState(getInitialLoginState());
        };

        window.addEventListener("storage", handleLoginStatusChange);
        window.addEventListener("logoutEvent", handleLoginStatusChange);


        return () => {
            window.removeEventListener("storage", handleLoginStatusChange);
            window.removeEventListener("logoutEvent", handleLoginStatusChange);
        };
    }, []);

    return (
        <main className="landing-page-container bg-light">
            <section className="text-center mb-4">
                <img src={tituloCirculou} alt="Circulou" className="img-fluid" style={{ maxWidth: '200px', borderBottom: 'solid 3.5px orange' }} />
                <p className="lead py-4">TUDO GANHA NOVO SENTIDO QUANDO CIRCULA.</p>

                <p className="landing-description lead text-muted mt-4 px-5">
                    Em muitas comunidades, acumulamos itens em bom estado que não usamos mais.
                    A plataforma **CIRCULOU** é a a solução ideal para conectar você e seus vizinhos,
                    facilitando a troca desses objetos e promovendo o consumo consciente.
                    Dê um novo propósito a brinquedos, livros, roupas e ferramentas, fortalecendo os vínculos comunitários.
                    Descubra como é fácil trocar e fazer a diferença!
                </p>

                <div className="landing-buttons mt-5 px-5">
                    <Link to="/itens" className="btn btn-primary btn-lg me-3" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Ver Itens Disponíveis</Link>

                    {!usuarioLogado && (
                        <Link to="/login" className="btn btn-outline-primary btn-lg">Cadastre-se / Login</Link>
                    )}
                </div>
            </section>
        </main>
    );
};

export default LandingPage;