const spreadsheetId = '1nR9l5McqXDK90iAeMXOW7ejNyWvEpI8vB8Gc2ecBCJY';
const rangeBoredData = 'BoredApi!A2:G101';
const rangeMediaMediana = 'Calcoli!E5:F9';
const rangeMediaTypePrice = 'Calcoli!E14:F21';
const rangeMediaTypeAccess = 'Calcoli!E25:F32';

function calcolaMediaMediana() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Calcoli');
  sheet.getRange("E5").setValue("Media price");
  //calcola la media del campo price
  var mediaPrice = sheet.getRange("F5");
  mediaPrice.setFormula("=AVERAGE('BoredApi'!D:D)");
  sheet.getRange("E6").setValue("Mediana price");
  //calcola la mediana del campo price
  var medianaPrice = sheet.getRange("F6");
  medianaPrice.setFormula("=MEDIAN('BoredApi'!D:D)");
  sheet.getRange("E7").setValue("Media access");
  //calcola la media del campo access
  var mediaAccess = sheet.getRange("F7");
  mediaAccess.setFormula("=AVERAGE('BoredApi'!G:G)");
  sheet.getRange("E8").setValue("Mediana access");
  //calcola la mediana del campo access
  var medianaAccess = sheet.getRange("F8");
  medianaAccess.setFormula("=MEDIAN('BoredApi'!G:G)");

}

function calcolaMediaRaggruppata() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Calcoli');
  //calcola la media del campo price raggruppata per type
  var mediaPriceRaggruppata = sheet.getRange("E12");
  mediaPriceRaggruppata.setFormula("=QUERY(BoredApi!A1:G51;" + "\"Select avg(D), B group by B\")");
  //calcola la media del campo accessibility raggruppata per type
  var mediaAccRaggruppata = sheet.getRange("E23");
  mediaAccRaggruppata.setFormula("=QUERY(BoredApi!A1:G51;" + "\"Select avg(G), B group by B\")");
}

function calcolaMedianaRaggruppata() {
  /**
   * da svolgere
   */
}

/**
 * funzione che raccoglie i dati dalla sheet da passare al frontend
 */

function getBoredData() {
  ordina();
  try {
    // Get the values from the spreadsheet using spreadsheetId and range.
    const values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeBoredData).values;
    //  Print the values from spreadsheet if values are available.
    if (!values) {
      Logger.log('No data found.');
      return;
    }
    return values;

  } catch (err) {
    // TODO (developer) - Handle Values.get() exception from Sheet API
    Logger.log(err.message);
  }
}

function ordina() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BoredApi");
  const range = sheet.getRange(1, 1, sheet.getLastRow(), 7);
  //ordina sulla prima colonna
  range.sort(1);
}

function getMediaMediana() {
  try {
    // Get the values from the spreadsheet using spreadsheetId and range.
    const values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeMediaMediana).values;
    //  Print the values from spreadsheet if values are available.
    if (!values) {
      Logger.log('No data found.');
      return;
    }
    return values;

  } catch (err) {
    // TODO (developer) - Handle Values.get() exception from Sheet API
    Logger.log(err.message);
  }
}

function getMediaTypePrice() {
  try {
    // Get the values from the spreadsheet using spreadsheetId and range.
    const values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeMediaTypePrice).values;
    //  Print the values from spreadsheet if values are available.
    if (!values) {
      Logger.log('No data found.');
      return;
    }
    return values;

  } catch (err) {
    // TODO (developer) - Handle Values.get() exception from Sheet API
    Logger.log(err.message);
  }
}

function getMediaTypeAccess() {
  try {
    // Get the values from the spreadsheet using spreadsheetId and range.
    const values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeMediaTypeAccess).values;
    //  Print the values from spreadsheet if values are available.
    if (!values) {
      Logger.log('No data found.');
      return;
    }
    return values;

  } catch (err) {
    // TODO (developer) - Handle Values.get() exception from Sheet API
    Logger.log(err.message);
  }
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function fallimento() {
  return "fallimento";
}
