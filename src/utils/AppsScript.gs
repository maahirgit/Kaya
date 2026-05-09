const SPREADSHEET_ID = '1EjiGDeBKq8rqp6WV3J4FdeqreLjOaalNKNLyy4l5Og8'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID)
    const sheet = ss.getActiveSheet()

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Source', 'Name', 'Email', 'Phone', 'Message', 'Product', 'Business Card'])
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold')
    }

    let cardCell = ''
    if (data.businessCardUrl) {
      cardCell = `=HYPERLINK("${data.businessCardUrl}","View Business Card")`
    }

    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.source  || '',
      data.name    || '',
      data.email   || '',
      data.phone   || '',
      data.message || '',
      data.product || '',
      cardCell
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function testPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        source: 'Test',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        message: 'Test message',
        product: 'Sample Product',
        businessCardUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
      })
    }
  }
  const result = doPost(fakeEvent)
  Logger.log(result.getContent())
}
