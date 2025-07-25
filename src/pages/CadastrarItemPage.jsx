import React, { useState } from 'react';
import './CadastrarItemPage.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import apiClient from '../api/axiosConfig.js';

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
        const arquivos = Array.from(e.target.files).slice(0, 3);
        setImagens(arquivos);
        setPreviewUrls(arquivos.map((file) => URL.createObjectURL(file)));
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setIsLoading(true);

        if (imagens.length === 0) {
            setErro('Selecione pelo menos uma imagem.');
            setIsLoading(false);
            return;
        }

        try {
            const uploadPromises = imagens.map(imagem => {
                const formData = new FormData();
                formData.append('file', imagem);
                formData.append('upload_preset', 'circulou_unsigned');
                return fetch('https://api.cloudinary.com/v1_1/dzjfzzcps/image/upload', {
                    method: 'POST',
                    body: formData
                }).then(res => res.json());
            });

            const uploadResults = await Promise.all(uploadPromises);
            const uploadedUrls = uploadResults.map(data => data.secure_url);

            const token = localStorage.getItem('token');

            await apiClient.post(
                '/itens', 
                { 
                    nome,
                    descricao,
                    categoria,
                    foto: uploadedUrls[0]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setShowSuccessModal(true);

        } catch (err) {
            console.error("Erro ao cadastrar item:", err);
            setErro(err.response?.data?.error || 'Ocorreu um erro ao cadastrar o item.');
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
