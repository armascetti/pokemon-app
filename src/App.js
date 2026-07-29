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
      <header className="header">
        <h1>Pokemon Fan Page</h1>
        <div className="subtitle">Search and collect your favorite Pokémon stats</div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="e.g. pikachu or 25"
            onChange={(event) => { setPokemonName(event.target.value) }}
          />
          <button onClick={searchPokemon}>Search</button>
        </div>
      </header>

      <div className="displaySection">
        {!pokemonChosen ? (
          <div className="empty">Please choose a Pokémon to see details.</div>
        ) : (
          <div className="card">
            <div className="card-left">
              <img className="pokemon-image" src={pokemon.img} alt={pokemon.name} />
            </div>
            <div className="card-right">
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <div className="pokemon-meta">{pokemon.species} • {pokemon.type}</div>
              <div className="stats">
                <div className="stat">HP: {pokemon.hp}</div>
                <div className="stat">Attack: {pokemon.attack}</div>
                <div className="stat">Defense: {pokemon.defense}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
