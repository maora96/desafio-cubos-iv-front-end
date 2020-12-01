import React from "react";
import "../App.css";
import Header from "../components/header";

export default function Clientes() {
  const [busca, setBusca] = React.useState("");
  React.useEffect(() => {
    fetch("https://cubos-desafio-4.herokuapp.com/clientes")
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
      });
  }, []);
  return (
    <div className="clientes">
      <Header />

      <div className="search">
        <a href="/adicionarCliente">Adicionar cliente</a>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetch("https://cubos-desafio-4.herokuapp.com/clientes")
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

      <div className="tabela-clientes">
        <button>Editar</button>
        <div>Passar o id no submit do button de editar</div>
      </div>
      <div className="pagination"></div>
    </div>
  );
}
