"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Layout,
  Lock,
  TrendingUp,
  ArrowRight,
  Zap,
  Layers,
  Sparkles
} from "lucide-react";
import Link from "next/link";

// ✅ Define the Template type
interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  popularity: number;
  timeToEdit: string;
  usedBy: string;
  premium: boolean;
  image: string;
}

// 1. NINE BLOG TEMPLATES WITH RELIABLE UNSPLASH IMAGES
const templates: Template[] = [
  {
    id: 1,
    name: "PRODUCT REVIEW PRO",
    description: "Engineered for high-intent traffic with built-in comparison nodes.",
    category: "Review",
    popularity: 98,
    timeToEdit: "5 min",
    usedBy: "2.4k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
  },
  {
    id: 2,
    name: "LISTICLE MASTER",
    description: "The gold standard for viral list-based content and lead magnets.",
    category: "Listicle",
    popularity: 87,
    timeToEdit: "8 min",
    usedBy: "1.8k+",
    premium: false,
    image: "https://images.unsplash.com/photo-1512428559083-a401a30c9550?q=80&w=800"
  },
  {
    id: 3,
    name: "COMPARISON SHOWDOWN",
    description: "Deep-dive side-by-side analysis for high-ticket affiliate items.",
    category: "Comparison",
    popularity: 92,
    timeToEdit: "10 min",
    usedBy: "1.2k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
  },
  {
    id: 4,
    name: "HOW‑TO GUIDE",
    description: "Step‑by‑step tutorials optimized for informational queries.",
    category: "Educational",
    popularity: 79,
    timeToEdit: "7 min",
    usedBy: "900+",
    premium: false,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800"
  },
  {
    id: 5,
    name: "NEWS UPDATE",
    description: "Professional news layout for announcements and industry updates.",
    category: "News",
    popularity: 65,
    timeToEdit: "4 min",
    usedBy: "600+",
    premium: false,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800"
  },
  {
    id: 6,
    name: "ROUNDUP ULTIMATE",
    description: "Curated collection of top products with quick‑link cards.",
    category: "Roundup",
    popularity: 94,
    timeToEdit: "12 min",
    usedBy: "3.1k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1556909211-36987daf7b4d?q=80&w=800"
  },
  {
    id: 7,
    name: "CASE STUDY",
    description: "Detailed success story format with data and testimonials.",
    category: "Educational",
    popularity: 88,
    timeToEdit: "9 min",
    usedBy: "1.3k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
  },
  {
    id: 8,
    name: "INTERVIEW",
    description: "Expert interview Q&A with pull quotes and author bio.",
    category: "News",
    popularity: 72,
    timeToEdit: "6 min",
    usedBy: "700+",
    premium: false,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800"
  },
  {
    id: 9,
    name: "BEST OF",
    description: "Annual best‑of roundup with awards and badges.",
    category: "Roundup",
    popularity: 96,
    timeToEdit: "11 min",
    usedBy: "2.9k+",
    premium: true,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800"
  }
];

const categories = ["All", "Review", "Listicle", "Comparison", "Educational", "News", "Roundup"];

export default function BlogTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 font-sans overflow-hidden">
      {/* Ambient glows with our palette (very subtle) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-[#F35D2C]/5 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#006E74]/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
      </div>

      <main className="relative z-10">
        {/* Hero section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006E74]/10 border border-[#006E74]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#F35D2C] mb-8">
                <Sparkles size={12} /> Format Your Success
              </span>
              <h1 className="text-6xl md:text-[120px] font-black tracking-tighter mb-8 leading-[0.85] uppercase italic bg-gradient-to-b from-[#6B5E5E] to-[#6B5E5E]/40 bg-clip-text text-transparent">
                BLOG <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74]">BLUEPRINTS.</span>
              </h1>
              <p className="max-w-xl mx-auto text-[#6B5E5E]/60 text-lg font-light tracking-tight mt-8">
                Stop staring at a blank page. Deploy structural blueprints designed for maximum CTR and performance.
              </p>
            </motion.div>

            {/* Search bar */}
            <div className="max-w-xl mx-auto mt-16 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F35D2C] to-[#006E74] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-white border border-[#006E74]/20 rounded-2xl p-2 flex items-center shadow-lg">
                <Search size={20} className="ml-4 text-[#6B5E5E]/30" />
                <input
                  type="text"
                  placeholder="Search frameworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-[#6B5E5E] placeholder-[#6B5E5E]/30 px-4 h-14 text-base font-medium"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category filters */}
        <section className="pb-16 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    selectedCategory === cat 
                    ? "bg-[#F35D2C] text-white shadow-[0_0_25px_rgba(243,93,44,0.4)]" 
                    : "bg-white text-[#6B5E5E]/60 border border-[#006E74]/20 hover:border-[#F35D2C]/30 hover:text-[#F35D2C]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Template grid */}
        <section className="pb-40">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ✅ Replace any with proper type
function TemplateCard({ template }: { template: Template }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative bg-[#FAFAFA] border border-[#006E74]/20 rounded-[40px] p-6 hover:border-[#F35D2C]/50 transition-all duration-500 overflow-hidden"
    >
      {/* Image Preview */}
      <div className="aspect-[4/3] rounded-[32px] mb-8 relative overflow-hidden bg-[#F3F3F3] border border-[#006E74]/10">
        {!imgError ? (
          <img
            src={template.image}
            alt={template.name}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#006E74]/10 to-[#F35D2C]/10">
            <Layout size={48} className="text-[#6B5E5E]/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent" />
        
        {template.premium && (
          <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-4 py-1.5 bg-[#F35D2C] rounded-full text-white text-[9px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(243,93,44,0.4)]">
            <Lock size={10} /> PRO ONLY
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        <span className="text-[10px] font-black text-[#006E74] uppercase tracking-[0.2em] mb-3 block">
          {template.category}
        </span>
        <h3 className="text-2xl font-black tracking-tighter mb-4 uppercase italic leading-none text-[#6B5E5E] group-hover:text-[#F35D2C] transition-colors">
          {template.name}
        </h3>
        <p className="text-[#6B5E5E]/60 text-sm font-light leading-relaxed mb-8 line-clamp-2">
          {template.description}
        </p>

        {/* Bottom Stats */}
        <div className="flex items-center justify-between pt-6 border-t border-[#006E74]/10">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[9px] text-[#6B5E5E]/40 font-black uppercase tracking-widest mb-1">Impact</span>
              <span className="text-sm font-black text-[#6B5E5E] flex items-center gap-1">
                <TrendingUp size={14} className="text-[#006E74]" /> {template.popularity}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-[#6B5E5E]/40 font-black uppercase tracking-widest mb-1">Setup</span>
              <span className="text-sm font-black text-[#6B5E5E] flex items-center gap-1">
                <Zap size={14} className="text-[#F35D2C]" /> {template.timeToEdit}
              </span>
            </div>
          </div>
          
          <Link 
            href={`/templates/blog/${template.id}`}
            className="w-14 h-14 rounded-2xl bg-[#006E74] text-white flex items-center justify-center hover:bg-[#F35D2C] hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ArrowRight size={22} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}