import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig.js';
import { useNavigate, Link } from 'react-router-dom';


const PerfilPage = () => {

    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);

    const navigate = useNavigate();

    //carregar token e userId do localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        if (!storedToken || !storedUserId) {
            navigate('/login'); //redireciona para login se não estiver logado
        } else {
            setToken(storedToken);
            setUserId(storedUserId);
        }
    }, [navigate]);

    //buscar dados do usuário logado
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId || !token) return; //só busca se o userId e token estiverem disponíveis

            setLoadingUser(true);
            setErrorUser(null);
            try {
                const response = await apiClient.get(`/usuarios/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userData = response.data;
                setNome(userData.nome);
                setEmail(userData.email);
                setIsAdmin(userData.isAdmin);
            } catch (err) {
                console.error('Erro ao buscar dados do usuário:', err);
                setErrorUser('Não foi possível carregar seus dados.');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('usuario');
                    navigate('/login');
                }
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUserData();
    }, [userId, token, navigate]);

    //lida com a submissão do formulário de atualização de perfil
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingUser(true);
        setErrorUser(null);

        if (senha && senha !== confirmarSenha) {
            setErrorUser("As senhas não coincidem.");
            setLoadingUser(false);
            return;
        }

        try {
            const updateData = {
                nome,
                email,
            };
            if (senha) {
                updateData.senha = senha;
            }

            const response = await apiClient.put(`/usuarios/${userId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setShowSuccessModal(true);
                localStorage.setItem('usuario', JSON.stringify(response.data));
            } else {
                setErrorUser(response.data?.error || 'Erro ao atualizar perfil.');
            }
        } catch (err) {
            console.error('Erro ao atualizar perfil:', err.response?.data || err.message);
            setErrorUser(err.response?.data?.error || 'Erro interno ao atualizar perfil.');
        } finally {
            setLoadingUser(false);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    if (loadingUser) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Carregando perfil...</span>
                </div>
                <p className="mt-2 text-info">Carregando seu perfil...</p>
            </div>
        );
    }

    if (errorUser) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger" role="alert">
                    {errorUser}
                </div>
            </div>
        );
    }

    return (
        <div className="perfil-background-wrapper bg-light py-5">
            <div className="container mt-5 perfil-page-container">
                <div className="row ">
                    <div className="col-md-5 ">
                        <div className="card p-4 mb-4">
                            <h3 className="text-center mb-4">Seu Perfil</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Nova Senha</label>
                                    <input type="password" className="form-control" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Deixe em branco para manter a atual" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmarSenha" className="form-label">Confirmar Nova Senha</label>
                                    <input type="password" className="form-control" id="confirmarSenha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                                </div>
                                {isAdmin && (
                                    <p className="text-center text-success fw-bold mt-3">
                                        Você é um administrador!
                                    </p>
                                )}

                                {errorUser && <div className="alert alert-danger mt-3">{errorUser}</div>}
                                <button type="submit" className="btn btn-primary w-100">ATUALIZAR</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-7 d-flex flex-column gap-4">

                        <div className="card p-4">
                            <h3 className="text-center mb-4">Ver Perfil Público</h3>
                            <p className="text-center text-muted mb-4">Acesse seu perfil público para ver como outros usuários o veem.</p>
                            <Link to={`/usuario/${userId}`} className="btn btn-info w-100" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Acessar Perfil Público</Link>
                        </div>

                        <div className="card p-4">
                            <h3 className="text-center mb-4">Gerenciar Itens</h3>
                            <p className="text-center text-muted mb-4">Acesse seus itens cadastrados e gerencie-os.</p>
                            <Link to="/meus-itens" className="btn btn-info w-100" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Ver Meus Itens</Link>
                            <Link to="/cadastrar-item" className="btn btn-outline-info w-100 mt-3">Cadastrar Novo Item</Link>
                        </div>
                    </div>
                </div>

                <>
                    {showSuccessModal && (
                        <div className="modal" tabIndex="-1" style={{ display: 'block' }} role="dialog">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Sucesso!</h5>
                                        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseSuccessModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Seu perfil foi atualizado com sucesso!</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={handleCloseSuccessModal}>Fechar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {showSuccessModal && <div className="modal-backdrop fade show"></div>}
                </>
            </div >
        </div>
    );
};

export default PerfilPage;