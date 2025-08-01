import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig.js";

import { useNavigate } from "react-router-dom";
import styles from "./MeusItensPage.module.css";
import { toTitleCase, capitalizeFirstLetter } from '../utils/formatters.js';

const MeusItensPage = () => {
  const [itens, setItens] = useState([]);
  const [itemIdParaExcluir, setItemIdParaExcluir] = useState(null);
  const [descricaoExpandida, setDescricaoExpandida] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMeusItens = async () => {
      try {
        const response = await apiClient.get("/itens/usuario/itens", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItens(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erro ao buscar os itens:", error);
      }
    };

    fetchMeusItens();
  }, [token]);

  const handleEditar = (itemId) => {
    navigate(`/editar-item/${itemId}`);
  };

  const confirmarExclusao = (itemId) => {
    setItemIdParaExcluir(itemId);
  };

  const cancelarExclusao = () => {
    setItemIdParaExcluir(null);
  };

  const excluirItem = async () => {
    setIsDeleting(true);

    try {
      await apiClient.delete(`/itens/${itemIdParaExcluir}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItens(itens.filter((item) => item.id !== itemIdParaExcluir));
      setItemIdParaExcluir(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Falha ao excluir o item.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>
        Meus Itens Cadastrados <span className={styles.contador}>({itens.length})</span>
      </h2>

      <button
        className={styles.botaoCadastrar}
        onClick={() => navigate("/cadastrar-item")}
      >
        Cadastrar Novo Item
      </button>

      {itens.length === 0 ? (
        <p className={styles.mensagem}>Você ainda não cadastrou nenhum item.</p>
      ) : (
        <div className={styles.listaItens}>
          {itens.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <img src={item.foto} alt={item.nome} className={styles.imagem} />
              <div className={styles.informacoes}>
                <h3>{toTitleCase(item.nome)}</h3>
                <p
                  className={styles.descricaoLimitada}
                  onClick={() => setDescricaoExpandida(item)}
                  title="Clique para ver mais"
                >
                  {capitalizeFirstLetter(item.descricao)}
                </p>
                <div className={styles.botoes}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditar(item.id)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => confirmarExclusao(item.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {itemIdParaExcluir && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Tem certeza que deseja excluir este item?</p>
            <div className={styles.modalBotoes}>
              <button
                onClick={excluirItem}
                className={styles.confirmar}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Excluindo...
                  </>
                ) : (
                  'Sim, excluir'
                )}
              </button>
              <button
                onClick={cancelarExclusao}
                className={styles.cancelar}
                disabled={isDeleting}

              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {descricaoExpandida && (
        <div className={styles.modalOverlay} onClick={() => setDescricaoExpandida(null)}>
          <div className={styles.modalDescricao} onClick={(e) => e.stopPropagation()}>
            <h3>{descricaoExpandida.nome}</h3>
            <p>{descricaoExpandida.descricao}</p>
            <button className={styles.fecharDescricao} onClick={() => setDescricaoExpandida(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeusItensPage;
