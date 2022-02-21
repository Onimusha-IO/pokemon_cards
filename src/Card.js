import About from "./About";
import Evolution from "./Evolution";
import Moves from "./Moves";
import Stats from "./Stats";

import { v4 as uuidv4 } from "uuid";

const Card = ({ data }) => {
  const about = uuidv4();
  const stats = uuidv4();
  const moves = uuidv4();
  const evo = uuidv4();

  const nav = uuidv4();

  return (
    <>
      {data ? (
        <div
          className=" Tarjeta border rounded shadow m-4"
          style={{
            width: "350px",
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
                    alt={"type"}
                  />
                );
              })}
            </div>
          </div>
          <nav className="Navs px-2 py-1">
            <div className="nav nav-pills" id={`nav-tab-${nav}`} role="tablist">
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
      ) : (
        <div class="card" aria-hidden="true">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
