import React from "react";
import "../App.css";
import chevronl from "../images/chevron-left.png";
import chevronr from "../images/chevron-right.png";

export default function Pagination(props) {
  const { paginaAtual, setPaginaAtual, totalPaginas, setTotalPaginas } = props;

  React.useEffect(() => {
    const novoToken = localStorage.getItem("token");
    fetch("http://localhost:8081/clientes", {
      headers: {
        Authorization: novoToken && `Bearer ${novoToken}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        const novaPagina = resJson.dados.paginaAtual;
        const totalDePaginas = resJson.dados.totalDePaginas;

        setPaginaAtual(novaPagina);
        setTotalPaginas(totalDePaginas);
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
    <div className="pagination">
      <div className="pagination-content">
        <img src={chevronl} alt="Esquerda" />
        <div className="pagination-numbers">
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
        <img src={chevronr} alt="Direita" />
      </div>
    </div>
  );
}
