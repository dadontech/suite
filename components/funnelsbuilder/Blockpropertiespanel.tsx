'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  Type, Image as ImageIcon, Palette, Link, AlignLeft, AlignCenter, AlignRight,
  Plus, Trash2, ChevronDown, ChevronUp, RotateCcw, Copy, Settings,
  Layers, Zap, Star, Video, BarChart2, CheckSquare, Shield, Clock,
  List, Grid, MessageSquare, ArrowRight, Layout, Move,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Block {
  id: string;
  type: string;
  [key: string]: unknown;
}

interface PanelProps {
  block: Block;
  onUpdate: (patch: Partial<Block>) => void;
}

// ─── Design tokens (matches BlockWrapper) ─────────────────────────────────────

const T = {
  bg:       '#0f0f0f',
  surface:  '#1a1a1a',
  surface2: '#222222',
  surface3: '#2a2a2a',
  border:   'rgba(255,255,255,0.07)',
  border2:  'rgba(255,255,255,0.12)',
  accent:   '#F35D2C',
  text:     '#ffffff',
  text2:    'rgba(255,255,255,0.6)',
  text3:    'rgba(255,255,255,0.35)',
  green:    '#22c55e',
  red:      '#ef4444',
};

const FONTS = {
  ui: `'Open Sans', -apple-system, sans-serif`,
};

// ─── Atomic UI components ─────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: FONTS.ui, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: T.text3, margin: '0 0 6px', }}>
      {children}
    </p>
  );
}

function Section({ title, icon, children, defaultOpen = true }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
      }}>
        <span style={{ color: T.accent, display: 'flex' }}>{icon}</span>
        <span style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700, color: T.text2,
          letterSpacing: '0.08em', textTransform: 'uppercase', flex: 1, textAlign: 'left' }}>{title}</span>
        <span style={{ color: T.text3 }}>{open ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}</span>
      </button>
      {open && <div style={{ padding: '4px 16px 16px' }}>{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, multiline = false, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  multiline?: boolean; rows?: number;
}) {
  const base: React.CSSProperties = {
    width: '100%', background: T.surface2, border: `1px solid ${T.border}`,
    borderRadius: 6, padding: '8px 10px', fontFamily: FONTS.ui, fontSize: 12,
    color: T.text, outline: 'none', boxSizing: 'border-box', resize: 'vertical',
    lineHeight: 1.5, transition: 'border-color 0.15s',
  };
  const [focused, setFocused] = useState(false);

  if (multiline) {
    return (
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        onClick={e => e.stopPropagation()}
        placeholder={placeholder}
        rows={rows}
        style={{ ...base, borderColor: focused ? T.accent : T.border }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    );
  }
  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      onClick={e => e.stopPropagation()}
      placeholder={placeholder}
      style={{ ...base, borderColor: focused ? T.accent : T.border }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function NumberInput({ value, onChange, min = 0, max = 9999, step = 1 }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        onClick={e => e.stopPropagation()}
        min={min} max={max} step={step}
        style={{
          flex: 1, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 6,
          padding: '7px 10px', fontFamily: FONTS.ui, fontSize: 12, color: T.text, outline: 'none',
        }}
      />
    </div>
  );
}

function ColorInput({ value, onChange, label }: {
  value: string; onChange: (v: string) => void; label?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 6, background: value || '#000',
          border: `2px solid ${T.border2}`, cursor: 'pointer', overflow: 'hidden',
        }}>
          <input
            type="color"
            value={value || '#000000'}
            onChange={e => onChange(e.target.value)}
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', height: '100%', cursor: 'pointer', opacity: 0, position: 'absolute', inset: 0 }}
          />
        </div>
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        onClick={e => e.stopPropagation()}
        placeholder="#000000"
        style={{
          flex: 1, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 6,
          padding: '7px 10px', fontSize: 12, color: T.text, outline: 'none',
          fontFamily: 'monospace',
        }}
      />
      {label && <span style={{ fontFamily: FONTS.ui, fontSize: 11, color: T.text3, flexShrink: 0 }}>{label}</span>}
    </div>
  );
}

function SegmentControl({ value, onChange, options }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={{ display: 'flex', background: T.surface2, borderRadius: 6, padding: 2, gap: 2 }}>
      {options.map(opt => (
        <button key={opt.value} onClick={e => { e.stopPropagation(); onChange(opt.value); }} style={{
          flex: 1, padding: '6px 4px', borderRadius: 5, border: 'none', cursor: 'pointer',
          fontFamily: FONTS.ui, fontSize: 10, fontWeight: 700, transition: 'all 0.15s',
          background: value === opt.value ? T.accent : 'transparent',
          color: value === opt.value ? '#fff' : T.text3,
        }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function SelectInput({ value, onChange, options }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      onClick={e => e.stopPropagation()}
      style={{
        width: '100%', background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 6,
        padding: '8px 10px', fontFamily: FONTS.ui, fontSize: 12, color: T.text, outline: 'none',
        cursor: 'pointer',
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function SliderInput({ value, onChange, min = 0, max = 100, label }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; label?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <input
        type="range"
        min={min} max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        onClick={e => e.stopPropagation()}
        style={{ flex: 1, accentColor: T.accent, cursor: 'pointer' }}
      />
      <span style={{ fontFamily: FONTS.ui, fontSize: 11, color: T.text2, minWidth: 28, textAlign: 'right' }}>
        {value}{label}
      </span>
    </div>
  );
}

function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [tab, setTab] = useState<'url'|'upload'>('url');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
        {(['url','upload'] as const).map(t => (
          <button key={t} onClick={e => { e.stopPropagation(); setTab(t); }} style={{
            flex: 1, padding: '5px', borderRadius: 5, border: 'none', cursor: 'pointer',
            fontFamily: FONTS.ui, fontSize: 10, fontWeight: 700,
            background: tab === t ? T.accent : T.surface2,
            color: tab === t ? '#fff' : T.text3,
          }}>
            {t === 'url' ? 'URL' : 'Upload'}
          </button>
        ))}
      </div>

      {tab === 'url' ? (
        <TextInput value={value} onChange={onChange} placeholder="https://image.com/photo.jpg" />
      ) : (
        <div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile}
            style={{ display: 'none' }} onClick={e => e.stopPropagation()} />
          <button onClick={e => { e.stopPropagation(); fileRef.current?.click(); }} style={{
            width: '100%', padding: '10px', background: T.surface2, border: `2px dashed ${T.border2}`,
            borderRadius: 6, color: T.text2, fontFamily: FONTS.ui, fontSize: 12, cursor: 'pointer',
          }}>
            Click to Upload Image
          </button>
        </div>
      )}

      {value && (
        <div style={{ marginTop: 8, borderRadius: 6, overflow: 'hidden', height: 80, position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button onClick={e => { e.stopPropagation(); onChange(''); }} style={{
            position: 'absolute', top: 4, right: 4, width: 22, height: 22,
            background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: 4,
            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Trash2 size={10} />
          </button>
        </div>
      )}
    </div>
  );
}

// Array item editor — generic list of strings
function StringArrayEditor({ items, onChange, placeholder, addLabel = '+ Add Item' }: {
  items: string[]; onChange: (v: string[]) => void;
  placeholder?: string; addLabel?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{
            width: 18, height: 18, borderRadius: 3, background: T.accent, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONTS.ui, fontSize: 9, fontWeight: 800, color: '#fff',
          }}>{i + 1}</div>
          <input
            type="text"
            value={item}
            onChange={e => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
            onClick={e => e.stopPropagation()}
            placeholder={placeholder || `Item ${i + 1}`}
            style={{
              flex: 1, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 5,
              padding: '6px 8px', fontFamily: FONTS.ui, fontSize: 11, color: T.text, outline: 'none',
            }}
          />
          <button onClick={e => { e.stopPropagation(); onChange(items.filter((_,j)=>j!==i)); }} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: T.red, padding: 2,
            flexShrink: 0,
          }}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button onClick={e => { e.stopPropagation(); onChange([...items, '']); }} style={{
        background: T.surface2, border: `1px dashed ${T.border2}`, borderRadius: 5,
        padding: '7px 10px', fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700,
        color: T.accent, cursor: 'pointer', textAlign: 'left',
      }}>
        {addLabel}
      </button>
    </div>
  );
}

// FAQ editor
function FaqEditor({ items, onChange }: {
  items: { q: string; a: string }[];
  onChange: (v: { q: string; a: string }[]) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: T.surface2, borderRadius: 6, padding: 10, position: 'relative' }}>
          <button onClick={e => { e.stopPropagation(); onChange(items.filter((_,j)=>j!==i)); }} style={{
            position: 'absolute', top: 6, right: 6, background: 'none', border: 'none',
            cursor: 'pointer', color: T.red,
          }}>
            <Trash2 size={11} />
          </button>
          <Label>Q</Label>
          <input
            type="text" value={item.q}
            onChange={e => { const n=[...items]; n[i]={...n[i],q:e.target.value}; onChange(n); }}
            onClick={e => e.stopPropagation()}
            style={{ width:'100%', background:T.surface3, border:`1px solid ${T.border}`, borderRadius:4,
              padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none',
              boxSizing:'border-box', marginBottom:6 }}
          />
          <Label>A</Label>
          <textarea
            value={item.a}
            onChange={e => { const n=[...items]; n[i]={...n[i],a:e.target.value}; onChange(n); }}
            onClick={e => e.stopPropagation()}
            rows={2}
            style={{ width:'100%', background:T.surface3, border:`1px solid ${T.border}`, borderRadius:4,
              padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none',
              resize:'vertical', boxSizing:'border-box' }}
          />
        </div>
      ))}
      <button onClick={e => { e.stopPropagation(); onChange([...items, { q: '', a: '' }]); }} style={{
        background: T.surface2, border: `1px dashed ${T.border2}`, borderRadius: 5,
        padding: '7px 10px', fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700,
        color: T.accent, cursor: 'pointer', textAlign: 'left',
      }}>
        + Add FAQ Item
      </button>
    </div>
  );
}

// Stats editor
function StatsEditor({ stats, onChange }: {
  stats: { value: string; label: string }[];
  onChange: (v: { value: string; label: string }[]) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input
            type="text" value={s.value}
            onChange={e => { const n=[...stats]; n[i]={...n[i],value:e.target.value}; onChange(n); }}
            onClick={e => e.stopPropagation()}
            placeholder="Value" style={{ width:80, background:T.surface2, border:`1px solid ${T.border}`,
              borderRadius:5, padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none' }}
          />
          <input
            type="text" value={s.label}
            onChange={e => { const n=[...stats]; n[i]={...n[i],label:e.target.value}; onChange(n); }}
            onClick={e => e.stopPropagation()}
            placeholder="Label" style={{ flex:1, background:T.surface2, border:`1px solid ${T.border}`,
              borderRadius:5, padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none' }}
          />
          <button onClick={e => { e.stopPropagation(); onChange(stats.filter((_,j)=>j!==i)); }} style={{
            background:'none', border:'none', cursor:'pointer', color:T.red, flexShrink:0,
          }}>
            <Trash2 size={11} />
          </button>
        </div>
      ))}
      <button onClick={e => { e.stopPropagation(); onChange([...stats, { value: '', label: '' }]); }} style={{
        background: T.surface2, border: `1px dashed ${T.border2}`, borderRadius: 5,
        padding: '7px 10px', fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700,
        color: T.accent, cursor: 'pointer', textAlign: 'left',
      }}>
        + Add Stat
      </button>
    </div>
  );
}

// Columns editor (for Features block)
function ColumnsEditor({ cols, onChange }: {
  cols: { icon: string; title: string; body: string }[];
  onChange: (v: { icon: string; title: string; body: string }[]) => void;
}) {
  const icons = ['zap','target','users','award','clock','trending','heart','lightbulb','shield','check'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {cols.map((col, i) => (
        <div key={i} style={{ background: T.surface2, borderRadius: 8, padding: 12, position: 'relative' }}>
          <button onClick={e => { e.stopPropagation(); onChange(cols.filter((_,j)=>j!==i)); }} style={{
            position:'absolute', top:8, right:8, background:'none', border:'none', cursor:'pointer', color:T.red,
          }}>
            <Trash2 size={11} />
          </button>
          <div style={{ marginBottom:6 }}>
            <Label>Icon</Label>
            <SelectInput value={col.icon||'zap'} onChange={v => { const n=[...cols]; n[i]={...n[i],icon:v}; onChange(n); }}
              options={icons.map(ic => ({ value: ic, label: ic.charAt(0).toUpperCase()+ic.slice(1) }))} />
          </div>
          <div style={{ marginBottom:6 }}>
            <Label>Title</Label>
            <input type="text" value={col.title}
              onChange={e => { const n=[...cols]; n[i]={...n[i],title:e.target.value}; onChange(n); }}
              onClick={e => e.stopPropagation()}
              style={{ width:'100%', background:T.surface3, border:`1px solid ${T.border}`, borderRadius:4,
                padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none', boxSizing:'border-box' }}
            />
          </div>
          <Label>Description</Label>
          <textarea value={col.body} rows={2}
            onChange={e => { const n=[...cols]; n[i]={...n[i],body:e.target.value}; onChange(n); }}
            onClick={e => e.stopPropagation()}
            style={{ width:'100%', background:T.surface3, border:`1px solid ${T.border}`, borderRadius:4,
              padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none',
              resize:'vertical', boxSizing:'border-box' }}
          />
        </div>
      ))}
      <button onClick={e => { e.stopPropagation(); onChange([...cols, { icon:'zap', title:'New Feature', body:'Describe this feature here.' }]); }} style={{
        background: T.surface2, border: `1px dashed ${T.border2}`, borderRadius: 5,
        padding: '7px 10px', fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700,
        color: T.accent, cursor: 'pointer', textAlign: 'left',
      }}>
        + Add Column
      </button>
    </div>
  );
}

// Testimonials editor
function TestimonialsEditor({ items, onChange }: {
  items: { quote: string; author: string; title?: string; stars?: number }[];
  onChange: (v: { quote: string; author: string; title?: string; stars?: number }[]) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((t, i) => (
        <div key={i} style={{ background: T.surface2, borderRadius: 8, padding: 12, position: 'relative' }}>
          <button onClick={e => { e.stopPropagation(); onChange(items.filter((_,j)=>j!==i)); }} style={{
            position:'absolute', top:8, right:8, background:'none', border:'none', cursor:'pointer', color:T.red,
          }}>
            <Trash2 size={11} />
          </button>
          <div style={{ marginBottom:6 }}>
            <Label>Quote</Label>
            <textarea value={t.quote} rows={3}
              onChange={e => { const n=[...items]; n[i]={...n[i],quote:e.target.value}; onChange(n); }}
              onClick={e => e.stopPropagation()}
              style={{ width:'100%', background:T.surface3, border:`1px solid ${T.border}`, borderRadius:4,
                padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none',
                resize:'vertical', boxSizing:'border-box' }}
            />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:6 }}>
            <div>
              <Label>Name</Label>
              <input type="text" value={t.author}
                onChange={e => { const n=[...items]; n[i]={...n[i],author:e.target.value}; onChange(n); }}
                onClick={e => e.stopPropagation()}
                style={{ width:'100%', background:T.surface3, border:`1px solid ${T.border}`, borderRadius:4,
                  padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none', boxSizing:'border-box' }}
              />
            </div>
            <div>
              <Label>Title</Label>
              <input type="text" value={t.title||''}
                onChange={e => { const n=[...items]; n[i]={...n[i],title:e.target.value}; onChange(n); }}
                onClick={e => e.stopPropagation()}
                style={{ width:'100%', background:T.surface3, border:`1px solid ${T.border}`, borderRadius:4,
                  padding:'6px 8px', fontFamily:FONTS.ui, fontSize:11, color:T.text, outline:'none', boxSizing:'border-box' }}
              />
            </div>
          </div>
          <Label>Stars (1–5)</Label>
          <SliderInput value={t.stars||5} onChange={v => { const n=[...items]; n[i]={...n[i],stars:v}; onChange(n); }} min={1} max={5} />
        </div>
      ))}
      <button onClick={e => { e.stopPropagation(); onChange([...items, { quote:'', author:'', title:'Verified Buyer', stars:5 }]); }} style={{
        background: T.surface2, border: `1px dashed ${T.border2}`, borderRadius: 5,
        padding: '7px 10px', fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700,
        color: T.accent, cursor: 'pointer', textAlign: 'left',
      }}>
        + Add Testimonial
      </button>
    </div>
  );
}

// ─── Shared block sections ─────────────────────────────────────────────────────

function LayoutSection({ block, onUpdate }: PanelProps) {
  return (
    <Section title="Layout & Background" icon={<Layers size={13}/>}>
      <Field label="Background Color">
        <ColorInput
          value={String(block._bgOverride || block.bg || '')}
          onChange={v => onUpdate({ _bgOverride: v })}
        />
      </Field>
      <Field label="Top / Bottom Padding">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <Label>Top (px)</Label>
            <NumberInput
              value={Number(block._paddingTop ?? 0)}
              onChange={v => onUpdate({ _paddingTop: v })}
              min={0} max={200}
            />
          </div>
          <div>
            <Label>Bottom (px)</Label>
            <NumberInput
              value={Number(block._paddingBottom ?? 0)}
              onChange={v => onUpdate({ _paddingBottom: v })}
              min={0} max={200}
            />
          </div>
        </div>
      </Field>
    </Section>
  );
}

// ─── Per-type editor panels ────────────────────────────────────────────────────

function HeroEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Content" icon={<Type size={13}/>}>
        <Field label="Eyebrow / Label">
          <TextInput value={String(b.eyebrow||b.badge||'')} onChange={v=>u({eyebrow:v})} placeholder="LIMITED TIME OFFER" />
        </Field>
        <Field label="Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="Your Main Headline" multiline rows={2} />
        </Field>
        <Field label="Sub-Headline">
          <TextInput value={String(b.subheadline||'')} onChange={v=>u({subheadline:v})} placeholder="Supporting text..." multiline rows={2} />
        </Field>
        <Field label="CTA Button Text">
          <TextInput value={String(b.cta||'')} onChange={v=>u({cta:v})} placeholder="Get Instant Access Now" />
        </Field>
        <Field label="CTA Button Link">
          <TextInput value={String(b.ctaLink||'')} onChange={v=>u({ctaLink:v})} placeholder="https://..." />
        </Field>
        <Field label="Trust Badge (below button)">
          <TextInput value={String(b.badge||'')} onChange={v=>u({badge:v})} placeholder="Secure checkout · 60-day guarantee" />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Layout Variant">
          <SegmentControl value={String(b.variant||'centered')} onChange={v=>u({variant:v})}
            options={[{value:'centered',label:'Center'},{value:'dark',label:'Dark'},{value:'split',label:'Split'},{value:'minimal',label:'Minimal'}]} />
        </Field>
        <Field label="Background Color">
          <ColorInput value={String((b as Record<string,unknown>)._heroBg||'')} onChange={v=>u({_heroBg:v})} />
        </Field>
        <Field label="Headline Color">
          <ColorInput value={String((b as Record<string,unknown>)._headlineColor||'')} onChange={v=>u({_headlineColor:v})} />
        </Field>
        <Field label="Button Color">
          <ColorInput value={String((b as Record<string,unknown>)._btnColor||'')} onChange={v=>u({_btnColor:v})} />
        </Field>
        <Field label="Button Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._btnTextColor||'')} onChange={v=>u({_btnTextColor:v})} />
        </Field>
      </Section>
      {b.stats && (
        <Section title="Stats Bar" icon={<BarChart2 size={13}/>}>
          <StatsEditor
            stats={(b.stats as { value: string; label: string }[]) || []}
            onChange={v => u({ stats: v })}
          />
        </Section>
      )}
      <LayoutSection block={b} onUpdate={u} />
    </>
  );
}

function HeroDarkEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Content" icon={<Type size={13}/>}>
        <Field label="Eyebrow (ALL CAPS)">
          <TextInput value={String(b.eyebrow||'')} onChange={v=>u({eyebrow:v})} placeholder="TRUSTED BY 47,000+ CUSTOMERS" />
        </Field>
        <Field label="Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} multiline rows={2} />
        </Field>
        <Field label="Sub-label (accent color)">
          <TextInput value={String(b.subheadline||'')} onChange={v=>u({subheadline:v})} placeholder="THE SYSTEM" />
        </Field>
        <Field label="Body Text">
          <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} multiline rows={3} />
        </Field>
        <Field label="CTA Text">
          <TextInput value={String(b.cta||'')} onChange={v=>u({cta:v})} />
        </Field>
        <Field label="CTA Link">
          <TextInput value={String(b.ctaLink||'')} onChange={v=>u({ctaLink:v})} placeholder="https://..." />
        </Field>
      </Section>
      <Section title="Stats Bar" icon={<BarChart2 size={13}/>}>
        <StatsEditor
          stats={(b.stats as { value: string; label: string }[]) || []}
          onChange={v => u({ stats: v })}
        />
      </Section>
      <LayoutSection block={b} onUpdate={u} />
    </>
  );
}

function AttentionBarEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Content" icon={<Zap size={13}/>}>
        <Field label="Announcement Text">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="Limited time offer — expires tonight" multiline rows={2} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Background Color">
          <ColorInput value={String((b as Record<string,unknown>)._barBg||'')} onChange={v=>u({_barBg:v})} />
        </Field>
        <Field label="Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._barText||'')} onChange={v=>u({_barText:v})} />
        </Field>
      </Section>
    </>
  );
}

function ArticleEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Article Header" icon={<Type size={13}/>}>
        <Field label="Eyebrow Category">
          <TextInput value={String(b.eyebrow||b.badge||'')} onChange={v=>u({eyebrow:v})} placeholder="INDEPENDENT REVIEW 2026" />
        </Field>
        <Field label="Headline (H1)">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} multiline rows={3} />
        </Field>
        <Field label="Deck / Sub-headline">
          <TextInput value={String(b.subheadline||'')} onChange={v=>u({subheadline:v})} multiline rows={2} />
        </Field>
        <Field label="Author Name">
          <TextInput value={String(b.author||'')} onChange={v=>u({author:v})} placeholder="James Whitfield" />
        </Field>
        <Field label="Author Title / Date">
          <TextInput value={String(b.authorTitle||'')} onChange={v=>u({authorTitle:v})} placeholder="March 2026 · 12 min read" />
        </Field>
      </Section>
      <Section title="Variant" icon={<Layout size={13}/>}>
        <Field label="Style">
          <SegmentControl value={String(b.variant||'classic')} onChange={v=>u({variant:v})}
            options={[
              {value:'classic',label:'Classic'},{value:'nyt',label:'NYT'},
              {value:'magazine',label:'Mag'},{value:'dark',label:'Dark'},{value:'minimal',label:'Min'},
            ]} />
        </Field>
      </Section>
    </>
  );
}

function ParagraphEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Body Copy" icon={<AlignLeft size={13}/>}>
        <Field label="HTML Content">
          <TextInput value={String(b.body||b.content||'')} onChange={v=>u({body:v})} multiline rows={8} placeholder="<p>Your text here</p><h2>Section</h2>" />
        </Field>
        <p style={{ fontFamily: FONTS.ui, fontSize: 10, color: T.text3, marginTop: 4 }}>
          Supports HTML: &lt;p&gt; &lt;h2&gt; &lt;h3&gt; &lt;strong&gt; &lt;ul&gt;&lt;li&gt; &lt;ol&gt;&lt;li&gt;
        </p>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'')} onChange={v=>u({_textColor:v})} />
        </Field>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Font Size (px)">
          <SliderInput value={Number((b as Record<string,unknown>)._fontSize||16)} onChange={v=>u({_fontSize:v})} min={12} max={28} label="px" />
        </Field>
        <Field label="Line Height">
          <SliderInput value={Number((b as Record<string,unknown>)._lineHeight||185)} onChange={v=>u({_lineHeight:v})} min={100} max={250} label="%" />
        </Field>
      </Section>
    </>
  );
}

function HeadlineEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <Section title="Headline" icon={<Type size={13}/>}>
      <Field label="Text">
        <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} multiline rows={2} />
      </Field>
      <Field label="Text Color">
        <ColorInput value={String((b as Record<string,unknown>)._color||'')} onChange={v=>u({_color:v})} />
      </Field>
      <Field label="Accent Bar Color">
        <ColorInput value={String((b as Record<string,unknown>)._accentColor||'')} onChange={v=>u({_accentColor:v})} />
      </Field>
      <Field label="Font Size">
        <SliderInput value={Number((b as Record<string,unknown>)._size||36)} onChange={v=>u({_size:v})} min={20} max={80} label="px" />
      </Field>
      <Field label="Alignment">
        <SegmentControl value={String((b as Record<string,unknown>)._align||'left')} onChange={v=>u({_align:v})}
          options={[{value:'left',label:'Left'},{value:'center',label:'Center'},{value:'right',label:'Right'}]} />
      </Field>
    </Section>
  );
}

function SubheadingEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <Section title="Sub-heading" icon={<Type size={13}/>}>
      <Field label="Text">
        <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} multiline rows={2} />
      </Field>
      <Field label="Text Color">
        <ColorInput value={String((b as Record<string,unknown>)._color||'')} onChange={v=>u({_color:v})} />
      </Field>
      <Field label="Font Size">
        <SliderInput value={Number((b as Record<string,unknown>)._size||20)} onChange={v=>u({_size:v})} min={14} max={40} label="px" />
      </Field>
      <Field label="Alignment">
        <SegmentControl value={String((b as Record<string,unknown>)._align||'left')} onChange={v=>u({_align:v})}
          options={[{value:'left',label:'Left'},{value:'center',label:'Center'},{value:'right',label:'Right'}]} />
      </Field>
    </Section>
  );
}

function BulletsEditor({ block: b, onUpdate: u }: PanelProps) {
  const items = ((b.items||[]) as unknown[]).map(x => String(x||''));
  return (
    <>
      <Section title="Content" icon={<CheckSquare size={13}/>}>
        <Field label="Section Headline (optional)">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="What You Get..." />
        </Field>
        <Field label="Bullet Items">
          <StringArrayEditor items={items} onChange={v=>u({items:v})} placeholder="Benefit or feature..." addLabel="+ Add Bullet" />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Check Color">
          <ColorInput value={String((b as Record<string,unknown>)._checkColor||'')} onChange={v=>u({_checkColor:v})} />
        </Field>
        <Field label="Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'')} onChange={v=>u({_textColor:v})} />
        </Field>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Border Color">
          <ColorInput value={String((b as Record<string,unknown>)._borderColor||'')} onChange={v=>u({_borderColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function ImageEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <Section title="Image" icon={<ImageIcon size={13}/>}>
      <Field label="Image">
        <ImageInput value={String(b.imageUrl||'')} onChange={v=>u({imageUrl:v})} />
      </Field>
      <Field label="Aspect Ratio">
        <SegmentControl value={String(b.aspectRatio||'16/9')} onChange={v=>u({aspectRatio:v})}
          options={[{value:'21/9',label:'21:9'},{value:'16/9',label:'16:9'},{value:'4/3',label:'4:3'},{value:'1/1',label:'1:1'}]} />
      </Field>
      <Field label="Alt Text">
        <TextInput value={String(b.alt||'')} onChange={v=>u({alt:v})} placeholder="Describe the image..." />
      </Field>
      <Field label="Border Radius (px)">
        <SliderInput value={Number((b as Record<string,unknown>)._radius||10)} onChange={v=>u({_radius:v})} min={0} max={40} label="px" />
      </Field>
      <Field label="Shadow Depth">
        <SegmentControl value={String((b as Record<string,unknown>)._shadow||'md')} onChange={v=>u({_shadow:v})}
          options={[{value:'none',label:'None'},{value:'sm',label:'SM'},{value:'md',label:'MD'},{value:'lg',label:'LG'}]} />
      </Field>
    </Section>
  );
}

function VideoEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Content" icon={<Video size={13}/>}>
        <Field label="Above-video Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="Watch: Full Walkthrough" />
        </Field>
        <Field label="Caption / Below-video Text">
          <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} placeholder="Paste YouTube URL below..." multiline rows={2} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Container Background">
          <ColorInput value={String((b as Record<string,unknown>)._videoBg||'#0a0a0a')} onChange={v=>u({_videoBg:v})} />
        </Field>
        <Field label="Play Button Color">
          <ColorInput value={String((b as Record<string,unknown>)._playColor||'')} onChange={v=>u({_playColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function ButtonEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Content" icon={<ArrowRight size={13}/>}>
        <Field label="Button Text">
          <TextInput value={String(b.cta||'')} onChange={v=>u({cta:v})} placeholder="Get Instant Access Now" />
        </Field>
        <Field label="Button Link / URL">
          <TextInput value={String(b.ctaLink||'')} onChange={v=>u({ctaLink:v})} placeholder="https://..." />
        </Field>
        <Field label="Trust Line (below button)">
          <TextInput value={String(b.subheadline||'')} onChange={v=>u({subheadline:v})} placeholder="Secure checkout · 60-day guarantee" />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Variant">
          <SegmentControl value={String(b.variant||'primary')} onChange={v=>u({variant:v})}
            options={[{value:'primary',label:'Primary'},{value:'wide',label:'Wide'},{value:'ghost',label:'Ghost'}]} />
        </Field>
        <Field label="Button Background">
          <ColorInput value={String((b as Record<string,unknown>)._btnBg||'')} onChange={v=>u({_btnBg:v})} />
        </Field>
        <Field label="Button Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._btnText||'')} onChange={v=>u({_btnText:v})} />
        </Field>
        <Field label="Border Radius (px)">
          <SliderInput value={Number((b as Record<string,unknown>)._radius||6)} onChange={v=>u({_radius:v})} min={0} max={40} label="px" />
        </Field>
        <Field label="Font Size (px)">
          <SliderInput value={Number((b as Record<string,unknown>)._fontSize||22)} onChange={v=>u({_fontSize:v})} min={14} max={40} label="px" />
        </Field>
      </Section>
    </>
  );
}

function CountdownEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Content" icon={<Clock size={13}/>}>
        <Field label="Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="This Offer Expires In:" />
        </Field>
        <Field label="Minutes (starting time)">
          <NumberInput value={Number(b.minutes||30)} onChange={v=>u({minutes:v})} min={1} max={1440} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'#0f0c29')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Digit Background">
          <ColorInput value={String((b as Record<string,unknown>)._digitBg||'#1a1a2e')} onChange={v=>u({_digitBg:v})} />
        </Field>
        <Field label="Digit Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._digitColor||'#ffffff')} onChange={v=>u({_digitColor:v})} />
        </Field>
        <Field label="Headline Color">
          <ColorInput value={String((b as Record<string,unknown>)._headlineColor||'')} onChange={v=>u({_headlineColor:v})} />
        </Field>
        <Field label="Urgent Color (under 5 min)">
          <ColorInput value={String((b as Record<string,unknown>)._urgentColor||'#dc2626')} onChange={v=>u({_urgentColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function CalloutEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Content" icon={<Zap size={13}/>}>
        <Field label="Heading">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="Key Finding" />
        </Field>
        <Field label="Body Text">
          <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} multiline rows={3} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Border / Accent Color">
          <ColorInput value={String((b as Record<string,unknown>)._accentColor||'')} onChange={v=>u({_accentColor:v})} />
        </Field>
        <Field label="Background Color">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Heading Color">
          <ColorInput value={String((b as Record<string,unknown>)._headlineColor||'')} onChange={v=>u({_headlineColor:v})} />
        </Field>
        <Field label="Body Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'')} onChange={v=>u({_textColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function GuaranteeEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Content" icon={<Shield size={13}/>}>
        <Field label="Guarantee Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="60-Day Money-Back Guarantee" />
        </Field>
        <Field label="Guarantee Text">
          <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} multiline rows={3} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Shield / Icon Color">
          <ColorInput value={String((b as Record<string,unknown>)._shieldColor||'#22c55e')} onChange={v=>u({_shieldColor:v})} />
        </Field>
        <Field label="Background Color">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'#f0fff4')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Border Color">
          <ColorInput value={String((b as Record<string,unknown>)._borderColor||'#22c55e')} onChange={v=>u({_borderColor:v})} />
        </Field>
        <Field label="Headline Color">
          <ColorInput value={String((b as Record<string,unknown>)._headlineColor||'#14532d')} onChange={v=>u({_headlineColor:v})} />
        </Field>
        <Field label="Body Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'#166534')} onChange={v=>u({_textColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function FeaturesEditor({ block: b, onUpdate: u }: PanelProps) {
  const cols = ((b.columns || []) as { icon: string; title: string; body: string }[]);
  return (
    <>
      <Section title="Content" icon={<Grid size={13}/>}>
        <Field label="Section Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} />
        </Field>
        <Field label="Sub-headline">
          <TextInput value={String(b.subheadline||'')} onChange={v=>u({subheadline:v})} />
        </Field>
        <Field label="Feature Columns">
          <ColumnsEditor cols={cols} onChange={v=>u({columns:v})} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Variant">
          <SegmentControl value={String(b.variant||'cards')} onChange={v=>u({variant:v})}
            options={[{value:'cards',label:'Cards'},{value:'list',label:'List'},{value:'numbered',label:'Numbered'},{value:'dark',label:'Dark'}]} />
        </Field>
        <Field label="Icon Color">
          <ColorInput value={String((b as Record<string,unknown>)._iconColor||'')} onChange={v=>u({_iconColor:v})} />
        </Field>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Headline Color">
          <ColorInput value={String((b as Record<string,unknown>)._headlineColor||'')} onChange={v=>u({_headlineColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function StatsEditor2({ block: b, onUpdate: u }: PanelProps) {
  const stats = ((b.stats || []) as { value: string; label: string }[]);
  return (
    <>
      <Section title="Stats" icon={<BarChart2 size={13}/>}>
        <StatsEditor stats={stats} onChange={v=>u({stats:v})} />
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Variant">
          <SegmentControl value={String(b.variant||'dark')} onChange={v=>u({variant:v})}
            options={[{value:'dark',label:'Dark'},{value:'light',label:'Light'},{value:'inline',label:'Inline'}]} />
        </Field>
        <Field label="Number Color">
          <ColorInput value={String((b as Record<string,unknown>)._numColor||'')} onChange={v=>u({_numColor:v})} />
        </Field>
        <Field label="Label Color">
          <ColorInput value={String((b as Record<string,unknown>)._labelColor||'')} onChange={v=>u({_labelColor:v})} />
        </Field>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'')} onChange={v=>u({_bg:v})} />
        </Field>
      </Section>
    </>
  );
}

function TestimonialEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Quote" icon={<MessageSquare size={13}/>}>
        <Field label="Quote Text">
          <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} multiline rows={4} placeholder="This changed my life..." />
        </Field>
        <Field label="Author Name">
          <TextInput value={String(b.author||'')} onChange={v=>u({author:v})} placeholder="Sarah M." />
        </Field>
        <Field label="Author Title">
          <TextInput value={String(b.authorTitle||'')} onChange={v=>u({authorTitle:v})} placeholder="Verified Buyer" />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Accent Bar Color">
          <ColorInput value={String((b as Record<string,unknown>)._accentColor||'')} onChange={v=>u({_accentColor:v})} />
        </Field>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'#ffffff')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Quote Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'')} onChange={v=>u({_textColor:v})} />
        </Field>
        <Field label="Star Color">
          <ColorInput value={String((b as Record<string,unknown>)._starColor||'')} onChange={v=>u({_starColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function TestimonialGridEditor({ block: b, onUpdate: u }: PanelProps) {
  const items = ((b.testimonials || []) as { quote: string; author: string; title?: string; stars?: number }[]);
  return (
    <>
      <Section title="Testimonials" icon={<MessageSquare size={13}/>}>
        <Field label="Section Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="Real People. Real Results." />
        </Field>
        <Field label="Testimonials">
          <TestimonialsEditor items={items} onChange={v=>u({testimonials:v})} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Variant">
          <SegmentControl value={String(b.variant||'cards')} onChange={v=>u({variant:v})}
            options={[{value:'cards',label:'Cards'},{value:'dark',label:'Dark'},{value:'quotes',label:'Quotes'},{value:'featured',label:'Featured'}]} />
        </Field>
        <Field label="Card Background">
          <ColorInput value={String((b as Record<string,unknown>)._cardBg||'')} onChange={v=>u({_cardBg:v})} />
        </Field>
        <Field label="Card Border Color">
          <ColorInput value={String((b as Record<string,unknown>)._borderColor||'')} onChange={v=>u({_borderColor:v})} />
        </Field>
        <Field label="Quote Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'')} onChange={v=>u({_textColor:v})} />
        </Field>
        <Field label="Star Color">
          <ColorInput value={String((b as Record<string,unknown>)._starColor||'')} onChange={v=>u({_starColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function StarsEditor({ block: b, onUpdate: u }: PanelProps) {
  return (
    <Section title="Star Rating" icon={<Star size={13}/>}>
      <Field label="Rating (4.0 – 5.0)">
        <SliderInput value={Number(b.rating||4.9)} onChange={v=>u({rating:v})} min={3} max={5} label="" />
        <p style={{ fontFamily: FONTS.ui, fontSize: 11, color: T.accent, marginTop: 4 }}>
          Current: {Number(b.rating||4.9).toFixed(1)}
        </p>
      </Field>
      <Field label="Review Count">
        <TextInput value={String(b.ratingCount||'')} onChange={v=>u({ratingCount:v})} placeholder="2,847 verified reviews" />
      </Field>
      <Field label="Description">
        <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} placeholder="Rated highest in customer satisfaction" />
      </Field>
      <Field label="Star Color">
        <ColorInput value={String((b as Record<string,unknown>)._starColor||'')} onChange={v=>u({_starColor:v})} />
      </Field>
    </Section>
  );
}

function ComparisonEditor({ block: b, onUpdate: u }: PanelProps) {
  const proItems = ((b.proItems||[]) as unknown[]).map(String);
  const conItems = ((b.conItems||[]) as unknown[]).map(String);
  return (
    <>
      <Section title="Headers" icon={<List size={13}/>}>
        <Field label="Section Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} />
        </Field>
        <Field label="Sub-headline">
          <TextInput value={String(b.subheadline||'')} onChange={v=>u({subheadline:v})} />
        </Field>
        <Field label="Left Column Header (US)">
          <TextInput value={String(b.leftTitle||'')} onChange={v=>u({leftTitle:v})} placeholder="Our Product" />
        </Field>
        <Field label="Right Column Header (THEM)">
          <TextInput value={String(b.rightTitle||'')} onChange={v=>u({rightTitle:v})} placeholder="The Alternative" />
        </Field>
      </Section>
      <Section title="Left Column (Pro)" icon={<CheckSquare size={13}/>}>
        <StringArrayEditor items={proItems} onChange={v=>u({proItems:v})} placeholder="Advantage..." addLabel="+ Add Pro Row" />
      </Section>
      <Section title="Right Column (Con)" icon={<CheckSquare size={13}/>}>
        <StringArrayEditor items={conItems} onChange={v=>u({conItems:v})} placeholder="Disadvantage..." addLabel="+ Add Con Row" />
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Left Header Color">
          <ColorInput value={String((b as Record<string,unknown>)._leftHeaderColor||'')} onChange={v=>u({_leftHeaderColor:v})} />
        </Field>
        <Field label="Check Icon Color">
          <ColorInput value={String((b as Record<string,unknown>)._checkColor||'')} onChange={v=>u({_checkColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function FaqEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  const rawItems = ((b.items||[]) as unknown[]);
  const parsed = rawItems.map(item => {
    const s = String(item||'');
    const sep = s.indexOf(' | A: ');
    if (sep !== -1) return { q: s.slice(s.startsWith('Q: ')?3:0, sep).trim(), a: s.slice(sep+6).trim() };
    return { q: s, a: '' };
  });

  const save = (items: { q: string; a: string }[]) => {
    u({ items: items.map(x => `Q: ${x.q} | A: ${x.a}`) });
  };

  return (
    <Section title="FAQ Items" icon={<List size={13}/>}>
      <Field label="Section Headline">
        <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} placeholder="Frequently Asked Questions" />
      </Field>
      <Field label="Questions & Answers">
        <FaqEditor items={parsed} onChange={save} />
      </Field>
    </Section>
  );
}

function BadgeEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  const items = ((b.items||[]) as unknown[]).map(String);
  return (
    <>
      <Section title="Trust Badges" icon={<Shield size={13}/>}>
        <StringArrayEditor items={items} onChange={v=>u({items:v})} placeholder="Secure Checkout" addLabel="+ Add Badge" />
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Icon Color">
          <ColorInput value={String((b as Record<string,unknown>)._iconColor||'')} onChange={v=>u({_iconColor:v})} />
        </Field>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'#ffffff')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Border Color">
          <ColorInput value={String((b as Record<string,unknown>)._borderColor||'')} onChange={v=>u({_borderColor:v})} />
        </Field>
        <Field label="Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'')} onChange={v=>u({_textColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function OptinFormEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  const items = ((b.items||[]) as unknown[]).map(String);
  return (
    <>
      <Section title="Content" icon={<Type size={13}/>}>
        <Field label="Banner Text (top strip)">
          <TextInput value={String(b.badge||b.eyebrow||'')} onChange={v=>u({badge:v})} placeholder="FREE INSTANT ACCESS" />
        </Field>
        <Field label="Headline">
          <TextInput value={String(b.headline||'')} onChange={v=>u({headline:v})} multiline rows={2} />
        </Field>
        <Field label="Sub-headline">
          <TextInput value={String(b.subheadline||'')} onChange={v=>u({subheadline:v})} multiline rows={2} />
        </Field>
        <Field label="Button Text">
          <TextInput value={String(b.cta||'')} onChange={v=>u({cta:v})} placeholder="Send Me The Free Guide" />
        </Field>
        <Field label="Trust Line (below button)">
          <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} placeholder="No spam. Unsubscribe anytime." />
        </Field>
        <Field label="Bullet Benefits">
          <StringArrayEditor items={items} onChange={v=>u({items:v})} placeholder="Instant access — no waiting" addLabel="+ Add Benefit" />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Variant">
          <SegmentControl value={String(b.variant||'split')} onChange={v=>u({variant:v})}
            options={[{value:'split',label:'Split'},{value:'centered',label:'Center'},{value:'dark',label:'Dark'}]} />
        </Field>
        <Field label="Button Color">
          <ColorInput value={String((b as Record<string,unknown>)._btnColor||'')} onChange={v=>u({_btnColor:v})} />
        </Field>
        <Field label="Button Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._btnTextColor||'')} onChange={v=>u({_btnTextColor:v})} />
        </Field>
        <Field label="Card Background">
          <ColorInput value={String((b as Record<string,unknown>)._cardBg||'')} onChange={v=>u({_cardBg:v})} />
        </Field>
        <Field label="Headline Color">
          <ColorInput value={String((b as Record<string,unknown>)._headlineColor||'')} onChange={v=>u({_headlineColor:v})} />
        </Field>
        <Field label="Input Border Focus Color">
          <ColorInput value={String((b as Record<string,unknown>)._focusColor||'')} onChange={v=>u({_focusColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function PullQuoteEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Quote" icon={<MessageSquare size={13}/>}>
        <Field label="Quote Text">
          <TextInput value={String(b.body||b.headline||'')} onChange={v=>u({body:v})} multiline rows={3} />
        </Field>
        <Field label="Attribution (optional)">
          <TextInput value={String(b.author||'')} onChange={v=>u({author:v})} placeholder="— Author Name" />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Variant">
          <SegmentControl value={String(b.variant||'accent')} onChange={v=>u({variant:v})}
            options={[{value:'accent',label:'Accent'},{value:'dark',label:'Dark'},{value:'minimal',label:'Minimal'}]} />
        </Field>
        <Field label="Accent Color">
          <ColorInput value={String((b as Record<string,unknown>)._accentColor||'')} onChange={v=>u({_accentColor:v})} />
        </Field>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'')} onChange={v=>u({_bg:v})} />
        </Field>
        <Field label="Quote Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'')} onChange={v=>u({_textColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function TableOfContentsEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  const items = ((b.items||[]) as unknown[]).map(String);
  return (
    <Section title="Table of Contents" icon={<List size={13}/>}>
      <Field label="Heading">
        <TextInput value={String(b.headline||'Table of Contents')} onChange={v=>u({headline:v})} />
      </Field>
      <Field label="Sections">
        <StringArrayEditor items={items} onChange={v=>u({items:v})} placeholder="Section title..." addLabel="+ Add Section" />
      </Field>
    </Section>
  );
}

function AuthorBioEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Author" icon={<Type size={13}/>}>
        <Field label="Full Name">
          <TextInput value={String(b.author||'')} onChange={v=>u({author:v})} placeholder="James Whitfield" />
        </Field>
        <Field label="Title / Credentials">
          <TextInput value={String(b.authorTitle||'')} onChange={v=>u({authorTitle:v})} placeholder="Independent Reviewer · 7 Years Experience" />
        </Field>
        <Field label="Bio Text">
          <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} multiline rows={4} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Avatar Gradient Start">
          <ColorInput value={String((b as Record<string,unknown>)._avatarColor1||'')} onChange={v=>u({_avatarColor1:v})} />
        </Field>
        <Field label="Background">
          <ColorInput value={String((b as Record<string,unknown>)._bg||'')} onChange={v=>u({_bg:v})} />
        </Field>
      </Section>
    </>
  );
}

function ArticleVerdictEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Verdict" icon={<Star size={13}/>}>
        <Field label="Label">
          <TextInput value={String(b.headline||'Our Final Rating')} onChange={v=>u({headline:v})} />
        </Field>
        <Field label="Overall Score (8.5 – 10.0)">
          <SliderInput
            value={Number((b as Record<string,unknown>).score)||9.4}
            onChange={v=>u({score:v})}
            min={80} max={100}
            label=""
          />
          <p style={{ fontFamily:FONTS.ui, fontSize:11, color:T.accent, marginTop:4 }}>
            Score: {(Number((b as Record<string,unknown>).score)||9.4).toFixed(1)}
          </p>
        </Field>
        <Field label="Verdict Summary">
          <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} multiline rows={3} />
        </Field>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Header Gradient Start">
          <ColorInput value={String((b as Record<string,unknown>)._gradStart||'')} onChange={v=>u({_gradStart:v})} />
        </Field>
        <Field label="Bar Fill Color">
          <ColorInput value={String((b as Record<string,unknown>)._barColor||'')} onChange={v=>u({_barColor:v})} />
        </Field>
      </Section>
    </>
  );
}

function ArticleEndEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  return (
    <Section title="Article End" icon={<Type size={13}/>}>
      <Field label="Heading">
        <TextInput value={String(b.headline||'Did This Review Help You?')} onChange={v=>u({headline:v})} />
      </Field>
      <Field label="Closing Line">
        <TextInput value={String(b.body||'')} onChange={v=>u({body:v})} multiline rows={2} />
      </Field>
    </Section>
  );
}

function DropcapEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  return (
    <>
      <Section title="Opening Paragraph" icon={<Type size={13}/>}>
        <Field label="Paragraph Text (plain text only)">
          <TextInput value={String(b.body||b.content||'')} onChange={v=>u({body:v})} multiline rows={5} placeholder="I was deeply skeptical when I first heard about this..." />
        </Field>
        <p style={{ fontFamily:FONTS.ui, fontSize:10, color:T.text3, marginTop:4 }}>
          The first character becomes the large drop cap automatically.
        </p>
      </Section>
      <Section title="Style" icon={<Palette size={13}/>}>
        <Field label="Drop Cap Color">
          <ColorInput value={String((b as Record<string,unknown>)._dropCapColor||'')} onChange={v=>u({_dropCapColor:v})} />
        </Field>
        <Field label="Body Text Color">
          <ColorInput value={String((b as Record<string,unknown>)._textColor||'')} onChange={v=>u({_textColor:v})} />
        </Field>
        <Field label="Font Size (px)">
          <SliderInput value={Number((b as Record<string,unknown>)._fontSize||17)} onChange={v=>u({_fontSize:v})} min={14} max={28} label="px" />
        </Field>
      </Section>
    </>
  );
}

function SpacerEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  return (
    <Section title="Spacer" icon={<Move size={13}/>}>
      <Field label="Height (px)">
        <SliderInput value={Number((b as Record<string,unknown>)._height||48)} onChange={v=>u({_height:v})} min={8} max={200} label="px" />
      </Field>
    </Section>
  );
}

function DividerEditorPanel({ block: b, onUpdate: u }: PanelProps) {
  return (
    <Section title="Divider" icon={<Layers size={13}/>}>
      <Field label="Dot Color">
        <ColorInput value={String((b as Record<string,unknown>)._dotColor||'')} onChange={v=>u({_dotColor:v})} />
      </Field>
      <Field label="Line Color">
        <ColorInput value={String((b as Record<string,unknown>)._lineColor||'')} onChange={v=>u({_lineColor:v})} />
      </Field>
    </Section>
  );
}

// ─── Block type → icon map ─────────────────────────────────────────────────────

const BLOCK_ICONS: Record<string, React.ReactNode> = {
  hero: <Layers size={14}/>, 'hero-dark': <Layers size={14}/>, 'attention-bar': <Zap size={14}/>,
  article: <Type size={14}/>, paragraph: <AlignLeft size={14}/>, headline: <Type size={14}/>,
  subheading: <Type size={14}/>, bullets: <List size={14}/>, image: <ImageIcon size={14}/>,
  video: <Video size={14}/>, button: <ArrowRight size={14}/>, countdown: <Clock size={14}/>,
  callout: <Zap size={14}/>, guarantee: <Shield size={14}/>, stars: <Star size={14}/>,
  features: <Grid size={14}/>, stats: <BarChart2 size={14}/>, testimonial: <MessageSquare size={14}/>,
  'testimonial-grid': <MessageSquare size={14}/>, comparison: <List size={14}/>,
  faq: <List size={14}/>, badge: <Shield size={14}/>, 'optin-form': <CheckSquare size={14}/>,
  'pull-quote': <MessageSquare size={14}/>, 'table-of-contents': <List size={14}/>,
  'author-bio': <Type size={14}/>, 'article-verdict': <Star size={14}/>, 'article-end': <Type size={14}/>,
  'dropcap-paragraph': <AlignLeft size={14}/>, divider: <Layers size={14}/>, spacer: <Move size={14}/>,
};

const BLOCK_LABELS: Record<string, string> = {
  hero: 'Hero Section', 'hero-dark': 'Dark Hero', 'attention-bar': 'Attention Bar',
  article: 'Article Header', paragraph: 'Paragraph', headline: 'Headline',
  subheading: 'Sub-heading', bullets: 'Bullet List', image: 'Image',
  video: 'Video', button: 'CTA Button', countdown: 'Countdown Timer',
  callout: 'Callout Box', guarantee: 'Guarantee', stars: 'Star Rating',
  features: 'Feature Grid', stats: 'Stats Bar', testimonial: 'Testimonial',
  'testimonial-grid': 'Testimonial Grid', comparison: 'Comparison Table',
  faq: 'FAQ Accordion', badge: 'Trust Badges', 'optin-form': 'Email Opt-in Form',
  'pull-quote': 'Pull Quote', 'table-of-contents': 'Table of Contents',
  'author-bio': 'Author Bio', 'article-verdict': 'Verdict Scorecard',
  'article-end': 'Article End', 'dropcap-paragraph': 'Drop-cap Paragraph',
  divider: 'Divider', spacer: 'Spacer',
};

// ─── Main export ──────────────────────────────────────────────────────────────

export function BlockPropertiesPanel({ block, onUpdate }: PanelProps) {
  const type = block.type.replace(/_/g, '-');

  const renderEditor = () => {
    const p = { block, onUpdate };
    switch (type) {
      case 'hero':                                            return <HeroEditor {...p} />;
      case 'hero-dark':                                       return <HeroDarkEditor {...p} />;
      case 'attention-bar':                                   return <AttentionBarEditor {...p} />;
      case 'article': case 'article-intro':                   return <ArticleEditor {...p} />;
      case 'paragraph':                                       return <ParagraphEditor {...p} />;
      case 'dropcap-paragraph': case 'dropcap':               return <DropcapEditorPanel {...p} />;
      case 'headline':                                        return <HeadlineEditor {...p} />;
      case 'subheading':                                      return <SubheadingEditor {...p} />;
      case 'bullets':                                         return <BulletsEditor {...p} />;
      case 'image': case 'image-hero':                        return <ImageEditor {...p} />;
      case 'video':                                           return <VideoEditor {...p} />;
      case 'button':                                          return <ButtonEditor {...p} />;
      case 'countdown':                                       return <CountdownEditor {...p} />;
      case 'callout':                                         return <CalloutEditor {...p} />;
      case 'guarantee':                                       return <GuaranteeEditor {...p} />;
      case 'features':                                        return <FeaturesEditor {...p} />;
      case 'stats':                                           return <StatsEditor2 {...p} />;
      case 'testimonial':                                     return <TestimonialEditor {...p} />;
      case 'testimonial-grid':                                return <TestimonialGridEditor {...p} />;
      case 'stars':                                           return <StarsEditor {...p} />;
      case 'comparison':                                      return <ComparisonEditor {...p} />;
      case 'faq':                                             return <FaqEditorPanel {...p} />;
      case 'badge':                                           return <BadgeEditorPanel {...p} />;
      case 'optin-form': case 'optin': case 'email-form':     return <OptinFormEditorPanel {...p} />;
      case 'pull-quote': case 'pullquote':                    return <PullQuoteEditorPanel {...p} />;
      case 'table-of-contents': case 'toc':                   return <TableOfContentsEditorPanel {...p} />;
      case 'author-bio':                                      return <AuthorBioEditorPanel {...p} />;
      case 'article-verdict': case 'verdict':                 return <ArticleVerdictEditorPanel {...p} />;
      case 'article-end':                                     return <ArticleEndEditorPanel {...p} />;
      case 'divider':                                         return <DividerEditorPanel {...p} />;
      case 'spacer':                                          return <SpacerEditorPanel {...p} />;
      default:
        return (
          <div style={{ padding: 16 }}>
            <p style={{ fontFamily: FONTS.ui, fontSize: 12, color: T.text2 }}>
              No editor available for block type: <strong style={{ color: T.accent }}>{type}</strong>
            </p>
          </div>
        );
    }
  };

  return (
    <div style={{
      width: 280,
      background: T.bg,
      borderLeft: `1px solid ${T.border}`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: `1px solid ${T.border}`,
        background: T.surface,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, background: T.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {BLOCK_ICONS[type] || <Settings size={14} color="#fff"/>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 700, color: T.text, margin: 0 }}>
            {BLOCK_LABELS[type] || type}
          </p>
          <p style={{fontSize: 10, color: T.text3, margin: '1px 0 0', fontFamily: 'monospace' }}>
            {block.id}
          </p>
        </div>
        <div style={{
          padding: '2px 7px', background: T.surface2, borderRadius: 4,
          fontFamily: 'monospace', fontSize: 9, color: T.text3, flexShrink: 0,
        }}>
          {type}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {renderEditor()}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 16px',
        borderTop: `1px solid ${T.border}`,
        background: T.surface,
        display: 'flex',
        gap: 8,
        flexShrink: 0,
      }}>
        <button
          onClick={e => { e.stopPropagation(); onUpdate({}); }}
          style={{
            flex: 1, padding: '8px', background: T.surface2, border: `1px solid ${T.border}`,
            borderRadius: 6, color: T.text2, fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <RotateCcw size={11}/> Reset
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            navigator.clipboard.writeText(JSON.stringify(block, null, 2));
          }}
          style={{
            flex: 1, padding: '8px', background: T.surface2, border: `1px solid ${T.border}`,
            borderRadius: 6, color: T.text2, fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Copy size={11}/> Copy JSON
        </button>
      </div>
    </div>
  );
}

export default BlockPropertiesPanel;