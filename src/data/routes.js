// URL helpers for collection and combo pages (tracker #4.1, #17, #18).
// Photo numbers in URLs are 1-based: /collection/abhinetri/3 is the third photo.

export const COLLECTIONS_PATH = '/collection'
export const COMBOS_PATH = '/collection/combos'

export const collectionPath = (id) => `${COLLECTIONS_PATH}/${id}`
export const comboPath = (id) => `${COMBOS_PATH}/${id}`
export const photoPath = (basePath, photoNumber) => `${basePath}/${photoNumber}`

// Alt text for a photo. Set `alts` on a collection/combo (one entry per image,
// same order as `images`) to override the generated fallback (tracker #4).
export const photoAlt = (item, index) =>
  item.alts?.[index] || `${item.name} kurti set by Kaya, photo ${index + 1} of ${item.images.length}`
