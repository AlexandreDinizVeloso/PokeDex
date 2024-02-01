import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './pokemonlist.css';


function PokemonList() {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [previousUrl, setPreviousUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Falha ao receber detalhes do pokémon');
      }
      const data = await response.json();
      return { name: data.name, frontDefault: data.sprites.front_default };
    } catch (error) {
        console.error(error);
      return { name: '', frontDefault: '' };
    }
  };

  const fetchAndSetPokemonDetails = async (url, index) => {
    const { name, frontDefault } = await fetchPokemonDetails(url);
    setPokemonList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...prevList[index], name, frontDefault };
      return updatedList;
    });
  };

  const fetchDataAndDetails = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Falha ao receber lista de pokémon.');
      }
      const data = await response.json();

      const detailsPromises = data.results.map((pokemon, index) =>
        fetchAndSetPokemonDetails(pokemon.url, index)
      );
      await Promise.all(detailsPromises);

      setNextUrl(data.next);
      setPreviousUrl(data.previous);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataAndDetails('https://pokeapi.co/api/v2/pokemon/');
  }, []);

  const handleLoadMore = (url, increment) => {
    setLoading(true);
    fetchDataAndDetails(url);
    setCurrentPage((prevPage) => prevPage + increment);
  };

  const handleLoadPage = (page) => {
    setLoading(true);
    fetchDataAndDetails(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`);
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Procurando...</div>;
  }

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
                <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
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