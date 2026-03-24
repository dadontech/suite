"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  MessageCircle,
  Plus,
  Search,
  ChevronRight,
  TrendingUp,
  Zap,
  Flame,
  LayoutGrid,
  Award,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 overflow-x-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#F35D2C]/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#006E74]/5 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-[#F35D2C] font-bold tracking-widest text-xs uppercase mb-4"
            >
              <Zap size={14} fill="currentColor" /> Leveling Up Together
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
              CONNECT. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74]">LEARN. GROW.</span>
            </h1>
            <p className="text-lg text-[#6B5E5E]/70 font-medium max-w-md">
              Affiliate marketing strategies, growth tips, and community support. Join 12.5k+ pioneers.
            </p>
          </div>

          <div className="flex -space-x-4 mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="member" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-white bg-[#F35D2C] text-white flex items-center justify-center text-xs font-bold">
              120+
            </div>
          </div>
        </header>

        {/* Search & Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5E5E]/40 group-focus-within:text-[#F35D2C] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search discussions, insights, or members..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-[#006E74]/10 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#F35D2C]/20 outline-none transition-all text-sm font-medium text-[#6B5E5E] placeholder-[#6B5E5E]/50"
            />
          </div>
          <button className="bg-[#F35D2C] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
            <Plus size={20} /> Create New Post
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content - Featured Feed */}
          <div className="lg:col-span-8 space-y-12">
            
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#6B5E5E] flex items-center gap-2">
                  <LayoutGrid size={20} /> Featured Stories
                </h2>
                <Link href="#" className="text-sm font-bold text-[#006E74] hover:text-[#F35D2C] transition-colors">View All</Link>
              </div>
              
              {/* Artistic Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
                <div className="relative rounded-[32px] overflow-hidden group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Art" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Success Story</span>
                    <h3 className="text-2xl font-bold text-white leading-tight">How I Scaled to $10k/mo in One Year</h3>
                  </div>
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="bg-[#F35D2C] rounded-[32px] p-8 text-white flex flex-col justify-between group cursor-pointer hover:bg-opacity-90 transition-colors">
                    <h3 className="text-xl font-bold italic leading-snug">&quot;The power of niche selection – my journey from zero to six figures&quot;</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20" />
                      <span className="text-sm font-medium">By Sarah Chen</span>
                    </div>
                  </div>
                  <div className="relative rounded-[32px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Adventure" />
                  </div>
                </div>
              </div>
            </section>

            {/* Discussion List */}
            <section className="bg-white border border-[#006E74]/10 rounded-[40px] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#6B5E5E] mb-8">Recent Discussions</h2>
              <div className="space-y-8">
                {discussions.map((post, i) => (
                  <div key={i} className="flex gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#F3F3F3]">
                      <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 pb-8 border-b border-[#006E74]/10 group-last:border-0 group-last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[#6B5E5E] text-lg group-hover:text-[#F35D2C] transition-colors leading-tight">
                          {post.title}
                        </h4>
                        <span className="text-[10px] font-black uppercase text-[#006E74] bg-[#006E74]/10 px-2 py-1 rounded">
                          {post.replies} Replies
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#6B5E5E]/60">
                        <span className="font-bold text-[#6B5E5E]">{post.author}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-[#006E74]/10 rounded-[40px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#6B5E5E] flex items-center gap-2">
                  <Flame className="text-[#F35D2C]" fill="currentColor" size={20} /> Top Streaks
                </h2>
                <TrendingUp size={16} className="text-[#6B5E5E]/40" />
              </div>
              <div className="space-y-6">
                {streaks.map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-[#6B5E5E]/30 w-4">{i + 1}</span>
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F3F3F3]">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                      <span className="text-sm font-bold text-[#6B5E5E]">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-[#6B5E5E]">{user.score}</span>
                      <Sparkles size={12} className="text-[#F35D2C]" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 border-2 border-dashed border-[#006E74]/20 rounded-2xl text-sm font-bold text-[#6B5E5E]/50 hover:border-[#F35D2C]/30 hover:text-[#F35D2C] transition-all">
                View Leaderboard
              </button>
            </div>

            {/* Spotlight Card */}
            <div className="bg-gradient-to-br from-[#F35D2C] to-[#006E74] rounded-[40px] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-black leading-none mb-4">MEMBER <br /> OF THE WEEK</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  &quot;This community helped me find my first profitable niche. Now I&apos;m earning $3k/month.&quot;
                </p>
                <button className="bg-white text-[#F35D2C] text-xs font-black px-6 py-3 rounded-full uppercase tracking-widest hover:scale-105 transition-transform">
                  Read Case Study
                </button>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

const discussions = [
  {
    title: "How to find winning products in 2025",
    author: "Marta Tomaszewska",
    avatar: "https://i.pravatar.cc/150?u=a1",
    time: "3 hours ago",
    replies: "26",
  },
  {
    title: "SEO vs. paid ads – which works best for beginners?",
    author: "Ponzu",
    avatar: "https://i.pravatar.cc/150?u=a2",
    time: "5 hours ago",
    replies: "114",
  },
  {
    title: "Building an email list from day one – strategies",
    author: "Tomasz Fiema",
    avatar: "https://i.pravatar.cc/150?u=a3",
    time: "1 day ago",
    replies: "42",
  },
];

const streaks = [
  { name: "Pawel Kadysz", score: "1,322", avatar: "https://i.pravatar.cc/150?u=s1" },
  { name: "Agnieszka Bladzik", score: "1,121", avatar: "https://i.pravatar.cc/150?u=s2" },
  { name: "Ian Prince", score: "1,048", avatar: "https://i.pravatar.cc/150?u=s3" },
  { name: "Maciej Korsan", score: "992", avatar: "https://i.pravatar.cc/150?u=s4" },
];