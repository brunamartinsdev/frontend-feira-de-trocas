import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropostaTrocaPage.css";
import { toTitleCase, toSentenceCase } from '../utils/formatters.js';
import apiClient from "../api/axiosConfig.js";

export default function PropostaTrocaPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();

    const [itemDesejado, setItemDesejado] = useState(null);
    const [meusItens, setMeusItens] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [propostaEnviada, setPropostaEnviada] = useState(false);
    const [dataHora, setDataHora] = useState("");
    const [idProposta, setIdProposta] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDados = async () => {
            if (!itemId) return;
            const token = localStorage.getItem("token");

            try {
                const [itemDesejadoRes, meusItensRes] = await Promise.all([
                    apiClient.get(`/itens/${itemId}`),
                    apiClient.get("/itens/usuario/itens?status=Disponível", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setItemDesejado(itemDesejadoRes.data);
                setMeusItens(Array.isArray(meusItensRes.data) ? meusItensRes.data : []);

            } catch (error) {
                console.error("Erro ao carregar dados da página:", error);
                if (error.response?.status === 401) {
                    alert("A sua sessão expirou. Por favor, faça login novamente.");
                    navigate('/login');
                }
            }
        };

        fetchDados();
    }, [itemId, navigate]);

    function gerarIdProposta() {
        return (
            "#" +
            Math.random().toString(36).substring(2, 6).toUpperCase() +
            "-" +
            Math.random().toString(36).substring(2, 6).toUpperCase()
        );
    }

    function enviarProposta() {
        if (!itemSelecionado) {
            alert("Selecione um item seu para a troca.");
            return;
        }

        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString("pt-BR");
        const horaFormatada = agora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });

        setDataHora(`${dataFormatada} às ${horaFormatada}`);
        setIdProposta(gerarIdProposta());
        setMostrarModal(true);
    }

    async function concluirProposta() {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        try {
            await apiClient.post("/propostas",
                {
                    itemDesejadoId: itemDesejado?.id,
                    itemOfertadoId: itemSelecionado,
                    mensagem: mensagem || "",
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setPropostaEnviada(true);
            setTimeout(() => {
                setMostrarModal(false);
                alert("Proposta enviada com sucesso!");
                navigate('/minhas-propostas');
            }, 1000);

        } catch (err) {
            console.error("Erro no envio:", err);
            alert(err.response?.data?.error || "Erro ao enviar proposta");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="proposta-container">
            {itemDesejado && (
                <div className="item-desejado novo-layout">
                    <div className="item-imagem">
                        <img src={itemDesejado.foto} alt="Item desejado" />
                    </div>
                    <div className="item-info">
                        <h2>{toTitleCase(itemDesejado.nome)}</h2>
                        <div className="divisor" />
                        <h4>Descrição</h4>
                        <p>{toSentenceCase(itemDesejado.descricao)}</p>
                        <p>
                            Dono do item:{" "}
                            <a
                                href={`/usuario/${itemDesejado.usuarioResponsavel?.id}`}
                                className="link-usuario"
                            >
                                {toTitleCase(itemDesejado.usuarioResponsavel?.nome)}
                            </a>
                        </p>
                    </div>
                </div>
            )}

            <h3 className="titulo">
                Selecione o item que gostaria de oferecer na proposta
            </h3>

            <div className="lista-itens">
                {Array.isArray(meusItens) && meusItens.length > 0 ? (
                    meusItens.map((item) => (
                        <div
                            key={item.id}
                            className={`item-card ${itemSelecionado === item.id ? "selecionado" : ""
                                }`}
                            onClick={() =>
                                setItemSelecionado((prevSelecionado) =>
                                    prevSelecionado === item.id ? null : item.id
                                )
                            }
                        >
                            <img src={item.foto} alt={item.nome} />
                            <div className="info-item-card">
                                <h4 className="item-nome">{toTitleCase(item.nome)}</h4>
                                <button
                                    className={`btn-propor-item ${itemSelecionado === item.id ? "escolhido" : ""
                                        }`}
                                >
                                    {itemSelecionado === item.id ? "Escolhido!" : "Escolher"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Você ainda não tem itens disponíveis para troca.</p>
                )}
            </div>

            <textarea
                placeholder="Escreva uma mensagem opcional..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="mensagem"
            />

            <button
                onClick={enviarProposta}
                className={`btn-propor ${mostrarModal ? "botao-laranja" : ""}`}
            >
                FAZER PROPOSTA
            </button>

            {mostrarModal && (
                <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
                    <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                        <h3>🔁 Confirmação da Proposta</h3>
                        <p>
                            <strong>Item desejado:</strong> {toTitleCase(itemDesejado?.nome)}
                        </p>
                        <p>
                            <strong>Item oferecido:</strong>{" "}
                            {toTitleCase(meusItens.find((i) => i.id === itemSelecionado)?.nome)}
                        </p>
                        <p>
                            <strong>✉️ Mensagem ao responsável:</strong>{" "}
                            {mensagem ? `"${mensagem}"` : <span>(sem mensagem)</span>}
                        </p>
                        <p>
                            <strong>📅 Proposta feita em:</strong> {dataHora}
                        </p>
                        <p>
                            <strong>🔒 ID da proposta:</strong> {idProposta}
                        </p>

                        <p className="texto-compromisso">
                            ✅ Ao confirmar esta proposta, você assume o compromisso de
                            realizar a troca conforme os itens descritos. O sistema notificará
                            o responsável pelo item e registrará esta solicitação em seu
                            histórico.
                        </p>

                        <button
                            onClick={concluirProposta}
                            className={`btn-concluir ${propostaEnviada ? "verde" : ""}`}
                            disabled={isLoading || propostaEnviada}
                        >
                            {isLoading ? "Enviando..." : propostaEnviada ? "Enviado!" : "Confirmar Proposta"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
