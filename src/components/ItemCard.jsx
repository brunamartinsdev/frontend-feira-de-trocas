import React from 'react';

const ItemCard = ({ item }) => { //recebe um objeto 'item' como prop
    return (
        <div className="card h-100"> 
            {item.foto ?
                //se o item tem foto, usa a imagem real
                <img src={item.foto} alt={item.nome} className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} /> 
            :
            //placeholder de imagem se não tiver foto
            <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '180px' }}>
                <span className="text-muted">Sem Foto</span>
            </div>
      }
            <div className="card-body d-flex flex-column"> 
                <h5 className="card-title">{item.nome}</h5> 
                <p className="card-text text-muted mb-2">Categoria: {item.categoria}</p> 
                <p className="card-text text-muted mb-2">Usuário: {item.usuarioResponsavel.nome}</p> 
                <button className="btn btn-primary btn-sm mt-auto custom-troca-button" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Propor Troca</button>
            </div>
        </div>
    );
};

export default ItemCard;