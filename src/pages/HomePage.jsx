import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import tituloCirculou from '../assets/tituloCirculou.jpg';
import ItemCard from '../components/ItemCard.jsx';


//URL do backend 
const API_BASE_URL = 'http://localhost:8084'; 

const HomePage = () => {
  //estados para armazenar os itens, status de carregamento e erros
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect para buscar os itens quando o componente é montado
  useEffect(() => {
    const fetchItems = async () => {
      try {
        //requisição GET para o endpoint de listar itens do backend
        //rota pública, então não precisa de token.
        const response = await axios.get(`${API_BASE_URL}/itens`); 
        setItems(response.data); //axios coloca a resposta dentro de .data
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
        setError("Falha ao carregar itens. Por favor, tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchItems(); //chama a função de busca ao montar o componente
  }, []); //array vazio: para rodar apenas uma vez 

  //lógica para exibir estado de carregamento, erro ou a lista de itens
  if (loading) {
    return (
      <main className="container-fluid py-4 flex-grow-1 text-center bg-light">
        <section className="mb-4">
          <img src={tituloCirculou} alt="Circulou" className="img-fluid" style={{ maxWidth: '200px' }} /> 
          <hr className="mx-auto" style={{ height: '4px', width: '130px', backgroundColor: '#f06135', border: 'none', borderRadius: '2px' }} />
          <p className="lead">TUDO GANHA NOVO SENTIDO QUANDO CIRCULA.</p>
        </section>
        <div className="my-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Carregando itens...</span>
          </div>
          <p className="mt-2 text-info">Carregando itens...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container-fluid py-4 flex-grow-1 text-center bg-light">
        <section className="mb-4">
          <img src={tituloCirculou} alt="Circulou" className="img-fluid" style={{ maxWidth: '200px' }} /> 
          <hr className="mx-auto" style={{ height: '4px', width: '130px', backgroundColor: '#f06135', border: 'none', borderRadius: '2px' }} />
          <p className="lead">TUDO GANHA NOVO SENTIDO QUANDO CIRCULA.</p>
        </section>
        <div className="alert alert-danger my-5" role="alert"> 
          Erro: {error}
        </div>
      </main>
    );
  }

  return (
    <main className="container-fluid py-4 flex-grow-1 bg-light">
      <section className="text-center mb-4">
        <img src={tituloCirculou} alt="Circulou" className="img-fluid" style={{ maxWidth: '200px' }} /> 
        <hr className="mx-auto" style={{ height: '4px', width: '130px', backgroundColor: '#f06135', border: 'none', borderRadius: '2px' }} />
        <p className="lead">TUDO GANHA NOVO SENTIDO QUANDO CIRCULA.</p>
      </section>

      {/* botões de filtro */}
      <section className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        <button className="btn btn-outline-info active rounded-pill px-4">TODOS</button>
        <button className="btn btn-outline-info rounded-pill px-4">EM DESTAQUE</button>
        <button className="btn btn-outline-info rounded-pill px-4">CATEGORIA</button>
        <button className="btn btn-outline-info rounded-pill px-4">ADICIONADOS POR ÚLTIMO</button>
      </section>

      {/* listag de itens */}
      <section className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {items.map(item => (
          <div key={item.id} className="col">
            <ItemCard item={item} /> 
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomePage;