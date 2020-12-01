import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import Recover from "./components/recover";
import Dashboard from "./pages/dashboard";
import Cobrancas from "./pages/cobrancas";
import Clientes from "./pages/clientes";
import AdicionarCliente from "./pages/adicionarCliente";
import AdicionarCobranca from "./pages/adicionarCobranca";
import EditarCliente from "./pages/editarCliente";

function App() {
  const [token, setToken] = React.useState(null);
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/recover" component={Recover} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/cobrancas" component={Cobrancas} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/adicionarCliente" component={AdicionarCliente} />
            <Route path="/adicionarCobranca" component={AdicionarCobranca} />
            <Route path="/editarCliente/:id" component={EditarCliente} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
// como pegar id do cliente no editar cliente? (criar uma array de clientes? se sim, como exatamente transferir entre componentes? (contexto?)) [x]
// como redirecionar para a dashboard depois do login? (rotas? mas como exatamente?) [x]
// como selecionar o cliente no editar cliente e no adicionar cobrança? (procurar na array?) [x]
// como redirecionar o cancelar do adicionar cliente/editar cliente/criar cobrança? [x]
