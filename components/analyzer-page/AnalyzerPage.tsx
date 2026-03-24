"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Link2,
  Zap,
  Search,
  FileText,
  Image as LucideImage,
  Target,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";

const sampleProducts = [
  {
    productName: "UltraBoost Wireless Earbuds",
    price: "$79.99",
    rating: "4.8",
    description:
      "Premium wireless earbuds with 24hr battery life, noise cancellation, and sweat resistance.",
    keyFeatures: [
      "Active Noise Cancellation",
      "24-hour battery life",
      "IPX7 waterproof",
      "Wireless charging case",
    ],
    images: ["/samples/earbuds-1.jpg", "/samples/earbuds-2.jpg"],
    targetAudience: "Fitness enthusiasts, commuters, remote workers",
  },
  {
    productName: "ProFit Smartwatch",
    price: "$199.99",
    rating: "4.7",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
    keyFeatures: [
      "Heart rate & SpO2 monitoring",
      "Built-in GPS",
      "7-day battery",
      "Water resistant 5ATM",
    ],
    images: ["/samples/watch-1.jpg", "/samples/watch-2.jpg"],
    targetAudience: "Athletes, health enthusiasts, outdoor adventurers",
  },
  {
    productName: "HomeChef Air Fryer",
    price: "$129.99",
    rating: "4.9",
    description:
      "Smart air fryer with 10 presets, rapid heat circulation, and easy‑clean basket.",
    keyFeatures: [
      "10‑quart capacity",
      "Digital touchscreen",
      "Rapid air technology",
      "Recipe app included",
    ],
    images: ["/samples/airfryer-1.jpg", "/samples/airfryer-2.jpg"],
    targetAudience: "Home cooks, health‑conscious families, meal preppers",
  },
  {
    productName: "EcoCharge Solar Bank",
    price: "$49.99",
    rating: "4.6",
    description:
      "Solar‑powered 20000mAh power bank with dual USB ports and rugged design.",
    keyFeatures: [
      "20000mAh capacity",
      "Solar charging",
      "Dual USB output",
      "Built‑in flashlight",
    ],
    images: ["/samples/solar-1.jpg", "/samples/solar-2.jpg"],
    targetAudience: "Campers, travelers, emergency preppers",
  },
  {
    productName: "GlowLight Desk Lamp",
    price: "$39.99",
    rating: "4.5",
    description:
      "LED desk lamp with adjustable color temperature, wireless charger base, and touch controls.",
    keyFeatures: [
      "Wireless charging base",
      "5 color modes",
      "Memory function",
      "Eye‑care flicker‑free",
    ],
    images: ["/samples/lamp-1.jpg", "/samples/lamp-2.jpg"],
    targetAudience: "Remote workers, students, home office users",
  },
  {
    productName: "PureClean Vacuum",
    price: "$249.99",
    rating: "4.8",
    description:
      "Lightweight cordless vacuum with HEPA filter, 45min runtime, and wall‑mount dock.",
    keyFeatures: [
      "HEPA filtration",
      "45‑minute runtime",
      "Wall‑mount charging",
      "2‑in‑1 handheld",
    ],
    images: ["/samples/vacuum-1.jpg", "/samples/vacuum-2.jpg"],
    targetAudience: "Pet owners, allergy sufferers, busy parents",
  },
  {
    productName: "ZenMate Pillow",
    price: "$89.99",
    rating: "4.7",
    description:
      "Cooling memory foam pillow with adjustable loft for optimal neck support.",
    keyFeatures: [
      "Cooling gel layer",
      "Adjustable fill",
      "Hypoallergenic",
      "Machine washable cover",
    ],
    images: ["/samples/pillow-1.jpg", "/samples/pillow-2.jpg"],
    targetAudience: "Side sleepers, back pain sufferers, hot sleepers",
  },
  {
    productName: "BrewMaster Coffee Machine",
    price: "$179.99",
    rating: "4.9",
    description:
      "Programmable coffee maker with built‑in grinder, 12‑cup capacity, and strength control.",
    keyFeatures: [
      "Built‑in conical burr grinder",
      "12‑cup glass carafe",
      "24‑hour programmable",
      "Brew strength selector",
    ],
    images: ["/samples/coffee-1.jpg", "/samples/coffee-2.jpg"],
    targetAudience: "Coffee enthusiasts, office workers, families",
  },
];

export default function LinkAnalyzerPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % sampleProducts.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + sampleProducts.length) % sampleProducts.length);
  }, []);

  // Auto‑play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // change every 5 seconds
    return () => clearInterval(timer);
  }, [nextSlide]);

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  }),
};

  const product = sampleProducts[currentIndex];

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30">
      {/* --- HERO SECTION (unchanged) --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6B5E5E10_1px,transparent_1px),linear-gradient(to_bottom,#6B5E5E10_1px,transparent_1px)] bg-[size:70px_70px] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#F35D2C10_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#006E74]/10 border border-[#006E74]/20 px-4 py-1.5 rounded-full text-[10px] font-bold mb-6 uppercase tracking-[0.3em] text-[#F35D2C]">
              <Zap size={14} className="animate-pulse" />
              Intelligence Engine v2.0
            </span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter bg-gradient-to-b from-[#6B5E5E] to-[#6B5E5E]/40 bg-clip-text text-transparent">
              Link <span className="text-[#F35D2C]">Analyzer</span>
            </h1>
            <p className="text-[#6B5E5E]/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Paste any affiliate link and instantly get detailed insights – product data, audience targeting, and SEO opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- WORKFLOW SECTION (unchanged) --- */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6B5E5E]/10 to-transparent -translate-y-12" />
            {[
              { icon: <Link2 />, title: "Paste Your Link", desc: "Enter any link from Amazon, ClickBank, or Shopify." },
              { icon: <Search />, title: "AI Extraction", desc: "Our AI scrapes features, images, and live pricing." },
              { icon: <BarChart3 />, title: "Get Insights", desc: "Receive audience data and SEO content suggestions." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 group"
              >
                <div className="bg-[#FAFAFA] border border-[#006E74]/20 p-8 rounded-[40px] transition-all duration-500 hover:border-[#F35D2C]/30 hover:-translate-y-2">
                  <div className="w-16 h-16 mb-8 rounded-2xl bg-[#006E74]/5 flex items-center justify-center text-[#6B5E5E] group-hover:scale-110 group-hover:bg-[#F35D2C] group-hover:text-white transition-all duration-500">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#6B5E5E] mb-3">{step.title}</h3>
                  <p className="text-[#6B5E5E]/70 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DASHBOARD PREVIEW CAROUSEL --- */}
      <section className="py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#006E74]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#F35D2C] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Experimental Preview</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#6B5E5E]">The AI Output</h2>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#FAFAFA] border border-[#006E74]/20 rounded-[48px] overflow-hidden shadow-[0_0_80px_-20px_rgba(0,110,116,0.2)]"
            >
              {/* Header / Tab Bar */}
              <div className="border-b border-[#006E74]/10 px-8 py-5 bg-[#006E74]/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="text-[10px] font-mono text-[#6B5E5E]/60 tracking-widest uppercase flex items-center gap-2">
                  <ShieldCheck size={12} className="text-[#006E74]" /> SSL Encrypted Analysis
                </div>
              </div>

              {/* Carousel Content */}
              <div className="relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="p-8 md:p-16"
                  >
                    <div className="grid md:grid-cols-2 gap-16">
                      {/* Product Info Side */}
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F35D2C]/10 text-[#F35D2C] text-[10px] font-bold uppercase tracking-tighter mb-6">
                          <Sparkles size={12} /> High Conversion Potential
                        </div>
                        <h3 className="text-4xl font-bold text-[#6B5E5E] mb-4 tracking-tight">{product.productName}</h3>
                        
                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#006E74]/10">
                          <div>
                            <p className="text-[10px] uppercase text-[#6B5E5E]/60 font-bold tracking-widest mb-1">Price Point</p>
                            <p className="text-3xl font-bold text-[#6B5E5E]">{product.price}</p>
                          </div>
                          <div className="w-[1px] h-10 bg-[#006E74]/10" />
                          <div>
                            <p className="text-[10px] uppercase text-[#6B5E5E]/60 font-bold tracking-widest mb-1">Market Rating</p>
                            <p className="text-3xl font-bold text-[#6B5E5E]">{product.rating} <span className="text-sm text-[#6B5E5E]/40">/ 5.0</span></p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xs font-bold text-[#6B5E5E]/60 uppercase tracking-widest mb-4">AI Summarized Description</h4>
                            <p className="text-[#6B5E5E]/70 font-light leading-relaxed">{product.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-3">
                            {product.keyFeatures.map((feature, i) => (
                              <div key={i} className="flex items-center gap-3 text-sm text-[#6B5E5E]/80 bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10">
                                <ChevronRight size={14} className="text-[#F35D2C]" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Visuals / Audience Side */}
                      <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                          {product.images.map((_, i) => (
                            <div key={i} className="aspect-square rounded-3xl bg-gradient-to-br from-[#6B5E5E]/10 to-transparent flex items-center justify-center border border-[#006E74]/20 group overflow-hidden relative">
                              <LucideImage size={48} className="text-[#6B5E5E]/40 group-hover:scale-110 transition-transform" />
                              <div className="absolute inset-0 bg-[#F35D2C]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                        </div>

                        <div className="p-8 rounded-[32px] bg-[#006E74]/10 border border-[#006E74]/20 relative overflow-hidden group">
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                              <Target size={16} className="text-[#006E74]" />
                              <h4 className="text-xs font-bold uppercase tracking-widest text-[#6B5E5E]">Audience Intelligence</h4>
                            </div>
                            <p className="text-[#6B5E5E] text-lg font-medium leading-snug">{product.targetAudience}</p>
                          </div>
                          <div className="absolute -right-4 -bottom-4 text-[#006E74]/20 transform group-hover:scale-110 transition-transform">
                            <Target size={120} />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#006E74]/5 border border-[#006E74]/10">
                          <FileText className="text-[#6B5E5E]/40" />
                          <p className="text-xs text-[#6B5E5E]/60 italic">&quot;SEO-optimized copy automatically formatted for high-retention reading.&quot;</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#006E74]/20 flex items-center justify-center text-[#6B5E5E] hover:bg-[#F35D2C] hover:text-white transition-all shadow-lg z-20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#006E74]/20 flex items-center justify-center text-[#6B5E5E] hover:bg-[#F35D2C] hover:text-white transition-all shadow-lg z-20"
            >
              <ChevronRightIcon size={20} />
            </button>

            {/* Indicator Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {sampleProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 bg-[#F35D2C]"
                      : "w-2 bg-[#006E74]/30 hover:bg-[#006E74]/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (unchanged) --- */}
      <section className="py-32 relative text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-[#6B5E5E] mb-8 tracking-tighter">Ready to analyze your first link?</h2>
          <p className="text-[#6B5E5E]/70 mb-12 text-lg">Sign up for free and get instant insights, plus generate a full page.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-[#F35D2C] text-white px-12 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-xl"
            >
              Create Free Account
            </Link>
            <Link
              href="/#pricing"
              className="w-full sm:w-auto px-12 py-5 rounded-full font-bold border border-[#006E74]/30 text-[#006E74] hover:bg-[#006E74]/5 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}