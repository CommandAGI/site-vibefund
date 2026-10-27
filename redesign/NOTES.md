# VibeFund — build notes

## generated media (fal, 2026-10-26)

Script: `redesign/media.mjs` (`stills`, `loops`, `encode`). The key is read from the `.env` cascade at
`COMMANDAGI_ENV_ROOT` by the script; it never reaches the page. Raw outputs and the call log stay in `redesign/.raw/`
(not committed, not served).

| asset | model | price | calls | cost |
|---|---|---|---|---|
| plate (guilloché still) | fal-ai/flux-pro/v1.1-ultra | $0.06 / image | 1 | $0.06 |
| rope (engraving) | fal-ai/flux-pro/v1.1-ultra | $0.06 / image | 2 (first had lettering on a winch) | $0.12 |
| night (ledgers, lamp) | fal-ai/flux-pro/v1.1-ultra | $0.06 / image | 3 (two had invented text, one a fake bank name) | $0.18 |
| wheels → brass discs | fal-ai/flux-pro/v1.1-ultra | $0.06 / image | 2 (first had invented lettering) | $0.12 |
| plate loop (5 s) | fal-ai/kling-video/v2.5-turbo/pro/image-to-video | $0.07 / s | 1 | $0.35 |
| night loop (5 s) | fal-ai/kling-video/v2.5-turbo/pro/image-to-video | $0.07 / s | 1 | $0.35 |
| **total** | | | | **$1.18** of $15 |

Prices from fal's pricing API on the day. The prompts are `STILLS` and `LOOPS` in `redesign/media.mjs`; the ones used
are the ones in the file.

Encodes: palindromic loops (forward + reversed, 10 s), 1280 px, 24 fps; AV1 (libaom, crf 40) and H.264 (crf 30,
faststart); WebP posters and plates. Plate loop 392 KB AV1 / 599 KB H.264; night loop 199 KB / 361 KB. The whole
served site is 2.3 MB.

## other assets

- `wordmark.svg`: Gloock outlines (fontTools) with our own kerning (V-i −60, e-F −30, F-u −55), a brass rule under
  "Fund". `mark.svg` (favicon) and `touch-icon.png`: a V in a double brass frame. `og.jpg`: `redesign/og.html`
  rendered at 1200×630.
- Pages: `node redesign/pages.mjs` writes `/`, `/es/`, `/zh/` from one template and one table of words.

## checks

`python redesign/shoot.py [url]` (Playwright): screenshots at 1440, 768, 390, 320, es and zh at 390, reduced motion at
1440 and 390, each section in the viewport; fails on a console error, a failed request, a sideways scroll, a film that
plays under reduced motion, or a bid of 1,500 @ 14.70 that does not fill 1,370, rest 130 and show 1,370 HALV in both
the cap table and the statement; it also switches to after hours from the bar.

## for the owner

- The risk disclosure is a draft and says so; it needs legal review before a real market opens.

## measured live (2026-10-26, https://vibefund.commandagi.app, this machine's Chromium)

- `python redesign/perf.py` (throttled 4G: 150 ms RTT, 1.6 Mbit/s; 4x CPU; cold cache): **390 px LCP 1.47 s, CLS
  0.001; 1440 px LCP 1.51 s, CLS 0.003.** A second run, which also measures INP over the visitor's own steps (language
  dialog, sort, pick a row, type, buy, place a sample bid): **390 px LCP 1.08 s, CLS 0.001, INP 48 ms; 1440 px LCP
  1.18 s, CLS 0.003, INP 64 ms.** Budget: LCP < 2.5 s, CLS < 0.1, INP < 200 ms. Script before interaction: `app.js`,
  31 KB.
- `python redesign/shoot.py https://vibefund.commandagi.app/`: the first run passed every check (the bid fills 1,370,
  130 rest, the cap table and the statement show HALV, after hours works) except one aborted film request when this
  machine's network changed (`ERR_NETWORK_CHANGED`); a second run met the same network change on the es page. The
  same script passes clean on the same files served locally.
- Every route and asset answers 200 live (`/`, `/es/`, `/zh/`, `style.css`, `app.js`, the films, `og.jpg`).
