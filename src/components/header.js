import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import dollar from "../images/dollar.png";
import logout from "../images/logout.png";

export default function Header() {
  const [relatorio, setRelatorio] = React.useState([]);
  const history = useHistory();

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
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <header>
      <div className="saldo">
        <div className="saldo-flex">
          <img src={dollar} alt="dollar" />
          Saldo em conta
        </div>
        <div className="money">R$ {relatorio?.saldoEmConta}</div>
      </div>

      <div
        className="logout"
        onClick={() => {
          logout();
        }}
      >
        <img src={logout} alt="dollar" />
      </div>
    </header>
  );
}
