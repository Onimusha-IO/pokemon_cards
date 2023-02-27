import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Moves = ({ moves }) => {
  const id = uuidv4();
  const movesCarousel = `moves-${id}`

  const [innerMoves, setInnerMoves] = useState([])

  const movesArray = (moves) => {
    let palabras = 10;
    let paginas = Math.ceil(moves.length / palabras);
    let arr = [];

    const paginate = (array, page_size, page_number) => {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };

    for (let i = 0; i < paginas; i++) {
      arr[i] = paginate(moves, palabras, i + 1);
    }

    return arr
  }

  useEffect(() => {
    if (moves) {
      setInnerMoves(movesArray(moves))
    }
  }, [])


  return (
    <>
      {innerMoves.length !== 0 ?
        <div
          id={movesCarousel}
          className="carousel carousel-dark"
          data-bs-interval="false"
        >
          <div className="carousel-indicators" style={{ marginBottom: "-20px" }}>
            {innerMoves.map((e, i) => {
              const key = uuidv4();

              return <button
                className={i === 0
                  ? "active" : ""}
                type="button"
                data-bs-target={`#${movesCarousel}`}
                data-bs-slide-to={i}
                aria-label={`Slide ${i}`}
                key={key}
              ></button>
            })}
          </div>

          <div className="carousel-inner">
            {innerMoves.map((arreglo, index) => {
              const key = uuidv4();

              return (
                <div className={index === 0 ? "carousel-item active py-2 px-3" : "carousel-item py-2 px-3"} key={key} style={{ height: "250px" }}>
                  <div className="row">
                    {arreglo.map((slice) => {
                      const key = uuidv4();
                      return (
                        <div className="col-6" key={key}>
                          <p
                            className="text-capitalize text-white bg-secondary rounded-pill text-center p-1"
                            style={{ fontSize: "13px" }}
                          >
                            {slice.move.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            }
            )}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${movesCarousel}`}
            data-bs-slide="prev"
            style={{ marginLeft: "-20px" }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${movesCarousel}`}
            data-bs-slide="next"
            style={{ marginRight: "-20px" }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> : null}
    </>
  );
};

export default Moves;
