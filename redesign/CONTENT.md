# VibeFund — content audit (2026-10-26)

What the site was before this redesign: deploy `4ececa54` at https://vibefund.commandagi.app, a static folder of seven
files (`index.html`, `es/index.html`, `zh/index.html`, `app.js`, `style.css`, `mark.svg`), 77 KB. Its source was not
in any repository; the first commit of this repository is that deploy, copied from the live site.

## routes

| route | what it is |
|---|---|
| `/` | English landing page and the trading demo |
| `/es/` | the same page in Spanish |
| `/zh/` | the same page in Simplified Chinese |

No server module, no form that posts, no auth link. The only outbound link is `mailto:hello@vibefund.pro`.

## working features (all kept)

1. **Market table**: twelve vibe-family companies, sample prices, 24h change, volume, 7-day sparkline; search and sort.
2. **Trade ticket**: shares, Max, estimated cost, 0.20% fee, total, Buy and Sell against $25,000 of demo cash.
3. **Account**: cash, positions value, account value, positions table with average cost and open P&L, Reset.
   Kept in `localStorage` (`vibefund-demo`).
4. **Raise calculator**: raise, pre-money, shares outstanding → price per share, new shares, post-money, equity kept,
   dilution.
5. **Questions**: five answers (is it real, who can invest, custody, cost, how to list).
6. **Languages**: en, es, zh-Hans pages and a language dialog (invoker commands with a script fallback).
7. **Ticker strip**: sample quotes.

## added by the redesign

- **The order book of Halvard Ropeworks** (HALV), a fictional company: an ask/bid ladder, a limit bid that walks the
  asks and rests the rest, a fills tape, fees and totals, and the cap table that changes as the bid fills. The bid
  uses the account's demo cash, and HALV appears in the account.
- **A risk disclosure** as its own section, marked "draft, pending legal review".
- **After hours**: a night palette, chosen by the visitor (saved) or by the system's dark mode.

## claims and how they are labelled

| claim | status | where it is labelled |
|---|---|---|
| prices, volumes, charts of the twelve | sample data in `app.js` | market lead, ticket note, footer |
| Halvard Ropeworks, its book and holders | fictional | its title tag, the hero quote, the note under the book, risk item III |
| settlement in USDC the same day, 24/7 | the product's design, not live | "the market we are building … Tonight it is a demo" |
| custody, accredited investors, 0.20% fee | plans the owner confirms before launch | the questions, risk item V |
| films and plates | generated media | footer line |

There are no testimonials, logos, user counts, press, returns or uptime claims, before or after.
