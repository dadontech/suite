"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  Target, 
  Rocket, 
  ArrowRight, 
  Globe, 
  Users, 
  Shield, 
  Zap, 
  Layout,
  FileText,
  TrendingUp,
  HelpCircle
} from "lucide-react";

const stats = [
  { icon: <Zap className="text-[#F35D2C]" size={20} />, label: "9.2M+", desc: "Pages generated" },
  { icon: <Shield className="text-[#006E74]" size={20} />, label: "99.9%", desc: "Uptime SLA" },
  { icon: <Users className="text-[#F35D2C]" size={20} />, label: "12.5k+", desc: "Active affiliates" },
  { icon: <Globe className="text-[#006E74]" size={20} />, label: "85+", desc: "Countries served" },
];

const milestones = [
  {
    year: "2022",
    title: "The Problem",
    content: "As affiliate marketers ourselves, we were spending hours writing content, building funnels, and optimizing for SEO. We knew there had to be a better way – so we started building.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2023",
    title: "AI Content Engine",
    content: "We launched our first AI content generator. Affiliates could now generate high-quality reviews and comparisons in minutes, not hours. The response was overwhelming.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2024",
    title: "Funnels & Landing Pages",
    content: "We expanded beyond content to include conversion-focused funnels and landing pages. Now users could build a complete marketing system from a single affiliate link.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2025",
    title: "The Complete Suite",
    content: "Today, Amsuite is a full-stack affiliate platform: link analysis, SEO optimization, funnel building, and publishing – all powered by AI. We're just getting started.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  }
];

const founders = [
  {
    name: "Joe Pizzella",
    role: "Co-Founder & CEO",
    bio: "10+ years in affiliate marketing. Built and sold two niche sites before starting Amsuite.",
    quote: "I wanted to give new affiliates the same advantages that took me years to learn.",
    img: "https://i.pravatar.cc/400?u=1"
  },
  {
    name: "Anton Chalk",
    role: "Co-Founder & CTO",
    bio: "Former lead engineer at a SaaS scale-up. Obsessed with automation and clean code.",
    quote: "We're not just building a tool – we're building the future of affiliate work.",
    img: "https://i.pravatar.cc/400?u=2"
  },
  {
    name: "Ross Orr",
    role: "Co-Founder & CPO",
    bio: "Product leader with a background in UX and AI applications.",
    quote: "Every feature we build is tested by real affiliates – including ourselves.",
    img: "https://i.pravatar.cc/400?u=3"
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#F35D2C]/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#006E74]/5 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32">
        
        {/* --- Hero Section --- */}
        <section className="text-center mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006E74]/10 border border-[#006E74]/20 text-[10px] font-bold uppercase tracking-widest text-[#F35D2C] mb-8">
              <Sparkles size={12} /> Built by affiliates, for affiliates
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6 text-[#6B5E5E]">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74]">AMSUITE.</span>
            </h1>
            <p className="text-lg text-[#6B5E5E]/70 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to empower affiliates with AI‑powered tools that turn links into revenue – without the technical headaches. No coding, no writing, no guesswork.
            </p>
          </motion.div>
        </section>

        {/* --- What We Do (new) --- */}
        <section className="grid md:grid-cols-3 gap-8 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="bg-white border border-[#006E74]/10 rounded-[32px] p-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#006E74]/10 flex items-center justify-center mb-6">
              <FileText className="text-[#006E74]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#6B5E5E]">AI Content Generation</h3>
            <p className="text-[#6B5E5E]/70">
              From product reviews to comparison tables, our AI writes high-quality, SEO-friendly content in seconds. Just paste a link and let the AI do the rest.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#006E74]/10 rounded-[32px] p-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F35D2C]/10 flex items-center justify-center mb-6">
              <TrendingUp className="text-[#F35D2C]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#6B5E5E]">Funnel Builder</h3>
            <p className="text-[#6B5E5E]/70">
              Convert cold traffic into buyers with proven funnel templates. Bridge pages, lead magnets, email opt‑ins – all optimized for affiliate offers.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[#006E74]/10 rounded-[32px] p-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#006E74]/10 flex items-center justify-center mb-6">
              <HelpCircle className="text-[#006E74]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#6B5E5E]">SEO & Link Analysis</h3>
            <p className="text-[#6B5E5E]/70">
              Our tools analyze your links for SEO opportunities, audience insights, and conversion potential. Make data-driven decisions without being an expert.
            </p>
          </motion.div>
        </section>

        {/* --- Our Story (detailed timeline) --- */}
        <section className="mb-40">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-[#6B5E5E]">How We Got Here</h2>
          <div className="space-y-32 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F35D2C]/30 via-[#006E74]/30 to-transparent hidden lg:block" />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}
              >
                <div className="flex-1 rounded-[40px] overflow-hidden border border-[#006E74]/10 group shadow-lg">
                  <img src={m.img} alt={m.title} className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="flex-1 text-left lg:px-12">
                  <div className="text-[#006E74] text-sm font-bold uppercase tracking-widest mb-3">{m.year}</div>
                  <h3 className="text-4xl font-bold mb-6 tracking-tight text-[#6B5E5E]">{m.title}</h3>
                  <p className="text-[#6B5E5E]/70 text-xl leading-relaxed">{m.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Stats Grid --- */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-40">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="p-8 rounded-[32px] bg-white border border-[#006E74]/5 hover:border-[#F35D2C]/20 transition-all shadow-sm hover:shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6">{s.icon}</div>
              <h4 className="text-3xl font-bold mb-1 text-[#6B5E5E] tracking-tight">{s.label}</h4>
              <p className="text-[#6B5E5E]/50 text-[10px] font-bold uppercase tracking-[0.2em]">{s.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* --- Founders Section (now with real bios) --- */}
        <section className="mb-40 text-center">
          <h2 className="text-5xl font-bold mb-16 tracking-tighter text-[#6B5E5E]">Meet the founders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((f, i) => (
              <motion.div
                key={i}
                className="group relative bg-white border border-[#006E74]/10 rounded-[40px] overflow-hidden p-5 transition-all hover:border-[#F35D2C]/30 hover:shadow-2xl"
              >
                <div className="aspect-[4/5] rounded-[30px] overflow-hidden mb-8 shadow-inner">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                </div>
                <h4 className="text-2xl font-bold text-[#6B5E5E] mb-1">{f.name}</h4>
                <p className="text-[#006E74] font-medium text-sm mb-3 uppercase tracking-widest">{f.role}</p>
                <p className="text-[#6B5E5E]/70 text-xs mb-4 px-4">{f.bio}</p>
                <div className="h-px w-12 bg-[#F35D2C]/20 mx-auto mb-4" />
                <p className="text-[#6B5E5E]/60 text-sm italic px-6 leading-relaxed">"{f.quote}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="relative rounded-[60px] p-12 md:p-24 overflow-hidden text-center border border-[#006E74]/10 bg-gradient-to-br from-[#F35D2C]/5 to-[#006E74]/5">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-[#6B5E5E]">Join thousands of affiliates</h2>
            <p className="text-[#6B5E5E]/70 text-lg mb-12 max-w-2xl mx-auto">
              Start turning your links into revenue today – no credit card required.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 bg-[#F35D2C] text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-[#F35D2C]/20"
            >
              Get Started Free <ArrowRight size={20} />
            </Link>
          </div>
          {/* Decorative Background Circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#F35D2C]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#006E74]/5 rounded-full blur-3xl" />
        </section>
      </main>
    </div>
  );
}