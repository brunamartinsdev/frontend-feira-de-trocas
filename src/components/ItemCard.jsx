import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ItemCard.css';
import { toTitleCase, capitalizeFirstLetter } from '../utils/formatters.js';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleProporTroca = () => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate(`/proposta-troca/${item.id}`);
    } else {
      navigate('/login');
    }
  };

  const handleVerDetalheClick = () => {
    navigate(`/itens/${item.id}`);
  };

  return (

    <div className="card h-100">
      {item.foto ? (
        <img
          src={item.foto}
          alt={item.nome}
          className="card-img-top"
          style={{ height: '220px', objectFit: 'cover' }}
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
        <h5 className="card-title">{toTitleCase(item.nome)}</h5>
        <p className="card-text text-muted mb-1">
          Categoria: {capitalizeFirstLetter(item.categoria)}
        </p>
        <p className="card-text text-muted mb-3">
          Usuário: {" "}
            {item.usuarioResponsavel ? (
            <Link to={`/usuario/${item.usuarioResponsavel.id}`} className="text-info text-decoration-none fw-bold" >
              {toTitleCase(item.usuarioResponsavel.nome)}
            </Link>
          ) : (
            'Desconhecido'
          )}
        </p>

        <div className='d-flex flex-column flex-row justify-content-center mt-auto gap-2 '>
          <button
            className="btn btn-primary"
            onClick={handleProporTroca}
            style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}
          >
            Propor Troca
          </button>

          <button className="btn btn-outline-primary " style={{ color: '#3accfa', borderColor: '#3accfa' }} onClick={handleVerDetalheClick}>
            Ver Detalhe
          </button>
        </div>
      </div>
    </div>

  );
};

export default ItemCard;
