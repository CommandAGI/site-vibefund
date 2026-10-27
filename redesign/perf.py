"""LCP and CLS of the live page on throttled 4G (Lighthouse's: 150 ms RTT, 1.6 Mbit/s down, 750 kbit/s up) and 4x CPU,
from a cold cache, at 390 and 1440.  python redesign/perf.py [url]"""
import asyncio, sys
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'https://vibefund.commandagi.app/'
OBS = """window.__lcp = 0; window.__cls = 0;
new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });"""
async def run(p, w, h):
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width': w, 'height': h}); page = await ctx.new_page()
    cdp = await ctx.new_cdp_session(page)
    await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled', {'cacheDisabled': True})
    await cdp.send('Network.emulateNetworkConditions', {'offline': False, 'latency': 150, 'downloadThroughput': 1.6e6 / 8, 'uploadThroughput': 750e3 / 8})
    await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 4})
    await page.add_init_script(OBS)
    await page.goto(URL, wait_until='load'); await page.wait_for_timeout(4000)
    lcp, cls = await page.evaluate('[window.__lcp, window.__cls]')
    await b.close(); return lcp, cls
async def main():
    async with async_playwright() as p:
        for w, h in [(390, 844), (1440, 900)]:
            lcp, cls = await run(p, w, h); print(f'{w}: LCP {lcp/1000:.2f} s, CLS {cls:.3f}')
asyncio.run(main())
