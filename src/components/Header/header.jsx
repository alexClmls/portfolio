import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className='Header'>
      <nav>
        <NavLink exact="true" to="/" className="link" >Accueil</NavLink>
        <NavLink exact="true" to="/contact" className="link">Contact</NavLink>
      </nav>
    </div>
  )
}

export default Header;