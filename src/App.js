import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import Recover from "./components/recover";

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
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
