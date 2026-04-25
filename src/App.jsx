import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CollectionPage from './components/CollectionPage'
import WishlistPage from './components/WishlistPage'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import SEO from './components/SEO'
import { WishlistProvider } from './context/WishlistContext'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
        }
      })
    }, { threshold: 0.1 })
    
    // Initial scan
    const selectors = '.reveal-up, .reveal-left, .reveal-right, .fade-in'
    document.querySelectorAll(selectors).forEach(el => revealObserver.observe(el))
    
    // Observe DOM mutations to catch dynamically added or hot-reloaded elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              if (node.matches && node.matches(selectors)) revealObserver.observe(node)
              // Also check children
              const children = node.querySelectorAll ? node.querySelectorAll(selectors) : []
              children.forEach(el => revealObserver.observe(el))
            }
          })
        }
      })
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })
    
    return () => {
      revealObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [location.pathname])

  return (
    <WishlistProvider>
      <SEO 
        title="Kaya | Premium Women's Bottom Wear"
        description="Shop Kaya for premium women's bottom wear. Discover a versatile range of high-quality leggings, pencil pants, and designer plazos."
        keywords="women fashion, bottom wear, premium leggings, pencil pants, designer plazos, kaya brand"
        url="https://yourdomain.com/"
      />
      <Navbar />
      <FloatingWhatsApp />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>

      <Footer />
    </WishlistProvider>
  )
}
