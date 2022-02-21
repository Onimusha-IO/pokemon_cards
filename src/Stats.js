import { v4 as uuidv4 } from "uuid";

const Stats = ({ stats }) => {
  return (
    <>
      <p className="fw-bold">Base Stats</p>
      {stats.map((e, i) => {
        const key = uuidv4();
        return (
          <div className="text-capitalize text-muted" key={key}>
            <div className="row">
              <p className=" col-6">{e.stat.name}</p>
              <p className="col-6">{e.base_stat}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Stats;
