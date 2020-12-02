import React from "react";
import "../App.css";
import Header from "../components/header";
import { useToken } from "../App";

export default function Home() {
  const { token, setToken } = useToken();
  const [relatorio, setRelatorio] = React.useState(null);
  React.useEffect(() => {
    const novoToken = localStorage.getItem("token");
    fetch("http://localhost:8081/relatorios", {
      headers: {
        Authorization: novoToken && `Bearer ${novoToken}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        const novoRelatorio = resJson.dados.relatorio;
        setRelatorio(novoRelatorio);
      });
  }, [token, setToken]);

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
              <span>{relatorio?.qtdClientesAdimplentes}</span>
            </div>
            <div>
              Inadimplentes
              <span>{relatorio?.qtdClientesInadimplentes}</span>
            </div>
          </div>
          <div>
            <h2>Cobranças</h2>
            <div>
              Previstas
              <span>{relatorio?.qtdCobrancasPrevistas}</span>
            </div>
            <div>
              Vencidas
              <span>{relatorio?.qtdCobrancasVencidas}</span>
            </div>
            <div>
              Pagas
              <span>{relatorio?.qtdCobrancasPagas}</span>
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
