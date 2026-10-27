/**
 * vibeFund's market demo.
 *
 * The startups, their prices and their charts are sample data written into this file: no exchange, no quote feed.
 * A trade moves numbers in this browser's localStorage and nowhere else: the page sends nothing to anyone but the
 * hosting provider's visit count.
 * Every locale's page carries this one file; the page's `lang` picks the words.
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
    track.innerHTML = MARKET.slice(0, 8).map(s => `<span class="ticker__item"><b>${s.ticker}</b><span>${money(s.price)}</span><span class="${s.change >= 0 ? 'up' : 'down'}">${s.change >= 0 ? '+' : '−'}${pct.format(Math.abs(s.change))}%</span></span>`).join('');
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
            <td class="num ${s.change >= 0 ? 'up' : 'down'}">${s.change >= 0 ? '+' : '−'}${pct.format(Math.abs(s.change))}%</td>
            <td class="num hide-sm">${compact.format(s.volume)}</td>
            <td class="num hide-sm">${spark(s.history, s.change >= 0)}</td>
            <td><button type="button" class="btn btn--tiny btn--buy" data-trade="${s.ticker}">${t.trade}</button></td>
        </tr>`).join('');
}

function positionOf(ticker) {
    const p = state.positions[ticker];
    return p && p.qty > 0 ? p : null;
}

function renderPortfolio() {
    const body = el('positions-body');
    const marketValue = MARKET.reduce((sum, s) => {
        const p = positionOf(s.ticker);
        return sum + (p ? p.qty * s.price : 0);
    }, 0);
    const cost = MARKET.reduce((sum, s) => {
        const p = positionOf(s.ticker);
        return sum + (p ? p.qty * p.avg : 0);
    }, 0);
    const pl = marketValue - cost;

    if (el('stat-cash')) el('stat-cash').textContent = money(state.cash);
    if (el('stat-holdings')) el('stat-holdings').textContent = money(marketValue);
    if (el('stat-total')) el('stat-total').textContent = money(state.cash + marketValue);
    if (el('stat-pl')) {
        el('stat-pl').textContent = `${pl >= 0 ? '+' : '−'}${money(Math.abs(pl))}`;
        el('stat-pl').className = `stat__v ${pl > 0 ? 'up' : pl < 0 ? 'down' : ''}`;
    }
    if (!body) return;

    const held = MARKET.filter(s => positionOf(s.ticker));
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
    const s = MARKET.find(m => m.ticker === selected);
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
    const s = MARKET.find(m => m.ticker === selected);
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
    const s = MARKET.find(m => m.ticker === selected);
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
    const s = MARKET.find(m => m.ticker === selected);
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
    save();
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
        <div><span>${t.pricePerShare}</span><b>${money(pricePerShare)} USDC</b></div>
        <div><span>${t.newShares}</span><b>${compact.format(Math.round(newShares))}</b></div>
        <div><span>${t.postMoney}</span><b>${money(post)} USDC</b></div>
        <div><span>${t.founderEquity}</span><b>${pct.format(equity)}%</b></div>
        <div><span>${t.dilution}</span><b>${pct.format(100 - equity)}%</b></div>`;
}

/** The language button works with or without the browser's invoker commands. */
function wireLanguage() {
    const button = document.querySelector('.lang-btn');
    const dialog = el('lang-dialog');
    if (!button || !dialog) return;
    button.addEventListener('click', event => {
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
        const s = MARKET.find(m => m.ticker === selected);
        const input = el('qty');
        if (input) input.value = String(Math.max(0, Math.floor(state.cash / (s.price * (1 + FEE)))));
        renderEstimate();
    });
    el('ticket-buy')?.addEventListener('click', buy);
    el('ticket-sell')?.addEventListener('click', sell);
    el('reset')?.addEventListener('click', reset);
    for (const id of ['raise-amount', 'raise-pre', 'raise-shares']) el(id)?.addEventListener('input', renderRaise);
    wireLanguage();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();

function start() {
    const qty = el('qty');
    if (qty && !qty.value) qty.value = '10';
    renderTicker();
    renderMarket();
    renderPortfolio();
    renderTicket();
    renderRaise();
    wire();
    if (el('sample-note')) el('sample-note').textContent = t.allSample;
}
