// ============================================================
// store.js — shared data layer for Chess Club Shop
// Local-first: every read/write hits localStorage, so the app is
// instant and works offline. If BACKEND_URL (catalog.js) is set,
// it ALSO syncs to your Google Sheet:
//   • on load: flush anything queued offline, then pull the latest
//   • on save: write locally + queue an upsert, push in background
// Upserts are keyed by ticket id and idempotent, so retries are safe.
// ============================================================
const Store = (function(){
  const LS_T = "ccshop_tickets", LS_S = "ccshop_settings",
        LS_TOKEN = "ccshop_admin_token", LS_PENDING = "ccshop_pending";
  const URL = (typeof BACKEND_URL !== "undefined" && BACKEND_URL) ? BACKEND_URL : "";
  const listeners = [];

  const readArr = k => { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch { return []; } };
  const readObj = k => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } };
  const write   = (k,v) => localStorage.setItem(k, JSON.stringify(v));

  let tickets  = readArr(LS_T);
  let pending  = readArr(LS_PENDING);
  let settings = Object.assign({ weekdayMin:120, weekendMin:300 }, readObj(LS_S) || {});
  let lastSync = null, lastError = null;

  const persist = () => { write(LS_T, tickets); write(LS_PENDING, pending); };
  const notify  = () => listeners.forEach(f => { try { f(); } catch(e){ console.error(e); } });

  const token    = () => localStorage.getItem(LS_TOKEN) || "";
  const setToken = t => localStorage.setItem(LS_TOKEN, t || "");

  const ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const newId = () => {
    let id; do { id = Array.from({length:6}, () => ABC[Math.floor(Math.random()*ABC.length)]).join(""); }
    while (tickets.some(t => t.id === id)); return id;
  };

  function normalize(r){
    return {
      id:r.id, status:r.status || "pending", name:r.name || "", period:r.period || "",
      itemCode:r.itemCode || "", itemLabel:r.itemLabel || "",
      price:+r.price || 0, minutes:+r.minutes || 0,
      colors: Array.isArray(r.colors) ? r.colors
             : (r.colors ? String(r.colors).split("|").filter(Boolean) : []),
      notes:r.notes || "", source:r.source || "",
      createdAt:+r.createdAt || Date.now(), updatedAt:+r.updatedAt || Date.now(),
    };
  }
  function upsertLocal(o){
    const i = tickets.findIndex(t => t.id === o.id);
    if (i >= 0) tickets[i] = Object.assign({}, tickets[i], o);
    else tickets.push(o);
  }
  function enqueue(order){          // one pending op per id (latest wins)
    pending = pending.filter(p => p.order.id !== order.id);
    pending.push({ order, ts: Date.now() });
  }

  async function post(action, order){
    // text/plain avoids a CORS preflight Apps Script can't answer
    const res = await fetch(URL, {
      method:"POST",
      headers:{ "Content-Type":"text/plain;charset=utf-8" },
      body: JSON.stringify({ action, token: token(), order }),
    });
    return res.json();
  }
  async function flush(){
    if (!URL || !pending.length) return;
    const still = [];
    for (const p of pending){
      try { const r = await post("upsert", p.order); if (r && r.ok === false) still.push(p); }
      catch { still.push(p); }
    }
    pending = still; persist();
  }
  async function pull(){
    if (!URL) return;
    const sep = URL.includes("?") ? "&" : "?";
    const res = await fetch(URL + sep + "action=list&token=" + encodeURIComponent(token()));
    const data = await res.json();
    if (!data || !Array.isArray(data.orders)) throw new Error(data && data.error || "bad list response");
    const pend = new Set(pending.map(p => p.order.id));
    const byId = {}; tickets.forEach(t => byId[t.id] = t);
    data.orders.forEach(r => {
      if (pend.has(r.id)) return;                       // keep our unsynced version
      const local = byId[r.id];
      if (!local || (+r.updatedAt || 0) >= (local.updatedAt || 0)) byId[r.id] = normalize(r);
    });
    pending.forEach(p => { byId[p.order.id] = byId[p.order.id] || p.order; });
    tickets = Object.values(byId);
    persist();
  }

  return {
    url: URL,
    hasBackend: () => !!URL,
    token, setToken, newId,
    getTickets:  () => tickets.slice(),
    getSettings: () => Object.assign({}, settings),
    status: () => ({ backend: !!URL, pending: pending.length, lastSync, lastError }),
    onChange(fn){ listeners.push(fn); },

    saveSettings(s){ settings = Object.assign(settings, s); write(LS_S, settings); notify(); },

    // create OR update a ticket (admin)
    async save(order){
      order.updatedAt = Date.now();
      if (!order.createdAt) order.createdAt = Date.now();
      if (!order.id) order.id = newId();
      upsertLocal(order); enqueue(order); persist(); notify();
      if (URL) this.sync();
      return order;
    },

    // student custom-request → lands as a "quote" ticket in the queue
    async requestQuote(order){
      order = normalize(Object.assign({ id: newId(), status:"quote", source:"student" }, order));
      if (URL){
        try { const r = await post("quote", order); return r && r.ok !== false; }
        catch { return false; }
      }
      return false;   // no backend → caller falls back to email
    },

    async init(){ notify(); if (URL) await this.sync(); },
    async sync(){
      if (!URL) return;
      try { await flush(); await pull(); lastSync = Date.now(); lastError = null; }
      catch (e){ lastError = String(e.message || e); }
      notify();
    },

    replaceAll(list, s){
      tickets = (list || []).map(normalize);
      if (s){ settings = Object.assign(settings, s); write(LS_S, settings); }
      persist(); notify();
      if (URL) this.sync();
    },
    exportBlob(){ return { tickets, settings }; },
  };
})();
