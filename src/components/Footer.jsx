import { Instagram, Facebook, Upload, X, Image as ImageIcon } from 'lucide-react'
import { useState, useRef } from 'react'

export default function Footer() {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-main-grid">

          
          <div className="footer-left reveal-up">

            <p className="body-text" style={{ maxWidth: 320 }}>
              The premium portfolio for versatile women's bottom wear—elevating every step with comfort and elegance.
            </p>

            <div className="footer-contact-info">
              <h4 className="text-blue">Get in Touch</h4>
              <p>E-48 Ground floor,<br />Safal 3, near New Cloth Market,<br />Sarangpur, Sherkotda, Ahmedabad, Gujarat 380002</p>
              <div className="mt-md">
                <a href="tel:+919601127234" className="d-block">+91 96011 27234</a>
                <a href="mailto:online.kayakalash@gmail.com" className="d-block mt-xs">online.kayakalash@gmail.com</a>
              </div>
            </div>

            <div className="footer-social-row">
              <h4 className="text-blue">Follow Kaya</h4>
              <div className="social-flex">
                <a href="https://www.instagram.com/kaya.kurti/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram"><Instagram /></a>
                <a href="https://www.facebook.com/kaya.kurti/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook"><Facebook /></a>
              </div>
            </div>
          </div>

          
          <div className="footer-right reveal-up delay-1" id="booking">
            <h4 className="text-blue footer-form-title">Send Us a Message</h4>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="footer-form">
                <div className="footer-form-row">
                  <div className="form-group">
                    <input type="text" placeholder="Full Name" required className="bottom-border-input" />
                  </div>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone Number" className="bottom-border-input" />
                  </div>
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" required className="bottom-border-input" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" className="bottom-border-input" />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Message"
                    required
                    className="bottom-border-input contact-textarea"
                    rows={3}
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
                        <Upload size={24} className="text-blue" />
                        <span>upload your business card for faster response</span>
                      </div>
                    ) : (
                      <div className="file-preview">
                        <img src={businessCard.preview} alt="Business Card Preview" className="preview-thumb" />
                        <div className="file-info">
                          <span className="file-name">{businessCard.file.name}</span>
                        </div>
                        <button type="button" className="remove-file" onClick={removeFile}>
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full">Send Message</button>
              </form>
            ) : (
              <div className="text-center" style={{ padding: '40px 0' }}>
                <p className="body-text text-blue" style={{ fontWeight: 500 }}>✓ Message sent! We'll get back to you within 24 hours.</p>
              </div>
            )}
          </div>

        </div>

        <div className="footer-bottom text-center">
          <p>&copy; 2026 Kaya Portfolio. Designed By Design Ville - Maahir Shah</p>
        </div>
      </div>
    </footer>
  )
}

