"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Link2, FileText, GitBranch, Rocket, Check,
  ChevronRight, Sparkles, Mail, ChevronDown, Loader2,
  Copy, CheckCheck, Tag, AlignLeft, ScrollText, Share2,
  BookOpen, List, Scale, FileSearch, TrendingUp, Video,
  Zap, BarChart2, ArrowRight, Star, Clock, DollarSign,
  Target, Gift, PlayCircle, HelpCircle, Layers,
  MessageSquare, RefreshCw, Twitter, Linkedin, Facebook,
  Award, UserCheck, RotateCcw, ChevronUp,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialSnippet {
  platform: "Twitter/X" | "LinkedIn" | "Facebook";
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

// ─── Funnel page structure ────────────────────────────────────────────────────

interface FunnelPage {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  highlight?: boolean;
  description: string;
  goal: string;
}

interface FunnelDef {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  conversionRate: string;
  tier: string;
  tierColor: string;
  bestFor: string[];
  commissionType: string;
  pageCount: number;
  emailCount: number;
  tagline: string;
  description: string;
  mechanic: string;
  pages: FunnelPage[];
  emailStrategy: string;
  proTip: string;
  proName: string;
  proEarnings: string;
  generates: string[];
  stats: { label: string; value: string }[];
}

// ─── Funnel definitions ───────────────────────────────────────────────────────

const FUNNELS: FunnelDef[] = [
  {
    id: "bridge",
    name: "Bridge Funnel",
    badge: "#1 for Affiliates",
    badgeColor: "bg-[#F35D2C] text-white",
    conversionRate: "18-34%",
    tier: "Beginner Friendly",
    tierColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    bestFor: ["Paid Ads", "Cold Traffic", "ClickBank", "Info Products"],
    commissionType: "CPS / CPA",
    pageCount: 2,
    emailCount: 7,
    tagline: "Russell Brunson's official 2-page affiliate method",
    description:
      "Russell Brunson's exact Bridge Funnel structure: two pages, nothing more. Page 1 collects the email. Page 2 is a bridge page with a personal video that explains the offer, builds trust, and sends the visitor to the affiliate offer via a CTA button.",
    mechanic:
      "Visitor lands on opt-in page → enters email for free bonus → lands on bridge page → watches your personal video intro of the offer → clicks CTA button → arrives at the affiliate offer pre-sold.",
    pages: [
      {
        id: "bridge-optin",
        label: "Opt-in Page",
        icon: Mail,
        color: "#006E74",
        highlight: false,
        description:
          "Where visitors enter their email address to access the next step. Includes a headline, a short description, and a simple opt-in form. A lead magnet (free guide or bonus offer) encourages sign-ups. One form. One CTA. Nothing else.",
        goal:
          "Collect the email address. Every extra element on this page kills opt-in rate.",
      },
      {
        id: "bridge-ad",
        label: "Bridge Page",
        icon: Video,
        color: "#F35D2C",
        highlight: true,
        description:
          "After opting in, visitors land here. This page includes a VIDEO that explains what the offer is, why you recommend it, and what to do next. A CTA button links directly to the external affiliate sales page. This is the bridge between your audience and the vendor.",
        goal:
          "The video does the selling. The CTA button sends them to the affiliate offer. That's the whole job of this page.",
      },
    ],
    emailStrategy: "Story → Proof → Objection handling → CTA → Scarcity close",
    proTip:
      "Russell Brunson built ClickFunnels past $100M ARR using this exact 2-page structure for affiliate campaigns. The video on the bridge page is the #1 conversion driver.",
    proName: "Russell Brunson",
    proEarnings: "$100M+ ARR",
    generates: [
      "Opt-in page copy",
      "Lead magnet hook",
      "Bridge page video script",
      "Personal story intro",
      "7-email follow-up sequence",
    ],
    stats: [
      { label: "Avg. CVR", value: "18-34%" },
      { label: "Pages", value: "2" },
      { label: "Emails", value: "7" },
      { label: "Build Time", value: "~1 hr" },
    ],
  },
  {
    id: "vsl",
    name: "VSL Funnel",
    badge: "Highest EPC",
    badgeColor: "bg-[#006E74] text-white",
    conversionRate: "25-42%",
    tier: "Intermediate",
    tierColor: "text-blue-700 bg-blue-50 border-blue-200",
    bestFor: ["YouTube Ads", "Facebook Ads", "ClickBank"],
    commissionType: "High-Ticket / Recurring",
    pageCount: 5,
    emailCount: 9,
    tagline: "Robby Blanchard's ClickBank dominator",
    description:
      "Video Sales Letter funnels dominate ClickBank leaderboards. A short VSL pre-sells visitors before the order page — the go-to format for top earners like Robby Blanchard and Adam Cherrington.",
    mechanic:
      "Lead opts in for free video → watches VSL → order page hits at peak buying intent → OTO captures the upsell → thank you confirms and seeds the next action.",
    pages: [
      {
        id: "vsl-optin",
        label: "Opt-in Page",
        icon: Mail,
        color: "#6B5E5E",
        description:
          "The most minimal page in the funnel. Headline, sub-headline, form, button. Nothing else. Trades email for access to free training video. Every extra element reduces conversions.",
        goal: "Collect email. This page has ONE job — get the email address.",
      },
      {
        id: "vsl-watch",
        label: "VSL Watch Page",
        icon: Video,
        color: "#F35D2C",
        highlight: true,
        description:
          "Completely distraction-free. NO navigation. NO footer. NO links. The video is the entire page. The CTA button only appears when the pitch begins.",
        goal: "Get them to press Play and watch to the end. The CTA only reveals at the pitch.",
      },
      {
        id: "vsl-order",
        label: "Order Page",
        icon: DollarSign,
        color: "#006E74",
        description:
          "Post-video order page with countdown timer, full value stack, bonuses, and guarantee. Strikes while buying intent is at its absolute peak immediately after the video ends.",
        goal: "Convert at maximum readiness. The countdown creates urgency. Strike now.",
      },
      {
        id: "vsl-upsell",
        label: "Upsell / OTO",
        icon: TrendingUp,
        color: "#F35D2C",
        description:
          "One-Time Offer shown immediately after purchase. The buyer is in buying mode right now. One specific upgrade. Yes or No — no other choices.",
        goal: "One upgrade offer. Saying no must feel like leaving money on the table.",
      },
      {
        id: "vsl-thankyou",
        label: "Thank You Page",
        icon: Check,
        color: "#6B5E5E",
        description:
          "Confirms the order, delivers access instructions, and immediately presents the next logical action while buyer dopamine is still high.",
        goal: "Celebrate the purchase. Deliver access. Seed the next action immediately.",
      },
    ],
    emailStrategy:
      "Pre-frame → Watch reminder → Replay urgency → Testimonials → Deadline",
    proTip:
      "Robby Blanchard (ClickBank's #1 affiliate) uses VSL funnels exclusively for Facebook and YouTube campaigns.",
    proName: "Robby Blanchard",
    proEarnings: "$4M+/month",
    generates: [
      "VSL script outline",
      "Hook + story arc",
      "Order page value stack",
      "OTO offer copy",
      "9-email indoctrination series",
    ],
    stats: [
      { label: "Avg. CVR", value: "25-42%" },
      { label: "Pages", value: "5" },
      { label: "Emails", value: "9" },
      { label: "Best Traffic", value: "YouTube" },
    ],
  },
  {
    id: "review_bonus",
    name: "Review + Bonus Stack",
    badge: "Best for SEO",
    badgeColor: "bg-emerald-600 text-white",
    conversionRate: "12-22%",
    tier: "All Levels",
    tierColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    bestFor: ["Google SEO", "YouTube Reviews", "Organic Traffic"],
    commissionType: "CPS / Amazon / SaaS",
    pageCount: 3,
    emailCount: 5,
    tagline: "Pat Flynn's SEO and YouTube empire method",
    description:
      "The cornerstone of Authority Hacker, Niche Pursuits, and Pat Flynn's empires. An honest review paired with an irresistible bonus stack that only unlocks through your affiliate link.",
    mechanic:
      "Visitor finds review via Google or YouTube → reads honest review → clicks to bonus reveal page → sees exclusive bonus stack only available through your link → buys.",
    pages: [
      {
        id: "review-article",
        label: "Review Article",
        icon: FileText,
        color: "#6B5E5E",
        description:
          "Long-form honest review (1,500-3,000 words) structured like a professional journalist wrote it. Ranks on Google and YouTube. Covers pros, cons, who it is for, and real test results.",
        goal:
          "Rank #1 for [product] review keywords. Build trust through radical honesty including real flaws.",
      },
      {
        id: "bonus-reveal",
        label: "Bonus Reveal Page",
        icon: Gift,
        color: "#F35D2C",
        highlight: true,
        description:
          "Exclusive bonus stack that ONLY unlocks when the visitor buys through your affiliate link. The bonuses must be genuinely more valuable than the product itself.",
        goal:
          "Make buying through your link feel like the only logical choice. Bonuses are the conversion driver.",
      },
      {
        id: "checkout",
        label: "Affiliate Checkout",
        icon: DollarSign,
        color: "#006E74",
        description:
          "The vendor's checkout page. Your affiliate link lands here after the bonus reveal page has pre-sold them on why they must buy through you specifically.",
        goal: "Convert the motivated buyer who came specifically for your exclusive bonuses.",
      },
    ],
    emailStrategy:
      "Bonus tease → Reveal → Comparison → Urgency → Final CTA",
    proTip:
      "Pat Flynn earns $100k+/mo from review funnels — the bonus stack converts 3x better than bare affiliate links.",
    proName: "Pat Flynn",
    proEarnings: "$100k+/month",
    generates: [
      "Long-form review article",
      "Pros/cons breakdown",
      "Bonus reveal page",
      "Comparison table",
      "5-email nurture sequence",
    ],
    stats: [
      { label: "Avg. CVR", value: "12-22%" },
      { label: "Pages", value: "3" },
      { label: "Emails", value: "5" },
      { label: "Best Traffic", value: "Google SEO" },
    ],
  },
  {
    id: "quiz",
    name: "Quiz / Survey Funnel",
    badge: "Best Cold Traffic",
    badgeColor: "bg-violet-600 text-white",
    conversionRate: "30-55%",
    tier: "Intermediate",
    tierColor: "text-violet-700 bg-violet-50 border-violet-200",
    bestFor: ["Facebook Ads", "TikTok", "Pinterest"],
    commissionType: "CPA / Lead Gen",
    pageCount: 4,
    emailCount: 7,
    tagline: "Ryan Levesque's Ask Method — 60-80% opt-in rates",
    description:
      "Ryan Levesque's Ask Method quiz funnel is the highest opt-in rate format for cold paid traffic. Segmented results pages show each visitor a personalised offer — sky-high relevance equals sky-high conversions.",
    mechanic:
      "Ad sends to quiz landing → visitor answers questions investing time → enters email to see personalised results → results page makes a tailored recommendation → segmented offer closes the sale.",
    pages: [
      {
        id: "quiz-landing",
        label: "Quiz Landing Page",
        icon: HelpCircle,
        color: "#7c3aed",
        description:
          "Take the 60-second quiz to find out which solution is right for your situation. Frames the funnel as a personalisation tool, not a sales process. Lowers resistance dramatically.",
        goal:
          "Get them to click Start Quiz. Curiosity and personalisation are the conversion mechanisms.",
      },
      {
        id: "quiz-optin",
        label: "Quiz Opt-in Gate",
        icon: Mail,
        color: "#F35D2C",
        highlight: true,
        description:
          "Enter your email to see your personalised results. Placed between questions and the results page. Converts at 60-80% because visitors have already invested effort answering questions.",
        goal:
          "Capture email at peak curiosity. Their time investment is your conversion rate.",
      },
      {
        id: "quiz-results",
        label: "Results Page",
        icon: BarChart2,
        color: "#006E74",
        description:
          "Delivers personalised results that reference the visitor's specific quiz answers. The product recommendation feels like a custom prescription based on their data — not a generic pitch.",
        goal:
          "Make the offer feel tailor-made. Use their answers to frame every headline.",
      },
      {
        id: "checkout",
        label: "Segmented Offer",
        icon: DollarSign,
        color: "#6B5E5E",
        description:
          "The affiliate offer framed around their specific quiz results and profile type. High relevance drives high conversion.",
        goal:
          "Reference their specific quiz answers in every headline and subhead.",
      },
    ],
    emailStrategy:
      "Results delivery → Personalised proof → Objection busting → Urgency → Final push",
    proTip:
      "Ryan Levesque used quiz funnels to generate $100M+ in sales across 23 markets — highest cold-traffic opt-in rate of any funnel type.",
    proName: "Ryan Levesque",
    proEarnings: "$100M+ across 23 markets",
    generates: [
      "Quiz intro hook",
      "5-7 question flow",
      "Segmented results pages",
      "Personalised offer copy",
      "7-email behavioural sequence",
    ],
    stats: [
      { label: "Avg. CVR", value: "30-55%" },
      { label: "Pages", value: "4" },
      { label: "Emails", value: "7" },
      { label: "Opt-in Rate", value: "60-80%" },
    ],
  },
  {
    id: "webinar",
    name: "Auto-Webinar Funnel",
    badge: "Highest Commissions",
    badgeColor: "bg-amber-500 text-white",
    conversionRate: "10-18%",
    tier: "Advanced",
    tierColor: "text-amber-700 bg-amber-50 border-amber-200",
    bestFor: ["High-Ticket", "Email Lists", "Coaching"],
    commissionType: "$500-$5,000 per sale",
    pageCount: 5,
    emailCount: 12,
    tagline: "John Crestani's $500k+/month high-ticket machine",
    description:
      "The go-to funnel for promoting high-ticket affiliate offers ($500-$5,000 commissions). An automated evergreen webinar builds massive authority and trust before the pitch — used by JVZoo and Warrior Plus elites.",
    mechanic:
      "Registration page fills seats → confirmation starts indoctrination → attendees watch full webinar → pitch reveals the offer → order page closes attendees → replay page converts non-attendees.",
    pages: [
      {
        id: "webinar-registration",
        label: "Registration Page",
        icon: UserCheck,
        color: "#d97706",
        description:
          "Sells the CONTENT of the webinar, not the product. The headline reveals what they will LEARN. Includes date, time, countdown, and specific content promises.",
        goal:
          "Fill seats by selling the training value. The webinar is the bridge to the offer.",
      },
      {
        id: "webinar-confirm",
        label: "Confirmation + Indoc",
        icon: Mail,
        color: "#6B5E5E",
        description:
          "Confirms registration and begins the indoctrination sequence immediately. Includes date, time, what to prepare, and a pre-webinar authority-building video.",
        goal:
          "Reduce no-shows from 70% to 40%. Start building authority before the webinar begins.",
      },
      {
        id: "webinar-watch",
        label: "Webinar Watch Page",
        icon: Video,
        color: "#F35D2C",
        highlight: true,
        description:
          "Completely distraction-free environment. No navigation. No footer. No sidebar. The video player is the entire page. CTA reveals when the pitch section begins.",
        goal:
          "Get them watching and keep them watching. The pitch happens inside the video.",
      },
      {
        id: "webinar-order",
        label: "Order Page",
        icon: DollarSign,
        color: "#006E74",
        description:
          "Post-webinar order page for attendees only. Full bonus stack, attendee-only savings, countdown to end-of-webinar pricing. Strikes at peak readiness.",
        goal:
          "Close at maximum readiness. Every second of delay costs a sale.",
      },
      {
        id: "webinar-replay",
        label: "Replay Page",
        icon: RotateCcw,
        color: "#6B5E5E",
        description:
          "Limited 24-hour replay for non-attendees before it is removed. Converts the 40-60% who registered but did not attend. Identical sales elements to the order page.",
        goal:
          "Recover non-attendees. The replay page alone adds 30-40% more revenue.",
      },
    ],
    emailStrategy:
      "Registration confirm → Pre-webinar indoc ×3 → Reminders → Replay → Close → Final hour",
    proTip:
      "John Crestani generates $500k+/month using auto-webinar funnels — each sale nets $500-$2,000 in commissions.",
    proName: "John Crestani",
    proEarnings: "$500k+/month",
    generates: [
      "Registration page copy",
      "Confirmation email",
      "Webinar script outline",
      "Order page value stack",
      "12-email sales sequence",
    ],
    stats: [
      { label: "Avg. CVR", value: "10-18%" },
      { label: "Pages", value: "5" },
      { label: "Emails", value: "12" },
      { label: "Avg. Commission", value: "$500-$5k" },
    ],
  },
  {
    id: "flash",
    name: "Flash Deal Funnel",
    badge: "Fastest Cash Flow",
    badgeColor: "bg-rose-600 text-white",
    conversionRate: "22-38%",
    tier: "All Levels",
    tierColor: "text-rose-700 bg-rose-50 border-rose-200",
    bestFor: ["Email Blasts", "Retargeting", "Launch Windows"],
    commissionType: "CPS / Limited Promos",
    pageCount: 3,
    emailCount: 3,
    tagline: "Spencer Mecham's $50k-in-72-hours playbook",
    description:
      "The fastest cash-flow funnel in the affiliate playbook. A laser-focused scarcity page + 3-email flash-sale sequence. Ideal for product launches, affiliate contests, and retargeting warm audiences.",
    mechanic:
      "Email blast sends warm audience to flash deal page with visible countdown → urgency drives immediate decision → order page captures payment → thank you page presents OTO at peak buying momentum.",
    pages: [
      {
        id: "flash-deal",
        label: "Flash Deal Page",
        icon: Zap,
        color: "#e11d48",
        highlight: true,
        description:
          "ONE offer. ONE price. ONE CTA button. The countdown timer IS the headline. No navigation. No distractions. If it is not directly contributing to the sale, it does not belong on this page.",
        goal:
          "Maximum urgency. The clock creates the conversion. Buy or leave — no middle ground.",
      },
      {
        id: "flash-order",
        label: "Order Page",
        icon: DollarSign,
        color: "#006E74",
        description:
          "Stripped-back checkout. Order summary, trust badges, one button. The visitor already decided to buy — do NOT give them anything to second-guess.",
        goal:
          "Minimum friction between decision and payment. Fast. Safe. Inevitable.",
      },
      {
        id: "flash-thankyou",
        label: "Thank You + OTO",
        icon: Gift,
        color: "#F35D2C",
        description:
          "Confirms the purchase AND immediately presents one specific upgrade offer (OTO). The buyer is still in buying mode — this is the highest-converting page for upsells.",
        goal:
          "Strike with one OTO immediately after purchase while dopamine is at its peak.",
      },
    ],
    emailStrategy:
      "Launch alert → Mid-window urgency → Final hours countdown — that is it",
    proTip:
      "Spencer Mecham (Builderall's #1 affiliate) uses flash-deal funnels during launch windows — generates $50k+ in 72 hours.",
    proName: "Spencer Mecham",
    proEarnings: "$50k+ in 72 hours",
    generates: [
      "Scarcity hook headline",
      "Countdown timer page",
      "Bonus incentive stack",
      "Urgency-driven CTA",
      "3-email rapid-fire sequence",
    ],
    stats: [
      { label: "Avg. CVR", value: "22-38%" },
      { label: "Pages", value: "3" },
      { label: "Emails", value: "3" },
      { label: "Best Window", value: "72 hrs" },
    ],
  },
];

// ─── Recommendation helpers ───────────────────────────────────────────────────

function detectNicheFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.match(/health|supplement|peptide|vitamin|fitness|weight|diet|wellness|muscle|protein/)) return "health";
  if (t.match(/invest|stock|trade|crypto|forex|wealth|gold|finance|money|retire/)) return "finance";
  if (t.match(/software|saas|app|platform|tool|crm|tech|ai|automation|code/)) return "tech";
  if (t.match(/course|coaching|training|masterclass|program|academy|learn|mentor/)) return "education";
  if (t.match(/marketing|affiliate|funnel|leads|sales|business|agency/)) return "business";
  return "generic";
}

function extractPrice(priceStr?: string): number | null {
  if (!priceStr) return null;
  const match = priceStr.replace(/[^0-9.]/g, "");
  const num = parseFloat(match);
  return isNaN(num) ? null : num;
}

const NICHE_TO_FUNNELS: Record<string, string[]> = {
  health: ["review_bonus", "bridge", "vsl"],
  finance: ["vsl", "webinar", "flash"],
  tech: ["review_bonus", "bridge", "vsl"],
  education: ["webinar", "bridge", "review_bonus"],
  business: ["bridge", "vsl", "webinar"],
  generic: ["bridge", "review_bonus", "vsl"],
};

// ─── Helper to strip emojis ──────────────────────────────────────────────────
function stripEmojis(text: string): string {
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
}

// ─── Helper to parse email sequence ─────────────────────────────────────────
interface EmailItem {
  subject: string;
  body: string;
}

function parseEmailSequence(article: string): EmailItem[] | null {
  const emailRegex = /---\s*EMAIL\s*(\d+)\s*---\s*Subject:\s*(.+?)\n([\s\S]*?)(?=---\s*EMAIL\s*\d+\s*---|$)/gi;
  const emails: EmailItem[] = [];
  let match;
  while ((match = emailRegex.exec(article)) !== null) {
    emails.push({
      subject: stripEmojis(match[2].trim()),
      body: stripEmojis(match[3].trim()),
    });
  }
  return emails.length ? emails : null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateCampaign() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [copiedArticle, setCopiedArticle] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<number | null>(null);
  const [expandedFunnel, setExpandedFunnel] = useState<string>("bridge");
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  const [campaignData, setCampaignData] = useState<CampaignData>({
    link: "",
    keyword: "",
    tone: "Storyteller (Russell Brunson)",
    wordCount: "1,500 words",
    contentType: "Product Review",
    funnelType: "bridge",
    generatedContent: null,
  });
  const [funnelResult, setFunnelResult] = useState<FunnelBuilderData | null>(null);

  const steps = [
    { id: 1, title: "Analyze Link", icon: Link2 },
    { id: 2, title: "Generate Content", icon: FileText },
    { id: 3, title: "Build Funnel", icon: GitBranch },
    { id: 4, title: "Launch", icon: Rocket },
  ];

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleAnalyze = async () => {
    if (!campaignData.link) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: campaignData.link }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const productInfo = (await res.json()) as ProductInfo;
      setCampaignData((prev) => ({
        ...prev,
        productInfo,
        keyword: productInfo.title || prev.keyword,
      }));
      handleNext();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    setLoading(true);
    setError(null);
    setCampaignData((prev) => ({ ...prev, generatedContent: null }));
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: campaignData.keyword,
          tone: campaignData.tone,
          wordCount: campaignData.wordCount,
          contentType: campaignData.contentType,
          productInfo: campaignData.productInfo,
        }),
      });
      if (!res.ok) throw new Error("We are currently experiencing high demand. Please try again later");
      const content = (await res.json()) as GeneratedContent;
      setCampaignData((prev) => ({ ...prev, generatedContent: content }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFunnel = async () => {
    if (!campaignData.generatedContent) return;
    setLoading(true);
    setError(null);
    try {
      sessionStorage.setItem("campaignDataBackup", JSON.stringify(campaignData));
      const res = await fetch("/api/generate-funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          funnelType: campaignData.funnelType,
          generatedContent: campaignData.generatedContent,
          originalLink: campaignData.link,
          productInfo: campaignData.productInfo,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "We are currently experiencing high demand. Please try again later");
      }
      const funnelData = (await res.json()) as FunnelApiResponse;
      const hasPages = Array.isArray(funnelData.pages) && funnelData.pages.length > 0;
      const hasSteps = Array.isArray(funnelData.steps) && funnelData.steps.length > 0;
      if (!hasPages && !hasSteps) throw new Error("Funnel generation returned empty data. Please try again.");
      const stored: FunnelBuilderData = { ...funnelData, funnelType: campaignData.funnelType };
      sessionStorage.setItem("funnelBuilderData", JSON.stringify(stored));
      router.push("/funnelsbuilder");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLaunch = async () => {
    if (!campaignData.link || !campaignData.keyword) {
      setError("Campaign data is incomplete. Please go back and complete steps 1-2.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...campaignData,
        funnelSteps: funnelResult?.steps,
        funnelEmails: funnelResult?.emails,
        funnelVideo: funnelResult?.video,
      };
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Launch failed");
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("funnelBuilderResult");
    const backup = sessionStorage.getItem("campaignDataBackup");
    if (saved) {
      try {
        const result = JSON.parse(saved) as FunnelBuilderData;
        setFunnelResult(result);
        if (result.funnelType) setCampaignData((prev) => ({ ...prev, funnelType: result.funnelType }));
        if (backup) {
          const restored = JSON.parse(backup);
          setCampaignData((prev) => ({ ...prev, ...restored }));
          sessionStorage.removeItem("campaignDataBackup");
        }
        setCurrentStep(4);
        sessionStorage.removeItem("funnelBuilderResult");
      } catch (e) {
        console.error("Failed to parse funnel builder result", e);
      }
    }
  }, []);

  const handleFunnelSelect = (id: string) => {
    setCampaignData((prev) => ({ ...prev, funnelType: id }));
    setExpandedFunnel(id);
  };

  const handleFunnelToggle = (id: string) => {
    setExpandedFunnel((prev) => (prev === id ? "" : id));
  };

  const recommendedFunnelIds = useMemo(() => {
    if (!campaignData.productInfo?.title) return [];
    const niche = detectNicheFromTitle(campaignData.productInfo.title);
    let recommended = NICHE_TO_FUNNELS[niche] || NICHE_TO_FUNNELS.generic;
    const priceNum = extractPrice(campaignData.productInfo.price);
    if (priceNum && priceNum > 500 && !recommended.includes("webinar")) {
      recommended = [...recommended, "webinar"];
    }
    return recommended;
  }, [campaignData.productInfo]);

  // ─── Premium Generated Content Panel ───────────────────────────────────────
  function GeneratedContentPanel({ content }: { content: GeneratedContent }) {
    const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'social'>('content');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    
    const handleCopy = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    };

    // Strip emojis from all content
    const cleanContent = {
      titles: content.titles.map(stripEmojis),
      metaDescription: stripEmojis(content.metaDescription),
      article: stripEmojis(content.article),
      socialSnippets: content.socialSnippets.map(s => ({
        ...s,
        content: stripEmojis(s.content),
      })),
    };

    const emails = parseEmailSequence(cleanContent.article);

    return (
      <div className="mt-8 space-y-6">
        {/* Tab Bar */}
        <div className="flex border-b border-[#006E74]/10">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === 'content'
                ? 'text-[#F35D2C] border-b-2 border-[#F35D2C]'
                : 'text-[#6B5E5E]/60 hover:text-[#6B5E5E]'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === 'seo'
                ? 'text-[#F35D2C] border-b-2 border-[#F35D2C]'
                : 'text-[#6B5E5E]/60 hover:text-[#6B5E5E]'
            }`}
          >
            SEO
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === 'social'
                ? 'text-[#F35D2C] border-b-2 border-[#F35D2C]'
                : 'text-[#6B5E5E]/60 hover:text-[#6B5E5E]'
            }`}
          >
            Social
          </button>
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div>
            {emails ? (
              // Email Sequence View
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#006E74] uppercase tracking-wide">
                    Email Sequence ({emails.length} emails)
                  </h4>
                  <button
                    onClick={() => handleCopy(cleanContent.article, 'all-emails')}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#6B5E5E]/60 hover:text-[#F35D2C] transition-colors"
                  >
                    {copiedId === 'all-emails' ? <Check size={12} /> : <Copy size={12} />}
                    Copy All
                  </button>
                </div>
                {emails.map((email, idx) => (
                  <div key={idx} className="border border-[#006E74]/10 rounded-xl overflow-hidden bg-white">
                    <div className="flex items-center justify-between p-4 bg-[#006E74]/5 border-b border-[#006E74]/10">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#F35D2C]/10 text-[#F35D2C] flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-medium text-[#006E74] uppercase tracking-wider">
                          Email {idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-[#6B5E5E]">{email.subject}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(`Subject: ${email.subject}\n\n${email.body}`, `email-${idx}`)}
                        className="text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-colors"
                      >
                        {copiedId === `email-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="prose prose-sm max-w-none text-[#6B5E5E] whitespace-pre-wrap">
                        {email.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Regular Content (Article, Script, etc.)
              <div className="border border-[#006E74]/10 rounded-xl overflow-hidden bg-white">
                <div className="flex items-center justify-between p-4 border-b border-[#006E74]/10 bg-[#006E74]/5">
                  <span className="text-xs font-medium text-[#006E74] uppercase tracking-wide">
                    {campaignData.contentType}
                  </span>
                  <button
                    onClick={() => handleCopy(cleanContent.article, 'article')}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#6B5E5E]/60 hover:text-[#F35D2C] transition-colors"
                  >
                    {copiedId === 'article' ? <Check size={12} /> : <Copy size={12} />}
                    Copy All
                  </button>
                </div>
                <div className="p-5 max-h-[500px] overflow-y-auto">
                  <div className="prose prose-sm max-w-none text-[#6B5E5E] whitespace-pre-wrap">
                    {cleanContent.article}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="border border-[#006E74]/10 rounded-xl overflow-hidden bg-white">
              <div className="p-4 border-b border-[#006E74]/10 bg-[#006E74]/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#006E74] uppercase tracking-wide">Title Variations</span>
                  <button
                    onClick={() => handleCopy(cleanContent.titles.join('\n'), 'titles')}
                    className="text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-colors"
                  >
                    {copiedId === 'titles' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div className="divide-y divide-[#006E74]/10">
                {cleanContent.titles.map((title, idx) => (
                  <div key={idx} className="p-4 flex items-start gap-3 hover:bg-[#F35D2C]/5 transition-colors">
                    <span className="text-xs font-mono font-bold text-[#F35D2C]/60 mt-0.5 w-5 shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="text-sm text-[#6B5E5E] flex-1 leading-relaxed">{title}</span>
                    <button
                      onClick={() => handleCopy(title, `title-${idx}`)}
                      className="text-[#6B5E5E]/30 hover:text-[#F35D2C] transition-colors shrink-0"
                    >
                      {copiedId === `title-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#006E74]/10 rounded-xl overflow-hidden bg-white">
              <div className="p-4 border-b border-[#006E74]/10 bg-[#006E74]/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#006E74] uppercase tracking-wide">Meta Description</span>
                  <button
                    onClick={() => handleCopy(cleanContent.metaDescription, 'meta')}
                    className="text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-colors"
                  >
                    {copiedId === 'meta' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-[#6B5E5E] leading-relaxed">{cleanContent.metaDescription}</p>
                <p className="text-xs text-[#6B5E5E]/40 mt-2">{cleanContent.metaDescription.length} / 160 characters</p>
              </div>
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            {cleanContent.socialSnippets.map((snippet, idx) => (
              <div key={idx} className="border border-[#006E74]/10 rounded-xl overflow-hidden bg-white">
                <div className="p-4 border-b border-[#006E74]/10 bg-[#006E74]/5">
                  <div className="flex items-center justify-between">
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
                      onClick={() => handleCopy(snippet.content, `snippet-${idx}`)}
                      className="text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-colors"
                    >
                      {copiedId === `snippet-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-[#6B5E5E] leading-relaxed whitespace-pre-wrap">{snippet.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regenerate Button */}
        <div className="pt-4 border-t border-[#006E74]/10">
          <button
            onClick={() => setCampaignData((prev) => ({ ...prev, generatedContent: null }))}
            className="w-full py-3.5 rounded-xl border-2 border-[#006E74]/20 text-[#6B5E5E] text-sm font-semibold hover:bg-[#006E74]/5 hover:border-[#006E74]/30 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} className="text-[#006E74]/60" />
            Regenerate Content
          </button>
        </div>
      </div>
    );
  }

  const selectedFunnel = FUNNELS.find((f) => f.id === campaignData.funnelType) ?? FUNNELS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8 bg-white min-h-screen pb-24 md:pb-8">

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#6B5E5E] mb-2">Create New Campaign</h1>
        <p className="text-sm md:text-base text-[#6B5E5E]/70">Paste your affiliate link to get started with AI-powered content generation</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">{error}</div>
      )}

      <div className="flex items-center justify-between bg-white border border-[#006E74]/10 p-3 md:p-4 rounded-2xl overflow-x-auto">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-1 md:gap-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${isActive ? "bg-[#F35D2C] text-white" : isCompleted ? "bg-[#006E74] text-white" : "bg-[#006E74]/10 text-[#6B5E5E]/40"}`}>
                  {isCompleted ? <Check size={16} /> : <step.icon size={16} />}
                </div>
                <span className={`font-semibold text-xs md:text-sm hidden sm:block ${isActive ? "text-[#F35D2C]" : isCompleted ? "text-[#006E74]" : "text-[#6B5E5E]/40"}`}>{step.title}</span>
              </div>
              {index < steps.length - 1 && <ChevronRight size={16} className="text-[#006E74]/20 mx-1 md:mx-2 shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>

      <div className="bg-white border border-[#006E74]/10 rounded-2xl md:rounded-3xl p-4 md:p-8">

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F35D2C]/10 flex items-center justify-center text-[#F35D2C] shrink-0"><Link2 size={24} /></div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#6B5E5E]">Paste Your Affiliate Link</h3>
                <p className="text-sm text-[#6B5E5E]/70 mb-6">We support Amazon, ClickBank, ShareASale, and 20+ networks</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      value={campaignData.link}
                      onChange={(e) => setCampaignData((prev) => ({ ...prev, link: e.target.value }))}
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
                {campaignData.productInfo && (
                  <div className="mt-6 p-4 bg-[#006E74]/5 rounded-xl border border-[#006E74]/10">
                    <h4 className="font-bold text-[#6B5E5E] mb-2">Extracted Product Info</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Title:</span> {campaignData.productInfo.title}</p>
                      {campaignData.productInfo.price && <p><span className="font-semibold">Price:</span> {campaignData.productInfo.price} {campaignData.productInfo.currency}</p>}
                      {campaignData.productInfo.rating && <p><span className="font-semibold">Rating:</span> {campaignData.productInfo.rating} ({campaignData.productInfo.reviewCount} reviews)</p>}
                      {campaignData.productInfo.imageUrls && campaignData.productInfo.imageUrls.length > 0 && <p><span className="font-semibold">Images found:</span> {campaignData.productInfo.imageUrls.length}</p>}
                      {campaignData.productInfo.features && campaignData.productInfo.features.length > 0 && (
                        <div>
                          <span className="font-semibold">Features:</span>
                          <ul className="list-disc list-inside mt-1">
                            {campaignData.productInfo.features.slice(0, 5).map((f, i) => <li key={i} className="text-[#6B5E5E]/80">{f}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-4 mt-6 text-xs font-semibold text-[#6B5E5E]/50 uppercase tracking-wider">
                  <span>Amazon</span><span>ClickBank</span><span>ShareASale</span><span>CJ</span><span>Rakuten</span><span className="text-[#6B5E5E]/30">+15 more</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F35D2C] to-[#F35D2C]/80 flex items-center justify-center text-white shadow-lg shadow-[#F35D2C]/20"><Sparkles size={20} /></div>
              <div>
                <h3 className="text-lg font-bold text-[#6B5E5E] leading-tight">Content Configuration</h3>
                <p className="text-sm text-[#6B5E5E]/70">Customize your AI-generated content</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#6B5E5E] flex items-center gap-1.5"><Target size={14} className="text-[#F35D2C]" />Primary Keyword</label>
                <input type="text" value={campaignData.keyword} onChange={(e) => setCampaignData((prev) => ({ ...prev, keyword: e.target.value }))} className="w-full p-3 rounded-xl border border-[#006E74]/20 text-sm text-[#6B5E5E] focus:border-[#F35D2C] focus:ring-2 focus:ring-[#F35D2C]/20 outline-none transition-all" placeholder="e.g., best weight loss supplement" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#6B5E5E] flex items-center gap-1.5"><MessageSquare size={14} className="text-[#F35D2C]" />Tone of Voice</label>
                <select
                  value={campaignData.tone}
                  onChange={(e) => setCampaignData((prev) => ({ ...prev, tone: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-[#006E74]/20 text-sm text-[#6B5E5E] bg-white outline-none focus:border-[#F35D2C] focus:ring-2 focus:ring-[#F35D2C]/20 transition-all"
                >
                  <option>Storyteller (Russell Brunson)</option>
                  <option>Direct Response (Gary Halbert)</option>
                  <option>Sales Letter (John Carlton)</option>
                  <option>Authority (Dan Kennedy)</option>
                  <option>Conversational (Neville Medhora)</option>
                  <option>Benefit‑Driven (Claude Hopkins)</option>
                  <option>Urgency (Gary Halbert)</option>
                  <option>Educational (Pat Flynn)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#6B5E5E] flex items-center gap-1.5"><FileText size={14} className="text-[#F35D2C]" />Word Count</label>
                <select
                  value={campaignData.wordCount}
                  onChange={(e) => setCampaignData((prev) => ({ ...prev, wordCount: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-[#006E74]/20 text-sm text-[#6B5E5E] bg-white outline-none focus:border-[#F35D2C] focus:ring-2 focus:ring-[#F35D2C]/20 transition-all"
                >
                  <option>800 words</option>
                  <option>1,200 words</option>
                  <option>1,500 words</option>
                  <option>2,000 words</option>
                  <option>2,500 words</option>
                  <option>3,000 words</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#6B5E5E] flex items-center gap-1.5"><Layers size={14} className="text-[#F35D2C]" />Content Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "Product Review", icon: BookOpen },
                    { id: "Comparison", icon: Scale },
                    { id: "How‑To Guide", icon: FileSearch },
                    { id: "Listicle", icon: List },
                    { id: "VSL Script", icon: Video },
                    { id: "Email Sequence", icon: Mail },
                    { id: "Sales Letter", icon: FileText },
                    { id: "Bridge Page Script", icon: Video },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setCampaignData((prev) => ({ ...prev, contentType: type.id }))}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        campaignData.contentType === type.id
                          ? "bg-gradient-to-r from-[#F35D2C] to-[#F35D2C]/90 text-white border-[#F35D2C] shadow-md shadow-[#F35D2C]/20"
                          : "bg-white text-[#6B5E5E]/70 border-[#006E74]/20 hover:border-[#F35D2C]/30 hover:bg-[#F35D2C]/5"
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
            {campaignData.generatedContent && <GeneratedContentPanel content={campaignData.generatedContent} />}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#006E74]/10 flex items-center justify-center text-[#006E74]"><Layers size={20} /></div>
              <div>
                <h3 className="text-lg font-bold text-[#6B5E5E] leading-tight">Choose Your Funnel Strategy</h3>
                <p className="text-sm text-[#6B5E5E]/60">Battle-tested systems used by the world&apos;s top affiliate earners. Every page explained.</p>
                {campaignData.productInfo && (
                  <p className="text-xs text-[#006E74] mt-1 font-medium flex items-center gap-1">
                    <Award size={11} /> Recommended funnels based on your product are highlighted
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {FUNNELS.map((funnel) => {
                const isSelected = campaignData.funnelType === funnel.id;
                const isOpen = expandedFunnel === funnel.id;
                const isRecommended = recommendedFunnelIds.includes(funnel.id);

                return (
                  <div
                    key={funnel.id}
                    className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${isSelected ? "border-[#F35D2C] bg-[#F35D2C]/3 shadow-md shadow-[#F35D2C]/10" : isRecommended ? "border-green-300 bg-green-50/30" : "border-[#006E74]/10 hover:border-[#006E74]/25 bg-white"}`}
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => handleFunnelSelect(funnel.id)}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-[#F35D2C] bg-[#F35D2C]" : "border-[#006E74]/20"}`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="font-bold text-[#1a1a1a] text-sm md:text-base">{funnel.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${funnel.badgeColor}`}>{funnel.badge}</span>
                          {isRecommended && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-300 flex items-center gap-1">
                              <Award size={10} /> Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6B5E5E]/50 italic mb-1">{funnel.tagline}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B5E5E]/50 font-medium">
                          <span className="flex items-center gap-1"><TrendingUp size={10} className="text-[#006E74]" />{funnel.conversionRate} CVR</span>
                          <span className="flex items-center gap-1"><FileText size={10} className="text-[#006E74]" />{funnel.pageCount} pages</span>
                          <span className="flex items-center gap-1"><Mail size={10} className="text-[#006E74]" />{funnel.emailCount} emails</span>
                          <span className="flex items-center gap-1"><DollarSign size={10} className="text-[#F35D2C]" />{funnel.commissionType}</span>
                        </div>
                      </div>
                      <div onClick={(e) => { e.stopPropagation(); handleFunnelToggle(funnel.id); }}>
                        <ChevronRight size={16} className={`text-[#6B5E5E]/30 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                      </div>
                    </div>

                    {/* Expanded detail */}
                    <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? "2400px" : "0" }}>
                      <div className="px-4 pb-5 space-y-4 border-t border-[#006E74]/8 pt-4">

                        <p className="text-sm text-[#6B5E5E]/80 leading-relaxed">{funnel.description}</p>

                        {/* How it works */}
                        <div className="bg-[#006E74]/5 rounded-xl p-3.5">
                          <p className="text-[10px] font-bold text-[#006E74] uppercase tracking-widest mb-1.5">How It Works</p>
                          <p className="text-xs text-[#6B5E5E]/75 leading-relaxed">{funnel.mechanic}</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-2">
                          {funnel.stats.map((s, i) => (
                            <div key={i} className="bg-white border border-[#006E74]/10 rounded-xl p-2.5 text-center">
                              <p className="text-sm font-bold text-[#1a1a1a]">{s.value}</p>
                              <p className="text-[10px] text-[#6B5E5E]/50 font-semibold mt-0.5">{s.label}</p>
                            </div>
                          ))}
                        </div>

                        {/* Page-by-page breakdown */}
                        <div>
                          <p className="text-[10px] font-bold text-[#006E74]/60 uppercase tracking-widest mb-3">
                            Page-by-Page Breakdown — {funnel.pageCount} Pages
                          </p>
                          <div className="space-y-2">
                            {funnel.pages.map((page, i) => {
                              const PageIcon = page.icon;
                              const pageKey = `${funnel.id}-${page.id}`;
                              const isPageOpen = expandedPage === pageKey;
                              return (
                                <div key={page.id}>
                                  {i > 0 && (
                                    <div className="flex ml-4 mb-2">
                                      <div className="flex flex-col items-center">
                                        <div className="w-px h-2 bg-[#006E74]/15" />
                                        <ArrowRight size={10} className="text-[#006E74]/25 rotate-90" />
                                      </div>
                                    </div>
                                  )}
                                  <div className={`rounded-xl border overflow-hidden ${page.highlight ? "border-[#F35D2C]/35 bg-[#F35D2C]/3" : "border-[#006E74]/10"}`}>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setExpandedPage(isPageOpen ? null : pageKey); }}
                                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left"
                                    >
                                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${page.color}18` }}>
                                        <PageIcon size={13} style={{ color: page.color }} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[9px] font-bold text-[#6B5E5E]/30 uppercase tracking-wider">Step {i + 1}</span>
                                          {page.highlight && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#F35D2C]/15 text-[#F35D2C] rounded-full uppercase">Key Page</span>}
                                        </div>
                                        <p className="font-bold text-[#1a1a1a] text-sm leading-tight">{page.label}</p>
                                      </div>
                                      {isPageOpen ? <ChevronUp size={12} className="text-[#6B5E5E]/30 shrink-0" /> : <ChevronDown size={12} className="text-[#6B5E5E]/30 shrink-0" />}
                                    </button>
                                    {isPageOpen && (
                                      <div className="px-3.5 pb-3.5 border-t border-[#006E74]/8 pt-3 space-y-2.5">
                                        <p className="text-xs text-[#6B5E5E]/70 leading-relaxed">{page.description}</p>
                                        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200/60 rounded-lg p-2.5">
                                          <Target size={11} className="text-amber-500 shrink-0 mt-0.5" />
                                          <p className="text-xs text-amber-800 leading-relaxed"><span className="font-bold">One Goal: </span>{page.goal}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Visual flow */}
                        <div>
                          <p className="text-[10px] font-bold text-[#006E74]/60 uppercase tracking-widest mb-2.5">Funnel Flow</p>
                          <div className="flex items-center flex-wrap gap-1.5">
                            {funnel.pages.map((p, i) => {
                              const FIcon = p.icon;
                              return (
                                <React.Fragment key={i}>
                                  <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold ${p.highlight ? "bg-[#F35D2C] text-white shadow-sm shadow-[#F35D2C]/30" : "bg-[#006E74]/8 text-[#6B5E5E]/70"}`}>
                                    <FIcon size={12} /><span>{p.label}</span>
                                  </div>
                                  {i < funnel.pages.length - 1 && <ArrowRight size={12} className="text-[#6B5E5E]/25 shrink-0" />}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>

                        {/* Email strategy */}
                        <div className="bg-[#006E74]/5 rounded-xl p-3.5">
                          <p className="text-[10px] font-bold text-[#006E74] uppercase tracking-widest mb-1.5">{funnel.emailCount}-Email Follow-Up Sequence</p>
                          <p className="text-xs text-[#6B5E5E]/70 font-medium">{funnel.emailStrategy}</p>
                        </div>

                        {/* Best for + tier */}
                        <div className="flex flex-wrap gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-[#006E74]/60 uppercase tracking-widest mb-1.5">Best For</p>
                            <div className="flex flex-wrap gap-1.5">
                              {funnel.bestFor.map((t) => <span key={t} className="text-[11px] font-semibold px-2.5 py-1 bg-[#006E74]/8 text-[#006E74] rounded-lg">{t}</span>)}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-[#006E74]/60 uppercase tracking-widest mb-1.5">Skill Level</p>
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${funnel.tierColor}`}>{funnel.tier}</span>
                          </div>
                        </div>

                        {/* AI generates */}
                        <div className="bg-[#006E74]/4 border border-[#006E74]/10 rounded-xl p-3.5">
                          <p className="text-[10px] font-bold text-[#006E74] uppercase tracking-widest mb-2">AI Generates For You</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                            {funnel.generates.map((item) => (
                              <span key={item} className="flex items-center gap-1.5 text-xs text-[#6B5E5E]/70 font-medium">
                                <Check size={10} className="text-[#006E74] shrink-0" />{item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Pro tip */}
                        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200/60 rounded-xl p-3.5">
                          <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 text-amber-700 font-black text-xs flex-shrink-0">
                            {funnel.proName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-xs font-bold text-amber-900">{funnel.proName}</p>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-200/50 text-amber-800 rounded-full">{funnel.proEarnings}</span>
                            </div>
                            <p className="text-xs text-amber-800 font-medium leading-relaxed"><span className="font-bold">Pro Insight: </span>{funnel.proTip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#006E74]/5 border border-[#006E74]/15 rounded-2xl p-4">
              <div className="flex-1">
                <p className="text-xs font-bold text-[#006E74] uppercase tracking-wide mb-0.5">Selected Strategy</p>
                <p className="text-sm font-bold text-[#1a1a1a]">{selectedFunnel.name}</p>
                <p className="text-xs text-[#6B5E5E]/50 mt-0.5">{selectedFunnel.pageCount} landing pages · {selectedFunnel.emailCount} email automations · {selectedFunnel.conversionRate} avg. conversion</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFunnel.bestFor.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-white border border-[#006E74]/15 text-[#006E74] rounded-lg">{tag}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 pt-2">
              <button
                onClick={handleGenerateFunnel}
                disabled={loading || !campaignData.generatedContent}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F35D2C] hover:bg-[#e04e1f] active:scale-[0.98] text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 shadow-lg shadow-[#F35D2C]/20"
              >
                {loading ? (<><Loader2 size={18} className="animate-spin" /> Building your funnel…</>) : (<><Sparkles size={18} /> Generate {selectedFunnel.name}</>)}
              </button>
              {loading && (
                <p className="text-center text-sm text-[#006E74] animate-pulse font-medium">
                  Crafting {selectedFunnel.pageCount} conversion pages + {selectedFunnel.emailCount} email automations — 15–30 secs…
                </p>
              )}
              {!campaignData.generatedContent && (
                <p className="text-center text-xs text-[#6B5E5E]/40 font-medium">← Complete Step 2 to generate content before building your funnel</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#006E74]/10 rounded-full flex items-center justify-center text-[#006E74] mb-2"><Rocket size={32} strokeWidth={1.5} /></div>
            <h2 className="text-xl md:text-2xl font-bold text-[#6B5E5E]">Ready to Launch!</h2>
            <p className="text-sm md:text-base text-[#6B5E5E]/70 max-w-md px-4">Your funnel is built and ready. Click below to deploy.</p>
            {funnelResult && (
              <div className="space-y-2 text-xs md:text-sm text-[#6B5E5E]/70 font-medium py-4">
                <div className="flex items-center gap-2 justify-center"><Check size={16} className="text-[#006E74]" />Funnel type: {FUNNELS.find((f) => f.id === campaignData.funnelType)?.name ?? campaignData.funnelType}</div>
                <div className="flex items-center gap-2 justify-center"><Check size={16} className="text-[#006E74]" />{funnelResult.pages?.length ?? 0} pages built · {funnelResult.emails?.length ?? 0} follow-up emails</div>
                {funnelResult.video && <div className="flex items-center gap-2 justify-center"><Check size={16} className="text-[#006E74]" />Video suggestion: {funnelResult.video.title}</div>}
              </div>
            )}
            <button onClick={handleLaunch} disabled={loading || !funnelResult} className="px-6 md:px-8 py-3 md:py-4 rounded-xl bg-[#F35D2C] hover:bg-[#e04e1f] text-white font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Rocket size={18} />}
              Launch Campaign
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4">
        <button onClick={handlePrev} disabled={currentStep === 1 || loading} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold border transition-colors ${currentStep === 1 || loading ? "border-[#006E74]/10 text-[#6B5E5E]/30 cursor-not-allowed" : "border-[#006E74]/20 text-[#6B5E5E]/70 hover:bg-[#006E74]/5"}`}>
          Previous
        </button>
        {currentStep < 4 && currentStep !== 3 && (
          <button onClick={handleNext} disabled={loading} className="px-4 md:px-6 py-2 md:py-2.5 rounded-xl bg-[#F35D2C] hover:bg-[#e04e1f] text-white text-xs md:text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50">
            Continue<ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}