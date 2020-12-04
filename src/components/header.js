import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import dollar from "../images/dollar.png";
import { useToken } from "../App";
import logoutimg from "../images/logout.png";
import log from "../images/log-out.png";

export default function Header() {
  const [relatorio, setRelatorio] = React.useState([]);
  const history = useHistory();
  const token = useToken();
  const [visible, setVisible] = React.useState(false);

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
    token.setToken(null);
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
          setVisible(!visible);
        }}
      >
        <div
          onClick={() => {
            logout();
          }}
          className={`${visible === true ? "show-me" : "hide"} hide-me`}
        >
          <img src={log} alt="Logout" />
          Deslogar
        </div>
        <img src={logoutimg} alt="dollar" />
      </div>
    </header>
  );
}
