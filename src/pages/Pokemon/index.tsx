import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import './pokemon.css';

function Pokemon() {
  const params = useParams();
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        const pokemonData = await response.json();
        setCurrentPokemon(pokemonData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.pokemon]);

  if (loading) {
    return;
  }

  if (!currentPokemon) {
    return (
      <div className="not-found-pokemon">
        <h1>Oops! Pokémon não foi encontrado!</h1>
        <h2>
          Volte para <Link to="/pokemonlist">Pokémon</Link> e selecione um dos Pokémon.
        </h2>
      </div>
    );
  }

  return (
    <div className="pokemon-page">
      <h1>{currentPokemon.name}</h1>
      <p>Experiência base: {currentPokemon.base_experience}</p>
      <div className="abilities-list">
        <h2>Habilidades</h2>
        <ul>
          {currentPokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Pokemon;
