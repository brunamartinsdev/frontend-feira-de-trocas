// src/pages/ItemDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ItemDetalhe.css';
import { toTitleCase, capitalizeFirstLetter, toSentenceCase } from '../utils/formatters.js';

const API_BASE_URL = 'http://localhost:8084';

const ItemDetalhe = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleFazerPropostaClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(`/proposta-troca/${item.id}`);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/itens/${id}`);
                setItem(response.data);
            } catch (err) {
                console.error("Erro ao buscar detalhes do item:", err);
                setError("Item não encontrado ou falha ao carregar.");
            } finally {
                setLoading(false);
            }
        };

        if (id) { //só busca se o ID estiver disponível na URL
            fetchItem();
        } else {
            setLoading(false);
            setError("ID do item não fornecido na URL.");
        }
    }, [id]); //depende do ID da URL

    //lógica para exibir estado de carregamento, erro ou os detalhes do item
    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Carregando item...</span>
                </div>
                <p className="mt-2 text-info">Carregando detalhes do item...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <Link to="/itens" className="btn btn-primary mt-3">Voltar à lista de itens</Link>
            </div>
        );
    }

    //se o item é null (e não houve erro de rede/loading), significa que o item não foi encontrado (404 retornado como 200 vazio ou algo assim)
    if (!item) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-warning" role="alert">
                    Nenhum item encontrado com o ID fornecido.
                </div>
                <Link to="/itens" className="btn btn-primary mt-3">Voltar à lista de itens</Link>
            </div>
        );
    }

    return (
        <main className='bg-light'>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 text-center">
                        {item.foto ?
                            <img src={item.foto} alt={item.nome} className="img-fluid rounded" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                            :
                            <div className="bg-light d-flex align-items-center justify-content-center rounded" style={{ width: '100%', height: '400px' }}>
                                <span className="text-muted">Sem Foto Disponível</span>
                            </div>
                        }
                    </div>
                    <div className="col-md-6">
                        <h1 className="mb-3 nome-item">{toTitleCase(item.nome)}</h1>
                        <p className="lead">{toSentenceCase(item.descricao)}</p>
                        <p><strong>Categoria:</strong> {capitalizeFirstLetter(item.categoria)}</p>
                        <p><strong>Status:</strong> {capitalizeFirstLetter(item.status)}</p>
                        <p><strong>Dono:</strong> {" "}
                            {item.usuarioResponsavel ? (
                                <Link to={`/usuario/${item.usuarioResponsavel.id}`} className="text-info text-decoration-none fw-bold" >
                                    {toTitleCase(item.usuarioResponsavel.nome)}
                                </Link>
                            ) : (
                                'Desconhecido'
                            )}</p>
                        <button
                            onClick={handleFazerPropostaClick}
                            className="btn btn-primary btn-lg mt-3"
                            style={{ backgroundColor: '#00BCD4', borderColor: '#00BCD4' }} 
                        >
                            FAZER PROPOSTA
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ItemDetalhe;