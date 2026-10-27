# VibeFund — the design (2027)

*Written as the studio: a financial-print and private-bank designer. Brief: docs/design/startup-redesign-2027.md §4,
CommandAGI.*

## concept

Private-bank restraint meets an exchange's precision. The page is printed matter that trades: a share certificate's
engraving, a prospectus's rules and numerals, and a terminal's function keys. It is the densest site of the set. The
product is shown working on a company that does not exist — Halvard Ropeworks — so nothing has to be pretended.

## type

| role | face | use |
|---|---|---|
| display | **Gloock** (one weight; its contrast does the work) | titles, company names, the mid price, numerals of the folios |
| text | **Mona Sans** variable, width 96% for text, 108–115% for small caps labels | everything read |
| figures | **Spline Sans Mono** variable, tabular, slashed zero | every number |

Scale: titles from `clamp()` (hero up to 9.25 rem, folio titles up to 4 rem); text 1 rem, labels .66–.72 rem in
spaced capitals. `text-wrap: balance` on headings, `pretty` on paragraphs. Fonts self-hosted (latin subset, 160 KB
for all three), metric-matched local fallbacks. Chinese uses the system's CJK sans; its hero is set smaller.

## colour (sRGB fallback, then OKLCH)

| token | value | contrast on paper |
|---|---|---|
| paper | #f4eedd · oklch(95.1% .027 88) | — |
| ink (bottle green) | #102b25 | 13.0 |
| ink-2 | #3c524b | 7.25 (6.56 on paper-2) |
| brass | #c5aa75 — **rules only**, and text only on ink (6.73) | — |
| up ▲ | #1d6b3c | 5.63 |
| down ▼ | #a33a2a | 5.67 |
| you (the visitor's own) | #7a5a20 | 5.47 (4.95 on paper-2) |

After hours (night): paper #0c1f1b, ink #efe7d2 (13.9), ink-2 8.2, up 9.5, down 7.7, you 10.1. Direction is never
colour alone: ▲ and ▼ carry it.

## the house language

- **The scotch rule** (3 px over 1 px, brass) opens every section, with a roman folio numeral.
- **Zero radius.** Buttons are a *deed* (ink, framed twice by an inset brass hairline) or a *line* (ruled above and
  below). No shadow anywhere.
- **Navigation is a function-key bar docked at the foot**: F1–F6 (keyboard F-keys work too), the sample tape, After
  hours, language. No top nav.
- Tables are newspaper stock tables: hairlines, tabular figures, no zebra.

## layout

- **1440 / 2560**: hero is a full viewport of the engraved film with the title set over its foot, a quote board and
  two buttons at the right. The book is three columns between rules: ladder · bid · cap table, the engraving as a
  certificate vignette beside the head.
- **768**: the book is two over one; market and ticket stack; the bar loses the tape.
- **390**: one column; the quote board 3-up; buttons full width; the bar shows the six keys (scroll-snapped), ◐, A/文.
- **320**: the flag hides (the quote and the lead still say "fictional" and "sample"); the market's trade buttons
  shrink; nothing scrolls sideways (checked).

## motion

| motion | explains | reduced motion |
|---|---|---|
| the engraved film, the night film | material, then time of day | posters, no play; a Pause button on each |
| bid walks the asks, a fill every 420 ms; the taken level flashes brass once | the sequence of a fill | all at once |
| depth bars and cap-table segments ease to their width | a size change | jump |
| the visitor's cap-table row inks in | ownership changed | none |
| folio titles, ladder rows, steps and risks settle in (`animation-timeline: view()`) | reading order | none |
| the hero title lifts as the page scrolls (`scroll(root)`) | leaving the cover | none |
| light ↔ after hours by View Transition | a state change | instant |

Nothing flashes more than once.

## media plan (fal; log in NOTES.md)

Engraved guilloché plate (hero loop), a rope-and-quay copper engraving (the fictional company's certificate vignette),
a green-lamp ledger stack (after-hours loop), brass discs (settlement plate). Art direction: macro, shallow focus,
film grain, warm cream and bottle green, slow. No people, no text, no logos (two first takes had invented lettering
and were redone). Loops are made palindromic (no seam), 1280 px, AV1 + H.264.

## signature moment

Place a sample bid of 1,500 at 14.70: three asks fill (420 @ 14.64, 310 @ 14.66, 640 @ 14.69), 130 rest at your limit
with a ◆, the fee and total resolve, the public float shrinks, and "You" appears in Halvard's cap table at 0.02%.

## don'ts

No gradient text, no blobs, no rounded cards, no icons in squares, no tilted screenshots, no "supercharge". Brass is
never body text on paper. No real company's name on the book.

## self-review (screenshots in `redesign/.shots/`)

| criterion | score |
|---|---|
| art direction | 8 |
| brand specificity | 9 |
| product expression | 9 |
| interaction | 8 |
| technical quality | 8 |
| craft | 8 |
| **average** | **8.3** |
