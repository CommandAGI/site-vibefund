/**
 * VibeFund's generated media: fal stills and loops, then the encodes the page serves.
 * The key is read from the .env cascade at COMMANDAGI_ENV_ROOT (SVC__FAL__MAIN__API_KEY); it never reaches the client.
 *   COMMANDAGI_ENV_ROOT=… node redesign/media.mjs stills|loops|encode [name…]
 * Raw outputs land in redesign/.raw/ (not committed); what the page serves lands in media/. Each call is logged to
 * redesign/.raw/calls.jsonl; NOTES.md carries the prompts, models and the cost.
 */
import { readFileSync, writeFileSync, mkdirSync, appendFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const raw = path.join(here, '.raw');
const out = path.join(here, '..', 'media');
mkdirSync(raw, { recursive: true });
mkdirSync(out, { recursive: true });

function key() {
    const root = process.env.COMMANDAGI_ENV_ROOT;
    for (const f of ['.env.api', '.env']) {
        const file = path.join(root, f);
        if (!existsSync(file)) continue;
        const line = readFileSync(file, 'utf8').split('\n').find(l => l.startsWith('SVC__FAL__MAIN__API_KEY='));
        if (line) return line.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
    }
    throw Error('SVC__FAL__MAIN__API_KEY is not in the .env cascade');
}

const NO = 'No text, no letters, no numerals, no logos, no people, no faces, no hands.';
export const STILLS = {
    plate: `Extreme macro photograph of an intaglio-engraved guilloché rosette on a cream security-paper share certificate. Bottle-green ink lines stand in relief, a thin brass-foil rule crosses the frame, raking light from the left, very shallow depth of field, fine paper fibre, analog film grain, restrained and expensive. ${NO}`,
    rope: `Copper-plate line engraving, a vignette of a 19th-century share certificate: a coil of tarred ship rope and a plain unmarked wooden pulley block resting on a stone quay, harbour water in fine horizontal hatching, crosshatched shadows, printed in bottle-green ink on warm cream paper, wide margins of plain paper. ${NO}`,
    night: `Night still life on a dark desk: a short stack of closed ledgers seen from the side, plain bottle-green cloth spines with no lettering, page edges gilded, a brass ruler with no markings laid on top, a green glass banker's lamp casting a warm pool of light, deep shadows, macro lens, film grain, quiet and precise. ${NO}`,
    wheels: `Macro photograph of a stack of plain brass counting discs and a brass balance scale pan on cream felt, soft daylight, shallow depth of field, film grain, precise and calm. Every surface is blank and unmarked: ${NO}`,
};
export const LOOPS = {
    plate: { from: 'plate', prompt: 'Very slow lateral camera drift across the engraved certificate, the raking light sweeps gently over the ink relief, focus breathes slightly. Calm, continuous, no cuts, nothing appears or disappears.' },
    night: { from: 'night', prompt: 'Slow push-in toward the ledger under the lamp, a few ruled pages settle and turn slowly by a draught, the warm light stays steady with no flicker. Calm, continuous, no cuts, no hands.' },
};

const MODELS = { still: 'fal-ai/flux-pro/v1.1-ultra', loop: 'fal-ai/kling-video/v2.5-turbo/pro/image-to-video' };

async function fal(model, input) {
    const auth = { Authorization: `Key ${key()}`, 'content-type': 'application/json' };
    const q = await (await fetch(`https://queue.fal.run/${model}`, { method: 'POST', headers: auth, body: JSON.stringify(input) })).json();
    if (!q.status_url) throw Error(`fal refused: ${JSON.stringify(q).slice(0, 300)}`);
    for (;;) {
        await new Promise(r => setTimeout(r, 4000));
        const s = await (await fetch(q.status_url, { headers: auth })).json();
        if (s.status === 'COMPLETED') break;
        if (s.status === 'FAILED' || s.error) throw Error(`fal failed: ${JSON.stringify(s).slice(0, 300)}`);
    }
    return (await fetch(q.response_url, { headers: auth })).json();
}

const save = async (url, file) => writeFileSync(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
const log = row => appendFileSync(path.join(raw, 'calls.jsonl'), JSON.stringify({ at: new Date().toISOString(), ...row }) + '\n');

async function still(name) {
    const input = { prompt: STILLS[name], aspect_ratio: '16:9', output_format: 'png', raw: true, safety_tolerance: '2' };
    const r = await fal(MODELS.still, input);
    await save(r.images[0].url, path.join(raw, `${name}.png`));
    log({ kind: 'still', name, model: MODELS.still, prompt: STILLS[name], seed: r.seed, usd: 0.06 });
    console.log(`still ${name}: ok`);
}

async function loop(name) {
    const { from, prompt } = LOOPS[name];
    const image = `data:image/png;base64,${readFileSync(path.join(raw, `${from}.png`)).toString('base64')}`;
    const r = await fal(MODELS.loop, { prompt, image_url: image, duration: '5', negative_prompt: 'text, letters, watermark, people, hands, flicker, flashing, cuts' });
    await save(r.video.url, path.join(raw, `${name}.mp4`));
    log({ kind: 'loop', name, model: MODELS.loop, prompt, seconds: 5, usd: 0.35 });
    console.log(`loop ${name}: ok`);
}

/** The serving encodes: AV1 and H.264 loops (palindromic, so the loop has no seam), a poster, AVIF-free WebP stills. */
function encode(ffmpeg) {
    const ff = (...a) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...a]);
    for (const name of Object.keys(LOOPS)) {
        const src = path.join(raw, `${name}.mp4`);
        if (!existsSync(src)) continue;
        const pal = '[0:v]scale=1280:-2:flags=lanczos,fps=24,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]';
        ff('-i', src, '-filter_complex', pal, '-map', '[v]', '-an', '-c:v', 'libaom-av1', '-crf', '40', '-b:v', '0', '-cpu-used', '6', '-row-mt', '1', '-pix_fmt', 'yuv420p', path.join(out, `${name}.av1.mp4`));
        ff('-i', src, '-filter_complex', pal, '-map', '[v]', '-an', '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(out, `${name}.h264.mp4`));
        ff('-i', src, '-vf', 'scale=1280:-2', '-frames:v', '1', '-c:v', 'libwebp', '-quality', '72', path.join(out, `${name}.poster.webp`));
    }
    // The engraving and the discs are served as plates; the other two stills are only the films' first frames.
    for (const name of ['rope', 'wheels']) {
        const src = path.join(raw, `${name}.png`);
        if (!existsSync(src)) continue;
        for (const w of [1600, 800])
            ff('-i', src, '-vf', `scale=${w}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '74', path.join(out, `${name}-${w}.webp`));
    }
}

const [cmd, ...names] = process.argv.slice(2);
if (cmd === 'stills') for (const n of names.length ? names : Object.keys(STILLS)) await still(n);
else if (cmd === 'loops') await Promise.all((names.length ? names : Object.keys(LOOPS)).map(loop));
else if (cmd === 'encode') encode(process.env.FFMPEG ?? 'ffmpeg');
else console.log('node redesign/media.mjs stills|loops|encode [name…]');
