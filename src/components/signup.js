import React from "react";
import "../App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function SignUp() {
  return (
    <BrowserRouter>
      <div className="access">
        <form>
          <label>
            Nome
            <input></input>
          </label>
          <label>
            Email
            <input></input>
          </label>
          <label>
            Senha
            <input></input>
          </label>

          <button>Cadastrar</button>
        </form>
        Tem uma conta?<a href="/">Acesse</a>
      </div>
    </BrowserRouter>
  );
}
