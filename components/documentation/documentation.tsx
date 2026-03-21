"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, BookOpen, Code, HelpCircle, ArrowRight, Search } from "lucide-react";

// --- ORIGINAL TEXT DATA KEPT INTACT ---
const docCategories = [
  {
    title: "Getting Started",
    description: "Quick start guides and basics.",
    icon: <BookOpen size={24} />,
    links: [
      { label: "Creating your first page", href: "#" },
      { label: "Understanding the dashboard", href: "#" },
      { label: "Account settings", href: "#" },
    ],
  },
  {
    title: "Templates",
    description: "How to use and customize templates.",
    icon: <BookOpen size={24} />,
    links: [
      { label: "Blog templates", href: "#" },
      { label: "Funnel templates", href: "#" },
      { label: "Landing pages", href: "#" },
    ],
  },
  {
    title: "Tools",
    description: "Deep dives into our AI tools.",
    icon: <Code size={24} />,
    links: [
      { label: "Link Analyzer", href: "#" },
      { label: "SEO Checker", href: "#" },
    ],
  },
  {
    title: "Integrations",
    description: "Connect with email, CRMs, etc.",
    icon: <Code size={24} />,
    links: [
      { label: "Mailchimp", href: "#" },
      { label: "ConvertKit", href: "#" },
      { label: "Zapier", href: "#" },
    ],
  },
  {
    title: "API Reference",
    description: "Build custom integrations.",
    icon: <Code size={24} />,
    links: [
      { label: "Authentication", href: "#" },
      { label: "Endpoints", href: "#" },
      { label: "Webhooks", href: "#" },
    ],
  },
  {
    title: "FAQ",
    description: "Frequently asked questions.",
    icon: <HelpCircle size={24} />,
    links: [
      { label: "Billing", href: "#" },
      { label: "Technical issues", href: "#" },
      { label: "Account management", href: "#" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 overflow-x-hidden font-sans">
      
      {/* --- REDESIGNED HEADER SECTION --- */}
      <div className="bg-gradient-to-b from-[#006E74]/5 to-white pt-24 pb-16 border-b border-gray-100">
        <section className="text-center max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006E74]/10 border border-[#006E74]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#F35D2C] mb-6">
              <Sparkles size={14} /> Knowledge Base
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 text-[#6B5E5E]">
              DOCUMENTATION
            </h1>
            <p className="text-xl text-[#6B5E5E]/70 max-w-2xl mx-auto">
              Everything you need to get the most out of Amsuite.
            </p>
          </motion.div>
          
          {/* --- REDESIGNED SEARCH BAR --- */}
          <div className="max-w-xl mx-auto mt-12 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B5E5E]/40" size={20} />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full py-4 pl-12 pr-6 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F35D2C]/20 focus:border-[#F35D2C]/30 text-[#6B5E5E] placeholder-[#6B5E5E]/50 shadow-inner"
            />
          </div>
        </section>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32">
        
        {/* --- REDESIGNED CATEGORIES GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm hover:shadow-lg hover:border-[#F35D2C]/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#006E74]/5 flex items-center justify-center text-[#006E74] border border-[#006E74]/10">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#6B5E5E] tracking-tight">{cat.title}</h3>
              </div>
              <p className="text-[#6B5E5E]/70 mb-8 leading-relaxed h-12">{cat.description}</p>
              
              <ul className="space-y-4">
                {cat.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="group flex items-center justify-between text-[#6B5E5E] hover:text-[#F35D2C] transition-colors">
                      <span className="text-sm font-medium">{link.label}</span>
                      <ArrowRight size={16} className="text-[#6B5E5E]/30 group-hover:text-[#F35D2C] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}