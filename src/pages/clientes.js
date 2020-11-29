import React from "react";
import "../App.css";
import Header from "../components/header";

export default function Clientes() {
  return (
    <div className="clientes">
      <Header />

      <div className="search">
        <button>Adicionar cliente</button>
        <input></input>
        <button>Buscar</button>
      </div>

      <div className="tabela-clientes"></div>
      <div className="pagination"></div>
    </div>
  );
}
