function doPost(e) {
  try {
    var config = getConfig_();
    var sheet = SpreadsheetApp.openById(config.spreadsheetId).getSheetByName(
      config.sheetName
    );

    if (!sheet) {
      throw new Error("Sheet not found: " + config.sheetName);
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
    throw new Error("Missing request body.");
  }

  var data = JSON.parse(e.postData.contents);

  return {
    nickname: String(data.nickname || "").trim(),
    message: String(data.message || "").trim(),
    page: String(data.page || "").trim(),
    submitted_at: String(data.submitted_at || "").trim(),
    user_agent: String(data.user_agent || "").trim(),
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
    sheetName: "Messages",
  };
}
