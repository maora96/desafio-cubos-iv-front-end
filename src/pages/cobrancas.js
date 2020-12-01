import React from "react";
import "../App.css";
import Header from "../components/header";

export default function Cobrancas() {
  const [busca, setBusca] = React.useState("");
  React.useEffect(() => {
    fetch("https://cubos-desafio-4.herokuapp.com/cobrancas")
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
      });
  }, []);
  return (
    <div className="cobrancas">
      <Header />

      <div className="search">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetch("https://cubos-desafio-4.herokuapp.com/cobrancas")
              ///adicionar busca clientes por pagina offset
              .then((res) => res.json())
              .then((resJson) => {
                console.log(resJson);
                setBusca("");
              });
          }}
        >
          <input
            type="text"
            onChange={(event) => {
              setBusca(event.target.value);
            }}
          ></input>
        </form>
        <button>Buscar</button>
      </div>

      <div className="tabela-cobrancas"></div>
      <div className="pagination"></div>
    </div>
  );
}
