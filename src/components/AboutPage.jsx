import { useEffect } from 'react'
import AboutUs from './AboutUs'
import SEO from './SEO'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <SEO 
        title="About Us | Kaya"
        description="Learn about our manufacturing process and heritage."
        url="https://www.kayaforyou.com/about"
      />
      <AboutUs />
    </div>
  )
}
