'use client'

import { useState, useEffect, useCallback } from "react";
import { T, css, BD, ICONS } from "./constants";
import { Ic } from "./icons";
import { uid } from "./utils";
import LeftPanel from "./LeftPanel";
import { BlockWrapper, PaletteProvider, type Palette } from "./BlockWrapper";
import { PropertiesPanel } from "./PropertiesPanel";
import { PageSettings } from "./PageSettings";
import { PreviewModal } from "./PreviewModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Block {
  id: string;
  type: string;
  label?: string;
  sublabel?: string;
  content?: string;
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  body?: string;
  cta?: string;
  ctaLink?: string;
  items?: string[];
  proItems?: string[];
  conItems?: string[];
  leftTitle?: string;
  rightTitle?: string;
  rating?: number;
  ratingCount?: string;
  author?: string;
  authorTitle?: string;
  badge?: string;
  minutes?: number;
  imageUrl?: string;
  aspectRatio?: string;
  alt?: string;
  columns?: Array<{ icon?: string; title: string; body: string }>;
  testimonials?: Array<{ quote: string; author: string; title?: string; stars?: number }>;
  stats?: Array<{ value: string; label: string }>;
  [key: string]: unknown;
}

interface Page {
  id: string;
  label: string;
  icon: string;
  bg: string;
  blocks: Block[];
}

interface FunnelBlockData {
  type?: string;
  label?: string;
  sublabel?: string;
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  body?: string;
  cta?: string;
  ctaLink?: string;
  items?: string[];
  proItems?: string[];
  conItems?: string[];
  leftTitle?: string;
  rightTitle?: string;
  rating?: number;
  ratingCount?: string;
  author?: string;
  authorTitle?: string;
  badge?: string;
  minutes?: number;
  imageUrl?: string;
  aspectRatio?: string;
  alt?: string;
  columns?: Array<{ icon?: string; title: string; body: string }>;
  testimonials?: Array<{ quote: string; author: string; title?: string; stars?: number }>;
  stats?: Array<{ value: string; label: string }>;
  content?: string;
  [key: string]: unknown;
}

interface FunnelPageData {
  id?: string;
  label?: string;
  icon?: string;
  bg?: string;
  blocks?: FunnelBlockData[];
  type?: string;
  headline?: string;
  body?: string;
  cta?: string;
  ctaLink?: string;
}

interface EmailStepData {
  subject: string;
  timing: string;
  purpose?: string;
  bodyPreview?: string;
}

interface VideoSuggestionData {
  title: string;
  embedUrl?: string;
  searchUrl?: string;
  videoUrl?: string;
}

interface FunnelData {
  pages?: FunnelPageData[];
  steps?: FunnelBlockData[];
  emails?: EmailStepData[];
  video?: VideoSuggestionData;
  funnelType?: string;
  palette?: Palette;
}

interface FunnelBuilderProProps {
  onComplete?: (finalData: FunnelData) => void;
  funnelType?: string;
  productName?: string;
  initialFunnelData?: FunnelData | null;
}

// ─── Default palette ──────────────────────────────────────────────────────────

const DEFAULT_PALETTE: Palette = {
  name: 'Modern Minimal',
  primary: '#111111',
  secondary: '#444444',
  accent: '#111111',
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F4F4',
  dark: '#000000',
  text: '#111111',
  textMuted: '#777777',
  border: 'rgba(0,0,0,0.09)',
};

// ─── Icon key map ─────────────────────────────────────────────────────────────

const PAGE_ICON_MAP: Record<string, string> = {
  fileText: 'fileText',
  gitBranch: 'gitBranch',
  shoppingCart: 'shoppingCart',
  mail: 'mail',
  eye: 'eye',
  lock: 'lock',
  check: 'check',
  rocket: 'rocket',
  layers: 'gitBranch',
  video: 'eye',
  gift: 'rocket',
  helpCircle: 'check',
  barChart: 'gitBranch',
  target: 'check',
  users: 'mail',
  zap: 'rocket',
};

function resolveIcon(iconKey: string): string {
  return PAGE_ICON_MAP[iconKey] ?? 'fileText';
}

// ─── Build pages from API data ────────────────────────────────────────────────

function buildPagesFromData(data: FunnelData, paletteBg?: string): Page[] {
  const bg = paletteBg || '#ffffff';
  if (data.pages && data.pages.length > 0) {
    return data.pages.map((p, i) => ({
      id: p.id || `page-${i}`,
      label: p.label || `Page ${i + 1}`,
      icon: resolveIcon(p.icon || 'fileText'),
      bg: p.bg || bg,
      blocks: (p.blocks || []).map(b => ({ ...b, id: uid(), type: b.type || 'paragraph' })) as Block[],
    }));
  }
  if (data.steps && data.steps.length > 0) {
    const pageMap = new Map<string, { icon: string; bg: string; blocks: Block[] }>();
    data.steps.forEach(step => {
      const pageLabel = String(step.label || 'Funnel Page');
      if (!pageMap.has(pageLabel)) {
        pageMap.set(pageLabel, { icon: 'fileText', bg, blocks: [] });
      }
      pageMap.get(pageLabel)!.blocks.push({ ...step, id: uid(), type: step.type || 'paragraph' } as Block);
    });
    if (pageMap.size > 0) {
      return Array.from(pageMap.entries()).map(([label, val], i) => ({
        id: `page-${i}`,
        label,
        icon: val.icon,
        bg: val.bg,
        blocks: val.blocks,
      }));
    }
    return [{
      id: 'custom',
      label: 'Custom Funnel',
      icon: 'rocket',
      bg,
      blocks: data.steps.map(s => ({ ...s, id: uid(), type: s.type || 'paragraph' } as Block)),
    }];
  }
  return [{ id: 'blog', label: 'Blog Post', icon: 'fileText', bg, blocks: [] }];
}

// ─── PaletteSwatch component ──────────────────────────────────────────────────

function PaletteSwatch({ palette }: { palette: Palette }) {
  return (
    <div style={{ padding: '14px 12px', borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.text3, marginBottom: 8 }}>
        Color Palette
      </p>
      <p style={{ fontSize: 12, fontWeight: 600, color: T.text2, marginBottom: 10 }}>{palette.name}</p>
      <div style={{ display: 'flex', gap: 5 }}>
        {[palette.primary, palette.accent, palette.secondary, palette.surface, palette.dark].map((color, i) => (
          <div key={i} title={color} style={{ width: 22, height: 22, borderRadius: 5, background: color, border: '1.5px solid rgba(0,0,0,0.14)', flexShrink: 0 }} />
        ))}
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FunnelBuilderPro({
  onComplete,
  funnelType: propFunnelType = 'bridge',
  productName = 'Your Product',
  initialFunnelData = null,
}: FunnelBuilderProProps) {

  // ── Palette ───────────────────────────────────────────────────────────────
  const [palette, setPalette] = useState<Palette>(initialFunnelData?.palette ?? DEFAULT_PALETTE);

  // ── Pages ─────────────────────────────────────────────────────────────────
  const [pages, setPages] = useState<Page[]>(() => {
    if (initialFunnelData) {
      const pal = initialFunnelData.palette ?? DEFAULT_PALETTE;
      return buildPagesFromData(initialFunnelData, pal.bg);
    }
    return [{ id: 'blog', label: 'Blog Post', icon: 'fileText', bg: DEFAULT_PALETTE.bg, blocks: [] }];
  });

  const [activePageId, setActivePageId] = useState<string>(() => {
    if (initialFunnelData) {
      const pal = initialFunnelData.palette ?? DEFAULT_PALETTE;
      return buildPagesFromData(initialFunnelData, pal.bg)[0]?.id ?? 'blog';
    }
    return 'blog';
  });

  const [funnelEmails, setFunnelEmails] = useState<EmailStepData[]>(initialFunnelData?.emails ?? []);
  const [funnelVideo, setFunnelVideo] = useState<VideoSuggestionData | undefined>(initialFunnelData?.video);
  const [funnelType, setFunnelType] = useState(initialFunnelData?.funnelType ?? propFunnelType);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'properties' | 'page'>('properties');
  const [showPreview, setShowPreview] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [future, setFuture] = useState<string[]>([]);
  const [leftTab, setLeftTab] = useState<'elements' | 'layers'>('elements');

  const activePage = pages.find(p => p.id === activePageId) ?? pages[0];
  const selectedBlock = activePage?.blocks.find(b => b.id === selectedId) ?? null;

  // ── History helpers ───────────────────────────────────────────────────────
  const push = (prev: Page[]) => {
    setHistory(h => [...h.slice(-29), JSON.stringify(prev)]);
    setFuture([]);
  };
  const updatePages = (cb: (prev: Page[]) => Page[]) => {
    setPages(prev => {
      push(prev);
      return cb(prev);
    });
  };
  const undo = () => {
    if (!history.length) return;
    const last = history[history.length - 1];
    setFuture(f => [JSON.stringify(pages), ...f]);
    setPages(JSON.parse(last));
    setHistory(h => h.slice(0, -1));
  };
  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setHistory(h => [...h, JSON.stringify(pages)]);
    setPages(JSON.parse(next));
    setFuture(f => f.slice(1));
  };

  // ── Block operations ──────────────────────────────────────────────────────
  const updateBlock = useCallback((id: string, patch: Partial<Block>) => {
    updatePages(prev =>
      prev.map(p =>
        p.id !== activePageId
          ? p
          : { ...p, blocks: p.blocks.map(b => b.id === id ? { ...b, ...patch } : b) }
      )
    );
  }, [activePageId]);

  const updatePage = (patch: Partial<Page>) => {
    updatePages(prev => prev.map(p => p.id !== activePageId ? p : { ...p, ...patch }));
  };

  const addBlock = (type: string) => {
    const nb: Block = { ...(BD[type as keyof typeof BD] ?? { type }), id: uid() };
    updatePages(prev =>
      prev.map(p => p.id !== activePageId ? p : { ...p, blocks: [...p.blocks, nb] })
    );
    setTimeout(() => {
      setSelectedId(nb.id);
      setRightTab('properties');
    }, 40);
  };

  const deleteBlock = (id: string) => {
    updatePages(prev =>
      prev.map(p =>
        p.id !== activePageId ? p : { ...p, blocks: p.blocks.filter(b => b.id !== id) }
      )
    );
    setSelectedId(null);
  };

  const duplicateBlock = (id: string) => {
    updatePages(prev =>
      prev.map(p => {
        if (p.id !== activePageId) return p;
        const i = p.blocks.findIndex(b => b.id === id);
        if (i === -1) return p;
        const copy = { ...p.blocks[i], id: uid() };
        const arr = [...p.blocks];
        arr.splice(i + 1, 0, copy);
        return { ...p, blocks: arr };
      })
    );
  };

  const moveBlock = (id: string, dir: number) => {
    updatePages(prev =>
      prev.map(p => {
        if (p.id !== activePageId) return p;
        const arr = [...p.blocks];
        const i = arr.findIndex(b => b.id === id);
        const j = i + dir;
        if (j < 0 || j >= arr.length) return p;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        return { ...p, blocks: arr };
      })
    );
  };

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const fn = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
      if (e.key === 'Escape') setSelectedId(null);
      if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId && document.activeElement?.tagName !== 'INPUT' && !document.activeElement?.hasAttribute('contenteditable')) {
        deleteBlock(selectedId);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [selectedId, history, future]);

  // ── Load from sessionStorage ──────────────────────────────────────────────
  useEffect(() => {
    const saved = sessionStorage.getItem('funnelBuilderData');
    if (!saved) return;
    try {
      const result = JSON.parse(saved) as FunnelData;
      const newPalette = result.palette ?? DEFAULT_PALETTE;
      setPalette(newPalette);
      const builtPages = buildPagesFromData(result, newPalette.bg);
      setPages(builtPages);
      if (builtPages.length > 0) setActivePageId(builtPages[0].id);
      if (result.emails?.length) setFunnelEmails(result.emails);
      if (result.video) setFunnelVideo(result.video);
      if (result.funnelType) setFunnelType(result.funnelType);
      sessionStorage.removeItem('funnelBuilderData');
    } catch (e) {
      console.error('Failed to parse funnelBuilderData', e);
    }
  }, []);

  // ── Auto‑embed suggested video into video block (NEW) ───────────────────────
useEffect(() => {
  // Only run for webinar/vsl funnels with a video suggestion that has a usable URL
  if (!funnelVideo?.videoUrl && !funnelVideo?.embedUrl) return;
  if (funnelType !== 'webinar' && funnelType !== 'vsl') return;

  // Extract a watch URL (https://youtu.be/... or https://www.youtube.com/watch?v=...)
  let watchUrl = funnelVideo.videoUrl;
  if (!watchUrl && funnelVideo.embedUrl) {
    const match = funnelVideo.embedUrl.match(/embed\/([\w-]{11})/);
    if (match) watchUrl = `https://www.youtube.com/watch?v=${match[1]}`;
  }
  if (!watchUrl) return;

  // Check if any video block already has a URL – don't override user changes
  let hasExistingUrl = false;
  for (const page of pages) {
    if (page.blocks.some(b => b.type === 'video' && b.url)) {
      hasExistingUrl = true;
      break;
    }
  }
  if (hasExistingUrl) return;

  // Find the first video block and set its url
  let updated = false;
  const newPages = pages.map(page => {
    const blocks = page.blocks.map(block => {
      if (block.type === 'video' && !block.url) {
        updated = true;
        return { ...block, url: watchUrl };
      }
      return block;
    });
    if (updated) return { ...page, blocks };
    return page;
  });

  if (updated) setPages(newPages);
}, [funnelVideo, funnelType, pages]);

  // ── Publish ───────────────────────────────────────────────────────────────
  const handlePublish = () => {
    if (!onComplete) return;
    onComplete({
      pages: pages.map(p => ({
        id: p.id,
        label: p.label,
        icon: p.icon,
        bg: p.bg,
        blocks: p.blocks.map(({ id: _id, ...rest }) => rest),
      })),
      steps: pages.flatMap(p =>
        p.blocks.map(({ id: _id, ...b }) => ({ ...b, label: p.label, sublabel: p.id }))
      ),
      emails: funnelEmails,
      video: funnelVideo,
      funnelType,
      palette,
    });
  };

  const FUNNEL_LABELS: Record<string, string> = {
    bridge: 'Bridge Funnel',
    vsl: 'VSL Funnel',
    review_bonus: 'Review + Bonus Stack',
    quiz: 'Quiz / Survey Funnel',
    webinar: 'Auto-Webinar Funnel',
    flash: 'Flash Deal Funnel',
    Review: 'Review Funnel',
    'Comparison Funnel': 'Comparison Funnel',
    Discount: 'Discount Funnel',
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="fb-root" style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: T.bg0, overflow: 'hidden' }}>
        {/* ── Top Bar ── */}
        <div style={{ background: T.bg1, borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', height: 48, flexShrink: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, paddingRight: 12 }}>
            <div style={{ width: 30, height: 30, background: `linear-gradient(135deg,${T.accent},#ff8c42)`, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(243,93,44,0.4)' }}>
              <Ic d={ICONS.rocket} s={15} c="white" sw={2} />
            </div>
            {funnelType && (
              <span style={{ fontSize: 10, fontWeight: 700, color: T.text3, background: T.bg3, border: `1px solid ${T.border}`, borderRadius: 6, padding: '3px 8px', letterSpacing: '.03em' }}>
                {FUNNEL_LABELS[funnelType] ?? funnelType}
              </span>
            )}
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, overflowX: 'auto' }}>
            {pages.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <button
                  onClick={() => { setActivePageId(p.id); setSelectedId(null); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 8, border: 'none',
                    cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'all 0.15s',
                    background: activePageId === p.id ? T.accentDim : 'none',
                    color: activePageId === p.id ? T.accent : T.text2,
                    boxShadow: activePageId === p.id ? `inset 0 0 0 1px ${T.accent}` : 'none',
                  }}
                >
                  <Ic d={ICONS[resolveIcon(p.icon) as keyof typeof ICONS] ?? ICONS.fileText} s={14} c={activePageId === p.id ? T.accent : T.text2} />
                  {p.label}
                  <span style={{ fontSize: 9, fontWeight: 700, background: activePageId === p.id ? T.accent : T.bg3, color: activePageId === p.id ? 'white' : T.text3, borderRadius: 99, padding: '1px 6px', minWidth: 16, textAlign: 'center' }}>
                    {p.blocks.length}
                  </span>
                </button>
                {i < pages.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 6, height: 1, background: T.text4 }} />
                    <Ic d={ICONS.chevR} s={9} c={T.text4} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div title={`Active palette: ${palette.name}`} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 7, background: T.bg3, border: `1px solid ${T.border}` }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[palette.primary, palette.accent, palette.secondary].map((color, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: color, border: '1px solid rgba(0,0,0,0.15)' }} />
                ))}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: T.text3, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {palette.name}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 2, background: T.bg3, borderRadius: 9, padding: 3 }}>
              {(
                [
                  [ICONS.undo, 'Undo ⌘Z', undo, !history.length],
                  [ICONS.redo, 'Redo ⌘⇧Z', redo, !future.length],
                ] as [string, string, () => void, boolean][]
              ).map(([d, t, fn, dis]) => (
                <button key={t} title={t} onClick={fn} disabled={dis} style={{
                  padding: '5px 7px', borderRadius: 7, border: 'none', cursor: dis ? 'default' : 'pointer',
                  background: 'none', color: dis ? T.text4 : T.text2, display: 'flex', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!dis) e.currentTarget.style.background = T.bg4; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}>
                  <Ic d={d} s={14} c={dis ? T.text4 : T.text2} />
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowPreview(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', background: T.bg3, border: 'none',
                borderRadius: 9, color: T.text2, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = T.bg4; e.currentTarget.style.color = T.text1; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.bg3; e.currentTarget.style.color = T.text2; }}
            >
              <Ic d={ICONS.eye} s={14} c="currentColor" /> Preview
            </button>

            <button
              onClick={handlePublish}
              style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '7px 18px', background: T.accent, border: 'none',
                borderRadius: 9, color: 'white', fontSize: 12, fontWeight: 900, cursor: 'pointer',
                boxShadow: '0 3px 14px rgba(243,93,44,0.4)', transition: 'all 0.15s',
              }}
              className="btn-lift"
            >
              <Ic d={ICONS.rocket} s={14} c="white" sw={2} /> Publish
            </button>
          </div>
        </div>

        {/* ── Main 3‑panel layout ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <LeftPanel
            leftTab={leftTab}
            setLeftTab={setLeftTab}
            activePage={activePage}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setRightTab={setRightTab}
            addBlock={addBlock}
          />

          {/* ── Center Canvas ── */}
          <div
            style={{ flex: 1, background: T.bg2, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            onClick={() => setSelectedId(null)}
          >
            <div style={{ background: T.bg1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 34, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
                <span style={{ fontSize: 11, color: T.text3, fontWeight: 600 }}>
                  {activePage?.label} · {activePage?.blocks.length} blocks
                  {selectedBlock ? ` · ${selectedBlock.type} selected` : ''}
                </span>
              </div>
              <span style={{ fontSize: 10, color: T.text4 }}>Click text to edit · ⌘Z undo</span>
            </div>

            <div
              className="canvas-grid"
              style={{ flex: 1, overflowY: 'auto', padding: '28px 20px' }}
              onClick={e => e.target === e.currentTarget && setSelectedId(null)}
            >
              <div
                style={{ width: '100%', background: activePage?.bg ?? palette.bg, borderRadius: 16, overflow: 'hidden' }}
                onClick={e => e.stopPropagation()}
              >
                <PaletteProvider palette={palette}>
                  <div style={{ padding: '56px 56px 0' }}>
                    {activePage?.blocks.map((block, i) => (
                      <BlockWrapper
                        key={block.id}
                        block={block}
                        index={i}
                        total={activePage.blocks.length}
                        selected={selectedId === block.id}
                        palette={palette}
                        onSelect={() => {
                          setSelectedId(block.id === selectedId ? null : block.id);
                          setRightTab('properties');
                        }}
                        onUpdate={updated => updateBlock(block.id, updated)}
                        onMove={dir => moveBlock(block.id, dir)}
                        onDelete={() => deleteBlock(block.id)}
                        onDuplicate={() => duplicateBlock(block.id)}
                        // preview is false by default
                      />
                    ))}

                    <div
                      onClick={e => { e.stopPropagation(); addBlock('paragraph'); }}
                      style={{
                        border: `2px dashed ${T.border}`, borderRadius: 12, padding: '22px 0', marginTop: 24,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: T.text4,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = T.accent;
                        e.currentTarget.style.color = T.accent;
                        e.currentTarget.style.background = T.accentDim;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = T.border;
                        e.currentTarget.style.color = T.text4;
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      <Ic d={ICONS.plus} s={16} c="currentColor" />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Add a block</span>
                    </div>
                    <div style={{ height: 48 }} />
                  </div>
                </PaletteProvider>
              </div>
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div style={{ width: 240, background: T.bg1, borderLeft: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ display: 'flex', padding: '10px 10px 0', gap: 4, flexShrink: 0 }}>
              {[
                ['properties', 'Properties'],
                ['page', 'Page'],
              ].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setRightTab(v as 'properties' | 'page')}
                  style={{
                    flex: 1, padding: '6px 0', borderRadius: '8px 8px 0 0', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700,
                    transition: 'all 0.15s', background: rightTab === v ? T.bg2 : 'none', color: rightTab === v ? T.text1 : T.text3,
                    borderBottom: rightTab === v ? `2px solid ${T.accent}` : '2px solid transparent',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div style={{ height: 1, background: T.border }} />
            <div style={{ flex: 1, overflow: 'auto' }}>
              {rightTab === 'properties' ? (
                <PropertiesPanel
                  block={selectedBlock}
                  onChange={(patch: Partial<Block>) => selectedBlock && updateBlock(selectedBlock.id, patch)}
                />
              ) : (
                <PageSettings
                  page={activePage ? { id: activePage.id, bg: activePage.bg, blocks: activePage.blocks } : undefined}
                  onChange={patch => updatePage(patch as Partial<Page>)}
                />
              )}
            </div>
            <PaletteSwatch palette={palette} />
          </div>
        </div>

        {showPreview && (
          <PreviewModal
            pages={pages}
            startPage={activePageId}
            video={funnelVideo}
            palette={palette}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </>
  );
}