import React from "react";
import "../App.css";
import { BrowserRouter } from "react-router-dom";

export default function Sucesso() {
  return (
    <div className="adicionado-sucesso">
      <div className="box">
        <h1>Sucesso!</h1>
        <a href="/dashboard">Voltar para a Dashboard</a>
      </div>
    </div>
  );
}
