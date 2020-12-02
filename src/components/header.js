import React from "react";
import "../App.css";

export default function Header() {
  const [relatorio, setRelatorio] = React.useState([]);

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

  return (
    <header>
      <div className="saldo">$ saldo em conta R$ {relatorio?.saldoEmConta}</div>

      <div className="logout">logout</div>
    </header>
  );
}
