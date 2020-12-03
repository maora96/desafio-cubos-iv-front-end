import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Recover from "./pages/recover";
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

// A FAZER
// styles
// pagina após criação de cliente/cobrança e edição de cliente !!!nao funciona ?? agora funciona [x]
// multiplicar por 100 o valor do adicionar cobrança [x]
// componente com o aside em todas as páginas que possuem aside [x]
// este mes/ano/desde o início [x]
// recover (? - se for muito complicado descartar pois é extras)

// DUVIDAS
// logout nao funciona (token removido, mas requisições ainda funcionam? deixa quieto, funcionou dps). como impedir que o usuario va para a dashboard mesmo sem token?
// login page nao aparece depois de ser movida para a pasta pages. agora aparece. af.
// como pegar o nome do cliente na pagina de cobranças? é preciso fazer um novo fetch, etc?
