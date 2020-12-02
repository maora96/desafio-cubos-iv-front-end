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
import Sucesso from "./pages/sucesso";

const TokenCTX = React.createContext();

export const useToken = () => {
  return React.useContext(TokenCTX);
};

function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  return (
    <TokenCTX.Provider value={{ token, setToken }}>
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
              <Route path="/sucesso" component={Sucesso} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </TokenCTX.Provider>
  );
}

export default App;

// DUVIDAS
// este mes/ano/desde o inicio
// paginação (dando erro de vez em quando)
// aside não aparece em páginas além de home/dashboard
// um unico style ou para cada componente?
// criar cobrança as vezes da erro por causa de valor não permitido

// A FAZER
// styles
// pagina após criação de cliente/cobrança e edição de cliente !!!nao funciona
