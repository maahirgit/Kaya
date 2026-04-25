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
            {isHome ? (
              <>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#catalogue" className="nav-link">Collection</a></li>
                <li><a href="#blog" className="nav-link">Blogs</a></li>
                {/* <li><a href="#video-showcase" className="nav-link">Process</a></li> */}
                <li className="nav-item-wishlist">
                  <Link to="/wishlist" className="nav-link wishlist-icon-link">
                    <Heart size={20} className={wishlist.length > 0 ? 'text-blue fill-blue' : ''} />
                    {wishlist.length > 0 && <span className="wishlist-badge">{wishlist.length}</span>}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/collection" className="nav-link">Collection</Link></li>
                <li><Link to="/#blog" className="nav-link">Blogs</Link></li>
                {/* <li><Link to="/#video-showcase" className="nav-link">Process</Link></li> */}
                <li className="nav-item-wishlist">
                  <Link to="/wishlist" className="nav-link wishlist-icon-link">
                    <Heart size={20} className={wishlist.length > 0 ? 'text-blue fill-blue' : ''} />
                    {wishlist.length > 0 && <span className="wishlist-badge">{wishlist.length}</span>}
                  </Link>
                </li>
              </>
            )}
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
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#catalogue" onClick={() => setMenuOpen(false)}>Collection</a></li>
            <li><a href="#blog" onClick={() => setMenuOpen(false)}>Blogs</a></li>
            {/* <li><a href="#video-showcase" onClick={() => setMenuOpen(false)}>Process</a></li> */}
            <li><Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist ({wishlist.length})</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}
