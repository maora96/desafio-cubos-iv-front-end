import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

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
      <div className="saldo">$ saldo em conta R$ {relatorio?.saldoEmConta}</div>

      <div
        className="logout"
        onClick={() => {
          logout();
        }}
      >
        logout
      </div>
    </header>
  );
}
