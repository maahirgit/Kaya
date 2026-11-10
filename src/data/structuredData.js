// JSON-LD structured data builders (tracker #20).
import { BUSINESS, SITE_URL, absoluteUrl } from '../config/site.js'
import { COLLECTIONS_PATH, COMBOS_PATH } from './routes.js'

const ORG_ID = `${SITE_URL}/#organization`

const organizationRef = { '@id': ORG_ID }

// Home: Organization + LocalBusiness.
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: `${SITE_URL}/`,
        logo: absoluteUrl(BUSINESS.logo),
        email: BUSINESS.email,
        telephone: BUSINESS.telephone,
        sameAs: BUSINESS.sameAs,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: BUSINESS.name,
        url: `${SITE_URL}/`,
        image: absoluteUrl(BUSINESS.logo),
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        address: { '@type': 'PostalAddress', ...BUSINESS.address },
        sameAs: BUSINESS.sameAs,
        parentOrganization: organizationRef,
      },
    ],
  }
}

// crumbs: [{ name, path }, ...] from Home down to the current page.
export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

const HOME_CRUMB = { name: 'Home', path: '/' }
const COLLECTION_CRUMB = { name: 'Collection', path: COLLECTIONS_PATH }
const COMBOS_CRUMB = { name: 'Combos', path: COMBOS_PATH }

export const collectionListCrumbs = () => [HOME_CRUMB, COLLECTION_CRUMB]
export const comboListCrumbs = () => [HOME_CRUMB, COLLECTION_CRUMB, COMBOS_CRUMB]
export const collectionCrumbs = (item, path) => [HOME_CRUMB, COLLECTION_CRUMB, { name: item.name, path }]
export const comboCrumbs = (item, path) => [HOME_CRUMB, COLLECTION_CRUMB, COMBOS_CRUMB, { name: item.name, path }]
export const blogCrumbs = (blog) => [HOME_CRUMB, { name: 'Blogs', path: '/blogs' }, { name: blog.title, path: `/blogs/${blog.id}` }]

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

// "April 2026" -> "2026-04". The blog data only has month and year.
function isoMonth(label) {
  const [month, year] = label.toLowerCase().split(/\s+/)
  const m = MONTHS.indexOf(month)
  return m >= 0 && /^\d{4}$/.test(year) ? `${year}-${String(m + 1).padStart(2, '0')}` : undefined
}

// Blog post: Article.
export function articleSchema(blog) {
  const firstImage = blog.content.match(/<img[^>]+src="([^"]+)"/)?.[1]
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: encodeURI(absoluteUrl(firstImage || BUSINESS.logo)),
    datePublished: isoMonth(blog.date),
    author: { '@type': 'Organization', name: BUSINESS.name, url: `${SITE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(BUSINESS.logo) },
    },
    mainEntityOfPage: absoluteUrl(`/blogs/${blog.id}`),
  }
}
