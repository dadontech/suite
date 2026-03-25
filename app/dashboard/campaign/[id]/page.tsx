"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, Copy, Check, GitBranch, Mail,
  FileText, Layers, DollarSign, TrendingUp, Video, Zap,
  BarChart2, Target, Gift, HelpCircle, UserCheck, RotateCcw,
  Edit2, Trash2, Eye, X, Link2, Share2,
  Globe, Calendar, RefreshCw, Loader2, AlertCircle,
  Star, ChevronDown, ChevronUp, Play, Sparkles, Tag,
} from "lucide-react";

interface SocialSnippet { platform: "Twitter/X" | "LinkedIn" | "Facebook"; content: string; }
interface ProductInfo { title?: string; description?: string; price?: string; currency?: string; imageUrl?: string; imageUrls?: string[]; rating?: number; reviewCount?: number; features?: string[]; }
interface GeneratedContent { titles: string[]; metaDescription: string; article: string; socialSnippets: SocialSnippet[]; }
interface EmailStep { subject: string; timing: string; bodyPreview?: string; }
interface FunnelPage { id?: string; label?: string; blocks?: unknown[]; }
interface FunnelData { pages?: FunnelPage[]; emails?: EmailStep[]; }
interface Campaign {
  id: string; link: string; keyword: string; tone: string; wordCount: string;
  contentType: string; funnelType: string; generatedContent?: GeneratedContent;
  productInfo?: ProductInfo; funnelData?: FunnelData;
  funnelEmails?: EmailStep[];   // saved by CreateCampaign handleLaunch
  funnelSteps?: unknown[];
  createdAt: string;
}

const FM: Record<string, { name: string; accent: string; pages: { label: string; icon: React.ElementType; key?: boolean }[] }> = {
  bridge:       { name: "Bridge Funnel",       accent: "#F35D2C", pages: [{ label: "Opt-in Page", icon: Mail }, { label: "Bridge Page", icon: Video, key: true }] },
  vsl:          { name: "VSL Funnel",           accent: "#006E74", pages: [{ label: "Opt-in", icon: Mail }, { label: "VSL Watch", icon: Video, key: true }, { label: "Order", icon: DollarSign }, { label: "Upsell", icon: TrendingUp }, { label: "Thank You", icon: Check }] },
  review_bonus: { name: "Review + Bonus Stack", accent: "#16a34a", pages: [{ label: "Review Article", icon: FileText }, { label: "Bonus Reveal", icon: Gift, key: true }, { label: "Checkout", icon: DollarSign }] },
  quiz:         { name: "Quiz Funnel",          accent: "#7c3aed", pages: [{ label: "Quiz Landing", icon: HelpCircle }, { label: "Opt-in Gate", icon: Mail, key: true }, { label: "Results", icon: BarChart2 }, { label: "Offer", icon: DollarSign }] },
  webinar:      { name: "Auto-Webinar Funnel",  accent: "#d97706", pages: [{ label: "Registration", icon: UserCheck }, { label: "Confirmation", icon: Mail }, { label: "Watch Page", icon: Video, key: true }, { label: "Order", icon: DollarSign }, { label: "Replay", icon: RotateCcw }] },
  flash:        { name: "Flash Deal Funnel",    accent: "#e11d48", pages: [{ label: "Flash Deal", icon: Zap, key: true }, { label: "Order", icon: DollarSign }, { label: "Thank You + OTO", icon: Gift }] },
};

export default function CampaignDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [contentTab, setContentTab] = useState<"article" | "seo" | "social">("article");
  const [expandedEmail, setExpandedEmail] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/campaigns/${id}`)
      .then(r => { if (!r.ok) throw new Error("Campaign not found"); return r.json(); })
      .then((d: Campaign) => { setCampaign(d); setLoading(false); })
      .catch((e: Error) => { setError(e.message); setLoading(false); });
  }, [id]);

  const cp = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!confirm("Permanently delete this campaign?")) return;
    setDeleting(true);
    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    router.push("/dashboard");
  };

  const openBuilder = () => {
    if (!campaign) return;
    sessionStorage.setItem("funnelBuilderData", JSON.stringify({ ...campaign.funnelData, funnelType: campaign.funnelType }));
    router.push("/funnelsbuilder");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#F35D2C]/20 border-t-[#F35D2C] animate-spin" />
        <p className="text-[#6B5E5E]/50 text-xs font-medium tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );

  if (error || !campaign) return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto">
          <AlertCircle size={24} className="text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-[#1a1a1a]">Campaign not found</h2>
        <p className="text-sm text-[#6B5E5E]/60">{error}</p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F35D2C] text-white rounded-xl text-sm font-semibold">
          <ArrowLeft size={14} /> Back
        </Link>
      </div>
    </div>
  );

  const fm = FM[campaign.funnelType] || FM.bridge;
  const productName = campaign.productInfo?.title || campaign.keyword;
  const hasFunnel = !!(campaign.funnelData?.pages?.length);
  const hasContent = !!campaign.generatedContent;
  // emails may be stored as funnelEmails (top-level) or inside funnelData.emails
  const emails: EmailStep[] = campaign.funnelData?.emails?.length
    ? campaign.funnelData.emails
    : campaign.funnelEmails || [];
  const accent = fm.accent;
  const statusLabel = hasFunnel ? "Live" : hasContent ? "Content Ready" : "Draft";
  const statusBg = hasFunnel ? "bg-emerald-50 text-emerald-700 border-emerald-200" : hasContent ? "bg-[#F35D2C]/8 text-[#F35D2C] border-[#F35D2C]/20" : "bg-[#6B5E5E]/8 text-[#6B5E5E]/60 border-[#6B5E5E]/15";

  return (
    <div className="min-h-screen bg-[#FAFAF9]" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .au  { animation: fadeUp 0.35s ease both; }
        .au1 { animation: fadeUp 0.35s 0.04s ease both; }
        .au2 { animation: fadeUp 0.35s 0.08s ease both; }
        .au3 { animation: fadeUp 0.35s 0.12s ease both; }
        .au4 { animation: fadeUp 0.35s 0.16s ease both; }
        .au5 { animation: fadeUp 0.35s 0.20s ease both; }
        .card { background:#fff; border:1px solid rgba(0,0,0,0.07); border-radius:20px; }
        .card-inner { background:#FAFAF9; border:1px solid rgba(0,0,0,0.05); border-radius:14px; }
        .tab-line { position:relative; }
        .tab-line::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; border-radius:2px; background:#F35D2C; }
        .hover-row:hover { background:rgba(0,0,0,0.02); }
        .copy-reveal { opacity:0; transition:opacity 0.15s; }
        .group:hover .copy-reveal { opacity:1; }
        .tag-pill { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:99px; font-size:10px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.1); border-radius:4px; }
      `}</style>

      {/* ── HERO ── */}
      <div className="bg-white border-b border-black/5 relative overflow-hidden">
        {/* Subtle accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60, transparent)` }} />
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-[0.04]" style={{ background: accent, filter: "blur(80px)" }} />

        <div className="max-w-6xl mx-auto px-6 pt-7 pb-8 relative">
          {/* Top nav */}
          <div className="flex items-center justify-between mb-7 au">
            <Link href="/dashboard" className="flex items-center gap-2 text-[#6B5E5E]/50 hover:text-[#1a1a1a] transition-colors text-sm font-medium group">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Dashboard
            </Link>
            <div className="flex items-center gap-2">
              {hasFunnel && (
                <button onClick={openBuilder} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-sm"
                  style={{ background: accent, boxShadow: `0 2px 12px ${accent}30` }}>
                  <Eye size={13} /> Open Builder
                </button>
              )}
              <button onClick={() => router.push(`/dashboard/campaign/${id}/edit`)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-black/8 text-[#6B5E5E] hover:text-[#1a1a1a] hover:border-black/15 text-xs font-semibold transition-all">
                <Edit2 size={13} /> Edit
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-black/8 text-[#6B5E5E]/60 hover:text-red-500 hover:border-red-200 hover:bg-red-50 text-xs font-semibold transition-all disabled:opacity-40">
                {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
              </button>
            </div>
          </div>

          {/* Main header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="space-y-3 au1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`tag-pill border ${statusBg}`}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: hasFunnel ? "#22c55e" : hasContent ? accent : "#9ca3af" }} />
                  {statusLabel}
                </span>
                <span className="tag-pill bg-[#006E74]/8 text-[#006E74] border border-[#006E74]/15">
                  {fm.name}
                </span>
                {campaign.productInfo?.rating && (
                  <span className="tag-pill bg-amber-50 text-amber-700 border border-amber-200">
                    <Star size={9} className="fill-amber-500 text-amber-500" /> {campaign.productInfo.rating}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f0d0a] leading-tight" style={{ letterSpacing: "-0.03em" }}>
                {productName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B5E5E]/50">
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  {new Date(campaign.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag size={11} />
                  {campaign.contentType}
                </span>
                {campaign.productInfo?.price && (
                  <span className="flex items-center gap-1.5">
                    <DollarSign size={11} />
                    {campaign.productInfo.price}
                  </span>
                )}
              </div>
            </div>

            {/* Stat cards */}
            <div className="flex items-stretch gap-3 au2">
              {[
                { label: "Pages", value: fm.pages.length, icon: GitBranch },
                { label: "Emails", value: emails.length || "—", icon: Mail },
                { label: "Words", value: campaign.wordCount.replace(" words", ""), icon: FileText },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center px-5 py-3.5 rounded-2xl border border-black/7 bg-white min-w-[80px]"
                  style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                  <s.icon size={13} className="text-[#6B5E5E]/30 mb-1.5" />
                  <span className="text-2xl font-bold text-[#0f0d0a] leading-none">{s.value}</span>
                  <span className="text-[9px] font-mono text-[#6B5E5E]/40 mt-1 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 py-7 space-y-5">

        {/* Affiliate link bar */}
        <div className="card p-4 flex items-center gap-4 au group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
            <Globe size={14} style={{ color: accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-mono text-[#6B5E5E]/40 uppercase tracking-widest mb-0.5">Affiliate Link</p>
            <p className="text-sm text-[#6B5E5E] font-mono truncate">{campaign.link}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => cp(campaign.link, "link")}
              className="copy-reveal p-2 rounded-xl hover:bg-[#006E74]/8 text-[#6B5E5E]/40 hover:text-[#006E74] transition-all">
              {copiedId === "link" ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            </button>
            <a href={campaign.link} target="_blank" rel="noopener noreferrer"
              className="copy-reveal p-2 rounded-xl hover:bg-[#F35D2C]/8 text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-all">
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Funnel pipeline */}
            <div className="card p-5 au1">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-sm font-bold text-[#0f0d0a]">Funnel Pipeline</h2>
                  <p className="text-[11px] text-[#6B5E5E]/50 mt-0.5 font-mono">{fm.pages.length} pages</p>
                </div>
                {hasFunnel && (
                  <button onClick={openBuilder}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
                    style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}>
                    <Play size={9} /> Launch
                  </button>
                )}
              </div>

              <div className="space-y-0.5">
                {fm.pages.map((page, i) => {
                  const PIcon = page.icon;
                  const builtPage = campaign.funnelData?.pages?.[i];
                  const blocks = (builtPage?.blocks || []).length;
                  return (
                    <div key={i}>
                      {i > 0 && (
                        <div className="ml-[18px] my-0.5">
                          <div className="w-px h-3 ml-3" style={{ background: `${accent}25` }} />
                        </div>
                      )}
                      <div className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${page.key ? "border" : "hover:bg-[#FAFAF9]"}`}
                        style={page.key ? { background: `${accent}06`, borderColor: `${accent}20` } : {}}>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: page.key ? `${accent}12` : "#F5F4F2",
                            border: `1px solid ${page.key ? accent + "25" : "rgba(0,0,0,0.06)"}`,
                          }}>
                          <PIcon size={13} style={{ color: page.key ? accent : "#9ca3af" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] font-mono text-[#6B5E5E]/30 uppercase tracking-widest">Step {i + 1}</span>
                            {page.key && (
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                                style={{ background: `${accent}12`, color: accent }}>Key</span>
                            )}
                          </div>
                          <p className="text-sm font-semibold leading-tight" style={{ color: page.key ? "#0f0d0a" : "#6B5E5E" }}>
                            {page.label}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {blocks > 0 && <span className="text-[10px] font-mono text-[#6B5E5E]/30">{blocks}</span>}
                          {hasFunnel
                            ? <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                                <Check size={10} className="text-emerald-500" />
                              </div>
                            : <div className="w-5 h-5 rounded-full border border-black/10" />
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!hasFunnel && (
                <div className="mt-4 flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed">Funnel not built yet. Return to the campaign wizard to generate pages.</p>
                </div>
              )}
            </div>

            {/* Email sequence — always show, display placeholder if none loaded yet */}
            <div className="card p-5 au2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-[#0f0d0a]">Email Sequence</h2>
                  <p className="text-[11px] text-[#6B5E5E]/50 mt-0.5">
                    {emails.length > 0 ? `${emails.length} automated emails` : "No emails loaded"}
                  </p>
                </div>
              </div>
              {emails.length === 0 ? (
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F5F4F2] border border-black/5">
                  <Mail size={13} className="text-[#9B8E8E] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#9B8E8E] leading-relaxed">Email sequence not found. Emails are saved when you launch a campaign via the wizard.</p>
                </div>
              ) : (
              <div className="space-y-0.5">
                {emails.map((email, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden">
                      <button onClick={() => setExpandedEmail(expandedEmail === i ? null : i)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover-row rounded-2xl text-left transition-colors">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold font-mono bg-[#F5F4F2] text-[#6B5E5E]/60">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#0f0d0a] truncate">{email.subject}</p>
                          <p className="text-[10px] text-[#6B5E5E]/40 font-mono">{email.timing}</p>
                        </div>
                        {expandedEmail === i
                          ? <ChevronUp size={12} className="text-[#6B5E5E]/30 shrink-0" />
                          : <ChevronDown size={12} className="text-[#6B5E5E]/30 shrink-0" />
                        }
                      </button>
                      {expandedEmail === i && email.bodyPreview && (
                        <div className="px-3 pb-3 pl-12">
                          <p className="text-xs text-[#6B5E5E]/60 leading-relaxed italic border-l-2 border-[#F35D2C]/20 pl-3">{email.bodyPreview}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              </div>

            {/* Product info */}
            {campaign.productInfo && (
              <div className="card p-5 au3">
                <h2 className="text-sm font-bold text-[#0f0d0a] mb-4">Product Info</h2>
                <div className="space-y-4">
                  {campaign.productInfo.description && (
                    <p className="text-xs text-[#6B5E5E]/70 leading-relaxed">{campaign.productInfo.description}</p>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {campaign.productInfo.price && (
                      <div className="card-inner p-3">
                        <p className="text-[9px] font-mono text-[#6B5E5E]/40 uppercase tracking-widest mb-1">Price</p>
                        <p className="text-sm font-bold text-[#0f0d0a]">{campaign.productInfo.price}</p>
                      </div>
                    )}
                    {campaign.productInfo.rating && (
                      <div className="card-inner p-3">
                        <p className="text-[9px] font-mono text-[#6B5E5E]/40 uppercase tracking-widest mb-1">Rating</p>
                        <p className="text-sm font-bold text-[#0f0d0a] flex items-center gap-1">
                          <Star size={11} className="fill-amber-400 text-amber-400" />
                          {campaign.productInfo.rating}
                        </p>
                      </div>
                    )}
                  </div>
                  {campaign.productInfo.features && campaign.productInfo.features.length > 0 && (
                    <div>
                      <p className="text-[9px] font-mono text-[#6B5E5E]/40 uppercase tracking-widest mb-2.5">Key Features</p>
                      <div className="space-y-1.5">
                        {campaign.productInfo.features.slice(0, 5).map((f, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />
                            <p className="text-xs text-[#6B5E5E]/70 leading-snug">{f}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings */}
            <div className="card p-5 au4">
              <h2 className="text-sm font-bold text-[#0f0d0a] mb-4">Settings</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Keyword", value: campaign.keyword },
                  { label: "Tone", value: campaign.tone.split("(")[0].trim() },
                  { label: "Word Count", value: campaign.wordCount },
                  { label: "Content Type", value: campaign.contentType },
                ].map((item, i) => (
                  <div key={i} className="card-inner p-3">
                    <p className="text-[9px] font-mono text-[#6B5E5E]/40 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xs font-semibold text-[#0f0d0a] truncate">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="lg:col-span-3 space-y-5">

            {hasContent && campaign.generatedContent ? (
              <div className="card overflow-hidden au1">
                {/* Tab bar */}
                <div className="flex items-center border-b border-black/6 px-5 pt-4">
                  {(["article", "seo", "social"] as const).map((tab) => (
                    <button key={tab} onClick={() => setContentTab(tab)}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors mr-0.5 rounded-t-lg ${
                        contentTab === tab
                          ? "text-[#F35D2C] tab-line"
                          : "text-[#6B5E5E]/40 hover:text-[#6B5E5E]"
                      }`}>
                      {tab}
                    </button>
                  ))}
                  <div className="ml-auto mb-2.5">
                    {contentTab === "article" && (
                      <button onClick={() => cp(campaign.generatedContent!.article, "article")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-semibold text-[#6B5E5E]/50 hover:text-[#006E74] hover:bg-[#006E74]/8 border border-black/6 transition-all">
                        {copiedId === "article" ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                        Copy article
                      </button>
                    )}
                  </div>
                </div>

                {/* Article */}


                {contentTab === "article" && (() => {
                  const isScript = ["VSL Script", "Bridge Page Script", "Sales Letter"].includes(campaign.contentType);
                  const raw = campaign.generatedContent.article;

                  // ── Script formatter ──────────────────────────────────────
                  // Converts plain-text video scripts into structured HTML
                  const formatScript = (text: string): string => {
                    // If already has HTML tags, keep them and layer classes on top
                    if (/<[a-z][\s\S]*>/i.test(text)) return text;

                    const lines = text.split(/\n/);
                    let html = "";
                    

                    for (const raw of lines) {
                      const line = raw.trim();
                      if (!line) { html += "<br/>"; continue; }

                      // Scene / section headers: [HOOK], [SCENE 1], === HOOK ===, **HOOK**, --- HOOK ---
                      if (/^(\[.+\]|={2,}.+={2,}|-{3,}.+-{3,}|\*{2}.+\*{2})$/.test(line) ||
                          /^(SCENE|HOOK|INTRO|OPEN|CLOSE|CTA|OUTRO|BRIDGE|PROBLEM|SOLUTION|STORY|TESTIMONIAL|OFFER|BONUS|GUARANTEE|URGENCY|P\.?S\.?)[:\s\d]/i.test(line)) {
                        const label = line.replace(/[\[\]=\-\*]/g, "").trim();
                        html += `<div class="script-scene">${label}</div>`;
                        continue;
                      }

                      // On-screen / visual directions: (pause), [B-ROLL:], ON SCREEN:, VISUAL:
                      if (/^(\(.+\)|\[.+\]|ON[\s-]SCREEN:|VISUAL:|B[\s-]?ROLL:|GRAPHIC:|TEXT ON SCREEN:|SHOW:|DISPLAY:)/i.test(line)) {
                        html += `<div class="script-direction">${line}</div>`;
                        continue;
                      }

                      // Spoken copy — everything else is dialogue/narration
                      html += `<p class="script-line">${line}</p>`;
                    }
                    return html;
                  };

                  const articleHtml = isScript ? formatScript(raw) : raw;

                  return (
                    <div className="max-h-[680px] overflow-y-auto">
                      <style>{`
                        /* ── ARTICLE ────────────────────────────────── */
                        .article-body { font-family: 'Georgia','Times New Roman',serif; color: #2d2926; line-height: 1.85; font-size: 16px; }
                        .article-body h1 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:28px; font-weight:800; color:#0f0d0a; line-height:1.2; letter-spacing:-0.025em; margin:0 0 20px; }
                        .article-body h2 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:20px; font-weight:700; color:#0f0d0a; line-height:1.3; letter-spacing:-0.02em; margin:40px 0 14px; padding-top:8px; border-top:2px solid #f0ece8; }
                        .article-body h3 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:16px; font-weight:700; color:#1a1614; line-height:1.35; margin:28px 0 10px; }
                        .article-body h4 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:14px; font-weight:700; color:#1a1614; text-transform:uppercase; letter-spacing:0.06em; margin:24px 0 8px; }
                        .article-body p { margin:0 0 20px; }
                        .article-body p:first-child::first-letter { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:52px; font-weight:800; float:left; line-height:0.85; margin:6px 10px 0 0; color:var(--ac); }
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

                        /* ── VIDEO SCRIPT ───────────────────────────── */
                        .script-body { font-family:'Plus Jakarta Sans',system-ui,sans-serif; color:#1a1614; font-size:15px; line-height:1.75; }

                        /* Scene / section label — e.g. [HOOK], SCENE 1 */
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

                        /* Stage direction — (pause), [B-ROLL], ON SCREEN: */
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

                        /* Spoken copy — dialogue / narration */
                        .script-body .script-line {
                          font-size: 16px;
                          font-weight: 400;
                          color: #1a1614;
                          line-height: 1.85;
                          margin: 0 0 14px;
                          padding: 0;
                        }
                        .script-body .script-line strong {
                          font-weight: 700;
                          color: #0f0d0a;
                        }
                        .script-body .script-line em {
                          font-style: italic;
                          color: #5a5550;
                        }

                        /* Divider between scenes */
                        .script-body br + br { display: block; height: 8px; }
                      `}</style>

                      {/* Script header badge */}
                      {isScript && (
                        <div className="flex items-center gap-3 px-8 pt-6 pb-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-widest"
                            style={{ background: `${accent}08`, borderColor: `${accent}20`, color: accent }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                            {campaign.contentType}
                          </div>
                          <div className="h-px flex-1 bg-black/5" />
                          <span className="text-[11px] text-[#9B8E8E] font-mono">
                            {raw.split(/\s+/).filter(Boolean).length.toLocaleString()} words
                          </span>
                        </div>
                      )}

                      <div
                        className={isScript ? "script-body px-8 py-6" : "article-body px-8 py-8"}
                        style={{ "--ac": accent } as React.CSSProperties}
                        dangerouslySetInnerHTML={{ __html: articleHtml }}
                      />

                      {/* ── CONVERSION PATH — article content only ── */}
                      {!isScript && (() => {
                        const domain = (() => {
                          try { return new URL(campaign.link).hostname.replace("www.", ""); }
                          catch { return campaign.link.slice(0, 30); }
                        })();

                        type PathStep = {
                          num: string; label: string; sub: string; bg: string; border: string;
                          textColor: string; subColor: string; isCurrent?: boolean; isKey?: boolean;
                          isDestination?: boolean; icon?: React.ElementType;
                        };

                        const steps: PathStep[] = [
                          {
                            num: "01", label: "SEO Article",
                            sub: "Ranks on Google · reader clicks CTA",
                            bg: "#F5F2EF", border: "#E0DBD6",
                            textColor: "#0f0d0a", subColor: "#9B8E8E",
                            isCurrent: true,
                          },
                          ...fm.pages.map((p, i): PathStep => ({
                            num: String(i + 2).padStart(2, "0"),
                            label: p.label,
                            sub: p.key ? "Key conversion page" : `Funnel step ${i + 1}`,
                            bg: p.key ? accent : `${accent}10`,
                            border: p.key ? accent : `${accent}28`,
                            textColor: p.key ? "#fff" : "#0f0d0a",
                            subColor: p.key ? "rgba(255,255,255,0.7)" : "#9B8E8E",
                            isKey: !!p.key,
                            icon: p.icon as React.ElementType,
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
                          <div className="mx-8 mb-8 rounded-2xl border border-black/[0.07] overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center gap-3 px-5 py-3 border-b border-black/[0.06] bg-[#FAFAF8]">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" className="shrink-0">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                              </svg>
                              <span className="text-xs font-bold text-[#0f0d0a]">Conversion Path</span>
                              <div className="h-3.5 w-px bg-black/10" />
                              <span className="text-[11px] text-[#9B8E8E]">
                                Article → {fm.pages.length}pp → {domain}
                              </span>
                              <a
                                href={campaign.link} target="_blank" rel="noopener noreferrer"
                                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold shrink-0 transition-all"
                                style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}
                              >
                                <ExternalLink size={10} /> View Destination
                              </a>
                            </div>

                            {/* Steps row */}
                            <div className="flex items-stretch gap-0 overflow-x-auto px-4 py-4">
                              {steps.map((step, i) => {
                                const SIcon = step.icon;
                                return (
                                  <React.Fragment key={i}>
                                    <div
                                      className="flex flex-col items-center text-center min-w-[100px] max-w-[130px] flex-1 rounded-xl px-3 py-3 border"
                                      style={{ background: step.bg, borderColor: step.border }}
                                    >
                                      <span className="text-[8px] font-black font-mono tracking-widest mb-2 opacity-50"
                                        style={{ color: step.isKey ? "#fff" : "#9B8E8E" }}>
                                        {step.num}
                                      </span>
                                      <div className="w-7 h-7 rounded-xl flex items-center justify-center mb-2 shrink-0"
                                        style={{ background: step.isKey ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.05)" }}>
                                        {step.isCurrent ? (
                                          <FileText size={13} style={{ color: "#6B5E5E" }} />
                                        ) : step.isDestination ? (
                                          <Check size={13} style={{ color: "#16a34a" }} />
                                        ) : SIcon ? (
                                          <SIcon size={13} style={{ color: step.isKey ? "#fff" : accent }} />
                                        ) : null}
                                      </div>
                                      <p className="text-[11px] font-bold leading-tight mb-1 truncate w-full"
                                        style={{ color: step.textColor }}>{step.label}</p>
                                      <p className="text-[10px] leading-snug" style={{ color: step.subColor }}>{step.sub}</p>
                                      {step.isKey && (
                                        <span className="mt-1.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white">KEY</span>
                                      )}
                                      {step.isDestination && (
                                        <span className="mt-1.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">DESTINATION</span>
                                      )}
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

                            {/* Tip */}
                            <div className="flex items-start gap-2 px-5 py-3 border-t border-black/[0.05] bg-[#FAFAF8]">
                              <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: accent }} />
                              <p className="text-[11px] text-[#9B8E8E] leading-relaxed">
                                CTAs inside the article link to your <strong className="text-[#6B5E5E] font-semibold">funnel opt-in page</strong> — not directly to the affiliate link. This builds your email list first and protects your commissions.
                              </p>
                            </div>
                          </div>
                        );
                      })()}

                    </div>
                  );
                })()}

                {/* SEO */}
                {contentTab === "seo" && (
                  <div className="p-6 space-y-6">
                    <div>
                      <p className="text-[9px] font-mono text-[#6B5E5E]/40 uppercase tracking-widest mb-3">Title Variations</p>
                      <div className="space-y-1">
                        {campaign.generatedContent.titles.map((title, i) => (
                          <div key={i} className="group flex items-start gap-3 px-3 py-3 rounded-2xl hover-row transition-colors">
                            <span className="text-[10px] font-mono text-[#6B5E5E]/30 mt-0.5 w-4 shrink-0">0{i + 1}</span>
                            <p className="text-sm text-[#0f0d0a] flex-1 leading-snug font-medium">{title}</p>
                            <button onClick={() => cp(title, `t${i}`)} className="copy-reveal p-1.5 rounded-lg hover:bg-[#006E74]/8 text-[#6B5E5E]/40">
                              {copiedId === `t${i}` ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-black/5 pt-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[9px] font-mono text-[#6B5E5E]/40 uppercase tracking-widest">Meta Description</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono ${campaign.generatedContent.metaDescription.length > 160 ? "text-red-400" : "text-[#6B5E5E]/30"}`}>
                            {campaign.generatedContent.metaDescription.length}/160
                          </span>
                          <button onClick={() => cp(campaign.generatedContent!.metaDescription, "meta")}
                            className="p-1.5 rounded-lg hover:bg-[#006E74]/8 text-[#6B5E5E]/40">
                            {copiedId === "meta" ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-[#6B5E5E] leading-relaxed px-4 py-3 rounded-2xl bg-[#FAFAF9] border border-black/5">
                        {campaign.generatedContent.metaDescription}
                      </p>
                    </div>
                  </div>
                )}

                {/* Social */}
                {contentTab === "social" && (
                  <div className="p-6 space-y-4">
                    {campaign.generatedContent.socialSnippets.map((s, i) => (
                      <div key={i} className="rounded-2xl border border-black/6 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAF9] border-b border-black/5">
                          <div className={`flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full ${
                            s.platform === "Twitter/X" ? "bg-black text-white" :
                            s.platform === "LinkedIn" ? "bg-[#0A66C2] text-white" :
                            "bg-[#1877F2] text-white"}`}>
                            {s.platform === "Twitter/X" && <X size={10} />}
                            {s.platform === "LinkedIn" && <Link2 size={10} />}
                            {s.platform === "Facebook" && <Share2 size={10} />}
                            {s.platform}
                          </div>
                          <button onClick={() => cp(s.content, `s${i}`)}
                            className="p-1.5 rounded-lg hover:bg-[#006E74]/8 text-[#6B5E5E]/40 hover:text-[#006E74] transition-all">
                            {copiedId === `s${i}` ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                          </button>
                        </div>
                        <div className="px-4 py-3 bg-white">
                          <p className="text-sm text-[#6B5E5E] leading-relaxed whitespace-pre-line">{s.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-12 text-center au1">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
                  <Sparkles size={22} style={{ color: accent }} />
                </div>
                <h3 className="text-base font-bold text-[#0f0d0a] mb-2">No content generated yet</h3>
                <p className="text-sm text-[#6B5E5E]/60 mb-5 max-w-xs mx-auto leading-relaxed">Return to the campaign wizard to generate AI content for this campaign.</p>
                <Link href="/dashboard/campaign" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: accent }}>
                  <RefreshCw size={14} /> Regenerate
                </Link>
              </div>
            )}

            {/* Build funnel CTA */}
            {!hasFunnel && (
              <div className="rounded-2xl p-6 text-center border au2"
                style={{ background: `${accent}04`, borderColor: `${accent}15` }}>
                <p className="text-sm font-bold text-[#0f0d0a] mb-1">Funnel not built yet</p>
                <p className="text-xs text-[#6B5E5E]/60 mb-4 leading-relaxed">Return to the campaign wizard to build your conversion funnel pages.</p>
                <Link href="/dashboard/campaign" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: accent }}>
                  <GitBranch size={14} /> Build Funnel
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}