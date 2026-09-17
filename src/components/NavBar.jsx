import { NavLink } from 'react-router-dom'

function NavBar({ items }) {
  return (
    <nav className="main-nav" aria-label="Navegación principal">
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar
