import { useEffect } from 'react'
import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import Catalogue from '../components/Catalogue'
import BlogSection from '../components/BlogSection'

import SEO from '../components/SEO'

export default function Home() {

  return (
    <>
      <SEO 
        title="Kaya | Premium Women's Bottom Wear Portfolio"
        description="Discover Kaya's premium women's bottom wear. A curated portfolio of high-end leggings, pencil pants, and designer plazos."
        keywords="women bottom wear, premium leggings, fashion portfolio, kaya brand, designer pencil pants"
        url="https://yourdomain.com/"
      />
      <Hero />
      <AboutUs />
      <Catalogue />
      <BlogSection />
      
    </>
  )
}

