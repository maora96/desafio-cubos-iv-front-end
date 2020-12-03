import React from "react";
import "../App.css";
import Header from "../components/header";
import Pagination from "../components/pagination";
import Sidebar from "../components/sidebar";

const colunas = [
  "Cliente",
  "Cobranças Feitas",
  "Cobranças Recebidas",
  "Status",
  "",
];

const props = [
  "data",
  "cobrancasFeitas",
  "cobrancasRecebidas",
  "estaInadimplente",
  "edit",
];

export default function Clientes() {
  const [busca, setBusca] = React.useState("");
  const [clientes, setClientes] = React.useState([]);
  const [paginaAtual, setPaginaAtual] = React.useState(1);
  const [totalPaginas, setTotalPaginas] = React.useState(null);

  React.useEffect(() => {
    const novoToken = localStorage.getItem("token");
    fetch(`http://localhost:8081/clientes`, {
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
    console.log(paginaAtual);
    const novoToken = localStorage.getItem("token");
    fetch(
      `http://localhost:8081/clientes?clientesPorPagina=10&&offset=${
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
        const novaCliente = resJson.dados.clientes;
        novaCliente.forEach((cliente) => {
          cliente.edit = `http://localhost:3000/editarCliente/${cliente.id}`;
          cliente.estaInadimplente =
            cliente.estaInadimplente === false ? "EM DIA" : "INADIMPLENTE";
          cliente.cobrancasFeitas = `R$ ${cliente.cobrancasFeitas / 100},00`;
          cliente.cobrancasRecebidas = `R$ ${
            cliente.cobrancasRecebidas / 100
          },00`;
          cliente.data = [cliente.nome, cliente.email, cliente.tel];
          console.log(cliente.data);
        });
        setClientes(novaCliente);
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
    <div className="clientes">
      <Header />
      <div>
        <Sidebar />
      </div>
      <div className="search">
        <a href="/adicionarCliente">Adicionar cliente</a>
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

      <div className="tabela-clientes">
        <table>
          <thead>
            <tr>
              {colunas.map((coluna) => (
                <th>{coluna}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr>
                {props.map((prop) => (
                  <td>
                    {prop === "edit" ? (
                      <a href={cliente[prop]}>Editar</a>
                    ) : prop === "data" ? (
                      cliente[prop].map((d) => <span>{d}</span>)
                    ) : (
                      cliente[prop]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {pages.map((page) => (
            <div
              onClick={() => {
                setPaginaAtual(page);
              }}
            >
              {page}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination"></div>
    </div>
  );
}
