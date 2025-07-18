import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropostaTrocaPage.css";

export default function PropostaTrocaPage() {
  const { itemId } = useParams();
  const [itemDesejado, setItemDesejado] = useState(null);
  const [meusItens, setMeusItens] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [propostaEnviada, setPropostaEnviada] = useState(false);

  useEffect(() => {
    if (!itemId) return;

    fetch(`http://localhost:8084/itens/${itemId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Item não encontrado");
        return res.json();
      })
      .then((data) => setItemDesejado(data))
      .catch((err) => console.error("Erro ao carregar item desejado:", err));
  }, [itemId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8084/itens/usuario/itens", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar seus itens");
        return res.json();
      })
      .then((data) => {
        setMeusItens(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Erro ao carregar seus itens:", err));
  }, []);

  function enviarProposta() {
    if (!itemSelecionado) {
      alert("Selecione um item seu para a troca.");
      return;
    }
    setMostrarModal(true);
  }

  function concluirProposta() {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8084/trocas/propor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemDesejadoId: itemDesejado?.id,
        itemOferecidoId: itemSelecionado,
        mensagem,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao enviar proposta");
        setPropostaEnviada(true);
        alert("Proposta enviada com sucesso!");
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="proposta-container">
      {itemDesejado && (
        <div className="item-desejado novo-layout">
          <div className="item-imagem">
            <img src={itemDesejado.foto} alt="Item desejado" />
          </div>
          <div className="item-info">
            <h2>{itemDesejado.nome}</h2>
            <div className="divisor" />
            <h4>Descrição</h4>
            <p>{itemDesejado.descricao}</p>
            <p>
              Dono do item:{" "}
              <a
                href={`/usuario/${itemDesejado.usuarioResponsavel?.id}`}
                className="link-usuario"
              >
                @{itemDesejado.usuarioResponsavel?.nome}
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
              className={`item-card ${itemSelecionado === item.id ? "selecionado" : ""}`}
              onClick={() =>
             setItemSelecionado((prevSelecionado) =>
              prevSelecionado === item.id ? null : item.id
             )
            }
            >
              <img src={item.foto} alt={item.nome} />
              <div className="info-item-card">
                <h4 className="item-nome">{item.nome}</h4>
                <button
                  className={`btn-propor-item ${itemSelecionado === item.id ? "escolhido" : ""}`}
                >
                  {itemSelecionado === item.id ? "Escolhido!" : "Escolher"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não tem itens cadastrados para trocar.</p>
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
      <h3>Confirmação da Proposta</h3>
      <p><strong>Item desejado:</strong> {itemDesejado?.nome}</p>
      <p>
        <strong>Item oferecido:</strong>{" "}
        {meusItens.find((i) => i.id === itemSelecionado)?.nome}
      </p>
      <p><strong>Mensagem:</strong> {mensagem || "(sem mensagem)"}</p>

      <button
        onClick={concluirProposta}
        className={`btn-concluir ${propostaEnviada ? "verde" : ""}`}
      >
        {propostaEnviada ? "Concluído!" : "Concluir"}
      </button>
    </div>
  </div>
)}

    </div>
  );
}
