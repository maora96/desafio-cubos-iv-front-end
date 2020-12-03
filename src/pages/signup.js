import React from "react";
import "../App.css";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { fazerRequisicaoComBody } from "../utils/fetch";
import logo from "../images/logo.png";

export default function SignUp() {
  const [token, setToken] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nome, setNome] = React.useState("");

  const history = useHistory();

  return (
    <div className="flex-container">
      <div className="login-content">
        <div className="access">
          <img src={logo} alt="Logo" />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              fazerRequisicaoComBody("http://localhost:8081/usuarios", "POST", {
                email: email,
                senha: password,
                nome: nome,
              })
                .then((res) => res.json())
                .then((resJson) => {
                  console.log(email);
                  const novoToken = resJson.dados;
                  console.log(resJson);
                  console.log(token);
                  setToken(novoToken);
                  setEmail("");
                  setPassword("");
                  history.push("/login");
                });
            }}
          >
            <label>
              <span>Nome</span>
              <input
                type="text"
                onChange={(event) => {
                  setNome(event.target.value);
                }}
              ></input>
            </label>
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

            <button>Criar conta</button>
          </form>
        </div>

        <div className="bottom-link">
          Tem uma conta? <a href="/">Acesse</a>
        </div>
      </div>
    </div>
  );
}
