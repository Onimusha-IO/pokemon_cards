import About from "./About";
import Evolution from "./Evolution";
import Moves from "./Moves";
import Stats from "./Stats";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const Card = ({ url }) => {
  const id = uuidv4();
  const about = uuidv4();
  const stats = uuidv4();
  const moves = uuidv4();
  const evo = uuidv4();

  const nav = uuidv4();

  const [data, setData] = useState(null);

  // funcion recurisva para extraer los nombres y las imagenes de la cadena de evolucion
  const getchainData = async (chain) => {
    let data = [];

    const speciesData = await fetch(chain.species.url).then((res) =>
      res.json()
    );

    const pokemon = speciesData.varieties.find((e) => {
      return e.is_default;
    });

    const pokemonData = await fetch(pokemon.pokemon.url).then((res) =>
      res.json()
    );
    if (!chain.evolves_to.length) {
      data.push({
        name: pokemonData.name,
        sprite: pokemonData.sprites.other["official-artwork"].front_default,
      });
    } else {
      data.push({
        name: pokemonData.name,
        sprite: pokemonData.sprites.other["official-artwork"].front_default,
      });

      // de haber evoluciones paralelas las agrega asi como las que existan de forma anidada
      for await (const it of chain.evolves_to) {
        data = [...data, ...(await getchainData(it))];
      }
    }

    return data;
  };

  const getData = async (url) => {
    const data = await fetch(url).then((res) => res.json()); // consulta la url del pokemon

    const about = await fetch(data.species.url).then((res) => res.json()); // extrae informacion detallada de la especie del pokemon

    // elige el texto informativo del pokemon en ingles y lo formatea
    let text = about.flavor_text_entries
      .find((it) => {
        return it.language.name === "en";
      })
      .flavor_text.replace("\f", " ");

    // obtiene el objeto con la informacion de la cadena evolutiva del pokemon actual
    let evolutionData = await fetch(about.evolution_chain.url).then((res) =>
      res.json()
    );

    // asocia los nombres y las imagenes de la cadena evolutiva del pokemon actual
    let chainData = await getchainData(evolutionData.chain);

    setData({
      id: data.id,
      name: data.name,
      type: data.types,
      img: data.sprites.other["official-artwork"].front_default,
      about: {
        text: text,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
      },
      stats: data.stats,
      moves: data.moves,
      evolutionChain: chainData,
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData(url);
  }, []);

  return (
    <>
      {data ? (
        <div
          className="rounded shadow m-4"
          onClick={() => {
            handleShow();
          }}
          style={{ width: "150px", height: "150px" }}
        >
          <img className="img-fluid" src={data.img} alt="pokemonImg" />
        </div>
      ) : (
        <div
          className="rounded shadow d-flex justify-content-center m-4"
          style={{ width: "150px", height: "150px" }}
        >
          <div className="spinner-border text-primary my-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <Modal show={show} onHide={handleClose} contentClassName="w-auto border-0 bg-transparent" centered>
        {data && (
          <div
            className=" Tarjeta border rounded shadow m-4 modal-content"
            id={`Tarjeta-${id}`}
            style={{
              width: "370px",
              height: "770px",
              borderRadius: "15px",
            }}
          >
            <div className="ImagenPrincipal p-3">
              <img
                className="img-fluid img-thumbnail"
                src={data.img}
                alt="pokemonImg"
              />
            </div>
            <div className="NombreTipo d-flex px-3 py-1 justify-content-between">
              <p className="text-capitalize text-muted fw-bold my-auto">
                {data.name}
              </p>
              <div className="d-flex" style={{ height: "45px" }}>
                {data.type.map((e) => {
                  const key = uuidv4();
                  return (
                    <img
                      className="img-fluid"
                      src={`./img/${e.type.name}.png`}
                      key={key}
                      alt={"pokemon type"}
                      title={`${e.type.name}`}
                    />
                  );
                })}
              </div>
            </div>
            <nav className="Navs px-2 py-1">
              <div
                className="nav nav-pills"
                id={`nav-tab-${nav}`}
                role="tablist"
              >
                <button
                  className="nav-link active"
                  id={`aa${about}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#a${about}`}
                  type="button"
                  role="tab"
                  aria-controls={`#a${about}`}
                  aria-selected="true"
                >
                  About
                </button>
                <button
                  className="nav-link"
                  id={`aa${stats}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#a${stats}`}
                  type="button"
                  role="tab"
                  aria-controls={`#a${stats}`}
                  aria-selected="false"
                >
                  Stats
                </button>
                <button
                  className="nav-link"
                  id={`aa${moves}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#a${moves}`}
                  type="button"
                  role="tab"
                  aria-controls={`#a${moves}`}
                  aria-selected="false"
                >
                  Moves
                </button>
                <button
                  className="nav-link"
                  id={`aa${evo}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#a${evo}`}
                  type="button"
                  role="tab"
                  aria-controls={`#a${evo}`}
                  aria-selected="false"
                >
                  Evolution
                </button>
              </div>
            </nav>

            <div className="Contenido tab-content px-3">
              <div
                className="About tab-pane fade show active"
                id={`a${about}`}
                role="tabpanel"
                aria-labelledby={`a${about}`}
              >
                <About about={data.about} />
              </div>
              <div
                className="Stats tab-pane fade"
                id={`a${stats}`}
                role="tabpanel"
                aria-labelledby={`a${stats}`}
              >
                <Stats stats={data.stats} />
              </div>
              <div
                className="Moves tab-pane fade show"
                id={`a${moves}`}
                role="tabpanel"
                aria-labelledby={`a${moves}`}
              >
                <Moves moves={data.moves} />
              </div>
              <div
                className="Evo tab-pane fade show"
                id={`a${evo}`}
                role="tabpanel"
                aria-labelledby={`a${evo}`}
              >
                <Evolution evolution={data.evolutionChain} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Card;
