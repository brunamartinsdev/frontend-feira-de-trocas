import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [modo, setModo] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const API_URL = "http://localhost:8084";

  const alternarModo = () => {
    setModo(modo === "login" ? "cadastro" : "login");
    setErro("");
    setNome("");
    setEmail("");
    setSenha("");
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const rota = modo === "login" ? "/login" : "/usuarios";
      const body = modo === "login"
        ? { email, senha }
        : { nome, email, senha };

      const resposta = await fetch(`${API_URL}${rota}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados?.error || dados?.message || "Erro desconhecido");
        return;
      }

      if (modo === "login") {
        console.log("Usuário logado!", dados);
        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));

        // Notifica outros componentes (como o Header) sobre o login
        window.dispatchEvent(new Event("storage"));

        navigate("/"); // Redireciona para a Home
      } else {
        alert("Cadastro realizado com sucesso! Faça login.");
        setModo("login");
      }

    } catch (err) {
      console.error("Erro:", err);
      setErro("Erro na requisição.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          {modo === "login" ? "Bem-vindo de volta!" : "Criar nova conta"}
        </h2>
        <p className="login-subtitle">
          {modo === "login"
            ? "Faça login para continuar."
            : "Preencha seus dados para se cadastrar."}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {modo === "cadastro" && (
            <div className="form-group">
              <label>Nome completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Digite seu nome"
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {modo === "login" ? "Entrar" : "Cadastrar"}
          </button>

          {erro && <p className="alert alert-danger mt-3">{erro}</p>}
        </form>

        <p className="login-register mt-3">
          {modo === "login" ? (
            <>
              Não tem uma conta?{" "}
              <button className="link-button" onClick={alternarModo}>
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <button className="link-button" onClick={alternarModo}>
                Entrar
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
