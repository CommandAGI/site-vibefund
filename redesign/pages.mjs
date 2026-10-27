/**
 * The three pages (/, /es/, /zh/) from one template and one table of words. Run after a change of either:
 *   node redesign/pages.mjs
 * The pages are plain files: the host serves them as they are written here.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const wordmark = readFileSync(path.join(root, 'wordmark.svg'), 'utf8').match(/d="([^"]+)"/)[1];

const W = {
    en: {
        dir: '', lang: 'en', title: 'VibeFund — startup shares, quoted to the cent',
        description: 'VibeFund is a market for startup shares, settled in USDC. This page is a demo: sample companies, simulated trades, nothing leaves your browser.',
        skip: 'Skip to the order book',
        sampleFlag: 'Sample market · simulated trading',
        heroTitle: 'Startup shares, <em>quoted to the cent.</em>',
        heroLead: 'A private bank’s manners, an exchange’s precision. Every price, size and holder on this page is a sample; every trade runs in your browser.',
        heroBid: 'Place a sample bid',
        heroMarket: 'See the market',
        heroQuote: 'Halvard Ropeworks · fictional',
        bid: 'Bid', ask: 'Ask', last: 'Last',
        pause: 'Pause the film', play: 'Play the film',
        bookNo: 'II', bookKicker: 'The order book',
        bookTitle: 'Halvard Ropeworks',
        bookFictional: 'A fictional company',
        bookLead: 'Set a size and a limit. Your bid takes the cheapest asks first; what does not fill rests on the book.',
        asks: 'Asks', bids: 'Bids', price: 'Price', size: 'Shares', spread: 'Spread',
        ladderCaption: 'Halvard Ropeworks order book, illustrative',
        ticketTitle: 'Your bid',
        shares: 'Shares', limit: 'Limit (USDC)',
        place: 'Place sample bid',
        fills: 'Fills', noFills: 'No fills yet.',
        filled: 'Filled', avgPrice: 'Average price', fee: 'Fee (0.20%)', total: 'Total', resting: 'Resting on the book',
        capTitle: 'Who owns Halvard',
        capCaption: 'Halvard Ropeworks cap table, illustrative',
        holder: 'Holder', pctOwned: 'Owned',
        capFounders: 'Founders', capStaff: 'Staff option pool', capSeed: 'Seed round', capFloat: 'Public float', capYou: 'You',
        bookNote: 'Illustrative. Halvard Ropeworks does not exist; its book, holders and prices are written into this page. Your bid uses the demo cash of your account below.',
        nightTitle: 'The book does not close at five.',
        nightLead: 'The market we are building settles in USDC the same day, at night and on Sunday. Tonight it is a demo.',
        afterHours: 'After hours', afterHoursOn: 'Lights down', afterHoursOff: 'Lights up',
        marketNo: 'III', marketTitle: 'The market',
        marketLead: 'Twelve companies of the vibe family, at sample prices written into the page and refreshed nowhere.',
        search: 'Search the market', searchPh: 'Company or ticker', sortBy: 'Sort by',
        sortChange: 'Biggest move', sortVolume: 'Most traded', sortPrice: 'Price', sortName: 'Name',
        thCompany: 'Company', thLast: 'Last', th24: '24h', thVol: 'Volume', th7: '7d', thTrade: 'Trade',
        marketCaption: 'The vibe family’s sample share prices',
        noscript: 'The trading demo needs JavaScript. The rest of the page reads without it.',
        ticketHint: 'Sample shares. Demo cash. Your browser keeps the position.',
        max: 'Max', estCost: 'Estimated cost', buy: 'Buy', sell: 'Sell',
        sampleNote: 'Sample market. Simulated trading. No money moves.',
        accountNo: 'IV', accountTitle: 'Your statement',
        accountLead: 'Demo cash, positions and open profit and loss, kept in this browser. Clear the site’s data and it starts again.',
        reset: 'Reset the demo', cash: 'Cash', positions: 'Positions', value: 'Account value',
        thShares: 'Shares', thAvg: 'Avg cost', thValue: 'Value', thPl: 'Open P&amp;L',
        positionsCaption: 'Your demo positions',
        raiseNo: 'V', raiseTitle: 'Raise on VibeFund',
        raiseLead: 'A founder lists a round at one price per share. Change the terms; see what the round does to the table.',
        terms: 'Terms', raiseAmount: 'Raise (USDC)', raisePre: 'Pre-money valuation (USDC)', raiseShares: 'Shares outstanding',
        raiseMail: 'A listing is a draft with no price until the company’s owner sets its terms. Write to <a href="mailto:hello@vibefund.pro">hello@vibefund.pro</a> to start one.',
        raiseOut: 'What it does to the table', before: 'Before', after: 'After', founders: 'Holders today', investors: 'New investors',
        howNo: 'VI', howTitle: 'Same day, four movements',
        how: [
            ['T+0 · 01', 'Open an account', 'A CommandAGI account and an ID check. The demo needs neither.'],
            ['T+0 · 02', 'Fund with USDC', 'Deposit from a chain we settle on. The balance is usable when the transfer lands.'],
            ['T+0 · 03', 'Take shares', 'Pick a company, set a size, settle at the price. Fractions down to 1/100 of a share.'],
            ['T+0 · 04', 'Sell when you like', 'Post shares back to the book. Settlement is immediate; the USDC is yours to withdraw.'],
        ],
        riskNo: 'VII', riskTitle: 'Read this before anything else.',
        risks: [
            'You can lose all the money you put into a startup. Most startups fail.',
            'Startup shares can be hard to sell. A buyer may not be there when you want one.',
            'Every company, price, order and holder on this page is a sample. Halvard Ropeworks is fictional.',
            'Nothing here is an offer to sell or a solicitation to buy a security, or advice.',
            'When it opens, VibeFund is for accredited investors where it is registered, and for nobody else until that changes.',
        ],
        riskReview: 'Draft disclosure, pending legal review.',
        faqNo: 'VIII', faqTitle: 'Questions',
        faq: [
            ['Is this real trading?', 'No. The companies and their prices are sample data written into the page, and a trade changes numbers in your browser’s storage. The market for real shares, with real settlement, opens when the owner launches it.'],
            ['Who can invest?', 'Accredited investors in the jurisdictions VibeFund is registered in, and nobody else until that changes. The demo asks for nothing, so treat it as a picture of the product, not as an account.'],
            ['Where does the money sit?', 'USDC in custody with a licensed custodian, in an account in your name. VibeFund does not lend it, stake it or hold it on its own book.'],
            ['What does it cost?', 'No deposit or withdrawal fee and 0.20% per trade, both shown on the ticket before you confirm. The owner sets the final schedule before launch.'],
            ['How does a startup list?', 'The founder sets a raise, a pre-money valuation and the shares outstanding. VibeFund reviews the company and its filings, then the round opens at one price per share. Write to <a href="mailto:hello@vibefund.pro">hello@vibefund.pro</a>.'],
        ],
        footPitch: 'Startup shares, quoted to the cent. A company of CommandAGI, at vibefund.pro.',
        footBase: '© 2026 VibeFund. Sample market, simulated trading, no offer of securities.',
        media: 'Films and plates on this page are generated images, not photographs of real places or documents.',
        language: 'Language', close: 'Close',
        nav: { book: 'Book', market: 'Market', portfolio: 'Statement', raise: 'Raise', risk: 'Risk', questions: 'FAQ' },
        navLabel: 'Sections',
        plateAlt: '', ropeAlt: 'An engraving of a coil of rope on a stone quay, the vignette of Halvard Ropeworks’ sample certificate.',
        wheelsAlt: '',
    },
    es: {
        dir: 'es/', lang: 'es', title: 'VibeFund — acciones de startups, cotizadas al céntimo',
        description: 'VibeFund es un mercado de acciones de startups, liquidado en USDC. Esta página es una demo: empresas de muestra, operaciones simuladas, nada sale de tu navegador.',
        skip: 'Ir al libro de órdenes',
        sampleFlag: 'Mercado de muestra · operaciones simuladas',
        heroTitle: 'Acciones de startups, <em>cotizadas al céntimo.</em>',
        heroLead: 'Las maneras de una banca privada, la precisión de una bolsa. Cada precio, tamaño y accionista de esta página es una muestra; cada operación corre en tu navegador.',
        heroBid: 'Haz una oferta de muestra',
        heroMarket: 'Ver el mercado',
        heroQuote: 'Halvard Ropeworks · ficticia',
        bid: 'Compra', ask: 'Venta', last: 'Último',
        pause: 'Pausar la película', play: 'Reproducir la película',
        bookNo: 'II', bookKicker: 'El libro de órdenes',
        bookTitle: 'Halvard Ropeworks',
        bookFictional: 'Una empresa ficticia',
        bookLead: 'Pon un tamaño y un límite. Tu oferta toma primero las ventas más baratas; lo que no se cruza queda en el libro.',
        asks: 'Ventas', bids: 'Compras', price: 'Precio', size: 'Acciones', spread: 'Diferencial',
        ladderCaption: 'Libro de órdenes de Halvard Ropeworks, ilustrativo',
        ticketTitle: 'Tu oferta',
        shares: 'Acciones', limit: 'Límite (USDC)',
        place: 'Enviar oferta de muestra',
        fills: 'Ejecuciones', noFills: 'Aún no hay ejecuciones.',
        filled: 'Ejecutado', avgPrice: 'Precio medio', fee: 'Comisión (0,20 %)', total: 'Total', resting: 'En el libro',
        capTitle: 'Quién es dueño de Halvard',
        capCaption: 'Tabla de capitalización de Halvard Ropeworks, ilustrativa',
        holder: 'Accionista', pctOwned: 'Participación',
        capFounders: 'Fundadores', capStaff: 'Opciones del equipo', capSeed: 'Ronda semilla', capFloat: 'Capital flotante', capYou: 'Tú',
        bookNote: 'Ilustrativo. Halvard Ropeworks no existe; su libro, sus accionistas y sus precios están escritos en esta página. Tu oferta usa el efectivo de demo de tu cuenta, más abajo.',
        nightTitle: 'El libro no cierra a las cinco.',
        nightLead: 'El mercado que construimos liquida en USDC el mismo día, de noche y en domingo. Esta noche es una demo.',
        afterHours: 'Fuera de horario', afterHoursOn: 'Bajar la luz', afterHoursOff: 'Subir la luz',
        marketNo: 'III', marketTitle: 'El mercado',
        marketLead: 'Doce empresas de la familia vibe, a precios de muestra escritos en la página y que no se actualizan.',
        search: 'Buscar en el mercado', searchPh: 'Empresa o símbolo', sortBy: 'Ordenar por',
        sortChange: 'Mayor movimiento', sortVolume: 'Más negociadas', sortPrice: 'Precio', sortName: 'Nombre',
        thCompany: 'Empresa', thLast: 'Último', th24: '24 h', thVol: 'Volumen', th7: '7 d', thTrade: 'Operar',
        marketCaption: 'Precios de muestra de la familia vibe',
        noscript: 'La demo de operaciones necesita JavaScript. El resto de la página se lee sin él.',
        ticketHint: 'Acciones de muestra. Efectivo de demo. Tu navegador guarda la posición.',
        max: 'Máx.', estCost: 'Coste estimado', buy: 'Comprar', sell: 'Vender',
        sampleNote: 'Mercado de muestra. Operaciones simuladas. No se mueve dinero.',
        accountNo: 'IV', accountTitle: 'Tu extracto',
        accountLead: 'Efectivo de demo, posiciones y ganancias abiertas, guardados en este navegador. Borra los datos del sitio y empieza de nuevo.',
        reset: 'Reiniciar la demo', cash: 'Efectivo', positions: 'Posiciones', value: 'Valor de la cuenta',
        thShares: 'Acciones', thAvg: 'Coste medio', thValue: 'Valor', thPl: 'G/P abierta',
        positionsCaption: 'Tus posiciones de demo',
        raiseNo: 'V', raiseTitle: 'Levanta capital en VibeFund',
        raiseLead: 'Un fundador abre una ronda a un precio por acción. Cambia los términos y mira qué hace la ronda con la tabla.',
        terms: 'Términos', raiseAmount: 'Ronda (USDC)', raisePre: 'Valoración pre-money (USDC)', raiseShares: 'Acciones en circulación',
        raiseMail: 'Un listado es un borrador sin precio hasta que el dueño de la empresa fija sus términos. Escribe a <a href="mailto:hello@vibefund.pro">hello@vibefund.pro</a> para empezar uno.',
        raiseOut: 'Qué hace con la tabla', before: 'Antes', after: 'Después', founders: 'Accionistas actuales', investors: 'Inversores nuevos',
        howNo: 'VI', howTitle: 'El mismo día, cuatro movimientos',
        how: [
            ['T+0 · 01', 'Abre una cuenta', 'Una cuenta de CommandAGI y una verificación de identidad. La demo no pide ninguna.'],
            ['T+0 · 02', 'Deposita USDC', 'Desde una red en la que liquidamos. El saldo se puede usar cuando llega la transferencia.'],
            ['T+0 · 03', 'Toma acciones', 'Elige una empresa, pon un tamaño y liquida al precio. Fracciones de hasta 1/100 de acción.'],
            ['T+0 · 04', 'Vende cuando quieras', 'Devuelve las acciones al libro. La liquidación es inmediata y los USDC son tuyos.'],
        ],
        riskNo: 'VII', riskTitle: 'Lee esto antes que nada.',
        risks: [
            'Puedes perder todo el dinero que pongas en una startup. La mayoría de las startups fracasan.',
            'Las acciones de startups pueden ser difíciles de vender. Puede que no haya comprador cuando lo necesites.',
            'Cada empresa, precio, orden y accionista de esta página es una muestra. Halvard Ropeworks es ficticia.',
            'Nada de esto es una oferta de venta ni una solicitud de compra de valores, ni un consejo.',
            'Cuando abra, VibeFund será para inversores acreditados donde esté registrado, y para nadie más hasta que eso cambie.',
        ],
        riskReview: 'Borrador de aviso, pendiente de revisión legal.',
        faqNo: 'VIII', faqTitle: 'Preguntas',
        faq: [
            ['¿Es una operativa real?', 'No. Las empresas y sus precios son datos de muestra escritos en la página, y una operación cambia números en el almacenamiento de tu navegador. El mercado de acciones reales, con liquidación real, abre cuando el dueño lo lance.'],
            ['¿Quién puede invertir?', 'Inversores acreditados en las jurisdicciones en las que VibeFund esté registrado, y nadie más hasta que eso cambie. La demo no pide nada: tómala como una imagen del producto, no como una cuenta.'],
            ['¿Dónde está el dinero?', 'En USDC, bajo custodia de un custodio con licencia, en una cuenta a tu nombre. VibeFund no lo presta, no lo bloquea y no lo tiene en su propio balance.'],
            ['¿Cuánto cuesta?', 'Sin comisión de depósito ni de retirada, y un 0,20 % por operación, ambos visibles en el ticket antes de confirmar. El dueño fija las tarifas finales antes del lanzamiento.'],
            ['¿Cómo cotiza una startup?', 'El fundador fija la ronda, la valoración pre-money y las acciones en circulación. VibeFund revisa la empresa y sus documentos, y la ronda abre a un precio por acción. Escribe a <a href="mailto:hello@vibefund.pro">hello@vibefund.pro</a>.'],
        ],
        footPitch: 'Acciones de startups, cotizadas al céntimo. Una empresa de CommandAGI, en vibefund.pro.',
        footBase: '© 2026 VibeFund. Mercado de muestra, operaciones simuladas, sin oferta de valores.',
        media: 'Las películas y láminas de esta página son imágenes generadas, no fotografías de lugares ni documentos reales.',
        language: 'Idioma', close: 'Cerrar',
        nav: { book: 'Libro', market: 'Mercado', portfolio: 'Extracto', raise: 'Ronda', risk: 'Riesgo', questions: 'Dudas' },
        navLabel: 'Secciones',
        plateAlt: '', ropeAlt: 'Un grabado de un rollo de cuerda en un muelle de piedra, la viñeta del certificado de muestra de Halvard Ropeworks.',
        wheelsAlt: '',
    },
    zh: {
        dir: 'zh/', lang: 'zh-Hans', title: 'VibeFund — 初创公司股份，报价精确到分',
        description: 'VibeFund 是一个以 USDC 结算的初创公司股份市场。本页是演示：示例公司，模拟交易，任何数据都不会离开你的浏览器。',
        skip: '跳到订单簿',
        sampleFlag: '示例市场 · 模拟交易',
        heroTitle: '初创公司股份，<em>报价精确到分。</em>',
        heroLead: '私人银行的分寸，交易所的精确。本页每个价格、数量和股东都是示例；每笔交易都只在你的浏览器里运行。',
        heroBid: '下一笔示例买单',
        heroMarket: '查看市场',
        heroQuote: 'Halvard Ropeworks · 虚构公司',
        bid: '买价', ask: '卖价', last: '最新价',
        pause: '暂停影片', play: '播放影片',
        bookNo: 'II', bookKicker: '订单簿',
        bookTitle: 'Halvard Ropeworks',
        bookFictional: '一家虚构的公司',
        bookLead: '设定数量和限价。你的买单先吃掉最便宜的卖单；未成交的部分挂在订单簿上。',
        asks: '卖单', bids: '买单', price: '价格', size: '股数', spread: '价差',
        ladderCaption: 'Halvard Ropeworks 订单簿（示意）',
        ticketTitle: '你的买单',
        shares: '股数', limit: '限价（USDC）',
        place: '提交示例买单',
        fills: '成交', noFills: '还没有成交。',
        filled: '已成交', avgPrice: '均价', fee: '手续费（0.20%）', total: '合计', resting: '挂单中',
        capTitle: 'Halvard 归谁所有',
        capCaption: 'Halvard Ropeworks 股权结构表（示意）',
        holder: '股东', pctOwned: '持股比例',
        capFounders: '创始人', capStaff: '员工期权池', capSeed: '种子轮', capFloat: '公开流通', capYou: '你',
        bookNote: '示意。Halvard Ropeworks 并不存在；它的订单簿、股东和价格都写在本页里。你的买单使用下方账户的演示现金。',
        nightTitle: '订单簿不在五点收盘。',
        nightLead: '我们正在建设的市场以 USDC 当日结算，夜里和周日也一样。今晚它还是演示。',
        afterHours: '盘后', afterHoursOn: '调暗灯光', afterHoursOff: '调亮灯光',
        marketNo: 'III', marketTitle: '市场',
        marketLead: 'vibe 家族的十二家公司，价格是写在页面里的示例，不会更新。',
        search: '搜索市场', searchPh: '公司或代码', sortBy: '排序方式',
        sortChange: '涨跌最大', sortVolume: '成交最多', sortPrice: '价格', sortName: '名称',
        thCompany: '公司', thLast: '最新价', th24: '24 小时', thVol: '成交量', th7: '7 天', thTrade: '交易',
        marketCaption: 'vibe 家族的示例股价',
        noscript: '交易演示需要 JavaScript。页面的其他部分无需它也能阅读。',
        ticketHint: '示例股份。演示现金。持仓保存在你的浏览器里。',
        max: '最大', estCost: '预计成本', buy: '买入', sell: '卖出',
        sampleNote: '示例市场。模拟交易。不涉及任何资金。',
        accountNo: 'IV', accountTitle: '你的对账单',
        accountLead: '演示现金、持仓和浮动盈亏保存在这个浏览器里。清除网站数据后会重新开始。',
        reset: '重置演示', cash: '现金', positions: '持仓', value: '账户总值',
        thShares: '股数', thAvg: '持仓成本', thValue: '市值', thPl: '浮动盈亏',
        positionsCaption: '你的演示持仓',
        raiseNo: 'V', raiseTitle: '在 VibeFund 融资',
        raiseLead: '创始人以每股一个价格开放一轮融资。改变条款，看看这一轮对股权表做了什么。',
        terms: '条款', raiseAmount: '融资额（USDC）', raisePre: '投前估值（USDC）', raiseShares: '已发行股数',
        raiseMail: '上市申请在公司所有者设定条款之前只是草稿，没有价格。写信到 <a href="mailto:hello@vibefund.pro">hello@vibefund.pro</a> 开始一份。',
        raiseOut: '对股权表的影响', before: '之前', after: '之后', founders: '现有股东', investors: '新投资人',
        howNo: 'VI', howTitle: '当日完成，四个步骤',
        how: [
            ['T+0 · 01', '开户', '一个 CommandAGI 账户和一次身份验证。演示两者都不需要。'],
            ['T+0 · 02', '存入 USDC', '从我们结算的链上存入。转账到账即可使用。'],
            ['T+0 · 03', '买入股份', '选一家公司，设定数量，按价格结算。可以买到 1/100 股。'],
            ['T+0 · 04', '随时卖出', '把股份挂回订单簿。结算即时完成，USDC 可以随时提取。'],
        ],
        riskNo: 'VII', riskTitle: '在一切之前，先读这里。',
        risks: [
            '你投进初创公司的钱可能全部亏掉。大多数初创公司会失败。',
            '初创公司的股份可能很难卖出。你想卖时，可能没有买家。',
            '本页的每家公司、价格、订单和股东都是示例。Halvard Ropeworks 是虚构的。',
            '这里没有任何内容构成证券的出售要约、购买邀请或投资建议。',
            '上线后，VibeFund 只面向其注册地的合格投资者，在此改变之前不面向其他人。',
        ],
        riskReview: '披露草稿，待法律审阅。',
        faqNo: 'VIII', faqTitle: '常见问题',
        faq: [
            ['这是真实交易吗？', '不是。这些公司和价格是写在页面里的示例数据，交易只改变你浏览器存储里的数字。真实股份和真实结算的市场，要等所有者正式推出后才开放。'],
            ['谁可以投资？', 'VibeFund 注册所在司法辖区的合格投资者，在此改变之前不面向其他人。演示什么都不需要，请把它当作产品的样子，而不是一个账户。'],
            ['钱放在哪里？', '以 USDC 形式由持牌托管机构托管，在你名下的账户里。VibeFund 不会出借、质押或把它记在自己的账上。'],
            ['费用是多少？', '存取款免费，每笔交易收取 0.20%，确认前都会显示在交易单上。所有者会在上线前确定最终费率。'],
            ['初创公司如何上市？', '创始人设定融资额、投前估值和已发行股数。VibeFund 审核公司及其文件，然后以每股一个价格开放这一轮。写信到 <a href="mailto:hello@vibefund.pro">hello@vibefund.pro</a>。'],
        ],
        footPitch: '初创公司股份，报价精确到分。CommandAGI 旗下公司，vibefund.pro。',
        footBase: '© 2026 VibeFund。示例市场，模拟交易，不构成证券要约。',
        media: '本页的影片和版画是生成的图像，不是真实地点或文件的照片。',
        language: '语言', close: '关闭',
        nav: { book: '订单簿', market: '市场', portfolio: '对账单', raise: '融资', risk: '风险', questions: '问答' },
        navLabel: '栏目',
        plateAlt: '', ropeAlt: '一幅石码头上一卷绳索的版画，Halvard Ropeworks 示例股票的插图。',
        wheelsAlt: '',
    },
};

const mark = cls => `<svg class="${cls}" viewBox="-40 200 4417 1010" role="img" aria-label="VibeFund"><path d="${wordmark}"/><rect class="wordmark__rule" x="2290" y="1100" width="2047" height="22"/></svg>`;

const video = (name, label, L, { first = false } = {}) => `
    <video class="film" data-film muted loop playsinline preload="${first ? 'metadata' : 'none'}" poster="${L.up}media/${name}.poster.webp" aria-hidden="true" tabindex="-1">
      <source src="${L.up}media/${name}.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"'>
      <source src="${L.up}media/${name}.h264.mp4" type="video/mp4">
    </video>
    <button class="film-toggle" type="button" data-film-toggle aria-pressed="false" data-play="${L.play}" data-pause="${L.pause}">${L.pause}</button>`;

function page(L) {
    L.up = L.dir ? '../' : '';
    const langs = [['', 'en', 'English'], ['es/', 'es', 'Español'], ['zh/', 'zh-Hans', '简体中文']];
    const navItems = Object.entries(L.nav).map(([id, label], i) => `<a href="#${id}"><kbd>F${i + 1}</kbd>${label}</a>`).join('');
    return `<!doctype html>
<html lang="${L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self'; img-src 'self' data:; media-src 'self'; connect-src 'self' https://cloudflareinsights.com; font-src 'self'; form-action 'none'; base-uri 'none'">
<title>${L.title}</title>
<meta name="description" content="${L.description}">
<meta name="theme-color" content="#f4eedd" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0c1f1b" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
<meta property="og:title" content="${L.title}">
<meta property="og:description" content="${L.description}">
<meta property="og:type" content="website">
<meta property="og:image" content="https://vibefund.commandagi.app/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${L.up}mark.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${L.up}touch-icon.png">
<link rel="preload" href="${L.up}fonts/gloock.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${L.up}fonts/mona-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${L.up}media/plate.poster.webp" as="image" fetchpriority="high">
<link rel="stylesheet" href="${L.up}style.css">
${langs.map(([d, hl]) => `<link rel="alternate" hreflang="${hl}" href="/${d}">`).join('\n')}
</head>
<body>
<a class="skip" href="#book">${L.skip}</a>

<header class="mast">
  <a class="mast__brand" href="/${L.dir}">${mark('wordmark')}</a>
  <p class="mast__flag"><span aria-hidden="true">◆</span> ${L.sampleFlag}</p>
</header>

<main>
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__film">${video('plate', '', L, { first: true })}</div>
  <div class="hero__body">
    <h1 id="hero-title" class="hero__title">${L.heroTitle}</h1>
    <div class="hero__side">
      <p class="hero__lead">${L.heroLead}</p>
      <dl class="quote" aria-label="${L.heroQuote}">
        <div class="quote__name"><dt>HALV</dt><dd>${L.heroQuote}</dd></div>
        <div><dt>${L.last}</dt><dd class="num" data-quote="last">14.62</dd></div>
        <div><dt>${L.bid}</dt><dd class="num" data-quote="bid">14.58</dd></div>
        <div><dt>${L.ask}</dt><dd class="num" data-quote="ask">14.64</dd></div>
      </dl>
      <div class="acts">
        <a class="btn btn--deed" href="#book">${L.heroBid}</a>
        <a class="btn btn--line" href="#market">${L.heroMarket}</a>
      </div>
    </div>
  </div>
</section>

<section class="book" id="book" aria-labelledby="book-title">
  <header class="folio">
    <span class="folio__no" aria-hidden="true">${L.bookNo}</span>
    <p class="folio__kicker">${L.bookKicker}</p>
    <h2 id="book-title" class="folio__title">${L.bookTitle} <span class="tag">${L.bookFictional}</span></h2>
    <p class="folio__lead">${L.bookLead}</p>
  </header>
  <figure class="vignette">
    <img src="${L.up}media/rope-800.webp" srcset="${L.up}media/rope-800.webp 800w, ${L.up}media/rope-1600.webp 1600w" sizes="(min-width: 1100px) 30vw, 90vw" width="800" height="450" loading="lazy" decoding="async" alt="${L.ropeAlt}">
  </figure>
  <div class="book__grid">
    <div class="ladder" role="group" aria-labelledby="ladder-caption">
      <p id="ladder-caption" class="sr-only">${L.ladderCaption}</p>
      <div class="ladder__head" aria-hidden="true"><span>${L.price}</span><span>${L.size}</span></div>
      <ol class="ladder__asks" id="ladder-asks" aria-label="${L.asks}"></ol>
      <p class="ladder__mid"><span class="num" id="ladder-mid">14.61</span><span id="ladder-spread"></span></p>
      <ol class="ladder__bids" id="ladder-bids" aria-label="${L.bids}"></ol>
    </div>
    <form class="bid" id="bid-form" novalidate>
      <h3>${L.ticketTitle}</h3>
      <div class="field"><label for="bid-qty">${L.shares}</label><input id="bid-qty" type="number" min="1" step="1" value="600" inputmode="numeric"></div>
      <div class="field"><label for="bid-limit">${L.limit}</label><input id="bid-limit" type="number" min="0.01" step="0.01" value="14.70" inputmode="decimal"></div>
      <button class="btn btn--deed" type="submit">${L.place}</button>
      <h4 class="bid__fills-title">${L.fills}</h4>
      <ol class="bid__fills" id="bid-fills" aria-live="polite"><li class="empty">${L.noFills}</li></ol>
      <dl class="bid__sum" id="bid-sum">
        <div><dt>${L.filled}</dt><dd class="num" id="sum-filled">0</dd></div>
        <div><dt>${L.avgPrice}</dt><dd class="num" id="sum-avg">—</dd></div>
        <div><dt>${L.fee}</dt><dd class="num" id="sum-fee">0.00</dd></div>
        <div><dt>${L.total}</dt><dd class="num" id="sum-total">0.00</dd></div>
        <div><dt>${L.resting}</dt><dd class="num" id="sum-rest">0</dd></div>
      </dl>
    </form>
    <div class="cap">
      <h3>${L.capTitle}</h3>
      <div class="cap__bar" id="cap-bar" aria-hidden="true"></div>
      <table class="cap__table">
        <caption class="sr-only">${L.capCaption}</caption>
        <thead><tr><th scope="col">${L.holder}</th><th scope="col" class="num">${L.size}</th><th scope="col" class="num">${L.pctOwned}</th></tr></thead>
        <tbody id="cap-body"></tbody>
      </table>
    </div>
  </div>
  <p class="note">${L.bookNote}</p>
</section>

<section class="night" aria-labelledby="night-title">
  <div class="night__film">${video('night', '', L)}</div>
  <div class="night__body">
    <h2 id="night-title">${L.nightTitle}</h2>
    <p>${L.nightLead}</p>
    <button class="btn btn--line btn--on-dark" type="button" data-theme-toggle aria-pressed="false" data-on="${L.afterHoursOn}" data-off="${L.afterHoursOff}">${L.afterHoursOn}</button>
  </div>
</section>

<section class="market" id="market" aria-labelledby="market-title">
  <header class="folio folio--row">
    <span class="folio__no" aria-hidden="true">${L.marketNo}</span>
    <h2 id="market-title" class="folio__title">${L.marketTitle}</h2>
    <p class="folio__lead">${L.marketLead}</p>
  </header>
  <div class="floor">
    <div class="floor__table">
      <div class="controls">
        <label class="sr-only" for="filter">${L.search}</label>
        <input id="filter" type="search" placeholder="${L.searchPh}" autocomplete="off">
        <label class="sr-only" for="sort">${L.sortBy}</label>
        <select id="sort">
          <option value="change">${L.sortChange}</option>
          <option value="volume">${L.sortVolume}</option>
          <option value="price">${L.sortPrice}</option>
          <option value="name">${L.sortName}</option>
        </select>
      </div>
      <div class="table-scroll">
        <table class="quotes">
          <caption class="sr-only">${L.marketCaption}</caption>
          <thead><tr><th scope="col">${L.thCompany}</th><th scope="col" class="num">${L.thLast}</th><th scope="col" class="num">${L.th24}</th><th scope="col" class="num hide-sm">${L.thVol}</th><th scope="col" class="hide-sm">${L.th7}</th><th scope="col"><span class="sr-only">${L.thTrade}</span></th></tr></thead>
          <tbody id="market-body"></tbody>
        </table>
      </div>
      <noscript><p class="note">${L.noscript}</p></noscript>
    </div>
    <aside class="ticket" aria-labelledby="ticket-title">
      <h3 id="ticket-title"><span id="ticket-name">vibeCAD</span> <span class="ticket__sym" id="ticket-ticker">VCAD</span></h3>
      <p class="ticket__price num" id="ticket-price">41.20 USDC</p>
      <p class="ticket__hint">${L.ticketHint}</p>
      <div class="field">
        <label for="qty">${L.shares}</label>
        <div class="row"><input id="qty" type="number" min="1" step="1" value="10" inputmode="numeric"><button class="btn btn--small" type="button" id="qty-max">${L.max}</button></div>
      </div>
      <dl class="ticket__est">
        <div><dt id="est-label">${L.estCost}</dt><dd class="num" id="est-cost">0.00</dd></div>
        <div><dt id="fee-label">${L.fee}</dt><dd class="num" id="est-fee">0.00</dd></div>
        <div><dt id="total-label">${L.total}</dt><dd class="num" id="est-total">0.00</dd></div>
      </dl>
      <div class="ticket__acts">
        <button class="btn btn--deed" type="button" id="ticket-buy">${L.buy}</button>
        <button class="btn btn--line" type="button" id="ticket-sell">${L.sell}</button>
      </div>
      <p class="ticket__note" id="holdings-line"></p>
      <p class="ticket__note" id="sample-note">${L.sampleNote}</p>
    </aside>
  </div>
</section>

<section class="statement" id="portfolio" aria-labelledby="portfolio-title">
  <header class="folio folio--row">
    <span class="folio__no" aria-hidden="true">${L.accountNo}</span>
    <h2 id="portfolio-title" class="folio__title">${L.accountTitle}</h2>
    <p class="folio__lead">${L.accountLead}</p>
    <button class="btn btn--small" type="button" id="reset">${L.reset}</button>
  </header>
  <dl class="totals">
    <div><dt>${L.cash}</dt><dd class="num" id="stat-cash">25,000.00</dd></div>
    <div><dt>${L.positions}</dt><dd class="num" id="stat-holdings">0.00</dd></div>
    <div><dt>${L.value}</dt><dd class="num" id="stat-total">25,000.00</dd></div>
  </dl>
  <div class="table-scroll">
    <table class="holdings">
      <caption class="sr-only">${L.positionsCaption}</caption>
      <thead><tr><th scope="col">${L.thCompany}</th><th scope="col" class="num">${L.thShares}</th><th scope="col" class="num">${L.thAvg}</th><th scope="col" class="num">${L.thLast}</th><th scope="col" class="num">${L.thValue}</th><th scope="col" class="num">${L.thPl}</th></tr></thead>
      <tbody id="positions-body"></tbody>
    </table>
  </div>
</section>

<section class="raise" id="raise" aria-labelledby="raise-title">
  <header class="folio folio--row">
    <span class="folio__no" aria-hidden="true">${L.raiseNo}</span>
    <h2 id="raise-title" class="folio__title">${L.raiseTitle}</h2>
    <p class="folio__lead">${L.raiseLead}</p>
  </header>
  <div class="raise__grid">
    <div class="raise__terms">
      <h3>${L.terms}</h3>
      <div class="field"><label for="raise-amount">${L.raiseAmount}</label><input id="raise-amount" type="number" min="0" step="50000" value="2500000" inputmode="numeric"></div>
      <div class="field"><label for="raise-pre">${L.raisePre}</label><input id="raise-pre" type="number" min="0" step="500000" value="12000000" inputmode="numeric"></div>
      <div class="field"><label for="raise-shares">${L.raiseShares}</label><input id="raise-shares" type="number" min="1" step="100000" value="10000000" inputmode="numeric"></div>
      <p class="note">${L.raiseMail}</p>
    </div>
    <div class="raise__result">
      <h3>${L.raiseOut}</h3>
      <div class="split" aria-hidden="true">
        <div class="split__row"><span>${L.before}</span><div class="split__bar"><i class="split__a split__a--full"></i></div></div>
        <div class="split__row"><span>${L.after}</span><div class="split__bar"><i class="split__a" id="split-a"></i><i class="split__b" id="split-b"></i></div></div>
        <p class="split__key"><span class="key key--a"></span>${L.founders} <span class="key key--b"></span>${L.investors}</p>
      </div>
      <dl class="out" id="raise-out" aria-live="polite"></dl>
    </div>
  </div>
</section>

<section class="how" id="how" aria-labelledby="how-title">
  <figure class="how__plate"><img src="${L.up}media/wheels-800.webp" srcset="${L.up}media/wheels-800.webp 800w, ${L.up}media/wheels-1600.webp 1600w" sizes="(min-width: 900px) 50vw, 100vw" width="800" height="450" loading="lazy" decoding="async" alt="${L.wheelsAlt}"></figure>
  <div class="how__body">
    <header class="folio"><span class="folio__no" aria-hidden="true">${L.howNo}</span><h2 id="how-title" class="folio__title">${L.howTitle}</h2></header>
    <ol class="steps">${L.how.map(([n, h, p]) => `<li><span class="steps__t">${n}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="risk" id="risk" aria-labelledby="risk-title">
  <div class="risk__frame">
    <span class="folio__no" aria-hidden="true">${L.riskNo}</span>
    <h2 id="risk-title">${L.riskTitle}</h2>
    <ol class="risk__list">${L.risks.map(r => `<li>${r}</li>`).join('')}</ol>
    <p class="risk__review"><span aria-hidden="true">§</span> ${L.riskReview}</p>
  </div>
</section>

<section class="faq" id="questions" aria-labelledby="faq-title">
  <header class="folio folio--row"><span class="folio__no" aria-hidden="true">${L.faqNo}</span><h2 id="faq-title" class="folio__title">${L.faqTitle}</h2></header>
  <div class="faq__list">${L.faq.map(([q, a]) => `
    <details><summary>${q}</summary><p>${a}</p></details>`).join('')}
  </div>
</section>
</main>

<footer class="foot">
  <a class="foot__brand" href="/${L.dir}">${mark('wordmark wordmark--foot')}</a>
  <p class="foot__pitch">${L.footPitch}</p>
  <nav class="foot__links" aria-label="${L.navLabel}"><a href="#book">${L.nav.book}</a><a href="#market">${L.nav.market}</a><a href="#portfolio">${L.nav.portfolio}</a><a href="#raise">${L.nav.raise}</a><a href="mailto:hello@vibefund.pro">hello@vibefund.pro</a></nav>
  <p class="foot__base">${L.footBase}</p>
  <p class="foot__base">${L.media}</p>
  <noscript><nav class="lang-links" aria-label="${L.language}">${langs.map(([d, hl, n]) => `<a href="/${d}" hreflang="${hl}">${n}</a>`).join('')}</nav></noscript>
</footer>

<nav class="fkeys" aria-label="${L.navLabel}">
  <div class="fkeys__keys">${navItems}</div>
  <div class="fkeys__tape" aria-hidden="true"><div class="fkeys__track" id="ticker-track"></div></div>
  <button class="fkeys__btn" type="button" data-theme-toggle aria-pressed="false" aria-label="${L.afterHours}" data-on="${L.afterHours}" data-off="${L.afterHours}"><span aria-hidden="true">◐</span><span class="label">${L.afterHours}</span></button>
  <button type="button" class="fkeys__btn lang-btn" commandfor="lang-dialog" command="show-modal" aria-haspopup="dialog" aria-label="${L.language}" title="${L.language}"><span aria-hidden="true">A/<span lang="zh-Hans">文</span></span></button>
</nav>

<dialog id="lang-dialog" class="lang-dialog" aria-labelledby="lang-dialog-title" closedby="any">
  <div class="lang-dialog__box">
    <div class="lang-dialog__head">
      <h2 id="lang-dialog-title">${L.language}</h2>
      <form method="dialog"><button class="lang-dialog__close" aria-label="${L.close}">×</button></form>
    </div>
    <ul class="lang-list">
      ${langs.map(([d, hl, n]) => `<li><a href="/${d}" hreflang="${hl}"${hl === L.lang ? ' aria-current="true"' : ''}><span lang="${hl}">${n}</span></a></li>`).join('\n      ')}
    </ul>
  </div>
</dialog>

<div class="toast" id="toast" role="status" aria-live="polite" data-show="false"></div>
<script src="${L.up}app.js" defer></script>
</body>
</html>
`;
}

for (const L of Object.values(W)) {
    const dir = path.join(root, L.dir);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, 'index.html'), page(L));
}
console.log('wrote /, /es/, /zh/');
