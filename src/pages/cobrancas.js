import React from "react";
import "../App.css";
import Header from "../components/header";
import { useToken } from "../App";

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

export default function Cobrancas() {
  const { token, setToken } = useToken();
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
        setCobrancas(novaCobranca);
        const novaPagina = resJson.dados.paginaAtual;
        setPaginaAtual(novaPagina);
      });
  }, [paginaAtual]);
  const pages = [];
  const numberOfPages = (totalPaginas) => {
    for (let i = 1; i <= totalPaginas; i++) {
      pages.push(i);
    }
    console.log(pages);
  };

  numberOfPages(totalPaginas);

  return (
    <div className="cobrancas">
      <Header />
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
        <button>Buscar</button>
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
                {props.map((prop) => (
                  <td>{cobranca[prop]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {pages.map((page) => (
          <div
            onClick={(event) => {
              setPaginaAtual(page);
            }}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}
