import React from "react";
import "../App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function Login() {
  return (
    <BrowserRouter>
      <div className="access">
        <form>
          <label>
            Email
            <input></input>
          </label>
          <label>
            Senha
            <input></input>
          </label>
          <a href="/recover">Esqueci minha senha</a>

          <button>Entrar</button>
        </form>
        Não tem uma conta?<a href="/signup">Cadastre-se</a>
      </div>
    </BrowserRouter>
  );
}
