import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { blogs } from '../data/blogs'

export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState(null)

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
            >
              <div className="blog-card-content">
                <span className="blog-date">{blog.date}</span>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <button 
                  className="btn-text mt-sm"
                  onClick={() => setActiveBlog(blog)}
                >
                  Read Full Article <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      {activeBlog && (
        <div className="modal-overlay" onClick={() => setActiveBlog(null)}>
          <div className="modal-content blog-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveBlog(null)} aria-label="Close">
              <X />
            </button>
            <div className="blog-modal-header">
              <span className="blog-date">{activeBlog.date}</span>
              <h2 className="modal-title">{activeBlog.title}</h2>
              <p className="blog-author">{activeBlog.author}</p>
              <div className="accent-divider"></div>
            </div>
            
            <div 
              className="blog-modal-body"
              dangerouslySetInnerHTML={{ __html: activeBlog.content }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
