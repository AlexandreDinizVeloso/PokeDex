import { useNavigate } from 'react-router-dom';
import { useState, useEffect, SetStateAction } from 'react';
import Pagination from '../../components/pagination';

import forestBackground from '../../assets/background-types/forest.png';
import cavernBackground from '../../assets/background-types/cavern.png';
import yforestBackground from '../../assets/background-types/yforest.png';
import dforestBackground from '../../assets/background-types/dforest.png';
import dreamBackground from '../../assets/background-types/dream.png';
import skyBackground from '../../assets/background-types/sky.png';
import waterBackground from '../../assets/background-types/water.png';

import './pokemonlist.css';


function PokemonList() {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [previousUrl, setPreviousUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPokemonDetails = async (url: RequestInfo | URL) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Falha ao receber os detalhes do pokémon.');
      }
      const data = await response.json();
      return { name: data.name, frontDefault: data.sprites.front_default, id: data.id, types: data.types };
    } catch (error) {
      console.error(error);
      return { name: '', frontDefault: '', id: '', types: '' };
    }
  };

  const fetchAndSetPokemonDetails = async (url: RequestInfo | URL, index: string | number) => {
    try {
      const { name, frontDefault, id, types } = await fetchPokemonDetails(url);
      setPokemonList((prevList) => {
        const updatedList = [...prevList];
        updatedList[index] = { ...prevList[index], name, frontDefault, id, types };
        return updatedList;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPokemonList = async (url: RequestInfo | URL) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Falha ao receber a lista de Pokémon.');
      }
      const data = await response.json();

      const detailsPromises = data.results.map((pokemon: { url: RequestInfo | URL; }, index: string | number) =>
        fetchAndSetPokemonDetails(pokemon.url, index)
      );
      await Promise.all(detailsPromises);

      setNextUrl(data.next);
      setPreviousUrl(data.previous);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonList('https://pokeapi.co/api/v2/pokemon/');
  }, []);

  const handleLoadMore = async (url: RequestInfo | URL, increment: number) => {
    await fetchPokemonList(url);
    setCurrentPage((prevPage) => prevPage + increment);
  };

  const handleLoadPage = async (page: SetStateAction<number>) => {
    const offset = (page - 1) * 20;
    await fetchPokemonList(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
    setCurrentPage(page);
  };

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const getTypeBackground = (type: string) => {
    switch (type) {
      case 'normal':
        return `url(${forestBackground})`;
      case 'fighting':
        return `url(${forestBackground})`;
      case 'flying':
        return `url(${skyBackground})`;
      case 'poison':
        return `url(${forestBackground})`;
      case 'ground':
        return `url(${cavernBackground})`;
      case 'rock':
        return `url(${cavernBackground})`;
      case 'bug':
        return `url(${forestBackground})`;
      case 'ghost':
        return `url(${dforestBackground})`;
      case 'steel':
        return `url(${cavernBackground})`;
      case 'fire':
        return `url(${yforestBackground})`;
      case 'water':
        return `url(${waterBackground})`;
      case 'grass':
        return `url(${forestBackground})`;
      case 'electric':
        return `url(${yforestBackground})`;
      case 'psychic':
        return `url(${dreamBackground})`;
      case 'ice':
        return `url(${waterBackground})`;
      case 'dragon':
        return `url(${skyBackground})`;
      case 'fairy':
        return `url(${dreamBackground})`;
      case 'dark':
        return `url(${dforestBackground})`;
      default:
        return '';
    }
  };

  return (
    <div className="list-page">
      <main>
        <div className='pokemon-container'>
          {pokemonList.map((pokemon, index) => (
            <div key={index}>
              <button
                className="pokemon-card"
                style={{
                  backgroundImage: getTypeBackground(pokemon.types[0].type.name),
                  backgroundPosition: 'center bottom',
                  backgroundSize: '130%',
                }}
                onClick={() => navigate(`/pokemonlist/${pokemon.name}`)}
              >
                <img src={pokemon.frontDefault} id='pokemon-img'/>
                <h3 id='pokemon-name'>{capitalizeFirstLetter(pokemon.name)}</h3>
                <h3 id='pokemon-id'>{pokemon.id}</h3>
              </button>
            </div>
          ))}
        </div>
      </main>
      <Pagination 
        handleLoadMore={handleLoadMore} 
        handleLoadPage={handleLoadPage} 
        currentPage={currentPage}
        previousUrl={previousUrl}
        nextUrl={nextUrl}
      />
    </div>
  );
}

export default PokemonList;