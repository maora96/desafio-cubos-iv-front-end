import React from "react";
import "../App.css";
import Header from "../components/header";
import Pagination from "../components/pagination";
import Sidebar from "../components/sidebar";
import printer from "../images/printer.png";
import search from "../images/search.png";
import pago from "../images/pago.png";
import pendente from "../images/pendente.png";

const colunas = [
  "Cliente",
  "Descrição",
  "Valor",
  "Status",
  "Vencimento",
  "Boleto",
];

const props = [
  "idDoCliente",
  "descricao",
  "valor",
  "status",
  "vencimento",
  "linkDoBoleto",
];

const props2 = [
  { name: "idDoCliente" },
  { name: "descricao" },
  { name: "valor" },
  {
    name: "status",
    render: (status) =>
      status === "PENDENTE" ? (
        <div className={status.toLowerCase().replace(/ /g, "-")}>
          <img src={pendente} alt="Pendente" />
          {status}
        </div>
      ) : status === "PAGO" ? (
        <div className={status.toLowerCase().replace(/ /g, "-")}>
          <img src={pago} alt="Pendente" />
          {status}
        </div>
      ) : (
        <div className={status.toLowerCase().replace(/ /g, "-")}>{status}</div>
      ),
  },
  { name: "vencimento" },
  {
    name: "linkDoBoleto",
    render: () => (
      <a href={"linkDoBoleto"}>
        <img src={printer} alt="Boleto" />
      </a>
    ),
  },
];

export default function Cobrancas() {
  const [busca, setBusca] = React.useState("");
  const [cobrancas, setCobrancas] = React.useState([]);
  const [paginaAtual = 1, setPaginaAtual] = React.useState(1);
  const [totalPaginas, setTotalPaginas] = React.useState(null);

  React.useEffect(() => {
    const novoToken = localStorage.getItem("token");

    fetch("http://localhost:8081/cobrancas", {
      headers: {
        Authorization: novoToken && `Bearer ${novoToken}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        const totalDePaginas = resJson.dados.totalDePaginas;
        setTotalPaginas(totalDePaginas);
      });
  }, []);

  React.useEffect(() => {
    const novoToken = localStorage.getItem("token");

    fetch(
      `http://localhost:8081/cobrancas?cobrancasPorPagina=10&&offset=${
        paginaAtual * 10 - 10
      }`,
      {
        headers: {
          Authorization: novoToken && `Bearer ${novoToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        const novaCobranca = resJson.dados.cobrancas;
        novaCobranca.forEach((cobranca) => {
          cobranca.status =
            cobranca.status === "AGUARDANDO"
              ? "PENDENTE"
              : cobranca.status === "PAGO"
              ? "PAGO"
              : "VENCIDO";
          const month = new Date(cobranca.vencimento).getMonth() + 1;
          const year = new Date(cobranca.vencimento).getFullYear();
          const day = new Date(cobranca.vencimento).getDate();
          cobranca.vencimento = `${day}/${month}/${year}`;
          cobranca.valor = `R$ ${cobranca.valor / 100},00`;
        });
        setCobrancas(novaCobranca);
      });
  }, [paginaAtual]);
  const pages = [];
  const numberOfPages = (totalPaginas) => {
    for (let i = 1; i <= totalPaginas; i++) {
      pages.push(i);
    }
  };

  numberOfPages(totalPaginas);

  return (
    <div className="cobrancas">
      <div>
        <Sidebar />
      </div>
      <div className="cobrancas-content">
        <Header />
        <div className="content">
          <div className="search">
            <form
              onSubmit={(event) => {
                const novoToken = localStorage.getItem("token");
                console.log(novoToken);
                console.log(busca);
                event.preventDefault();
                fetch(`http://localhost:8081/clientes?busca=${busca}`, {
                  headers: {
                    Authorization: novoToken && `Bearer ${novoToken}`,
                  },
                })
                  ///adicionar busca clientes por pagina offset
                  .then((res) => res.json())
                  .then((resJson) => {
                    console.log(resJson);
                    console.log(busca);
                    setBusca("");
                  });
              }}
            >
              <input
                type="text"
                onChange={(event) => {
                  setBusca(event.target.value);
                }}
              ></input>
            </form>
            <button>
              <img src={search} alt="Buscar" />
              Buscar
            </button>
          </div>

          <div className="tabela-cobrancas">
            <table>
              <thead>
                <tr>
                  {colunas.map((coluna) => (
                    <th>{coluna}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cobrancas.map((cobranca) => (
                  <tr>
                    {props2.map((prop) => (
                      <td>
                        {prop.render
                          ? prop.render(cobranca[prop.name])
                          : cobranca[prop.name]}

                        {/* {prop === "linkDoBoleto" ? (
                          <a href={cobranca[prop]}>
                            <img src={printer} alt="Boleto" />
                          </a>
                        ) : (
                          cobranca[prop]
                        )} */}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            totalPaginas={totalPaginas}
            setTotalPaginas={setTotalPaginas}
            paginaAtual={paginaAtual}
            setPaginaAtual={setPaginaAtual}
          />
        </div>
      </div>
    </div>
  );
}
