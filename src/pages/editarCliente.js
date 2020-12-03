import React from "react";
import "../App.css";
import Header from "../components/header";
import { fazerRequisicaoComBody } from "../utils/fetch";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function AdicionarCliente() {
  const [id, setId] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cpf, setCPF] = React.useState("");
  const [tel, setTel] = React.useState("");

  const { params } = useRouteMatch();

  const history = useHistory();
  return (
    <div className="home">
      <Header />
      <div>
        <Sidebar />
      </div>
      <div className="content">
        <h1>Editar cliente</h1>
        <form
          onSubmit={(event) => {
            const novoToken = localStorage.getItem("token");

            event.preventDefault();
            fazerRequisicaoComBody(
              "http://localhost:8081/clientes",
              "PUT",
              {
                id: params.id,
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

          <Link to="/clientes">Cancelar</Link>
          <button>Editar cliente</button>
        </form>
      </div>
    </div>
  );
}
