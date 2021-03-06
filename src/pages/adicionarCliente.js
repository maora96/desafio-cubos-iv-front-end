import React from "react";
import "../App.css";
import Header from "../components/header";
import { fazerRequisicaoComBody } from "../utils/fetch";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function AdicionarCliente() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cpf, setCPF] = React.useState("");
  const [tel, setTel] = React.useState("");

  const history = useHistory();

  return (
    <div className="home">
      <div>
        <Sidebar />
      </div>
      <div className="add-content">
        <Header />
        <div className="content">
          <h1>// Adicionar cliente</h1>
          <div className="container">
            <form
              onSubmit={(event) => {
                const novoToken = localStorage.getItem("token");
                event.preventDefault();
                fazerRequisicaoComBody(
                  "http://localhost:8081/clientes",
                  "POST",
                  {
                    nome,
                    cpf,
                    email,
                    tel,
                  },
                  novoToken
                )
                  .then((res) => res.json())
                  .then((resJson) => {
                    console.log(resJson);
                    setNome("");
                    setCPF("");
                    setTel("");
                    setEmail("");

                    history.push("/sucesso");
                  });
              }}
            >
              <label>
                Nome
                <input
                  type="text"
                  onChange={(event) => {
                    setNome(event.target.value);
                  }}
                ></input>
              </label>
              <label>
                E-mail
                <input
                  type="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                ></input>
              </label>
              <div className="input-dados">
                <label>
                  CPF
                  <input
                    type="number"
                    onChange={(event) => {
                      setCPF(event.target.value);
                    }}
                  ></input>
                </label>
                <label>
                  Telefone
                  <input
                    type="tel"
                    onChange={(event) => {
                      setTel(event.target.value);
                    }}
                  ></input>
                </label>
              </div>

              <div className="links">
                <Link to="/clientes">Cancelar</Link>
                <button>Adicionar cliente</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
