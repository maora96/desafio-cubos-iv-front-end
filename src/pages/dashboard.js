import React from "react";
import "../App.css";
import Home from "./home";
import Cobrancas from "./cobrancas";
import Clientes from "./clientes";

export default function Dashboard() {
  return (
    <BrowserRouter>
      <div className="App">
        <aside>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cobrancas">Cobranças</a>
            </li>
            <li>
              <a href="/clientes">Clientes</a>
            </li>
          </ul>

          <button>Criar cobrança</button>
        </aside>
        <main>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/cobrancas" component={Cobrancas} />
            <Route path="/clientes" component={Clientes} />
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
