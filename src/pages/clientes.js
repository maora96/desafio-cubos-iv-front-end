import React from "react";
import "../App.css";
import Header from "../components/header";
import Pagination from "../components/pagination";
import Sidebar from "../components/sidebar";
import email from "../images/email.png";
import editimg from "../images/edit.png";
import phone from "../images/phone.png";
import search from "../images/search.png";

const colunas = [
  "Cliente",
  "Cobranças Feitas",
  "Cobranças Recebidas",
  "Status",
  "",
];

const props2 = [
  {
    name: "data",
    render: (data) => (
      <div className="data-client">
        {data.map((d, i) => (
          <span className={"data"}>
            {i === 1 ? (
              <div>
                <img src={email} alt="Email" /> {d}
              </div>
            ) : i === 2 ? (
              <div>
                <img src={phone} alt="Telefone" />
                {d}
              </div>
            ) : (
              <div>{d}</div>
            )}
          </span>
        ))}
      </div>
    ),
  },
  { name: "cobrancasFeitas" },
  { name: "cobrancasRecebidas" },

  {
    name: "estaInadimplente",
    render: (status) => (
      <div className={status.toLowerCase().replace(/ /g, "-")}>{status}</div>
    ),
  },
  {
    name: "edit",
    render: (edit) => (
      <a href={edit}>
        <img src={editimg} alt="Editar" />
      </a>
    ),
  },
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
      <div>
        <Sidebar />
      </div>
      <div className="clientes-content">
        <Header />
        <div className="content">
          <div className="search">
            <a href="/adicionarCliente">Adicionar cliente</a>
            <div className="form">
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
              <button>
                <img src={search} alt="Buscar" />
                Buscar
              </button>
            </div>
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
                    {props2.map((prop) => (
                      <td>
                        {prop.render
                          ? prop.render(cliente[prop.name])
                          : cliente[prop.name]}
                      </td>
                    ))}

                    {/* {props.map((prop) => (
                      <td>
                        {prop === "edit" ? (
                          <a href={cliente[prop]}>
                            <img src={edit} alt="Editar" />
                          </a>
                        ) : prop === "data" ? (
                          <div className="data-client">
                            {cliente[prop].map((d, i) => (
                              <span className={`${prop}`}>
                                {i === 1 ? (
                                  <div>
                                    
                                    <img src={email} alt="Email" /> {d}
                                  </div>
                                ) : i === 2 ? (
                                  <div>
                                    <img src={phone} alt="Telefone" />
                                    {d}
                                  </div>
                                ) : (
                                  <div>{d}</div>
                                )}
                              </span>
                            ))}
                          </div>
                        ) : (
                          cliente[prop]
                        )}
                      </td>
                    ))} */}
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              totalPaginas={totalPaginas}
              setTotalPaginas={setTotalPaginas}
              paginaAtual={paginaAtual}
              setPaginaAtual={setPaginaAtual}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
