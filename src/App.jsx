import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CollectionPage from './components/CollectionPage'
import WishlistPage from './components/WishlistPage'
import NotFound from './components/NotFound'
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
    
    const selectors = '.reveal-up, .reveal-left, .reveal-right, .fade-in'
    document.querySelectorAll(selectors).forEach(el => revealObserver.observe(el))
    
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { 
              if (node.matches && node.matches(selectors)) revealObserver.observe(node)
              
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
        title="Kaya | New Designs Every Week — Fast Fashion Kurti Manufacturer"
        description="Your go-to fast fashion manufacturer. New designs in kurtis and kurti sets every week that sell out every time — at reasonable prices for your business."
        keywords="kurti manufacturer, fast fashion manufacturer, wholesale kurtis, kurti sets, women ethnic wear, bulk kurtis, new kurti designs"
        url="https://www.kayaforyou.com/"
        image="https://www.kayaforyou.com/kaya-logo.png"
      />
      <Navbar />
      <FloatingWhatsApp />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </WishlistProvider>
  )
}

