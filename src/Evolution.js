import { v4 as uuidv4 } from "uuid";

const Evolution = ({ evolution }) => {
  const id = uuidv4();

  return (
    <div
      id={`carouselExampleIndicators${id}`}
      className="carousel carousel-dark"
      data-bs-ride="carousel"
      data-bs-interval="false"
    >
      <div className="carousel-indicators">
        {evolution.map((e, i) => {
          const key = uuidv4();
          return i === 0 ? (
            <button
              className="active"
              type="button"
              data-bs-target={`#carouselExampleIndicators${id}`}
              data-bs-slide-to={`${i}`}
              aria-label={`Slide ${i + 1}`}
              key={key}
            ></button>
          ) : (
            <button
              className=""
              type="button"
              data-bs-target={`#carouselExampleIndicators${id}`}
              data-bs-slide-to={`${i}`}
              aria-label={`Slide ${i + 1}`}
              key={key}
            ></button>
          );
        })}
      </div>
      <div className="carousel-inner">
        {evolution.map((e, i) => {
          const key = uuidv4();
          return i === 0 ? (
            <img
              className="img-fluid carousel-item active"
              src={e.sprite}
              alt="pokemonImg"
              key={key}
            />
          ) : (
            <img
              className="img-fluid carousel-item"
              src={e.sprite}
              alt="pokemonImg"
              key={key}
            />
          );
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#carouselExampleIndicators${id}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#carouselExampleIndicators${id}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Evolution;
