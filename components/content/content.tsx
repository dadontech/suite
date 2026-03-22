"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus, Search, Filter, LayoutGrid, List,
  FileText, BarChart2, Lightbulb, AlignJustify,
  Pencil, Trash2, ChevronDown
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────
interface Campaign {
  id: string;
  keyword: string;
  contentType: string;
  generatedContent?: {
    titles: string[];
    metaDescription: string;
    article: string;
    socialSnippets: any[];
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
  funnelType: string;
  createdAt: string;
}

const TYPE_FILTERS = ["All Types", "review", "howto", "comparison", "listicle"];

const TYPE_BADGE: Record<string, string> = {
  review:     "bg-[#F35D2C]/80",
  howto:      "bg-[#006E74]/80",
  comparison: "bg-[#6B5E5E]/80",
  listicle:   "bg-[#F35D2C]/60",
};

const TYPE_ICON: Record<string, any> = {
  review:     FileText,
  howto:      Lightbulb,
  comparison: BarChart2,
  listicle:   AlignJustify,
};

function getThumbGradient(contentType: string): string {
  switch (contentType) {
    case "Product Review": return "from-[#1a1a3e] via-[#0a2a6e] to-[#0e4d8a]";
    case "How-To Guide":   return "from-[#064e3b] via-[#065f46] to-[#047857]";
    case "Comparison":     return "from-[#78350f] via-[#92400e] to-[#b45309]";
    default:               return "from-[#4c1d95] via-[#5b21b6] to-[#6d28d9]";
  }
}

function getThumbLabel(contentType: string): string {
  switch (contentType) {
    case "Product Review": return "REV";
    case "How-To Guide":   return "HOW";
    case "Comparison":     return "COM";
    default:               return "ART";
  }
}

function getExcerpt(content: string, maxLength = 100): string {
  const plain = content.replace(/<[^>]*>/g, '');
  return plain.length > maxLength ? plain.slice(0, maxLength) + '...' : plain;
}

// ─── Content Card ─────────────────────────────────────────
function ContentCard({ item, isList }: { item: Campaign; isList: boolean }) {
  const contentType = item.contentType || "review";
  const Icon = TYPE_ICON[contentType.toLowerCase()] || FileText;
  const title = item.generatedContent?.titles?.[0] || item.productInfo?.title || item.keyword;
  const excerpt = getExcerpt(item.generatedContent?.article || "", isList ? 80 : 100);
  const words = item.generatedContent?.article?.split(/\s+/).length || 0;
  const thumbGradient = getThumbGradient(contentType);
  const thumbLabel = getThumbLabel(contentType);
  const thumbSub = contentType.toUpperCase();

  return (
    <div className={`group relative border border-[#006E74]/10 rounded-2xl overflow-hidden bg-white cursor-pointer
      hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200
      ${isList ? "flex flex-row h-[88px]" : "flex flex-col w-full"}`}
    >
      {/* Thumbnail */}
      <div className={`relative bg-gradient-to-br ${thumbGradient} flex items-center justify-center flex-shrink-0
        ${isList ? "w-[110px] h-full" : "h-32 xs:h-40 w-full"}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(243,93,44,0.1),transparent_70%)]"/>

        <div className="text-center relative z-2">
          <p className={`font-black text-white tracking-tighter ${isList ? "text-2xl" : "text-3xl xs:text-5xl"}`}>
            {thumbLabel}
          </p>
          {!isList && (
            <p className="text-[8px] xs:text-[9px] font-bold text-white/40 tracking-[3px] mt-1">{thumbSub}</p>
          )}
        </div>

        {!isList && (
          <div className="absolute inset-0 flex items-center justify-center z-5">
            <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Icon size={14} className="text-white/80"/>
            </div>
          </div>
        )}

        <span className={`absolute top-2 left-2 xs:top-2.5 xs:left-2.5 text-white text-[9px] xs:text-[10.5px] font-bold px-2 xs:px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/15 ${TYPE_BADGE[contentType.toLowerCase()] || 'bg-[#6B5E5E]/80'}`}>
          {contentType}
        </span>

        {/* Hover actions – optional */}
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
            <p className="text-xs xs:text-[13px] font-bold text-[#6B5E5E] truncate mr-4">{title}</p>
            <div className="flex items-center gap-3 xs:gap-5 flex-shrink-0">
              <span className="text-[10px] xs:text-[11.5px] font-semibold text-[#6B5E5E]/50">{item.funnelType}</span>
              <span className="text-[10px] xs:text-[11.5px] font-semibold text-[#6B5E5E]/50">{words} words</span>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs xs:text-[14px] font-bold text-[#6B5E5E] leading-snug mb-2 line-clamp-2">{title}</p>
            <p className="text-[10px] xs:text-[12px] text-[#6B5E5E]/60 leading-relaxed line-clamp-2 mb-3">{excerpt}</p>
            <div className="flex items-center justify-between pt-3 border-t border-[#006E74]/10">
              <span className="text-[10px] xs:text-[11.5px] font-semibold text-[#6B5E5E]/50">{item.funnelType}</span>
              <span className="text-[10px] xs:text-[11.5px] font-semibold text-[#6B5E5E]/50">{words} words</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Custom Dropdown (unchanged) ─────────────────────────
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

// ─── Main Page ────────────────────────────────────────────
export default function ContentLibraryPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setType] = useState("All Types");
  const [viewMode, setView] = useState("grid"); // "grid" | "list"

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Force grid mode on mobile
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 640) {
        setView("grid");
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filtered = campaigns.filter((camp) => {
    const matchType = typeFilter === "All Types" || camp.contentType?.toLowerCase() === typeFilter;
    const matchSearch = !search || camp.keyword.toLowerCase().includes(search.toLowerCase()) ||
      (camp.generatedContent?.titles?.[0] || '').toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="bg-white min-h-full">
      <div className="max-w-screen-2xl mx-auto px-3 xs:px-4 md:px-8 py-3 xs:py-4 md:py-8 pb-24 md:pb-8">
        {/* Page Header */}
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

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border border-[#006E74]/10 rounded-[14px] px-3 xs:px-4 py-3 bg-white mb-4 md:mb-7">
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

          <TypeFilterDropdown
            value={typeFilter}
            onChange={setType}
            options={TYPE_FILTERS}
          />

          <div className="w-full sm:w-px h-px sm:h-6 bg-[#006E74]/10 sm:mx-2" />

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

        {/* Content List */}
        {loading ? (
          <div className="text-center py-8 text-[#6B5E5E]/50">Loading content...</div>
        ) : filtered.length > 0 ? (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-5"
            : "flex flex-col gap-3"
          }>
            {filtered.map((camp) => (
              <ContentCard key={camp.id} item={camp} isList={viewMode === "list"} />
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