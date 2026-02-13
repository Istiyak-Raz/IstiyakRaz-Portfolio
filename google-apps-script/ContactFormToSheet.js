/**
 * Google Apps Script – Contact Form to Sheet
 * 
 * Setup:
 * 1. Create a new Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this code, save
 * 4. Run doPost once (will prompt for permissions)
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web app URL
 * 7. Add to your .env: VITE_GOOGLE_SHEETS_WEB_APP_URL="https://script.google.com/macros/s/..."
 */

function doPost(e) {
  try {
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date", "Name", "Email", "Message"]);
    }
    
    sheet.appendRow([
      new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.message || ""
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
