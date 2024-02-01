import { NavLink } from 'react-router-dom';
import './navbar.css'

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Sobre</NavLink>
      <NavLink to="/PokemonList">Pokemón</NavLink>
      <NavLink to="/Jogos">Jogos</NavLink>
      <NavLink to="/Moves">Moves</NavLink>
    </nav>
  )
}

export default NavBar;
