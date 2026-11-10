import Hero from './Hero'
import AboutUs from './AboutUs'
import Catalogue from './Catalogue'
import BlogSection from './BlogSection'
import SEO from './SEO'
import StructuredData from './StructuredData'
import { businessSchema } from '../data/structuredData'

export default function Home() {
  return (
    <>
      <SEO
        title="Kaya | New Designs Every Week — Fast Fashion Kurti Manufacturer"
        description="New designs every week that sell out every time. Your go-to fast fashion kurti manufacturer — kurtis and kurti sets at reasonable prices for your business."
        keywords="kurti manufacturer, fast fashion manufacturer, wholesale kurtis, kurti sets, women ethnic wear, bulk kurtis, new kurti designs"
        path="/"
      />
      <StructuredData data={businessSchema()} />
      <Hero />
      <AboutUs />
      <Catalogue />
      <BlogSection />
    </>
  )
}
