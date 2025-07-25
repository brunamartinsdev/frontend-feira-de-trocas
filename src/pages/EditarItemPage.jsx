import React, { useState, useEffect } from "react";
import apiClient from "../api/axiosConfig.js";

import { useParams, useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import './EditarItemPage.css';

const EditarItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [item, setItem] = useState({ nome: "", descricao: "" });
    const [arquivoFoto, setArquivoFoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const token = localStorage.getItem("token");


    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await apiClient.get(`/itens/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { nome, descricao, foto } = response.data;
                setItem({ nome, descricao });
                setPreviewUrl(foto);
            } catch (error) {
                console.error("Erro ao buscar o item:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id, token]);

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleFotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        console.log(`Arquivo original: ${file.name}, tamanho: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {

            const compressedFile = await imageCompression(file, options);
            console.log(`Arquivo comprimido: ${compressedFile.name}, tamanho: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

            setArquivoFoto(compressedFile);
            setPreviewUrl(URL.createObjectURL(compressedFile));

        } catch (error) {
            console.error("Erro ao comprimir a imagem:", error);
            setArquivoFoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Sua sessão expirou. Por favor, faça login novamente.");
            setIsUploading(false);
            navigate('/login');
            return;
        }

        const formData = new FormData();

        formData.append('nome', item.nome);
        formData.append('descricao', item.descricao);

        if (arquivoFoto) {
            formData.append('fotoArquivo', arquivoFoto);
        }

        try {
            await apiClient.put(`/itens/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }),
                alert("Item atualizado com sucesso!");
            navigate("/meus-itens");
        } catch (error) {
            console.error("Erro ao atualizar o item:", error);
            alert("Falha ao atualizar o item.");
        } finally {
            setIsUploading(false);
        }

    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light">
            <div className="container my-5">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h2 className="card-title-linha text-center mb-4">Editar Item</h2>

                        <form onSubmit={handleSubmit}>
                            {previewUrl && (
                                <div className="text-center mb-4">
                                    <img src={previewUrl} alt="Pré-visualização" className="img-fluid rounded" style={{ maxHeight: '200px' }} />
                                </div>
                            )}

                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome do Item</label>
                                <input type="text" className="form-control" id="nome" name="nome" value={item.nome} onChange={handleTextChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="descricao" className="form-label">Descrição</label>
                                <textarea className="form-control" id="descricao" name="descricao" rows="5" value={item.descricao} onChange={handleTextChange} required />
                            </div>

                            <div className="mb-3 text-center pt-3">
                                <label className="btn-cadastrar-imagem ">
                                    Escolher Imagens
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFotoChange}
                                        hidden

                                    />
                                </label>
                                <div className="form-text">Deixe em branco para manter a foto atual.</div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 pt-3 border-top mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate('/meus-itens')}
                                    disabled={isUploading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-alterar d-flex align-items-center"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Salvando...
                                        </>
                                    ) : (
                                        'Salvar Alterações'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarItemPage;