/**
 * Chess Club Shop — Google Sheet backend
 * Deploy as a Web App (see DEPLOY.md). Stores one row per order.
 *
 * Actions:
 *   GET  ?action=list&token=... -> { orders: [...] }   (admin, needs token)
 *   POST { action:"upsert", token, order }             (admin, needs token)
 *   POST { action:"quote",  order }                    (student, no token; forced status=quote)
 */

var SHEET_NAME = "Orders";
var HEADERS = ["id","status","name","period","itemCode","itemLabel",
               "price","minutes","colors","notes","source","createdAt","updatedAt"];

function getAdminToken_() {
  return PropertiesService.getScriptProperties().getProperty("ADMIN_TOKEN") || "";
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function readAll_() {
  var sh = sheet_();
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  var head = values[0];
  return values.slice(1).filter(function(r){ return r[0] !== ""; }).map(function(row){
    var o = {};
    head.forEach(function(h, i){ o[h] = row[i]; });
    o.price = Number(o.price) || 0;
    o.minutes = Number(o.minutes) || 0;
    o.createdAt = Number(o.createdAt) || 0;
    o.updatedAt = Number(o.updatedAt) || 0;
    o.colors = o.colors ? String(o.colors).split("|").filter(Boolean) : [];
    return o;
  });
}

function upsert_(order) {
  if (!order || !order.id) return { ok:false, error:"missing id" };
  var sh = sheet_();
  var ids = sh.getRange(2, 1, Math.max(sh.getLastRow()-1,1), 1).getValues().map(function(r){ return r[0]; });
  var rowIndex = ids.indexOf(order.id);          // 0-based within data
  var colors = Array.isArray(order.colors) ? order.colors.join("|") : (order.colors || "");
  var rowObj = {
    id: order.id,
    status: order.status || "pending",
    name: order.name || "",
    period: order.period || "",
    itemCode: order.itemCode || "",
    itemLabel: order.itemLabel || "",
    price: Number(order.price) || 0,
    minutes: Number(order.minutes) || 0,
    colors: colors,
    notes: order.notes || "",
    source: order.source || "",
    createdAt: Number(order.createdAt) || Date.now(),
    updatedAt: Number(order.updatedAt) || Date.now(),
  };
  var row = HEADERS.map(function(h){ return rowObj[h]; });
  if (rowIndex >= 0) sh.getRange(rowIndex + 2, 1, 1, HEADERS.length).setValues([row]);
  else sh.appendRow(row);
  return { ok:true, id: order.id };
}

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action === "list") {
    if ((e.parameter.token || "") !== getAdminToken_()) return json_({ ok:false, error:"unauthorized" });
    return json_({ ok:true, orders: readAll_() });
  }
  return json_({ ok:true, msg:"Chess Club Shop backend is running." });
}

function doPost(e) {
  var body;
  try { body = JSON.parse(e.postData.contents); }
  catch (err) { return json_({ ok:false, error:"bad json" }); }

  if (body.action === "quote") {
    var q = body.order || {};
    q.status = "quote";                 // students can only create quote requests
    q.source = "student";
    q.price = 0;
    return json_(upsert_(q));
  }
  if (body.action === "upsert") {
    if ((body.token || "") !== getAdminToken_()) return json_({ ok:false, error:"unauthorized" });
    return json_(upsert_(body.order || {}));
  }
  return json_({ ok:false, error:"unknown action" });
}
