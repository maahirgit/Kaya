import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { getPrerenderRoutes, getSitemapPages } from './src/data/siteRoutes.js'
import { SITE_URL } from './src/config/site.js'

// Last git commit date (YYYY-MM-DD) touching any of `sources`, or null when
// git history is unavailable (the <lastmod> tag is then left out).
function lastModified(sources) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sources], { encoding: 'utf8' }).trim()
    return out || null
  } catch {
    return null
  }
}

// Generates dist/sitemap.xml from src/data/siteRoutes.js (tracker #15).
function sitemapPlugin() {
  return {
    name: 'kaya-sitemap',
    apply: 'build',
    generateBundle() {
      const urls = getSitemapPages().map(({ path: pagePath, changefreq, priority, sources }) => {
        const lastmod = lastModified(sources)
        return [
          '  <url>',
          `    <loc>${SITE_URL}${pagePath}</loc>`,
          lastmod && `    <lastmod>${lastmod}</lastmod>`,
          `    <changefreq>${changefreq}</changefreq>`,
          `    <priority>${priority}</priority>`,
          '  </url>',
        ].filter(Boolean).join('\n')
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    // Tracker #11: write static HTML for every route at build time.
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve('src/prerender.jsx'),
      additionalPrerenderRoutes: getPrerenderRoutes(),
    }),
    sitemapPlugin(),
  ],
})
