import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { IPokemon, pokemonData } from "./Interfaces";

const App = (props: { shouldRefresh: boolean }) => {
  const pokemonApi = `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`;
  const arrPokemons = useRef<pokemonData>({});
  const [, doRefresh] = useState(props.shouldRefresh);
  useEffect(() => {
    fetch(pokemonApi)
      .then((res) => {
        return res.json();
      })
      .then((res: any) => {
        arrPokemons.current = res.pokemon as pokemonData;
        doRefresh(true);
      });
  }, [props.shouldRefresh]);

  return (
    <div className="App">
      <header className="App-header">Welcome to Pokemon World</header>
      <h3>Pokemons List</h3>
      <table className="table">
        <tr className="row">
          <th>Name</th>
          <th>Number</th>
          <th>Type</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Weaknesses</th>
          <th>Next Evolution</th>
        </tr>
        <Pokemon {...arrPokemons.current} />
      </table>
    </div>
  );
};

const Pokemon = (props: pokemonData) => {
  var pokemonObjects: IPokemon[] = Object.values(props);

  if (pokemonObjects.length) {
    pokemonObjects = pokemonObjects.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    return (
      <React.Fragment>
        {pokemonObjects.map((item) => {
          return <Rows {...item} />;
        })}
      </React.Fragment>
    );
  }
  return <div>"No Pokemon"</div>;
};

const Rows = (props: IPokemon) => {
  const arrayToCSV = (arr: any[]) => {
    let csv: string = "";
    arr.forEach((item: any) => {
      if (csv) {
        return (csv = csv + " , " + item);
      }
      return (csv = item);
    });
    return csv;
  };

  const objectTOArray = (arr: object[]) => {
    if (arr && arr.length) {
      return arr.map((item: any) => {
        return item["name"];
      });
    }
    return [];
  };

  return (
    <tr className="row" key={`${props.id}-${props.name}`}>
      <td>{props.name}</td>
      <td>{props.num}</td>
      <td>{arrayToCSV(props.type)}</td>
      <td>{props.height}</td>
      <td>{props.weight}</td>
      <td>{arrayToCSV(props.weaknesses)}</td>
      <td>{arrayToCSV(objectTOArray(props.next_evolution))}</td>
    </tr>
  );
};

App.defaultProps = {
  shouldRefresh: false,
};

export default App;
