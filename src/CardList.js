import { useContext, useEffect, useState } from "react";
import Card from "./Card";

import { v4 as uuidv4 } from "uuid";
import { DataConext } from "./dataContext";

const CardList = () => {
  const [data, setData] = useState();

  const nextPage = async () => {
    if (data.next) {
      const pagination = await fetch(data.next).then((res) => res.json());
      setData(pagination);
    }
  };

  const prevPage = async () => {
    if (data.previous) {
      const pagination = await fetch(data.previous).then((res) => res.json());
      setData(pagination);
    }
  };

  const pokedata = async () => {
    // endpoint principal que retorna todas las categorias de la base de datos
    const categories = await fetch("https://pokeapi.co/api/v2").then((res) =>
      res.json()
    );

    // retorna las url de todos los pokemon en resultados paginados
    const pagination = await fetch(categories.pokemon).then((res) =>
      res.json()
    );

    console.log(pagination);
    setData(pagination);
  };

  useEffect(() => {
    pokedata();
  }, []);
  return (
    <div className="container">
      <div className="row">
        {data &&
          data.results.map((e) => {
            const key = uuidv4();
            return <Card url={e.url} key={key} className="col-4" />;
          })}
      </div>
      <div
        className="container shadow d-flex justify-content-around mb-4"
        style={{ width: "400px" }}
      >
        <button
          className="border rounded fw-bold text-muted my-2 ms-2 p-2"
          onClick={() => {
            prevPage();
          }}
        >
          Anterior
        </button>
        <button
          className="border rounded fw-bold text-muted my-2 ms-2 p-2"
          onClick={() => {
            nextPage();
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CardList;
