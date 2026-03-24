"use client";

import { useState } from "react";
import {
  Plus, Search, Eye, Clock, GitFork, FileText, Mail,
  ShoppingCart, Lock, BarChart2, Pencil, Trash2, Check,
  Video, Users, HelpCircle, Zap, ArrowRight, AlertCircle
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────
interface Funnel {
  id: number;
  name: string;
  type: string;
  status: string;
  views: string;
  updated: string;
}

interface FlowStep {
  label: string;
  icon: React.ElementType;
}

interface Template {
  id: string;
  name: string;
  badge?: string;
  desc: string;
  flow: FlowStep[];
  pages: number;
  emails: number;
}

// ─── Data ─────────────────────────────────────────────────────
const FUNNELS: Funnel[] = [
  { id: 1, name: "Headphones Review Funnel",  type: "Review Funnel",     status: "active", views: "4,523 views", updated: "2 hours ago" },
  { id: 2, name: "Fitness Comparison Funnel", type: "Comparison Funnel", status: "active", views: "2,341 views", updated: "1 day ago" },
  { id: 3, name: "Course Discount Funnel",    type: "Discount Funnel",   status: "draft",  views: "0 views",     updated: "3 days ago" },
];

const TEMPLATES: Template[] = [
  {
    id: "review",
    name: "Review Funnel",
    badge: "Popular",
    desc: "Blog → Email opt-in → Review page → Checkout",
    flow: [
      { label: "Blog Post",    icon: FileText },
      { label: "Email Opt-in", icon: Mail },
      { label: "Review Page",  icon: Eye },
      { label: "Checkout",     icon: ShoppingCart },
    ],
    pages: 4, emails: 5,
  },
  {
    id: "comparison",
    name: "Comparison Funnel",
    desc: "Blog → Comparison page → Decision guide → Checkout",
    flow: [
      { label: "Blog Post",   icon: FileText },
      { label: "Comparison",  icon: BarChart2 },
      { label: "Decision",    icon: Clock },
      { label: "Checkout",    icon: ShoppingCart },
    ],
    pages: 4, emails: 3,
  },
  {
    id: "discount",
    name: "Discount Funnel",
    desc: "Blog → Limited-time offer page → Checkout",
    flow: [
      { label: "Blog Post",       icon: FileText },
      { label: "Exclusive Offer", icon: Lock },
      { label: "Checkout",        icon: ShoppingCart },
    ],
    pages: 3, emails: 7,
  },
  {
    id: "leadmagnet",
    name: "Lead Magnet Funnel",
    badge: "High Converting",
    desc: "Landing Page → Freebie → Email Sequence → Offer",
    flow: [
      { label: "Landing Page", icon: FileText },
      { label: "Free Download", icon: Mail },
      { label: "Email Sequence", icon: Zap },
      { label: "Product Offer", icon: ShoppingCart },
    ],
    pages: 3, emails: 5,
  },
  {
    id: "webinar",
    name: "Webinar Funnel",
    badge: "New",
    desc: "Registration → Live Event → Replay → Upsell",
    flow: [
      { label: "Reg Page", icon: FileText },
      { label: "Webinar",  icon: Video },
      { label: "Replay",   icon: Eye },
      { label: "Upsell",   icon: ShoppingCart },
    ],
    pages: 4, emails: 4,
  },
  {
    id: "survey",
    name: "Survey Funnel",
    desc: "Quiz → Results → Recommendation → Checkout",
    flow: [
      { label: "Survey",   icon: HelpCircle },
      { label: "Results",  icon: BarChart2 },
      { label: "Rec",      icon: ArrowRight },
      { label: "Checkout", icon: ShoppingCart },
    ],
    pages: 4, emails: 3,
  },
  {
    id: "vsl",
    name: "VSL Funnel",
    badge: "Popular",
    desc: "Video → Order Form → Bump → Thank You",
    flow: [
      { label: "VSL",        icon: Video },
      { label: "Order Form", icon: FileText },
      { label: "Order Bump", icon: Lock },
      { label: "Thank You",  icon: Mail },
    ],
    pages: 4, emails: 2,
  },
  {
    id: "bridge",
    name: "Bridge Page Funnel",
    desc: "Ad → Bridge Page → Offer → Upsell",
    flow: [
      { label: "Ad",        icon: Zap },
      { label: "Bridge",    icon: ArrowRight },
      { label: "Offer",     icon: Eye },
      { label: "Upsell",    icon: ShoppingCart },
    ],
    pages: 3, emails: 2,
  },
  {
    id: "abandonment",
    name: "Cart Abandonment",
    badge: "Recovery",
    desc: "Cart → Reminder Emails → Discount → Checkout",
    flow: [
      { label: "Cart",      icon: ShoppingCart },
      { label: "Reminder",  icon: Mail },
      { label: "Discount",  icon: Lock },
      { label: "Checkout",  icon: ShoppingCart },
    ],
    pages: 1, emails: 3,
  },
];

// ─── Funnel Row ───────────────────────────────────────────────
function FunnelRow({ funnel }: { funnel: Funnel }) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-[18px] border-b last:border-b-0 border-[#006E74]/10 hover:bg-[#006E74]/5 transition-colors cursor-pointer gap-3">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#F35D2C]/10 flex items-center justify-center flex-shrink-0">
          <GitFork size={17} className="text-[#F35D2C]"/>
        </div>
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[14px] font-bold text-[#6B5E5E]">{funnel.name}</span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full
              ${funnel.status === "active" ? "bg-[#006E74]/10 text-[#006E74]" : "bg-[#6B5E5E]/10 text-[#6B5E5E]"}`}>
              {funnel.status}
            </span>
          </div>
          <p className="text-[12px] text-[#6B5E5E]/50 font-medium mt-0.5">{funnel.type}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-5 mt-2 sm:mt-0">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6B5E5E]/70">
            <Eye size={13} className="text-[#6B5E5E]/40"/>{funnel.views}
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6B5E5E]/70">
            <Clock size={13} className="text-[#6B5E5E]/40"/>{funnel.updated}
          </div>
        </div>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 rounded-lg border border-[#006E74]/20 bg-white flex items-center justify-center hover:border-[#F35D2C]/30 hover:bg-[#F35D2C]/5 transition-all">
            <Pencil size={12} className="text-[#6B5E5E]"/>
          </button>
          <button className="w-8 h-8 rounded-lg border border-[#006E74]/20 bg-white flex items-center justify-center hover:border-[#F35D2C]/30 hover:bg-[#F35D2C]/5 transition-all">
            <Eye size={12} className="text-[#6B5E5E]"/>
          </button>
          <button className="w-8 h-8 rounded-lg border border-red-100 bg-white flex items-center justify-center hover:bg-red-50 transition-all">
            <Trash2 size={12} className="text-red-400"/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Template Card ────────────────────────────────────────────
interface TemplateCardProps {
  tpl: Template;
  selected: boolean;
  onSelect: () => void;
}

function TemplateCard({ tpl, selected, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`border-2 rounded-xl md:rounded-2xl p-4 md:p-6 cursor-pointer transition-all
        ${selected
          ? "border-[#F35D2C] shadow-[0_0_0_3px_rgba(243,93,44,0.1)]"
          : "border-[#006E74]/20 hover:border-[#F35D2C]/30 hover:shadow-lg hover:-translate-y-0.5"}`}
    >
      <div className="flex items-start justify-between mb-1.5">
        <p className="text-sm md:text-[15px] font-bold text-[#6B5E5E]">{tpl.name}</p>
        {tpl.badge && !selected && (
          <span className="bg-[#F35D2C]/10 text-[#F35D2C] text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded-full">{tpl.badge}</span>
        )}
        {selected && (
          <div className="w-6 h-6 rounded-full bg-[#F35D2C] flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-white" strokeWidth={3}/>
          </div>
        )}
      </div>
      <p className="text-xs md:text-[12.5px] text-[#6B5E5E]/50 mb-4 md:mb-5 leading-relaxed">{tpl.desc}</p>

      <div className="flex items-start gap-2 flex-wrap mb-4 md:mb-5">
        {tpl.flow.map((step, i: number) => {
          const Icon = step.icon;
          return (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center ${selected ? "bg-[#F35D2C]/10" : "bg-[#006E74]/10"}`}>
                  <Icon size={14} className={selected ? "text-[#F35D2C]" : "text-[#006E74]"}/>
                </div>
                <span className="text-[9px] md:text-[10.5px] font-semibold text-[#6B5E5E]/40 text-center leading-tight">{step.label}</span>
              </div>
              {i < tpl.flow.length - 1 && <span className="text-[#6B5E5E]/20 font-bold text-sm mb-3">→</span>}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 pt-4 border-t border-[#006E74]/10 mb-5">
        <span className="flex items-center gap-1.5 text-[10px] md:text-[12px] font-semibold text-[#6B5E5E]/70">
          <FileText size={10} className="text-[#6B5E5E]/40"/> {tpl.pages} pages
        </span>
        <span className="flex items-center gap-1.5 text-[10px] md:text-[12px] font-semibold text-[#6B5E5E]/70">
          <Mail size={10} className="text-[#6B5E5E]/40"/> {tpl.emails} emails
        </span>
      </div>

      <button className="w-full py-2.5 md:py-3 rounded-xl bg-[#F35D2C] text-white text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e04e1f] transition-all">
        {selected && <Check size={12} strokeWidth={3}/>}
        Use This Template
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function FunnelsPage() {
  const [search, setSearch]         = useState("");
  const [selectedTpl, selectTpl]    = useState("review");

  const filteredFunnels = FUNNELS.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-full">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 md:py-8 pb-24 md:pb-8 space-y-6 md:space-y-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-[28px] font-black text-[#6B5E5E] tracking-tight">Funnels</h1>
            <p className="text-xs md:text-sm text-[#6B5E5E]/50 font-medium mt-1">Build and manage your conversion funnels</p>
          </div>
          <button className="flex items-center gap-2 bg-[#F35D2C] text-white text-sm font-extrabold px-5 py-3 rounded-[13px] hover:bg-[#e04e1f] transition-all w-full sm:w-auto justify-center">
            <Plus size={15} strokeWidth={3}/> New Funnel
          </button>
        </div>

        {/* ── Your Funnels ── */}
        <div className="border border-[#006E74]/20 rounded-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 gap-3 border-b border-[#006E74]/10">
            <p className="text-[15px] font-bold text-[#6B5E5E]">Your Funnels</p>
            <div className="flex items-center gap-2 border border-[#006E74]/20 rounded-xl px-3.5 py-2.5 focus-within:border-[#F35D2C] transition-colors bg-white w-full sm:w-auto">
              <Search size={14} className="text-[#6B5E5E]/40"/>
              <input
                type="text"
                placeholder="Search funnels..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm text-[#6B5E5E] placeholder-[#6B5E5E]/40 outline-none bg-transparent w-full sm:w-44"
              />
            </div>
          </div>
          {filteredFunnels.length > 0
            ? filteredFunnels.map((f) => <FunnelRow key={f.id} funnel={f}/>)
            : (
              <div className="py-16 flex flex-col items-center gap-3 text-center">
                <GitFork size={28} className="text-[#6B5E5E]/30"/>
                <p className="text-sm font-bold text-[#6B5E5E]/50">No funnels match your search</p>
              </div>
            )
          }
        </div>

        {/* ── Create from Template ── */}
        <div>
          <h2 className="text-lg md:text-[18px] font-black text-[#6B5E5E] mb-1">Create from Template</h2>
          <p className="text-xs md:text-sm text-[#6B5E5E]/50 font-medium mb-5">Choose a pre-built funnel to get started quickly</p>

          <div className="border border-[#006E74]/20 rounded-2xl px-4 md:px-6 py-4 md:py-5 flex items-center gap-4 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#F35D2C]/10 flex items-center justify-center flex-shrink-0">
              <GitFork size={17} className="text-[#F35D2C]"/>
            </div>
            <div>
              <p className="text-sm md:text-[15px] font-bold text-[#6B5E5E]">Choose Your Funnel Template</p>
              <p className="text-xs md:text-[12.5px] text-[#6B5E5E]/50 font-medium mt-0.5">Pre-built conversion funnels optimized for affiliate marketing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((tpl) => (
              <TemplateCard
                key={tpl.id}
                tpl={tpl}
                selected={selectedTpl === tpl.id}
                onSelect={() => selectTpl(tpl.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}