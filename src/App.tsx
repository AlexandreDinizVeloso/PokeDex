import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import Pokemon from './pages/Pokemon';
import MoveList from './pages/MoveList';
import Move from './pages/Move';
import NavBar from './components/navbar';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/pokemonlist" element={ <PokemonList /> } />
        <Route path="/pokemonlist/:pokemon" element={ <Pokemon /> } />
        <Route path="/movelist" element={ <MoveList /> } />
        <Route path="/movelist/:move" element={ <Move /> } />
      </Routes>
    </div>
    
  )
}

export default App;