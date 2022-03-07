import { v4 as uuidv4 } from "uuid";

const Moves = ({ moves }) => {
  const id = uuidv4();

  return (
    <div
      id={`carouselExampleIndicators${id}`}
      className="carousel carousel-dark"
      data-bs-ride="carousel"
      data-bs-interval="false"
    >
      <div className="carousel-indicators" style={{marginBottom: "-20px"}}>
        {(() => {
          let palabras = 10;
          let paginas = Math.ceil(moves.length / palabras);
          let arr = [];
          for (let i = 1; i <= paginas; i++) {
            const key = uuidv4();
            i === 1
              ? arr.push(
                  <button
                    className="active"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators${id}`}
                    data-bs-slide-to={`${i - 1}`}
                    aria-label={`Slide ${i}`}
                    key={key}
                  ></button>
                )
              : arr.push(
                  <button
                    className=""
                    type="button"
                    data-bs-target={`#carouselExampleIndicators${id}`}
                    data-bs-slide-to={`${i - 1}`}
                    aria-label={`Slide ${i}`}
                    key={key}
                  ></button>
                );
          }
          return arr;
        })()}
      </div>

      <div className="carousel-inner">
        {(() => {
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
          return arr.map((arreglo, index) => {
            const key = uuidv4();
            if (index === 0) {
              return (
                <div className="carousel-item active py-2 px-3" key={key}  style={{height: "250px"}}>
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
              );
            }
            return (
              <div className="carousel-item py-2 px-3" key={key} style={{height: "250px"}}>
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
            );
          });
        })()}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#carouselExampleIndicators${id}`}
        data-bs-slide="prev"
        style={{marginLeft: "-20px"}}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#carouselExampleIndicators${id}`}
        data-bs-slide="next"
        style={{marginRight: "-20px"}}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Moves;
