import React from "react";
import "../App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./home";
import Cobrancas from "./cobrancas";
import Clientes from "./clientes";
import AdicionarCliente from "./adicionarCliente";

export default function Dashboard() {
  return (
    <BrowserRouter>
      <div className="App">
        <aside>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/cobrancas">Cobranças</a>
            </li>
            <li>
              <a href="/clientes">Clientes</a>
            </li>
          </ul>

          <a href="/criarCobranca">Criar cobrança</a>
        </aside>
        <main>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route path="/cobrancas" component={Cobrancas} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/adicionarCliente" component={AdicionarCliente} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>

    /*<div className="yo">
      {token !== null ? (
        <h1>Hello from home dear logged in client</h1>
      ) : (
        <div>
          <h1>Hello from home dear stranger</h1>
          <Access />
        </div>
      )}
    </div>*/
  );
}
