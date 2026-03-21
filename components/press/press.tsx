"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, FileText, Download, Calendar, ArrowRight, Image as ImageIcon, PlayCircle, Newspaper } from "lucide-react";

// --- MOCK DATA  ---
const pressReleases = [
  {
    date: "March 15, 2025",
    category: "Funding",
    title: "Amsuite Raises $5M Series A to Expand AI Affiliate Tools",
    summary: "Investment led by Venture Partners, bringing total funding to $8M to accelerate generative AI for affiliate marketing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "#",
  },
  {
    date: "Jan 10, 2025",
    category: "Product",
    title: "Introducing the SEO Checker",
    summary: "Real‑time optimization for affiliates with actionable recommendations to rank higher.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
    link: "#",
  },
  {
    date: "Oct 22, 2024",
    category: "Education",
    title: "Affiliate Guide Launch",
    summary: "A comprehensive blueprint for beginners to build profitable affiliate sites.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400",
    link: "#",
  },
];

const mediaAssets = [
  { name: "Brand Identity", items: ["Logo Pack (SVG/PNG)", "Brand Guidelines"], icon: <ImageIcon size={28} /> },
  { name: "Press Assets", items: ["Product Screenshots", "Executive Headshots"], icon: <FileText size={28} /> },
];

// --- COMPONENT ---
export default function PressPage() {
  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 overflow-x-hidden font-sans">
      {/* --- REFINED BACKGROUND GLOWS – using palette colors with low opacity --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#F35D2C]/5 blur-[180px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#006E74]/5 blur-[150px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40">
        
        {/* --- REFINED HERO SECTION --- */}
        <header className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-b border-[#006E74]/10 pb-20"
          >
            <div className="max-w-3xl">
              <span className="flex items-center gap-3 text-[#F35D2C] font-bold tracking-[0.2em] text-xs uppercase mb-6 bg-[#F35D2C]/10 px-4 py-2 rounded-full w-fit">
                <Sparkles size={16} /> News & Resources
              </span>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8 text-[#6B5E5E]">
                PRESS <span className="text-[#6B5E5E]/20">ROOM.</span>
              </h1>
              <p className="text-2xl text-[#6B5E5E]/60 leading-relaxed max-w-2xl font-light">
                Latest updates, brand assets, and press inquiries about Amsuite.
              </p>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#media-kit"
                className="group flex items-center gap-4 bg-[#F35D2C] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#006E74] transition-all duration-300 flex-shrink-0"
              >
                <Download size={22} /> DOWNLOAD MEDIA KIT
              </Link>
            </motion.div>
          </motion.div>
        </header>

        {/* --- REFINED FEATURED BENTO GRID --- */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Main Featured Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="md:col-span-8 relative group overflow-hidden rounded-[40px] h-[550px] border border-[#006E74]/10 bg-white"
            >
              <img src={pressReleases[0].image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={pressReleases[0].title} />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
              <div className="absolute bottom-0 p-12">
                <span className="bg-[#F35D2C] px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-block uppercase tracking-wider text-white">Latest</span>
                <h2 className="text-5xl font-black mb-6 leading-tight text-[#6B5E5E] group-hover:text-[#F35D2C] transition-colors">{pressReleases[0].title}</h2>
                <p className="text-[#6B5E5E]/80 mb-8 max-w-xl text-lg font-light">{pressReleases[0].summary}</p>
                <Link href={pressReleases[0].link} className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest text-[#006E74] hover:text-[#F35D2C] transition-colors">Read Article <ArrowRight size={20}/></Link>
              </div>
            </motion.div>

            {/* Sidebar Cards */}
            <div className="md:col-span-4 flex flex-col gap-8">
              {pressReleases.slice(1).map((release, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 10, borderColor: "rgba(243, 93, 44, 0.3)" }}
                  className="bg-white border border-[#006E74]/10 p-8 rounded-[32px] cursor-pointer group transition-all"
                >
                  <span className="text-[#006E74] text-sm font-black uppercase mb-3 block tracking-wider">{release.category}</span>
                  <h3 className="text-2xl font-bold mb-3 leading-snug text-[#6B5E5E] group-hover:text-[#F35D2C] transition-colors">{release.title}</h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-[#6B5E5E]/50 text-sm">{release.date}</span>
                    <ArrowRight size={22} className="text-[#006E74]/30 group-hover:text-[#F35D2C] transition-colors" />
                  </div>
                </motion.div>
              ))}
              
              {/* Brand Video Card – keeping teal gradient but adjusting text to white for readability */}
              <div className="flex-1 bg-gradient-to-br from-[#006E74] to-[#004a4e] rounded-[32px] p-10 flex flex-col justify-end group cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] bg-cover opacity-10 group-hover:scale-110 transition-transform duration-700"></div>
                <PlayCircle size={50} className="mb-8 text-white/70 relative z-10" />
                <h3 className="text-3xl font-bold text-white relative z-10">Brand Story</h3>
                <p className="text-white/70 mt-3 relative z-10 text-lg font-light">Watch our journey in the affiliate marketing landscape.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- REFINED ASSET GRID --- */}
        <section id="media-kit" className="mb-40">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-5xl font-black tracking-tighter text-[#6B5E5E]">Media Assets</h2>
            <div className="h-[2px] flex-1 bg-[#006E74]/10 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mediaAssets.map((asset, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white border border-[#006E74]/10 rounded-[32px] p-10 flex gap-8 items-start hover:border-[#F35D2C]/40 transition-colors"
              >
                <div className="w-20 h-20 rounded-3xl bg-[#006E74]/10 flex items-center justify-center text-[#F35D2C] flex-shrink-0">
                  {asset.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[#6B5E5E] mb-6">{asset.name}</h3>
                  <div className="space-y-4">
                    {asset.items.map((item, i) => (
                      <button key={i} className="w-full flex items-center justify-between text-[#6B5E5E]/60 hover:text-[#F35D2C] transition-colors py-3 border-b border-[#006E74]/10 group text-lg">
                        <span className="font-medium">{item}</span>
                        <Download size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#F35D2C]" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- REFINED CONTACT FOOTER --- */}
        <section className="relative overflow-hidden rounded-[48px] bg-[#006E74] text-white p-20 text-center">
          <div className="relative z-10">
            <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter">Want to tell our story?</h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-light">
              Our communications team is ready to help with data, interviews, and deep dives into the affiliate marketing space.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="mailto:press@amsuite.com" 
                className="inline-flex items-center gap-4 bg-white text-[#006E74] px-12 py-6 rounded-full font-bold text-lg hover:bg-[#F35D2C] hover:text-white transition-colors"
              >
                CONTACT PUBLIC RELATIONS <ArrowRight size={22} />
              </Link>
            </motion.div>
          </div>
          {/* Background graphic */}
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Newspaper size={300} />
          </div>
        </section>
      </main>
    </div>
  );
}