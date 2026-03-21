"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Plus, Search, Filter, LayoutGrid, List,
  FileText, BarChart2, Lightbulb, AlignJustify,
  Pencil, Trash2, ChevronDown
} from "lucide-react";

// ─── Sample Data ──────────────────────────────────────────────
const CONTENT_ITEMS = [
  {
    id: 1,
    type: "review",
    title: "Now Is Your Time to Build an Online Business: Don't Wait for the Next Crisis",
    excerpt: "Stop waiting for the 'perfect' moment. Read our review of 'Now Is Your Time to Build an Online Business' and...",
    campaign: "Unknown",
    words: "1,000 words",
    thumbGradient: "from-[#1a1a3e] via-[#0a2a6e] to-[#0e4d8a]",
    thumbLabel: "WA",
    thumbSub: "WEALTHY AFFILIATE",
  },
  {
    id: 2,
    type: "howto",
    title: "How to Start Affiliate Marketing From Scratch in 2025",
    excerpt: "A complete step-by-step walkthrough for beginners looking to launch their first affiliate campaign without prior experience...",
    campaign: "Starter Campaign",
    words: "1,500 words",
    thumbGradient: "from-[#064e3b] via-[#065f46] to-[#047857]",
    thumbLabel: "HTA",
    thumbSub: "HOW-TO GUIDE",
  },
  {
    id: 3,
    type: "comparison",
    title: "Wealthy Affiliate vs ClickBank: Which Platform Wins in 2025?",
    excerpt: "An in-depth comparison of two of the biggest affiliate platforms, breaking down commissions, tools, training, and more...",
    campaign: "Comparison Campaign",
    words: "2,000 words",
    thumbGradient: "from-[#78350f] via-[#92400e] to-[#b45309]",
    thumbLabel: "VS",
    thumbSub: "COMPARISON",
  },
  {
    id: 4,
    type: "listicle",
    title: "Top 10 Affiliate Programs for Beginners That Actually Pay Well",
    excerpt: "Discover the best affiliate programs handpicked for new marketers, with high commissions and easy approvals...",
    campaign: "Listicle Series",
    words: "1,200 words",
    thumbGradient: "from-[#4c1d95] via-[#5b21b6] to-[#6d28d9]",
    thumbLabel: "TOP",
    thumbSub: "LISTICLE",
  },
];

const TYPE_FILTERS = ["All Types", "review", "howto", "comparison", "listicle"];

const TYPE_BADGE = {
  review:     "bg-[#F35D2C]/80",
  howto:      "bg-[#006E74]/80",
  comparison: "bg-[#6B5E5E]/80",
  listicle:   "bg-[#F35D2C]/60",
};

const TYPE_ICON = {
  review:     FileText,
  howto:      Lightbulb,
  comparison: BarChart2,
  listicle:   AlignJustify,
};

// ─── Content Card ─────────────────────────────────────────────
function ContentCard({ item, isList }) {
  const Icon = TYPE_ICON[item.type] || FileText;
  return (
    <div className={`group relative border border-[#006E74]/10 rounded-2xl overflow-hidden bg-white cursor-pointer
      hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200
      ${isList ? "flex flex-row h-[88px]" : "flex flex-col w-full"}`}
    >
      {/* Thumbnail */}
      <div className={`relative bg-gradient-to-br ${item.thumbGradient} flex items-center justify-center flex-shrink-0
        ${isList ? "w-[110px] h-full" : "h-32 xs:h-40 w-full"}`}
      >
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(243,93,44,0.1),transparent_70%)]"/>

        <div className="text-center relative z-2">
          <p className={`font-black text-white tracking-tighter ${isList ? "text-2xl" : "text-3xl xs:text-5xl"}`}>
            {item.thumbLabel}
          </p>
          {!isList && (
            <p className="text-[8px] xs:text-[9px] font-bold text-white/40 tracking-[3px] mt-1">{item.thumbSub}</p>
          )}
        </div>

        {/* Doc icon */}
        {!isList && (
          <div className="absolute inset-0 flex items-center justify-center z-5">
            <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Icon size={14} className="text-white/80"/>
            </div>
          </div>
        )}

        {/* Type badge */}
        <span className={`absolute top-2 left-2 xs:top-2.5 xs:left-2.5 text-white text-[9px] xs:text-[10.5px] font-bold px-2 xs:px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/15 ${TYPE_BADGE[item.type]}`}>
          {item.type}
        </span>

        {/* Hover actions */}
        <div className="absolute top-2 right-2 xs:top-2.5 xs:right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-6 h-6 xs:w-7 xs:h-7 rounded-lg bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
            <Pencil size={10} className="text-[#6B5E5E]"/>
          </button>
          <button className="w-6 h-6 xs:w-7 xs:h-7 rounded-lg bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
            <Trash2 size={10} className="text-[#6B5E5E]"/>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={`${isList ? "flex-1 flex items-center justify-between px-5 py-3 min-w-0" : "p-3 xs:p-4"}`}>
        {isList ? (
          <>
            <p className="text-xs xs:text-[13px] font-bold text-[#6B5E5E] truncate mr-4">{item.title}</p>
            <div className="flex items-center gap-3 xs:gap-5 flex-shrink-0">
              <span className="text-[10px] xs:text-[11.5px] font-semibold text-[#6B5E5E]/50">{item.campaign}</span>
              <span className="text-[10px] xs:text-[11.5px] font-semibold text-[#6B5E5E]/50">{item.words}</span>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs xs:text-[14px] font-bold text-[#6B5E5E] leading-snug mb-2 line-clamp-2">{item.title}</p>
            <p className="text-[10px] xs:text-[12px] text-[#6B5E5E]/60 leading-relaxed line-clamp-2 mb-3">{item.excerpt}</p>
            <div className="flex items-center justify-between pt-3 border-t border-[#006E74]/10">
              <span className="text-[10px] xs:text-[11.5px] font-semibold text-[#6B5E5E]/50">{item.campaign}</span>
              <span className="text-[10px] xs:text-[11.5px] font-semibold text-[#6B5E5E]/50">{item.words}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Custom Dropdown Component ─────────────────────────────────
function TypeFilterDropdown({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-[#6B5E5E] bg-transparent hover:bg-[#006E74]/5 px-2 py-1 rounded-md transition-colors"
      >
        <Filter size={14} className="text-[#6B5E5E]/40" />
        <span className="truncate max-w-[100px] xs:max-w-[120px] sm:max-w-none">{value}</span>
        <ChevronDown size={14} className={`text-[#6B5E5E]/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-[#006E74]/20 rounded-xl shadow-lg overflow-hidden z-5">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors
                ${value === opt ? 'bg-[#F35D2C] text-white' : 'text-[#6B5E5E] hover:bg-[#006E74]/5'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function ContentLibraryPage() {
  const [search, setSearch]     = useState("");
  const [typeFilter, setType]   = useState("All Types");
  const [viewMode, setView]     = useState("grid"); // "grid" | "list"

  // Force grid mode on mobile (below sm breakpoint)
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 640) {
        setView("grid");
      }
    };
    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filtered = CONTENT_ITEMS.filter((item) => {
    const matchType  = typeFilter === "All Types" || item.type === typeFilter;
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="bg-white min-h-full">
      <div className="max-w-screen-2xl mx-auto px-3 xs:px-4 md:px-8 py-3 xs:py-4 md:py-8 pb-24 md:pb-8">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 md:mb-7">
          <div>
            <h1 className="text-xl xs:text-2xl md:text-[28px] font-black text-[#6B5E5E] tracking-tight">Content Library</h1>
            <p className="text-xs md:text-sm text-[#6B5E5E]/50 font-medium mt-1">
              Manage all your campaigns and generated content
            </p>
          </div>
          <Link
            href="/dashboard/campaign"
            className="flex items-center gap-2 bg-[#F35D2C] text-white text-xs xs:text-sm font-extrabold px-5 py-3 rounded-[13px] hover:bg-[#e04e1f] transition-colors whitespace-nowrap w-full sm:w-auto justify-center"
          >
            <Plus size={15} strokeWidth={3}/> New Campaign
          </Link>
        </div>

        {/* ── Filter Bar ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border border-[#006E74]/10 rounded-[14px] px-3 xs:px-4 py-3 bg-white mb-4 md:mb-7">
          {/* Search */}
          <div className="flex items-center gap-2.5 w-full sm:flex-1">
            <Search size={15} className="text-[#6B5E5E]/40 flex-shrink-0"/>
            <input
              type="text"
              placeholder="Search content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-[#6B5E5E] placeholder-[#6B5E5E]/40 outline-none bg-transparent"
            />
          </div>

          <div className="w-full sm:w-px h-px sm:h-6 bg-[#006E74]/10 sm:mx-2" />

          {/* Type filter - custom dropdown */}
          <TypeFilterDropdown
            value={typeFilter}
            onChange={setType}
            options={TYPE_FILTERS}
          />

          <div className="w-full sm:w-px h-px sm:h-6 bg-[#006E74]/10 sm:mx-2" />

          {/* View toggle - hidden on mobile, shown on sm and up */}
          <div className="hidden sm:flex items-center gap-0.5 bg-[#006E74]/10 rounded-[9px] p-1 w-full sm:w-auto justify-center">
            <button
              onClick={() => setView("grid")}
              className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-[#F35D2C] shadow-sm" : "hover:bg-[#006E74]/10"}`}
            >
              <LayoutGrid size={15} className={viewMode === "grid" ? "text-white" : "text-[#6B5E5E]/40"}/>
            </button>
            <button
              onClick={() => setView("list")}
              className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-all ${viewMode === "list" ? "bg-[#F35D2C] shadow-sm" : "hover:bg-[#006E74]/10"}`}
            >
              <List size={15} className={viewMode === "list" ? "text-white" : "text-[#6B5E5E]/40"}/>
            </button>
          </div>
        </div>

        {/* ── Grid / List ── */}
        {filtered.length > 0 ? (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-5"
            : "flex flex-col gap-3"
          }>
            {filtered.map((item) => (
              <ContentCard key={item.id} item={item} isList={viewMode === "list"}/>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#006E74]/20 rounded-2xl flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 rounded-full bg-[#006E74]/5 flex items-center justify-center">
              <FileText size={22} className="text-[#6B5E5E]/40"/>
            </div>
            <p className="text-base font-extrabold text-[#6B5E5E]">No content found</p>
            <p className="text-sm text-[#6B5E5E]/50 text-center max-w-xs">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}