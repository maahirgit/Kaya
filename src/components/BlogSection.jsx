import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogs } from '../data/blogs'

// headingTag: 'h1' on the Blogs page, 'h2' inside the home page (tracker #19).
export default function BlogSection({ headingTag: Heading = 'h2' }) {
  return (
    <section className="blog-section section-padding" id="blog">
      <div className="container">
        <div className="section-header text-center reveal-up">
          <span className="eyebrow">Industry Insights</span>
          <Heading className="section-title">Wholesale <span className="text-yellow">Knowledge Hub</span></Heading>
          <p className="body-text">Deep research, market trends, and sourcing guides for B2B buyers.</p>
          <div className="accent-divider center-div"></div>
        </div>

        <div className="blog-grid mt-xl">
          {blogs.map((blog, idx) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              className={`blog-card reveal-up delay-${(idx % 3) + 1}`}
            >
              <div className="blog-card-content">
                <span className="blog-date">{blog.date}</span>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <span className="btn-text mt-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Read Full Article <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
