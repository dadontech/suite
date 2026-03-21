"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  Sparkles,
  HelpCircle,
  BookOpen,
  CreditCard,
  Settings,
  Users,
  FileText,
  MessageCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// --- DATA SECTION (with palette colors) ---
const helpCategories = [
  { id: "getting-started", name: "Getting Started", icon: <BookOpen size={22} />, count: 12, color: "#F35D2C" },
  { id: "templates", name: "Templates", icon: <FileText size={22} />, count: 8, color: "#006E74" },
  { id: "tools", name: "Tools", icon: <Settings size={22} />, count: 15, color: "#F35D2C" },
  { id: "billing", name: "Billing", icon: <CreditCard size={22} />, count: 6, color: "#006E74" },
  { id: "account", name: "Account", icon: <Users size={22} />, count: 9, color: "#F35D2C" },
  { id: "faq", name: "FAQ", icon: <HelpCircle size={22} />, count: 24, color: "#006E74" },
];

const allArticles = [
  { id: 1, title: "How to generate your first page", category: "Getting Started", views: "12.3k", url: "#", trending: true },
  { id: 2, title: "Understanding the Link Analyzer report", category: "Tools", views: "8.7k", url: "#" },
  { id: 3, title: "Connecting a custom domain", category: "Account", views: "6.2k", url: "#" },
  { id: 4, title: "Billing and subscription FAQs", category: "Billing", views: "5.1k", url: "#" },
  { id: 5, title: "Using funnel templates", category: "Templates", views: "4.8k", url: "#" },
  { id: 6, title: "SEO Checker: best practices", category: "Tools", views: "4.2k", url: "#" },
  { id: 7, title: "Creating a lead magnet funnel", category: "Templates", views: "3.9k", url: "#" },
  { id: 8, title: "How to cancel your subscription", category: "Billing", views: "3.5k", url: "#" },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    let filtered = allArticles;
    if (selectedCategory) filtered = filtered.filter(a => a.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(q));
    }
    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] font-sans selection:bg-[#F35D2C]/20">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#F35D2C]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-[#006E74]/5 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-32">
        {/* Header / Hero Section */}
        <section className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#006E74]/10 shadow-sm text-[11px] font-bold uppercase tracking-wider text-[#F35D2C] mb-6">
              <Sparkles size={14} className="fill-[#F35D2C]" /> Help Center
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#6B5E5E] mb-6">
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74]">help you?</span>
            </h1>
            
            {/* Search Glassmorphism */}
            <div className="max-w-2xl mx-auto relative mt-8">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#F35D2C]/20 to-[#006E74]/20 rounded-3xl blur-xl opacity-50" />
              <div className="relative bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-2xl p-2 flex items-center">
                <div className="p-3 bg-[#006E74]/10 rounded-xl text-[#006E74] ml-1">
                  <Search size={22} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, guides, or keywords..."
                  className="w-full bg-transparent border-none focus:ring-0 text-[#6B5E5E] placeholder-[#6B5E5E]/40 px-4 h-14 text-lg font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Categories Bento Grid */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-[#6B5E5E]">Browse Categories</h2>
              <p className="text-sm text-[#6B5E5E]/60">Quickly find help by topic</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {helpCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
                className={`relative group p-6 rounded-2xl border transition-all duration-300 ${
                  selectedCategory === cat.name
                    ? "bg-white border-[#F35D2C] shadow-lg ring-1 ring-[#F35D2C]/10"
                    : "bg-white border-[#006E74]/10 hover:border-[#006E74]/30 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: selectedCategory === cat.name ? cat.color : `${cat.color}10`,
                      color: selectedCategory === cat.name ? "white" : cat.color,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#6B5E5E]">{cat.name}</p>
                    <p className="text-[11px] font-medium text-[#6B5E5E]/40 mt-1">{cat.count} Docs</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Articles List - Ticket Style */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-[#006E74]/10 pb-4">
            <h2 className="text-xl font-bold text-[#6B5E5E]">
              {searchQuery || selectedCategory ? "Search Results" : "Featured Articles"}
            </h2>
            {(searchQuery || selectedCategory) && (
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                className="text-xs font-bold text-[#006E74] hover:text-[#F35D2C] transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white border border-[#006E74]/10 p-5 rounded-2xl hover:border-[#F35D2C]/30 hover:shadow-xl hover:shadow-[#F35D2C]/5 transition-all flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       {article.trending && (
                         <span className="flex items-center gap-1 text-[10px] font-bold text-[#F35D2C] bg-[#F35D2C]/10 px-2 py-0.5 rounded-full">
                           <TrendingUp size={10} /> Popular
                         </span>
                       )}
                       <span className="text-[10px] font-bold text-[#6B5E5E]/50 uppercase tracking-tighter">
                        {article.category}
                      </span>
                    </div>
                    <Link href={article.url}>
                      <h3 className="text-md font-bold text-[#6B5E5E] group-hover:text-[#F35D2C] transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#6B5E5E]/50 mt-2 flex items-center gap-3">
                      <span>{article.views} reads</span>
                      <span className="w-1 h-1 bg-[#006E74]/20 rounded-full" />
                      <span>Updated 2 days ago</span>
                    </p>
                  </div>
                  <div className="ml-4 p-2 rounded-full bg-[#006E74]/10 text-[#006E74] group-hover:bg-[#F35D2C] group-hover:text-white transition-all">
                    <ChevronRight size={18} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-[#006E74]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-[#6B5E5E]/30" size={32} />
              </div>
              <h3 className="font-bold text-[#6B5E5E]">No results found</h3>
              <p className="text-[#6B5E5E]/50 text-sm">Try using different keywords or categories.</p>
            </div>
          )}
        </section>

        {/* Footer Support Card */}
        <section className="mt-24">
          <div className="relative overflow-hidden bg-[#6B5E5E] rounded-[32px] p-8 md:p-12">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F35D2C]/20 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#006E74]/10 blur-[80px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-3">Didn&apos;t find what you need?</h2>
                <p className="text-white/70 max-w-md">
                  Our world-class support team is available 24/7 to help you with technical issues or account questions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#6B5E5E] px-8 py-4 rounded-xl font-bold hover:bg-[#F35D2C] hover:text-white transition shadow-lg"
                >
                  <MessageCircle size={18} /> Chat with Us
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-[#006E74] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#F35D2C] transition"
                >
                  Submit a Ticket <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}