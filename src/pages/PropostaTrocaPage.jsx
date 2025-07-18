import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropostaTrocaPage.css";

export default function PropostaTrocaPage() {
  const { itemId } = useParams();
  const [itemDesejado, setItemDesejado] = useState(null);
  const [meusItens, setMeusItens] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!itemId) return;

    fetch(`http://localhost:8084/itens/${itemId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Item não encontrado");
        return res.json();
      })
      .then((data) => {
        console.log("Item desejado recebido:", data);
        setItemDesejado(data);
      })
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
    const token = localStorage.getItem("token");

    if (!itemSelecionado) {
      alert("Selecione um item seu para a troca.");
      return;
    }

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
              onClick={() => setItemSelecionado(item.id)}
            >
              <img src={item.foto} alt={item.nome} />
              <div className="info-item-card">
                <h4 className="item-nome">{item.nome}</h4>
                <button className="btn-propor-item">Escolher</button>
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

      <button onClick={enviarProposta} className="btn-propor">
        FAZER PROPOSTA
      </button>
    </div>
  );
}
