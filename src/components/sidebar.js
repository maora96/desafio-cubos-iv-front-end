import React from "react";
import "../App.css";

export default function Sidebar() {
  return (
    <aside>
      <ul>
        <li>
          <a href="/dashboard">Home</a>
        </li>
        <li>
          <a href="/cobrancas">Cobranças</a>
        </li>
        <li>
          <a href="/clientes">Clientes</a>
        </li>
      </ul>

      <a href="/adicionarCobranca">Criar cobrança</a>
    </aside>
  );
}
