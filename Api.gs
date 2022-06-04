function fetchApi(url) {
  //fa richiesta al api
  var response =
    UrlFetchApp.fetch(url, { 'muteHttpExceptions': true });
  //parsing della risposta e ritorno dell'oggetto json
  var json = response.getContentText();
  var responseObject = JSON.parse(json);
  return responseObject;
}

function createResourceSheet() {
  const url = "http://www.boredapi.com/api/activity";
  var boredData = fetchApi(url)
  var resourceDataList = [];
  for (var i = 0; i < 100; i++) {
    resourceDataList.push(fetchApi(url))
  }
  var resourceObjectKeys = []
  for (var k in boredData) {
    resourceObjectKeys.push(k)
  }

  //crea una sheet col nome dato e diventa la sheet attiva quando creata
  var resourceSheet = createNewSheet(
    "BoredApi");
  //riempie la sheet coi dati della api
  fillSheetWithData(resourceSheet, resourceObjectKeys, resourceDataList);
  //modifica l'intestazione della tabella coi dati
  formatRowHeader();
  //formatta il dataset
  formatDataset();
}

/** 
 * Helper function that creates a sheet or returns an existing
 * sheet with the same name.
 *
 * @param {string} name The name of the sheet.
 * @return {object} The created or existing sheet
 *   of the same name. This sheet becomes active.
 */
function createNewSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Returns an existing sheet if it has the specified
  // name. Activates the sheet before returning.
  var sheet = ss.getSheetByName(name);
  if (sheet) {
    return sheet.activate();
  }

  // Otherwise it makes a sheet, set its name, and returns it.
  // New sheets created this way automatically become the active
  // sheet.
  sheet = ss.insertSheet(name);
  return sheet;
}

/** 
 * Helper function that adds API data to the sheet.
 * Each object key is used as a column header in the new sheet.
 *
 * @param {object} resourceSheet The sheet object being modified.
 * @param {object} objectKeys The list of keys for the resources.
 * @param {object} resourceDataList The list of API
 *   resource objects containing data to add to the sheet.
 */
function fillSheetWithData(
  resourceSheet, objectKeys, resourceDataList) {
  // Set the dimensions of the data range being added to the sheet.
  var numRows = resourceDataList.length;
  var numColumns = objectKeys.length;

  // Get the resource range and associated values array. Add an
  // extra row for the column headers.
  var resourceRange =
    resourceSheet.getRange(1, 1, numRows + 1, numColumns);
  var resourceValues = resourceRange.getValues();

  // Loop over each key value and resource, extracting data to
  // place in the 2D resourceValues array.
  for (var column = 0; column < numColumns; column++) {

    // Set the column header.
    var columnHeader = objectKeys[column];
    resourceValues[0][column] = columnHeader;

    // Read and set each row in this column.
    for (var row = 1; row < numRows + 1; row++) {
      var resource = resourceDataList[row - 1];
      var value = resource[columnHeader];
      resourceValues[row][column] = value;
    }

  }

  // Remove any existing data in the sheet and set the new values.
  resourceSheet.clear()
  resourceRange.setValues(resourceValues);
}
/**
 * Formatta la riga del header
 */

function formatRowHeader() {
  // Get the current active sheet and the top row's range.
  var sheet = SpreadsheetApp.getActiveSheet();
  var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange
    .setFontWeight('bold')
    .setFontColor('white')
    .setBackground('blue')
    .setBorder(
      true, true, true, true, null, null,
      null,
      SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

}

function formatDataset(){

  // Get the current active sheet and the top row's range.
  var sheet = SpreadsheetApp.getActiveSheet();
  var fullDataRange = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn());
   // Set a border around all the data, and resize the
  // columns and rows to fit.
  fullDataRange.setBorder(
    true, true, true, true, null, null,
    null,
    SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

    if (! fullDataRange.getBandings()[0]) {
    // The range doesn't already have banding, so it's
    // safe to apply it.
    fullDataRange.applyRowBanding(
      SpreadsheetApp.BandingTheme.LIGHT_GREY,
      false, false);
  }

  sheet.autoResizeColumns(1, fullDataRange.getNumColumns());
  sheet.autoResizeRows(1, fullDataRange.getNumRows());
}

