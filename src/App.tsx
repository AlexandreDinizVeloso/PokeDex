import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import Pokemon from './pages/Pokemon';
import Jogos from './pages/Jogos';
import Moves from './pages/Moves';
import NavBar from './components/navbar';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/pokemonlist" element={ <PokemonList /> } />
        <Route path="/pokemonlist/:pokemon" element={ <Pokemon /> } />
        <Route path="/jogos" element={ <Jogos /> } />
        <Route path="/moves" element={ <Moves /> } />
      </Routes>
    </div>
    
  )
}

export default App;
