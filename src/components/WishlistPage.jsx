import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'
import SEO from '../components/SEO'
import { useWishlist } from '../context/WishlistContext'
import { products } from '../data/products'
import { collections } from '../data/collections'
import { combos } from '../data/combos'
import EnquiryModal from '../components/EnquiryModal'

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist()
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [enquiryProduct, setEnquiryProduct] = useState(null)

  const allItems = [
    ...products,
    ...collections.map(c => ({
      id: c.id,
      title: c.name,
      img: c.cover,
      price: 'Price on Enquiry',
      category: 'Collection',
      tag: 'Collection'
    })),
    ...combos.map(c => ({
      id: c.id,
      title: c.name,
      img: c.cover,
      price: 'Price on Enquiry',
      category: 'Combo',
      tag: 'Combo'
    }))
  ]

  const wishlistProducts = allItems.filter(p => wishlist.includes(p.id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="wishlist-page pt-nav" style={{ minHeight: '80vh' }}>
      <SEO 
        title="Your Wishlist | Kaya Collection"
        description="View your favorite premium bottom wear from Kaya. Save your top picks and enquire whenever you're ready."
      />

      <section className="section-padding">
        <div className="container">
          <div className="wishlist-header mb-xl">
            <Link to="/collection" className="back-link mb-md d-inline-flex align-items-center">
              <ArrowLeft size={16} className="me-xs" />
              Back to Collection
            </Link>
            <div className="d-flex justify-content-between align-items-end">
              <div>
                <span className="eyebrow">Your Favorites</span>
                <h1 className="section-title">The <span className="text-yellow">Wishlist</span></h1>
              </div>
              {wishlistProducts.length > 0 && (
                <button 
                  className="btn-text text-danger d-flex align-items-center"
                  onClick={clearWishlist}
                >
                  <Trash2 size={16} className="me-sm" />
                  Clear All
                </button>
              )}
            </div>
            <div className="accent-divider"></div>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="empty-wishlist text-center py-xl reveal-up">
              <div className="empty-icon mb-md">
                <Heart size={64} strokeWidth={1} className="text-muted" />
              </div>
              <h3>Your wishlist is empty</h3>
              <p className="body-text mb-lg">You haven't saved any items yet. Explore Our Collection to find your favorites.</p>
              <Link to="/collection" className="btn btn-primary">
                Explore Our Collection
              </Link>
            </div>
          ) : (
            <div className="grid portfolio-grid">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="portfolio-item">
                  <div className="portfolio-img-box">
                    <img src={p.img} alt={`${p.title} - Kaya collection`} />
                    <div className="item-overlay">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setEnquiryProduct(p)
                          setIsEnquiryModalOpen(true)
                        }}
                      >
                        <ShoppingBag size={16} />
                        Enquire
                      </button>
                    </div>
                    <button 
                      className="btn-heart active"
                      onClick={() => toggleWishlist(p.id)}
                    >
                      <Heart className="fill-yellow" />
                    </button>
                    {p.tag && <span className="item-tag">{p.tag}</span>}
                  </div>
                  <div className="portfolio-info mt-md">
                    <span className="portfolio-tag">{p.category}</span>
                    <h4>{p.title}</h4>
                    <div className="product-meta">
                      <span className="item-price">{p.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        product={enquiryProduct}
      />
    </div>
  )
}

