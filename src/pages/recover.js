import React from "react";
import "../App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { fazerRequisicaoComBody } from "../utils/fetch";

export default function Recover() {
  const [email, setEmail] = React.useState("");
  return (
    <div className="access">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fazerRequisicaoComBody(
            "https://cubos-desafio-4.herokuapp.com/?",
            "POST",
            {
              email,
            }
          )
            .then((res) => res.json())
            .then((resJson) => {
              console.log(resJson);
              setEmail("");
            });
        }}
      >
        <p>blah blah blah </p>
        <label>
          Email
          <input
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
        </label>

        <button>Recuperar senha</button>
      </form>
    </div>
  );
}
