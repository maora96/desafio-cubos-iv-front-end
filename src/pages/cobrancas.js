import React from "react";
import "../App.css";
import Header from "../components/header";

export default function Cobrancas() {
  return (
    <div className="cobrancas">
      <Header />

      <div className="search">
        <input></input>
        <button>Buscar</button>
      </div>

      <div className="tabela-cobrancas"></div>
      <div className="pagination"></div>
    </div>
  );
}
