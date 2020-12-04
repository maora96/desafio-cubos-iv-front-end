import React from "react";
import "../App.css";
import Header from "../components/header";
import { useToken } from "../App";
import Sidebar from "../components/sidebar";
import money from "../images/carbon_money.png";
import users from "../images/users.png";

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
      <div>
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />

        <div className="content">
          <ul>
            <li
              className={periodo === "mes" ? "active" : ""}
              onClick={() => {
                setPeriodo("mes");
              }}
            >
              Este mês
            </li>
            <li
              className={periodo === "ano" ? "active" : ""}
              onClick={() => {
                setPeriodo("ano");
              }}
            >
              Este ano
            </li>
            <li
              className={periodo === null ? "active" : ""}
              onClick={() => {
                setPeriodo(null);
              }}
            >
              Desde o início
            </li>
          </ul>

          <div className="data">
            <div className="home-card">
              <h2>
                <img src={users} alt="Clientes" />
                Clientes
              </h2>
              <div className="card-content">
                <div className="mini-card green">
                  Em dia
                  <span>{relatorio?.qtdClientesAdimplentes}</span>
                </div>
                <div className="mini-card red">
                  Inadimplentes
                  <span>{relatorio?.qtdClientesInadimplentes}</span>
                </div>
              </div>
            </div>
            <div className="home-card">
              <h2>
                <img src={money} alt="Cobranças" />
                Cobranças
              </h2>
              <div className="card-content">
                <div className="mini-card blue">
                  Previstas
                  <span>{relatorio?.qtdCobrancasPrevistas}</span>
                </div>
                <div className="mini-card red">
                  Vencidas
                  <span>{relatorio?.qtdCobrancasVencidas}</span>
                </div>
                <div className="mini-card green">
                  Pagas
                  <span>{relatorio?.qtdCobrancasPagas}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
