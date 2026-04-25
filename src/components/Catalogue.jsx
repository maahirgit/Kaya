import { useState, useEffect } from 'react'
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LeadFormModal from './LeadFormModal'
import EnquiryModal from './EnquiryModal'
import { useWishlist } from '../context/WishlistContext'
import { collections } from '../data/collections'
import { combos } from '../data/combos'

export default function Catalogue() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [enquiryProduct, setEnquiryProduct] = useState(null)
  const { toggleWishlist, isInWishlist } = useWishlist()
  
  const featuredItems = [
    { ...collections[0], type: 'Collection' },
    { ...combos[0], type: 'Combo' },
    { ...collections[1], type: 'Collection' }
  ]

  useEffect(() => {
    // Reveal animation logic handled by intersection observer in parent or globally if needed
  }, [])

  const handleExploreClick = () => {
    const hasVisited = localStorage.getItem('hasVisitedLeadForm')
    if (!hasVisited) {
      setIsModalOpen(true)
    } else {
      navigate('/collection')
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    navigate('/collection')
  }


  return (
    <section
      className="catalogue section-padding bg-light"
      id="catalogue"
      aria-label="Women's fashion product catalogue"
    >
      <div className="container-wide text-center">
        <span className="eyebrow">The Collection</span>
        <h1 className="section-title">Complete Your Look</h1>
        <div className="accent-divider center-div"></div>

        <div className="grid portfolio-grid mt-md">
          {featuredItems.map((p, i) => (
            <article
              key={p.id}
              className={`portfolio-item reveal-up ${i > 0 ? 'delay-' + i : ''}`}
              itemScope
              itemType="https://schema.org/Product"
            >
              <div className="portfolio-img-box mb-md">
                <img
                  src={p.cover}
                  alt={`${p.name} for women - Kaya collection`}
                  loading="lazy"
                  itemProp="image"
                />
                <div className="item-overlay">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setEnquiryProduct({ title: p.name, img: p.cover })
                      setIsEnquiryModalOpen(true)
                    }}
                  >
                    <ShoppingBag size={14} />
                    <span>Enquire</span>
                  </button>
                </div>
                <button
                  className={`btn-heart ${isInWishlist(p.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(p.id)}
                  aria-label={`Mark interest in ${p.name}`}
                >
                  <Heart className={isInWishlist(p.id) ? 'fill-yellow' : ''} />
                </button>
              </div>
              <div className="portfolio-info">
                <span className={`portfolio-tag mb-xs d-block`}>
                  {p.type}
                </span>
                <h2 itemProp="name" className="mb-sm">{p.name}</h2>
                <p itemProp="description" className="body-text">{p.tagline}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-lg reveal-up">
          <button
            className="btn btn-primary"
            onClick={handleExploreClick}
            aria-label="Explore full product collection"
          >
            <span>Explore Our Collection</span>
            <ArrowRight className="icon-sm" />
          </button>
        </div>
      </div>

      <LeadFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onFormSuccess={handleModalClose}
      />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        product={enquiryProduct}
      />
    </section>
  )
}