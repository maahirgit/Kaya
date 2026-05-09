const CLOUD_NAME = 'dnxi91lbv'
const UPLOAD_PRESET = 'kaya_business_cards'

export async function uploadToCloudinary(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('folder', 'kaya/business-cards')

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    )

    if (!response.ok) {
      const err = await response.json()
      console.error('[Cloudinary] Upload failed:', err)
      return null
    }

    const result = await response.json()
    console.log('[Cloudinary] Uploaded:', result.secure_url)
    return result.secure_url
  } catch (err) {
    console.error('[Cloudinary] Network error:', err)
    return null
  }
}
