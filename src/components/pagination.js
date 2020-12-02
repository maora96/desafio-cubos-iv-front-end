import React from "react";
import "../App.css";

export default function Pagination(props) {
  const [paginaAtual, setPaginaAtual] = React.useState(null);
  const [totalPaginas, setTotalPaginas] = React.useState(null);

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
    console.log(pages);
  };

  numberOfPages(totalPaginas);
  return (
    <div className="pagination">
      {pages.map((page) => (
        <div>{page}</div>
      ))}
    </div>
  );
}
