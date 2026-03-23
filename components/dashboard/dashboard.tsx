"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus, DollarSign, Eye, MousePointer2, TrendingUp, Zap,
  ArrowUpRight, GitBranch, Mail, Video, FileText, Gift,
  HelpCircle, UserCheck, RotateCcw, ArrowRight, Layers,
  BarChart2, Activity, Target, ChevronRight,
  ExternalLink, Calendar, Cpu, Rocket, LayoutGrid,
} from "lucide-react";

interface Campaign {
  id: string;
  link: string;
  keyword: string;
  tone: string;
  wordCount: string;
  contentType: string;
  funnelType: string;
  generatedContent?: { titles: string[]; metaDescription: string; article: string; socialSnippets: unknown[] };
  productInfo?: { title?: string; price?: string; currency?: string; imageUrl?: string; rating?: number; reviewCount?: number };
  funnelData?: { pages?: unknown[]; emails?: unknown[] };
  createdAt: string;
}

const FM: Record<string, { name: string; short: string; accent: string; bg: string; icon: React.ElementType; pageCount: number; cvr: string }> = {
  bridge:       { name: "Bridge Funnel",       short: "Bridge",  accent: "#F35D2C", bg: "#FEF3EF", icon: Layers,     pageCount: 2, cvr: "18–34%" },
  vsl:          { name: "VSL Funnel",           short: "VSL",     accent: "#006E74", bg: "#EEF8F8", icon: Video,      pageCount: 5, cvr: "25–42%" },
  review_bonus: { name: "Review + Bonus",       short: "Review",  accent: "#16a34a", bg: "#EDFAF3", icon: FileText,   pageCount: 3, cvr: "12–22%" },
  quiz:         { name: "Quiz Funnel",          short: "Quiz",    accent: "#7c3aed", bg: "#F3EEFB", icon: HelpCircle, pageCount: 4, cvr: "30–55%" },
  webinar:      { name: "Auto-Webinar",         short: "Webinar", accent: "#d97706", bg: "#FEF8EC", icon: UserCheck,  pageCount: 5, cvr: "10–18%" },
  flash:        { name: "Flash Deal",           short: "Flash",   accent: "#e11d48", bg: "#FEF0F3", icon: Zap,        pageCount: 3, cvr: "22–38%" },
};

function CampaignCard({ campaign, index }: { campaign: Campaign; index: number }) {
  const fm = FM[campaign.funnelType] || FM.bridge;
  const FIcon = fm.icon;
  const productName = campaign.productInfo?.title || campaign.keyword;
  const hasFunnel = !!(campaign.funnelData?.pages?.length);
  const hasContent = !!campaign.generatedContent;
  const emailCount = campaign.funnelData?.emails?.length || 0;
  const statusLabel = hasFunnel ? "Live" : hasContent ? "Ready" : "Draft";
  const statusColor = hasFunnel ? "#16a34a" : hasContent ? "#d97706" : "#9ca3af";
  const domainMatch = campaign.link.match(/(?:https?:\/\/)?(?:www\.)?([^/\?]+)/);
  const domain = domainMatch ? domainMatch[1] : campaign.link.slice(0, 28);

  return (
    <Link
      href={`/dashboard/campaign/${campaign.id}`}
      className="group block bg-white rounded-2xl border border-black/[0.07] overflow-hidden transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 relative"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Top accent stripe */}
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${fm.accent}, ${fm.accent}40, transparent)` }} />

      <div className="p-5">
        {/* Row 1 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
              style={{ background: fm.bg, border: `1.5px solid ${fm.accent}30` }}>
              <FIcon size={18} style={{ color: fm.accent }} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.08em]" style={{ color: fm.accent }}>{fm.short}</p>
              <p className="text-[11px] text-[#9B8E8E] mt-0.5">{fm.pageCount}pp · {emailCount || "–"} emails</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
            style={{ background: `${statusColor}12`, color: statusColor, borderColor: `${statusColor}25` }}>
            {statusLabel}
          </span>
        </div>

        {/* Product name */}
        <h4 className="font-bold text-[#0F0D0A] leading-snug mb-1.5 line-clamp-2 transition-colors group-hover:text-[#F35D2C]"
          style={{ fontSize: "15px", letterSpacing: "-0.015em" }}>
          {productName}
        </h4>

        {/* Domain */}
        <p className="text-[11px] text-[#9B8E8E] font-mono truncate mb-5">{domain}</p>

        {/* Pipeline bar */}
        <div className="flex items-center gap-1 mb-5">
          {Array.from({ length: fm.pageCount }, (_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{
                background: hasFunnel ? fm.accent
                  : hasContent && i === 0 ? fm.accent
                  : `${fm.accent}18`,
              }} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[11px] text-[#9B8E8E]">
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {new Date(campaign.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D8D0CC]" />
            <span>{campaign.contentType}</span>
          </div>
          <span className="text-[11px] font-semibold flex items-center gap-1 transition-colors"
            style={{ color: fm.accent }}>
            View <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden animate-pulse">
      <div className="h-[3px] bg-[#F0EDE9]" />
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F2EF]" />
            <div className="space-y-1.5">
              <div className="h-2.5 w-12 bg-[#F0EDE9] rounded" />
              <div className="h-2 w-20 bg-[#F5F2EF] rounded" />
            </div>
          </div>
          <div className="h-5 w-12 rounded-full bg-[#F5F2EF]" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-4/5 bg-[#F0EDE9] rounded" />
          <div className="h-3 w-3/5 bg-[#F5F2EF] rounded" />
        </div>
        <div className="h-2.5 w-2/5 bg-[#F5F2EF] rounded" />
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="h-1 flex-1 rounded-full bg-[#F5F2EF]" />)}
        </div>
        <div className="flex justify-between items-center">
          <div className="h-2.5 w-28 bg-[#F5F2EF] rounded" />
          <div className="h-2.5 w-10 bg-[#F5F2EF] rounded" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/campaigns")
      .then(r => r.json())
      .then(d => { setCampaigns(d); setLoading(false); })
      .catch(() => { setError("Failed to load campaigns"); setLoading(false); });
  }, []);

  const stats = [
    { label: "Total Revenue",   value: "$0.00", delta: "+0%",   icon: DollarSign,    color: "#F35D2C", bg: "#FEF3EF" },
    { label: "Total Clicks",    value: "0",     delta: "+0%",   icon: Eye,           color: "#006E74", bg: "#EEF8F8" },
    { label: "Conversions",     value: "0",     delta: "+0%",   icon: MousePointer2, color: "#7c3aed", bg: "#F3EEFB" },
    { label: "Conv. Rate",      value: "0.00%", delta: "+0%",   icon: TrendingUp,    color: "#16a34a", bg: "#EDFAF3" },
  ];

  const activeFunnels = campaigns.filter(c => !!(c.funnelData?.pages?.length)).length;
  const draftCount = campaigns.filter(c => !c.funnelData?.pages?.length).length;

  return (
    <main className="flex-1 overflow-y-auto bg-white" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .fade-up-1 { animation: fadeUp 0.4s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.4s 0.1s ease both; }
        .fade-up-3 { animation: fadeUp 0.4s 0.15s ease both; }
        .fade-up-4 { animation: fadeUp 0.4s 0.2s ease both; }
      `}</style>

      <div className="max-w-screen-xl mx-auto pt-4 md:pt-6 pb-16 md:pb-8 space-y-5">

        {/* ── PAGE HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 fade-up">
          <div>
            <p className="text-xs font-mono text-[#9B8E8E] uppercase tracking-widest mb-1">Affiliate Dashboard</p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F0D0A] tracking-tight" style={{ letterSpacing: "-0.03em" }}>
              Campaigns
            </h1>
          </div>
          <Link href="/dashboard/campaign"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F35D2C] text-white font-bold text-sm hover:bg-[#e04e1f] transition-colors shadow-sm shadow-[#F35D2C]/20 w-full sm:w-auto justify-center">
            <Plus size={15} strokeWidth={2.5} />
            New Campaign
          </Link>
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 fade-up-1">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-black/[0.07] p-4 flex flex-col gap-3 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#9B8E8E] uppercase tracking-wider">{s.label}</p>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <s.icon size={14} style={{ color: s.color }} />
                </div>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-[#0F0D0A]" style={{ letterSpacing: "-0.03em" }}>{s.value}</p>
                <p className="text-[11px] text-[#9B8E8E] mt-1 font-mono">All time</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── HERO BANNER ── */}
        <div className="relative overflow-hidden rounded-2xl bg-[#006E74] px-6 py-6 md:px-8 md:py-7 fade-up-2">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,_rgba(255,255,255,0.1),transparent)]" />
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -right-4 bottom-0 w-40 h-40 rounded-full bg-[#F35D2C]/15" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3 text-white/70">
                <Cpu size={12} />
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]">AI-Powered Engine</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
                Build a Full Affiliate Funnel in Under 2 Minutes
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Paste your affiliate link. AI analyzes the product, writes the copy, and builds every page automatically.
              </p>
            </div>
            <Link href="/dashboard/campaign"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white text-[#006E74] font-bold text-sm hover:bg-white/90 transition-colors shrink-0 shadow-lg shadow-black/10">
              <Rocket size={14} />
              Start Building
              <ArrowUpRight size={14} className="text-[#006E74]/40" />
            </Link>
          </div>
        </div>

        {/* ── QUICK OVERVIEW ROW ── */}
        {campaigns.length > 0 && (
          <div className="grid grid-cols-3 gap-3 fade-up-3">
            {[
              { label: "Total Campaigns", value: campaigns.length, icon: Activity, color: "#006E74", bg: "#EEF8F8" },
              { label: "Live Funnels",    value: activeFunnels,    icon: Target,   color: "#16a34a", bg: "#EDFAF3" },
              { label: "In Progress",     value: draftCount,       icon: GitBranch,color: "#d97706", bg: "#FEF8EC" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-black/[0.07] px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: item.bg }}>
                  <item.icon size={16} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#0F0D0A]" style={{ letterSpacing: "-0.03em" }}>{item.value}</p>
                  <p className="text-[11px] text-[#9B8E8E] font-medium">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CAMPAIGNS GRID ── */}
        <div className="fade-up-3">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-extrabold text-[#0F0D0A]" style={{ letterSpacing: "-0.02em" }}>Your Campaigns</h2>
              <p className="text-xs text-[#9B8E8E] mt-0.5">
                {loading ? "Loading…" : `${campaigns.length} campaign${campaigns.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {[1,2,3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-sm text-red-500 font-medium">{error}</p>
            </div>
          ) : campaigns.length === 0 ? (
            /* Empty state */
            <div className="bg-white border border-dashed border-[#D8D0CC] rounded-3xl flex flex-col items-center justify-center text-center px-8 py-14">
              <div className="w-16 h-16 rounded-2xl bg-[#F5F2EF] flex items-center justify-center mb-6 border border-black/[0.06]">
                <LayoutGrid size={24} className="text-[#9B8E8E]" />
              </div>
              <h3 className="text-lg font-extrabold text-[#0F0D0A] mb-2" style={{ letterSpacing: "-0.02em" }}>No campaigns yet</h3>
              <p className="text-sm text-[#9B8E8E] max-w-xs leading-relaxed mb-7">
                Create your first campaign and let AI build a complete affiliate funnel in minutes.
              </p>
              <Link href="/dashboard/campaign"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F35D2C] text-white font-bold text-sm hover:bg-[#e04e1f] transition-colors shadow-sm shadow-[#F35D2C]/20">
                <Plus size={15} strokeWidth={2.5} />
                Create Your First Campaign
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {campaigns.map((c, i) => <CampaignCard key={c.id} campaign={c} index={i} />)}
            </div>
          )}
        </div>

        {/* ── FUNNEL TYPE REFERENCE ── */}
        {campaigns.length === 0 && (
          <div className="fade-up-4">
            <h2 className="text-base font-extrabold text-[#0F0D0A] mb-4" style={{ letterSpacing: "-0.02em" }}>
              Available Funnel Types
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {Object.entries(FM).map(([key, fm]) => {
                const FIcon = fm.icon;
                return (
                  <div key={key} className="bg-white border border-black/[0.07] rounded-2xl p-4 flex items-center gap-3 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-shadow">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: fm.bg, border: `1px solid ${fm.accent}20` }}>
                      <FIcon size={15} style={{ color: fm.accent }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#0F0D0A] truncate">{fm.name}</p>
                      <p className="text-[10px] text-[#9B8E8E] font-mono">{fm.cvr} CVR · {fm.pageCount}pp</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}