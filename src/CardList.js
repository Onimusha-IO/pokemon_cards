import { useEffect, useState } from "react";
import Card from "./Card";

import { v4 as uuidv4 } from "uuid";

// funcion recurisva para extraer los nombres de la cadena de evolucion 
const recur = (evolves_to, arr) => {
  return evolves_to.map((e) => {
    if (!e.evolves_to) {
      arr.push(e.species.name);
    } else {
      arr.push(e.species.name);
      recur(e.evolves_to, arr);
    }
    return arr;
  });
};

const CardList = () => {
  const [data, setData] = useState([]);
  console.log("In list...");
  console.log("Data: ", data);

  const pokedata = async () => {
    let pokemon = []; // arrgeglo con toda la data final
    let sprites = []; // imagenes para la cadenea de evolucion

    let paginationResults = [];
    let pokemonData = [];

    console.log("En Funcion...");

    // endpoint principal que retorna todas las categorias de la base de datos
    const categories = await fetch("https://pokeapi.co/api/v2").then((res) =>
      res.json()
    );

    let pagination = await fetch(categories.pokemon).then((res) => res.json()); // retorna las url de todos los pokemon en resultados paginados

    while (pagination.next) {
      paginationResults = [...paginationResults, ...pagination.results]; // anexa todos los resultados de las paginaciones
      pagination = await fetch(pagination.next).then((res) => res.json());
      if (!pagination.next) {
        paginationResults = [...paginationResults, ...pagination.results]; // se asegura de copiar la ultima paginacion
      }
    }

    console.log("Resultados paginados...", paginationResults);

    for await (const elem of paginationResults) {
      const data = await fetch(elem.url).then((res) => res.json()); // consulta cada url de cada pokemon, necesario para obtener todas las imagenes de la cadena de evolucion
      sprites.push({
        name: data.name,
        sprite: data.sprites.other["official-artwork"].front_default,
      });

      pokemonData.push(data);
    }

    console.log("Arreglo pokemonData...", pokemonData);

    // condensa toda la informacion del pokemon en un solo objeto
    for await (const data of pokemonData) {
      const about = await fetch(data.species.url).then((res) => res.json()); // extrae informacion detallada de la especie del pokemon

      // elige el texto informativo del pokemon en ingles y lo formatea
      let text = about.flavor_text_entries
        .find((it) => {
          return it.language.name === "en";
        })
        .flavor_text.replace("\f", " ");

      // obtiene el objeto con la informacion de la cadena evolutiva del pokemon actual
      const evolutionData = await fetch(about.evolution_chain.url).then((res) =>
        res.json()
      );

      // asocia los nombres de la cadena eovlutiva del pokemon actual con sus imagenes
      let names = [evolutionData.chain.species.name];
      recur(evolutionData.chain.evolves_to, names);
      const chain = names.map((e) => {
        return sprites.find((elem) => {
          return e === elem.name;
        });
      });

      // limite de pokemon a consultar
      if (data.id <= 151) {
        pokemon.push({
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
          evolutionChain: chain,
        });
      }
    }

    console.log("Sprites...", sprites);
    console.log("Arreglo final con data en objetos...", pokemon);

    setData(pokemon);
  };

  useEffect(() => {
    pokedata();
  }, []);

  return (
    <div>
      {data.map((e) => {
        const key = uuidv4();
        return <Card data={e} key={key} />;
      })}
    </div>
  );
};

export default CardList;
