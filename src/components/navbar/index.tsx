import { NavLink } from 'react-router-dom';
import './navbar.css'

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Sobre</NavLink>
      <NavLink to="/PokemonList">Pokemón</NavLink>
      <NavLink to="/MoveList">Move List</NavLink>
    </nav>
  )
}

export default NavBar;