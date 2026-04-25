import { useState, useRef } from 'react'
import { X, Send, Upload } from 'lucide-react'

export default function LeadFormModal({ isOpen, onClose, onFormSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
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
    // In a real app, you would send this data to a backend or CRM
    localStorage.setItem('hasVisitedLeadForm', 'true')
    onFormSuccess()
  }

  const handleClose = () => {
    localStorage.setItem('hasVisitedLeadForm', 'true')
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          <X />
        </button>
        
        <div className="modal-header text-center">
          <span className="eyebrow">Join the Inner Circle</span>
          <h2 className="modal-title">Unlock the Full <span className="text-yellow">Catalogue</span></h2>
          <p className="modal-subtitle">Share your details to explore our complete premium collection and latest arrivals.</p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input 
              type="tel" 
              placeholder="Contact Number" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          <div className="business-card-uploader">
            <label className="uploader-label">Upload your business card</label>
            <div 
              className={`upload-area ${businessCard ? 'has-file' : ''}`}
              onClick={() => fileInputRef.current?.click()}
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
                  <Upload size={20} className="text-blue" />
                  <span>upload your business card for faster response</span>
                </div>
              ) : (
                <div className="file-preview">
                  <img src={businessCard.preview} alt="Business Card Preview" className="preview-thumb" />
                  <div className="file-info">
                    <span className="file-name">{businessCard.file.name}</span>
                  </div>
                  <button type="button" className="remove-file" onClick={removeFile}>
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-md">
            <span>Access Collection</span>
            <Send className="icon-sm" />
          </button>
          
          <p className="form-note text-center mt-md">
            Your privacy is our priority. No spam, just style.
          </p>
        </form>
      </div>
    </div>
  )
}
