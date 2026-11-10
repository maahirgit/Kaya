import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
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

// Moves each prerendered page into dist/_pages/ (e.g. dist/about/index.html
// -> dist/_pages/about/index.html) and .htaccess serves /about from there.
// With no real "about" folder at the top level, the server never redirects
// /about to /about/ (Apache/LiteSpeed add that slash for real folders).
const PAGES_DIR = '_pages'

function pagesFolderPlugin() {
  let outDir

  const moveIndexFiles = (dir, rel = '') => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const relPath = path.join(rel, entry.name)
      if (!rel && (entry.name === 'assets' || entry.name === PAGES_DIR)) continue
      const from = path.join(dir, entry.name)
      moveIndexFiles(from, relPath)
      const page = path.join(from, 'index.html')
      if (fs.existsSync(page)) {
        const to = path.join(outDir, PAGES_DIR, relPath, 'index.html')
        fs.mkdirSync(path.dirname(to), { recursive: true })
        fs.renameSync(page, to)
      }
      if (fs.readdirSync(from).length === 0) fs.rmdirSync(from)
    }
  }

  return {
    name: 'kaya-pages-folder',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    writeBundle() {
      moveIndexFiles(outDir)
    },
    // Same mapping for `npm run preview`, so local testing matches the server.
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [urlPath, query] = req.url.split('?')
        const clean = decodeURIComponent(urlPath).replace(/\/+$/, '')
        if (clean && !clean.includes('..')) {
          const page = path.join(outDir, PAGES_DIR, clean, 'index.html')
          if (fs.existsSync(page)) req.url = `/${PAGES_DIR}${clean}/index.html${query ? `?${query}` : ''}`
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    pagesFolderPlugin(),
    // Tracker #11: write static HTML for every route at build time.
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve('src/prerender.jsx'),
      additionalPrerenderRoutes: getPrerenderRoutes(),
    }),
    sitemapPlugin(),
  ],
})
