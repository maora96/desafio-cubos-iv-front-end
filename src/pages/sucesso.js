import React from "react";
import "../App.css";
import { BrowserRouter } from "react-router-dom";

export default function Sucesso() {
  return (
    <BrowserRouter>
      <div className="adicionado-sucesso">
        <h1>Sucesso!</h1>
        <a href="/dashboard">Voltar para a Dashboard</a>
      </div>
    </BrowserRouter>
  );
}
