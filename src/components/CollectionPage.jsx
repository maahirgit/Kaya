import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Heart, ShoppingBag, X, ChevronLeft, ChevronRight, ArrowLeft, Send, ChevronDown, Upload } from 'lucide-react'
import SEO from './SEO'
import EnquiryModal from './EnquiryModal'
import NotFound from './NotFound'
import { useWishlist } from '../context/WishlistContext'
import { collections } from '../data/collections'
import { combos } from '../data/combos'
import { COLLECTIONS_PATH, COMBOS_PATH, collectionPath, comboPath, photoPath, photoAlt } from '../data/routes'

const VISIBLE_BY_DEFAULT = 4

const KINDS = {
  collection: {
    items: collections,
    path: collectionPath,
    listPath: COLLECTIONS_PATH,
    label: 'Collection',
    backLabel: 'All Collections',
    countLabel: item => `${item.images.length} piece${item.images.length !== 1 ? 's' : ''}`,
  },
  combo: {
    items: combos,
    path: comboPath,
    listPath: COMBOS_PATH,
    label: 'Combo',
    backLabel: 'All Combos',
    countLabel: item => `${item.colors.length} ${item.colors.length === 1 ? 'colour' : 'colours'}`,
  },
}

// Routes (see App.jsx):
//   /collection                          collection list
//   /collection/combos                   combo list
//   /collection/:itemId[/:photo]         collection detail [+ photo viewer]
//   /collection/combos/:itemId[/:photo]  combo detail [+ photo viewer]
export default function CollectionPage() {
  const { itemId, photo } = useParams()
  const { pathname } = useLocation()
  const kind = pathname === COMBOS_PATH || pathname.startsWith(`${COMBOS_PATH}/`) ? 'combo' : 'collection'
  const config = KINDS[kind]

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [enquiryProduct, setEnquiryProduct] = useState(null)
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false)
  const [allUnlocked, setAllUnlocked] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('kaya_collections_unlocked') === 'true') {
      setAllUnlocked(true)
    }
  }, [])

  // Scroll to top when moving between list and detail pages, not when opening a photo.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [kind, itemId])

  const item = itemId ? config.items.find(i => i.id === itemId) : null
  const photoIndex = photo === undefined ? null : Number(photo) - 1

  if (itemId && !item) return <NotFound />
  if (item && photoIndex !== null && !(Number.isInteger(photoIndex) && photoIndex >= 0 && photoIndex < item.images.length)) {
    return <NotFound />
  }

  const openEnquiry = target => {
    setEnquiryProduct({ title: target.name, img: target.cover })
    setIsEnquiryModalOpen(true)
  }

  return (
    <div className="collection-page">
      <CollectionSEO kind={kind} item={item} photoIndex={photoIndex} />

      <header className="collection-hero text-center">
        <div className="container">
          <span className="eyebrow">Seasonal 2026</span>
          {/* On detail pages the item name is the page's H1 (tracker #17, #19). */}
          {item ? (
            <p className="section-title heading-style">Signature <span className="text-yellow">Collection</span></p>
          ) : (
            <h1 className="section-title">Signature <span className="text-yellow">Collection</span></h1>
          )}
          <p className="page-subtitle">Explore our latest kurtis and kurti sets, built to sell out fast off your shelves</p>

          <nav className="collection-tabs" style={{ marginTop: '40px' }} aria-label="Collection type">
            <NavLink to={COLLECTIONS_PATH} className={() => `tab-btn ${kind === 'collection' ? 'active' : ''}`}>
              Catalogue
            </NavLink>
            <NavLink to={COMBOS_PATH} className={() => `tab-btn ${kind === 'combo' ? 'active' : ''}`}>
              Combo
            </NavLink>
          </nav>
        </div>
      </header>

      <section id={kind === 'combo' ? 'size-combo-section' : 'catalogue-section'} style={{ padding: '180px 0 120px' }}>
        <div className="container">
          {item ? (
            <ItemDetail kind={kind} item={item} onEnquire={() => openEnquiry(item)} />
          ) : kind === 'collection' ? (
            <>
              <ItemGrid kind="collection" items={allUnlocked ? collections : collections.slice(0, VISIBLE_BY_DEFAULT)} />
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
          ) : (
            <>
              <div className="text-center" style={{ marginBottom: '60px' }}>
                <span className="eyebrow">Curated Sets</span>
                <h2 className="section-title">Value <span className="text-yellow">Combos</span></h2>
                <p className="page-subtitle">Explore our exclusive combo sets — multiple colours, one stunning style.</p>
              </div>
              <ItemGrid kind="combo" items={combos} />
            </>
          )}
        </div>
      </section>

      {item && photoIndex !== null && (
        <Lightbox kind={kind} item={item} index={photoIndex} />
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

function CollectionSEO({ kind, item, photoIndex }) {
  const config = KINDS[kind]

  if (!item) {
    return kind === 'combo' ? (
      <SEO
        title="Kurti Combos | Kaya"
        description="Kurti combo sets from Kaya: one design in multiple colours, ready for wholesale and retail buyers. New designs every week."
        path={COMBOS_PATH}
      />
    ) : (
      <SEO
        title="Our Collection | Kaya"
        description="Explore our latest kurtis and kurti sets, built to sell out fast off your shelves. New designs every week from Kaya, Ahmedabad."
        path={COLLECTIONS_PATH}
      />
    )
  }

  // Photo pages share the item page's canonical URL, but use the photo itself
  // as the preview image so a shared link shows that exact design.
  const isPhoto = photoIndex !== null
  const title = isPhoto
    ? `${item.name} ${config.label}, Photo ${photoIndex + 1} | Kaya`
    : `${item.name} ${config.label} | Kaya`

  return (
    <SEO
      title={title}
      description={`${item.name} ${config.label.toLowerCase()} by Kaya Kurti: ${item.tagline}. ${config.countLabel(item)}. Enquire for wholesale kurtis and kurti sets.`}
      path={config.path(item.id)}
      image={isPhoto ? item.images[photoIndex] : item.cover}
    />
  )
}

function ItemGrid({ kind, items }) {
  const config = KINDS[kind]
  const { toggleWishlist, isInWishlist } = useWishlist()

  return (
    <div className="coll-card-grid">
      {items.map((item, idx) => (
        <div key={item.id} className="coll-card">
          <Link to={config.path(item.id)} className="coll-card-link">
            <div className="coll-card-img-wrap">
              <img src={item.cover} alt={photoAlt(item, 0)} loading={idx < 2 ? 'eager' : 'lazy'} />
              <div className="coll-card-overlay">
                <span className="coll-view-label">View {config.label}</span>
              </div>
            </div>
            <div className="coll-card-info">
              <h3 className="coll-card-name">{item.name}</h3>
              <p className="coll-card-tagline">{item.tagline}</p>
              <span className="coll-card-count">{config.countLabel(item)}</span>
            </div>
          </Link>
          <button
            className={`btn-heart ${isInWishlist(item.id) ? 'active' : ''}`}
            onClick={() => toggleWishlist(item.id)}
            aria-label={`Mark interest in ${item.name}`}
          >
            <Heart className={isInWishlist(item.id) ? 'fill-yellow' : ''} />
          </button>
        </div>
      ))}
    </div>
  )
}

function ItemDetail({ kind, item, onEnquire }) {
  const config = KINDS[kind]
  const basePath = config.path(item.id)

  return (
    <>
      <Link to={config.listPath} className="coll-back-btn">
        <ArrowLeft size={16} />
        {config.backLabel}
      </Link>

      <div className="coll-detail-header">
        <h1 className="section-title">{item.name}</h1>
        <p className="body-text">{item.tagline}</p>
        <div className="accent-divider" />

        {kind === 'combo' && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {item.colors.map(c => (
              <span key={c} className="size-pill size-pill-lg">{c}</span>
            ))}
          </div>
        )}
      </div>

      <div className="coll-detail-grid">
        {item.images.map((src, idx) => (
          <Link
            key={src}
            to={photoPath(basePath, idx + 1)}
            state={{ fromGrid: true }}
            className="coll-img-tile"
            aria-label={`View image ${idx + 1} of ${item.name}`}
          >
            <img src={src} alt={photoAlt(item, idx)} loading="lazy" />
            <div className="coll-img-overlay">
              <span className="coll-zoom-icon">⤢</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-xl">
        <button className="btn btn-primary" onClick={onEnquire}>
          <ShoppingBag size={16} />
          Enquire About This {config.label}
        </button>
      </div>
    </>
  )
}

function Lightbox({ kind, item, index }) {
  const navigate = useNavigate()
  const location = useLocation()
  const basePath = KINDS[kind].path(item.id)
  const count = item.images.length

  // Prev/next replace the history entry, so Back closes the viewer instead of
  // stepping through every photo viewed.
  const goTo = useCallback(i => {
    navigate(photoPath(basePath, ((i + count) % count) + 1), { replace: true, state: location.state })
  }, [navigate, basePath, count, location.state])

  const close = useCallback(() => {
    // Opened from the grid: step back so Forward/Back history stays natural.
    // Opened from a shared link: go to the item page instead of leaving the site.
    if (location.state?.fromGrid) navigate(-1)
    else navigate(basePath, { replace: true })
  }, [navigate, basePath, location.state])

  useEffect(() => {
    const handler = e => {
      if (e.key === 'ArrowLeft') goTo(index - 1)
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index, goTo, close])

  return (
    <div
      className="lightbox-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} image viewer`}
    >
      <button className="lightbox-close" onClick={close} aria-label="Close">
        <X size={24} />
      </button>

      {count > 1 && (
        <button
          className="lightbox-nav lightbox-prev"
          onClick={e => { e.stopPropagation(); goTo(index - 1) }}
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
        <img src={item.images[index]} alt={photoAlt(item, index)} />
      </div>

      {count > 1 && (
        <button
          className="lightbox-nav lightbox-next"
          onClick={e => { e.stopPropagation(); goTo(index + 1) }}
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      )}

      <div className="lightbox-counter">
        {index + 1} / {count}
      </div>
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
