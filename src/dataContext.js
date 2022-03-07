import { createContext, useState } from "react";

export const DataConext = createContext();

export const DataProvider = (props) => {
  const [data, setData] = useState([]); // data sera utilizado para guardar la informacion de cada pokemon una vez consultada en la base de datos
  return (
    <DataConext.Provider value={{ data, setData }}>
      {props.children}
    </DataConext.Provider>
  );
};
