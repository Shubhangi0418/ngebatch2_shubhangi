import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navigation-tabs'>
      <nav id='gigs-nav-bar'>
        <NavLink to='/' end>Home</NavLink>
        <NavLink to='/gigdata'>Gig Venue Details</NavLink>
        <NavLink to='/gigdatabyid'>Gig Details By Id</NavLink>
        <NavLink to='/newgigdata'>New Gig Details</NavLink>
      </nav>
    </div>
  )
}

export default NavBar
