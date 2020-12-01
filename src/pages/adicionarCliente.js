import React from "react";
import "../App.css";
import Header from "../components/header";
import { fazerRequisicaoComBody } from "../utils/fetch";

export default function AdicionarCliente() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cpf, setCPF] = React.useState("");
  const [tel, setTel] = React.useState("");

  return (
    <div className="home">
      <Header />

      <div className="content">
        <h1>Adicionar cliente</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fazerRequisicaoComBody(
              "https://cubos-desafio-4.herokuapp.com/clientes",
              "POST",
              {
                nome,
                cpf,
                email,
                tel,
              }
            )
              .then((res) => res.json())
              .then((resJson) => {
                console.log(resJson);
                setNome("");
                setCPF("");
                setTel("");
                setEmail("");
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
          <button>Adicionar cliente</button>
        </form>
      </div>
    </div>
  );
}
