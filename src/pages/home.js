import React from "react";
import "../App.css";
import Header from "../components/header";

export default function Home() {
  React.useEffect(() => {
    fetch("https://cubos-desafio-4.herokuapp.com/relatorios")
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
      });
  }, []);

  return (
    <div className="home">
      <Header />

      <div className="content">
        <ul>
          <li>Este mês</li>
          <li>Este ano</li>
          <li>Desde o início</li>
        </ul>

        <div className="data">
          <div>
            <h2>Clientes</h2>
            <div>
              Em dia
              <span>0</span>
            </div>
            <div>
              Inadimplentes
              <span>0</span>
            </div>
          </div>
          <div>
            <h2>Cobranças</h2>
            <div>
              Previstas
              <span>0</span>
            </div>
            <div>
              Vencidas
              <span>0</span>
            </div>
            <div>
              Pagas
              <span>0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="faturamento">
        <ul>
          <li>Por mês</li>
          <li>Por dia</li>
        </ul>

        <div className="graph"></div>
      </div>
    </div>
  );
}
