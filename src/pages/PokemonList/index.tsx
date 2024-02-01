import { useNavigate } from 'react-router-dom';
import { useState, useEffect, SetStateAction } from 'react';

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
      return { name: data.name, frontDefault: data.sprites.front_default, id: data.id };
    } catch (error) {
      console.error(error);
      return { name: '', frontDefault: '', id: '' };
    }
  };

  const fetchAndSetPokemonDetails = async (url: RequestInfo | URL, index: string | number) => {
    try {
      const { name, frontDefault, id } = await fetchPokemonDetails(url);
      setPokemonList((prevList) => {
        const updatedList = [...prevList];
        updatedList[index] = { ...prevList[index], name, frontDefault, id };
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

  return (
    <div className="list-page">
      <main>
        <div className='pokemon-container'>
          {pokemonList.map((pokemon, index) => (
            <div key={index}>
              <button
                className="pokemon-card"
                style={{
                  backgroundImage: `url(${pokemon.frontDefault})`                
                }}
                onClick={() => navigate(`/pokemonlist/${pokemon.name}`)}
              >
                <h3 id='pokemon-name'>{capitalizeFirstLetter(pokemon.name)}</h3>
                <h3 id='pokemon-id'>{pokemon.id}</h3>
              </button>
            </div>
          ))}
        </div>
      </main>
      <div className="pagination-buttons">
      {previousUrl && <button className="pagination-button" id='pagination-previous' onClick={() => handleLoadMore(previousUrl, -1)}>Anterior</button>}
        {Array.from({ length: 5 }).map((_, i) => {
          const page = currentPage - 2 + i;
          return page > 0 && (
            <button
              key={page}
              className="pagination-button"
              id='pagination-number'
              onClick={() => handleLoadPage(page)}
              style={{ 
                fontWeight: currentPage === page ? 'bold' : 'normal',
                color: currentPage === page ? '#3A463E' : '#F9F7F9',
                backgroundColor: currentPage === page ? '#98D2CE' : '#698880',
              }}
            >
              {page}
            </button>
          );
        })}
        {nextUrl && <button className="pagination-button" id='pagination-next' onClick={() => handleLoadMore(nextUrl, 1)}>Próxima</button>}
      </div>
    </div>
  );
}

export default PokemonList;