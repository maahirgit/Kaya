import { useState, useEffect } from 'react'
import { Menu, X, Heart } from 'lucide-react'
import { useLocation, Link, NavLink } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { wishlist } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClass = `navbar ${(scrolled || !isHome) ? 'scrolled' : ''}`

  return (
    <>
      <nav className={navClass} id="navbar">
        <div className="nav-container">
          <Link to="/" className="brand-logo">
            <img src="/kaya-logo.png" alt="Kaya Logo" className="nav-logo-img" />
          </Link>
          <ul className="nav-links">
            <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'text-yellow' : ''}`}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'text-yellow' : ''}`}>About</NavLink></li>
            <li><NavLink to="/collection" className={({ isActive }) => `nav-link ${isActive ? 'text-yellow' : ''}`}>Collection</NavLink></li>
            <li><NavLink to="/blogs" className={({ isActive }) => `nav-link ${isActive ? 'text-yellow' : ''}`}>Blogs</NavLink></li>

            <li className="nav-item-wishlist">
              <Link to="/wishlist" className="nav-link wishlist-icon-link">
                <Heart size={20} className={wishlist.length > 0 ? 'text-blue fill-blue' : ''} />
                {wishlist.length > 0 && <span className="wishlist-badge">{wishlist.length}</span>}
              </Link>
            </li>
          </ul>
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <Menu />
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
        <div className="menu-content">
          <button className="menu-close" onClick={() => setMenuOpen(false)}>
            <X />
          </button>
          <ul>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'text-yellow' : ''}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'text-yellow' : ''}>About</NavLink></li>
            <li><NavLink to="/collection" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'text-yellow' : ''}>Collection</NavLink></li>
            <li><NavLink to="/blogs" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'text-yellow' : ''}>Blogs</NavLink></li>

            <li><Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist ({wishlist.length})</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}

