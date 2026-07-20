import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { blogs } from '../data/blogs'

export default function BlogSection() {
  const navigate = useNavigate()

  return (
    <section className="blog-section section-padding" id="blog">
      <div className="container">
        <div className="section-header text-center reveal-up">
          <span className="eyebrow">Industry Insights</span>
          <h2 className="section-title">Wholesale <span className="text-yellow">Knowledge Hub</span></h2>
          <p className="body-text">Deep research, market trends, and sourcing guides for B2B buyers.</p>
          <div className="accent-divider center-div"></div>
        </div>

        <div className="blog-grid mt-xl">
          {blogs.map((blog, idx) => (
            <div
              key={blog.id}
              className={`blog-card reveal-up delay-${(idx % 3) + 1}`}
              onClick={() => navigate(`/blogs/${blog.id}`)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/blogs/${blog.id}`) }}
            >
              <div className="blog-card-content">
                <span className="blog-date">{blog.date}</span>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <button
                  className="btn-text mt-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/blogs/${blog.id}`)
                  }}
                >
                  Read Full Article <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
