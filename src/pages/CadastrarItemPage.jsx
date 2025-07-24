import React, { useState } from 'react';
import './CadastrarItemPage.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CadastrarItemPage = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagens, setImagens] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImagemChange = (e) => {
    const arquivos = Array.from(e.target.files).slice(0, 3); // Máximo 3
    setImagens(arquivos);
    setPreviewUrls(arquivos.map((file) => URL.createObjectURL(file)));
  };


  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/'); // Navega para a página principal após fechar o modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setIsLoading(true);

    if (imagens.length === 0) return setErro('Selecione ao menos uma imagem.');

    try {
      const uploadedUrls = [];

      for (const imagem of imagens) {
        const formData = new FormData();
        formData.append('file', imagem);
        formData.append('upload_preset', 'circulou_unsigned');

        const res = await fetch('https://api.cloudinary.com/v1_1/dzjfzzcps/image/upload', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      }

      const token = localStorage.getItem('token');
      const apiRes = await fetch('http://localhost:8084/itens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          descricao,
          categoria,
          foto: uploadedUrls[0] // apenas a primeira imagem por enquanto
        })
      });

      if (!apiRes.ok) {
        const data = await apiRes.json();
        throw new Error(data.error || 'Erro ao cadastrar item.');
      }

      setShowSuccessModal(true);


    } catch (err) {
      console.error(err);
      setErro(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <>
      <div className="cadastro-container">
        <form className="cadastro-card" onSubmit={handleSubmit}>
          <h2 className="titulo">Cadastrar Novo Item</h2>

          {previewUrls.length > 0 && (
            <div className="preview-grid">
              {previewUrls.map((foto, idx) => (
                <img key={idx} src={foto} alt={`Preview ${idx + 1}`} className="preview-img" />
              ))}
            </div>
          )}



          <input
            type="text"
            placeholder="Digite o nome do item"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <textarea
            placeholder="Descreva o produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Ex: Eletrônicos, Livros, Roupas..."
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />

          <label className="btn-cadastrar-imagem">
            Escolher Imagens
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagemChange}
              hidden
            />
          </label>

          {erro && <p className="erro">{erro}</p>}

          <button type="submit" className="btn-cadastrar" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Cadastrando...
              </>
            ) : (
              'Cadastrar Item'
            )}
          </button>
        </form>
      </div>

      <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          O seu item foi cadastrado com sucesso e já está disponível para trocas.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
};

export default CadastrarItemPage;
