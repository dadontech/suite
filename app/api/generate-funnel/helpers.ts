import { PALETTES } from './palettes';
import { pickImage } from './image-pools';
import { Palette } from './types';
import { GenerativeModel } from '@google/generative-ai';

const INITIAL_DELAY = 1000;

export function detectNiche(productTitle: string): string {
  const t = productTitle.toLowerCase();
  if (t.match(/health|supplement|peptide|vitamin|fitness|weight|diet|wellness|muscle|protein/)) return 'health';
  if (t.match(/invest|stock|trade|crypto|forex|wealth|gold|finance|money|retire/)) return 'finance';
  if (t.match(/software|saas|app|platform|tool|crm|tech|ai|automation|code/)) return 'tech';
  if (t.match(/course|coaching|training|masterclass|program|academy|learn|mentor/)) return 'education';
  if (t.match(/marketing|affiliate|funnel|leads|sales|business|agency/)) return 'business';
  return 'generic';
}

export function pickRandom<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export function selectPalette(funnelType: string, productTitle: string, seed: number): Palette {
  const t = productTitle.toLowerCase();
  const allKeys = Object.keys(PALETTES);

  if (t.match(/health|supplement|peptide|vitamin|fitness|diet|wellness/)) {
    const opts = ['health-clean', 'forest-deep', 'modern-minimal'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (t.match(/invest|stock|trade|gold|finance|wealth|luxury/)) {
    const opts = ['luxury-dark', 'warm-authority', 'modern-minimal'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (t.match(/software|saas|app|platform|tool|tech|ai/)) {
    const opts = ['editorial-cool', 'slate-pro', 'modern-minimal', 'ocean-depth'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (t.match(/course|coaching|training|masterclass|academy/)) {
    const opts = ['warm-authority', 'modern-minimal', 'rose-editorial'];
    return PALETTES[opts[seed % opts.length]];
  }

  if (funnelType === 'flash') {
    const opts = ['bold-orange', 'luxury-dark', 'warm-authority'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (funnelType === 'vsl') {
    const opts = ['modern-minimal', 'slate-pro', 'editorial-cool'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (funnelType === 'webinar') {
    const opts = ['warm-authority', 'editorial-cool', 'luxury-dark'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (funnelType === 'quiz') {
    const opts = ['ocean-depth', 'slate-pro', 'editorial-cool'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (funnelType === 'bridge') {
    const opts = ['bold-orange', 'warm-authority', 'modern-minimal'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (funnelType === 'review_bonus') {
    const opts = ['health-clean', 'forest-deep', 'warm-authority'];
    return PALETTES[opts[seed % opts.length]];
  }
  if (funnelType === 'Discount') {
    const opts = ['bold-orange', 'luxury-dark', 'warm-authority'];
    return PALETTES[opts[seed % opts.length]];
  }

  return PALETTES[allKeys[seed % allKeys.length]];
}

export async function generateWithImagen3(apiKey: string, prompt: string): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 40000);
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
      {
        method: 'POST',
        signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: { sampleCount: 1, aspectRatio: '16:9', safetySetting: 'block_only_high', personGeneration: 'dont_allow' },
        }),
      },
    );
    clearTimeout(t);
    if (!res.ok) { console.warn(`Imagen3 HTTP ${res.status}`); return null; }
    const data = await res.json() as { predictions?: Array<{ bytesBase64Encoded?: string; mimeType?: string }> };
    const p = data.predictions?.[0];
    return p?.bytesBase64Encoded ? `data:${p.mimeType || 'image/png'};base64,${p.bytesBase64Encoded}` : null;
  } catch (e) {
    console.warn('Imagen3:', e instanceof Error ? e.message : e);
    return null;
  }
}

export async function generateWithRetry(model: GenerativeModel, prompt: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      return (await (await model.generateContent(prompt)).response).text();
    } catch (e: unknown) {
      const quota = typeof e === 'object' && e !== null && 'status' in e && (e.status === 429 || e.status === 503);
      if (quota && i < retries - 1) {
        await new Promise(r => setTimeout(r, INITIAL_DELAY * 2 ** i));
        continue;
      }
      throw e;
    }
  }
  throw new Error('All retries exhausted');
}