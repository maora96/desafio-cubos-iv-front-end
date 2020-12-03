import React from "react";
import "../App.css";
import Header from "../components/header";
import { fazerRequisicaoComBody } from "../utils/fetch";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function AdicionarCobranca() {
  const [id, setId] = React.useState(null);
  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState(null);
  const [vencimento, setVencimento] = React.useState("");

  const [clientes, setClientes] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    const novoToken = localStorage.getItem("token");
    fetch("http://localhost:8081/clientes", {
      headers: {
        Authorization: novoToken && `Bearer ${novoToken}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        const novaCliente = resJson.dados.clientes;
        setClientes(novaCliente);
      });
  }, []);

  return (
    <div className="home">
      <Header />
      <div>
        <Sidebar />
      </div>
      <div className="content">
        <h1>Adicionar cobrança</h1>
        <form
          onSubmit={(event) => {
            console.log(id);
            const novoToken = localStorage.getItem("token");
            event.preventDefault();
            console.log(id, descricao, valor, vencimento);
            fazerRequisicaoComBody(
              "http://localhost:8081/cobrancas",
              "POST",
              {
                idDoCliente: id,
                descricao,
                valor,
                vencimento,
              },
              novoToken
            )
              .then((res) => res.json())
              .then((resJson) => {
                console.log(resJson);
                setId(null);
                setDescricao("");
                setValor(null);
                setVencimento("");

                history.push("/sucesso");
              });
          }}
        >
          <label>
            Cliente
            <select
              name="clientes"
              onChange={(event) => {
                const newId = event.target.value;
                setId(newId);
                console.log(newId);
              }}
            >
              {clientes.map((cliente) => (
                <option value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>
          </label>
          <label>
            Descrição
            <input
              type="text"
              onChange={(event) => {
                setDescricao(event.target.value);
                console.log(descricao);
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
          <button>Adicionar cobrança</button>
        </form>
      </div>
    </div>
  );
}
