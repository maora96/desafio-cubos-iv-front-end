import React from "react";
import "../App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Cobrancas from "./cobrancas";
import Clientes from "./clientes";
import AdicionarCliente from "./adicionarCliente";

export default function Dashboard() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/cobrancas" component={Cobrancas} />
          <Route path="/clientes" component={Clientes} />
          <Route path="/adicionarCliente" component={AdicionarCliente} />
        </Switch>
      </main>
    </div>
  );
}
