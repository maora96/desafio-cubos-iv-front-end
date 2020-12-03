import React from "react";
import "../App.css";
import Header from "../components/header";
import { useToken } from "../App";
import Sidebar from "../components/sidebar";

export default function Home() {
  const { token, setToken } = useToken();
  const [relatorio, setRelatorio] = React.useState(null);
  const [periodo, setPeriodo] = React.useState("mes");

  React.useEffect(() => {
    const novoToken = localStorage.getItem("token");
    fetch(`http://localhost:8081/relatorios?periodo=${periodo}`, {
      headers: {
        Authorization: novoToken && `Bearer ${novoToken}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        const novoRelatorio = resJson.dados.relatorio;
        console.log(novoRelatorio);
        setRelatorio(novoRelatorio);
      });
  }, [periodo]);

  //

  return (
    <div className="home">
      <Header />
      <div>
        <Sidebar />
      </div>
      <div className="content">
        <ul>
          <li
            onClick={() => {
              setPeriodo("mes");
            }}
          >
            Este mês
          </li>
          <li
            onClick={() => {
              setPeriodo("ano");
            }}
          >
            Este ano
          </li>
          <li
            onClick={() => {
              setPeriodo(null);
            }}
          >
            Desde o início
          </li>
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
    </div>
  );
}
