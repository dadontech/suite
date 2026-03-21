"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Zap,
  ShieldCheck,
  BarChart3,
  Globe,
  TrendingUp,
  Award,
  ChevronRight,
  Layout,
  ExternalLink,
  Target,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function SeoCheckerPage() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Analyzing SEO for:", url);
  };

  const sampleAnalysis = {
    score: 87,
    title: "UltraBoost Wireless Earbuds – Premium Sound & Noise Cancellation",
    description:
      "Experience crystal‑clear audio with UltraBoost wireless earbuds. 24hr battery, IPX7 waterproof, and active noise cancellation. Shop now!",
    keywords: ["wireless earbuds", "noise cancelling", "Bluetooth earphones", "sports headphones"],
    suggestions: [
      "Add alt text to product images",
      "Increase content length (target 1500+ words)",
      "Improve internal linking structure",
    ],
  };

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Grid & Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6B5E5E10_1px,transparent_1px),linear-gradient(to_bottom,#6B5E5E10_1px,transparent_1px)] bg-[size:70px_70px] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#006E7415_0%,transparent_50%)]" />

        {/* Floating Decorative Stats */}
        <div className="absolute top-[15%] left-[5%] opacity-30 hidden lg:block">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
              <div className="w-1.5 h-1.5 bg-[#006E74] rotate-45" />
            </div>
            <div>
              <p className="text-xs text-[#6B5E5E]">• SEO Checker</p>
              <p className="text-[10px] text-[#6B5E5E]/60">real‑time analysis</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[20%] right-[5%] opacity-30 hidden lg:block">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-xs text-[#6B5E5E]">• Page ranking</p>
              <p className="text-[10px] text-[#6B5E5E]/60">optimization tips</p>
            </div>
            <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
              <div className="w-1.5 h-1.5 border-r border-b border-[#006E74] rotate-45" />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#006E74]/10 border border-[#006E74]/20 px-4 py-1.5 rounded-full text-[10px] font-bold mb-6 uppercase tracking-[0.3em] text-[#F35D2C]">
              <Sparkles size={14} className="animate-pulse" />
              Next-Gen SEO Intelligence
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-[#6B5E5E] to-[#6B5E5E]/40 bg-clip-text text-transparent italic">
              RANK <span className="text-[#F35D2C]">HIGHER.</span>
            </h1>
            <p className="text-[#6B5E5E]/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Unlock laboratory-grade insights. Enter your URL to diagnose meta tags, keyword density, and structural performance.
            </p>

            {/* THE COMMAND BAR INPUT */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F35D2C] to-[#006E74] rounded-full blur opacity-10 group-hover:opacity-25 transition duration-1000" />
              <div className="relative flex flex-col sm:flex-row gap-2 bg-[#FAFAFA] backdrop-blur-2xl p-2 rounded-2xl sm:rounded-full border border-[#006E74]/20 transition-all duration-500 hover:border-[#006E74]/40">
                <div className="flex-1 flex items-center px-6">
                  <Globe size={18} className="text-[#6B5E5E]/40 mr-3" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-domain.com"
                    className="w-full bg-transparent py-4 text-[#6B5E5E] placeholder-[#6B5E5E]/50 focus:outline-none text-base font-light"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#F35D2C] text-white px-10 py-4 rounded-xl sm:rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl"
                >
                  Start Audit <ArrowUpRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* --- ANALYSIS DASHBOARD PREVIEW --- */}
      <section className="pb-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#FAFAFA] border border-[#006E74]/20 rounded-[48px] overflow-hidden shadow-[0_0_100px_-20px_rgba(0,110,116,0.2)]"
          >
            {/* Header / Tab Bar */}
            <div className="border-b border-[#006E74]/10 px-8 py-5 bg-[#006E74]/5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
                <span className="text-[10px] font-bold text-[#6B5E5E]/50 uppercase tracking-widest border-l border-[#006E74]/20 pl-6">Diagnostic Module v4.0</span>
              </div>
              <div className="text-[10px] font-mono text-[#006E74] tracking-widest uppercase flex items-center gap-2">
                <ShieldCheck size={12} /> Encrypted Scan
              </div>
            </div>

            <div className="p-8 md:p-16">
              <div className="grid lg:grid-cols-3 gap-16 items-center">
                
                {/* 1. THE IMPROVED GLOBAL SCORE RING */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-56 h-56 mb-10 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#F35D2C]/20 to-[#006E74]/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(107,94,94,0.1)" strokeWidth="4" />
                      <motion.circle
                        cx="50" cy="50" r="46" fill="none" stroke="url(#scoreGradient)" strokeWidth="6"
                        strokeDasharray="289.02"
                        initial={{ strokeDashoffset: 289.02 }}
                        whileInView={{ strokeDashoffset: 289.02 - (289.02 * sampleAnalysis.score) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(107,94,94,0.1)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#F35D2C" />
                          <stop offset="100%" stopColor="#FF8E6B" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-6xl font-black tracking-tighter bg-gradient-to-b from-[#6B5E5E] to-[#6B5E5E]/40 bg-clip-text text-transparent italic"
                      >
                        {sampleAnalysis.score}
                      </motion.span>
                      <div className="flex flex-col items-center -mt-1">
                        <span className="text-[9px] font-black text-[#006E74] uppercase tracking-[0.4em] mb-1">Status</span>
                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#006E74] to-transparent" />
                        <span className="text-[10px] font-bold text-[#6B5E5E]/60 uppercase tracking-widest mt-1">Global Score</span>
                      </div>
                    </div>
                  </div>

                  {/* IMPROVED VISIBILITY BADGE (Chip Design) */}
                  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="relative group cursor-default">
                    <div className="absolute -inset-2 bg-[#F35D2C]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-3 px-5 py-2.5 bg-[#FAFAFA] border border-[#006E74]/20 rounded-lg shadow-2xl overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F35D2C]" />
                      <div className="p-1.5 bg-[#F35D2C]/10 rounded-md">
                        <TrendingUp size={14} className="text-[#F35D2C] animate-pulse" />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-[8px] font-black text-[#6B5E5E]/60 uppercase tracking-[0.2em] leading-none mb-1">Algorithm Result</span>
                        <span className="text-xs font-bold text-[#6B5E5E] tracking-wide">High Visibility Potential</span>
                      </div>
                      <div className="ml-2 pl-4 border-l border-[#006E74]/20">
                        <div className="w-2 h-2 rounded-full bg-[#006E74] animate-ping" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* 2. DATA GRID */}
                <div className="lg:col-span-2 space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="group">
                        <h4 className="text-[10px] font-bold text-[#6B5E5E]/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                           <Layout size={12} className="text-[#006E74]" /> Meta Title
                        </h4>
                        <div className="bg-[#006E74]/5 p-5 rounded-2xl border border-[#006E74]/10 group-hover:border-[#006E74]/30 transition-all duration-500">
                          <p className="text-sm font-medium leading-relaxed text-[#6B5E5E]">{sampleAnalysis.title}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-[#6B5E5E]/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                           <Zap size={12} className="text-[#F35D2C]" /> Extracted Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {sampleAnalysis.keywords.map((kw, i) => (
                            <span key={i} className="px-3 py-1.5 bg-[#006E74]/5 text-[#6B5E5E]/70 text-[11px] rounded-lg border border-[#006E74]/10 hover:border-[#F35D2C]/40 hover:text-[#6B5E5E] transition-all cursor-default">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-bold text-[#6B5E5E]/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <Target size={12} className="text-[#F35D2C]" /> Critical Actions
                      </h4>
                      <div className="space-y-3">
                        {sampleAnalysis.suggestions.map((suggestion, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 bg-[#006E74]/5 rounded-2xl border border-[#006E74]/10 group hover:bg-[#006E74]/10 transition-all">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#F35D2C] mt-1.5 shadow-[0_0_8px_#F35D2C]" />
                            <span className="text-xs text-[#6B5E5E]/70 font-light group-hover:text-[#6B5E5E]">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="pt-8 border-t border-[#006E74]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#006E74]/10 flex items-center justify-center text-[#006E74]">
                           <BarChart3 size={18} />
                        </div>
                        <p className="text-[11px] text-[#6B5E5E]/60 font-medium">Competitor ranking and full backlink <br/> profiles are available in the full report.</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F35D2C] hover:text-[#006E74] transition-all group">
                        Unlock Full Audit <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS (STEPS) --- */}
      <section className="py-20 relative border-t border-[#006E74]/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Globe />, title: "URL Crawling", desc: "Our spider fetches your live content and assets." },
              { icon: <Search />, title: "AI Diagnostic", desc: "Metadata and semantics are analyzed against 200+ ranking factors." },
              { icon: <TrendingUp />, title: "Growth Map", desc: "Receive a prioritized roadmap to reach page one." },
            ].map((step, i) => (
              <div key={i} className="group text-center md:text-left">
                <div className="w-12 h-12 mb-6 rounded-xl bg-[#006E74]/5 flex items-center justify-center text-[#006E74] group-hover:bg-[#F35D2C] group-hover:text-white transition-all duration-500 shadow-2xl">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-[#6B5E5E] mb-3 tracking-tight">{step.title}</h3>
                <p className="text-[#6B5E5E]/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-40 relative text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F35D2C]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-[#6B5E5E] mb-8 tracking-tighter italic">OUTRANK THE <br/> COMPETITION.</h2>
          <p className="text-[#6B5E5E]/70 mb-12 text-lg font-light max-w-xl mx-auto">Stop guessing. Use the same SEO intelligence used by top-tier affiliate marketers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-[#F35D2C] text-white px-12 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-2xl"
            >
              Get Full Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}