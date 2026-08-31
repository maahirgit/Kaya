import { useEffect } from 'react'
import BlogSection from './BlogSection'
import SEO from './SEO'

export default function BlogsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <SEO 
        title="Blogs & Industry Insights | Kaya"
        description="Deep research, market trends, and sourcing guides for B2B buyers."
        url="https://www.kayaforyou.com/blogs"
      />
      <BlogSection />
    </div>
  )
}
