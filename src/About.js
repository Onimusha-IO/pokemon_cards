import { v4 as uuidv4 } from "uuid";

const About = ({ about }) => {
  return (
    <div className="text-muted">
      <p>{about.text}</p>
      <div className="d-flex justify-content-between">
        <div>
          <p className="fw-bold">Height</p>
          <p>{about.height} dm</p>
        </div>
        <div>
          <p className="fw-bold">Weight</p>
          <p>{about.weight} hg</p>
        </div>
      </div>
      <div>
        <p className="fw-bold">Abilities</p>
        {about.abilities.map((e) => {
          const key = uuidv4();
          return (
            <p className="text-capitalize" key={key}>
              {e.ability.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default About;
