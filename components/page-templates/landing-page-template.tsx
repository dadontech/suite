"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Lock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layout,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────
interface LandingTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  conversionRate: number;
  usedBy: string;
  premium: boolean;
  image: string;
}

// ─── Templates ────────────────────────────────────────────────────────────
const landingTemplates: LandingTemplate[] = [
  {
    id: 1,
    name: "CYBER SAAS",
    description: "High-conversion layout with glassmorphism cards.",
    category: "SaaS",
    conversionRate: 14.2,
    usedBy: "2.1k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format",
  },
  {
    id: 2,
    name: "NOVA LAUNCH",
    description: "High-impact page for product drops with countdowns.",
    category: "Launch",
    conversionRate: 19.7,
    usedBy: "1.8k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format",
  },
  {
    id: 3,
    name: "VELOCITY GEN",
    description: "Minimalist lead capture for lightning-fast performance.",
    category: "Lead Gen",
    conversionRate: 22.4,
    usedBy: "3.5k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format",
  },
  {
    id: 4,
    name: "WEBINAR EDGE",
    description: "Promote your webinar with speaker bios and sign‑up.",
    category: "Webinar",
    conversionRate: 16.8,
    usedBy: "1.2k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=800&auto=format",
  },
  {
    id: 5,
    name: "APP SHOWCASE",
    description: "Highlight your app with screenshots and reviews.",
    category: "App",
    conversionRate: 13.5,
    usedBy: "2.7k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format",
  },
  {
    id: 6,
    name: "EBOOK LEAD",
    description: "Offer a free ebook in exchange for email.",
    category: "Lead Gen",
    conversionRate: 28.1,
    usedBy: "4.0k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format",
  },
  {
    id: 7,
    name: "EVENT HUB",
    description: "Promote conferences with speaker lineup.",
    category: "Event",
    conversionRate: 11.9,
    usedBy: "0.9k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format",
  },
  {
    id: 8,
    name: "COMING SOON",
    description: "Build anticipation with email capture.",
    category: "Teaser",
    conversionRate: 9.4,
    usedBy: "1.5k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format",
  },
  {
    id: 9,
    name: "THANK YOU UPSELL",
    description: "Post‑purchase page with cross‑sells.",
    category: "Upsell",
    conversionRate: 32.6,
    usedBy: "2.3k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format",
  },
];

const faqItems = [
  {
    question: "How do custom domains work?",
    answer: "Instantly deploy to our global edge network using your own branded domain.",
  },
  {
    question: "Are these optimized for mobile?",
    answer: "Every blueprint is built with a mobile‑first philosophy for 100/100 Lighthouse scores.",
  },
  {
    question: "Can I edit the templates without coding?",
    answer: "Yes, our drag‑and‑drop editor lets you change everything visually.",
  },
  {
    question: "Is there a free trial?",
    answer: "All paid plans include a 14‑day free trial, no credit card required.",
  },
];

export default function LandingPagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = landingTemplates.length;
  // Duplicate array for infinite loop effect
  const extendedTemplates: LandingTemplate[] = [...landingTemplates, ...landingTemplates, ...landingTemplates];
  const slideWidth = 380 + 32; // card width + gap (2rem = 32px)
  // Center the carousel so that we always have items on both sides
  const baseOffset = -totalItems * slideWidth; // start at first copy
  const offset = baseOffset - currentIndex * slideWidth;

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Auto‑scroll
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handlePrevClick = () => {
    setIsPaused(true);
    prevSlide();
  };
  const handleNextClick = () => {
    setIsPaused(true);
    nextSlide();
  };

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 font-sans overflow-x-hidden">
      {/* Ambient background with our colors */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[40%] h-[40%] rounded-full bg-[#F35D2C]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#006E74]/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero section */}
        <section className="pt-32 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006E74]/10 border border-[#006E74]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#F35D2C] mb-6">
              <Sparkles size={12} /> Premium Blueprints
            </span>
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter mb-4 leading-[0.8] uppercase italic bg-gradient-to-b from-[#6B5E5E] to-[#6B5E5E]/40 bg-clip-text text-transparent">
              LANDING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74]">PAGES.</span>
            </h1>
            <p className="max-w-xl mx-auto text-[#6B5E5E]/60 text-lg font-light tracking-tight mt-8">
              Deploy high-conversion systems in seconds using our world-class visual engine.
            </p>

            {/* Search bar with our colors */}
            <div className="max-w-xl mx-auto mt-12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F35D2C] to-[#006E74] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white border border-[#006E74]/20 rounded-2xl p-2 flex items-center shadow-lg">
                <Search size={20} className="ml-4 text-[#6B5E5E]/30" />
                <input
                  type="text"
                  placeholder="Search frameworks..."
                  className="w-full bg-transparent border-none focus:ring-0 text-[#6B5E5E] placeholder-[#6B5E5E]/30 px-4 h-14 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Carousel with infinite loop and controls */}
        <section className="pb-20">
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: offset }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex gap-8"
              >
                {extendedTemplates.map((template, index) => (
                  <CarouselCard key={`${template.id}-${index}`} template={template} />
                ))}
              </motion.div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white border border-[#006E74]/20 flex items-center justify-center text-[#6B5E5E] hover:bg-[#F35D2C] hover:text-white transition-all shadow-lg z-20"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white border border-[#006E74]/20 flex items-center justify-center text-[#6B5E5E] hover:bg-[#F35D2C] hover:text-white transition-all shadow-lg z-20"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {landingTemplates.map((_, idx) => (
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

        {/* FAQ Accordion with our colors */}
        <section className="pb-40 max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b border-[#006E74]/10 pb-8">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter text-[#6B5E5E]">
              THE <span className="text-[#006E74]">INTEL.</span>
            </h2>
            <p className="text-[#6B5E5E]/30 font-medium">Frequently Asked Questions</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#FAFAFA] border border-[#006E74]/10 rounded-3xl overflow-hidden hover:border-[#006E74]/50 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-8 flex items-center justify-between text-left"
                >
                  <span className="text-xl font-bold uppercase tracking-tight text-[#6B5E5E]">{item.question}</span>
                  <ChevronDown
                    className={`text-[#6B5E5E]/40 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8 text-[#6B5E5E]/70 text-lg leading-relaxed border-t border-[#006E74]/10"
                    >
                      {item.answer}
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

// Card component with proper typing
function CarouselCard({ template }: { template: LandingTemplate }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-[380px] flex-shrink-0 group">
      <div className="relative aspect-[4/5] bg-[#FAFAFA] rounded-[40px] overflow-hidden border border-[#006E74]/20 group-hover:border-[#F35D2C]/50 transition-all duration-500">
        {!imgError ? (
          <img
            src={template.image}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-transform duration-700"
            alt={template.name}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#006E74]/10 to-[#F35D2C]/10">
            <Layout size={48} className="text-[#6B5E5E]/20" />
          </div>
        )}

        {/* Card overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent p-8 flex flex-col justify-end">
          {template.premium && (
            <div className="absolute top-6 right-6 bg-[#F35D2C] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(243,93,44,0.4)]">
              <Lock size={12} className="inline mr-1" /> Premium
            </div>
          )}

          <span className="text-[10px] font-black text-[#006E74] uppercase tracking-[0.2em] mb-2">{template.category}</span>
          <h3 className="text-3xl font-black italic uppercase leading-none mb-4 tracking-tighter text-[#6B5E5E]">
            {template.name}
          </h3>

          <div className="flex gap-4 mb-8">
            <div className="bg-white backdrop-blur-md border border-[#006E74]/20 rounded-2xl px-4 py-2">
              <p className="text-[9px] text-[#6B5E5E]/50 uppercase font-black">Conv.</p>
              <p className="text-lg font-black text-[#F35D2C]">{template.conversionRate}%</p>
            </div>
            <div className="bg-white backdrop-blur-md border border-[#006E74]/20 rounded-2xl px-4 py-2 flex-1">
              <p className="text-[9px] text-[#6B5E5E]/50 uppercase font-black">Users</p>
              <p className="text-lg font-black text-[#6B5E5E]">{template.usedBy}</p>
            </div>
          </div>

          <Link
            href={`/dashboard/landing/${template.id}`}
            className="flex items-center justify-between w-full bg-[#006E74] text-white h-14 rounded-2xl px-6 font-black uppercase text-xs hover:bg-[#F35D2C] transition-colors"
          >
            Deploy Blueprint <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}