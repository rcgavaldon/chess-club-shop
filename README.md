# ♞ Chess Club Shop

3D-print storefront for school. Live at **https://rcgavaldon.github.io/chess-club-shop/**

| Page | Who uses it | What it does |
|---|---|---|
| [index.html](index.html) | Students | Catalog with item codes, colors, custom-quote request, rules |
| [admin.html](admin.html) | You only | Production queue, ticket entry, ETA math (data lives in your phone's localStorage) |
| [cards.html](cards.html) | You | Prints 10-up QR order cards — scan a card to open its ticket pre-loaded |
| [flyer.html](flyer.html) | You | Printable letter flyer with QR to the catalog |

## Daily flow
1. Kid picks an item code (or brings a custom link).
2. Fill out an order card together, scan its QR → admin opens with the ticket # pre-loaded → type name/item/colors → Save.
3. At home, open **admin** → Queue tab shows what to print and the estimated ready date for each job.
4. Advance tickets: Pending → Printing → Done → Picked Up + Paid.

## Updating the catalog / colors
Everything lives in [catalog.js](catalog.js) — items, colors, pricing, rules, contact email. Edit and push (or ask Claude). Item images go in `img/` (e.g. `img/2-a.jpg`) and are referenced from each item's `image` field.

## Notes
- Admin data is **localStorage on whatever device you use** — use one device (your phone) and hit **Export** now and then for a backup.
- ETA settings (print minutes per school night / weekend day) are under ⚙ Settings in admin. Defaults: 120 / 300.
- QR cards point at the admin page; on anyone else's phone it just shows an empty queue — nothing to leak.
- Custom quote formula: ceil(hours) × $4 + $1 setup, min $3; jobs over 4 h at $5/h.
