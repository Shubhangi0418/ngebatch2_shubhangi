import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <NavLink to='/' end>Home</NavLink>
      <NavLink to='/about'>About</NavLink>
      <NavLink to='/blog'>Blog</NavLink>
    </nav>
  )
}

export default NavBar
