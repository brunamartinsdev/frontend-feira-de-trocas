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

      console.log("🔵 Propostas feitas =>", feitasResponse.data);
      console.log("🟢 Propostas recebidas =>", recebidasResponse.data);

      setPropostasFeitas(feitasResponse.data);
      setPropostasRecebidas(recebidasResponse.data);
    } catch (error) {
      console.error("❌ Erro ao buscar propostas:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPropostas();
}, [token]);


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
                <p><strong>Para:</strong> {proposta.itemDesejado.usuarioResponsavel.nome}</p>
                <p><strong>Item desejado:</strong> {proposta.itemDesejado.nome}</p>
                <p><strong>Item ofertado:</strong> {proposta.itemOfertado.nome}</p>
                <p><strong>Status:</strong> {proposta.status}</p>
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
                <p><strong>De:</strong> {proposta.quemFez.nome}</p>
                <p><strong>Item desejado:</strong> {proposta.itemDesejado.nome}</p>
                <p><strong>Item ofertado:</strong> {proposta.itemOfertado.nome}</p>
                <p><strong>Status:</strong> {proposta.status}</p>
                <p><strong>Data:</strong> {new Date(proposta.dataCriacao).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MinhasPropostas;
