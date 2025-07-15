import React from 'react';
import { useNavigate } from 'react-router-dom'; // adicionado para navegação

const ItemCard = ({ item }) => {
    const navigate = useNavigate(); // hook para redirecionamento

    const handleProporTroca = () => {
        navigate(`/propor-troca/${item.id}`); //  redireciona com o ID do item
    };

    return (
        <div className="card h-100">
            {item.foto ?
                <img src={item.foto} alt={item.nome} className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} />
                :
                <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '180px' }}>
                    <span className="text-muted">Sem Foto</span>
                </div>
            }
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.nome}</h5>
                <p className="card-text text-muted mb-2">Categoria: {item.categoria}</p>
                <p className="card-text text-muted mb-2">Usuário: {item.usuarioResponsavel.nome}</p>
                <button
                    className="btn btn-primary btn-sm mt-auto custom-troca-button"
                    style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}
                    onClick={handleProporTroca} // evento adicionado
                >
                    Propor Troca
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
