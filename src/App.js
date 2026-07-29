import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
    height: "",
    weight: "",
    ability:"",
  })

  const searchPokemon = () => {
    axios.get(`http://localhost:5000/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon({
          name: response.data.name, 
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      })
      .catch((error) => {
        console.error(error);
        alert("Pokemon not found!");
        setPokemonChosen(false);
      });
  };

  return (
    <div className="App">
      <div className="titleSection">
        <h1> Pokemon Stats </h1>
        <input type="text"
          onChange={(event) => { setPokemonName(event.target.value) }}></input>
        <button onClick={searchPokemon}> Search Pokemon </button>
      </div>
      <div className="displaySection">
        {!pokemonChosen ? (
          <h1> Please Choose a Pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt="pokechar" />
            <h2> Species: {pokemon.species}</h2>
            <h2> Type: {pokemon.type}</h2>
            <h2>HP: {pokemon.hp}</h2>
            <h2>Attack: {pokemon.attack}</h2>
            <h2>Defense: {pokemon.defense}</h2>
          </>
        )}
      </div>
    </div>
  );
}
export default App;
