// Every URL the site serves. Used at build time to prerender each page
// (tracker #11) and to generate sitemap.xml (tracker #15).
// Keep this file free of React/browser code: vite.config.js imports it in Node.
import { collections } from './collections.js'
import { combos } from './combos.js'
import { blogs } from './blogs.js'
import { COLLECTIONS_PATH, COMBOS_PATH, collectionPath, comboPath, photoPath } from './routes.js'

// `sources` are the repo paths a page is built from; the sitemap uses their
// last git commit date as <lastmod>.
const COLLECTION_SOURCES = ['src/data/collections.js', 'src/components/CollectionPage.jsx']
const COMBO_SOURCES = ['src/data/combos.js', 'src/components/CollectionPage.jsx']
const BLOG_SOURCES = ['src/data/blogs.js', 'src/components/BlogPostPage.jsx']

export function getSitemapPages() {
  return [
    { path: '/', changefreq: 'weekly', priority: '1.0', sources: ['src/components'] },
    { path: '/about', changefreq: 'monthly', priority: '0.8', sources: ['src/components/AboutUs.jsx', 'src/components/AboutPage.jsx'] },
    { path: COLLECTIONS_PATH, changefreq: 'weekly', priority: '0.9', sources: COLLECTION_SOURCES },
    { path: COMBOS_PATH, changefreq: 'weekly', priority: '0.8', sources: COMBO_SOURCES },
    ...collections.map(c => ({
      path: collectionPath(c.id), changefreq: 'weekly', priority: '0.8',
      sources: [...COLLECTION_SOURCES, `public/assets/collections/${c.cover.split('/')[3]}`],
    })),
    ...combos.map(c => ({
      path: comboPath(c.id), changefreq: 'weekly', priority: '0.7',
      sources: [...COMBO_SOURCES, `public/assets/combos/${c.cover.split('/')[3]}`],
    })),
    { path: '/blogs', changefreq: 'weekly', priority: '0.8', sources: BLOG_SOURCES },
    ...blogs.map(b => ({ path: `/blogs/${b.id}`, changefreq: 'monthly', priority: '0.7', sources: BLOG_SOURCES })),
    // Tracker #16 (remove /wishlist) is on hold, so it stays listed for now.
    { path: '/wishlist', changefreq: 'monthly', priority: '0.6', sources: ['src/components/WishlistPage.jsx'] },
  ]
}

// Pages to prerender: every sitemap page, plus each photo URL (not in the
// sitemap, since they share their collection's canonical URL, but prerendered
// so shared links get the right preview image), plus the 404 page.
export function getPrerenderRoutes() {
  const photoPages = [
    ...collections.map(c => ({ base: collectionPath(c.id), count: c.images.length })),
    ...combos.map(c => ({ base: comboPath(c.id), count: c.images.length })),
  ].flatMap(({ base, count }) => Array.from({ length: count }, (_, i) => photoPath(base, i + 1)))

  return [...getSitemapPages().map(p => p.path), ...photoPages, '/404.html']
}
