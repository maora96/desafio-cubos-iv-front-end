import React from "react";
import "../App.css";
import { BrowserRouter, Link, useHistory } from "react-router-dom";
import { fazerRequisicaoComBody } from "../utils/fetch";
import Dashboard from "./dashboard";
import { useToken } from "../App";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { token, setToken } = useToken();
  const history = useHistory();

  return (
    <BrowserRouter>
      {token !== null ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <div className="access">
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
              Email
              <input
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </label>
            <label>
              Senha
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
          Não tem uma conta?<a href="/signup">Cadastre-se</a>
        </div>
      )}
    </BrowserRouter>
  );
}
