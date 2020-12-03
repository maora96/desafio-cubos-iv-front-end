import React from "react";
import "../App.css";
import { BrowserRouter, Link, useHistory } from "react-router-dom";
import { fazerRequisicaoComBody } from "../utils/fetch";
import Dashboard from "./dashboard";
import { useToken } from "../App";
import logo from "../images/logo.png";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { token, setToken } = useToken();
  const history = useHistory();

  return (
    <div className="flex-container">
      <div className="login-content">
        <div className="access">
          <img src={logo} alt="Logo" />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              fazerRequisicaoComBody("http://localhost:8081/auth", "POST", {
                email: email,
                senha: password,
              })
                .then((res) => res.json())
                .then((resJson) => {
                  const dados = resJson.dados;
                  console.log(dados);
                  const novoToken = resJson.dados.token;
                  setToken(novoToken);
                  setEmail("");
                  setPassword("");
                  if (resJson.dados.token) {
                    setToken(resJson.dados.token);
                    localStorage.setItem("token", resJson.dados.token);
                  }
                  history.push("/dashboard");
                });
            }}
          >
            <label>
              <span>E-mail</span>
              <input
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </label>
            <label>
              <span>Senha</span>
              <input
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </label>
            <Link to="/recover">Esqueci minha senha</Link>

            <button>Entrar</button>
          </form>
        </div>
        <div className="bottom-link">
          Não tem uma conta? <a href="/signup">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}
