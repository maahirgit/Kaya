import { useState, useEffect } from 'react'
import { Menu, X, Heart } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
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
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/collection" className="nav-link">Collection</Link></li>
            <li><Link to="/blogs" className="nav-link">Blogs</Link></li>
            
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
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/collection" onClick={() => setMenuOpen(false)}>Collection</Link></li>
            <li><Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
            
            <li><Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist ({wishlist.length})</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}

