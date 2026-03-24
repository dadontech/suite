"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus, Search, Filter, LayoutGrid, List,
  FileText, BarChart2, Lightbulb, AlignJustify,
  Pencil, Trash2, ChevronDown, Eye, X, ExternalLink,
  Loader2, ArrowLeft, Globe, Calendar, Tag, Copy, Check,
  Mail, Video, DollarSign, TrendingUp, Gift, HelpCircle, UserCheck, RotateCcw, Zap,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────
interface Campaign {
  id: string;
  keyword: string;
  contentType: string;
  funnelType: string;
  createdAt: string;
  link?: string;
  generatedContent?: {
    titles: string[];
    metaDescription: string;
    article: string;
    socialSnippets: { platform: string; content: string }[];
  };
  productInfo?: {
    title?: string;
    description?: string;
    price?: string;
    currency?: string;
    imageUrl?: string;
    rating?: number;
    reviewCount?: number;
  };
}

// ─── Funnel mapping (for accent color & pages) ────────────────────────
const FM: Record<string, { name: string; accent: string; pages: { label: string; icon: React.ElementType; key?: boolean }[] }> = {
  bridge:       { name: "Bridge Funnel",       accent: "#F35D2C", pages: [{ label: "Opt-in Page", icon: Mail }, { label: "Bridge Page", icon: Video, key: true }] },
  vsl:          { name: "VSL Funnel",           accent: "#006E74", pages: [{ label: "Opt-in", icon: Mail }, { label: "VSL Watch", icon: Video, key: true }, { label: "Order", icon: DollarSign }, { label: "Upsell", icon: TrendingUp }, { label: "Thank You", icon: Check }] },
  review_bonus: { name: "Review + Bonus Stack", accent: "#16a34a", pages: [{ label: "Review Article", icon: FileText }, { label: "Bonus Reveal", icon: Gift, key: true }, { label: "Checkout", icon: DollarSign }] },
  quiz:         { name: "Quiz Funnel",          accent: "#7c3aed", pages: [{ label: "Quiz Landing", icon: HelpCircle }, { label: "Opt-in Gate", icon: Mail, key: true }, { label: "Results", icon: BarChart2 }, { label: "Offer", icon: DollarSign }] },
  webinar:      { name: "Auto-Webinar Funnel",  accent: "#d97706", pages: [{ label: "Registration", icon: UserCheck }, { label: "Confirmation", icon: Mail }, { label: "Watch Page", icon: Video, key: true }, { label: "Order", icon: DollarSign }, { label: "Replay", icon: RotateCcw }] },
  flash:        { name: "Flash Deal Funnel",    accent: "#e11d48", pages: [{ label: "Flash Deal", icon: Zap, key: true }, { label: "Order", icon: DollarSign }, { label: "Thank You + OTO", icon: Gift }] },
};

// ─── Type badges ──────────────────────────────────────────────────────
const TYPE_BADGE: Record<string, { bg: string; text: string }> = {
  "product review": { bg: "#FEF3EF", text: "#F35D2C" },
  "how-to guide":   { bg: "#EEF8F8", text: "#006E74" },
  "comparison":     { bg: "#F3EEFB", text: "#7c3aed" },
  "listicle":       { bg: "#FEF8EC", text: "#d97706" },
  "vsl script":     { bg: "#EDFAF3", text: "#16a34a" },
  "email sequence": { bg: "#FEF0F3", text: "#e11d48" },
  "sales letter":   { bg: "#F5F2EF", text: "#6B5E5E" },
};

const TYPE_ICON: Record<string, React.ElementType> = {
  "product review": FileText,
  "how-to guide":   Lightbulb,
  "comparison":     BarChart2,
  "listicle":       AlignJustify,
  "vsl script":     FileText,
  "email sequence": FileText,
  "sales letter":   FileText,
};

const THUMB_GRADIENT: Record<string, string> = {
  "product review": "from-[#1a1a3e] via-[#0a2a6e] to-[#0e4d8a]",
  "how-to guide":   "from-[#064e3b] via-[#065f46] to-[#047857]",
  "comparison":     "from-[#78350f] via-[#92400e] to-[#b45309]",
  "listicle":       "from-[#4c1d95] via-[#5b21b6] to-[#6d28d9]",
  "vsl script":     "from-[#1e3a5f] via-[#1e40af] to-[#2563eb]",
  "email sequence": "from-[#7f1d1d] via-[#991b1b] to-[#b91c1c]",
  "sales letter":   "from-[#1f2937] via-[#374151] to-[#4b5563]",
};

const THUMB_LABEL: Record<string, string> = {
  "product review": "REV",
  "how-to guide":   "HOW",
  "comparison":     "COM",
  "listicle":       "LIST",
  "vsl script":     "VSL",
  "email sequence": "EMAIL",
  "sales letter":   "SALES",
};

function getExcerpt(html: string, max = 120) {
  const plain = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return plain.length > max ? plain.slice(0, max) + "…" : plain;
}

// ─── HELPER: FORMAT SCRIPT (for video scripts) ──────────────────────────
function formatScript(text: string): string {
  if (/<[a-z][\s\S]*>/i.test(text)) return text;
  const lines = text.split(/\n/);
  let html = "";
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { html += "<br/>"; continue; }
    if (/^(\[.+\]|={2,}.+={2,}|-{3,}.+-{3,}|\*{2}.+\*{2})$/.test(line) ||
        /^(SCENE|HOOK|INTRO|OPEN|CLOSE|CTA|OUTRO|BRIDGE|PROBLEM|SOLUTION|STORY|TESTIMONIAL|OFFER|BONUS|GUARANTEE|URGENCY|P\.?S\.?)[:\s\d]/i.test(line)) {
      const label = line.replace(/[\[\]=\-\*]/g, "").trim();
      html += `<div class="script-scene">${label}</div>`;
      continue;
    }
    if (/^(\(.+\)|\[.+\]|ON[\s-]SCREEN:|VISUAL:|B[\s-]?ROLL:|GRAPHIC:|TEXT ON SCREEN:|SHOW:|DISPLAY:)/i.test(line)) {
      html += `<div class="script-direction">${line}</div>`;
      continue;
    }
    html += `<p class="script-line">${line}</p>`;
  }
  return html;
}

// ─── LIVE PREVIEW MODAL (with improved Google Search Preview) ───────────
function LivePreviewModal({ item, onClose }: { item: Campaign; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const title = item.generatedContent?.titles?.[0] || item.productInfo?.title || item.keyword;
  const rawArticle = item.generatedContent?.article || "";
  const meta = item.generatedContent?.metaDescription || "";
  const typeKey = item.contentType.toLowerCase();
  const badge = TYPE_BADGE[typeKey] || { bg: "#F5F2EF", text: "#6B5E5E" };

  const isScript = ["VSL Script", "Bridge Page Script", "Sales Letter"].includes(item.contentType);
  const article = isScript ? formatScript(rawArticle) : rawArticle;

  const funnelKey = item.funnelType?.toLowerCase() || "bridge";
  const fm = FM[funnelKey] || FM.bridge;
  const accent = fm.accent;

  // ✅ FIX: handle undefined link with fallback
  const domain = (() => {
    if (!item.link) return "affiliatelink.com";
    try {
      return new URL(item.link).hostname.replace("www.", "");
    } catch {
      return "affiliatelink.com";
    }
  })();

  // Build breadcrumb path: domain / keyword-slug
  const urlPath = `${domain} › ${item.keyword.toLowerCase().replace(/\s+/g, "-")}`;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const wordCount = rawArticle.split(/\s+/).filter(Boolean).length;

  const cp = () => {
    navigator.clipboard.writeText(rawArticle.replace(/<[^>]*>/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ Define StepItem type
  interface StepItem {
    num: string;
    label: string;
    sub: string;
    bg: string;
    border: string;
    textColor: string;
    subColor: string;
    isKey?: boolean;
    isCurrent?: boolean;
    isDestination?: boolean;
    icon?: React.ElementType;
  }

  const steps: StepItem[] = [
    {
      num: "01", label: "SEO Article",
      sub: "Ranks on Google · reader clicks CTA",
      bg: "#F5F2EF", border: "#E0DBD6",
      textColor: "#0f0d0a", subColor: "#9B8E8E",
      isCurrent: true,
    },
    ...fm.pages.map((p, i): StepItem => ({
      num: String(i + 2).padStart(2, "0"),
      label: p.label,
      sub: p.key ? "Key conversion page" : `Funnel step ${i + 1}`,
      bg: p.key ? accent : `${accent}10`,
      border: p.key ? accent : `${accent}28`,
      textColor: p.key ? "#fff" : "#0f0d0a",
      subColor: p.key ? "rgba(255,255,255,0.7)" : "#9B8E8E",
      isKey: !!p.key,
      icon: p.icon,
    })),
    {
      num: String(fm.pages.length + 2).padStart(2, "0"),
      label: domain,
      sub: "Affiliate platform · commission earned",
      bg: "#EDFAF3", border: "#86efac",
      textColor: "#15803d", subColor: "#4ade80",
      isDestination: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-stretch" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-4xl bg-white flex flex-col shadow-2xl animate-slide-in" style={{ animation: "slideIn 0.25s ease both" }}>
        <style>{`
          @keyframes slideIn { from { transform: translateX(48px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

          .article-body { font-family: 'Georgia','Times New Roman',serif; color: #2d2926; line-height: 1.85; font-size: 16px; }
          .article-body h1 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:28px; font-weight:800; color:#0f0d0a; line-height:1.2; letter-spacing:-0.025em; margin:0 0 20px; }
          .article-body h2 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:20px; font-weight:700; color:#0f0d0a; line-height:1.3; letter-spacing:-0.02em; margin:40px 0 14px; padding-top:8px; border-top:2px solid #f0ece8; }
          .article-body h3 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:16px; font-weight:700; color:#1a1614; line-height:1.35; margin:28px 0 10px; }
          .article-body h4 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:14px; font-weight:700; color:#1a1614; text-transform:uppercase; letter-spacing:0.06em; margin:24px 0 8px; }
          .article-body p { margin:0 0 20px; }
          .article-body p:first-child::first-letter { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:52px; font-weight:800; float:left; line-height:0.85; margin:6px 10px 0 0; color: var(--ac); }
          .article-body strong { font-weight:700; color:#0f0d0a; font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:0.94em; }
          .article-body em { font-style:italic; color:#5a5550; }
          .article-body a { color:var(--ac); text-decoration:underline; text-decoration-color:rgba(243,93,44,0.35); text-underline-offset:3px; }
          .article-body a:hover { text-decoration-color:var(--ac); }
          .article-body ul { margin:0 0 24px; padding:0; list-style:none; }
          .article-body ul li { position:relative; padding:6px 0 6px 22px; font-size:15px; color:#3d3936; border-bottom:1px solid #f5f2ef; }
          .article-body ul li:last-child { border-bottom:none; }
          .article-body ul li::before { content:''; position:absolute; left:0; top:16px; width:7px; height:7px; border-radius:50%; background:var(--ac); }
          .article-body ol { margin:0 0 24px; padding:0; list-style:none; counter-reset:ol-counter; }
          .article-body ol li { position:relative; padding:8px 0 8px 34px; font-size:15px; color:#3d3936; counter-increment:ol-counter; border-bottom:1px solid #f5f2ef; }
          .article-body ol li:last-child { border-bottom:none; }
          .article-body ol li::before { content:counter(ol-counter); position:absolute; left:0; top:7px; width:22px; height:22px; border-radius:50%; background:var(--ac); color:white; font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; }
          .article-body blockquote { margin:28px 0; padding:20px 24px; border-left:3px solid var(--ac); background:rgba(243,93,44,0.04); border-radius:0 12px 12px 0; font-style:italic; font-size:17px; color:#4a4540; }
          .article-body blockquote p { margin:0; }
          .article-body blockquote p::first-letter { font-size:inherit; float:none; font-weight:inherit; margin:0; color:inherit; }
          .article-body hr { border:none; border-top:1px solid #ebe7e3; margin:36px 0; }
          .article-body table { width:100%; border-collapse:collapse; margin:24px 0; font-size:14px; font-family:'Plus Jakarta Sans',system-ui,sans-serif; }
          .article-body table th { background:#f5f2ef; padding:10px 14px; text-align:left; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:#6B5E5E; border-bottom:2px solid #ebe7e3; }
          .article-body table td { padding:10px 14px; border-bottom:1px solid #f0ece8; color:#3d3936; }
          .article-body table tr:last-child td { border-bottom:none; }
          .article-body code { font-family:'DM Mono',monospace; font-size:13px; background:#f5f2ef; padding:2px 6px; border-radius:5px; color:#c2410c; }

          .script-body { font-family:'Plus Jakarta Sans',system-ui,sans-serif; color:#1a1614; font-size:15px; line-height:1.75; }
          .script-body .script-scene {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--ac);
            background: color-mix(in srgb, var(--ac) 10%, transparent);
            border: 1px solid color-mix(in srgb, var(--ac) 22%, transparent);
            padding: 4px 12px;
            border-radius: 99px;
            margin: 32px 0 16px;
          }
          .script-body .script-scene::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--ac);
            flex-shrink: 0;
          }
          .script-body .script-direction {
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            font-weight: 500;
            color: #9B8E8E;
            background: #F7F5F3;
            border: 1px solid #EDE9E5;
            border-left: 3px solid #D4CEC9;
            padding: 8px 14px;
            border-radius: 0 10px 10px 0;
            margin: 10px 0;
            letter-spacing: 0.01em;
          }
          .script-body .script-line {
            font-size: 16px;
            font-weight: 400;
            color: #1a1614;
            line-height: 1.85;
            margin: 0 0 14px;
            padding: 0;
          }
          .script-body .script-line strong { font-weight: 700; color: #0f0d0a; }
          .script-body .script-line em { font-style: italic; color: #5a5550; }
          .script-body br + br { display: block; height: 8px; }
        `}</style>

        {/* Top bar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-black/[0.07] bg-[#FAFAF8] shrink-0">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/6 text-[#9B8E8E] hover:text-[#0f0d0a] transition-colors">
            <X size={15} />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-white border border-black/[0.08] rounded-xl px-3 py-1.5 min-w-0">
            <Globe size={11} className="text-[#9B8E8E] shrink-0" />
            <span className="text-[11px] font-mono text-[#9B8E8E] truncate">
              {domain}/{item.keyword.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button onClick={cp} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-black/8 text-[#6B5E5E] hover:bg-[#006E74]/8 hover:text-[#006E74] transition-all">
              {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy text"}
            </button>
            <Link href={`/dashboard/campaign/${item.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold bg-[#F35D2C] text-white hover:bg-[#e04e1f] transition-colors">
              <ExternalLink size={11} />
              Full View
            </Link>
          </div>
        </div>

        {/* Google Search Preview - Enhanced */}
        <div className="px-6 py-4 border-b border-black/[0.05] bg-white shrink-0 hover:bg-[#FAFAF8] transition-colors">
          <div className="max-w-2xl space-y-0.5">
            <p className="text-[10px] text-[#9B8E8E] font-mono mb-1.5 uppercase tracking-wider">Google Search Preview</p>
            <p className="text-[#1a0dab] text-[16px] font-normal leading-[1.3] hover:underline cursor-pointer line-clamp-1">{title}</p>
            <p className="text-[#006621] text-[12px] font-normal leading-snug">{urlPath}</p>
            {meta && <p className="text-[#545454] text-[13px] leading-relaxed mt-0.5 line-clamp-3">{meta}</p>}
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-5 px-6 py-2.5 border-b border-black/[0.05] bg-[#FAFAF8] text-[11px] text-[#9B8E8E] shrink-0">
          <span className="flex items-center gap-1.5">
            <Tag size={10} />
            <span style={{ color: badge.text, background: badge.bg, padding: "2px 8px", borderRadius: "99px", fontSize: "10px", fontWeight: 700 }}>
              {item.contentType}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <FileText size={10} />
            {wordCount.toLocaleString()} words
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={10} />
            {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {article ? (
            <div>
              {isScript && (
                <div className="flex items-center gap-3 px-8 pt-6 pb-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-widest"
                    style={{ background: `${accent}08`, borderColor: `${accent}20`, color: accent }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    {item.contentType}
                  </div>
                  <div className="h-px flex-1 bg-black/5" />
                  <span className="text-[11px] text-[#9B8E8E] font-mono">{wordCount.toLocaleString()} words</span>
                </div>
              )}

              <div
                className={isScript ? "script-body px-8 py-6" : "article-body px-8 py-8"}
                style={{ "--ac": accent } as React.CSSProperties}
                dangerouslySetInnerHTML={{ __html: article }}
              />

              {!isScript && (
                <div className="mx-8 mb-8 rounded-2xl border border-black/[0.07] overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-black/[0.06] bg-[#FAFAF8]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" className="shrink-0">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    <span className="text-xs font-bold text-[#0f0d0a]">Conversion Path</span>
                    <div className="h-3.5 w-px bg-black/10" />
                    <span className="text-[11px] text-[#9B8E8E]">
                      Article → {fm.pages.length}pp → {domain}
                    </span>
                    <a href={item.link} target="_blank" rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold shrink-0 transition-all"
                      style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>
                      <ExternalLink size={10} /> View Destination
                    </a>
                  </div>

                  <div className="flex items-stretch gap-0 overflow-x-auto px-4 py-4">
                    {steps.map((step, i) => {
                      const SIcon = step.icon;
                      return (
                        <React.Fragment key={i}>
                          <div className="flex flex-col items-center text-center min-w-[100px] max-w-[130px] flex-1 rounded-xl px-3 py-3 border"
                            style={{ background: step.bg, borderColor: step.border }}>
                            <span className="text-[8px] font-black font-mono tracking-widest mb-2 opacity-50"
                              style={{ color: step.isKey ? "#fff" : "#9B8E8E" }}>
                              {step.num}
                            </span>
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center mb-2 shrink-0"
                              style={{ background: step.isKey ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.05)" }}>
                              {step.isCurrent ? <FileText size={13} style={{ color: "#6B5E5E" }} /> :
                               step.isDestination ? <Check size={13} style={{ color: "#16a34a" }} /> :
                               SIcon ? <SIcon size={13} style={{ color: step.isKey ? "#fff" : accent }} /> : null}
                            </div>
                            <p className="text-[11px] font-bold leading-tight mb-1 truncate w-full" style={{ color: step.textColor }}>{step.label}</p>
                            <p className="text-[10px] leading-snug" style={{ color: step.subColor }}>{step.sub}</p>
                            {step.isKey && <span className="mt-1.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white">KEY</span>}
                            {step.isDestination && <span className="mt-1.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">DESTINATION</span>}
                          </div>
                          {i < steps.length - 1 && (
                            <div className="flex items-center px-1 shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4CEC9" strokeWidth="2.5">
                                <polyline points="9 18 15 12 9 6"/>
                              </svg>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2 px-5 py-3 border-t border-black/[0.05] bg-[#FAFAF8]">
                    <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: accent }} />
                    <p className="text-[11px] text-[#9B8E8E] leading-relaxed">
                      CTAs inside the article link to your <strong className="text-[#6B5E5E] font-semibold">funnel opt-in page</strong> — not directly to the affiliate link. This builds your email list first and protects your commissions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-[#9B8E8E]">
              <FileText size={28} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">No article content generated yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DELETE CONFIRM MODAL ──────────────────────────────────────────────
function DeleteModal({ item, onClose, onDeleted }: { item: Campaign; onClose: () => void; onDeleted: () => void }) {
  const [deleting, setDeleting] = useState(false);
  const confirm = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/campaigns/${item.id}`, { method: "DELETE" });
      onDeleted();
    } catch { setDeleting(false); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-black/[0.07] shadow-2xl w-full max-w-sm p-6 space-y-4">
        <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto">
          <Trash2 size={18} className="text-red-400" />
        </div>
        <div className="text-center">
          <h3 className="text-base font-bold text-[#0f0d0a] mb-1">Delete Campaign?</h3>
          <p className="text-sm text-[#9B8E8E] leading-relaxed">
            <span className="font-semibold text-[#6B5E5E]">
              {item.generatedContent?.titles?.[0] || item.productInfo?.title || item.keyword}
            </span> will be permanently deleted. This cannot be undone.
          </p>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-black/8 text-sm font-semibold text-[#6B5E5E] hover:bg-[#F5F2EF] transition-colors">
            Cancel
          </button>
          <button onClick={confirm} disabled={deleting}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CONTENT CARD ──────────────────────────────────────────────────────
function ContentCard({
  item, isList, onPreview, onDelete
}: {
  item: Campaign;
  isList: boolean;
  onPreview: (item: Campaign) => void;
  onDelete: (item: Campaign) => void;
}) {
  const router = useRouter();
  const typeKey = item.contentType.toLowerCase();
  const Icon = TYPE_ICON[typeKey] || FileText;
  const badge = TYPE_BADGE[typeKey] || { bg: "#F5F2EF", text: "#6B5E5E" };
  const gradient = THUMB_GRADIENT[typeKey] || "from-[#1f2937] to-[#374151]";
  const label = THUMB_LABEL[typeKey] || "ART";
  const title = item.generatedContent?.titles?.[0] || item.productInfo?.title || item.keyword;
  const excerpt = getExcerpt(item.generatedContent?.article || "");
  const words = item.generatedContent?.article?.split(/\s+/).filter(Boolean).length || 0;

  return (
    <div className={`group relative bg-white border border-black/[0.07] rounded-2xl overflow-hidden
      hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200
      ${isList ? "flex flex-row h-[80px]" : "flex flex-col"}`}
    >
      {/* Thumbnail */}
      <div className={`relative bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0
        ${isList ? "w-[88px] h-full" : "h-[130px] w-full"}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(243,93,44,0.12),transparent_70%)]" />
        {!isList && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-white/12 border border-white/20 flex items-center justify-center">
              <Icon size={16} className="text-white/80" />
            </div>
          </div>
        )}
        <p className={`relative font-black text-white tracking-tighter z-10 ${isList ? "text-xl" : "text-4xl opacity-20"}`}>
          {label}
        </p>

        {/* Hover action buttons */}
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(item); }}
            title="Live preview"
            className="w-7 h-7 rounded-lg bg-white/95 border border-white/80 shadow-sm flex items-center justify-center hover:bg-white hover:scale-105 transition-all"
          >
            <Eye size={11} className="text-[#006E74]" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/campaign/${item.id}/edit`); }}
            title="Edit campaign"
            className="w-7 h-7 rounded-lg bg-white/95 border border-white/80 shadow-sm flex items-center justify-center hover:bg-white hover:scale-105 transition-all"
          >
            <Pencil size={11} className="text-[#F35D2C]" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(item); }}
            title="Delete campaign"
            className="w-7 h-7 rounded-lg bg-white/95 border border-white/80 shadow-sm flex items-center justify-center hover:bg-red-50 hover:scale-105 transition-all"
          >
            <Trash2 size={11} className="text-red-400" />
          </button>
        </div>

        {/* Type badge — grid only */}
        {!isList && (
          <span className="absolute bottom-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: badge.bg, color: badge.text }}>
            {item.contentType}
          </span>
        )}
      </div>

      {/* Body */}
      <div
        className={`${isList ? "flex-1 flex items-center justify-between px-4 min-w-0" : "p-4"} cursor-pointer`}
        onClick={() => router.push(`/dashboard/campaign/${item.id}`)}
      >
        {isList ? (
          <>
            <div className="min-w-0 flex-1 mr-4">
              <p className="text-[13px] font-bold text-[#0f0d0a] truncate">{title}</p>
              <p className="text-[11px] text-[#9B8E8E] mt-0.5 truncate">{item.funnelType} · {words.toLocaleString()} words</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full hidden sm:block"
                style={{ background: badge.bg, color: badge.text }}>
                {item.contentType}
              </span>
              <button onClick={(e) => { e.stopPropagation(); onPreview(item); }} className="p-1.5 rounded-lg hover:bg-[#006E74]/8 text-[#9B8E8E] hover:text-[#006E74] transition-colors" title="Live preview"><Eye size={13} /></button>
              <button onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/campaign/${item.id}/edit`); }} className="p-1.5 rounded-lg hover:bg-[#F35D2C]/8 text-[#9B8E8E] hover:text-[#F35D2C] transition-colors" title="Edit"><Pencil size={13} /></button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(item); }} className="p-1.5 rounded-lg hover:bg-red-50 text-[#9B8E8E] hover:text-red-400 transition-colors" title="Delete"><Trash2 size={13} /></button>
            </div>
          </>
        ) : (
          <div>
            <p className="text-[13px] font-bold text-[#0f0d0a] leading-snug mb-1.5 line-clamp-2">{title}</p>
            <p className="text-[11px] text-[#9B8E8E] leading-relaxed line-clamp-2 mb-3">{excerpt}</p>
            <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] text-[11px] text-[#9B8E8E]">
              <span className="font-medium">{item.funnelType}</span>
              <span className="font-medium">{words.toLocaleString()} words</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FILTER DROPDOWN ───────────────────────────────────────────────────
function TypeFilterDropdown({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-[#6B5E5E] hover:bg-[#006E74]/5 px-2 py-1 rounded-md transition-colors">
        <Filter size={13} className="text-[#9B8E8E]" />
        <span className="truncate max-w-[110px]">{value}</span>
        <ChevronDown size={13} className={`text-[#9B8E8E] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-44 bg-white border border-black/[0.07] rounded-xl shadow-lg overflow-hidden z-20">
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors
                ${value === opt ? "bg-[#F35D2C] text-white" : "text-[#6B5E5E] hover:bg-[#006E74]/5"}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────
const TYPE_FILTERS = ["All Types", "Product Review", "How-To Guide", "Comparison", "Listicle", "VSL Script", "Email Sequence", "Sales Letter"];

export default function ContentLibraryPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setType] = useState("All Types");
  const [viewMode, setView] = useState<"grid" | "list">("grid");
  const [previewItem, setPreviewItem] = useState<Campaign | null>(null);
  const [deleteItem, setDeleteItem] = useState<Campaign | null>(null);

  const load = useCallback(() => {
    fetch("/api/campaigns")
      .then(r => r.json())
      .then(d => { setCampaigns(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const check = () => { if (window.innerWidth < 640) setView("grid"); };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = campaigns.filter(c => {
    const matchType = typeFilter === "All Types" || c.contentType === typeFilter;
    const matchSearch = !search
      || c.keyword.toLowerCase().includes(search.toLowerCase())
      || (c.generatedContent?.titles?.[0] || "").toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleDeleted = () => {
    setDeleteItem(null);
    setCampaigns(prev => prev.filter(c => c.id !== deleteItem?.id));
  };

  return (
    <div className="bg-white min-h-full pb-32" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');`}</style>

      {previewItem && <LivePreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />}
      {deleteItem && <DeleteModal item={deleteItem} onClose={() => setDeleteItem(null)} onDeleted={handleDeleted} />}

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-5 md:py-7 pb-24 md:pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0f0d0a] tracking-tight">Content Library</h1>
            <p className="text-sm text-[#9B8E8E] mt-0.5">
              {loading ? "Loading…" : `${campaigns.length} campaign${campaigns.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Link href="/dashboard/campaign"
            className="flex items-center gap-2 bg-[#F35D2C] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#e04e1f] transition-colors w-full sm:w-auto justify-center shadow-sm shadow-[#F35D2C]/20">
            <Plus size={15} strokeWidth={2.5} /> New Campaign
          </Link>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border border-black/[0.07] rounded-2xl px-4 py-3 bg-white mb-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Search size={14} className="text-[#9B8E8E] shrink-0" />
            <input type="text" placeholder="Search campaigns…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 text-sm text-[#0f0d0a] placeholder-[#9B8E8E] outline-none bg-transparent min-w-0" />
          </div>
          <div className="w-full sm:w-px h-px sm:h-5 bg-black/8" />
          <TypeFilterDropdown value={typeFilter} onChange={setType} options={TYPE_FILTERS} />
          <div className="hidden sm:block w-px h-5 bg-black/8" />
          <div className="hidden sm:flex items-center gap-0.5 bg-[#F5F2EF] rounded-xl p-1">
            {(["grid", "list"] as const).map(mode => (
              <button key={mode} onClick={() => setView(mode)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === mode ? "bg-white shadow-sm text-[#F35D2C]" : "text-[#9B8E8E] hover:text-[#6B5E5E]"}`}>
                {mode === "grid" ? <LayoutGrid size={14} /> : <List size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* Grid / List */}
        {loading ? (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "flex flex-col gap-3"}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={`bg-white border border-black/[0.07] rounded-2xl overflow-hidden animate-pulse ${viewMode === "list" ? "h-20 flex" : ""}`}>
                {viewMode === "list" ? (
                  <>
                    <div className="w-20 h-full bg-[#F5F2EF]" />
                    <div className="flex-1 p-4 space-y-2">
                      <div className="h-3.5 w-3/4 bg-[#F5F2EF] rounded" />
                      <div className="h-2.5 w-1/2 bg-[#FAF8F6] rounded" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-[130px] bg-[#F5F2EF]" />
                    <div className="p-4 space-y-2">
                      <div className="h-3.5 w-4/5 bg-[#F5F2EF] rounded" />
                      <div className="h-2.5 w-3/5 bg-[#FAF8F6] rounded" />
                      <div className="h-2.5 w-2/5 bg-[#FAF8F6] rounded" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "flex flex-col gap-2.5"}>
            {filtered.map(c => (
              <ContentCard
                key={c.id}
                item={c}
                isList={viewMode === "list"}
                onPreview={setPreviewItem}
                onDelete={setDeleteItem}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-black/10 rounded-2xl flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F2EF] flex items-center justify-center border border-black/[0.06]">
              <FileText size={22} className="text-[#9B8E8E]" />
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-[#0f0d0a] mb-1">No content found</p>
              <p className="text-sm text-[#9B8E8E] max-w-xs leading-relaxed">
                {search || typeFilter !== "All Types" ? "Try adjusting your filters." : "Create your first campaign to see content here."}
              </p>
            </div>
            {!search && typeFilter === "All Types" && (
              <Link href="/dashboard/campaign"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F35D2C] text-white font-bold text-sm hover:bg-[#e04e1f] transition-colors">
                <Plus size={14} /> Create Campaign
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}