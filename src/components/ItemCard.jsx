import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleProporTroca = () => {
    navigate(`/proposta-troca/${item.id}`); // rota correta
  };

  return (
    <div className="card h-100">
      {item.foto ? (
        <img
          src={item.foto}
          alt={item.nome}
          className="card-img-top"
          style={{ height: '300px', objectFit: 'cover' }}
        />
      ) : (
        <div
          className="card-img-top bg-light d-flex align-items-center justify-content-center"
          style={{ height: '300px' }}
        >
          <span className="text-muted">Sem Foto</span>
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.nome}</h5>
        <p className="card-text text-muted mb-1">
          Categoria: {item.categoria}
        </p>
        <p className="card-text text-muted mb-3">
          Usuário: {item.usuarioResponsavel?.nome ?? 'Desconhecido'}
        </p>

        {}
        <button
          className="btn-propor-item mt-auto"
          onClick={handleProporTroca}
        >
          Propor Troca
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
