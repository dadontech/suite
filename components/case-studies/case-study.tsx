"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Search,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudies = caseStudies.filter((study) => {
    const matchesCategory = selectedCategory === "All" || study.category === selectedCategory;
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 overflow-x-hidden font-sans">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#F35D2C]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#006E74]/5 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-[#F35D2C] font-black tracking-widest text-[10px] uppercase mb-4"
            >
              <Zap size={14} fill="currentColor" /> Real‑world results
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 text-[#6B5E5E]">
              CASE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74]">STUDIES.</span>
            </h1>
            <p className="text-lg text-[#6B5E5E]/70 font-medium max-w-xl">
              See how real affiliates used Amsuite to build profitable businesses – from zero to consistent income.
            </p>
          </div>
        </header>

        {/* Search and Static Categories */}
        <div className="flex flex-col gap-6 mb-16">
          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5E5E]/40 group-focus-within:text-[#F35D2C] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search success stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-[#006E74]/20 rounded-2xl focus:ring-2 focus:ring-[#F35D2C]/20 outline-none text-[#6B5E5E] placeholder-[#6B5E5E]/50 transition-all"
            />
          </div>

          {/* Static Categories (no animation) */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#F35D2C] text-white"
                    : "bg-white border border-[#006E74]/20 text-[#6B5E5E]/70 hover:border-[#F35D2C]/30 hover:text-[#F35D2C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, idx) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white border border-[#006E74]/10 rounded-[32px] overflow-hidden hover:border-[#F35D2C]/30 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] relative overflow-hidden bg-[#FAFAFA]">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  
                  {/* Floating Result Badge */}
                  <div className="absolute top-4 right-4 bg-[#F35D2C] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">
                    {study.results.revenue} Revenue
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 -mt-12 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#006E74]/10 flex items-center justify-center text-[#006E74]">
                        <Zap size={16} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-[#6B5E5E]/50 uppercase tracking-widest">{study.category}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#6B5E5E] mb-4 leading-tight group-hover:text-[#F35D2C] transition-colors">
                    {study.title}
                  </h3>
                  
                  <p className="text-[#6B5E5E]/70 text-sm leading-relaxed mb-8 line-clamp-2 italic">
                    &quot;{study.quote}&quot;
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[#006E74]/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-[#F35D2C] p-0.5">
                            <img src={study.avatar} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-[#6B5E5E]">{study.author}</span>
                    </div>
                    <Link href={`/case-studies/${study.id}`} className="w-10 h-10 rounded-full bg-[#006E74]/10 flex items-center justify-center text-[#006E74] group-hover:bg-[#F35D2C] group-hover:text-white transition-all">
                        <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {filteredStudies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#006E74]/10 flex items-center justify-center">
              <Search size={24} className="text-[#006E74]" />
            </div>
            <p className="text-[#6B5E5E]/50 font-medium">No case studies match your criteria.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <section className="mt-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F35D2C] to-[#006E74] blur-[100px] opacity-10 rounded-[64px]" />
          <div className="relative bg-white border border-[#006E74]/10 rounded-[64px] p-16 flex flex-col items-center text-center overflow-hidden">
            <span className="text-[#F35D2C] font-black tracking-[0.3em] uppercase text-xs mb-6">Ready to start?</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8 max-w-3xl leading-[0.9] text-[#6B5E5E]">
                WRITE YOUR OWN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74] text-8xl">SUCCESS STORY.</span>
            </h2>
            <Link
              href="/signup"
              className="bg-[#F35D2C] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-opacity-90 transition-transform flex items-center gap-3"
            >
              Get Started <ArrowUpRight size={20} strokeWidth={3} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

// Categories array
const categories = ["All", "Health", "Tech", "Education", "Outdoors", "Parenting", "Finance", "Fitness", "Travel"];

// 12 case studies (removed 3: id 7, 9, 13)
const caseStudies = [
  {
    id: 1,
    title: "From Zero to $10k/month in 6 Months with Amsuite",
    author: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=1",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format",
    category: "Health",
    results: { revenue: "$10,200", traffic: "45k" },
    quote: "Amsuite made it possible for me to start without any tech headaches. The AI content and funnel templates saved me months of work.",
  },
  {
    id: 2,
    title: "Scaling a Tech Review Site to $25k/month",
    author: "Marcus Webb",
    avatar: "https://i.pravatar.cc/150?u=2",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format",
    category: "Tech",
    results: { revenue: "$25,400", traffic: "120k" },
    quote: "The SEO Checker alone saved me from months of trial and error. I rank on page one for dozens of keywords now.",
  },
  {
    id: 3,
    title: "Using Email Sequences to Double Affiliate Revenue",
    author: "Priya Kapoor",
    avatar: "https://i.pravatar.cc/150?u=3",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
    category: "Education",
    results: { revenue: "$8,700", traffic: "28k" },
    quote: "The email integration was a game‑changer. Now I have a direct line to my readers.",
  },
  {
    id: 4,
    title: "From Side Hustle to Full‑Time Income",
    author: "David Kim",
    avatar: "https://i.pravatar.cc/150?u=4",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format",
    category: "Outdoors",
    results: { revenue: "$15,800", traffic: "60k" },
    quote: "I never could have done this without Amsuite. It's like having a full‑time writer on staff.",
  },
  {
    id: 5,
    title: "Scaling a YouTube Channel with Landing Pages",
    author: "James O'Brien",
    avatar: "https://i.pravatar.cc/150?u=5",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
    category: "Tech",
    results: { revenue: "$12,200", traffic: "85k" },
    quote: "Landing pages convert way better than a raw Amazon link. It's been a huge boost.",
  },
  {
    id: 6,
    title: "Building a Passive Income Stream with Bridge Pages",
    author: "Elena Rodriguez",
    avatar: "https://i.pravatar.cc/150?u=6",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format",
    category: "Parenting",
    results: { revenue: "$6,500", traffic: "18k" },
    quote: "Bridge pages were the missing link. Now I can send traffic directly to a warm‑up page before they see the offer.",
  },
  {
    id: 8,
    title: "Fitness Influencer Adds $8k/mo with Affiliate Reviews",
    author: "Jessica Lee",
    avatar: "https://i.pravatar.cc/150?u=8",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format",
    category: "Fitness",
    results: { revenue: "$8,200", traffic: "35k" },
    quote: "I used Amsuite to turn my Instagram audience into a revenue stream. The landing pages look professional and convert.",
  },
  {
    id: 10,
    title: "Parenting Blog Doubles Revenue with Email Funnels",
    author: "Nadia Ahmed",
    avatar: "https://i.pravatar.cc/150?u=10",
    image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&auto=format",
    category: "Parenting",
    results: { revenue: "$9,300", traffic: "42k" },
    quote: "I built a lead magnet for 'potty training tips' and Amsuite's email sequences did the rest. My best month was $1,200 from emails alone.",
  },
  {
    id: 11,
    title: "Tech Reviewer Hits $18k/mo with Comparison Pages",
    author: "Andrew Park",
    avatar: "https://i.pravatar.cc/150?u=11",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format",
    category: "Tech",
    results: { revenue: "$18,500", traffic: "95k" },
    quote: "Amsuite's comparison templates saved me hours. I now have 30+ comparison articles that bring in steady commissions.",
  },
  {
    id: 12,
    title: "Health Niche: How I Quit My Job in 8 Months",
    author: "Rachel Green",
    avatar: "https://i.pravatar.cc/150?u=12",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format",
    category: "Health",
    results: { revenue: "$11,200", traffic: "55k" },
    quote: "I started reviewing supplements with Amsuite's AI. Within eight months I replaced my full‑time income.",
  },
  {
    id: 14,
    title: "Finance Site Earns $12k/mo from Credit Card Offers",
    author: "Lisa Wong",
    avatar: "https://i.pravatar.cc/150?u=14",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format",
    category: "Finance",
    results: { revenue: "$12,800", traffic: "70k" },
    quote: "Amsuite's link analyzer helped me understand what cards my audience wanted. My review pages now convert at 6%.",
  },
  {
    id: 15,
    title: "Fitness Blogger Adds $6k/mo with Workout Guides",
    author: "Chris Evans",
    avatar: "https://i.pravatar.cc/150?u=15",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format",
    category: "Fitness",
    results: { revenue: "$6,400", traffic: "22k" },
    quote: "I used Amsuite to create a workout guide lead magnet and now I have 4,000 subscribers who trust my product picks.",
  },
];