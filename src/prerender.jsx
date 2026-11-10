// Build-time prerendering (tracker #11). vite-prerender-plugin calls
// prerender() once per route in Node and writes the returned HTML into
// dist/<route>/index.html, so every page has its text, headings, links and
// SEO tags in the raw HTML before any JavaScript runs.
import { StrictMode } from 'react'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

export async function prerender({ url }) {
  // Dynamic import keeps the server renderer out of the browser bundle.
  const { renderToString } = await import('react-dom/server')

  const helmetContext = {}
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  )

  const { helmet } = helmetContext
  const title = [helmet.title.toComponent()[0]?.props.children].flat().join('')

  // Keep Helmet's data-rh marker so the browser-side Helmet replaces these
  // tags on navigation instead of duplicating them.
  const elements = new Set(
    [...helmet.meta.toComponent(), ...helmet.link.toComponent()].map(el => ({
      type: el.type,
      // The plugin serialises attribute values as strings (e.g. data-rh={true}).
      props: Object.fromEntries(
        Object.entries(el.props)
          .filter(([, value]) => value != null)
          .map(([key, value]) => [key, String(value)])
      ),
    }))
  )

  return { html, head: { lang: 'en', title, elements } }
}
