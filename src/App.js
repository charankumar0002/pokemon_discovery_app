import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const pokemonData = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
      );
      const data = await res.json(); // Parse the JSON response
      setPokemonList(data.results);
      // Update state with Pokémon list (array)
      console.log("pokemonData", data);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };
  const innerHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const totalScroll = document.body.scrollHeight;
  console.log("innerHeight", innerHeight, scrollY, totalScroll);

  const infinityScroll = () => {};

  return (
    <div className="App">
      <button onClick={pokemonData}>Get</button>
      <ul>
        {pokemonList.map((poke) => (
          <div key={poke.name} className="pokemon-card">
            {poke.name}
          </div>
        ))}
      </ul>
    </div>
  );
}
