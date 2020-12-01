import React from "react";
import "../App.css";
import Header from "../components/header";
import { fazerRequisicaoComBody } from "../utils/fetch";

export default function AdicionarCobranca() {
  const [id, setId] = React.useState(null);
  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState(null);
  const [vencimento, setVencimento] = React.useState("");

  return (
    <div className="home">
      <Header />

      <div className="content">
        <h1>Adicionar cobrança</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fazerRequisicaoComBody(
              "https://cubos-desafio-4.herokuapp.com/cobrancas",
              "POST",
              {
                idDoClienet: id,
                descricao,
                valor,
                vencimento,
              }
            )
              .then((res) => res.json())
              .then((resJson) => {
                console.log(resJson);
                setIdn(null);
                setDescricao("");
                setValor(null);
                setVencimento("");
              });
          }}
        >
          <label>
            Cliente
            <input
              type="text"
              onChange={(event) => {
                setId(event.target.value);
              }}
            ></input>
          </label>
          <label>
            Descrição
            <input
              type="text"
              onChange={(event) => {
                setDescricao(event.target.value);
              }}
            ></input>
          </label>
          <label>
            Valor
            <input
              type="number"
              onChange={(event) => {
                setValor(event.target.value);
              }}
            ></input>
          </label>
          <label>
            Vencimento
            <input
              type="text"
              onChange={(event) => {
                setVencimento(event.target.value);
              }}
            ></input>
          </label>

          <Link to="/dashboard">Cancelar</Link>
          <button>Adicionar cliente</button>
        </form>
      </div>
    </div>
  );
}
