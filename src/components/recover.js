import React from "react";
import "../App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function Recover() {
  return (
    <BrowserRouter>
      <div className="access">
        <form>
          <p>blah blah blah </p>
          <label>
            Email
            <input></input>
          </label>

          <button>Recuperar senha</button>
        </form>
        Tem uma conta?<a href="/">Acesse</a>
      </div>
    </BrowserRouter>
  );
}
