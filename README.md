# VibeFund — the site

https://vibefund.commandagi.app · a company of CommandAGI. A static folder: the host serves it as it is.

- `index.html`, `es/`, `zh/` are written by `node redesign/pages.mjs` (one template, three languages).
- `app.js` is the demo: the market, the ticket, the account, the raise and Halvard Ropeworks' order book (all sample
  data, in the browser).
- `redesign/` holds the audit (`CONTENT.md`), the design (`DESIGN.md`), the media log (`NOTES.md`), the fal script
  (`media.mjs`) and the screenshot check (`shoot.py`).
- Deploy: `commandagi sites deploy . --prod`.
