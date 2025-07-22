// src/pages/PublicProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ItemCard from '../components/ItemCard.jsx';

const API_BASE_URL = 'http://localhost:8084';

const PublicProfilePage = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/usuarios/${id}`);
        setUserProfile(response.data);
      } catch (err) {
        console.error("Erro ao buscar perfil público:", err);
        setError("Usuário não encontrado ou falha ao carregar o perfil.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserProfile();
    } else {
      setLoading(false);
      setError("ID de usuário não fornecido na URL.");
    }
  }, [id]);

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/itens?usuarioResponsavelId=${id}&status=Disponível`);
        setUserItems(response.data);
      } catch (err) {
        console.error("Erro ao buscar itens do usuário:", err);
      }
    };

    if (id) {
      fetchUserItems();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Carregando perfil...</span>
        </div>
        <p className="mt-2 text-info">Carregando perfil público e itens...</p>
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

  if (!userProfile) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning" role="alert">
          Nenhum usuário encontrado com o ID fornecido.
        </div>
        <Link to="/itens" className="btn btn-primary mt-3">Voltar à lista de itens</Link>
      </div>
    );
  }

  return (
    <div className='bg-light'>
      <div className="container mt-4 public-profile-page-container">
        <div className="card p-4 mb-4 text-center">
          <h2 className="mb-3">Perfil de {userProfile.nome}</h2>
          <p className="text-muted">Membro da nossa comunidade de trocas!</p>
          <h5>Trocas Realizadas: {userProfile.tradesCount || 0}</h5>
        </div>
        <div className='card p-4 mb-4 text-center'>
          <h4 className="text-center mb-4">Itens Disponíveis para Troca</h4>
          {userItems.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
              {userItems.map(item => (
                <div key={item.id} className="col">
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">Este usuário não tem itens disponíveis para troca no momento.</p>
          )}

        </div>

        <div className="text-center mt-4 pb-4">
          <Link to="/itens" className="btn btn-primary">Ver Todos os Itens</Link>
        </div>

      </div>
    </div>
  );
};

export default PublicProfilePage;