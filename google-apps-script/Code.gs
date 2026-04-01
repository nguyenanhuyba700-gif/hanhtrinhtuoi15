function doPost(e) {
  try {
    var config = getConfig_();
    var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
    var sheet =
      spreadsheet.getSheetByName(config.sheetName) || spreadsheet.getSheets()[0];

    if (!sheet) {
      throw new Error("No sheet tab available in spreadsheet.");
    }

    var payload = parsePayload_(e);
    var now = new Date();

    sheet.appendRow([
      now,
      payload.nickname || "",
      payload.message || "",
      payload.page || "",
      payload.submitted_at || "",
      payload.user_agent || "",
    ]);

    return jsonResponse_({
      ok: true,
      message: "Saved successfully.",
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error.message,
    });
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    message: "Apps Script endpoint is running.",
  });
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    if (!e || !e.parameter) {
      throw new Error("Missing request body.");
    }

    return normalizePayload_(e.parameter);
  }

  var contentType = String(e.postData.type || "");

  if (contentType.indexOf("application/json") !== -1) {
    return normalizePayload_(JSON.parse(e.postData.contents));
  }

  return normalizePayload_(e.parameter);
}

function normalizePayload_(data) {
  return {
    nickname: String(data.nickname || "").trim(),
    message: String(data.message || "").trim(),
    page: String(data.page || "").trim(),
    submitted_at: String(data.submitted_at || "").trim(),
    user_agent: String(data.user_agent || "").trim()
  };
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getConfig_() {
  return {
    spreadsheetId: "PUT_YOUR_SPREADSHEET_ID_HERE",
    sheetName: "Sheet1",
  };
}
