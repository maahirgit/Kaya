// GA4 (tracker #5, #6) and Meta Pixel (tracker #8).
// Every function is a no-op until the matching ID is set in
// src/config/analytics.js, and during build-time prerendering.
import { GA4_MEASUREMENT_ID, META_PIXEL_ID } from '../config/analytics'

const inBrowser = typeof window !== 'undefined'
let started = false

export function initAnalytics() {
  if (!inBrowser || started) return
  started = true

  if (GA4_MEASUREMENT_ID) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
    document.head.appendChild(script)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    // Page views are sent by trackPageView on every route change instead,
    // because the site changes pages without reloading.
    window.gtag('config', GA4_MEASUREMENT_ID, { send_page_view: false })
  }

  if (META_PIXEL_ID) {
    // Standard Meta Pixel loader.
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', META_PIXEL_ID)
  }

  // WhatsApp, phone and email clicks, wherever those links are on the site.
  document.addEventListener('click', (e) => {
    const link = e.target.closest?.('a[href]')
    if (!link) return
    const href = link.getAttribute('href')
    if (href.startsWith('https://wa.me/') || href.startsWith('https://api.whatsapp.com/')) {
      trackEvent('whatsapp_click', { link_url: href, page_path: window.location.pathname })
    } else if (href.startsWith('tel:')) {
      trackEvent('phone_click', { link_url: href, page_path: window.location.pathname })
    } else if (href.startsWith('mailto:')) {
      trackEvent('email_click', { link_url: href, page_path: window.location.pathname })
    }
  })
}

export function trackPageView(path) {
  if (!inBrowser) return
  if (GA4_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    })
  }
  if (META_PIXEL_ID && window.fbq) window.fbq('track', 'PageView')
}

// Event names (tracker #6). In GA4, mark whatsapp_click and the *_submit
// events as key events (Admin > Events). The same names are sent to the
// Meta Pixel as custom events (tracker #8).
export function trackEvent(name, params = {}) {
  if (!inBrowser) return
  if (GA4_MEASUREMENT_ID && window.gtag) window.gtag('event', name, params)
  if (META_PIXEL_ID && window.fbq) window.fbq('trackCustom', name, params)
}
