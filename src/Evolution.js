import { v4 as uuidv4 } from "uuid";

const Evolution = ({ evolution }) => {
  const id = uuidv4();
  const evoCarousel = `evo-${id}`

  return (
    <div
      id={evoCarousel}
      className="carousel carousel-dark"
      data-bs-interval="false"
    >
      <div className="carousel-indicators">
        {evolution.map((e, i) => {
          const key = uuidv4();
          return (
            <button
              className={i === 0 ? "active" : ""}
              type="button"
              data-bs-target={`#${evoCarousel}`}
              data-bs-slide-to={i}
              aria-label={`Slide ${i + 1}`}
              key={key}
            ></button>
          )
        })}
      </div>
      <div className="carousel-inner">
        {evolution.map((e, i) => {
          const key = uuidv4();
          return (
            <img
              className={i === 0 ? "img-fluid carousel-item active p-5" : "img-fluid carousel-item p-5"}
              src={e.sprite}
              alt="pokemonImg"
              key={key}
              style={{ width: "300px", height: "300px" }}
            />
          )
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${evoCarousel}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${evoCarousel}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Evolution;
