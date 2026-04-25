import { useState, useRef } from 'react'
import { X, Send, ShoppingBag, Upload } from 'lucide-react'

export default function EnquiryModal({ isOpen, onClose, product }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [businessCard, setBusinessCard] = useState(null)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

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

  const handleSubmit = (e) => {
    e.preventDefault()

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 3000)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content enquiry-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header text-center">
              <ShoppingBag className="mx-auto text-yellow mb-xs" size={24} />
              <span className="eyebrow" style={{ fontSize: '0.65rem' }}>Product Enquiry</span>
              <h2 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Enquire About <span className="text-blue">{product?.title || 'Our Product'}</span></h2>
              <p className="modal-subtitle" style={{ fontSize: '0.85rem' }}>Share your details and we'll get back to you with pricing and availability.</p>
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
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group mb-md">
                <textarea 
                  placeholder="Your message (optional)" 
                  className="bottom-border-input"
                  style={{ minHeight: '60px', padding: '8px 0', resize: 'none' }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
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
                <span>Send Enquiry</span>
                <Send className="icon-sm" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-xl">
            <div className="success-icon text-yellow mb-md">✓</div>
            <h2 className="text-blue mb-sm">Enquiry Sent!</h2>
            <p className="body-text">We've received your request for <strong>{product?.title}</strong>. Our team will contact you shortly.</p>
          </div>
        )}
      </div>
    </div>
  )
}

