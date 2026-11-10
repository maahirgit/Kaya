import { createContext, useContext, useState, useEffect } from 'react'
import { trackEvent } from '../utils/analytics'

const WishlistContext = createContext()
const STORAGE_KEY = 'kaya_wishlist'

function readSavedWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    // Storage blocked (private mode) or corrupted value: start empty.
    return []
  }
}

export function WishlistProvider({ children }) {
  // Start empty so the first client render matches the prerendered HTML,
  // then load the saved list once the page is running in the browser.
  const [wishlist, setWishlist] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setWishlist(readSavedWishlist())
    setLoaded(true)
  }, [])

  // Only save after the saved list has been loaded, so it is never
  // overwritten with the initial empty list.
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
    } catch {
      // Ignore: the wishlist still works for this visit.
    }
  }, [wishlist, loaded])

  const toggleWishlist = (productId) => {
    if (!wishlist.includes(productId)) trackEvent('wishlist_add', { item_id: String(productId) })
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const isInWishlist = (productId) => {
    return wishlist.includes(productId)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
