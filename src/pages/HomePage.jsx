import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig.js';
import ItemCard from '../components/ItemCard.jsx';
import tituloCirculou from '../assets/tituloCirculou.jpg';
import { MdSearch } from 'react-icons/md'; 
import './HomePage.css'
  

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState(['TODOS']);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
                status: 'Disponível' 
            };

        if (searchQuery) {
          params.busca = searchQuery;
        }
        if (activeCategory && activeCategory !== 'TODOS') {
          params.categoria = activeCategory;
        }
        const response = await apiClient.get(`itens`, { params }); 
        setItems(response.data);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
        setError("Falha ao carregar itens. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get(`/categorias`);
        setAvailableCategories(response.data); 
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); 
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(prevState => !prevState);
  };

  return (
    <main className="container-fluid py-4 flex-grow-1 bg-light px-5">
      <section className="text-center mb-4">
        <img src={tituloCirculou} alt="Circulou" className="img-fluid" style={{ maxWidth: '200px', borderBottom: 'solid 3.5px orange'}} />
        <p className="lead py-4">TUDO GANHA NOVO SENTIDO QUANDO CIRCULA.</p>
      </section>

      {/* Barra de Busca */}
      <section className="d-flex justify-content-center mb-4">
        <div className="input-group" style={{ maxWidth: '400px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar itens..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Buscar itens"
          />
          <button className="btn btn-info" type="button" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>
            <MdSearch style={{ color: 'white' }} />
          </button>
        </div>
      </section>

      {/* Botão de Filtro de Categoria */}
      <section className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        <div className="dropdown">
          <button
            className={`btn btn-outline-info px-4 dropdown-toggle ${isCategoryDropdownOpen ? 'active' : ''}`}
            type="button"
            id="dropdownCategoryButton"
            onClick={toggleCategoryDropdown}
            aria-expanded={isCategoryDropdownOpen ? 'true' : 'false'}
          >
            {activeCategory === 'TODOS' ? 'TODAS AS CATEGORIAS' : activeCategory.toUpperCase()}
          </button>
          <ul 
            className={`dropdown-menu ${isCategoryDropdownOpen ? 'show' : ''}`} 
            aria-labelledby="dropdownCategoryButton"
          >
            {availableCategories.map(cat => (
              <li key={cat}>
                <a 
                  className={`dropdown-item ${activeCategory === cat ? 'active' : ''}`} 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleCategoryChange(cat); }}
                >
                  {cat.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Listagem de Itens */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Carregando itens...</span>
          </div>
          <p className="mt-2 text-info">Carregando itens...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger my-5 text-center" role="alert">
          Erro: {error}
        </div>
      ) : items.length > 0 ? (
        <section className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {items.map(item => (
            <div key={item.id} className="col">
              <ItemCard item={item} />
            </div>
          ))}
        </section>
      ) : (
        <div className="text-center my-5">
          <p className="lead text-muted">Nenhum item encontrado para esta busca ou categoria.</p>
        </div>
      )}
    </main>
  );
};

export default HomePage;