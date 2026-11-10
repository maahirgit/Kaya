// Single source of truth for the public site address (non-www, see tracker #14).
export const SITE_URL = 'https://kayaforyou.com'

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Business details used for structured data (tracker #20). Same values as
// shown in the site footer; update both together.
export const BUSINESS = {
  name: 'Kaya Kurti',
  legalName: 'Kalash India Fabtex Pvt. Ltd.',
  logo: '/kaya-logo.png',
  telephone: '+91-96011-27234',
  email: 'online.kayakalash@gmail.com',
  address: {
    streetAddress: 'E-48 Ground floor, Safal 3, near New Cloth Market, Sarangpur, Sherkotda',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380002',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/kaya.kurti/',
    'https://www.facebook.com/kaya.kurti/',
  ],
}
