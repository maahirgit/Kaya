import { useState, useEffect } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LeadFormModal from './LeadFormModal'

export default function Hero() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
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
    <header className="hero" id="hero">
      <div className="hero-slider">
        <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
          <div className="slide-image-wrapper">
            <img src="/assets/Banner-3.jpg.jpeg" alt="Elegance in motion - Kaya boutique collection" />
          </div>
        </div>
        <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
          <div className="slide-image-wrapper">
            <img src="/assets/Banner-4.jpg.jpeg" alt="Modern styling - Kaya boutique collection" />
          </div>
        </div>
        <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
          <div className="slide-image-wrapper">
            <img src="/assets/Banner-5.jpg.jpeg" alt="Sophistication redefined - Kaya boutique collection" />
          </div>
        </div>
      </div>

      <div className="hero-gradient-overlay"></div>

      <div className="hero-content reveal-up">
        <span className="eyebrow fade-in text-white">Your go-to fast fashion manufacturer</span>
        <h1 className="hero-title">
          <span className="text-yellow">New Designs</span> <br />
          every week <br />
          <span className="text-yellow">sell out</span> <br />
          everytime
        </h1>
        <p className="hero-subtitle">Get the newest designs in kurtis and kurti sets at reasonable prices for your business</p>
        <div className="hero-ctas">
          <button onClick={handleExploreClick} className="btn btn-primary">
            <span>Explore Collection</span>
            <ArrowRight className="icon-sm" />
          </button>
        </div>
      </div>

      <div className="slider-controls">
        <div className="slider-dots">
          {[0, 1, 2].map(idx => (
            <div
              key={idx}
              className={`dot ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>

      <a href="#about" className="scroll-down" aria-label="Scroll Down">
        <ChevronDown className="bobbing" />
      </a>

      <LeadFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onFormSuccess={handleModalClose}
      />
    </header>
  )
}
