import { useState, useEffect } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { blogs } from '../data/blogs'

export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState(null)
  const [openedFromApp, setOpenedFromApp] = useState(false)

  useEffect(() => {
    const checkUrl = () => {
      const path = window.location.pathname
      if (path.startsWith('/blogs/') && path.length > 7) {
        const blogId = path.split('/blogs/')[1]
        const blog = blogs.find(b => b.id === blogId)
        setActiveBlog(blog || null)
      } else {
        setActiveBlog(null)
      }
    }

    checkUrl()

    window.addEventListener('popstate', checkUrl)
    return () => window.removeEventListener('popstate', checkUrl)
  }, [])

  const handleOpenBlog = (blog) => {
    setOpenedFromApp(true)
    setActiveBlog(blog)
    window.history.pushState(null, '', `/blogs/${blog.id}`)
  }

  const handleCloseBlog = () => {
    setActiveBlog(null)
    if (openedFromApp) {
      window.history.back()
      setOpenedFromApp(false)
    } else {
      window.history.pushState(null, '', '/')
    }
  }

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
              onClick={() => handleOpenBlog(blog)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => { if (e.key === 'Enter') handleOpenBlog(blog) }}
            >
              <div className="blog-card-content">
                <span className="blog-date">{blog.date}</span>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <button 
                  className="btn-text mt-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenBlog(blog);
                  }}
                >
                  Read Full Article <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeBlog && (
        <div className="modal-overlay" onClick={handleCloseBlog}>
          <div className="modal-content blog-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseBlog} aria-label="Close">
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

