/**
 * vibeFund's market demo.
 *
 * The startups, their prices and their charts are sample data written into this file: no exchange, no quote feed.
 * A trade moves numbers in this browser's localStorage and nowhere else: the page sends nothing to anyone but the
 * hosting provider's visit count.
 * Every locale's page carries this one file; the page's `lang` picks the words. Halvard Ropeworks (HALV), the
 * order book's company, is fictional: its book and cap table are written here too.
 */
'use strict';

const STARTUPS = [
    { ticker: 'VCAD', name: 'vibeCAD', blurb: 'Parametric CAD that an agent can draw', price: 41.20, shares: 12_400_000, volume: 2_140_000 },
    { ticker: 'VCUT', name: 'vibeCut', blurb: 'Video editing on the timeline, by chat', price: 28.75, shares: 9_800_000, volume: 1_460_000 },
    { ticker: 'VFRC', name: 'vibeForce', blurb: 'Robots that do the work people ask for', price: 63.10, shares: 15_200_000, volume: 3_020_000 },
    { ticker: 'VSTR', name: 'vibeStartup', blurb: 'A company in a day, with an AI co-founder', price: 52.40, shares: 18_000_000, volume: 4_380_000 },
    { ticker: 'VSIM', name: 'vibeSim', blurb: 'Simulation of a factory before it is built', price: 19.85, shares: 7_400_000, volume: 880_000 },
    { ticker: 'VSCI', name: 'vibeSci', blurb: 'A lab notebook that runs its own protocols', price: 34.60, shares: 6_100_000, volume: 640_000 },
    { ticker: 'VMTC', name: 'vibeMatch', blurb: 'Matching people to the work that fits', price: 24.15, shares: 8_900_000, volume: 1_120_000 },
    { ticker: 'VCOD', name: 'vibeCode', blurb: 'A code editor with hands', price: 47.90, shares: 21_500_000, volume: 5_240_000 },
    { ticker: 'VCLD', name: 'vibeCloud', blurb: 'Compute that a person can pick up', price: 31.05, shares: 14_600_000, volume: 1_930_000 },
    { ticker: 'VGOV', name: 'vibeGov', blurb: 'Public services, written as plain rules', price: 16.40, shares: 5_200_000, volume: 410_000 },
    { ticker: 'VFDR', name: 'vibeFounder', blurb: 'The first hundred days of a company', price: 22.80, shares: 6_800_000, volume: 730_000 },
    { ticker: 'VSHI', name: 'vibeShit', blurb: 'The small things, done well', price: 12.05, shares: 4_300_000, volume: 356_000 },
];

const T = {
    en: {
        fill: (q, p) => `${q} @ ${p}`,
        bidNone: 'No ask at or under your limit. Your bid rests on the book.',
        bidDone: (q, p) => `Filled ${q} shares of Halvard at an average of ${p}.`,
        bidPart: (q, r) => `Filled ${q}; ${r} rest on the book at your limit.`,
        badLimit: 'Set a limit price above zero.',
        spread: s => `spread ${s}`,
        capNames: ['Founders', 'Staff option pool', 'Seed round', 'Public float', 'You'],
        company: 'Company', last: 'Last', change: '24h', volume: 'Volume', chart: '7d', trade: 'Trade',
        cash: 'Cash', holdings: 'Positions', total: 'Account value', dayPl: 'Open P&L',
        emptyHoldings: 'No positions yet. Pick a row, set a quantity and buy.',
        pickRow: 'Pick a company from the market to trade it.',
        qty: 'Shares', est: 'Estimated cost', fee: 'Fee (0.20%)', totalCost: 'Total',
        buy: 'Buy', sell: 'Sell', reset: 'Reset the demo',
        bought: (q, n) => `Bought ${q} ${n} shares.`,
        sold: (q, n) => `Sold ${q} ${n} shares.`,
        noCash: 'Not enough cash in the demo account.',
        noShares: 'You hold no shares of that company.',
        noQty: 'Set a quantity of at least 1 share.',
        resetDone: 'The demo is back to its first day.',
        sorted: { change: 'Biggest move', volume: 'Most traded', price: 'Price', name: 'Name' },
        avg: 'Avg cost', value: 'Value', pl: 'Open P&L',
        pricePerShare: 'Price per share', newShares: 'New shares', founderEquity: 'Equity kept',
        postMoney: 'Post-money', dilution: 'Dilution',
        allSample: 'Sample market. Simulated trading. No money moves.',
    },
    es: {
        fill: (q, p) => `${q} @ ${p}`,
        bidNone: 'No hay ventas a tu límite o por debajo. Tu oferta queda en el libro.',
        bidDone: (q, p) => `Ejecutadas ${q} acciones de Halvard a un precio medio de ${p}.`,
        bidPart: (q, r) => `Ejecutadas ${q}; ${r} quedan en el libro a tu límite.`,
        badLimit: 'Pon un precio límite mayor que cero.',
        spread: s => `diferencial ${s}`,
        capNames: ['Fundadores', 'Opciones del equipo', 'Ronda semilla', 'Capital flotante', 'Tú'],
        company: 'Empresa', last: 'Último', change: '24 h', volume: 'Volumen', chart: '7 d', trade: 'Operar',
        cash: 'Efectivo', holdings: 'Posiciones', total: 'Valor de la cuenta', dayPl: 'G/P abierta',
        emptyHoldings: 'Aún no hay posiciones. Elige una fila, pon una cantidad y compra.',
        pickRow: 'Elige una empresa del mercado para operar.',
        qty: 'Acciones', est: 'Coste estimado', fee: 'Comisión (0,20 %)', totalCost: 'Total',
        buy: 'Comprar', sell: 'Vender', reset: 'Reiniciar la demo',
        bought: (q, n) => `Has comprado ${q} acciones de ${n}.`,
        sold: (q, n) => `Has vendido ${q} acciones de ${n}.`,
        noCash: 'No hay efectivo suficiente en la cuenta de demo.',
        noShares: 'No tienes acciones de esa empresa.',
        noQty: 'Pon una cantidad de al menos 1 acción.',
        resetDone: 'La demo vuelve a su primer día.',
        sorted: { change: 'Mayor movimiento', volume: 'Más negociadas', price: 'Precio', name: 'Nombre' },
        avg: 'Coste medio', value: 'Valor', pl: 'G/P abierta',
        pricePerShare: 'Precio por acción', newShares: 'Acciones nuevas', founderEquity: 'Capital que se queda',
        postMoney: 'Post-money', dilution: 'Dilución',
        allSample: 'Mercado de muestra. Operaciones simuladas. No se mueve dinero.',
    },
    'zh-Hans': {
        fill: (q, p) => `${q} @ ${p}`,
        bidNone: '没有等于或低于你限价的卖单。你的买单挂在订单簿上。',
        bidDone: (q, p) => `以均价 ${p} 成交 Halvard ${q} 股。`,
        bidPart: (q, r) => `已成交 ${q} 股；${r} 股按你的限价挂在订单簿上。`,
        badLimit: '请填写大于零的限价。',
        spread: s => `价差 ${s}`,
        capNames: ['创始人', '员工期权池', '种子轮', '公开流通', '你'],
        company: '公司', last: '最新价', change: '24 小时', volume: '成交量', chart: '7 天', trade: '交易',
        cash: '现金', holdings: '持仓', total: '账户总值', dayPl: '浮动盈亏',
        emptyHoldings: '还没有持仓。选一行，填入数量，然后买入。',
        pickRow: '从市场里选一家公司来交易。',
        qty: '股数', est: '预计成本', fee: '手续费（0.20%）', totalCost: '合计',
        buy: '买入', sell: '卖出', reset: '重置演示',
        bought: (q, n) => `已买入 ${n} ${q} 股。`,
        sold: (q, n) => `已卖出 ${n} ${q} 股。`,
        noCash: '演示账户的现金不足。',
        noShares: '你没有这家公司的股票。',
        noQty: '请填写至少 1 股。',
        resetDone: '演示已回到第一天。',
        sorted: { change: '涨幅最大', volume: '成交最多', price: '价格', name: '名称' },
        avg: '持仓成本', value: '市值', pl: '浮动盈亏',
        pricePerShare: '每股价格', newShares: '新增股数', founderEquity: '保留股权',
        postMoney: '投后估值', dilution: '稀释',
        allSample: '示例市场。模拟交易。不涉及任何资金。',
    },
};

const lang = document.documentElement.lang || 'en';
const t = T[lang] ?? T.en;
const nf = new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nf0 = new Intl.NumberFormat(lang, { maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat(lang, { notation: 'compact', maximumFractionDigits: 1 });
const pct = new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const START_CASH = 25_000;
const FEE = 0.002;
const KEY = 'vibefund-demo';

/** A tiny deterministic generator, so every visitor sees the same market. */
function seeded(text) {
    let h = 2166136261;
    for (const ch of text) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    let x = h >>> 0 || 1;
    return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; };
}

/** 56 closes ending at the company's price, made from its ticker alone. */
function historyOf(startup) {
    const rnd = seeded(startup.ticker);
    const out = [];
    let p = startup.price * (0.82 + rnd() * 0.22);
    for (let i = 0; i < 56; i++) {
        p *= 1 + (rnd() - 0.47) * 0.035;
        out.push(p);
    }
    const scale = startup.price / out[out.length - 1];
    return out.map(v => v * scale);
}

const MARKET = STARTUPS.map(s => {
    const history = historyOf(s);
    const prev = history[history.length - 2];
    const volume = Math.round(s.volume * (0.7 + seeded(`${s.ticker}v`)() * 0.6));
    return { ...s, history, change: ((s.price - prev) / prev) * 100, volume };
});

function readState() {
    try {
        const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (raw && typeof raw.cash === 'number' && raw.positions) return raw;
    } catch { /* a corrupt demo state starts over */ }
    return { cash: START_CASH, positions: {} };
}

const state = readState();
/** Halvard Ropeworks: fictional, the order book's company. Its last price is where the demo values a position. */
const HALV = { ticker: 'HALV', name: 'Halvard Ropeworks', blurb: '', price: 14.62, history: [], change: 0, volume: 0 };
/** Everything a position can be in: the market's twelve and Halvard. */
const ALL = [...MARKET, HALV];

let selected = MARKET[0].ticker;
let sortBy = 'change';
let filter = '';

const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* a browser with no storage keeps it in memory */ } };

const money = n => nf.format(n);
const signed = n => `${n >= 0 ? '+' : '−'}${nf.format(Math.abs(n))}`;
const el = id => document.getElementById(id);

/** The sparkline's path, drawn in 84 × 24. */
function sparkPath(history) {
    const w = 84, h = 24, pad = 2;
    const min = Math.min(...history), max = Math.max(...history);
    const span = max - min || 1;
    return history.map((v, i) => {
        const x = (i / (history.length - 1)) * (w - pad * 2) + pad;
        const y = h - pad - ((v - min) / span) * (h - pad * 2);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
}

function spark(history, up) {
    const stroke = up ? 'var(--up)' : 'var(--down)';
    return `<svg class="spark" viewBox="0 0 84 24" aria-hidden="true" focusable="false"><path d="${sparkPath(history)}" fill="none" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

function renderTicker() {
    const track = el('ticker-track');
    if (!track) return;
    const items = MARKET.map(s => `<span class="ticker__item"><b>${s.ticker}</b><span>${money(s.price)}</span><span class="${s.change >= 0 ? 'up' : 'down'}">${pct.format(Math.abs(s.change))}%</span></span>`).join('');
    track.innerHTML = items + items;
}

function visibleMarket() {
    const needle = filter.trim().toLowerCase();
    const rows = MARKET.filter(s => !needle || s.name.toLowerCase().includes(needle) || s.ticker.toLowerCase().includes(needle) || s.blurb.toLowerCase().includes(needle));
    const order = {
        change: (a, b) => Math.abs(b.change) - Math.abs(a.change),
        volume: (a, b) => b.volume - a.volume,
        price: (a, b) => b.price - a.price,
        name: (a, b) => a.name.localeCompare(b.name, lang),
    }[sortBy] ?? (() => 0);
    return rows.slice().sort(order);
}

function renderMarket() {
    const body = el('market-body');
    if (!body) return;
    const rows = visibleMarket();
    if (!rows.length) {
        body.innerHTML = `<tr><td colspan="6" class="empty">${t.pickRow}</td></tr>`;
        return;
    }
    body.innerHTML = rows.map(s => `
        <tr data-ticker="${s.ticker}" aria-selected="${s.ticker === selected}">
            <td><span class="co"><b>${s.name}</b><span>${s.blurb}</span></span></td>
            <td class="num">${money(s.price)}</td>
            <td class="num ${s.change >= 0 ? 'up' : 'down'}"><span class="sr-only">${s.change >= 0 ? '+' : '−'}</span>${pct.format(Math.abs(s.change))}%</td>
            <td class="num hide-sm">${compact.format(s.volume)}</td>
            <td class="hide-sm">${spark(s.history, s.change >= 0)}</td>
            <td><button type="button" class="btn btn--small" data-trade="${s.ticker}">${t.trade}</button></td>
        </tr>`).join('');
}

function positionOf(ticker) {
    const p = state.positions[ticker];
    return p && p.qty > 0 ? p : null;
}

function renderPortfolio() {
    const body = el('positions-body');
    const marketValue = ALL.reduce((sum, s) => {
        const p = positionOf(s.ticker);
        return sum + (p ? p.qty * s.price : 0);
    }, 0);
    const cost = ALL.reduce((sum, s) => {
        const p = positionOf(s.ticker);
        return sum + (p ? p.qty * p.avg : 0);
    }, 0);
    const pl = marketValue - cost;
    renderCap();

    if (el('stat-cash')) el('stat-cash').textContent = money(state.cash);
    if (el('stat-holdings')) el('stat-holdings').textContent = money(marketValue);
    if (el('stat-total')) el('stat-total').textContent = money(state.cash + marketValue);
    if (el('stat-pl')) {
        el('stat-pl').textContent = `${pl >= 0 ? '+' : '−'}${money(Math.abs(pl))}`;
        el('stat-pl').className = `stat__v ${pl > 0 ? 'up' : pl < 0 ? 'down' : ''}`;
    }
    if (!body) return;

    const held = ALL.filter(s => positionOf(s.ticker));
    if (!held.length) {
        body.innerHTML = `<tr><td colspan="6" class="empty">${t.emptyHoldings}</td></tr>`;
        return;
    }
    body.innerHTML = held.map(s => {
        const p = positionOf(s.ticker);
        const value = p.qty * s.price;
        const open = value - p.qty * p.avg;
        return `
        <tr data-ticker="${s.ticker}">
            <td><span class="co"><b>${s.name}</b><span>${s.ticker}</span></span></td>
            <td class="num">${nf0.format(p.qty)}</td>
            <td class="num">${money(p.avg)}</td>
            <td class="num">${money(s.price)}</td>
            <td class="num">${money(value)}</td>
            <td class="num ${open >= 0 ? 'up' : 'down'}">${open >= 0 ? '+' : '−'}${money(Math.abs(open))}</td>
        </tr>`;
    }).join('');
}

function renderTicket() {
    const s = ALL.find(m => m.ticker === selected);
    const price = el('ticket-price');
    if (price) price.textContent = `${money(s.price)} USDC`;
    if (el('ticket-name')) el('ticket-name').textContent = s.name;
    if (el('ticket-ticker')) el('ticket-ticker').textContent = s.ticker;
    renderEstimate();
}

function quantity() {
    const input = el('qty');
    const n = Math.floor(Number(input?.value));
    return Number.isFinite(n) && n > 0 ? n : 0;
}

function renderEstimate() {
    const s = ALL.find(m => m.ticker === selected);
    const qty = quantity();
    const cost = qty * s.price;
    const fee = cost * FEE;
    if (el('est-cost')) el('est-cost').textContent = money(cost);
    if (el('est-fee')) el('est-fee').textContent = money(fee);
    if (el('est-total')) el('est-total').textContent = money(cost + fee);
    if (el('est-label')) el('est-label').textContent = t.est;
    if (el('fee-label')) el('fee-label').textContent = t.fee;
    if (el('total-label')) el('total-label').textContent = t.totalCost;
    if (el('holdings-line')) {
        const p = positionOf(selected);
        el('holdings-line').textContent = p ? `${nf0.format(p.qty)} ${s.ticker} · ${t.avg} ${money(p.avg)}` : '';
    }
}

let toastTimer;
function toast(text) {
    let node = el('toast');
    if (!node) return;
    node.textContent = text;
    node.dataset.show = 'true';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { node.dataset.show = 'false'; }, 2600);
}

function buy() {
    const s = ALL.find(m => m.ticker === selected);
    const qty = quantity();
    if (!qty) return toast(t.noQty);
    const cost = qty * s.price * (1 + FEE);
    if (cost > state.cash) return toast(t.noCash);
    const p = positionOf(selected) ?? { qty: 0, avg: 0 };
    const shares = p.qty + qty;
    state.positions[selected] = { qty: shares, avg: (p.qty * p.avg + qty * s.price) / shares };
    state.cash -= cost;
    save();
    renderPortfolio();
    renderEstimate();
    renderMarket();
    toast(t.bought(qty, s.name));
}

function sell() {
    const s = ALL.find(m => m.ticker === selected);
    const qty = quantity();
    if (!qty) return toast(t.noQty);
    const p = positionOf(selected);
    if (!p) return toast(t.noShares);
    const n = Math.min(qty, p.qty);
    const proceeds = n * s.price * (1 - FEE);
    state.cash += proceeds;
    if (n === p.qty) delete state.positions[selected];
    else state.positions[selected] = { qty: p.qty - n, avg: p.avg };
    save();
    renderPortfolio();
    renderEstimate();
    renderMarket();
    toast(t.sold(n, s.name));
}

function reset() {
    state.cash = START_CASH;
    state.positions = {};
    book = freshBook();
    fills.length = 0;
    save();
    renderBook();
    renderPortfolio();
    renderEstimate();
    renderMarket();
    toast(t.resetDone);
}

/** The founder's raise: what a round at a price does to the cap table. */
function renderRaise() {
    const amount = Number(el('raise-amount')?.value) || 0;
    const pre = Number(el('raise-pre')?.value) || 0;
    const shares = Number(el('raise-shares')?.value) || 0;
    if (!el('raise-out')) return;
    const pricePerShare = shares ? pre / shares : 0;
    const newShares = pricePerShare ? amount / pricePerShare : 0;
    const post = pre + amount;
    const equity = post ? (pre / post) * 100 : 0;
    el('raise-out').innerHTML = `
        <div><dt>${t.pricePerShare}</dt><dd>${money(pricePerShare)} USDC</dd></div>
        <div><dt>${t.newShares}</dt><dd>${compact.format(Math.round(newShares))}</dd></div>
        <div><dt>${t.postMoney}</dt><dd>${money(post)} USDC</dd></div>
        <div><dt>${t.founderEquity}</dt><dd>${pct.format(equity)}%</dd></div>
        <div><dt>${t.dilution}</dt><dd>${pct.format(100 - equity)}%</dd></div>`;
    el('split-a')?.style.setProperty('--w', `${equity}%`);
    el('split-b')?.style.setProperty('--w', `${100 - equity}%`);
}

/** The language button works with or without the browser's invoker commands. */
function wireLanguage() {
    const dialog = el('lang-dialog');
    if (!dialog) return;
    for (const button of document.querySelectorAll('.lang-btn')) button.addEventListener('click', event => {
        if (typeof dialog.showModal === 'function' && !dialog.open) {
            event.preventDefault();
            dialog.showModal();
        }
    });
    dialog.addEventListener('click', event => {
        const box = dialog.querySelector('.lang-dialog__box');
        if (box && !box.contains(event.target)) dialog.close();
    });
}

function wire() {
    const body = el('market-body');
    body?.addEventListener('click', event => {
        const trade = event.target.closest('[data-trade]');
        if (trade) {
            selected = trade.dataset.trade;
            renderMarket();
            renderTicket();
            el('qty')?.focus();
            return;
        }
        const row = event.target.closest('tr[data-ticker]');
        if (row) {
            selected = row.dataset.ticker;
            renderMarket();
            renderTicket();
        }
    });

    // A row of the account picks that company too: the ticket trades what the person just looked at.
    el('positions-body')?.addEventListener('click', event => {
        const row = event.target.closest('tr[data-ticker]');
        if (!row) return;
        selected = row.dataset.ticker;
        renderMarket();
        renderTicket();
    });

    el('filter')?.addEventListener('input', event => { filter = event.target.value; renderMarket(); });
    el('sort')?.addEventListener('change', event => { sortBy = event.target.value; renderMarket(); });
    el('qty')?.addEventListener('input', renderEstimate);
    el('qty-max')?.addEventListener('click', () => {
        const s = ALL.find(m => m.ticker === selected);
        const input = el('qty');
        if (input) input.value = String(Math.max(0, Math.floor(state.cash / (s.price * (1 + FEE)))));
        renderEstimate();
    });
    el('ticket-buy')?.addEventListener('click', buy);
    el('ticket-sell')?.addEventListener('click', sell);
    el('reset')?.addEventListener('click', reset);
    for (const id of ['raise-amount', 'raise-pre', 'raise-shares']) el(id)?.addEventListener('input', renderRaise);
    wireLanguage();
    el('bid-form')?.addEventListener('submit', event => { event.preventDefault(); placeBid(); });
    for (const b of document.querySelectorAll('[data-theme-toggle]')) b.addEventListener('click', toggleTheme);
    wireFilms();
    wireKeys();
}


function start() {
    const qty = el('qty');
    if (qty && !qty.value) qty.value = '10';
    renderTicker();
    renderMarket();
    renderPortfolio();
    renderTicket();
    renderRaise();
    renderBook();
    renderTheme();
    wire();
    if (el('sample-note')) el('sample-note').textContent = t.allSample;
}


/* ---- The order book of Halvard Ropeworks (fictional) ---- */

const HALV_SHARES = 8_000_000;
/** Holders before anyone bids: founders, the staff pool, the seed round, the float. */
const CAP = [4_400_000, 960_000, 1_840_000, 800_000];
const freshBook = () => ({
    asks: [[14.64, 420], [14.66, 310], [14.69, 640], [14.72, 900], [14.76, 1_250], [14.81, 2_000]],
    bids: [[14.58, 380], [14.55, 520], [14.51, 760], [14.47, 1_100], [14.42, 1_600], [14.36, 2_400]],
    yours: null,
});
let book = freshBook();
const fills = [];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const sleep = ms => new Promise(r => setTimeout(r, reduceMotion.matches ? 0 : ms));

function ladderRows(levels, side) {
    return levels.map(([p, q]) => {
        const yours = side === 'bid' && book.yours && book.yours[0] === p;
        return `<li data-p="${p}"${yours ? ' class="is-yours"' : ''}><span class="p">${money(p)}</span><span class="s">${nf0.format(q)}</span></li>`;
    }).join('');
}

function renderBook() {
    const asks = el('ladder-asks'), bids = el('ladder-bids');
    if (!asks || !bids) return;
    const bidLevels = book.bids.slice();
    if (book.yours) {
        const at = bidLevels.findIndex(([p]) => p <= book.yours[0]);
        const same = bidLevels.findIndex(([p]) => p === book.yours[0]);
        if (same >= 0) bidLevels[same] = [book.yours[0], bidLevels[same][1] + book.yours[1]];
        else bidLevels.splice(at < 0 ? bidLevels.length : at, 0, book.yours);
    }
    const max = Math.max(...book.asks.map(l => l[1]), ...bidLevels.map(l => l[1]), 1);
    asks.innerHTML = ladderRows(book.asks.slice().reverse(), 'ask');
    bids.innerHTML = ladderRows(bidLevels, 'bid');
    for (const li of [...asks.children, ...bids.children]) {
        const q = Number(li.querySelector('.s').textContent.replace(/\D/g, ''));
        li.style.setProperty('--d', `${(q / max) * 100}%`);
    }
    const bestAsk = book.asks[0]?.[0], bestBid = bidLevels[0]?.[0];
    const mid = bestAsk && bestBid ? (bestAsk + bestBid) / 2 : bestAsk ?? bestBid ?? HALV.price;
    if (el('ladder-mid')) el('ladder-mid').textContent = money(mid);
    if (el('ladder-spread')) el('ladder-spread').textContent = bestAsk && bestBid ? t.spread(money(bestAsk - bestBid)) : '';
    for (const [k, v] of [['bid', bestBid], ['ask', bestAsk], ['last', HALV.price]]) {
        const node = document.querySelector(`[data-quote="${k}"]`);
        if (node && v) node.textContent = money(v);
    }
    renderFills();
    renderCap();
}

function renderFills() {
    const list = el('bid-fills');
    if (!list) return;
    if (!fills.length) {
        list.innerHTML = `<li class="empty">${list.dataset.empty ?? list.textContent.trim()}</li>`;
        list.dataset.empty ??= list.textContent.trim();
    }
    const filled = fills.reduce((n, f) => n + f.q, 0);
    const cost = fills.reduce((n, f) => n + f.q * f.p, 0);
    const fee = cost * FEE;
    if (el('sum-filled')) el('sum-filled').textContent = nf0.format(filled);
    if (el('sum-avg')) el('sum-avg').textContent = filled ? money(cost / filled) : '—';
    if (el('sum-fee')) el('sum-fee').textContent = money(fee);
    if (el('sum-total')) el('sum-total').textContent = money(cost + fee);
    if (el('sum-rest')) el('sum-rest').textContent = nf0.format(book.yours?.[1] ?? 0);
}

function renderCap() {
    const bar = el('cap-bar'), body = el('cap-body');
    if (!bar || !body) return;
    const you = positionOf('HALV')?.qty ?? 0;
    const rows = [CAP[0], CAP[1], CAP[2], Math.max(0, CAP[3] - you), you];
    if (bar.children.length !== 5) bar.innerHTML = '<i></i><i></i><i></i><i></i><i></i>';
    rows.forEach((q, i) => bar.children[i].style.setProperty('--w', `${(q / HALV_SHARES) * 100}%`));
    const changed = body.dataset.you !== String(you);
    body.dataset.you = String(you);
    body.innerHTML = rows.map((q, i) => `<tr class="${i === 4 ? `is-you${changed && you ? ' is-changed' : ''}` : ''}"><td><span class="sw cap-sw-${i}" aria-hidden="true"></span>${t.capNames[i]}</td><td class="num">${nf0.format(q)}</td><td class="num">${pct.format((q / HALV_SHARES) * 100)}%</td></tr>`).join('');
    body.querySelectorAll('.sw').forEach((sw, i) => sw.style.setProperty('background', getComputedStyle(bar.children[i]).background));
}

let bidding = false;
/** A limit bid walks the asks from the cheapest; what is left rests on the book as the visitor's own bid. */
async function placeBid() {
    if (bidding) return;
    const qty = Math.floor(Number(el('bid-qty')?.value));
    const limit = Math.round(Number(el('bid-limit')?.value) * 100) / 100;
    if (!(qty > 0)) return toast(t.noQty);
    if (!(limit > 0)) return toast(t.badLimit);
    // The worst case is the whole size at the limit: the demo cash must cover it before anything fills.
    if (qty * limit * (1 + FEE) > state.cash) return toast(t.noCash);
    bidding = true;
    fills.length = 0;
    el('bid-fills').innerHTML = '';
    let left = qty;
    while (left > 0 && book.asks.length && book.asks[0][0] <= limit) {
        const [p, q] = book.asks[0];
        const take = Math.min(q, left);
        left -= take;
        if (take === q) book.asks.shift(); else book.asks[0] = [p, q - take];
        fills.push({ q: take, p });
        const p0 = positionOf('HALV') ?? { qty: 0, avg: 0 };
        state.positions.HALV = { qty: p0.qty + take, avg: (p0.qty * p0.avg + take * p) / (p0.qty + take) };
        state.cash -= take * p * (1 + FEE);
        HALV.price = p;
        const li = document.createElement('li');
        li.className = 'is-new';
        li.innerHTML = `<span>${t.fill(nf0.format(take), money(p))}</span><span>${money(take * p)}</span>`;
        el('bid-fills').append(li);
        renderBook();
        document.querySelector(`#ladder-asks li[data-p="${p}"]`)?.classList.add('is-taken');
        await sleep(420);
    }
    book.yours = left > 0 ? [limit, left + (book.yours?.[0] === limit ? book.yours[1] : 0)] : book.yours;
    save();
    renderBook();
    renderPortfolio();
    renderMarket();
    renderEstimate();
    const filled = qty - left;
    if (!filled) {
        el('bid-fills').innerHTML = `<li class="empty">${t.bidNone}</li>`;
        toast(t.bidNone);
    } else {
        const avg = fills.reduce((n, f) => n + f.q * f.p, 0) / filled;
        toast(left ? t.bidPart(nf0.format(filled), nf0.format(left)) : t.bidDone(nf0.format(filled), money(avg)));
    }
    bidding = false;
}

/* ---- After hours: the night paper, chosen by the visitor or by the system ---- */

function currentTheme() {
    try { const v = localStorage.getItem('vibefund-theme'); if (v === 'night' || v === 'day') return v; } catch { /* no storage */ }
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
}
function renderTheme(theme = currentTheme()) {
    document.documentElement.dataset.theme = theme;
    for (const b of document.querySelectorAll('[data-theme-toggle]')) {
        b.setAttribute('aria-pressed', String(theme === 'night'));
        if (b.dataset.on !== b.dataset.off) b.textContent = theme === 'night' ? b.dataset.off : b.dataset.on;
    }
}
function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'night' ? 'day' : 'night';
    try { localStorage.setItem('vibefund-theme', next); } catch { /* the choice lasts this visit */ }
    if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(() => renderTheme(next));
    else renderTheme(next);
}

/* ---- Films: play in view, never under reduced motion, always pausable ---- */

function wireFilms() {
    const films = [...document.querySelectorAll('[data-film]')];
    let paused = reduceMotion.matches;
    const label = () => {
        for (const b of document.querySelectorAll('[data-film-toggle]')) {
            b.textContent = paused ? b.dataset.play : b.dataset.pause;
            b.setAttribute('aria-pressed', String(paused));
        }
    };
    const seen = new Set();
    const sync = () => films.forEach(v => (seen.has(v) && !paused ? v.play().catch(() => {}) : v.pause()));
    const io = new IntersectionObserver(entries => {
        for (const e of entries) {
            if (e.isIntersecting) { if (e.target.preload === 'none') e.target.preload = 'auto'; seen.add(e.target); } else seen.delete(e.target);
        }
        sync();
    }, { rootMargin: '200px 0px' });
    films.forEach(v => io.observe(v));
    for (const b of document.querySelectorAll('[data-film-toggle]')) b.addEventListener('click', () => { paused = !paused; label(); sync(); });
    reduceMotion.addEventListener?.('change', () => { paused = reduceMotion.matches; label(); sync(); });
    label();
}

/* ---- The function keys: F1–F6 jump, and the bar marks the section in view ---- */

function wireKeys() {
    const links = [...document.querySelectorAll('.fkeys__keys a')];
    addEventListener('keydown', event => {
        const n = /^F([1-6])$/.exec(event.key)?.[1];
        if (!n || event.altKey || event.ctrlKey || event.metaKey) return;
        const a = links[Number(n) - 1];
        if (!a) return;
        event.preventDefault();
        document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
    const io = new IntersectionObserver(entries => {
        for (const e of entries) if (e.isIntersecting)
            for (const a of links) a.setAttribute('aria-current', String(a.getAttribute('href') === `#${e.target.id}`));
    }, { rootMargin: '-45% 0px -50% 0px' });
    for (const a of links) { const s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); }
}

// Last, so every binding above exists before the first render.
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();
