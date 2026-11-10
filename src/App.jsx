import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CollectionPage from './components/CollectionPage'
import WishlistPage from './components/WishlistPage'
import AboutPage from './components/AboutPage'
import BlogsPage from './components/BlogsPage'
import BlogPostPage from './components/BlogPostPage'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { WishlistProvider } from './context/WishlistContext'
import { initAnalytics, trackPageView } from './utils/analytics'

export default function App() {
  const location = useLocation()

  // Tracker #5/#8: start GA4 / Meta Pixel (no-op until IDs are set).
  useEffect(() => {
    initAnalytics()
  }, [])

  // One page view per route change. Short delay so the new page's <title>
  // (set by Helmet) is in place before it is recorded.
  useEffect(() => {
    const timer = setTimeout(() => trackPageView(location.pathname), 300)
    return () => clearTimeout(timer)
  }, [location.pathname])

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
      <Navbar />
      <FloatingWhatsApp />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/collection/combos" element={<CollectionPage />} />
        <Route path="/collection/combos/:itemId" element={<CollectionPage />} />
        <Route path="/collection/combos/:itemId/:photo" element={<CollectionPage />} />
        <Route path="/collection/:itemId" element={<CollectionPage />} />
        <Route path="/collection/:itemId/:photo" element={<CollectionPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogPostPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </WishlistProvider>
  )
}

