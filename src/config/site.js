// Single source of truth for the public site address (non-www, see tracker #14).
export const SITE_URL = 'https://kayaforyou.com'

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
