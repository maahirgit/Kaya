import { useState, useEffect, useCallback, useRef } from 'react'
import { Heart, ShoppingBag, X, ChevronLeft, ChevronRight, ArrowLeft, Send, ChevronDown, Upload } from 'lucide-react'
import SEO from '../components/SEO'
import EnquiryModal from '../components/EnquiryModal'
import { useWishlist } from '../context/WishlistContext'
import { collections } from '../data/collections'
import { combos } from '../data/combos'

const VISIBLE_BY_DEFAULT = 4

export default function CollectionPage() {
  const [activeTab, setActiveTab] = useState('catalogue')
  const [activeCollection, setActiveCollection] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [activeCombo, setActiveCombo] = useState(null)
  const [comboLightboxIndex, setComboLightboxIndex] = useState(null)
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [enquiryProduct, setEnquiryProduct] = useState(null)
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false)
  const [allUnlocked, setAllUnlocked] = useState(false)
  const { toggleWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    if (localStorage.getItem('kaya_collections_unlocked') === 'true') {
      setAllUnlocked(true)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prevImage = useCallback(() => {
    if (!activeCollection) return
    setLightboxIndex(i => (i - 1 + activeCollection.images.length) % activeCollection.images.length)
  }, [activeCollection])

  const nextImage = useCallback(() => {
    if (!activeCollection) return
    setLightboxIndex(i => (i + 1) % activeCollection.images.length)
  }, [activeCollection])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = e => {
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, prevImage, nextImage, closeLightbox])

  
  const closeComboLightbox = useCallback(() => setComboLightboxIndex(null), [])

  const prevComboImage = useCallback(() => {
    if (!activeCombo) return
    setComboLightboxIndex(i => (i - 1 + activeCombo.images.length) % activeCombo.images.length)
  }, [activeCombo])

  const nextComboImage = useCallback(() => {
    if (!activeCombo) return
    setComboLightboxIndex(i => (i + 1) % activeCombo.images.length)
  }, [activeCombo])

  useEffect(() => {
    if (comboLightboxIndex === null) return
    const handler = e => {
      if (e.key === 'ArrowLeft') prevComboImage()
      if (e.key === 'ArrowRight') nextComboImage()
      if (e.key === 'Escape') closeComboLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [comboLightboxIndex, prevComboImage, nextComboImage, closeComboLightbox])

  const visibleCollections = allUnlocked ? collections : collections.slice(0, VISIBLE_BY_DEFAULT)

  return (
    <div className="collection-page">
      <SEO
        title="Our Collection | Kaya"
        description="Explore our latest collection of premium women's bottom wear. New designs updated weekly."
        url="https://www.kayaforyou.com/collection"
      />

      <header className="collection-hero text-center">
        <div className="container">
          <span className="eyebrow">Seasonal 2026</span>
          <h1 className="section-title">Signature <span className="text-yellow">Collection</span></h1>
          <p className="page-subtitle">Explore our curated selection of premium bottom wear, designed for the modern woman who values style and comfort.</p>

          <div className="collection-tabs" style={{ marginTop: '40px' }}>
            <button
              className={`tab-btn ${activeTab === 'catalogue' ? 'active' : ''}`}
              onClick={() => { setActiveTab('catalogue'); setActiveCollection(null) }}
            >
              Catalogue
            </button>
            <button
              className={`tab-btn ${activeTab === 'sizecombo' ? 'active' : ''}`}
              onClick={() => { setActiveTab('sizecombo'); setActiveCombo(null) }}
            >
              Combo
            </button>
          </div>
        </div>
      </header>

      
      {activeTab === 'catalogue' && (
        <section id="catalogue-section" style={{ padding: '180px 0 120px' }}>
          <div className="container">

            
            {activeCollection && (
              <button
                className="coll-back-btn"
                onClick={() => setActiveCollection(null)}
              >
                <ArrowLeft size={16} />
                All Collections
              </button>
            )}

            
            {!activeCollection && (
              <>
                <div className="coll-card-grid">
                  {visibleCollections.map((col, idx) => (
                    <div
                      key={col.id}
                      className="coll-card"
                      onClick={() => setActiveCollection(col)}
                      aria-label={`Open ${col.name} collection`}
                      role="button"
                      tabIndex="0"
                      onKeyDown={(e) => { if (e.key === 'Enter') setActiveCollection(col) }}
                    >
                      <div className="coll-card-img-wrap">
                        <img src={col.cover} alt={col.name} loading={idx < 2 ? 'eager' : 'lazy'} />
                        <div className="coll-card-overlay">
                          <span className="coll-view-label">View Collection</span>
                        </div>
                        <button
                          className={`btn-heart ${isInWishlist(col.id) ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(col.id); }}
                          aria-label={`Mark interest in ${col.name}`}
                        >
                          <Heart className={isInWishlist(col.id) ? 'fill-yellow' : ''} />
                        </button>
                      </div>
                      <div className="coll-card-info">
                        <h3 className="coll-card-name">{col.name}</h3>
                        <p className="coll-card-tagline">{col.tagline}</p>
                        <span className="coll-card-count">{col.images.length} piece{col.images.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>

                
                {!allUnlocked && (
                  <div className="coll-gate">
                    <div className="coll-gate-fade" />
                    <div className="coll-gate-content">
                      <p className="coll-gate-label">
                        {collections.length - VISIBLE_BY_DEFAULT} more collections available
                      </p>
                      <button
                        className="btn btn-primary coll-gate-btn"
                        onClick={() => setIsUnlockModalOpen(true)}
                      >
                        <ChevronDown size={16} />
                        View All Collections
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            
            {activeCollection && (
              <>
                <div className="coll-detail-header">
                  <h2 className="section-title">{activeCollection.name}</h2>
                  <p className="body-text">{activeCollection.tagline}</p>
                  <div className="accent-divider" />
                </div>

                <div className="coll-detail-grid">
                  {activeCollection.images.map((src, idx) => (
                    <button
                      key={idx}
                      className="coll-img-tile"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`View image ${idx + 1} of ${activeCollection.name}`}
                    >
                      <img src={src} alt={`${activeCollection.name} ${idx + 1}`} loading="lazy" />
                      <div className="coll-img-overlay">
                        <span className="coll-zoom-icon">⤢</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="text-center mt-xl">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEnquiryProduct({ title: activeCollection.name, img: activeCollection.cover })
                      setIsEnquiryModalOpen(true)
                    }}
                  >
                    <ShoppingBag size={16} />
                    Enquire About This Collection
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      
      {activeTab === 'sizecombo' && (
        <section id="size-combo-section" style={{ padding: '180px 0 120px' }}>
          <div className="container">

            
            {activeCombo && (
              <button className="coll-back-btn" onClick={() => setActiveCombo(null)}>
                <ArrowLeft size={16} />
                All Combos
              </button>
            )}

            
            {!activeCombo && (
              <>
                <div className="text-center" style={{ marginBottom: '60px' }}>
                  <span className="eyebrow">Curated Sets</span>
                  <h2 className="section-title">Value <span className="text-yellow">Combos</span></h2>
                  <p className="page-subtitle">Explore our exclusive combo sets — multiple colours, one stunning style.</p>
                </div>
                <div className="coll-card-grid">
                  {combos.map((combo, idx) => (
                    <div
                      key={combo.id}
                      className="coll-card"
                      onClick={() => setActiveCombo(combo)}
                      aria-label={`Open ${combo.name} combo`}
                      role="button"
                      tabIndex="0"
                      onKeyDown={(e) => { if (e.key === 'Enter') setActiveCombo(combo) }}
                    >
                      <div className="coll-card-img-wrap">
                        <img src={combo.cover} alt={combo.name} loading={idx < 2 ? 'eager' : 'lazy'} />
                        <div className="coll-card-overlay">
                          <span className="coll-view-label">View Combo</span>
                        </div>
                        <button
                          className={`btn-heart ${isInWishlist(combo.id) ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(combo.id); }}
                          aria-label={`Mark interest in ${combo.name}`}
                        >
                          <Heart className={isInWishlist(combo.id) ? 'fill-yellow' : ''} />
                        </button>
                      </div>
                      <div className="coll-card-info">
                        <h3 className="coll-card-name">{combo.name}</h3>
                        <p className="coll-card-tagline">{combo.tagline}</p>
                        <span className="coll-card-count">{combo.colors.length} {combo.colors.length === 1 ? 'colour' : 'colours'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            
            {activeCombo && (
              <>
                <div className="coll-detail-header">
                  <h2 className="section-title">{activeCombo.name}</h2>
                  <p className="body-text">{activeCombo.tagline}</p>
                  <div className="accent-divider" />
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
                    {activeCombo.colors.map(c => (
                      <span key={c} className="size-pill size-pill-lg">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="coll-detail-grid">
                  {activeCombo.images.map((src, idx) => (
                    <button
                      key={idx}
                      className="coll-img-tile"
                      onClick={() => setComboLightboxIndex(idx)}
                      aria-label={`View image ${idx + 1} of ${activeCombo.name}`}
                    >
                      <img src={src} alt={`${activeCombo.name} ${idx + 1}`} loading="lazy" />
                      <div className="coll-img-overlay">
                        <span className="coll-zoom-icon">⤢</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="text-center mt-xl">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEnquiryProduct({ title: activeCombo.name, img: activeCombo.cover })
                      setIsEnquiryModalOpen(true)
                    }}
                  >
                    <ShoppingBag size={16} />
                    Enquire About This Combo
                  </button>
                </div>
              </>
            )}

          </div>
        </section>
      )}

      
      {comboLightboxIndex !== null && activeCombo && (
        <div
          className="lightbox-overlay"
          onClick={closeComboLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Combo image viewer"
        >
          <button className="lightbox-close" onClick={closeComboLightbox} aria-label="Close">
            <X size={24} />
          </button>
          {activeCombo.images.length > 1 && (
            <button
              className="lightbox-nav lightbox-prev"
              onClick={e => { e.stopPropagation(); prevComboImage() }}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}
          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img
              src={activeCombo.images[comboLightboxIndex]}
              alt={`${activeCombo.name} – image ${comboLightboxIndex + 1}`}
            />
          </div>
          {activeCombo.images.length > 1 && (
            <button
              className="lightbox-nav lightbox-next"
              onClick={e => { e.stopPropagation(); nextComboImage() }}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}
          <div className="lightbox-counter">
            {comboLightboxIndex + 1} / {activeCombo.images.length}
          </div>
        </div>
      )}

      
      {lightboxIndex !== null && activeCollection && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            <X size={24} />
          </button>

          {activeCollection.images.length > 1 && (
            <button
              className="lightbox-nav lightbox-prev"
              onClick={e => { e.stopPropagation(); prevImage() }}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img
              src={activeCollection.images[lightboxIndex]}
              alt={`${activeCollection.name} – image ${lightboxIndex + 1}`}
            />
          </div>

          {activeCollection.images.length > 1 && (
            <button
              className="lightbox-nav lightbox-next"
              onClick={e => { e.stopPropagation(); nextImage() }}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}

          <div className="lightbox-counter">
            {lightboxIndex + 1} / {activeCollection.images.length}
          </div>
        </div>
      )}

      
      {isUnlockModalOpen && (
        <UnlockModal
          onClose={() => setIsUnlockModalOpen(false)}
          onUnlock={() => {
            localStorage.setItem('kaya_collections_unlocked', 'true')
            setAllUnlocked(true)
            setIsUnlockModalOpen(false)
          }}
        />
      )}

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        product={enquiryProduct}
      />
    </div>
  )
}


function UnlockModal({ onClose, onUnlock }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [businessCard, setBusinessCard] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBusinessCard({
          file,
          preview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = (e) => {
    e.stopPropagation()
    setBusinessCard(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onUnlock()
    }, 1800)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content enquiry-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header text-center">
              <span className="eyebrow">Exclusive Access</span>
              <h2 className="modal-title">Unlock All <span className="text-yellow">Collections</span></h2>
              <p className="modal-subtitle" style={{ fontSize: '0.9rem' }}>
                Fill in your details below to explore our complete range of curated collections.
              </p>
            </div>

            <form className="modal-form mt-sm" onSubmit={handleSubmit}>
              <div className="form-group mb-sm">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="bottom-border-input"
                  style={{ padding: '8px 0' }}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group mb-sm">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="bottom-border-input"
                  style={{ padding: '8px 0' }}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group mb-sm">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="bottom-border-input"
                  style={{ padding: '8px 0' }}
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group mb-md">
                <textarea
                  placeholder="Your message (optional)"
                  className="bottom-border-input"
                  style={{ minHeight: '60px', padding: '8px 0', resize: 'none' }}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="business-card-uploader" style={{ marginBottom: '20px' }}>
                <label className="uploader-label" style={{ fontSize: '0.65rem' }}>Upload your business card</label>
                <div 
                  className={`upload-area ${businessCard ? 'has-file' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ minHeight: '80px', padding: '15px' }}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {!businessCard ? (
                    <div className="upload-placeholder">
                      <Upload size={18} className="text-blue" />
                      <span style={{ fontSize: '0.75rem' }}>upload your business card for faster response</span>
                    </div>
                  ) : (
                    <div className="file-preview">
                      <img src={businessCard.preview} alt="Business Card Preview" className="preview-thumb" style={{ width: '40px', height: '30px' }} />
                      <div className="file-info">
                        <span className="file-name" style={{ fontSize: '0.75rem' }}>{businessCard.file.name}</span>
                      </div>
                      <button type="button" className="remove-file" onClick={removeFile}>
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                <span>View All Collections</span>
                <Send className="icon-sm" size={16} />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center" style={{ padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', color: 'var(--brand-yellow)', marginBottom: '16px' }}>✓</div>
            <h2 className="text-blue mb-sm">You're In!</h2>
            <p className="body-text">Unlocking all collections for you…</p>
          </div>
        )}
      </div>
    </div>
  )
}

