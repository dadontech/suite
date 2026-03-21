"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Lock,
  TrendingUp,
  ArrowRight,
  Layers,
  Zap,
  Target,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 1. NINE FUNNEL TEMPLATES WITH RELIABLE UNSPLASH IMAGES
const funnelTemplates = [
  {
    id: 1,
    name: "Lead Magnet Funnel",
    description: "Capture emails with a free guide, then upsell to your affiliate product.",
    category: "Lead Magnet",
    conversionRate: 12.5,
    steps: 3,
    usedBy: "3.2k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format", // email capture
    accent: "#F35D2C",
  },
  {
    id: 2,
    name: "Webinar Registration",
    description: "Promote a free webinar, build trust, and pitch your offer at the end.",
    category: "Webinar",
    conversionRate: 18.2,
    steps: 4,
    usedBy: "1.7k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=800&auto=format", // webinar
    accent: "#006E74",
  },
  {
    id: 3,
    name: "Survey Funnel",
    description: "Engage visitors with a quiz, then recommend the perfect product.",
    category: "Survey",
    conversionRate: 24.3,
    steps: 5,
    usedBy: "1.4k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format", // survey / quiz
    accent: "#F35D2C",
  },
  {
    id: 4,
    name: "Sales Letter",
    description: "Classic long‑form sales page with emotional triggers and a strong CTA.",
    category: "Sales Letter",
    conversionRate: 8.4,
    steps: 1,
    usedBy: "5.1k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format", // sales letter
    accent: "#006E74",
  },
  {
    id: 5,
    name: "Bridge Page",
    description: "A simple page that warms up clicks before sending to the merchant.",
    category: "Bridge",
    conversionRate: 22.1,
    steps: 1,
    usedBy: "2.0k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format", // bridge / click
    accent: "#F35D2C",
  },
  {
    id: 6,
    name: "Product Launch",
    description: "Generate hype with pre‑launch, launch, and scarcity sequences.",
    category: "Launch",
    conversionRate: 15.7,
    steps: 4,
    usedBy: "2.3k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format", // launch
    accent: "#006E74",
  },
  {
    id: 7,
    name: "VSL Funnel",
    description: "Video sales letter with text follow‑up and multiple order bumps.",
    category: "VSL",
    conversionRate: 19.8,
    steps: 3,
    usedBy: "2.8k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=800&auto=format", // video
    accent: "#F35D2C",
  },
  {
    id: 8,
    name: "Free + Shipping",
    description: "Offer a free product (just pay shipping) and upsell on thank you page.",
    category: "Free+Shipping",
    conversionRate: 31.2,
    steps: 3,
    usedBy: "4.0k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1607083206865-6e852c3d22e2?w=800&auto=format", // shipping
    accent: "#006E74",
  },
  {
    id: 9,
    name: "Webinar + Tripwire",
    description: "Webinar followed by a low‑cost tripwire offer immediately after.",
    category: "Webinar",
    conversionRate: 26.4,
    steps: 5,
    usedBy: "1.9k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=800&auto=format", // webinar 2
    accent: "#F35D2C",
  },
];

const categories = ["All", "Lead Magnet", "Webinar", "Sales Letter", "Bridge", "Survey", "Launch", "VSL", "Free+Shipping"];

const faqItems = [
  {
    question: "Do I need external hosting for these funnels?",
    answer: "No, all funnels are hosted on our platform. You get a dedicated subdomain or can use your own custom domain.",
  },
  {
    question: "Can I export these blueprints to my own CRM?",
    answer: "Yes, you can export leads and customer data via CSV or integrate with popular CRMs like HubSpot, Mailchimp, or ActiveCampaign.",
  },
  {
    question: "Are the high-ticket VSL templates included in the free plan?",
    answer: "VSL templates are available on the Pro plan and above. You can try them free for 14 days.",
  },
  {
    question: "How do I customize a funnel template?",
    answer: "After deployment, you can use our drag‑and‑drop editor to change colors, text, images, and even add new steps.",
  },
  {
    question: "What's the average conversion lift using these templates?",
    answer: "Our users typically see a 20‑40% increase in conversions compared to generic pages.",
  },
  {
    question: "Can I A/B test different funnel versions?",
    answer: "Yes, Pro and Business plans include built‑in A/B testing to optimise your funnel performance.",
  },
];

export default function ModernFunnelPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Total number of items (single copy)
  const totalItems = funnelTemplates.length;

  // Next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  // Previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Auto‑scroll logic
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000); // move every 3 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Manual navigation pauses auto‑scroll
  const handlePrevClick = () => {
    setIsPaused(true);
    prevSlide();
  };
  const handleNextClick = () => {
    setIsPaused(true);
    nextSlide();
  };

  // Get the three visible items (current, next, next+1) but we'll use a carousel with transform
  // We'll use a simple flex with transform based on currentIndex.
  // To make it infinite, we'll duplicate the items and adjust the index.
  // For simplicity, we'll create a list with clones.
  const extendedTemplates = [...funnelTemplates, ...funnelTemplates]; // duplicate for infinite feel

  // Calculate transform
  const slideWidth = 350 + 32; // card width (350) + gap (2rem = 32px)
  const offset = -currentIndex * slideWidth;

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 font-sans overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#F35D2C]/5 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#006E74]/5 blur-[140px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero section */}
        <section className="pt-32 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006E74]/10 border border-[#006E74]/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#F35D2C] mb-8">
              <Zap size={14} className="fill-current" /> High-Performance Blueprints
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] bg-gradient-to-b from-[#6B5E5E] to-[#6B5E5E]/40 bg-clip-text text-transparent">
              CONVERSION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] via-[#FF8D6C] to-[#006E74]">MACHINES.</span>
            </h1>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto mt-12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F35D2C] to-[#006E74] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#FAFAFA] border border-[#006E74]/20 rounded-2xl p-2 flex items-center shadow-2xl">
                <Search size={20} className="ml-4 text-[#6B5E5E]/30" />
                <input
                  type="text"
                  placeholder="Search conversion frameworks..."
                  className="w-full bg-transparent border-none focus:ring-0 text-[#6B5E5E] placeholder-[#6B5E5E]/30 px-4 h-12 font-light"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="hidden md:flex items-center gap-2 pr-4">
                  <span className="px-2 py-1 bg-[#006E74]/10 rounded text-[10px] text-[#6B5E5E]/60 border border-[#006E74]/20">ESC</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CAROUSEL WITH MANUAL CONTROLS */}
        <section className="pb-32">
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Carousel container */}
            <div className="overflow-hidden">
              <div
                className="flex gap-8 transition-transform duration-700 ease-out"
                style={{ transform: `translateX(${offset}px)` }}
              >
                {extendedTemplates.map((template, index) => (
                  <CarouselCard key={`${template.id}-${index}`} template={template} />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white border border-[#006E74]/20 flex items-center justify-center text-[#6B5E5E] hover:bg-[#F35D2C] hover:text-white transition-all shadow-lg z-20"
              aria-label="Previous template"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white border border-[#006E74]/20 flex items-center justify-center text-[#6B5E5E] hover:bg-[#F35D2C] hover:text-white transition-all shadow-lg z-20"
              aria-label="Next template"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {funnelTemplates.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPaused(true);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 bg-[#F35D2C]"
                      : "w-2 bg-[#006E74]/30 hover:bg-[#006E74]/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ENHANCED FAQ ACCORDION */}
        <section className="pb-40 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#6B5E5E] mb-4 italic tracking-tighter">COMMON <span className="text-[#006E74]">QUESTIONS.</span></h2>
            <p className="text-[#6B5E5E]/50 font-light">Everything you need to know about the conversion frameworks.</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="group bg-[#FAFAFA] border border-[#006E74]/10 rounded-3xl transition-all hover:border-[#006E74]/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <h4 className="font-medium text-lg text-[#6B5E5E]/80 group-hover:text-[#6B5E5E]">{item.question}</h4>
                  <div className={`w-8 h-8 rounded-full bg-[#006E74]/10 flex items-center justify-center transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} className="text-[#6B5E5E]/40 group-hover:text-[#006E74]" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-[#6B5E5E]/70 border-t border-[#006E74]/10">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Carousel card component with image fallback
function CarouselCard({ template }: { template: typeof funnelTemplates[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative group bg-[#FAFAFA] border border-[#006E74]/20 rounded-[40px] p-6 hover:border-[#F35D2C]/50 transition-all duration-500 overflow-hidden w-[350px] flex-shrink-0 ${
        template.premium ? 'ring-1 ring-[#F35D2C]/30 shadow-[0_0_40px_rgba(243,93,44,0.1)]' : ''
      }`}
    >
      {/* Visual Preview */}
      <div className="aspect-[1.5] rounded-[28px] bg-[#F3F3F3] mb-8 relative overflow-hidden border border-[#006E74]/10">
        {!imgError ? (
          <img
            src={template.image}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            alt={template.name}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#006E74]/10 to-[#F35D2C]/10">
            <Target size={48} className="text-[#6B5E5E]/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent" />
        {template.premium && (
          <div className="absolute top-4 right-4 bg-[#F35D2C] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter flex items-center gap-1">
            <Lock size={10} /> Pro Blueprint
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6B5E5E]/50">{template.category}</span>
          <div className="h-1 w-1 rounded-full bg-[#6B5E5E]/20" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#006E74]">{template.steps} Steps</span>
        </div>
        <h3 className="text-2xl font-bold text-[#6B5E5E] mb-3 group-hover:text-[#F35D2C] transition-colors">{template.name}</h3>
        <p className="text-[#6B5E5E]/70 text-sm font-light leading-relaxed mb-8 line-clamp-2">
          {template.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-8 py-4 border-y border-[#006E74]/10">
          <div>
            <p className="text-[9px] uppercase text-[#6B5E5E]/50 mb-1">Avg Conv.</p>
            <p className="text-lg font-bold text-[#006E74]">{template.conversionRate}%</p>
          </div>
          <div className="w-[1px] h-8 bg-[#006E74]/10" />
          <div>
            <p className="text-[9px] uppercase text-[#6B5E5E]/50 mb-1">Active Users</p>
            <p className="text-lg font-bold text-[#6B5E5E]">{template.usedBy}</p>
          </div>
        </div>

        {/* Deploy button linking to dashboard */}
        <Link
          href={`/dashboard/funnels/${template.id}`}
          className="flex items-center justify-between w-full p-1 pl-6 bg-[#006E74]/5 rounded-full border border-[#006E74]/20 group/btn hover:bg-[#F35D2C] hover:text-white transition-all duration-500"
        >
          <span className="text-xs font-black uppercase tracking-widest text-[#6B5E5E] group-hover/btn:text-white">
            Deploy Template
          </span>
          <div className="w-10 h-10 rounded-full bg-[#F35D2C] group-hover/btn:bg-white flex items-center justify-center text-white transition-colors">
            <ArrowRight size={18} />
          </div>
        </Link>
      </div>
    </div>
  );
}