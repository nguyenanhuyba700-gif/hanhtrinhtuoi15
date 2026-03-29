# Google Apps Script setup

## 1. Create the target Google Sheet

- Create a Google Sheet.
- Create a sheet tab named `Messages`.
- Add these headers in row 1:

`created_at | nickname | message | page | submitted_at | user_agent`

## 2. Add the Apps Script

- Open the Google Sheet.
- Go to `Extensions` -> `Apps Script`.
- Replace the default script with the contents of [`Code.gs`](./Code.gs).
- In `Code.gs`, replace:

`PUT_YOUR_SPREADSHEET_ID_HERE`

with your Google Sheet ID.

## 3. Deploy as Web App

- Click `Deploy` -> `New deployment`.
- Select type: `Web app`.
- Execute as: `Me`.
- Who has access: `Anyone`.
- Deploy and copy the Web App URL.

## 4. Connect it to the website

- Open [`script.js`](../script.js).
- Find:

`const GOOGLE_SHEETS_ENDPOINT = "";`

- Replace the empty string with your Web App URL.

Example:

```js
const GOOGLE_SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

## Notes

- If you update `Code.gs`, redeploy the Web App and use the latest URL/version.
- The current form sends: nickname, message, page, submitted_at, and user_agent.
