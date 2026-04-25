
const imgs = (folder, count) =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return `/assets/collections/${folder}/${n}.jpg`
  })

export const collections = [
  {
    id: 'abhinetri',
    name: 'Abhinetri',
    tagline: 'Grace in every step',
    cover: '/assets/collections/ABHINETRI-KAYA/01.jpg',
    images: imgs('ABHINETRI-KAYA', 11),
  },
  {
    id: 'aditi',
    name: 'Aditi',
    tagline: 'Timeless, effortless charm',
    cover: '/assets/collections/ADITI-KAYA/01.jpg',
    images: imgs('ADITI-KAYA', 11),
  },
  {
    id: 'amisha-4',
    name: 'Amisha',
    tagline: 'Soft hues, bold presence',
    cover: '/assets/collections/AMISHA-4-KAYA/01.jpg',
    images: imgs('AMISHA-4-KAYA', 11),
  },
  {
    id: 'basera',
    name: 'Basera',
    tagline: 'Where comfort meets style',
    cover: '/assets/collections/BASERA-KAYA/01.jpg',
    images: imgs('BASERA-KAYA', 11),
  },
  {
    id: 'bhoomika',
    name: 'Bhoomika',
    tagline: 'Rooted in elegance',
    cover: '/assets/collections/BHOOMIKA-KAYA/01.jpg',
    images: imgs('BHOOMIKA-KAYA', 11),
  },
  {
    id: 'gulzar',
    name: 'Gulzar',
    tagline: 'Floral whispers, modern silhouette',
    cover: '/assets/collections/GULZAR-KAYA/01.jpg',
    images: imgs('GULZAR-KAYA', 11),
  },
  {
    id: 'jivika',
    name: 'Jivika',
    tagline: 'Lively strokes of fashion',
    cover: '/assets/collections/JIVIKA-KAYA/01.jpg',
    images: imgs('JIVIKA-KAYA', 11),
  },
  {
    id: 'kriva',
    name: 'Kriva',
    tagline: 'Sharp lines, soft touch',
    cover: '/assets/collections/KRIVA-KAYA/01.jpg',
    images: imgs('KRIVA-KAYA', 11),
  },
  {
    id: 'leelavati-3',
    name: 'Leelavati',
    tagline: 'Heritage woven into every thread',
    cover: '/assets/collections/LEELAVATI-3-KAYA/01.jpg',
    images: imgs('LEELAVATI-3-KAYA', 11),
  },
  {
    id: 'limca',
    name: 'Limca',
    tagline: 'Refreshingly contemporary',
    cover: '/assets/collections/LIMCA-KAYA/01.jpg',
    images: imgs('LIMCA-KAYA', 12),
  },
  {
    id: '108-gopika',
    name: 'Gopika',
    tagline: 'Pure joy, pure style',
    cover: '/assets/collections/108-GOPIKA/01.jpg',
    images: imgs('108-GOPIKA', 11),
  },
  {
    id: '113-monika',
    name: 'Monika',
    tagline: 'Sophistication redefined',
    cover: '/assets/collections/113-MONIKA/01.jpg',
    images: imgs('113-MONIKA', 11),
  },
]

