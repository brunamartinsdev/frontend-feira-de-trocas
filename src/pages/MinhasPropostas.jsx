import React, { useEffect, useState } from "react";
import styles from "./MinhasPropostas.module.css";
import axios from "axios";

const MinhasPropostas = () => {
  const [propostasFeitas, setPropostasFeitas] = useState([]);
  const [propostasRecebidas, setPropostasRecebidas] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPropostas = async () => {
      try {
        const feitasResponse = await axios.get("http://localhost:8084/propostas/feitas", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const recebidasResponse = await axios.get("http://localhost:8084/propostas/recebidas", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPropostasFeitas(feitasResponse.data);
        setPropostasRecebidas(recebidasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar propostas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropostas();
  }, [token]);

  const handleResposta = async (id, acao) => {
    try {
      await axios.put(`http://localhost:8084/propostas/${id}/${acao}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Atualiza as propostas depois da ação
      const recebidasAtualizadas = propostasRecebidas.map((p) =>
        p.id === id ? { ...p, status: acao === "aceitar" ? "aceita" : "recusada" } : p
      );
      setPropostasRecebidas(recebidasAtualizadas);
    } catch (error) {
      console.error(`Erro ao ${acao} proposta:`, error);
    }
  };

  const renderStatus = (status) => {
    if (status === "aceita") return <span className={styles.statusAceita}>Aceita</span>;
    if (status === "recusada") return <span className={styles.statusRecusada}>Recusada</span>;
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
                <p><strong>Para:</strong> {proposta.itemDesejado.usuarioResponsavel.nome}</p>
                <p><strong>Item desejado:</strong> {proposta.itemDesejado.nome}</p>
                <p><strong>Item ofertado:</strong> {proposta.itemOfertado.nome}</p>
                {proposta.mensagem && <p><strong>Mensagem:</strong> {proposta.mensagem}</p>}
                <p><strong>Status:</strong> {renderStatus(proposta.status)}</p>
                <p><strong>Data:</strong> {new Date(proposta.dataCriacao).toLocaleString()}</p>
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
                <p><strong>De:</strong> {proposta.quemFez.nome}</p>
                <p><strong>Item ofertado:</strong> {proposta.itemOfertado.nome}</p>
                <p><strong>Item desejado:</strong> {proposta.itemDesejado.nome}</p>
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
