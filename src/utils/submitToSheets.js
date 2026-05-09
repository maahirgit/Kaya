const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfY5llLB9FhQDYPZcSzOnGth-bsoIaziPvF--FUqxhfjtZmEnEnNINtZETOJ0RN_IQMw/exec'

export async function submitToSheets(data) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    })
    const text = await response.text()
    try {
      const result = JSON.parse(text)
      if (result.success !== true) {
        console.error('[Sheets] Apps Script returned an error:', result.error)
      } else {
        console.log('[Sheets] Success!')
      }
      return result.success === true
    } catch (parseErr) {
      console.error('[Sheets] Failed to parse response as JSON. Raw response:', text)
      return false
    }
  } catch (err) {
    console.error('[Sheets] Network or fetch error:', err)
    return false
  }
}
