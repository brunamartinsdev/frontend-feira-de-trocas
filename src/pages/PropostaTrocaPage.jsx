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
  const [dataHora, setDataHora] = useState("");
  const [idProposta, setIdProposta] = useState("");

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
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8084/propostas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemDesejadoId: itemDesejado?.id,
          itemOfertadoId: itemSelecionado,
          mensagem: mensagem || "",
          responsabilidadeAceita: true,
          dataCriacao: new Date().toISOString(),
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        console.error("Erro detalhado do backend:", resultado);
        throw new Error(resultado.error || "Erro ao enviar proposta");
      }

      console.log("Proposta criada:", resultado);
      setPropostaEnviada(true);
      alert("Proposta enviada com sucesso!");
    } catch (err) {
      console.error("Erro no envio:", err);
      alert(err.message || "Erro ao enviar proposta");
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
              className={`item-card ${
                itemSelecionado === item.id ? "selecionado" : ""
              }`}
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
                  className={`btn-propor-item ${
                    itemSelecionado === item.id ? "escolhido" : ""
                  }`}
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
            <h3>🔁 Confirmação da Proposta</h3>
            <p>
              <strong>Item desejado:</strong> {itemDesejado?.nome}
            </p>
            <p>
              <strong>Item oferecido:</strong>{" "}
              {meusItens.find((i) => i.id === itemSelecionado)?.nome}
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
            >
              {propostaEnviada ? "Concluído!" : "Confirmar Proposta"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
