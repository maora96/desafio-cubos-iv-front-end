import React from "react";
import "../App.css";
import logo from "../images/logo-white.png";
import users from "../images/users.png";
import money from "../images/carbon_money.png";
import home from "../images/home.png";

export default function Sidebar() {
  return (
    <aside>
      <img src={logo} alt="Logo" />
      <ul>
        <li>
          <img src={home} alt="Home" />
          <a href="/dashboard">Home</a>
        </li>
        <li>
          <img src={money} alt="Cobranças" />
          <a href="/cobrancas">Cobranças</a>
        </li>
        <li>
          <img src={users} alt="Clientes" />
          <a href="/clientes">Clientes</a>
        </li>
      </ul>

      <a href="/adicionarCobranca" className="cobranca-button">
        Criar cobrança
      </a>
    </aside>
  );
}
