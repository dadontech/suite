"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Bookmark,
  Tag
} from "lucide-react";
import Link from "next/link";

// --- DATA SECTION (16 POSTS) ---
const blogPosts = [
  // Existing 10 posts
  {
    id: 1,
    title: "How to Choose the Perfect Affiliate Niche",
    excerpt: "Discover the strategies top affiliates use to select profitable niches with high conversion potential.",
    author: "Alex Rivera",
    date: "Mar 15, 2025",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Announcing Amsuite v2.0: AI Funnel Builder",
    excerpt: "We're excited to launch our most powerful update yet – now you can generate complete funnels from any link.",
    author: "Sarah Chen",
    date: "Mar 10, 2025",
    category: "Updates",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "5 SEO Mistakes That Hurt Affiliate Sites",
    excerpt: "Avoid these common pitfalls to improve your search rankings and drive more organic traffic.",
    author: "Marcus Webb",
    date: "Mar 5, 2025",
    category: "SEO",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&auto=format",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "How to Use the Link Analyzer Tool",
    excerpt: "A step-by-step guide to extracting audience insights and product data with our AI.",
    author: "Priya Kapoor",
    date: "Feb 28, 2025",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Maximizing Conversions with Bridge Pages",
    excerpt: "Learn how bridge pages can warm up your traffic and boost click-through rates to merchant offers.",
    author: "Alex Rivera",
    date: "Feb 20, 2025",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "New Feature: Custom Domain Support",
    excerpt: "Now you can publish your generated pages on your own domain instantly.",
    author: "Sarah Chen",
    date: "Feb 12, 2025",
    category: "Updates",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
    readTime: "3 min read",
  },
  {
    id: 7,
    title: "The Ultimate Guide to Email Lead Magnets",
    excerpt: "How to create irresistible lead magnets that grow your list and pre‑sell affiliate products.",
    author: "Marcus Webb",
    date: "Feb 5, 2025",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format",
    readTime: "8 min read",
  },
  {
    id: 8,
    title: "Understanding the SEO Checker Report",
    excerpt: "A deep dive into each metric and how to act on the recommendations.",
    author: "Priya Kapoor",
    date: "Jan 28, 2025",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&auto=format",
    readTime: "6 min read",
  },
  {
    id: 9,
    title: "Case Study: From 0 to $10k/mo with Amsuite",
    excerpt: "How one affiliate used our tools to build a six‑figure business in six months.",
    author: "Alex Rivera",
    date: "Jan 20, 2025",
    category: "Case Studies",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format",
    readTime: "10 min read",
  },
  {
    id: 10,
    title: "Integrating Amsuite with Your Email Service",
    excerpt: "Step‑by‑step instructions for connecting your funnel to Mailchimp, ConvertKit, and more.",
    author: "Priya Kapoor",
    date: "Jan 12, 2025",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format",
    readTime: "7 min read",
  },
  // --- 6 NEW POSTS (IDs 11-16) ---
  {
    id: 11,
    title: "How to Write High‑Converting Affiliate Content",
    excerpt: "Copywriting techniques that turn readers into buyers – tested formulas inside.",
    author: "Sarah Chen",
    date: "Jan 5, 2025",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format",
    readTime: "6 min read",
  },
  {
    id: 12,
    title: "Q2 2025 Affiliate Marketing Trends",
    excerpt: "What's working now and where to focus your efforts for the next quarter.",
    author: "Marcus Webb",
    date: "Dec 28, 2024",
    category: "Industry News",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format",
    readTime: "7 min read",
  },
  {
    id: 13,
    title: "Interview: How I Built a $50k/mo Affiliate Site",
    excerpt: "Exclusive conversation with a top affiliate who shares his exact process.",
    author: "Priya Kapoor",
    date: "Dec 20, 2024",
    category: "Interviews",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format",
    readTime: "12 min read",
  },
  {
    id: 14,
    title: "A/B Testing Your Affiliate Funnels",
    excerpt: "How to run simple experiments that boost conversion rates by 20% or more.",
    author: "Alex Rivera",
    date: "Dec 12, 2024",
    category: "SEO",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
    readTime: "5 min read",
  },
  {
    id: 15,
    title: "Using AI to Repurpose Content for Multiple Channels",
    excerpt: "Turn one blog post into videos, social posts, and email sequences – fast.",
    author: "Sarah Chen",
    date: "Dec 5, 2024",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1677442136019-21780a5c6b8e?w=800&auto=format",
    readTime: "8 min read",
  },
  {
    id: 16,
    title: "Amsuite Year in Review: 2024 Milestones",
    excerpt: "A look back at the features, updates, and community growth over the past year.",
    author: "Marcus Webb",
    date: "Dec 1, 2024",
    category: "Updates",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format",
    readTime: "4 min read",
  },
];

const categories = ["All", "Tips", "Updates", "SEO", "Tutorials", "Case Studies", "Industry News", "Interviews"];

// --- MAIN COMPONENT ---
export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const listPosts = filteredPosts.slice(1);

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] font-sans selection:bg-[#F35D2C]/20">
      {/* Background Ambience - subtle glows using palette colors */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#006E74]/5 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[50%] rounded-full bg-[#F35D2C]/5 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* Header Section */}
        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F35D2C]/10 text-[#F35D2C] text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Sparkles size={12} /> The Intelligence Feed
                </span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.85] mb-4 text-[#6B5E5E]">
                  AMSUITE <span className="text-[#006E74]">INSIGHTS.</span>
                </h1>
                <p className="text-[#6B5E5E]/70 max-w-lg text-lg">
                  Advanced affiliate strategies, software updates, and marketing teardowns.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative group w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5E5E]/40 group-focus-within:text-[#F35D2C] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full bg-white border-2 border-[#006E74]/10 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:border-[#F35D2C] outline-none transition-all text-[#6B5E5E] placeholder-[#6B5E5E]/50"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                    selectedCategory === cat 
                    ? "bg-[#F35D2C] text-white shadow-xl" 
                    : "bg-white border border-[#006E74]/20 text-[#6B5E5E]/70 hover:border-[#006E74] hover:text-[#006E74]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </header>

        {/* Featured Post (only when no search and All selected) */}
        {featuredPost && searchQuery === "" && selectedCategory === "All" && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-16 group relative bg-white border border-[#006E74]/10 rounded-[40px] overflow-hidden shadow-2xl shadow-[#006E74]/5 flex flex-col lg:flex-row"
          >
            <div className="lg:w-3/5 relative overflow-hidden h-80 lg:h-[500px] bg-[#FAFAFA]">
              <img 
                src={featuredPost.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Featured"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image+Not+Found"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>
            <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#006E74] text-white text-[10px] px-3 py-1 rounded-md font-bold uppercase tracking-tighter">Featured</span>
                <span className="text-[#6B5E5E]/60 text-xs font-medium flex items-center gap-1"><Clock size={12} /> {featuredPost.readTime}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#6B5E5E] group-hover:text-[#F35D2C] transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-[#6B5E5E]/70 mb-8 line-clamp-3 text-lg leading-relaxed">{featuredPost.excerpt}</p>
              <Link href={`/blog/${featuredPost.id}`} className="inline-flex items-center gap-3 font-bold text-[#6B5E5E] group/link">
                Read Full Article <div className="w-10 h-10 rounded-full bg-[#006E74]/10 flex items-center justify-center group-hover/link:bg-[#F35D2C] group-hover/link:text-white transition-all"><ArrowRight size={18} /></div>
              </Link>
            </div>
          </motion.section>
        )}

        {/* Blog Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {(searchQuery !== "" || selectedCategory !== "All" ? filteredPosts : listPosts).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </AnimatePresence>
        </section>

        {filteredPosts.length === 0 && (
          <div className="text-center py-40 bg-white rounded-[40px] border-2 border-dashed border-[#006E74]/10">
            <Tag className="mx-auto mb-4 text-[#006E74]/20" size={48} />
            <p className="text-[#6B5E5E]/50 font-medium">No insights found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white rounded-[32px] p-5 border border-[#006E74]/10 shadow-sm hover:shadow-2xl hover:shadow-[#006E74]/10 transition-all duration-500 flex flex-col"
    >
      <div className="relative aspect-[1.5/1] rounded-[24px] overflow-hidden mb-6 bg-[#FAFAFA]">
        <img 
          src={post.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          alt={post.title}
          onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found"; }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-lg text-[#6B5E5E] shadow-sm uppercase tracking-tighter">
            {post.category}
          </span>
        </div>
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#F35D2C] transition-colors">
          <Bookmark size={14} />
        </button>
      </div>

      <div className="flex flex-col flex-grow px-2">
        <div className="flex items-center gap-3 text-[11px] font-bold text-[#6B5E5E]/50 uppercase tracking-widest mb-4">
          <span className="text-[#006E74]">{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-tight text-[#6B5E5E] group-hover:text-[#006E74] transition-colors">
          {post.title}
        </h3>
        
        <p className="text-[#6B5E5E]/70 text-sm leading-relaxed line-clamp-2 mb-8">
          {post.excerpt}
        </p>

        {/* Author Footer */}
        <div className="mt-auto pt-6 border-t border-[#006E74]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#006E74] to-[#F35D2C] flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
              {post.author[0]}
            </div>
            <div>
              <p className="text-xs font-bold text-[#6B5E5E]">{post.author}</p>
              <p className="text-[10px] text-[#6B5E5E]/50 font-medium">Verified Author</p>
            </div>
          </div>
          <Link href={`/blog/${post.id}`} className="w-10 h-10 rounded-xl bg-[#006E74]/10 flex items-center justify-center text-[#006E74] group-hover:bg-[#F35D2C]/10 group-hover:text-[#F35D2C] transition-all">
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}