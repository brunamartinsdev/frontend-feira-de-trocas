import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropostaTrocaPage.css";

export default function PropostaTrocaPage() {
  const { id } = useParams(); // id do item desejado
  const [itemDesejado, setItemDesejado] = useState(null);
  const [meusItens, setMeusItens] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");

  // Buscar item desejado
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8084/itens/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Item não encontrado");
        return res.json();
      })
      .then((data) => setItemDesejado(data))
      .catch((err) => console.error("Erro ao carregar item desejado:", err));
  }, [id]);

  // Buscar meus itens
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8084/usuarios/itens", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar seus itens");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMeusItens(data);
        } else {
          console.error("Resposta inesperada:", data);
          setMeusItens([]);
        }
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
        <div className="item-desejado">
          <img src={itemDesejado.imagemUrl} alt="Item desejado" />
          <div>
            <h2>{itemDesejado.nome}</h2>
            <p>{itemDesejado.descricao}</p>
          </div>
        </div>
      )}

      <h3 className="titulo">Selecione o item que gostaria de oferecer na proposta</h3>

      <div className="lista-itens">
        {Array.isArray(meusItens) && meusItens.length > 0 ? (
          meusItens.map((item) => (
            <div
              key={item.id}
              className={`item-card ${itemSelecionado === item.id ? "selecionado" : ""}`}
              onClick={() => setItemSelecionado(item.id)}
            >
              <img src={item.imagemUrl} alt={item.nome} />
              <h4>{item.nome}</h4>
              <p>{item.descricao}</p>
              <button>Escolher</button>
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
