import { ArrowRight } from 'lucide-react'

export default function AboutUs() {
  return (
    <section className="about-split" id="about">
      <div className="about-split-inner">

        <div className="about-split-img reveal-left">
          <div className="about-split-img-frame">
            <img
              src="/assets/about_us_lifestyle.png"
              alt="Premium minimalist lifestyle - Kaya boutique"
              loading="lazy"
            />
          </div>
        </div>

        <div className="about-split-text reveal-right">
          <span className="eyebrow">Our Story</span>
          <h2 className="section-title">
            Revolutionizing Fast-Fashion<span className="text-blue"> Manufacturing in Ahmedabad</span>
          </h2>
          <div className="accent-divider"></div>
          <p className="body-text">

            In the B2B fashion sector, the winner isn't just the one with the best design—it’s the one with the fastest supply chain. For retail chains and wholesalers, the challenge is maintaining high inventory turnover while keeping acquisition costs low.
          </p>
          {/* <p className="body-text">
            In the B2B fashion sector, the winner isn't just the one with the best design—it’s the one with the fastest supply chain. For retail chains and wholesalers, the challenge is maintaining high inventory turnover while keeping acquisition costs low.
          </p> */}
          <p className="body-text">
            At Kaya Kurti (Kalash India Fabtex Pvt. Ltd), we serve as the manufacturing engine for brands that demand agility. We don't just make kurtis; we build the inventory that drives your revenue.
          </p>
          <a href="#catalogue" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: '8px' }}>
            <span>Explore the Collection</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  )
}
