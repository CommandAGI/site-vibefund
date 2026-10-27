"""Look at the page: screenshots at 1440, 768, 390, 320 and under reduced motion, and the signature run through its
visible form. Writes redesign/.shots/. Fails on a console error, a sideways scroll, a failed request, or a bid
that does not change the cap table.
    python redesign/shoot.py [base-url]    (default http://127.0.0.1:4731/)"""
import asyncio, sys, os
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4731/'
OUT = os.path.join(os.path.dirname(__file__), '.shots')
os.makedirs(os.path.join(OUT, 'full'), exist_ok=True)
problems = []

async def look(browser, path, width, height, motion='no-preference', tag=None, scheme='light'):
    ctx = await browser.new_context(viewport={'width': width, 'height': height}, reduced_motion=motion, color_scheme=scheme)
    page = await ctx.new_page()
    page.on('console', lambda m: m.type == 'error' and problems.append(f'{tag}: console {m.text}'))
    page.on('pageerror', lambda e: problems.append(f'{tag}: {e}'))
    page.on('requestfailed', lambda r: 'cloudflareinsights' not in r.url and 'ERR_ABORTED' not in (r.failure or '') and problems.append(f'{tag}: failed {r.url} {r.failure}'))
    page.on('response', lambda r: r.status >= 400 and problems.append(f'{tag}: {r.status} {r.url}'))
    await page.goto(BASE + path, wait_until='load')
    await page.wait_for_timeout(1500)
    tag = tag or f'{path or "en"}-{width}'
    await page.screenshot(path=f'{OUT}/{tag}.jpg', type='jpeg', quality=62)
    over = await page.evaluate('document.documentElement.scrollWidth - innerWidth')
    if over > 0: problems.append(f'{tag}: {over}px sideways')
    # Each section as a visitor meets it: scrolled to, in the viewport, with its scroll-driven state settled.
    for sid in ['book', 'market', 'portfolio', 'raise', 'how', 'risk', 'questions']:
        await page.evaluate(f"document.getElementById('{sid}').scrollIntoView({{block: 'start', behavior: 'instant'}})")
        await page.evaluate(f"scrollBy(0, {height // 4})"); await page.wait_for_timeout(450)
        await page.screenshot(path=f'{OUT}/full/{tag}-{sid}.jpg', type='jpeg', quality=55)
    await page.evaluate("document.querySelector('.night').scrollIntoView({block: 'start', behavior: 'instant'})"); await page.wait_for_timeout(450)
    await page.screenshot(path=f'{OUT}/full/{tag}-night.jpg', type='jpeg', quality=55)
    await page.evaluate('scrollTo(0,0)'); await page.wait_for_timeout(200)
    return ctx, page

async def signature(browser, width):
    ctx, page = await look(browser, '', width, 900, tag=f'bid-{width}')
    await page.evaluate("localStorage.clear()"); await page.reload(); await page.wait_for_timeout(500)
    await page.locator('#book').scroll_into_view_if_needed()
    await page.fill('#bid-qty', '1500'); await page.fill('#bid-limit', '14.70')
    await page.get_by_role('button', name='Place sample bid').click()
    await page.wait_for_timeout(2200)
    you = await page.locator('#cap-body tr.is-you td.num').first.inner_text()
    filled = await page.inner_text('#sum-filled'); rest = await page.inner_text('#sum-rest')
    # 420 + 310 + 640 asks at or under 14.70 fill; 130 rest at the limit.
    if (you, filled, rest) != ('1,370', '1,370', '130'): problems.append(f'bid: you={you} filled={filled} rest={rest}')
    held = await page.locator('#positions-body tr[data-ticker="HALV"]').count()
    if held != 1: problems.append('bid: HALV is not in the statement')
    await page.locator('.book__grid').screenshot(path=f'{OUT}/bid-after-{width}.jpg', type='jpeg', quality=70)
    # After hours, by the bar's key.
    await page.locator('.fkeys [data-theme-toggle]').click(); await page.wait_for_timeout(700)
    if await page.evaluate('document.documentElement.dataset.theme') != 'night': problems.append('theme: no night')
    await page.screenshot(path=f'{OUT}/night-{width}.jpg', type='jpeg', quality=62)
    await page.locator('#market').scroll_into_view_if_needed(); await page.wait_for_timeout(400)
    await page.screenshot(path=f'{OUT}/night-market-{width}.jpg', type='jpeg', quality=62)
    await ctx.close()

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in [(1440, 900), (768, 1024), (390, 844), (320, 640)]:
            ctx, _ = await look(b, '', w, h); await ctx.close()
        for path in ['es/', 'zh/']:
            ctx, _ = await look(b, path, 390, 844, tag=f'{path[:-1]}-390'); await ctx.close()
        ctx, page = await look(b, '', 1440, 900, motion='reduce', tag='reduced-1440')
        playing = await page.evaluate("[...document.querySelectorAll('video')].some(v => !v.paused)")
        if playing: problems.append('reduced motion: a film plays')
        await ctx.close()
        ctx, page = await look(b, '', 390, 844, motion='reduce', tag='reduced-390'); await ctx.close()
        await signature(b, 1440)
        await signature(b, 390)
        await b.close()
    print('\n'.join(problems) or 'ok: no console error, no sideways scroll, the bid fills and moves the cap table')
    sys.exit(1 if problems else 0)

asyncio.run(main())
