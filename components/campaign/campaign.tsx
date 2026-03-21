'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Link2, FileText, GitBranch, Rocket, Check,
  ChevronRight, Sparkles, Mail, ChevronDown, Loader2,
  Copy, CheckCheck, Tag, AlignLeft, ScrollText, Share2,
  BookOpen, List, Scale, FileSearch,
  TrendingUp, Video, Zap, BarChart2,
  ArrowRight, Star, Clock, DollarSign, Target,
  Gift, PlayCircle, HelpCircle, Layers,
  MessageSquare, RefreshCw, Twitter, Linkedin, Facebook,
  Award, // <-- added for recommended badge
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialSnippet {
  platform: 'Twitter/X' | 'LinkedIn' | 'Facebook';
  content: string;
}

interface ProductInfo {
  title?: string;
  description?: string;
  price?: string;
  currency?: string;
  imageUrl?: string;
  imageUrls?: string[];
  rating?: number;
  reviewCount?: number;
  features?: string[];
  benefits?: string[];
  summary?: string;
}

interface GeneratedContent {
  titles: string[];
  metaDescription: string;
  article: string;
  socialSnippets: SocialSnippet[];
}

interface FunnelBlock {
  type?: string;
  label?: string;
  sublabel?: string;
  headline?: string;
  subheadline?: string;
  body?: string;
  cta?: string;
  ctaLink?: string;
  items?: string[];
  rating?: number;
  author?: string;
  badge?: string;
  minutes?: number;
  [key: string]: unknown;
}

interface FunnelPageData {
  id?: string;
  label?: string;
  icon?: string;
  bg?: string;
  blocks?: FunnelBlock[];
}

interface EmailStep {
  subject: string;
  timing: string;
  purpose?: string;
  bodyPreview?: string;
}

interface VideoSuggestion {
  title: string;
  searchQuery: string;
  url?: string;
}

interface FunnelApiResponse {
  pages?: FunnelPageData[];
  steps?: FunnelBlock[];
  emails: EmailStep[];
  video?: VideoSuggestion;
}

interface FunnelBuilderData extends FunnelApiResponse {
  funnelType: string;
}

interface CampaignData {
  link: string;
  productInfo?: ProductInfo;
  keyword: string;
  tone: string;
  wordCount: string;
  contentType: string;
  funnelType: string;
  generatedContent?: GeneratedContent | null;
}

// ─── Funnel Definitions ───────────────────────────────────────────────────────

interface FunnelFlowStep {
  label: string;
  icon: React.ElementType;
  color: string;
  highlight?: boolean;
}

interface FunnelDef {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  conversionRate: string;
  tier: string;
  bestFor: string[];
  commissionType: string;
  pages: number;
  emails: number;
  description: string;
  flow: FunnelFlowStep[];
  proTip: string;
  generates: string[];
}

const FUNNELS: FunnelDef[] = [
  {
    id: 'bridge',
    name: 'Bridge Funnel',
    badge: '#1 for Affiliates',
    badgeColor: 'bg-[#F35D2C] text-white',
    conversionRate: '18–34%',
    tier: 'Beginner–Pro',
    bestFor: ['Paid Ads', 'Cold Traffic', 'Info Products'],
    commissionType: 'CPS / CPA',
    pages: 3,
    emails: 5,
    description:
      'The #1 funnel recommended by Russell Brunson for affiliate marketers. A pre-sell "bridge" page warms up cold traffic before handing them off to the vendor — dramatically lifting conversions.',
    flow: [
      { label: 'Ad / Social', icon: Target, color: '#6B5E5E' },
      { label: 'Bridge Page', icon: Layers, color: '#F35D2C', highlight: true },
      { label: 'Opt-in', icon: Mail, color: '#006E74' },
      { label: 'Affiliate Offer', icon: DollarSign, color: '#006E74' },
    ],
    proTip:
      'Russell Brunson built ClickFunnels to $100M using bridge pages exclusively for affiliate campaigns.',
    generates: [
      'Personal story intro',
      'Pattern interrupt hook',
      'Benefit bridge copy',
      'Opt-in incentive',
      '5-email follow-up',
    ],
  },
  {
    id: 'vsl',
    name: 'VSL Funnel',
    badge: 'Highest EPC',
    badgeColor: 'bg-[#006E74] text-white',
    conversionRate: '25–42%',
    tier: 'Intermediate–Pro',
    bestFor: ['YouTube', 'Email Lists', 'ClickBank'],
    commissionType: 'High-Ticket / Recurring',
    pages: 4,
    emails: 7,
    description:
      'Video Sales Letter funnels dominate ClickBank leaderboards. A short VSL pre-sells visitors before the order page — the go-to format for top earners like Robby Blanchard and Adam Cherrington.',
    flow: [
      { label: 'Traffic Source', icon: PlayCircle, color: '#6B5E5E' },
      { label: 'Opt-in Page', icon: Mail, color: '#006E74' },
      { label: 'VSL Watch Page', icon: Video, color: '#F35D2C', highlight: true },
      { label: 'Order + Upsell', icon: DollarSign, color: '#006E74' },
    ],
    proTip:
      "Robby Blanchard (ClickBank's #1 affiliate) uses VSL funnels exclusively for Facebook & YouTube campaigns.",
    generates: [
      'VSL script outline',
      'Hook + story arc',
      'Order page copy',
      '2-step order form',
      '7-email indoctrination series',
    ],
  },
  {
    id: 'review_bonus',
    name: 'Review + Bonus Stack',
    badge: 'Best for SEO',
    badgeColor: 'bg-emerald-600 text-white',
    conversionRate: '12–22%',
    tier: 'All Levels',
    bestFor: ['SEO', 'YouTube Reviews', 'Organic'],
    commissionType: 'CPS / Amazon / SaaS',
    pages: 3,
    emails: 4,
    description:
      "The cornerstone of Authority Hacker, Niche Pursuits, and Pat Flynn's empires. An honest, deep-dive review paired with an irresistible bonus stack that only unlocks through your affiliate link.",
    flow: [
      { label: 'Google / YouTube', icon: BookOpen, color: '#6B5E5E' },
      { label: 'Review Article', icon: FileText, color: '#006E74' },
      { label: 'Bonus Reveal Page', icon: Gift, color: '#F35D2C', highlight: true },
      { label: 'Affiliate Checkout', icon: DollarSign, color: '#006E74' },
    ],
    proTip:
      'Pat Flynn earns $100k+/mo from review funnels — the bonus stack converts 3× better than bare affiliate links.',
    generates: [
      'Long-form review article',
      'Pros/cons breakdown',
      'Bonus reveal page',
      'Comparison table',
      '4-email nurture sequence',
    ],
  },
  {
    id: 'quiz',
    name: 'Quiz / Survey Funnel',
    badge: 'Best Cold Traffic',
    badgeColor: 'bg-violet-600 text-white',
    conversionRate: '30–55%',
    tier: 'Intermediate',
    bestFor: ['Facebook Ads', 'TikTok', 'Pinterest'],
    commissionType: 'CPA / Lead Gen',
    pages: 4,
    emails: 6,
    description:
      "Ryan Levesque's Ask Method quiz funnel is the highest opt-in rate format for cold paid traffic. Segmented results pages show each visitor a personalised offer — sky-high relevance = sky-high conversions.",
    flow: [
      { label: 'Paid Ad', icon: Target, color: '#6B5E5E' },
      { label: 'Quiz / Survey', icon: HelpCircle, color: '#F35D2C', highlight: true },
      { label: 'Results Page', icon: BarChart2, color: '#006E74' },
      { label: 'Segmented Offer', icon: DollarSign, color: '#006E74' },
    ],
    proTip:
      'Ryan Levesque used quiz funnels to generate $100M+ in sales across 23 markets — highest cold-traffic opt-in rate of any funnel type.',
    generates: [
      'Quiz intro hook',
      '5–7 question flow',
      'Segmented results pages',
      'Personalised offer copy',
      '6-email behavioural sequence',
    ],
  },
  {
    id: 'webinar',
    name: 'Auto-Webinar Funnel',
    badge: 'Highest Commissions',
    badgeColor: 'bg-amber-500 text-white',
    conversionRate: '10–18%',
    tier: 'Pro / Advanced',
    bestFor: ['High-Ticket', 'Email Lists', 'Coaching'],
    commissionType: '$500–$5,000 / Sale',
    pages: 5,
    emails: 9,
    description:
      'The go-to funnel for promoting high-ticket affiliate offers ($500–$5,000 commissions). An automated evergreen webinar builds massive authority and trust before the pitch — used by JVZoo and Warrior Plus elites.',
    flow: [
      { label: 'Registration Page', icon: Target, color: '#6B5E5E' },
      { label: 'Confirmation + Indoc', icon: Mail, color: '#006E74' },
      { label: 'Auto-Webinar', icon: Video, color: '#F35D2C', highlight: true },
      { label: 'Order + Bonus Page', icon: DollarSign, color: '#006E74' },
    ],
    proTip:
      'John Crestani generates $500k+/month using auto-webinar funnels — each sale nets $500–$2,000 in commissions.',
    generates: [
      'Registration page copy',
      'Confirmation email',
      'Webinar script outline',
      'Pitch slide deck',
      '9-email sales sequence',
    ],
  },
  {
    id: 'flash',
    name: 'Flash Deal Funnel',
    badge: 'Fastest Cash Flow',
    badgeColor: 'bg-rose-600 text-white',
    conversionRate: '22–38%',
    tier: 'All Levels',
    bestFor: ['Email Blasts', 'Retargeting', 'Promotions'],
    commissionType: 'CPS / Limited Promos',
    pages: 2,
    emails: 3,
    description:
      'The fastest cash-flow funnel in the affiliate playbook. A laser-focused scarcity/bonus page + 3-email flash-sale sequence. Ideal for product launches, affiliate contests, and retargeting warm audiences.',
    flow: [
      { label: 'Email / Retarget', icon: Zap, color: '#6B5E5E' },
      { label: 'Flash Deal Page', icon: Clock, color: '#F35D2C', highlight: true },
      { label: 'Affiliate Checkout', icon: DollarSign, color: '#006E74' },
    ],
    proTip:
      "Spencer Mecham (Builderall's #1 affiliate) uses flash-deal funnels during launch windows — generates $50k+ in 72 hours.",
    generates: [
      'Scarcity hook headline',
      'Countdown timer page',
      'Bonus incentive stack',
      'Urgency-driven CTA',
      '3-email rapid-fire sequence',
    ],
  },
];

// ─── Recommendation Helpers ───────────────────────────────────────────────────

function detectNicheFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.match(/health|supplement|peptide|vitamin|fitness|weight|diet|wellness|muscle|protein/)) return 'health';
  if (t.match(/invest|stock|trade|crypto|forex|wealth|gold|finance|money|retire/)) return 'finance';
  if (t.match(/software|saas|app|platform|tool|crm|tech|ai|automation|code/)) return 'tech';
  if (t.match(/course|coaching|training|masterclass|program|academy|learn|mentor/)) return 'education';
  if (t.match(/marketing|affiliate|funnel|leads|sales|business|agency/)) return 'business';
  return 'generic';
}

function extractPrice(priceStr?: string): number | null {
  if (!priceStr) return null;
  const match = priceStr.replace(/[^0-9.]/g, '');
  const num = parseFloat(match);
  return isNaN(num) ? null : num;
}

// Niche → recommended funnel IDs (primary recommendations)
const NICHE_TO_FUNNELS: Record<string, string[]> = {
  health: ['review_bonus', 'bridge', 'vsl'],
  finance: ['vsl', 'webinar', 'flash'],
  tech: ['review_bonus', 'bridge', 'vsl'],
  education: ['webinar', 'bridge', 'review_bonus'],
  business: ['bridge', 'vsl', 'webinar'],
  generic: ['bridge', 'review_bonus', 'vsl'],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateCampaign() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Copy state
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [copiedArticle, setCopiedArticle] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<number | null>(null);

  // Funnel expand state (Step 3)
  const [expandedFunnel, setExpandedFunnel] = useState<string>('bridge');

  const [campaignData, setCampaignData] = useState<CampaignData>({
    link: '',
    keyword: '',
    tone: 'Professional',
    wordCount: '1,500 words',
    contentType: 'Product Review',
    funnelType: 'bridge',
    generatedContent: null,
  });

  const [funnelResult, setFunnelResult] = useState<FunnelBuilderData | null>(null);

  const steps = [
    { id: 1, title: 'Analyze Link', icon: Link2 },
    { id: 2, title: 'Generate Content', icon: FileText },
    { id: 3, title: 'Build Funnel', icon: GitBranch },
    { id: 4, title: 'Launch', icon: Rocket },
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // ── Step 1 ───────────────────────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (!campaignData.link) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: campaignData.link }),
      });
      if (!res.ok) throw new Error('Analysis failed');
      const productInfo = (await res.json()) as ProductInfo;
      setCampaignData(prev => ({
        ...prev,
        productInfo,
        keyword: productInfo.title || prev.keyword,
      }));
      handleNext();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2 ───────────────────────────────────────────────────────────────
  const handleGenerateContent = async () => {
    setLoading(true);
    setError(null);
    setCampaignData(prev => ({ ...prev, generatedContent: null }));
    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: campaignData.keyword,
          tone: campaignData.tone,
          wordCount: campaignData.wordCount,
          contentType: campaignData.contentType,
          productInfo: campaignData.productInfo,
        }),
      });
      if (!res.ok) throw new Error('We are currently experiencing high demand. Please try again later');
      const content = (await res.json()) as GeneratedContent;
      setCampaignData(prev => ({ ...prev, generatedContent: content }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3 ───────────────────────────────────────────────────────────────
  const handleGenerateFunnel = async () => {
    if (!campaignData.generatedContent) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          funnelType: campaignData.funnelType,
          generatedContent: campaignData.generatedContent,
          originalLink: campaignData.link,
          productInfo: campaignData.productInfo,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(body.error || 'We are currently experiencing high demand. Please try again later');
      }
      const funnelData = (await res.json()) as FunnelApiResponse;
      const hasPages = Array.isArray(funnelData.pages) && funnelData.pages.length > 0;
      const hasSteps = Array.isArray(funnelData.steps) && funnelData.steps.length > 0;
      if (!hasPages && !hasSteps) throw new Error('Funnel generation returned empty data. Please try again.');
      const stored: FunnelBuilderData = { ...funnelData, funnelType: campaignData.funnelType };
      sessionStorage.setItem('funnelBuilderData', JSON.stringify(stored));
      router.push('/funnelsbuilder');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 4 ───────────────────────────────────────────────────────────────
  const handleLaunch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...campaignData, funnelResult }),
      });
      if (!res.ok) throw new Error('Launch failed');
      router.push('/dashboard/pages');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ── On mount: check if returning from funnel builder ─────────────────────
  useEffect(() => {
    const saved = sessionStorage.getItem('funnelBuilderResult');
    if (saved) {
      try {
        const result = JSON.parse(saved) as FunnelBuilderData;
        setFunnelResult(result);
        if (result.funnelType) setCampaignData(prev => ({ ...prev, funnelType: result.funnelType }));
        setCurrentStep(4);
        sessionStorage.removeItem('funnelBuilderResult');
      } catch (e) {
        console.error('Failed to parse funnel builder result', e);
      }
    }
  }, []);

  // ── Funnel select helper ──────────────────────────────────────────────────
  const handleFunnelSelect = (id: string) => {
    setCampaignData(prev => ({ ...prev, funnelType: id }));
    setExpandedFunnel(id);
  };

  const handleFunnelToggle = (id: string) => {
    setExpandedFunnel(prev => (prev === id ? '' : id));
  };

  // ── Compute recommended funnels based on product info ─────────────────────
  const recommendedFunnelIds = useMemo(() => {
    if (!campaignData.productInfo?.title) return [];
    const niche = detectNicheFromTitle(campaignData.productInfo.title);
    let recommended = NICHE_TO_FUNNELS[niche] || NICHE_TO_FUNNELS.generic;

    // If price is high (> 500), also recommend webinar
    const priceNum = extractPrice(campaignData.productInfo.price);
    if (priceNum && priceNum > 500 && !recommended.includes('webinar')) {
      recommended = [...recommended, 'webinar'];
    }
    return recommended;
  }, [campaignData.productInfo]);

  // ─── Sub-components ───────────────────────────────────────────────────────

  function ToneDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toneOptions = ['Professional', 'Casual', 'Persuasive'];
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-[#F35D2C] text-sm text-[#6B5E5E] bg-white outline-none ring-2 ring-[#F35D2C]/10 focus:ring-[#F35D2C]/30 transition-all"
        >
          <span>{campaignData.tone}</span>
          <ChevronDown size={16} className={`text-[#6B5E5E]/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-[#006E74]/20 rounded-xl shadow-lg overflow-hidden z-10">
            {toneOptions.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => { setCampaignData(prev => ({ ...prev, tone: opt })); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                  campaignData.tone === opt ? 'bg-[#F35D2C] text-white' : 'text-[#6B5E5E] hover:bg-[#006E74]/5'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  function GeneratedContentPanel({ content }: { content: GeneratedContent }) {
    const handleCopyTitle = (title: string, idx: number) => {
      navigator.clipboard.writeText(title);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    };
    const handleCopyMeta = () => {
      navigator.clipboard.writeText(content.metaDescription);
      setCopiedMeta(true);
      setTimeout(() => setCopiedMeta(false), 2000);
    };
    const handleCopyArticle = () => {
      navigator.clipboard.writeText(content.article);
      setCopiedArticle(true);
      setTimeout(() => setCopiedArticle(false), 2000);
    };
    const handleCopySnippet = (c: string, idx: number) => {
      navigator.clipboard.writeText(c);
      setCopiedSnippet(idx);
      setTimeout(() => setCopiedSnippet(null), 2000);
    };

    return (
      <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
        {/* Titles */}
        <div className="bg-white rounded-2xl border border-[#006E74]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#006E74]/10 bg-gradient-to-r from-[#006E74]/5 to-transparent">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#F35D2C]/10 text-[#F35D2C]">
                <Tag size={16} />
              </div>
              <span className="font-bold text-[#6B5E5E]">SEO Titles</span>
              <span className="text-[10px] font-semibold px-2 py-1 bg-[#006E74]/10 text-[#006E74] rounded-full">5 variations</span>
            </div>
            <span className="text-xs text-[#6B5E5E]/40">Click copy to use</span>
          </div>
          <div className="divide-y divide-[#006E74]/5">
            {content.titles.map((title, idx) => (
              <div key={idx} className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#F35D2C]/5 transition-colors group">
                <span className="text-xs font-mono font-bold text-[#F35D2C]/60 mt-1 w-5 shrink-0">#{idx+1}</span>
                <p className="text-sm text-[#6B5E5E] flex-1 leading-relaxed">{title}</p>
                <button
                  onClick={() => handleCopyTitle(title, idx)}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-[#006E74]/10 text-[#006E74]/60"
                  title="Copy title"
                >
                  {copiedIndex === idx ? <CheckCheck size={16} className="text-[#006E74]" /> : <Copy size={16} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Description */}
        <div className="bg-white rounded-2xl border border-[#006E74]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#006E74]/10 bg-gradient-to-r from-[#006E74]/5 to-transparent">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#F35D2C]/10 text-[#F35D2C]">
                <AlignLeft size={16} />
              </div>
              <span className="font-bold text-[#6B5E5E]">Meta Description</span>
              <span className="text-[10px] font-semibold px-2 py-1 bg-[#006E74]/10 text-[#006E74] rounded-full">{content.metaDescription.length} chars</span>
            </div>
            <button
              onClick={handleCopyMeta}
              className="p-2 rounded-lg hover:bg-[#006E74]/10 text-[#006E74]/60 transition-colors"
              title="Copy meta description"
            >
              {copiedMeta ? <CheckCheck size={16} className="text-[#006E74]" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="px-5 py-4">
            <p className="text-sm text-[#6B5E5E] leading-relaxed">{content.metaDescription}</p>
          </div>
        </div>

        {/* Full Article */}
        <div className="bg-white rounded-2xl border border-[#006E74]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#006E74]/10 bg-gradient-to-r from-[#006E74]/5 to-transparent">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#F35D2C]/10 text-[#F35D2C]">
                <ScrollText size={16} />
              </div>
              <span className="font-bold text-[#6B5E5E]">Full Article</span>
              <span className="text-[10px] font-semibold px-2 py-1 bg-[#006E74]/10 text-[#006E74] rounded-full">{campaignData.wordCount}</span>
            </div>
            <button
              onClick={handleCopyArticle}
              className="p-2 rounded-lg hover:bg-[#006E74]/10 text-[#006E74]/60 transition-colors"
              title="Copy article"
            >
              {copiedArticle ? <CheckCheck size={16} className="text-[#006E74]" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="px-5 py-4 max-h-96 overflow-y-auto">
            <div
              className="prose prose-sm max-w-none text-[#6B5E5E]"
              dangerouslySetInnerHTML={{ __html: content.article }}
            />
          </div>
          <div className="h-6 bg-gradient-to-t from-white to-transparent -mt-6 pointer-events-none" />
        </div>

        {/* Social Snippets */}
        <div className="bg-white rounded-2xl border border-[#006E74]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#006E74]/10 bg-gradient-to-r from-[#006E74]/5 to-transparent">
            <div className="p-2 rounded-lg bg-[#F35D2C]/10 text-[#F35D2C]">
              <Share2 size={16} />
            </div>
            <span className="font-bold text-[#6B5E5E]">Social Media Snippets</span>
            <span className="text-[10px] font-semibold px-2 py-1 bg-[#006E74]/10 text-[#006E74] rounded-full">3 platforms</span>
          </div>
          <div className="divide-y divide-[#006E74]/5">
            {content.socialSnippets.map((snippet, idx) => (
              <div key={idx} className="px-5 py-4 group">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${
                    snippet.platform === 'Twitter/X' ? 'bg-black text-white' :
                    snippet.platform === 'LinkedIn' ? 'bg-[#0A66C2] text-white' :
                    'bg-[#1877F2] text-white'
                  }`}>
                    {snippet.platform === 'Twitter/X' && <Twitter size={12} />}
                    {snippet.platform === 'LinkedIn' && <Linkedin size={12} />}
                    {snippet.platform === 'Facebook' && <Facebook size={12} />}
                    {snippet.platform}
                  </div>
                  <button
                    onClick={() => handleCopySnippet(snippet.content, idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-[#006E74]/10 text-[#006E74]/60"
                    title="Copy snippet"
                  >
                    {copiedSnippet === idx ? <CheckCheck size={16} className="text-[#006E74]" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-sm text-[#6B5E5E] leading-relaxed whitespace-pre-line">{snippet.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regenerate button */}
        <div className="pt-2">
          <button
            onClick={() => setCampaignData(prev => ({ ...prev, generatedContent: null }))}
            className="w-full py-3.5 rounded-xl border-2 border-[#006E74]/20 text-[#6B5E5E] text-sm font-semibold hover:bg-[#006E74]/5 hover:border-[#006E74]/30 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} className="text-[#006E74]/60" />
            Regenerate Content
          </button>
        </div>
      </div>
    );
  }

  // ── Selected funnel summary ───────────────────────────────────────────────
  const selectedFunnel = FUNNELS.find(f => f.id === campaignData.funnelType) ?? FUNNELS[0];

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8 bg-white min-h-screen pb-24 md:pb-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#6B5E5E] mb-2">Create New Campaign</h1>
        <p className="text-sm md:text-base text-[#6B5E5E]/70">Paste your affiliate link to get started with AI-powered content generation</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">{error}</div>
      )}

      {/* Stepper */}
      <div className="flex items-center justify-between bg-white border border-[#006E74]/10 p-3 md:p-4 rounded-2xl overflow-x-auto">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-1 md:gap-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  isActive ? 'bg-[#F35D2C] text-white' :
                  isCompleted ? 'bg-[#006E74] text-white' :
                  'bg-[#006E74]/10 text-[#6B5E5E]/40'
                }`}>
                  {isCompleted ? <Check size={16} /> : <step.icon size={16} />}
                </div>
                <span className={`font-semibold text-xs md:text-sm hidden sm:block ${
                  isActive ? 'text-[#F35D2C]' :
                  isCompleted ? 'text-[#006E74]' :
                  'text-[#6B5E5E]/40'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight size={16} className="text-[#006E74]/20 mx-1 md:mx-2 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Dynamic Content */}
      <div className="bg-white border border-[#006E74]/10 rounded-2xl md:rounded-3xl p-4 md:p-8">

        {/* ── STEP 1 ── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F35D2C]/10 flex items-center justify-center text-[#F35D2C] shrink-0">
                <Link2 size={24} />
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#6B5E5E]">Paste Your Affiliate Link</h3>
                <p className="text-sm text-[#6B5E5E]/70 mb-6">We support Amazon, ClickBank, ShareASale, and 20+ networks</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      value={campaignData.link}
                      onChange={e => setCampaignData(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://amazon.com/dp/B08N5WRWNW?tag=youraffid-20"
                      className="w-full pl-4 pr-4 py-3 rounded-xl border border-[#006E74]/20 focus:border-[#F35D2C] focus:ring-2 focus:ring-[#F35D2C]/20 transition-all outline-none text-sm text-[#6B5E5E] placeholder-[#6B5E5E]/40"
                    />
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={loading || !campaignData.link}
                    className="px-6 py-3 bg-[#F35D2C] hover:bg-[#e04e1f] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors w-full sm:w-auto disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    Analyze Link
                  </button>
                </div>

                {/* Display extracted product info */}
                {campaignData.productInfo && (
                  <div className="mt-6 p-4 bg-[#006E74]/5 rounded-xl border border-[#006E74]/10">
                    <h4 className="font-bold text-[#6B5E5E] mb-2">Extracted Product Info</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Title:</span> {campaignData.productInfo.title}</p>
                      {campaignData.productInfo.description && (
                        <p><span className="font-semibold">Description:</span> {campaignData.productInfo.description}</p>
                      )}
                      {campaignData.productInfo.price && (
                        <p><span className="font-semibold">Price:</span> {campaignData.productInfo.price} {campaignData.productInfo.currency}</p>
                      )}
                      {campaignData.productInfo.rating && (
                        <p><span className="font-semibold">Rating:</span> {campaignData.productInfo.rating} ({campaignData.productInfo.reviewCount} reviews)</p>
                      )}
                      {campaignData.productInfo.imageUrls && campaignData.productInfo.imageUrls.length > 0 && (
                        <p><span className="font-semibold">Images found:</span> {campaignData.productInfo.imageUrls.length}</p>
                      )}
                      {campaignData.productInfo.features && campaignData.productInfo.features.length > 0 && (
                        <div>
                          <span className="font-semibold">Features:</span>
                          <ul className="list-disc list-inside mt-1">
                            {campaignData.productInfo.features.slice(0,5).map((f,i) => (
                              <li key={i} className="text-[#6B5E5E]/80">{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {campaignData.productInfo.benefits && campaignData.productInfo.benefits.length > 0 && (
                        <div>
                          <span className="font-semibold">Benefits:</span>
                          <ul className="list-disc list-inside mt-1">
                            {campaignData.productInfo.benefits.slice(0,5).map((b,i) => (
                              <li key={i} className="text-[#6B5E5E]/80">{b}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-6 text-xs font-semibold text-[#6B5E5E]/50 uppercase tracking-wider">
                  <span>Amazon</span><span>ClickBank</span><span>ShareASale</span>
                  <span>CJ</span><span>Rakuten</span><span className="text-[#6B5E5E]/30">+15 more</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── (Improved) */}
        {currentStep === 2 && (
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F35D2C] to-[#F35D2C]/80 flex items-center justify-center text-white shadow-lg shadow-[#F35D2C]/20">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#6B5E5E] leading-tight">Content Configuration</h3>
                <p className="text-sm text-[#6B5E5E]/70">Customize your AI-generated content</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Primary Keyword */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#6B5E5E] flex items-center gap-1.5">
                  <Target size={14} className="text-[#F35D2C]" />
                  Primary Keyword
                </label>
                <input
                  type="text"
                  value={campaignData.keyword}
                  onChange={e => setCampaignData(prev => ({ ...prev, keyword: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-[#006E74]/20 text-sm text-[#6B5E5E] focus:border-[#F35D2C] focus:ring-2 focus:ring-[#F35D2C]/20 outline-none transition-all"
                  placeholder="e.g., best weight loss supplement"
                />
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#6B5E5E] flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-[#F35D2C]" />
                  Tone of Voice
                </label>
                <ToneDropdown />
              </div>

              {/* Word Count */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#6B5E5E] flex items-center gap-1.5">
                  <FileText size={14} className="text-[#F35D2C]" />
                  Word Count
                </label>
                <select
                  value={campaignData.wordCount}
                  onChange={e => setCampaignData(prev => ({ ...prev, wordCount: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-[#006E74]/20 text-sm text-[#6B5E5E] bg-white outline-none focus:border-[#F35D2C] focus:ring-2 focus:ring-[#F35D2C]/20 transition-all"
                >
                  <option>1,500 words</option>
                  <option>2,000 words</option>
                  <option>2,500 words</option>
                </select>
              </div>

              {/* Content Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#6B5E5E] flex items-center gap-1.5">
                  <Layers size={14} className="text-[#F35D2C]" />
                  Content Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'Product Review', icon: BookOpen },
                    { id: 'Comparison', icon: Scale },
                    { id: 'How-To Guide', icon: FileSearch },
                    { id: 'Listicle', icon: List },
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setCampaignData(prev => ({ ...prev, contentType: type.id }))}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        campaignData.contentType === type.id
                          ? 'bg-gradient-to-r from-[#F35D2C] to-[#F35D2C]/90 text-white border-[#F35D2C] shadow-md shadow-[#F35D2C]/20'
                          : 'bg-white text-[#6B5E5E]/70 border-[#006E74]/20 hover:border-[#F35D2C]/30 hover:bg-[#F35D2C]/5'
                      }`}
                    >
                      <type.icon size={16} />
                      {type.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!campaignData.generatedContent && (
              <button
                onClick={handleGenerateContent}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F35D2C] to-[#F35D2C]/90 text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#F35D2C]/30 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 group"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Generating your content…</>
                ) : (
                  <><Sparkles size={18} className="group-hover:rotate-12 transition-transform" /> Generate Content</>
                )}
              </button>
            )}

            {campaignData.generatedContent && (
              <GeneratedContentPanel content={campaignData.generatedContent} />
            )}
          </div>
        )}

        {/* ── STEP 3 — Pro Funnel Builder (with animated expand/collapse) ── */}
        {currentStep === 3 && (
          <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#006E74]/10 flex items-center justify-center text-[#006E74]">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#6B5E5E] leading-tight">Choose Your Funnel Strategy</h3>
                <p className="text-sm text-[#6B5E5E]/60">Battle-tested systems used by the world&apos;s top affiliate earners</p>
                {campaignData.productInfo && (
                  <p className="text-xs text-[#006E74] mt-1 font-medium">
                    🏆 Recommended funnels based on your product are highlighted
                  </p>
                )}
              </div>
            </div>

            {/* Funnel Cards */}
            <div className="space-y-3">
              {FUNNELS.map(funnel => {
                const isSelected = campaignData.funnelType === funnel.id;
                const isOpen = expandedFunnel === funnel.id;
                const isRecommended = recommendedFunnelIds.includes(funnel.id);

                return (
                  <div
                    key={funnel.id}
                    className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                      isSelected
                        ? 'border-[#F35D2C] bg-[#F35D2C]/3'
                        : isRecommended
                        ? 'border-green-300 bg-green-50/30'
                        : 'border-[#006E74]/10 hover:border-[#006E74]/25 bg-white'
                    }`}
                  >
                    {/* Card Header Row - click to select */}
                    <div
                      className="flex items-center gap-3 p-4 cursor-pointer"
                      onClick={() => handleFunnelSelect(funnel.id)}
                    >
                      {/* Radio */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'border-[#F35D2C] bg-[#F35D2C]' : 'border-[#006E74]/20'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      {/* Name + Badge */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="font-bold text-[#6B5E5E] text-sm md:text-base">{funnel.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${funnel.badgeColor}`}>
                            {funnel.badge}
                          </span>
                          {isRecommended && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-300 flex items-center gap-1">
                              <Award size={12} /> Recommended
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B5E5E]/50 font-medium">
                          <span className="flex items-center gap-1">
                            <TrendingUp size={10} className="text-[#006E74]" />
                            {funnel.conversionRate} CVR
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText size={10} className="text-[#006E74]" />
                            {funnel.pages} pages
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail size={10} className="text-[#006E74]" />
                            {funnel.emails} emails
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={10} className="text-[#F35D2C]" />
                            {funnel.commissionType}
                          </span>
                        </div>
                      </div>

                      {/* Chevron - click to toggle expansion (does not select) */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFunnelToggle(funnel.id);
                        }}
                      >
                        <ChevronRight
                          size={16}
                          className={`text-[#6B5E5E]/30 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                        />
                      </div>
                    </div>

                    {/* Expanded Detail with height transition */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: isOpen ? '1000px' : '0' }}
                    >
                      <div className="px-4 pb-5 space-y-4 border-t border-[#006E74]/8 pt-4">
                        <p className="text-sm text-[#6B5E5E]/80 leading-relaxed">{funnel.description}</p>

                        {/* Funnel Flow */}
                        <div>
                          <p className="text-[10px] font-bold text-[#006E74]/60 uppercase tracking-widest mb-2.5">Funnel Flow</p>
                          <div className="flex items-center flex-wrap gap-1.5">
                            {funnel.flow.map((step, i) => {
                              const Icon = step.icon;
                              return (
                                <React.Fragment key={i}>
                                  <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                                    step.highlight
                                      ? 'bg-[#F35D2C] text-white shadow-sm shadow-[#F35D2C]/30'
                                      : 'bg-[#006E74]/8 text-[#6B5E5E]/70'
                                  }`}>
                                    <Icon size={12} />
                                    <span>{step.label}</span>
                                  </div>
                                  {i < funnel.flow.length - 1 && (
                                    <ArrowRight size={12} className="text-[#6B5E5E]/25 shrink-0" />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>

                        {/* Best For + Tier */}
                        <div className="flex flex-wrap gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-[#006E74]/60 uppercase tracking-widest mb-1.5">Best For</p>
                            <div className="flex flex-wrap gap-1.5">
                              {funnel.bestFor.map(t => (
                                <span key={t} className="text-[11px] font-semibold px-2.5 py-1 bg-[#006E74]/8 text-[#006E74] rounded-lg">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-[#006E74]/60 uppercase tracking-widest mb-1.5">Skill Level</p>
                            <span className="text-[11px] font-semibold px-2.5 py-1 bg-[#F35D2C]/8 text-[#F35D2C] rounded-lg">
                              {funnel.tier}
                            </span>
                          </div>
                        </div>

                        {/* What AI generates */}
                        <div className="bg-[#006E74]/4 border border-[#006E74]/10 rounded-xl p-3.5">
                          <p className="text-[10px] font-bold text-[#006E74] uppercase tracking-widest mb-2">AI Generates For You</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                            {funnel.generates.map(item => (
                              <span key={item} className="flex items-center gap-1.5 text-xs text-[#6B5E5E]/70 font-medium">
                                <Check size={10} className="text-[#006E74] shrink-0" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Pro Tip */}
                        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                          <Star size={14} className="text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-800 font-medium leading-relaxed">
                            <span className="font-bold">Pro Insight: </span>
                            {funnel.proTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selection Summary Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#006E74]/5 border border-[#006E74]/15 rounded-2xl p-4">
              <div className="flex-1">
                <p className="text-xs font-bold text-[#006E74] uppercase tracking-wide mb-0.5">Selected Strategy</p>
                <p className="text-sm font-bold text-[#6B5E5E]">{selectedFunnel.name}</p>
                <p className="text-xs text-[#6B5E5E]/50 mt-0.5">
                  {selectedFunnel.pages} landing pages · {selectedFunnel.emails} email automations · {selectedFunnel.conversionRate} avg. conversion
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFunnel.bestFor.map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-white border border-[#006E74]/15 text-[#006E74] rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3 pt-2">
              <button
                onClick={handleGenerateFunnel}
                disabled={loading || !campaignData.generatedContent}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F35D2C] hover:bg-[#e04e1f] active:scale-[0.98] text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 shadow-lg shadow-[#F35D2C]/20"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Building your funnel…</>
                ) : (
                  <><Sparkles size={18} /> Generate {selectedFunnel.name}</>
                )}
              </button>

              {loading && (
                <p className="text-center text-sm text-[#006E74] animate-pulse font-medium">
                  Crafting {selectedFunnel.pages} conversion pages + {selectedFunnel.emails} email automations — 15–30 secs…
                </p>
              )}

              {!campaignData.generatedContent && (
                <p className="text-center text-xs text-[#6B5E5E]/40 font-medium">
                  ← Complete Step 2 to generate content before building your funnel
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 4 ── */}
        {currentStep === 4 && (
          <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#006E74]/10 rounded-full flex items-center justify-center text-[#006E74] mb-2">
              <Rocket size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#6B5E5E]">Ready to Launch!</h2>
            <p className="text-sm md:text-base text-[#6B5E5E]/70 max-w-md px-4">
              Your funnel is built and ready. Click below to deploy.
            </p>

            {funnelResult && (
              <div className="space-y-2 text-xs md:text-sm text-[#6B5E5E]/70 font-medium py-4">
                <div className="flex items-center gap-2 justify-center">
                  <Check size={16} className="text-[#006E74]" />
                  Funnel type: {FUNNELS.find(f => f.id === campaignData.funnelType)?.name ?? campaignData.funnelType}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Check size={16} className="text-[#006E74]" />
                  {funnelResult.pages?.length ?? 0} pages built · {funnelResult.emails?.length ?? 0} follow-up emails
                </div>
                {funnelResult.video && (
                  <div className="flex items-center gap-2 justify-center">
                    <Check size={16} className="text-[#006E74]" />
                    Video suggestion: {funnelResult.video.title}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleLaunch}
              disabled={loading || !funnelResult}
              className="px-6 md:px-8 py-3 md:py-4 rounded-xl bg-[#F35D2C] hover:bg-[#e04e1f] text-white font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Rocket size={18} />}
              Launch Campaign
            </button>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1 || loading}
          className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold border transition-colors ${
            currentStep === 1 || loading
              ? 'border-[#006E74]/10 text-[#6B5E5E]/30 cursor-not-allowed'
              : 'border-[#006E74]/20 text-[#6B5E5E]/70 hover:bg-[#006E74]/5'
          }`}
        >
          Previous
        </button>

        {currentStep < 4 && currentStep !== 3 && (
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-xl bg-[#F35D2C] hover:bg-[#e04e1f] text-white text-xs md:text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            Continue
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}