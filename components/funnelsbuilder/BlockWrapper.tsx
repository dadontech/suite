'use client'

import React, { useState, useEffect } from "react";
import {
  ArrowUp, ArrowDown, Copy, Trash2, GripVertical,
  Star, ChevronDown, Shield, Play, Check, X,
  TrendingUp, Users, Award, Clock, Target,
  Lightbulb, Heart, Zap, CheckCircle2, Quote,
  Flame, Lock, Sparkles, ArrowRight, Timer,
} from 'lucide-react';

// ─── Font Injection ───────────────────────────────────────────────────────────
let _fontsInjected = false;
function injectFonts() {
  if (_fontsInjected || typeof document === 'undefined') return;
  _fontsInjected = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap';
  document.head.appendChild(link);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Palette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  dark: string;
  text: string;
  textMuted: string;
  border: string;
}

interface Block {
  id: string;
  type: string;
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  body?: string;
  cta?: string;
  ctaLink?: string;
  items?: unknown[];
  proItems?: unknown[];
  conItems?: unknown[];
  leftTitle?: string;
  rightTitle?: string;
  rating?: unknown;
  ratingCount?: string;
  author?: string;
  authorTitle?: string;
  badge?: string;
  minutes?: unknown;
  imageUrl?: string;
  aspectRatio?: string;
  alt?: string;
  label?: string;
  sublabel?: string;
  content?: string;
  columns?: Array<{ icon?: string; title: string; body: string }>;
  testimonials?: Array<{ quote: string; author: string; title?: string; stars?: unknown }>;
  stats?: Array<{ value: string; label: string }>;
  [key: string]: unknown;
}

// ─── Safe coercions ───────────────────────────────────────────────────────────

const safeNum = (v: unknown, fallback: number): number => {
  const n = parseFloat(String(v ?? fallback));
  return isNaN(n) ? fallback : n;
};

const safeStr = (v: unknown): string => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map(x => String(x ?? '')).join(' ');
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>;
    return String(o.text ?? o.label ?? o.value ?? o.item ?? JSON.stringify(v));
  }
  return String(v);
};

const parseQA = (raw: unknown): { q: string; a: string } => {
  if (raw !== null && typeof raw === 'object' && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>;
    return { q: String(o.q ?? o.question ?? o.Q ?? ''), a: String(o.a ?? o.answer ?? o.A ?? '') };
  }
  if (Array.isArray(raw)) return { q: String(raw[0] ?? ''), a: String(raw[1] ?? '') };
  const s = String(raw ?? '');
  const sep = s.indexOf(' | A: ');
  if (sep !== -1) return { q: s.slice(s.startsWith('Q: ') ? 3 : 0, sep).trim(), a: s.slice(sep + 6).trim() };
  const parts = s.split('|');
  if (parts.length >= 2) return { q: parts[0].trim(), a: parts[1].trim() };
  return { q: s, a: '' };
};

const clean = (v: unknown) =>
  safeStr(v).replace(/^[\p{Emoji}\s✓✅✕×✗✘•\-<>]+/u, '').trim();

// ─── Palette Context ──────────────────────────────────────────────────────────

const DEFAULT_PALETTE: Palette = {
  name: 'Modern Minimal', primary: '#111111', secondary: '#444444', accent: '#111111',
  bg: '#FAFAFA', surface: '#FFFFFF', surfaceAlt: '#F4F4F4', dark: '#000000',
  text: '#111111', textMuted: '#777777', border: 'rgba(0,0,0,0.09)',
};

const PaletteContext = React.createContext<Palette>(DEFAULT_PALETTE);
export const PaletteProvider = ({ palette, children }: { palette: Palette; children: React.ReactNode }) => {
  useEffect(() => { injectFonts(); }, []);
  return <PaletteContext.Provider value={palette}>{children}</PaletteContext.Provider>;
};
const usePalette = () => React.useContext(PaletteContext);

// ─── Font helpers ─────────────────────────────────────────────────────────────
const DISPLAY = `'Oswald', Impact, 'Arial Black', sans-serif`;
const SANS = `'Open Sans', 'Helvetica Neue', Arial, sans-serif`;

// ─── Editable text ────────────────────────────────────────────────────────────

function E({ v, p = '', onChange, style = {}, html = false }: {
  v?: string; p?: string; onChange: (s: string) => void;
  style?: React.CSSProperties; html?: boolean;
}) {
  if (html && v) {
    return (
      <div contentEditable suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: v }}
        onBlur={e => onChange(e.currentTarget.innerHTML)}
        onClick={e => e.stopPropagation()}
        style={{ outline: 'none', cursor: 'text', ...style }} />
    );
  }
  return (
    <div contentEditable suppressContentEditableWarning
      onBlur={e => onChange(e.currentTarget.innerText)}
      onClick={e => e.stopPropagation()}
      style={{ outline: 'none', cursor: 'text', ...style }}>
      {v || ''}
    </div>
  );
}

// ─── Premium Article CSS — Direct-response editorial style ────────────────────
function injectPremiumStyles(accent: string) {
  if (typeof document === 'undefined') return;
  const id = 'bw-premium-styles';
  const existing = document.getElementById(id);
  if (existing) { existing.remove(); }
  const el = document.createElement('style');
  el.id = id;
  el.textContent = `
    .bw-body { line-height: 1.85; }
    .bw-body p {
      font-family: 'Open Sans', Arial, sans-serif;
      font-size: 16px;
      color: #1a1a1a;
      line-height: 1.85;
      margin: 0 0 18px;
    }
    .bw-body h2 {
      font-family: 'Oswald', Impact, sans-serif;
      font-size: clamp(20px, 2.8vw, 28px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: #0a0a0a;
      margin: 36px 0 16px;
      padding-bottom: 10px;
      border-bottom: 3px solid ${accent};
    }
    .bw-body h3 {
      font-family: 'Oswald', Impact, sans-serif;
      font-size: clamp(17px, 2.2vw, 22px);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: #1a1a1a;
      margin: 28px 0 12px;
    }
    .bw-body strong {
      font-weight: 700;
      color: #0a0a0a;
    }
    .bw-body ul {
      padding-left: 0;
      list-style: none;
      margin: 0 0 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .bw-body ul li {
      font-family: 'Open Sans', Arial, sans-serif;
      font-size: 15px;
      color: #1a1a1a;
      line-height: 1.65;
      padding-left: 28px;
      position: relative;
    }
    .bw-body ul li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 6px;
      width: 14px;
      height: 14px;
      background: ${accent};
      border-radius: 3px;
    }
    .bw-body ol {
      padding-left: 0;
      list-style: none;
      counter-reset: cf-counter;
      margin: 0 0 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .bw-body ol li {
      counter-increment: cf-counter;
      font-family: 'Open Sans', Arial, sans-serif;
      font-size: 15px;
      color: #1a1a1a;
      line-height: 1.65;
      padding-left: 36px;
      position: relative;
    }
    .bw-body ol li::before {
      content: counter(cf-counter);
      position: absolute;
      left: 0;
      top: 1px;
      width: 22px;
      height: 22px;
      background: ${accent};
      color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Oswald', sans-serif;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      line-height: 22px;
    }
    [contenteditable]:focus { outline: 2px solid ${accent}; outline-offset: 2px; border-radius: 3px; }
  `;
  document.head.appendChild(el);
}
// ─── Shared helpers ───────────────────────────────────────────────────────────

function BodyHTML({ body, onChange, pal }: { body?: string; onChange: (v: string) => void; pal: Palette }) {
  useEffect(() => { injectPremiumStyles(pal.accent); }, [pal.accent]);
  const raw = body || '';
  const isHtml = /<[a-z][\s\S]*>/i.test(raw);
  if (isHtml) {
    return <div contentEditable suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: raw }}
      onBlur={e => onChange(e.currentTarget.innerHTML)}
      onClick={e => e.stopPropagation()}
      className="bw-body" style={{ outline: 'none', cursor: 'text' }} />;
  }
  const paras = raw.split(/\n\n+/).filter(Boolean);
  return <div contentEditable suppressContentEditableWarning
    onBlur={e => onChange(e.currentTarget.innerText)}
    onClick={e => e.stopPropagation()}
    className="bw-body" style={{ outline: 'none', cursor: 'text' }}>
    {paras.map((t, i) => <p key={i}>{t}</p>)}
  </div>;
}

function StarRow({ count, accent, size = 16 }: { count: number; accent: string; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} fill={i <= count ? accent : '#e0e0e0'} color={i <= count ? accent : '#e0e0e0'} strokeWidth={0} />
      ))}
    </div>
  );
}

// Noise texture overlay (pure CSS — no external deps)
const NOISE_STYLE: React.CSSProperties = {
  position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundSize: '256px 256px', borderRadius: 'inherit', opacity: 0.6,
};

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
  zap: <Zap size={22}/>, target: <Target size={22}/>, users: <Users size={22}/>,
  award: <Award size={22}/>, clock: <Clock size={22}/>, trending: <TrendingUp size={22}/>,
  heart: <Heart size={22}/>, lightbulb: <Lightbulb size={22}/>,
  shield: <Shield size={22}/>, check: <CheckCircle2 size={22}/>,
};

// ══════════════════════════════════════════════════════════════════════════════
//  PREMIUM BLOCK RENDERERS
// ══════════════════════════════════════════════════════════════════════════════

// ── IMAGE ─────────────────────────────────────────────────────────────────────
function ImageBlock({ block: b }: { block: Block }) {
  const pal = usePalette();
  if (b.imageUrl) {
    return (
      <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: b.aspectRatio || '21/9', position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.18)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={b.imageUrl} alt={b.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35))', pointerEvents:'none' }} />
      </div>
    );
  }
  return (
    <div style={{ borderRadius: 20, aspectRatio: b.aspectRatio || '21/9', background:`linear-gradient(135deg,${pal.primary}18,${pal.accent}22)`, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:10 }}>
      <Play size={28} color={pal.textMuted} />
    </div>
  );
}

// ── ATTENTION BAR — ClickFunnels style ────────────────────────────────────────
function AttentionBarBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{
      background: pal.accent,
      padding: '12px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      <span style={{ color:'#fff', fontSize:13, fontWeight:800, letterSpacing:'0.06em', textTransform:'uppercase', fontFamily:SANS }}>★</span>
      <E v={b.headline} p="Announcement text..." onChange={v => u({ headline: v })}
        style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#fff', textAlign:'center', letterSpacing:'0.02em' }} />
      <span style={{ color:'#fff', fontSize:13, fontWeight:800, letterSpacing:'0.06em', textTransform:'uppercase', fontFamily:SANS }}>★</span>
    </div>
  );
}

// ── ARTICLE (5 Premium Editorial Variants) ────────────────────────────────────
function ArticleBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const variant = (b.variant as string) || 'classic';
  const initials = (b.author || 'A').split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0,2);

  const AuthorRow = ({ dark = false }: { dark?: boolean }) => (
    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
      <div style={{ width:44, height:44, borderRadius:'50%', flexShrink:0, background:`linear-gradient(135deg,${pal.accent},${pal.secondary})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SANS, fontSize:13, fontWeight:800, color:'#fff', boxShadow:`0 4px 14px ${pal.accent}44` }}>{initials}</div>
      <div>
        <E v={b.author} p="Author Name" onChange={v=>u({author:v})} style={{ fontFamily:SANS, fontSize:14, fontWeight:700, color: dark ? 'rgba(255,255,255,0.88)' : '#0a0a0a' }} />
        <E v={b.authorTitle} p="Date · Read time" onChange={v=>u({authorTitle:v})} style={{ fontFamily:SANS, fontSize:12, color: dark ? 'rgba(255,255,255,0.45)' : pal.textMuted, display:'block', marginTop:2 }} />
      </div>
    </div>
  );

  const ReadTime = () => {
    const t = (b.authorTitle || '8 min read');
    const m = t.match(/(\d+)\s*min/);
    const mins = m ? m[1] : '8';
    return (
      <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:pal.accent }} />
          <span style={{ fontFamily:SANS, fontSize:11, color:pal.textMuted, fontWeight:600 }}>{mins} MIN READ</span>
        </div>
        <E v={b.authorTitle} p="March 2026 · 9 min read" onChange={v=>u({authorTitle:v})} style={{ fontFamily:SANS, fontSize:11, color:pal.textMuted, fontWeight:600 }} />
      </div>
    );
  };

  // ── Variant: nyt — New York Times editorial ──────────────────────────────
  if (variant === 'nyt') {
    return (
      <div style={{ paddingBottom:52, borderBottom:`3px solid #0a0a0a`, marginBottom:8 }}>
        {(b.eyebrow||b.badge) && (
          <div style={{ marginBottom:18 }}>
            <span style={{ fontFamily:SANS, fontSize:11, fontWeight:900, letterSpacing:'0.18em', textTransform:'uppercase', color:pal.accent, borderBottom:`2px solid ${pal.accent}`, paddingBottom:3 }}>{b.eyebrow||b.badge}</span>
          </div>
        )}
        <E v={b.headline} p="Article headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(36px,5.5vw,68px)', fontWeight:900, lineHeight:1.02, letterSpacing:'-0.04em', color:'#0a0a0a', display:'block', marginBottom:20 }} />
        {b.subheadline && (
          <E v={b.subheadline} p="Deck..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:20, fontWeight:400, lineHeight:1.65, color:'#333', display:'block', marginBottom:28, borderLeft:`3px solid ${pal.accent}`, paddingLeft:16 }} />
        )}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, paddingTop:18, borderTop:'1px solid #ccc' }}>
          <AuthorRow />
          <ReadTime />
        </div>
      </div>
    );
  }

  // ── Variant: magazine — Forbes/Wired big-feature ─────────────────────────
  if (variant === 'magazine') {
    return (
      <div style={{ paddingBottom:52 }}>
        {(b.eyebrow||b.badge) && (
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
            <div style={{ width:40, height:3, background:`linear-gradient(90deg,${pal.accent},${pal.secondary})`, borderRadius:2 }} />
            <span style={{ fontFamily:SANS, fontSize:10, fontWeight:900, letterSpacing:'0.2em', textTransform:'uppercase', color:pal.accent }}>{b.eyebrow||b.badge}</span>
            <div style={{ flex:1, height:1, background:`${pal.accent}20` }} />
          </div>
        )}
        <div style={{ display:'grid', gridTemplateColumns:'3fr 1fr', gap:48, alignItems:'start' }}>
          <div>
            <E v={b.headline} p="Article headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(34px,5vw,64px)', fontWeight:900, lineHeight:1.04, letterSpacing:'-0.038em', color:'#0a0a0a', display:'block', marginBottom:20 }} />
            {b.subheadline && (
              <E v={b.subheadline} p="Deck..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:18, fontWeight:400, lineHeight:1.72, color:pal.textMuted, display:'block', marginBottom:28 }} />
            )}
            <div style={{ paddingTop:20, borderTop:`1px solid ${pal.border}` }}><AuthorRow /></div>
          </div>
          <div style={{ paddingTop:8 }}>
            <div style={{ background:pal.surfaceAlt, borderRadius:16, padding:'20px 18px', border:`1px solid ${pal.border}` }}>
              <p style={{ fontFamily:SANS, fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:pal.textMuted, marginBottom:10 }}>In This Review</p>
              {['Background & Context','Real Test Results','Pros vs Competitors','Who Should Buy This','Final Verdict & Price'].map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 0', borderBottom:`1px solid ${pal.border}` }}>
                  <span style={{ fontFamily:SANS, fontSize:10, fontWeight:800, color:pal.accent, width:16, flexShrink:0 }}>{String(i+1).padStart(2,'0')}</span>
                  <span style={{ fontFamily:SANS, fontSize:12, color:'#0a0a0a', lineHeight:1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Variant: dark — cinematic inverted ───────────────────────────────────
  if (variant === 'dark') {
    return (
      <div style={{ borderRadius:24, padding:'56px 64px 52px', position:'relative', overflow:'hidden', background:`linear-gradient(150deg,#030303,${pal.dark})`, marginBottom:8 }}>
        <div style={{ position:'absolute', top:-60, left:'20%', width:500, height:400, borderRadius:'50%', background:`radial-gradient(circle,${pal.accent}20 0%,transparent 70%)`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize:'48px 48px', pointerEvents:'none' }} />
        <div style={NOISE_STYLE} />
        {(b.eyebrow||b.badge) && (
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${pal.accent}20`, border:`1px solid ${pal.accent}35`, borderRadius:100, padding:'5px 16px', marginBottom:28, position:'relative', zIndex:2 }}>
            <Sparkles size={10} color={pal.accent} />
            <span style={{ fontFamily:SANS, fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:pal.accent }}>{b.eyebrow||b.badge}</span>
          </div>
        )}
        <E v={b.headline} p="Article headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(32px,5vw,60px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.036em', color:'#FFFFFF', display:'block', marginBottom:20, position:'relative', zIndex:2, maxWidth:760 }} />
        {b.subheadline && (
          <E v={b.subheadline} p="Deck..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:18, fontWeight:400, lineHeight:1.7, color:'rgba(255,255,255,0.5)', display:'block', marginBottom:36, maxWidth:600, position:'relative', zIndex:2 }} />
        )}
        <div style={{ paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.1)', position:'relative', zIndex:2, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <AuthorRow dark />
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:pal.accent }} />
            <span style={{ fontFamily:SANS, fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em', textTransform:'uppercase' }}><E v={b.authorTitle} p="March 2026 · 9 min read" onChange={v=>u({authorTitle:v})} style={{ color:'rgba(255,255,255,0.35)' }} /></span>
          </div>
        </div>
      </div>
    );
  }

  // ── Variant: minimal — clean stripped-back ───────────────────────────────
  if (variant === 'minimal') {
    return (
      <div style={{ paddingBottom:48, borderBottom:`1px solid ${pal.border}` }}>
        {(b.eyebrow||b.badge) && (
          <span style={{ fontFamily:SANS, fontSize:10, fontWeight:800, letterSpacing:'0.16em', textTransform:'uppercase', color:pal.textMuted, display:'block', marginBottom:20 }}>{b.eyebrow||b.badge}</span>
        )}
        <E v={b.headline} p="Article headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(36px,6vw,72px)', fontWeight:900, lineHeight:1.0, letterSpacing:'-0.042em', color:'#0a0a0a', display:'block', marginBottom:28 }} />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          {b.subheadline && (
            <E v={b.subheadline} p="Deck..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:17, fontWeight:400, lineHeight:1.7, color:pal.textMuted, flex:1, minWidth:240 }} />
          )}
          <div style={{ flexShrink:0 }}><AuthorRow /></div>
        </div>
      </div>
    );
  }

  // ── Variant: classic (default) ───────────────────────────────────────────
  return (
    <div style={{ paddingBottom:48 }}>
      {(b.eyebrow||b.badge) && (
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:28 }}>
          <div style={{ width:28, height:2, background:pal.accent, borderRadius:2 }} />
          <span style={{ fontFamily:SANS, fontSize:11, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:pal.accent }}>{b.eyebrow||b.badge}</span>
        </div>
      )}
      <E v={b.headline} p="Article headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(32px,5vw,58px)', fontWeight:800, lineHeight:1.06, letterSpacing:'-0.03em', color:'#0a0a0a', marginBottom:22, display:'block' }} />
      {b.subheadline && (
        <E v={b.subheadline} p="Deck / subtitle..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:20, fontWeight:400, lineHeight:1.7, color:pal.textMuted, marginBottom:32, display:'block', maxWidth:680 }} />
      )}
      <div style={{ height:1, background:`linear-gradient(90deg,${pal.accent}60,transparent)`, marginBottom:24 }} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <AuthorRow />
        <ReadTime />
      </div>
    </div>
  );
}

// ── PULL QUOTE ────────────────────────────────────────────────────────────────
function PullQuoteBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const variant = (b.variant as string) || 'accent';

  if (variant === 'dark') {
    return (
      <div style={{ borderRadius:20, padding:'44px 52px', margin:'8px 0', background:`linear-gradient(150deg,${pal.dark},${pal.primary})`, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-30, right:-30, width:200, height:200, borderRadius:'50%', background:`radial-gradient(circle,${pal.accent}20 0%,transparent 70%)`, pointerEvents:'none' }} />
        <div style={{ fontFamily:DISPLAY, fontSize:80, lineHeight:0.7, color:`${pal.accent}35`, fontWeight:900, marginBottom:20, position:'relative', zIndex:2 }}>"</div>
        <E v={b.body||b.headline} p="Pull quote text..." onChange={v=>u({body:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(20px,2.5vw,28px)', fontStyle:'italic', color:'rgba(255,255,255,0.88)', lineHeight:1.55, fontWeight:400, display:'block', marginBottom:24, position:'relative', zIndex:2 }} />
        {b.author && <E v={b.author} p="— Attribution" onChange={v=>u({author:v})} style={{ fontFamily:SANS, fontSize:13, fontWeight:700, color:'rgba(255,255,255,0.45)', letterSpacing:'0.04em', display:'block', position:'relative', zIndex:2 }} />}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div style={{ padding:'32px 0 32px 28px', margin:'8px 0', borderLeft:`4px solid ${pal.accent}` }}>
        <E v={b.body||b.headline} p="Pull quote text..." onChange={v=>u({body:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(20px,2.5vw,26px)', fontStyle:'italic', color:'#0a0a0a', lineHeight:1.6, fontWeight:700, display:'block', marginBottom:b.author?16:0 }} />
        {b.author && <E v={b.author} p="— Attribution" onChange={v=>u({author:v})} style={{ fontFamily:SANS, fontSize:13, fontWeight:700, color:pal.textMuted, display:'block' }} />}
      </div>
    );
  }

  // accent (default)
  return (
    <div style={{ borderRadius:20, padding:'36px 44px', margin:'8px 0', background:`${pal.accent}08`, border:`1.5px solid ${pal.accent}25`, position:'relative', overflow:'hidden', textAlign:'center' }}>
      <div style={{ fontFamily:DISPLAY, fontSize:72, lineHeight:0.7, color:`${pal.accent}20`, fontWeight:900, marginBottom:16 }}>"</div>
      <E v={b.body||b.headline} p="Pull quote text..." onChange={v=>u({body:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(22px,2.8vw,30px)', fontStyle:'italic', color:'#0a0a0a', lineHeight:1.5, fontWeight:700, display:'block', marginBottom:b.author?18:0 }} />
      {b.author && (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:16 }}>
          <div style={{ width:32, height:2, background:pal.accent, borderRadius:2 }} />
          <E v={b.author} p="— Attribution" onChange={v=>u({author:v})} style={{ fontFamily:SANS, fontSize:13, fontWeight:700, color:pal.accent }} />
          <div style={{ width:32, height:2, background:pal.accent, borderRadius:2 }} />
        </div>
      )}
    </div>
  );
}

// ── TABLE OF CONTENTS ─────────────────────────────────────────────────────────
function TableOfContentsBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const items = (b.items && (b.items as unknown[]).length > 0)
    ? (b.items as unknown[])
    : ['The background story','What I discovered in Week 1','Head-to-head comparison','Real numbers from 90 days of testing','Who this is right for (and who it is not)','Final verdict and where to get the best price'];

  return (
    <div style={{ borderRadius:20, overflow:'hidden', margin:'8px 0', boxShadow:`0 0 0 1px ${pal.border},0 16px 48px rgba(0,0,0,0.06)` }}>
      <div style={{ background:`linear-gradient(90deg,${pal.dark},${pal.primary})`, padding:'16px 28px', display:'flex', alignItems:'center', gap:10, position:'relative', overflow:'hidden' }}>
        <div style={NOISE_STYLE} />
        <div style={{ width:4, height:18, background:pal.accent, borderRadius:2, flexShrink:0, position:'relative', zIndex:2 }} />
        <E v={b.headline||'Table of Contents'} p="Table of Contents" onChange={v=>u({headline:v})} style={{ fontFamily:SANS, fontSize:13, fontWeight:800, color:'rgba(255,255,255,0.88)', letterSpacing:'0.02em', zIndex:2 }} />
        <span style={{ fontFamily:SANS, fontSize:10, color:'rgba(255,255,255,0.35)', marginLeft:'auto', fontWeight:600, zIndex:2 }}>{items.length} sections</span>
      </div>
      <div style={{ background:pal.surface, padding:'8px 0' }}>
        {(items as unknown[]).map((item, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 28px', borderBottom: i < items.length-1 ? `1px solid ${pal.border}` : 'none', cursor:'pointer', transition:'background 0.15s' }}>
            <span style={{ fontFamily:SANS, fontSize:10, fontWeight:900, color:pal.accent, minWidth:22, flexShrink:0 }}>{String(i+1).padStart(2,'0')}</span>
            <span style={{ fontFamily:SANS, fontSize:14, color:'#0a0a0a', lineHeight:1.45, flex:1 }}>{safeStr(item)}</span>
            <ArrowRight size={13} color={pal.accent} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AUTHOR BIO ────────────────────────────────────────────────────────────────
function AuthorBioBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const initials = (b.author || 'A').split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0,2);

  return (
    <div style={{ borderRadius:24, padding:'36px 40px', margin:'8px 0', background:pal.surfaceAlt, boxShadow:`0 0 0 1px ${pal.border},0 12px 40px rgba(0,0,0,0.05)`, display:'flex', gap:28, alignItems:'flex-start' }}>
      <div style={{ flexShrink:0 }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:`linear-gradient(135deg,${pal.accent},${pal.secondary})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SANS, fontSize:22, fontWeight:900, color:'#fff', boxShadow:`0 6px 20px ${pal.accent}44` }}>{initials}</div>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
          <p style={{ fontFamily:SANS, fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:pal.accent }}>About the Author</p>
        </div>
        <E v={b.author||'James Whitfield'} p="Author name..." onChange={v=>u({author:v})} style={{ fontFamily:DISPLAY, fontSize:22, fontWeight:800, color:'#0a0a0a', display:'block', marginBottom:8, letterSpacing:'-0.018em' }} />
        <E v={b.authorTitle||'Independent Affiliate Reviewer · 7 Years Experience'} p="Title / credentials..." onChange={v=>u({authorTitle:v})} style={{ fontFamily:SANS, fontSize:12, fontWeight:700, color:pal.textMuted, display:'block', marginBottom:12 }} />
        <E v={b.body||'James has independently tested and reviewed over 200 affiliate products across 12 niches. He publishes unbiased, data-driven reviews based on real test periods — never relying on vendor claims alone. His reviews have helped over 47,000 readers make confident purchase decisions.'} p="Bio text..." onChange={v=>u({body:v})} style={{ fontFamily:SANS, fontSize:14, lineHeight:1.8, color:pal.textMuted, display:'block' }} />
      </div>
    </div>
  );
}

// ── ARTICLE VERDICT ───────────────────────────────────────────────────────────
function ArticleVerdictBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const raw = safeNum((b as Record<string,unknown>).score ?? 9.4, 9.4);
  const score = (isNaN(raw) || !isFinite(raw)) ? 9.4 : Math.min(10, Math.max(0, raw));
  const safe = (n: number) => { const v = isNaN(n) || !isFinite(n) ? 8.5 : Math.min(10, Math.max(0, n)); return v; };

  const bars = [
    { label: 'Value for Money',  val: safe(score + 0.3) },
    { label: 'Ease of Use',      val: safe(score - 0.1) },
    { label: 'Results Quality',  val: safe(score + 0.2) },
    { label: 'Customer Support', val: safe(score - 0.2) },
  ];

  return (
    <div style={{ borderRadius:24, overflow:'hidden', margin:'8px 0', boxShadow:`0 0 0 2px ${pal.accent}30,0 24px 64px ${pal.accent}14` }}>
      <div style={{ background:`linear-gradient(135deg,${pal.accent},${pal.secondary})`, padding:'20px 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <p style={{ fontFamily:SANS, fontSize:10, fontWeight:900, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(255,255,255,0.65)', marginBottom:4 }}>Editor&apos;s Verdict</p>
          <E v={b.headline||'Our Final Rating'} p="Verdict label..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:22, fontWeight:800, color:'#fff' }} />
        </div>
        <div style={{ textAlign:'center', background:'rgba(255,255,255,0.15)', borderRadius:16, padding:'12px 20px', minWidth:80 }}>
          <div style={{ fontFamily:DISPLAY, fontSize:42, fontWeight:900, color:'#fff', lineHeight:1 }}>{score.toFixed(1)}</div>
          <div style={{ fontFamily:SANS, fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:4 }}>out of 10</div>
        </div>
      </div>
      <div style={{ background:pal.surface, padding:'28px 32px' }}>
        {bars.map((bar, i) => (
          <div key={i} style={{ marginBottom:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontFamily:SANS, fontSize:13, fontWeight:600, color:'#0a0a0a' }}>{bar.label}</span>
              <span style={{ fontFamily:SANS, fontSize:13, fontWeight:800, color:pal.accent }}>{bar.val.toFixed(1)}</span>
            </div>
            <div style={{ height:6, background:pal.border, borderRadius:99, overflow:'hidden' }}>
              <div style={{ width:`${(bar.val/10)*100}%`, height:'100%', background:`linear-gradient(90deg,${pal.accent},${pal.secondary})`, borderRadius:99 }} />
            </div>
          </div>
        ))}
        <E v={b.body||'After 90 days of real-world testing and direct comparison against 6 alternatives, this earns our top recommendation. The value proposition is genuinely the strongest in its category at this price point.'} p="Verdict summary..." onChange={v=>u({body:v})} style={{ fontFamily:SANS, fontSize:15, lineHeight:1.8, color:pal.textMuted, display:'block', marginTop:8 }} />
      </div>
    </div>
  );
}

// ── DROPCAP PARAGRAPH ─────────────────────────────────────────────────────────
function DropcapParagraphBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const raw = b.body || b.content || '';
  const isHtml = /<[a-z][\s\S]*>/i.test(raw);
  const firstChar = !isHtml && raw.length > 0 ? raw[0] : '';
  const rest = !isHtml && raw.length > 1 ? raw.slice(1) : '';

  useEffect(() => { injectPremiumStyles(pal.accent); }, [pal.accent]);

  if (isHtml) {
    return (
      <div style={{ padding:'4px 0 44px', maxWidth:760, position:'relative' }}>
        <div style={{ position:'absolute', left:-4, top:0, bottom:0, width:2, background:`linear-gradient(to bottom,${pal.accent}40,transparent)`, borderRadius:2 }} />
        <BodyHTML body={raw} onChange={v=>u({body:v})} pal={pal} />
      </div>
    );
  }

  return (
    <div style={{ padding:'4px 0 44px', maxWidth:760 }} className="bw-body">
      <p>
        {firstChar && (
          <span style={{ float:'left', fontFamily:DISPLAY, fontSize:88, fontWeight:900, lineHeight:0.75, paddingRight:12, paddingTop:8, color:pal.accent, marginBottom:0 }}>{firstChar}</span>
        )}
        <span style={{ fontFamily:'var(--bw-body-font, sans-serif)', fontSize:17, lineHeight:2, color:'#1a1a1a' }} contentEditable suppressContentEditableWarning onClick={e=>e.stopPropagation()} onBlur={e=>u({body:firstChar+e.currentTarget.innerText})}>{rest}</span>
      </p>
    </div>
  );
}

// ── ARTICLE END ───────────────────────────────────────────────────────────────
function ArticleEndBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{ padding:'40px 0 8px', borderTop:`1px solid ${pal.border}`, margin:'8px 0' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:28 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:4, height:20, background:`linear-gradient(to bottom,${pal.accent},${pal.secondary})`, borderRadius:2 }} />
          <E v={b.headline||'Did This Review Help You?'} p="End CTA heading..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:24, fontWeight:800, color:'#0a0a0a', letterSpacing:'-0.018em' }} />
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {['Helpful','Not Helpful'].map((label,i) => (
            <button key={i} onClick={e=>e.stopPropagation()} style={{ padding:'8px 18px', borderRadius:100, border:`1.5px solid ${i===0?pal.accent:pal.border}`, background:i===0?`${pal.accent}10`:'transparent', color:i===0?pal.accent:pal.textMuted, fontFamily:SANS, fontSize:12, fontWeight:700, cursor:'pointer' }}>{label}</button>
          ))}
        </div>
      </div>
      <E v={b.body||'Share this review if you found it useful. It helps other buyers make better decisions — and it costs you nothing.'} p="Closing line..." onChange={v=>u({body:v})} style={{ fontFamily:SANS, fontSize:14, color:pal.textMuted, lineHeight:1.75, display:'block' }} />
    </div>
  );
}

// ── HERO — ClickFunnels-style (5 variants) ────────────────────────────────────
function HeroBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const variant = (b.variant as string) || 'centered';

  // Shared CTA row
  const CtaBtn = ({ dark=false }:{dark?:boolean}) => b.cta ? (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
      <a href={b.ctaLink||'#'} onClick={e=>e.preventDefault()} style={{
        display:'inline-flex', alignItems:'center', gap:12,
        background:`linear-gradient(180deg, ${pal.accent} 0%, ${pal.secondary||pal.accent} 100%)`,
        color:'#fff', fontFamily:DISPLAY, fontWeight:700, fontSize:22,
        padding:'18px 48px', borderRadius:6, textDecoration:'none',
        textTransform:'uppercase', letterSpacing:'0.04em',
        boxShadow:`0 6px 0 rgba(0,0,0,0.3), 0 10px 30px ${pal.accent}55`,
        border:`2px solid rgba(255,255,255,0.25)`,
      }}>
        <E v={b.cta} p="YES — Get Access Now" onChange={v=>u({cta:v})} style={{ color:'#fff' }} />
        <span style={{ fontSize:20 }}>→</span>
      </a>
      {(b as Record<string,unknown>).badge && (
        <p style={{ fontFamily:SANS, fontSize:12, color: dark ? 'rgba(255,255,255,0.5)' : pal.textMuted, margin:0 }}>
          {String((b as Record<string,unknown>).badge)}
        </p>
      )}
    </div>
  ) : null;

  // ── centered (default CF style) ─────────────────────────────────────────
  if (variant === 'centered' || variant === 'magazine') {
    return (
      <div style={{ background: pal.dark, padding:'72px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 0%, ${pal.accent}20 0%, transparent 65%)`, pointerEvents:'none' }} />
        {(b.eyebrow||b.badge) && (
          <p style={{ fontFamily:SANS, fontSize:12, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:pal.accent, marginBottom:16, position:'relative', zIndex:2 }}>
            {b.eyebrow||b.badge}
          </p>
        )}
        <E v={b.headline} p="Headline..." onChange={v=>u({headline:v})} style={{
          fontFamily:DISPLAY, fontSize:'clamp(36px,5.5vw,64px)', fontWeight:700,
          lineHeight:1.12, textTransform:'uppercase', letterSpacing:'-0.01em',
          color:'#FFFFFF', display:'block', marginBottom:20, position:'relative', zIndex:2,
        }} />
        {b.subheadline && (
          <E v={b.subheadline} p="Sub..." onChange={v=>u({subheadline:v})} style={{
            fontFamily:SANS, fontSize:20, fontWeight:400, lineHeight:1.65,
            color:'rgba(255,255,255,0.72)', maxWidth:600, margin:'0 auto 40px', display:'block', position:'relative', zIndex:2,
          }} />
        )}
        <div style={{ position:'relative', zIndex:2 }}><CtaBtn dark /></div>
      </div>
    );
  }

  // ── dark / split ──────────────────────────────────────────────────────
  if (variant === 'dark' || variant === 'split') {
    return (
      <div style={{
        background:`linear-gradient(135deg, ${pal.dark} 0%, #0a0a0a 100%)`,
        padding: variant==='split' ? '72px 48px 72px 10%' : '72px 10%',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg, ${pal.accent}, ${pal.secondary||pal.accent})` }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:`repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.02) 40px)`, pointerEvents:'none' }} />
        <div style={{ maxWidth: variant==='split'?680:'100%', position:'relative', zIndex:2 }}>
          {(b.eyebrow||b.badge) && (
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${pal.accent}20`, border:`1px solid ${pal.accent}50`, borderRadius:4, padding:'5px 14px', marginBottom:24 }}>
              <span style={{ fontFamily:SANS, fontSize:11, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:pal.accent }}>{b.eyebrow||b.badge}</span>
            </div>
          )}
          <E v={b.headline} p="Headline..." onChange={v=>u({headline:v})} style={{
            fontFamily:DISPLAY, fontSize:'clamp(32px,5vw,60px)', fontWeight:700,
            lineHeight:1.1, textTransform:'uppercase', color:'#FFF',
            display:'block', marginBottom:20,
          }} />
          {b.subheadline && (
            <E v={b.subheadline} p="Sub..." onChange={v=>u({subheadline:v})} style={{
              fontFamily:SANS, fontSize:18, lineHeight:1.7, color:'rgba(255,255,255,0.65)',
              display:'block', marginBottom:36, maxWidth:540,
            }} />
          )}
          <CtaBtn dark />
        </div>
      </div>
    );
  }

  // ── minimal ───────────────────────────────────────────────────────────
  return (
    <div style={{ background:pal.surface, padding:'56px 0 48px', borderBottom:`4px solid ${pal.accent}` }}>
      {(b.eyebrow||b.badge) && (
        <p style={{ fontFamily:SANS, fontSize:11, fontWeight:800, letterSpacing:'0.16em', textTransform:'uppercase', color:pal.accent, marginBottom:16 }}>{b.eyebrow||b.badge}</p>
      )}
      <E v={b.headline} p="Headline..." onChange={v=>u({headline:v})} style={{
        fontFamily:DISPLAY, fontSize:'clamp(32px,5.5vw,58px)', fontWeight:700,
        lineHeight:1.1, textTransform:'uppercase', color:pal.dark, display:'block', marginBottom:18,
      }} />
      {b.subheadline && (
        <E v={b.subheadline} p="Sub..." onChange={v=>u({subheadline:v})} style={{
          fontFamily:SANS, fontSize:18, lineHeight:1.7, color:pal.textMuted, display:'block', marginBottom:32,
        }} />
      )}
      <CtaBtn />
    </div>
  );
}
// ── HERO DARK — CF-style full-width dark hero ─────────────────────────────────
function HeroDarkBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{
      background:`linear-gradient(160deg, ${pal.dark} 0%, #060606 100%)`,
      padding:'80px 10% 72px', position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:5, background:`linear-gradient(90deg, ${pal.accent}, ${pal.secondary||pal.accent})` }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize:'48px 48px', pointerEvents:'none' }} />
      <div style={NOISE_STYLE} />
      {b.eyebrow && (
        <p style={{ fontFamily:SANS, fontSize:11, fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:pal.accent, marginBottom:18, position:'relative', zIndex:2 }}>{b.eyebrow}</p>
      )}
      <E v={b.headline} p="Dark headline..." onChange={v=>u({headline:v})} style={{
        fontFamily:DISPLAY, fontSize:'clamp(32px,5.5vw,62px)', fontWeight:700,
        lineHeight:1.1, textTransform:'uppercase', color:'#FFF',
        display:'block', marginBottom:20, position:'relative', zIndex:2, maxWidth:820,
      }} />
      {b.subheadline && (
        <E v={b.subheadline} p="Sub..." onChange={v=>u({subheadline:v})} style={{
          fontFamily:SANS, fontSize:13, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
          color:pal.accent, display:'block', marginBottom:24, position:'relative', zIndex:2,
        }} />
      )}
      {b.body && (
        <E v={b.body} p="Body..." onChange={v=>u({body:v})} style={{
          fontFamily:SANS, fontSize:17, lineHeight:1.8, color:'rgba(255,255,255,0.55)',
          maxWidth:580, display:'block', marginBottom:40, position:'relative', zIndex:2,
        }} />
      )}
      {b.cta && (
        <a href={b.ctaLink||'#'} onClick={e=>e.preventDefault()} style={{
          display:'inline-flex', alignItems:'center', gap:12,
          background:`linear-gradient(180deg, ${pal.accent} 0%, ${pal.secondary||pal.accent} 100%)`,
          color:'#fff', fontFamily:DISPLAY, fontWeight:700, fontSize:20,
          padding:'16px 44px', borderRadius:6, textDecoration:'none', textTransform:'uppercase',
          boxShadow:`0 6px 0 rgba(0,0,0,0.3), 0 10px 30px ${pal.accent}55`,
          position:'relative', zIndex:2,
        }}>
          <E v={b.cta} p="CTA" onChange={v=>u({cta:v})} style={{ color:'#fff' }} />
          <span style={{ fontSize:18 }}>→</span>
        </a>
      )}
      {b.stats && b.stats.length > 0 && (
        <div style={{ display:'flex', gap:0, marginTop:52, paddingTop:36, borderTop:'1px solid rgba(255,255,255,0.08)', position:'relative', zIndex:2 }}>
          {b.stats.map((s,i) => (
            <div key={i} style={{ flex:1, textAlign:'center', borderRight: i<b.stats!.length-1?'1px solid rgba(255,255,255,0.08)':'none' }}>
              <div style={{ fontFamily:DISPLAY, fontSize:42, fontWeight:700, color:'#FFF', lineHeight:1 }}>{s.value}</div>
              <div style={{ fontFamily:SANS, fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:8, letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ── PARAGRAPH ─────────────────────────────────────────────────────────────────
function ParagraphBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{ padding: '4px 0 44px', maxWidth: 760 }}>
      <BodyHTML body={b.body || b.content || ''} onChange={v => u({ body: v })} pal={pal} />
    </div>
  );
}

// ── HEADLINE — CF bold Oswald style ──────────────────────────────────────────
function HeadlineBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{ padding:'8px 0 4px', borderLeft:`5px solid ${pal.accent}`, paddingLeft:20 }}>
      <E v={b.headline} p="Your Headline Here" onChange={v=>u({headline:v})} style={{
        fontFamily:DISPLAY, fontSize:'clamp(24px,3.5vw,42px)', fontWeight:700,
        textTransform:'uppercase', lineHeight:1.15, color:pal.dark, display:'block',
        letterSpacing:'0.01em',
      }} />
    </div>
  );
}
// ── SUBHEADING ────────────────────────────────────────────────────────────────
function SubheadingBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{ padding:'4px 0' }}>
      <E v={b.headline} p="Supporting line..." onChange={v=>u({headline:v})} style={{
        fontFamily:SANS, fontSize:'clamp(16px,2.2vw,22px)', fontWeight:600, lineHeight:1.6,
        color:pal.textMuted, display:'block',
      }} />
    </div>
  );
}
// ── BULLETS — CF-style benefit list ──────────────────────────────────────────
function BulletsBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const items = (b.items && (b.items as unknown[]).length > 0)
    ? (b.items as unknown[])
    : ['Results in your first 7 days or money back','Used by 127,000+ verified customers worldwide','Free lifetime updates with every purchase'];

  return (
    <div style={{ background:'#fff', border:`2px solid ${pal.accent}22`, borderRadius:8, padding:'32px 36px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
      {b.headline && (
        <E v={b.headline} p="List headline..." onChange={v=>u({headline:v})} style={{
          fontFamily:DISPLAY, fontSize:22, fontWeight:700, textTransform:'uppercase',
          color:pal.dark, display:'block', marginBottom:24, letterSpacing:'0.02em',
        }} />
      )}
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {items.map((item,i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
            <div style={{
              width:24, height:24, borderRadius:4, flexShrink:0,
              background:pal.accent, display:'flex', alignItems:'center', justifyContent:'center',
              marginTop:1,
            }}>
              <Check size={14} color="#fff" strokeWidth={3} />
            </div>
            <span style={{ fontFamily:SANS, fontSize:16, color:pal.dark, lineHeight:1.55, fontWeight:400 }}>{safeStr(item)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
// ── COMPARISON — CF-style vs table ────────────────────────────────────────────
function ComparisonBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const pros = (b.proItems && (b.proItems as unknown[]).length > 0)
    ? (b.proItems as unknown[])
    : ['Results visible in 7 days or less','One-time payment — no recurring fees','Setup in under 10 minutes','60-day full money-back guarantee','24/7 human support'];
  const cons = (b.conItems && (b.conItems as unknown[]).length > 0)
    ? (b.conItems as unknown[])
    : ['Weeks before any difference','Monthly subscription adds up fast','Complex setup requiring tech skills','30-day limit with strict conditions','Automated support only'];

  return (
    <div>
      {b.headline && (
        <E v={b.headline} p="Comparison headline..." onChange={v=>u({headline:v})} style={{
          fontFamily:DISPLAY, fontSize:'clamp(22px,3vw,36px)', fontWeight:700,
          textTransform:'uppercase', color:pal.dark, display:'block', marginBottom:8, letterSpacing:'0.02em',
        }} />
      )}
      {b.subheadline && (
        <E v={b.subheadline} p="Sub..." onChange={v=>u({subheadline:v})} style={{
          fontFamily:SANS, fontSize:15, color:pal.textMuted, display:'block', marginBottom:28,
        }} />
      )}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:3, borderRadius:10, overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.12)' }}>
        {/* US column header */}
        <div style={{ background:pal.accent, padding:'18px 24px', display:'flex', alignItems:'center', gap:10 }}>
          <Check size={20} color="#fff" strokeWidth={3} />
          <E v={b.leftTitle||'Buying Through This Link'} p="Left title..." onChange={v=>u({leftTitle:v})} style={{ fontFamily:DISPLAY, fontSize:16, fontWeight:700, textTransform:'uppercase', color:'#fff', letterSpacing:'0.04em' }} />
        </div>
        {/* THEM column header */}
        <div style={{ background:'#1a1a1a', padding:'18px 24px', display:'flex', alignItems:'center', gap:10 }}>
          <X size={20} color='rgba(255,255,255,0.4)' />
          <E v={b.rightTitle||'The Alternative'} p="Right title..." onChange={v=>u({rightTitle:v})} style={{ fontFamily:DISPLAY, fontSize:16, fontWeight:700, textTransform:'uppercase', color:'rgba(255,255,255,0.5)', letterSpacing:'0.04em' }} />
        </div>
        {/* Rows */}
        {pros.map((_,i) => (
          <React.Fragment key={i}>
            <div style={{ background:'#fff', padding:'14px 24px', display:'flex', alignItems:'flex-start', gap:12, borderBottom:`1px solid ${pal.border}` }}>
              <div style={{ width:20, height:20, borderRadius:4, background:pal.accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                <Check size={12} color="#fff" strokeWidth={3} />
              </div>
              <span style={{ fontFamily:SANS, fontSize:14, color:'#1a1a1a', lineHeight:1.5 }}>{safeStr(pros[i])}</span>
            </div>
            <div style={{ background:'#f8f8f8', padding:'14px 24px', display:'flex', alignItems:'flex-start', gap:12, borderBottom:`1px solid ${pal.border}` }}>
              <div style={{ width:20, height:20, borderRadius:4, background:'#dc2626', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                <X size={12} color="#fff" />
              </div>
              <span style={{ fontFamily:SANS, fontSize:14, color:'#555', lineHeight:1.5, textDecoration:'line-through' }}>{safeStr(cons[i]||'—')}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
// ── FEATURES — CF-style benefit grid ─────────────────────────────────────────
function FeaturesBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const variant = (b.variant as string) || 'cards';
  const cols = (b.columns && (b.columns as unknown[]).length > 0)
    ? (b.columns as {icon:string;title:string;body:string}[])
    : [
      { icon:'zap', title:'Results in 7 Days', body:'Most members report measurable improvements within the first week of using the system.' },
      { icon:'target', title:'Precision That Scales', body:'Stop wasting effort on the wrong approach. The system identifies exactly what works and doubles down.' },
      { icon:'award', title:'Proven at Scale', body:'Validated across 10,000+ members in 23 niches. The methodology works regardless of your starting point.' },
    ];

  const iconEl = (icon:string) => {
    const map: Record<string,React.ReactNode> = {
      zap:<Zap size={24} color="#fff"/>, target:<Target size={24} color="#fff"/>,
      users:<Users size={24} color="#fff"/>, award:<Award size={24} color="#fff"/>,
      clock:<Clock size={24} color="#fff"/>, trending:<TrendingUp size={24} color="#fff"/>,
      heart:<Heart size={24} color="#fff"/>, lightbulb:<Lightbulb size={24} color="#fff"/>,
      shield:<Shield size={24} color="#fff"/>, check:<CheckCircle2 size={24} color="#fff"/>,
    };
    return map[icon] || <Check size={24} color="#fff"/>;
  };

  // ── numbered: big number style ─────────────────────────────────────────
  if (variant === 'numbered') {
    return (
      <div>
        {b.headline && <E v={b.headline} p="Features headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(24px,3.5vw,38px)', fontWeight:700, textTransform:'uppercase', color:pal.dark, display:'block', marginBottom:8, letterSpacing:'0.02em' }} />}
        {b.subheadline && <E v={b.subheadline} p="Sub..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:16, color:pal.textMuted, display:'block', marginBottom:32 }} />}
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {cols.map((c,i) => (
            <div key={i} style={{ display:'flex', gap:24, padding:'28px 0', borderBottom:`1px solid ${pal.border}`, alignItems:'flex-start' }}>
              <div style={{ fontFamily:DISPLAY, fontSize:64, fontWeight:700, color:`${pal.accent}20`, lineHeight:1, flexShrink:0, width:72, textAlign:'center' }}>{String(i+1).padStart(2,'0')}</div>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:DISPLAY, fontSize:22, fontWeight:700, textTransform:'uppercase', color:pal.dark, marginBottom:8, letterSpacing:'0.02em' }}>{c.title}</p>
                <p style={{ fontFamily:SANS, fontSize:15, color:pal.textMuted, lineHeight:1.75, margin:0 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── list ────────────────────────────────────────────────────────────────
  if (variant === 'list') {
    return (
      <div>
        {b.headline && <E v={b.headline} p="Features headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(24px,3.5vw,38px)', fontWeight:700, textTransform:'uppercase', color:pal.dark, display:'block', marginBottom:28, letterSpacing:'0.02em' }} />}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {cols.map((c,i) => (
            <div key={i} style={{ display:'flex', gap:18, alignItems:'flex-start' }}>
              <div style={{ width:44, height:44, borderRadius:6, background:`linear-gradient(135deg,${pal.accent},${pal.secondary||pal.accent})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 4px 12px ${pal.accent}40` }}>
                {iconEl(c.icon)}
              </div>
              <div>
                <p style={{ fontFamily:DISPLAY, fontSize:18, fontWeight:700, textTransform:'uppercase', color:pal.dark, marginBottom:6, letterSpacing:'0.03em' }}>{c.title}</p>
                <p style={{ fontFamily:SANS, fontSize:14, color:pal.textMuted, lineHeight:1.75, margin:0 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── dark ────────────────────────────────────────────────────────────────
  if (variant === 'dark') {
    return (
      <div style={{ background:`linear-gradient(160deg, ${pal.dark}, #0a0a0a)`, borderRadius:10, padding:'48px 36px' }}>
        {b.headline && <E v={b.headline} p="Features headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(22px,3vw,36px)', fontWeight:700, textTransform:'uppercase', color:'#fff', display:'block', marginBottom:36, textAlign:'center', letterSpacing:'0.03em' }} />}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {cols.map((c,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:'28px 20px', textAlign:'center' }}>
              <div style={{ width:52, height:52, borderRadius:8, background:`linear-gradient(135deg,${pal.accent},${pal.secondary||pal.accent})`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:`0 6px 20px ${pal.accent}50` }}>
                {iconEl(c.icon)}
              </div>
              <p style={{ fontFamily:DISPLAY, fontSize:16, fontWeight:700, textTransform:'uppercase', color:'#fff', marginBottom:10, letterSpacing:'0.04em' }}>{c.title}</p>
              <p style={{ fontFamily:SANS, fontSize:14, color:'rgba(255,255,255,0.5)', lineHeight:1.7, margin:0 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── cards (default) ─────────────────────────────────────────────────────
  return (
    <div>
      {b.headline && <E v={b.headline} p="Features headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:'clamp(24px,3.5vw,38px)', fontWeight:700, textTransform:'uppercase', color:pal.dark, display:'block', marginBottom:8, letterSpacing:'0.02em' }} />}
      {b.subheadline && <E v={b.subheadline} p="Sub..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:16, color:pal.textMuted, display:'block', marginBottom:32 }} />}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
        {cols.map((c,i) => (
          <div key={i} style={{ background:'#fff', border:`2px solid ${pal.border}`, borderTop:`4px solid ${pal.accent}`, borderRadius:8, padding:'28px 20px', textAlign:'center', boxShadow:'0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ width:52, height:52, borderRadius:8, background:`linear-gradient(135deg,${pal.accent},${pal.secondary||pal.accent})`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:`0 6px 20px ${pal.accent}40` }}>
              {iconEl(c.icon)}
            </div>
            <p style={{ fontFamily:DISPLAY, fontSize:16, fontWeight:700, textTransform:'uppercase', color:pal.dark, marginBottom:10, letterSpacing:'0.04em' }}>{c.title}</p>
            <p style={{ fontFamily:SANS, fontSize:14, color:pal.textMuted, lineHeight:1.7, margin:0 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
// ── STATS — CF-style proof numbers ───────────────────────────────────────────
function StatsBlock({ block: b }: { block: Block }) {
  const pal = usePalette();
  const variant = (b.variant as string) || 'dark';
  const stats = (b.stats && (b.stats as unknown[]).length > 0)
    ? (b.stats as {value:string;label:string}[])
    : [{value:'47,283',label:'Active Members'},{value:'$2.4M',label:'Revenue Generated'},{value:'94.2%',label:'Success Rate'},{value:'60 Days',label:'Guarantee'}];

  if (variant === 'dark') {
    return (
      <div style={{ background:`linear-gradient(160deg, ${pal.dark} 0%, #0a0a0a 100%)`, borderRadius:10, overflow:'hidden', border:`1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${stats.length}, 1fr)` }}>
          {stats.map((s,i) => (
            <div key={i} style={{
              padding:'32px 16px', textAlign:'center',
              borderRight: i < stats.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontFamily:DISPLAY, fontSize:'clamp(28px,4vw,48px)', fontWeight:700, color:'#FFF', lineHeight:1, letterSpacing:'-0.02em' }}>{s.value}</div>
              <div style={{ fontFamily:SANS, fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.4)', marginTop:10, letterSpacing:'0.1em', textTransform:'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ height:4, background:`linear-gradient(90deg, ${pal.accent}, ${pal.secondary||pal.accent})` }} />
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div style={{ display:'flex', gap:0, flexWrap:'wrap' }}>
        {stats.map((s,i) => (
          <div key={i} style={{ flex:1, minWidth:120, textAlign:'center', padding:'20px 8px' }}>
            <div style={{ fontFamily:DISPLAY, fontSize:'clamp(32px,5vw,52px)', fontWeight:700, color:pal.accent, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontFamily:SANS, fontSize:11, fontWeight:700, color:pal.textMuted, marginTop:8, letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>
    );
  }

  // light
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${stats.length}, 1fr)`, gap:12 }}>
      {stats.map((s,i) => (
        <div key={i} style={{
          background:'#fff', borderRadius:8, padding:'24px 16px', textAlign:'center',
          border:`2px solid ${pal.border}`, boxShadow:'0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontFamily:DISPLAY, fontSize:'clamp(24px,3.5vw,40px)', fontWeight:700, color:pal.dark, lineHeight:1 }}>{s.value}</div>
          <div style={{ fontFamily:SANS, fontSize:11, fontWeight:700, color:pal.textMuted, marginTop:8, letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
// ── TESTIMONIAL GRID — CF-style proof wall ────────────────────────────────────
function TestimonialGridBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const variant = (b.variant as string) || 'cards';
  const items = (b.testimonials && (b.testimonials as unknown[]).length > 0)
    ? (b.testimonials as {quote:string;author:string;title?:string;stars?:number}[])
    : [
      { quote:'This completely changed the game for me. Results in under 30 days. Best investment I have made all year.', author:'Sarah M.', title:'Verified Buyer', stars:5 },
      { quote:'I compared this side-by-side with 5 competitors. Nothing comes close. Recommended it to my entire team.', author:'David K.', title:'Verified Buyer', stars:5 },
      { quote:'Paid for itself in the first 10 days. I only wish I had found this two years earlier.', author:'Lisa T.', title:'Verified Buyer', stars:5 },
    ];

  const Card = ({ t, dark=false }:{ t:typeof items[0]; dark?:boolean }) => (
    <div style={{
      background: dark ? 'rgba(255,255,255,0.05)' : '#fff',
      border: dark ? '1px solid rgba(255,255,255,0.1)' : `2px solid ${pal.border}`,
      borderRadius:8, padding:'28px 24px',
      display:'flex', flexDirection:'column', gap:16,
    }}>
      <div style={{ display:'flex', gap:3 }}>
        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i<=(t.stars||5)?pal.accent:'#e0e0e0'} color={i<=(t.stars||5)?pal.accent:'#e0e0e0'} strokeWidth={0} />)}
      </div>
      <p style={{ fontFamily:SANS, fontSize:15, color: dark ? 'rgba(255,255,255,0.8)' : '#1a1a1a', lineHeight:1.75, margin:0, fontStyle:'italic' }}>
        "{t.quote}"
      </p>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:'auto' }}>
        <div style={{ width:38, height:38, borderRadius:'50%', background:`linear-gradient(135deg,${pal.accent},${pal.secondary||pal.accent})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontFamily:SANS, fontSize:13, fontWeight:800, color:'#fff' }}>
          {t.author.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)}
        </div>
        <div>
          <p style={{ fontFamily:SANS, fontSize:13, fontWeight:700, color: dark ? '#fff' : pal.dark, margin:0 }}>{t.author}</p>
          {t.title && <p style={{ fontFamily:SANS, fontSize:11, color: dark ? 'rgba(255,255,255,0.4)' : pal.textMuted, margin:0, marginTop:2 }}>{t.title}</p>}
        </div>
      </div>
    </div>
  );

  if (variant === 'dark') {
    return (
      <div style={{ background:`linear-gradient(160deg, ${pal.dark}, #0a0a0a)`, borderRadius:10, padding:'48px 36px' }}>
        {b.headline && <E v={b.headline} p="Testimonials headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:28, fontWeight:700, textTransform:'uppercase', color:'#fff', display:'block', marginBottom:32, textAlign:'center', letterSpacing:'0.02em' }} />}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {items.slice(0,3).map((t,i) => <Card key={i} t={t} dark />)}
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    const [first, ...rest] = items;
    return (
      <div>
        {b.headline && <E v={b.headline} p="Testimonials headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:28, fontWeight:700, textTransform:'uppercase', color:pal.dark, display:'block', marginBottom:28, letterSpacing:'0.02em' }} />}
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:16, alignItems:'start' }}>
          <Card t={first} />
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {rest.slice(0,2).map((t,i) => <Card key={i} t={t} />)}
          </div>
        </div>
      </div>
    );
  }

  // cards / quotes (default)
  return (
    <div>
      {b.headline && <E v={b.headline} p="Testimonials headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY, fontSize:28, fontWeight:700, textTransform:'uppercase', color:pal.dark, display:'block', marginBottom:28, letterSpacing:'0.02em' }} />}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {items.slice(0,3).map((t,i) => <Card key={i} t={t} />)}
      </div>
    </div>
  );
}
// ── TESTIMONIAL (single) — CF-style quote card ────────────────────────────────
function TestimonialBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const initials = (b.author||'A').split(' ').map((w:string)=>w[0]).join('').toUpperCase().slice(0,2);
  return (
    <div style={{
      background:'#fff', border:`2px solid ${pal.border}`,
      borderLeft:`6px solid ${pal.accent}`,
      borderRadius:8, padding:'28px 28px 24px',
    }}>
      <div style={{ display:'flex', gap:3, marginBottom:16 }}>
        {[1,2,3,4,5].map(i=><Star key={i} size={16} fill={pal.accent} color={pal.accent} strokeWidth={0} />)}
      </div>
      <E v={b.body} p="Quote text..." onChange={v=>u({body:v})} style={{ fontFamily:SANS, fontSize:16, color:'#1a1a1a', lineHeight:1.8, fontStyle:'italic', display:'block', marginBottom:20 }} />
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:44, height:44, borderRadius:'50%', background:`linear-gradient(135deg,${pal.accent},${pal.secondary||pal.accent})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SANS, fontSize:14, fontWeight:800, color:'#fff', flexShrink:0 }}>{initials}</div>
        <div>
          <E v={b.author} p="Name" onChange={v=>u({author:v})} style={{ fontFamily:SANS, fontSize:14, fontWeight:700, color:pal.dark }} />
          {b.authorTitle && <E v={b.authorTitle} p="Title / Verified Buyer" onChange={v=>u({authorTitle:v})} style={{ fontFamily:SANS, fontSize:12, color:pal.textMuted, display:'block', marginTop:2 }} />}
        </div>
      </div>
    </div>
  );
}
// ── CALLOUT — CF "Important Box" ─────────────────────────────────────────────
function CalloutBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{
      border:`3px solid ${pal.accent}`,
      borderLeft:`8px solid ${pal.accent}`,
      borderRadius:8, padding:'24px 28px',
      background:`${pal.accent}08`,
    }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
        <div style={{ width:36, height:36, borderRadius:6, background:pal.accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
          <Zap size={18} color="#fff" fill="#fff" />
        </div>
        <div style={{ flex:1 }}>
          {b.headline && (
            <E v={b.headline} p="Callout heading..." onChange={v=>u({headline:v})} style={{
              fontFamily:DISPLAY, fontSize:18, fontWeight:700, textTransform:'uppercase',
              color:pal.dark, display:'block', marginBottom:8, letterSpacing:'0.03em',
            }} />
          )}
          <E v={b.body} p="Callout text..." onChange={v=>u({body:v})} style={{
            fontFamily:SANS, fontSize:15, color:'#1a1a1a', lineHeight:1.7, display:'block',
          }} />
        </div>
      </div>
    </div>
  );
}
// ── GUARANTEE — CF-style money-back shield ────────────────────────────────────
function GuaranteeBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{
      background:`linear-gradient(135deg, #f0fff4 0%, #e8f5e9 100%)`,
      border:`3px solid #22c55e`,
      borderRadius:12, padding:'32px 36px',
      display:'flex', gap:28, alignItems:'center',
    }}>
      <div style={{
        width:88, height:88, borderRadius:'50%', flexShrink:0,
        background:'#22c55e', display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 8px 24px rgba(34,197,94,0.35)',
      }}>
        <Shield size={40} color="#fff" fill="rgba(255,255,255,0.2)" />
      </div>
      <div style={{ flex:1 }}>
        <E v={b.headline||'60-Day Money-Back Guarantee'} p="Guarantee headline..." onChange={v=>u({headline:v})} style={{
          fontFamily:DISPLAY, fontSize:26, fontWeight:700, textTransform:'uppercase',
          color:'#14532d', display:'block', marginBottom:10, letterSpacing:'0.02em',
        }} />
        <E v={b.body||'Try it completely risk-free for 60 days. If you are not 100% satisfied, we will refund every penny. No questions asked.'} p="Guarantee text..." onChange={v=>u({body:v})} style={{
          fontFamily:SANS, fontSize:15, color:'#166534', lineHeight:1.75, display:'block',
        }} />
      </div>
    </div>
  );
}
// ── COUNTDOWN — CF-style urgent timer ─────────────────────────────────────────
function CountdownBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const mins = safeNum(b.minutes, 30);
  const [secs, setSecs] = useState(mins * 60);
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const fmt = (n: number) => String(n).padStart(2,'0');
  const urgent = secs < 300;

  const Digit = ({ val, label }:{ val:string; label:string }) => (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
      <div style={{
        background: urgent ? '#dc2626' : '#1a1a2e',
        color:'#FFF', fontFamily:'monospace', fontSize:'clamp(36px,6vw,64px)', fontWeight:900,
        width:'clamp(72px,10vw,96px)', height:'clamp(72px,10vw,96px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        borderRadius:8, boxShadow: urgent ? '0 6px 0 #991b1b' : '0 6px 0 #0a0a14',
        border:'2px solid rgba(255,255,255,0.1)',
        transition:'background 0.5s',
      }}>{val}</div>
      <span style={{ fontFamily:SANS, fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)' }}>{label}</span>
    </div>
  );

  const Sep = () => (
    <div style={{ color:'#FFF', fontFamily:'monospace', fontSize:'clamp(28px,4vw,48px)', fontWeight:900, marginBottom:24, opacity:0.6 }}>:</div>
  );

  return (
    <div style={{
      background:'linear-gradient(160deg, #0f0c29 0%, #1a1a2e 100%)',
      padding:'36px 24px', textAlign:'center', borderRadius:10,
      border:`2px solid ${urgent ? '#dc2626' : 'rgba(255,255,255,0.08)'}`,
      boxShadow: urgent ? '0 0 40px rgba(220,38,38,0.3)' : '0 8px 32px rgba(0,0,0,0.4)',
      transition:'border 0.5s, box-shadow 0.5s',
    }}>
      <E v={b.headline||'This Offer Expires In:'} p="Countdown headline..." onChange={v=>u({headline:v})} style={{
        fontFamily:DISPLAY, fontSize:18, fontWeight:700, textTransform:'uppercase',
        color: urgent ? '#f87171' : pal.accent,
        letterSpacing:'0.08em', display:'block', marginBottom:24,
      }} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, flexWrap:'wrap' }}>
        {h > 0 && <><Digit val={fmt(h)} label="Hours" /><Sep /></>}
        <Digit val={fmt(m)} label="Minutes" />
        <Sep />
        <Digit val={fmt(s)} label="Seconds" />
      </div>
    </div>
  );
}
// ── STARS — CF social proof strip ────────────────────────────────────────────
function StarsBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const rating = safeNum(b.rating, 4.9);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:16, padding:'12px 0', flexWrap:'wrap' }}>
      <div style={{ display:'flex', gap:3 }}>
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={22} fill={i<=Math.round(rating)?pal.accent:'#e0e0e0'} color={i<=Math.round(rating)?pal.accent:'#e0e0e0'} strokeWidth={0} />
        ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
        <span style={{ fontFamily:DISPLAY, fontSize:20, fontWeight:700, color:pal.dark, letterSpacing:'0.02em' }}>
          {rating.toFixed(1)}/5.0
        </span>
        {b.ratingCount && (
          <span style={{ fontFamily:SANS, fontSize:12, color:pal.textMuted, fontWeight:600 }}>{b.ratingCount}</span>
        )}
      </div>
      {b.body && (
        <div style={{ flex:1, minWidth:200 }}>
          <E v={b.body} p="Rating note..." onChange={v=>u({body:v})} style={{ fontFamily:SANS, fontSize:13, color:pal.textMuted, lineHeight:1.6 }} />
        </div>
      )}
    </div>
  );
}
// ── BUTTON — CF-style 3D CTA buttons ─────────────────────────────────────────
function ButtonBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const variant = (b.variant as string) || 'primary';

  // ── wide: full-width section CTA ──────────────────────────────────────
  if (variant === 'wide') {
    return (
      <div style={{ padding:'32px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <a href={b.ctaLink||'#'} onClick={e=>e.preventDefault()} style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:14,
          width:'100%', padding:'22px 32px',
          background:`linear-gradient(180deg, ${pal.accent} 0%, ${pal.secondary||pal.accent} 100%)`,
          color:'#fff', fontFamily:DISPLAY, fontWeight:700, fontSize:26,
          borderRadius:6, textDecoration:'none', textTransform:'uppercase',
          letterSpacing:'0.04em',
          boxShadow:`0 8px 0 rgba(0,0,0,0.25), 0 14px 40px ${pal.accent}50`,
          border:'2px solid rgba(255,255,255,0.2)',
        }}>
          <E v={b.cta||'YES — Get Instant Access Now'} p="Button text..." onChange={v=>u({cta:v})} style={{ color:'#fff' }} />
          <span style={{ fontSize:24 }}>→</span>
        </a>
        {b.subheadline && (
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <Lock size={11} color={pal.textMuted} />
            <E v={b.subheadline} p="Trust line..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:12, color:pal.textMuted }} />
          </div>
        )}
      </div>
    );
  }

  // ── ghost: outlined ─────────────────────────────────────────────────
  if (variant === 'ghost') {
    return (
      <div style={{ padding:'24px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <a href={b.ctaLink||'#'} onClick={e=>e.preventDefault()} style={{
          display:'inline-flex', alignItems:'center', gap:12,
          background:'transparent', color:pal.accent,
          border:`3px solid ${pal.accent}`, fontFamily:DISPLAY, fontWeight:700, fontSize:18,
          padding:'14px 44px', borderRadius:6, textDecoration:'none', textTransform:'uppercase',
          letterSpacing:'0.04em',
        }}>
          <E v={b.cta||'Learn More'} p="Button text..." onChange={v=>u({cta:v})} style={{ color:'inherit' }} />
          <span>→</span>
        </a>
        {b.subheadline && (
          <E v={b.subheadline} p="Trust line..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:12, color:pal.textMuted, textAlign:'center' }} />
        )}
      </div>
    );
  }

  // ── primary (default) ──────────────────────────────────────────────
  return (
    <div style={{ padding:'28px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      <a href={b.ctaLink||'#'} onClick={e=>e.preventDefault()} style={{
        display:'inline-flex', alignItems:'center', gap:14,
        background:`linear-gradient(180deg, ${pal.accent} 0%, ${pal.secondary||pal.accent} 100%)`,
        color:'#fff', fontFamily:DISPLAY, fontWeight:700, fontSize:22,
        padding:'18px 52px', borderRadius:6, textDecoration:'none', textTransform:'uppercase',
        letterSpacing:'0.04em',
        boxShadow:`0 6px 0 rgba(0,0,0,0.25), 0 10px 30px ${pal.accent}50`,
        border:'2px solid rgba(255,255,255,0.2)',
      }}>
        <E v={b.cta||'Get Instant Access Now'} p="Button text..." onChange={v=>u({cta:v})} style={{ color:'#fff' }} />
        <span style={{ fontSize:20 }}>→</span>
      </a>
      {b.subheadline && (
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <Lock size={11} color={pal.textMuted} />
          <E v={b.subheadline} p="Trust line..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS, fontSize:12, color:pal.textMuted, textAlign:'center' }} />
        </div>
      )}
    </div>
  );
}
// ── FAQ — CF-style accordion ─────────────────────────────────────────────────
function FaqBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const [open, setOpen] = useState<number|null>(null);
  const items = (b.items||[]) as unknown[];
  return (
    <div>
      {b.headline && (
        <E v={b.headline} p="FAQ Headline..." onChange={v=>u({headline:v})} style={{
          fontFamily:DISPLAY, fontSize:28, fontWeight:700, textTransform:'uppercase',
          color:pal.dark, display:'block', marginBottom:24, letterSpacing:'0.02em',
        }} />
      )}
      <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
        {items.map((item,i) => {
          const raw = safeStr(item);
          const parts = raw.split(' | A: ');
          const q = parts[0].replace(/^Q:\s*/,'').trim();
          const a = parts[1]?.trim() || '';
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom:`1px solid ${pal.border}` }}>
              <button onClick={e=>{e.stopPropagation();setOpen(isOpen?null:i);}} style={{
                width:'100%', background:'transparent', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'18px 0', gap:16,
              }}>
                <span style={{ fontFamily:SANS, fontSize:15, fontWeight:700, color:pal.dark, textAlign:'left', flex:1 }}>{q}</span>
                <div style={{
                  width:28, height:28, borderRadius:4, background: isOpen ? pal.accent : pal.border,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'background 0.2s',
                }}>
                  {isOpen ? <X size={14} color="#fff" /> : <span style={{ color:'#fff', fontWeight:900, fontSize:16, lineHeight:1 }}>+</span>}
                </div>
              </button>
              {isOpen && (
                <div style={{ paddingBottom:18, paddingRight:44 }}>
                  <p style={{ fontFamily:SANS, fontSize:14, color:pal.textMuted, lineHeight:1.8, margin:0 }}>{a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
// ── BADGE ROW — CF trust badges ──────────────────────────────────────────────
function BadgeBlock({ block: b }: { block: Block }) {
  const pal = usePalette();
  const items = (b.items && (b.items as unknown[]).length > 0)
    ? (b.items as unknown[])
    : ['Secure Checkout','SSL Encrypted','60-Day Guarantee','Instant Access'];
  return (
    <div style={{
      display:'flex', gap:0, flexWrap:'wrap',
      border:`2px solid ${pal.border}`, borderRadius:8, overflow:'hidden',
    }}>
      {items.map((item,i) => (
        <div key={i} style={{
          flex:1, minWidth:100, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          gap:8, padding:'16px 12px',
          borderRight: i < items.length - 1 ? `1px solid ${pal.border}` : 'none',
          background:'#fff',
        }}>
          <Shield size={22} color={pal.accent} />
          <span style={{ fontFamily:SANS, fontSize:11, fontWeight:700, color:pal.dark, textAlign:'center', letterSpacing:'0.04em', textTransform:'uppercase' }}>
            {safeStr(item)}
          </span>
        </div>
      ))}
    </div>
  );
}
// ── VIDEO — CF-style VSL player (with preview support) ────────────────────────
function VideoBlock({ block: b, onUpdate, preview = false }: { block: Block; onUpdate: (p: Partial<Block>) => void; preview?: boolean }) {
  const pal = usePalette();
  const [url, setUrl] = useState('');
  const embed = (b as Record<string,unknown>)._embedUrl as string | undefined;

  const doEmbed = () => {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    if (m) onUpdate({ _embedUrl: `https://www.youtube.com/embed/${m[1]}?rel=0&autoplay=0` });
  };

  return (
    <div style={{ background:'#0a0a0a', borderRadius:10, overflow:'hidden', boxShadow:'0 16px 64px rgba(0,0,0,0.5)' }}>
      {b.headline && (
        <div style={{ padding:'20px 28px 0', textAlign:'center' }}>
          <E v={b.headline} p="Watch: Video title..." onChange={v=>onUpdate({headline:v})} style={{
            fontFamily:DISPLAY, fontSize:22, fontWeight:700, textTransform:'uppercase',
            color:'#fff', letterSpacing:'0.04em',
          }} />
        </div>
      )}
      <div style={{ padding:'16px 28px 24px' }}>
        {embed ? (
          <div style={{ borderRadius:8, overflow:'hidden', aspectRatio:'16/9', boxShadow:'0 0 0 3px rgba(255,255,255,0.1)' }}>
            <iframe src={embed} style={{ width:'100%', height:'100%', border:'none' }} allowFullScreen />
          </div>
        ) : (
          <div>
            <div style={{
              background:'#1a1a1a', borderRadius:8, aspectRatio:'16/9',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:16, cursor:'pointer', border:'3px solid rgba(255,255,255,0.08)',
            }} onClick={e=>e.stopPropagation()}>
              <div style={{
                width:80, height:80, borderRadius:'50%',
                background:`linear-gradient(135deg, ${pal.accent}, ${pal.secondary||pal.accent})`,
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:`0 0 0 12px ${pal.accent}22, 0 0 0 24px ${pal.accent}11`,
              }}>
                <Play size={32} color="#fff" fill="#fff" />
              </div>
              <p style={{ fontFamily:DISPLAY, fontSize:16, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.6)', margin:0 }}>
                CLICK HERE TO PLAY
              </p>
            </div>
            {!preview && (
              <div style={{ display:'flex', gap:10, marginTop:14 }}>
                <input type="url" value={url} onChange={e=>setUrl(e.target.value)} onClick={e=>e.stopPropagation()}
                  placeholder="Paste YouTube URL to embed..."
                  style={{ flex:1, padding:'11px 14px', border:'1px solid #333', borderRadius:6, fontFamily:SANS, fontSize:13, outline:'none', background:'#1a1a1a', color:'#fff' }} />
                <button onClick={e=>{e.stopPropagation();doEmbed();}}
                  style={{ background:pal.accent, color:'#fff', fontFamily:SANS, fontWeight:700, fontSize:13, padding:'11px 20px', borderRadius:6, border:'none', cursor:'pointer' }}>
                  Embed
                </button>
              </div>
            )}
          </div>
        )}
        {b.body && (
          <E v={b.body} p="Video caption..." onChange={v=>onUpdate({body:v})} style={{ fontFamily:SANS, fontSize:13, color:'rgba(255,255,255,0.4)', marginTop:12, display:'block', textAlign:'center' }} />
        )}
        {!preview && embed && (
          <button onClick={() => { onUpdate({ _embedUrl: undefined }); setUrl(''); }} style={{
            width:'100%', marginTop:10, padding:'7px', background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.15)',
            borderRadius:8, color:'#ef4444', fontSize:11, fontWeight:700, cursor:'pointer'
          }}>
            Remove Video
          </button>
        )}
      </div>
    </div>
  );
}
// ── OPTIN FORM (3 Variants) ───────────────────────────────────────────────────
function OptinFormBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  const variant = (b.variant as string) || 'split';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const bullets = (b.items && (b.items as unknown[]).length > 0)
    ? (b.items as unknown[])
    : ['Instant access — no waiting', 'Free guide delivered to your inbox', '100% private — we never share your data'];

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (email) setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = { width:'100%', padding:'14px 16px', border:`1.5px solid ${pal.border}`, borderRadius:11, fontFamily:SANS, fontSize:14, color:'#0a0a0a', background:pal.surface, outline:'none', boxSizing:'border-box', transition:'border-color 0.15s' };
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor=pal.accent; e.target.style.boxShadow=`0 0 0 3px ${pal.accent}18`; };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor=pal.border; e.target.style.boxShadow='none'; };

  const SuccessCard = () => (
    <div style={{ borderRadius:20,padding:'40px 32px',textAlign:'center',background:`linear-gradient(135deg,${pal.accent}10,${pal.secondary}08)`,border:`2px solid ${pal.accent}30` }}>
      <div style={{ width:64,height:64,borderRadius:'50%',margin:'0 auto 20px',background:`linear-gradient(135deg,${pal.accent},${pal.secondary})`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 8px 32px ${pal.accent}50` }}>
        <Check size={28} color="#fff" strokeWidth={3} />
      </div>
      <p style={{ fontFamily:DISPLAY,fontSize:22,fontWeight:800,color:'#0a0a0a',marginBottom:10 }}>You&apos;re in.</p>
      <p style={{ fontFamily:SANS,fontSize:14,color:pal.textMuted,lineHeight:1.7 }}>Check your inbox — your free guide is on its way.</p>
    </div>
  );

  const FormFields = () => (
    <div>
      <div style={{ marginBottom:14 }}>
        <label style={{ fontFamily:SANS,fontSize:12,fontWeight:700,color:'#0a0a0a',display:'block',marginBottom:6 }}>First Name</label>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} onClick={e=>e.stopPropagation()} placeholder="Your first name" style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
      </div>
      <div style={{ marginBottom:20 }}>
        <label style={{ fontFamily:SANS,fontSize:12,fontWeight:700,color:'#0a0a0a',display:'block',marginBottom:6 }}>Email Address</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onClick={e=>e.stopPropagation()} placeholder="your@email.com" style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
      </div>
      <button onClick={handleSubmit} style={{ width:'100%',padding:'18px 24px',border:'none',borderRadius:12,background:`linear-gradient(135deg,${pal.accent},${pal.secondary})`,color:'#fff',fontFamily:SANS,fontWeight:900,fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10,boxShadow:`0 4px 0 ${pal.dark},0 12px 40px ${pal.accent}50`,letterSpacing:'-0.01em' }}>
        <E v={b.cta||'Send Me the Free Guide'} p="Button text..." onChange={v=>u({cta:v})} style={{ color:'#fff' }} />
        <ArrowRight size={18} />
      </button>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:6,marginTop:14 }}>
        <Lock size={11} color={pal.textMuted} />
        <span style={{ fontFamily:SANS,fontSize:11,color:pal.textMuted }}>{safeStr(b.body)||'No spam. Unsubscribe anytime. 100% free.'}</span>
      </div>
    </div>
  );

  // ── centered: single-column centered ──────────────────────────────────
  if (variant === 'centered') {
    return (
      <div style={{ borderRadius:28,overflow:'hidden',boxShadow:`0 0 0 1.5px ${pal.border},0 40px 100px rgba(0,0,0,0.1)` }}>
        <div style={{ background:`linear-gradient(90deg,${pal.dark} 0%,${pal.primary} 50%,${pal.dark} 100%)`,padding:'12px 36px',display:'flex',alignItems:'center',justifyContent:'center',gap:10,position:'relative',overflow:'hidden' }}>
          <div style={NOISE_STYLE} />
          <div style={{ width:8,height:8,borderRadius:'50%',background:pal.accent,boxShadow:`0 0 8px ${pal.accent}` }} />
          <E v={b.badge||b.eyebrow||'FREE INSTANT ACCESS'} p="Banner..." onChange={v=>u({badge:v})} style={{ fontFamily:SANS,fontSize:11,fontWeight:800,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,255,255,0.88)',zIndex:2 }} />
          <div style={{ width:8,height:8,borderRadius:'50%',background:pal.accent,boxShadow:`0 0 8px ${pal.accent}` }} />
        </div>
        <div style={{ background:pal.surface,padding:'52px 72px',maxWidth:600,margin:'0 auto' }}>
          <E v={b.headline||'Get Instant Access'} p="Form headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY,fontSize:'clamp(24px,3vw,36px)',fontWeight:800,lineHeight:1.15,letterSpacing:'-0.025em',color:'#0a0a0a',display:'block',marginBottom:12,textAlign:'center' }} />
          <E v={b.subheadline||'Join 47,000+ subscribers who get exclusive strategies.'} p="Subheadline..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS,fontSize:15,lineHeight:1.75,color:pal.textMuted,display:'block',marginBottom:32,textAlign:'center' }} />
          {submitted ? <SuccessCard /> : <FormFields />}
          <div style={{ display:'flex',justifyContent:'center',gap:24,marginTop:28,paddingTop:24,borderTop:`1px solid ${pal.border}` }}>
            {['47,283 subscribers','4.9 / 5 rating','Zero spam'].map((item,i) => (
              <div key={i} style={{ display:'flex',alignItems:'center',gap:6 }}>
                <CheckCircle2 size={12} color={pal.accent} fill={`${pal.accent}15`} strokeWidth={2} />
                <span style={{ fontFamily:SANS,fontSize:11,fontWeight:600,color:pal.textMuted }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── dark: full dark background ─────────────────────────────────────────
  if (variant === 'dark') {
    return (
      <div style={{ borderRadius:28,overflow:'hidden',background:`linear-gradient(150deg,${pal.dark},${pal.primary})`,boxShadow:'0 40px 100px rgba(0,0,0,0.35)',position:'relative' }}>
        <div style={NOISE_STYLE} />
        <div style={{ position:'absolute',top:-60,left:'20%',width:500,height:400,borderRadius:'50%',background:`radial-gradient(circle,${pal.accent}22 0%,transparent 70%)`,pointerEvents:'none' }} />
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,position:'relative',zIndex:2 }}>
          <div style={{ padding:'52px 48px',display:'flex',flexDirection:'column',justifyContent:'center' }}>
            <E v={b.headline||'Enter Your Email for Instant Access'} p="Headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY,fontSize:'clamp(22px,2.8vw,32px)',fontWeight:800,lineHeight:1.15,letterSpacing:'-0.025em',color:'#FFFFFF',display:'block',marginBottom:14 }} />
            <E v={b.subheadline||'Join thousands getting results every week.'} p="Subheadline..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS,fontSize:15,lineHeight:1.75,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:28 }} />
            <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
              {(bullets as unknown[]).map((item,i) => (
                <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:12 }}>
                  <div style={{ width:20,height:20,borderRadius:'50%',flexShrink:0,background:`${pal.accent}30`,border:`1px solid ${pal.accent}50`,display:'flex',alignItems:'center',justifyContent:'center',marginTop:1 }}><Check size={11} color={pal.accent} strokeWidth={3} /></div>
                  <span style={{ fontFamily:SANS,fontSize:13,color:'rgba(255,255,255,0.6)',lineHeight:1.7 }}>{clean(item)}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:'52px 48px',background:'rgba(255,255,255,0.04)',borderLeft:'1px solid rgba(255,255,255,0.07)' }}>
            {submitted ? <SuccessCard /> : (
              <div>
                <p style={{ fontFamily:SANS,fontSize:12,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:pal.accent,marginBottom:20 }}>Get Free Instant Access</p>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontFamily:SANS,fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.7)',display:'block',marginBottom:6 }}>First Name</label>
                  <input type="text" value={name} onChange={e=>setName(e.target.value)} onClick={e=>e.stopPropagation()} placeholder="Your first name" style={{ ...inputStyle,background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.12)',color:'#fff' }} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={{ marginBottom:20 }}>
                  <label style={{ fontFamily:SANS,fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.7)',display:'block',marginBottom:6 }}>Email Address</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onClick={e=>e.stopPropagation()} placeholder="your@email.com" style={{ ...inputStyle,background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.12)',color:'#fff' }} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <button onClick={handleSubmit} style={{ width:'100%',padding:'18px 24px',border:'none',borderRadius:12,background:`linear-gradient(135deg,${pal.accent},${pal.secondary})`,color:'#fff',fontFamily:SANS,fontWeight:900,fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10,boxShadow:`0 4px 0 rgba(0,0,0,0.4),0 12px 40px ${pal.accent}50` }}>
                  <E v={b.cta||'Send Me the Free Guide'} p="Button..." onChange={v=>u({cta:v})} style={{ color:'#fff' }} />
                  <ArrowRight size={18} />
                </button>
                <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:6,marginTop:14 }}>
                  <Lock size={11} color='rgba(255,255,255,0.3)' />
                  <span style={{ fontFamily:SANS,fontSize:11,color:'rgba(255,255,255,0.3)' }}>{safeStr(b.body)||'No spam. Unsubscribe anytime.'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── split (default): 2-column with value prop ──────────────────────────
  return (
    <div style={{ borderRadius:28,overflow:'hidden',boxShadow:`0 0 0 1.5px ${pal.border},0 40px 100px rgba(0,0,0,0.1)` }}>
      <div style={{ background:`linear-gradient(90deg,${pal.dark} 0%,${pal.primary} 50%,${pal.dark} 100%)`,padding:'12px 36px',display:'flex',alignItems:'center',justifyContent:'center',gap:10,position:'relative',overflow:'hidden' }}>
        <div style={NOISE_STYLE} />
        <div style={{ width:8,height:8,borderRadius:'50%',background:pal.accent,boxShadow:`0 0 8px ${pal.accent}` }} />
        <E v={b.badge||b.eyebrow||'FREE INSTANT ACCESS'} p="Banner text..." onChange={v=>u({badge:v})} style={{ fontFamily:SANS,fontSize:11,fontWeight:800,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,255,255,0.88)',zIndex:2 }} />
        <div style={{ width:8,height:8,borderRadius:'50%',background:pal.accent,boxShadow:`0 0 8px ${pal.accent}` }} />
      </div>
      <div style={{ background:pal.surface,padding:'44px 48px 48px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:52,alignItems:'center' }}>
        <div>
          <E v={b.headline||'Enter Your Email to Get Instant Access'} p="Form headline..." onChange={v=>u({headline:v})} style={{ fontFamily:DISPLAY,fontSize:'clamp(22px,2.8vw,32px)',fontWeight:800,lineHeight:1.15,letterSpacing:'-0.025em',color:'#0a0a0a',display:'block',marginBottom:14 }} />
          <E v={b.subheadline||'Join 47,000+ subscribers who get exclusive strategies every week.'} p="Subheadline..." onChange={v=>u({subheadline:v})} style={{ fontFamily:SANS,fontSize:15,lineHeight:1.75,color:pal.textMuted,display:'block',marginBottom:28 }} />
          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            {(bullets as unknown[]).map((item,i) => (
              <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:12 }}>
                <div style={{ width:22,height:22,borderRadius:'50%',flexShrink:0,background:`linear-gradient(135deg,${pal.accent},${pal.secondary})`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 3px 10px ${pal.accent}40`,marginTop:1 }}><Check size={12} color="#fff" strokeWidth={3} /></div>
                <span style={{ fontFamily:SANS,fontSize:14,color:'#1a1a1a',lineHeight:1.7 }}>{clean(item)}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:pal.surfaceAlt,borderRadius:20,padding:'36px 32px',boxShadow:`0 0 0 1px ${pal.border},0 16px 48px rgba(0,0,0,0.07)` }}>
          <p style={{ fontFamily:SANS,fontSize:12,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:pal.accent,marginBottom:20 }}>Get Free Instant Access</p>
          {submitted ? <SuccessCard /> : <FormFields />}
        </div>
      </div>
      <div style={{ background:pal.surfaceAlt,borderTop:`1px solid ${pal.border}`,padding:'16px 48px',display:'flex',alignItems:'center',justifyContent:'center',gap:32 }}>
        {['47,283 subscribers','4.9 / 5 rating','Zero spam policy'].map((item,i) => (
          <div key={i} style={{ display:'flex',alignItems:'center',gap:7 }}>
            <CheckCircle2 size={13} color={pal.accent} fill={`${pal.accent}15`} strokeWidth={2} />
            <span style={{ fontFamily:SANS,fontSize:12,fontWeight:600,color:pal.textMuted }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DIVIDER / SPACER ──────────────────────────────────────────────────────────
function DividerBlock() {
  const pal = usePalette();
  return (
    <div style={{ padding:'20px 0', display:'flex', alignItems:'center', gap:16 }}>
      <div style={{ flex:1, height:2, background:pal.border }} />
      <div style={{ width:8, height:8, borderRadius:'50%', background:pal.accent }} />
      <div style={{ flex:1, height:2, background:pal.border }} />
    </div>
  );
}
function SpacerBlock() { return <div style={{ height: 48 }} />; }

// ── FALLBACK ──────────────────────────────────────────────────────────────────
function FallbackBlock({ block: b, onUpdate: u }: { block: Block; onUpdate: (p: Partial<Block>) => void }) {
  const pal = usePalette();
  return (
    <div style={{ padding: 20, background: pal.surfaceAlt, border: `1.5px dashed ${pal.border}`, borderRadius: 14 }}>
      <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: pal.textMuted, display: 'block', marginBottom: 8 }}>{b.type}</span>
      {(b.headline || b.body) && (
        <E v={String(b.headline || b.body || '')} p="Content..." onChange={v => u({ headline: v })} style={{ fontFamily: SANS, fontSize: 15, color: pal.textMuted }} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  BLOCK WRAPPER (with preview support)
// ══════════════════════════════════════════════════════════════════════════════

interface BlockWrapperProps {
  block: Block; index: number; total: number; selected: boolean;
  preview?: boolean;   // ← NEW
  onSelect: () => void; onUpdate: (u: Partial<Block>) => void;
  onMove: (d: number) => void; onDelete: () => void; onDuplicate: () => void;
  palette?: Palette;
}

const BLOCK_SPACING: Record<string, number> = {
  'image':0,'hero':72,'hero-dark':72,'hero_dark':72,'attention-bar':28,'attention_bar':28,
  'article':0,'paragraph':0,'headline':0,'subheading':0,
  'comparison':72,'features':72,'stats':72,'testimonial-grid':72,'testimonial_grid':72,
  'testimonial':64,'bullets':64,'callout':44,'guarantee':64,'countdown':52,
  'stars':44,'button':36,'faq':64,'badge':28,'video':60,'divider':16,'spacer':0,
  'optin-form':72,'optin_form':72,'email-form':72,'email_form':72,'optin':72,
  'pull-quote':52,'pull_quote':52,'pullquote':52,
  'table-of-contents':52,'toc':52,
  'author-bio':64,'author_bio':64,
  'article-verdict':72,'verdict':72,
  'dropcap-paragraph':0,'dropcap':0,
  'article-end':48,'article_end':48,
};

export function BlockWrapper({
  block, index, total, selected, preview = false,
  onSelect, onUpdate, onMove, onDelete, onDuplicate, palette
}: BlockWrapperProps) {
  const ctxPalette = usePalette();
  const pal = palette || ctxPalette;
  const gap = BLOCK_SPACING[block.type] ?? 52;

  const render = () => {
    const p = { block, onUpdate, preview };
    switch (block.type) {
      case 'image': case 'image-hero':                   return <ImageBlock {...p} />;
      case 'hero':                                        return <HeroBlock {...p} />;
      case 'hero-dark': case 'hero_dark':                 return <HeroDarkBlock {...p} />;
      case 'attention-bar': case 'attention_bar':         return <AttentionBarBlock {...p} />;
      case 'article': case 'article-intro':               return <ArticleBlock {...p} />;
      case 'paragraph':                                   return <ParagraphBlock {...p} />;
      case 'dropcap-paragraph': case 'dropcap':           return <DropcapParagraphBlock {...p} />;
      case 'pull-quote': case 'pull_quote': case 'pullquote': return <PullQuoteBlock {...p} />;
      case 'table-of-contents': case 'toc':              return <TableOfContentsBlock {...p} />;
      case 'author-bio': case 'author_bio':               return <AuthorBioBlock {...p} />;
      case 'article-verdict': case 'verdict':             return <ArticleVerdictBlock {...p} />;
      case 'article-end': case 'article_end':             return <ArticleEndBlock {...p} />;
      case 'headline':                                    return <HeadlineBlock {...p} />;
      case 'subheading':                                  return <SubheadingBlock {...p} />;
      case 'bullets':                                     return <BulletsBlock {...p} />;
      case 'comparison':                                  return <ComparisonBlock {...p} />;
      case 'features':                                    return <FeaturesBlock {...p} />;
      case 'stats':                                       return <StatsBlock {...p} />;
      case 'testimonial-grid': case 'testimonial_grid':   return <TestimonialGridBlock {...p} />;
      case 'testimonial':                                 return <TestimonialBlock {...p} />;
      case 'callout':                                     return <CalloutBlock {...p} />;
      case 'guarantee':                                   return <GuaranteeBlock {...p} />;
      case 'countdown':                                   return <CountdownBlock {...p} />;
      case 'stars':                                       return <StarsBlock {...p} />;
      case 'button':                                      return <ButtonBlock {...p} />;
      case 'faq':                                         return <FaqBlock {...p} />;
      case 'badge':                                       return <BadgeBlock {...p} />;
      case 'video':                                       return <VideoBlock {...p} preview={preview} />;
      case 'optin-form': case 'optin_form':
      case 'email-form': case 'email_form':
      case 'optin':                                       return <OptinFormBlock {...p} />;
      case 'divider':                                     return <DividerBlock />;
      case 'spacer':                                      return <SpacerBlock />;
      default:                                            return <FallbackBlock {...p} />;
    }
  };

  return (
    <PaletteProvider palette={pal}>
      <div
        onClick={e => { e.stopPropagation(); onSelect(); }}
        style={{
          position: 'relative', marginBottom: gap, borderRadius: 20,
          outline: selected ? `2.5px solid ${pal.accent}` : '2.5px solid transparent',
          outlineOffset: 6,
          transition: 'outline 0.12s',
        }}
      >
        {/* Floating toolbar – hidden in preview mode */}
        {selected && !preview && (
          <div onClick={e => e.stopPropagation()} style={{
            position: 'absolute', top: -44, left: '50%', transform: 'translateX(-50%)',
            background: '#0a0a0a', borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 1, padding: '4px 6px',
            zIndex: 50, boxShadow: '0 12px 40px rgba(0,0,0,0.35)', whiteSpace: 'nowrap',
          }}>
            <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 800, color: pal.accent, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '2px 10px', borderRight: '1px solid rgba(255,255,255,0.07)', marginRight: 2 }}>
              {block.type}
            </span>
            {[
              { icon: <ArrowUp size={12}/>, title: 'Up', fn: () => onMove(-1), dis: index===0 },
              { icon: <ArrowDown size={12}/>, title: 'Down', fn: () => onMove(1), dis: index===total-1 },
              { icon: <Copy size={12}/>, title: 'Duplicate', fn: onDuplicate, dis: false },
              { icon: <Trash2 size={12}/>, title: 'Delete', fn: onDelete, dis: false, danger: true },
            ].map(({ icon, title, fn, dis, danger }) => (
              <button key={title} title={title} onClick={fn} disabled={dis} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30, borderRadius: 8, border: 'none',
                background: 'none', cursor: dis ? 'default' : 'pointer',
                color: danger ? '#FF5555' : dis ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.12s',
              }}
                onMouseEnter={e => { if (!dis) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
              >{icon}</button>
            ))}
          </div>
        )}
        {/* Left accent bar – hidden in preview mode */}
        {selected && !preview && (
          <div style={{ position:'absolute', left:-5, top:'10%', bottom:'10%', width:3, borderRadius:3, background:`linear-gradient(to bottom, ${pal.accent}, ${pal.secondary})` }} />
        )}
        {/* Grip handle – hidden in preview mode */}
        {selected && !preview && (
          <div style={{ position:'absolute', left:-22, top:'50%', transform:'translateY(-50%)', color: pal.border, cursor:'grab', opacity: selected ? 1 : 0, transition:'opacity 0.12s' }}>
            <GripVertical size={13} />
          </div>
        )}
        {render()}
      </div>
    </PaletteProvider>
  );
}

export default BlockWrapper;