# Backend setup (one time, ~5 minutes)

This connects the shop to a Google Sheet so orders sync across devices and never get lost.

## 1. Make the Sheet
1. Go to [sheets.new](https://sheets.new) (signed in as **roberto.gavaldon3@gmail.com**).
2. Name it something like **Chess Club Shop Orders**. Leave it otherwise empty — the script builds the columns itself.

## 2. Add the script
1. In that Sheet: **Extensions → Apps Script**.
2. Delete whatever's in `Code.gs`, then paste the entire contents of [`Code.gs`](Code.gs) from this folder.
3. Save (💾).

## 3. Set your admin password
1. In Apps Script, click the ⚙ **Project Settings** (left sidebar).
2. Scroll to **Script Properties → Add script property**.
3. Property = `ADMIN_TOKEN`, Value = a password you pick (e.g. `chessknight915`). Save.
   - This is what protects your queue. Anyone without it can only submit quote requests, never see or change orders.

## 4. Deploy as a Web App
1. Top right: **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Set:
   - **Execute as:** Me (your account)
   - **Who has access:** **Anyone**  ← required so the website can reach it
4. **Deploy.** Approve the permissions prompt (it's your own script touching your own Sheet — the "unsafe" warning is normal for personal scripts; click Advanced → Go to project → Allow).
5. Copy the **Web app URL** (ends in `/exec`).

## 5. Plug it into the site
1. Open [`catalog.js`](../catalog.js), set:
   ```js
   const BACKEND_URL = "https://script.google.com/macros/s/AKfy.../exec";
   ```
2. Open the shop's **admin page → ⚙ Settings**, paste your `ADMIN_TOKEN` password into the **Admin password** box, Save.
3. Commit + push. Done — orders now sync to the Sheet.

## If you ever change `Code.gs`
Re-deploy: **Deploy → Manage deployments → (edit ✏) → Version: New version → Deploy.** The URL stays the same.

## Notes
- Students' custom-request form writes `quote` rows with no password — worst case is spam quote tickets, never access to real orders.
- The site is **local-first**: if the Sheet is briefly unreachable (school Wi-Fi), you can still take orders — they queue on the device and sync automatically once you're back online.
