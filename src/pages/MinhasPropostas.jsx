import React, { useEffect, useState } from "react";
import styles from "./MinhasPropostas.module.css";
import axios from "axios";
import { toTitleCase } from '../utils/formatters.js';

const MinhasPropostas = () => {
    const [propostasFeitas, setPropostasFeitas] = useState([]);
    const [propostasRecebidas, setPropostasRecebidas] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchPropostas = async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const [feitasResponse, recebidasResponse] = await Promise.all([
                axios.get("http://localhost:8084/propostas/feitas", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8084/propostas/recebidas", {
                    headers: { Authorization: `Bearer ${token}` },
                })
            ]);

            setPropostasFeitas(feitasResponse.data);

            const propostasAtivas = recebidasResponse.data.filter(p => p.status !== 'cancelada');
            setPropostasRecebidas(propostasAtivas);

        } catch (error) {
            console.error("Erro ao buscar propostas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPropostas();
    }, [token]);

    const handleResposta = async (id, acao) => {
        try {
            await axios.put(`http://localhost:8084/propostas/${id}/${acao}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPropostas();
        } catch (error) {
            console.error(`Erro ao ${acao} proposta:`, error);
            alert(error.response?.data?.error || `Erro ao ${acao} a proposta.`);
        }
    };

    const handleCancelarProposta = async (propostaId) => {
        if (!window.confirm("Tem a certeza de que deseja cancelar esta proposta?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:8084/propostas/${propostaId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPropostasFeitas(propostasAtuais => propostasAtuais.filter(p => p.id !== propostaId));
            alert("Proposta cancelada com sucesso!");
        } catch (error) {
            console.error("Erro ao cancelar proposta:", error);
            alert(error.response?.data?.error || "Não foi possível cancelar a proposta.");
        }
    };

    const renderStatus = (status) => {
        if (status === "aceita") return <span className={styles.statusAceita}>Aceita</span>;
        if (status === "recusada") return <span className={styles.statusRecusada}>Recusada</span>;
        if (status === "cancelada") return <span className={styles.statusCancelada}>Cancelada</span>;
        return <span className={styles.statusPendente}>Pendente</span>;
    };

    if (loading) {
        return <div className={styles.loading}>Carregando propostas...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Minhas Propostas</h1>

            <section className={styles.secao}>
                <h2 className={styles.subtitulo}>📤 Propostas Feitas</h2>
                {propostasFeitas.length === 0 ? (
                    <p className={styles.vazio}>Você ainda não fez nenhuma proposta.</p>
                ) : (
                    <ul className={styles.lista}>
                        {propostasFeitas.map((proposta) => (
                            <li key={proposta.id} className={styles.card}>
                                <div className={styles.imagens}>
                                    <img src={proposta.itemOfertado.foto} alt="Item ofertado" />
                                    <span className={styles.seta}>➡️</span>
                                    <img src={proposta.itemDesejado.foto} alt="Item desejado" />
                                </div>
                                <p><strong>Para:</strong> {toTitleCase(proposta.quemRecebeu?.nome || 'Utilizador')}</p>
                                <p><strong>Item desejado:</strong> {toTitleCase(proposta.itemDesejado.nome)}</p>
                                <p><strong>Item ofertado:</strong> {toTitleCase(proposta.itemOfertado.nome)}</p>
                                {proposta.mensagem && <p><strong>Mensagem:</strong> {proposta.mensagem}</p>}
                                <p><strong>Status:</strong> {renderStatus(proposta.status)}</p>
                                <p><strong>Data:</strong> {new Date(proposta.dataCriacao).toLocaleString()}</p>
                                {proposta.status === "pendente" && (
                                    <div className={styles.botoes}>
                                        <button
                                            onClick={() => handleCancelarProposta(proposta.id)}
                                            className={styles.btnCancelar}
                                        >
                                            Cancelar Proposta
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={styles.secao}>
                <h2 className={styles.subtitulo}>📥 Propostas Recebidas</h2>
                {propostasRecebidas.length === 0 ? (
                    <p className={styles.vazio}>Você ainda não recebeu propostas.</p>
                ) : (
                    <ul className={styles.lista}>
                        {propostasRecebidas.map((proposta) => (
                            <li key={proposta.id} className={styles.card}>
                                <div className={styles.imagens}>
                                    <img src={proposta.itemOfertado.foto} alt="Item ofertado" />
                                    <span className={styles.seta}>➡️</span>
                                    <img src={proposta.itemDesejado.foto} alt="Item desejado" />
                                </div>
                                <p><strong>De:</strong> {toTitleCase(proposta.quemFez.nome)}</p>
                                <p><strong>Item ofertado:</strong> {toTitleCase(proposta.itemOfertado.nome)}</p>
                                <p><strong>Item desejado:</strong> {toTitleCase(proposta.itemDesejado.nome)}</p>
                                {proposta.mensagem && <p><strong>Mensagem:</strong> {proposta.mensagem}</p>}
                                <p><strong>Status:</strong> {renderStatus(proposta.status)}</p>
                                <p><strong>Data:</strong> {new Date(proposta.dataCriacao).toLocaleString()}</p>
                                {proposta.status === "pendente" && (
                                    <div className={styles.botoes}>
                                        <button onClick={() => handleResposta(proposta.id, "aceitar")} className={styles.btnAceitar}>Aceitar</button>
                                        <button onClick={() => handleResposta(proposta.id, "recusar")} className={styles.btnRecusar}>Recusar</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default MinhasPropostas;
