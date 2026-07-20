import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { blogs } from '../data/blogs'
import SEO from './SEO'

export default function BlogPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = blogs.find(b => b.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!blog) {
    return (
      <div style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center' }}>
        <h2>Blog not found</h2>
        <button onClick={() => navigate('/blogs')} className="btn btn-primary" style={{ marginTop: '24px' }}>
          Back to Blogs
        </button>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`${blog.title} | Kaya`}
        description={blog.excerpt}
        keywords="kurti manufacturer, wholesale kurtis, fabric guide, kurti business"
        url={`https://www.kayaforyou.com/blogs/${blog.id}`}
        image="https://www.kayaforyou.com/kaya-logo.png"
      />

      <div className="blog-post-page">
        <div className="blog-post-container">

          <button
            className="blog-back-btn"
            onClick={() => navigate('/blogs')}
            aria-label="Back to Blogs"
          >
            <ArrowLeft size={18} />
            <span>Back to Blogs</span>
          </button>

          <article>
            <header className="blog-post-header">
              <span className="blog-date">{blog.date}</span>
              <h1 className="blog-post-title">{blog.title}</h1>
              <p className="blog-author">{blog.author}</p>
              <div className="accent-divider"></div>
            </header>

            <div
              className="blog-modal-body blog-post-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

        </div>
      </div>
    </>
  )
}
