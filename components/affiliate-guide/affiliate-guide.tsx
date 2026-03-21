"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  BookOpen,
  Target,
  Search,
  PenTool,
  TrendingUp,
  Users,
  Download,
  CheckCircle,
  ArrowUpRight,
  Star,
  Quote,
  Clock,
  BarChart,
  Globe,
  Mail,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AffiliateGuidePage() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 overflow-x-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#006E74]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F35D2C]/5 blur-[120px]" />
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
           <circle cx="500" cy="500" r="300" stroke="#6B5E5E" strokeWidth="0.5" fill="none" />
           <circle cx="500" cy="500" r="450" stroke="#6B5E5E" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-32">
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006E74]/10 border border-[#006E74]/20 text-[10px] font-bold uppercase tracking-[0.3em] text-[#F35D2C] mb-6">
              <Sparkles size={12} /> The Affiliate Guild
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-[#6B5E5E]">
              MASTER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74]">
                AFFILIATE
              </span> <br />
              MARKETING.
            </h1>
            <p className="text-[#6B5E5E]/70 max-w-md text-lg mb-10 leading-relaxed">
              A beginner‑friendly, step‑by‑step blueprint to build a profitable affiliate business from scratch. Follow along and start earning.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#F35D2C] hover:bg-opacity-90 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2">
                Start the Journey <ArrowUpRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-20 bg-white border border-[#006E74]/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-[#6B5E5E]/60 text-sm">Average First‑Month Earnings</p>
                        <h3 className="text-5xl font-bold text-[#6B5E5E]">$1,200</h3>
                        <p className="text-[#F35D2C] text-xs font-medium">from 500 visitors/day</p>
                    </div>
                    <div className="w-12 h-12 bg-[#F35D2C]/20 rounded-full flex items-center justify-center text-[#F35D2C]">
                        <BarChart size={24} />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="h-2 w-full bg-[#006E74]/10 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-[#F35D2C]" />
                    </div>
                    <p className="text-xs text-[#6B5E5E]/60 uppercase tracking-widest font-bold">Success Rate of Followers</p>
                </div>
            </div>
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-xl">
                <img src="https://i.pravatar.cc/150?u=1" alt="user" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-xl">
                <img src="https://i.pravatar.cc/150?u=2" alt="user" />
            </div>
          </motion.div>
        </div>

        {/* TESTIMONIAL */}
        <section className="mb-40 relative py-20 bg-[#FAFAFA] rounded-[60px] border border-[#006E74]/10 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#006E74] via-transparent to-transparent" />
            <div className="relative z-10 text-center px-6">
                <div className="flex justify-center gap-1 mb-6 text-[#F35D2C]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#6B5E5E] mb-12">Real Results from Beginners</h2>
                
                <div className="max-w-2xl mx-auto bg-white border border-[#006E74]/10 p-10 rounded-3xl relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#006E74] rounded-full flex items-center justify-center">
                        <Quote size={24} fill="white" />
                    </div>
                    <p className="text-xl italic text-[#6B5E5E]/80 mb-8 pt-4">
                        "I followed this guide step by step. In three months, my site went from zero to $800/month. The niche selection and content tips were gold."
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F35D2C]">
                             <img src="https://i.pravatar.cc/150?u=3" alt="Sarah" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-[#6B5E5E]">Sarah Jenkins</p>
                            <p className="text-sm text-[#6B5E5E]/60">Dog Gear Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* DETAILED CHAPTERS */}
        <section className="space-y-8 mb-40">
          <h2 className="text-4xl font-black text-[#6B5E5E] mb-12 text-center">The Step‑by‑Step Blueprint</h2>
          
          {chapters.map((chapter, idx) => (
            <div
              key={idx}
              className="border border-[#006E74]/10 rounded-[40px] bg-white overflow-hidden"
            >
              <button
                onClick={() => setExpandedChapter(expandedChapter === idx ? null : idx)}
                className="w-full text-left p-8 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#006E74]/10 to-transparent flex items-center justify-center">
                    <span className="text-[#006E74]">{chapter.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#6B5E5E]">{chapter.title}</h3>
                    <p className="text-[#6B5E5E]/70">{chapter.summary}</p>
                  </div>
                </div>
                <ChevronRight className={`transform transition-transform ${expandedChapter === idx ? 'rotate-90' : ''} text-[#006E74]`} />
              </button>

              {expandedChapter === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-[#006E74]/10 px-8 py-10 bg-[#FAFAFA]"
                >
                  <div className="prose prose-lg max-w-none text-[#6B5E5E]/80">
                    {chapter.content}
                    
                    {chapter.checklist && (
                      <div className="mt-8 p-6 bg-white rounded-3xl border border-[#006E74]/10">
                        <h4 className="font-bold text-[#006E74] mb-4 flex items-center gap-2">
                          <CheckCircle size={20} /> Checklist
                        </h4>
                        <ul className="space-y-2">
                          {chapter.checklist.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <input type="checkbox" className="mt-1 accent-[#F35D2C]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </section>

        {/* DOWNLOAD CHECKLIST CTA */}
        <section className="text-center mb-32">
          <div className="bg-gradient-to-br from-[#F35D2C]/5 to-[#006E74]/5 border border-[#006E74]/20 rounded-[48px] p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B5E5E] mb-4">Get the Printable Checklist</h2>
            <p className="text-[#6B5E5E]/70 mb-8 max-w-lg mx-auto">
              Follow each step and track your progress with our free PDF checklist.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-[#F35D2C] text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition"
            >
              Download Now <Download size={18} />
            </Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center">
             <div className="inline-block p-[1px] rounded-[40px] bg-gradient-to-r from-[#F35D2C] via-[#006E74] to-[#F35D2C]">
                <div className="bg-white rounded-[39px] px-12 py-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-[#6B5E5E]">READY TO <span className="text-[#F35D2C]">LAUNCH?</span></h2>
                    <p className="text-[#6B5E5E]/70 mb-10 max-w-lg mx-auto">
                        Join 1,000+ affiliates using Amsuite to automate their income.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="#" className="bg-[#F35D2C] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(243,93,44,0.4)] transition-all">
                            Start Building Now
                        </Link>
                        <Link href="#" className="bg-white border border-[#006E74] text-[#006E74] px-10 py-4 rounded-2xl font-bold hover:bg-[#006E74]/5 transition-all">
                            View Pricing
                        </Link>
                    </div>
                </div>
             </div>
        </section>
      </main>
    </div>
  );
}

const chapters = [
  {
    title: "Chapter 1: Choose Your Niche",
    icon: <Target size={24} />,
    summary: "Find a profitable niche you're passionate about.",
    content: (
      <>
        <p className="mb-4">A niche is your corner of the internet. Picking the right one determines everything: content ideas, traffic sources, and earning potential.</p>
        
        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 1: Brainstorm Interests</h4>
        <p className="mb-2">List 5–10 topics you genuinely enjoy or know something about (e.g., fitness, gaming, pet care).</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah loved her two rescue dogs and spent hours researching dog food. She started a blog about dog nutrition, not just generic pet care.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 2: Validate Demand</h4>
        <p className="mb-2">Use tools like Google Trends, Ahrefs Keyword Generator, or Amazon Best Sellers to see if people are searching for your topic.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah typed "best grain-free dog food" into Google Keyword Planner. It showed 8,000 monthly searches and medium competition – enough demand.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 3: Check Profitability</h4>
        <p className="mb-2">Look for products with affiliate programs. High‑ticket items pay more per sale, while low‑ticket require higher traffic.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> On Amazon, Sarah found dog food brands paying 4–6% commission. A $60 bag gives $2.40 per sale. With 100 sales/month that’s $240. Not huge, but she also added training courses (high‑ticket) from ClickBank paying $40–$80 per sale.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 4: Analyze Competition</h4>
        <p className="mb-2">Search for your niche + "blog" or "review". If there are established sites, you can learn from them.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah found three dog food review sites. She studied their top articles, saw they lacked feeding guides, so she created "How Much to Feed Your Dog by Weight" – a unique angle that attracted backlinks.
        </p>
      </>
    ),
    checklist: [
      "Brainstormed 5+ topics",
      "Checked search volume for at least 3 keywords",
      "Identified affiliate products with good commissions",
      "Visited top competitor sites",
    ]
  },
  {
    title: "Chapter 2: Find Affiliate Products",
    icon: <Search size={24} />,
    summary: "Select products that convert and pay well.",
    content: (
      <>
        <p className="mb-4">Not all affiliate programs are equal. You need products that match your audience and offer fair commissions.</p>
        
        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 1: Join Affiliate Networks</h4>
        <p className="mb-2">Sign up for Amazon Associates, ClickBank, ShareASale, or CJ Affiliate. Many have thousands of products.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah joined Amazon Associates and ClickBank. She quickly found a ClickBank course "Dog Training 101" with a $47 commission per sale and high gravity (meaning it sold well).
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 2: Evaluate Products</h4>
        <ul className="list-disc pl-6 mb-2">
          <li>Commission rate (percentage vs. flat fee)</li>
          <li>Cookie duration (longer means you get paid even if they buy later)</li>
          <li>Average sale price – $50+ is ideal for beginners</li>
          <li>Vendor reputation – check reviews</li>
        </ul>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah checked the "Dog Training 101" sales page – it had 4.5 stars on ClickBank, a 60‑day cookie, and a $47 payout. That’s solid.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 3: Use Gravity / Popularity Score</h4>
        <p className="mb-2">On ClickBank, a high gravity means many affiliates are selling it – a sign it converts. For Amazon, look at Best Seller Rank.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> The "Dog Training 101" had a gravity of 150, indicating consistent sales. She also checked Amazon's Best Seller Rank for dog food: brands under #10,000 in Pet Supplies were popular.
        </p>
      </>
    ),
    checklist: [
      "Signed up for 2–3 affiliate networks",
      "Made a list of 10–20 potential products",
      "Checked commission rates and cookie duration",
      "Read 5 reviews of the top product",
    ]
  },
  {
    title: "Chapter 3: Create High‑Converting Content",
    icon: <PenTool size={24} />,
    summary: "Write reviews, comparisons, and guides that persuade.",
    content: (
      <>
        <p className="mb-4">Content is how you attract visitors and earn trust. Focus on helpful, honest information.</p>
        
        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 1: Write Product Reviews</h4>
        <p className="mb-2">Structure: headline, introduction, what the product is, features (with real benefits), pros/cons, personal experience (if any), verdict, and affiliate link.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah wrote a review of "Dog Training 101". She opened with her dog's behavior issues, explained the course modules, listed pros (clear videos) and cons (no live support), and gave it 4.5 stars. Her affiliate link was in the first paragraph and at the end.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 2: Create Comparison Articles</h4>
        <p className="mb-2">Compare 2–3 products side by side. Use a table to highlight differences, then give your recommendation.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> She compared three dog foods: Blue Buffalo vs. Taste of the Wild vs. Purina Pro Plan. A table showed price, ingredients, protein %, and customer rating. She recommended Taste of the Wild for grain‑sensitive dogs.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 3: Add Visuals</h4>
        <p className="mb-2">Include product images, screenshots, or even short videos. Visuals increase trust and engagement.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah took photos of her dog eating the food and short clips of the training course dashboard. Her bounce rate dropped by 20%.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 4: Use Clear CTAs</h4>
        <p className="mb-2">Your affiliate link should appear early and again at the end. Use buttons like "Check Price on Amazon".</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> In her review, she placed a bright orange button "Get the Course Here" after the intro and again after the verdict. Clicks doubled.
        </p>
      </>
    ),
    checklist: [
      "Written one product review (1000+ words)",
      "Added at least 3 images",
      "Included pros/cons list",
      "Placed affiliate link in the first third and at the end",
    ]
  },
  {
    title: "Chapter 4: Drive Targeted Traffic",
    icon: <TrendingUp size={24} />,
    summary: "Get visitors to your content through SEO and social media.",
    content: (
      <>
        <p className="mb-4">Traffic is the lifeblood of affiliate marketing. Start with one source and master it.</p>
        
        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Option A: SEO</h4>
        <ul className="list-disc pl-6 mb-2">
          <li>Target long‑tail keywords (e.g., "best wireless earbuds for running")</li>
          <li>Optimize your page titles, meta descriptions, and headings</li>
          <li>Build backlinks by guest posting or reaching out to other sites</li>
        </ul>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah wrote a post targeting "best dog food for allergies". She used the exact keyword in the title, H1, and first paragraph. After six months, the post ranked #3 on Google and brought 2,000 monthly visitors.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Option B: Pinterest</h4>
        <p className="mb-2">Create eye‑candy pins for each article. Use Canva. Pinterest acts as a visual search engine.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah made five pins per post with compelling headlines. One pin went viral, driving 10,000 visits in a month.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Option C: Email Marketing</h4>
        <p className="mb-2">Offer a freebie (e.g., checklist) in exchange for email addresses. Then send them new articles and product recommendations.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah created a "Dog Feeding Cheat Sheet" PDF. 300 people signed up in two months. She sent a weekly newsletter featuring her latest reviews, generating consistent clicks.
        </p>
      </>
    ),
    checklist: [
      "Researched 5 long‑tail keywords",
      "Optimized one blog post for SEO",
      "Created 3 Pinterest pins and scheduled them",
      "Set up an email signup form",
    ]
  },
  {
    title: "Chapter 5: Optimize for Conversions",
    icon: <Zap size={24} />,
    summary: "Turn more visitors into buyers with small tweaks.",
    content: (
      <>
        <p className="mb-4">Once you have traffic, focus on improving your conversion rate.</p>
        
        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 1: A/B Test Headlines</h4>
        <p className="mb-2">Try different headlines on your best‑performing post and see which gets more clicks.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah changed "Dog Training 101 Review" to "I Tried Dog Training 101 for 30 Days – Here's What Happened". Clicks increased by 35%.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 2: Use Heatmaps</h4>
        <p className="mb-2">Tools like Hotjar show where users click. If they aren't clicking your links, move them higher.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Hotjar revealed most readers scrolled only halfway. She moved her affiliate button to the top and saw a 50% increase in clicks.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 3: Add Trust Elements</h4>
        <p className="mb-2">Display security badges, money‑back guarantees, or real user testimonials.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> She added a "30‑Day Money‑Back Guarantee" badge near her affiliate link. Conversion rate went from 2.1% to 2.8%.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 4: Speed Up Your Site</h4>
        <p className="mb-2">Use caching, optimize images, and choose a fast host. Slow sites kill conversions.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah used Smush to compress images and switched to a faster host. Page load time dropped from 4s to 1.8s, and her Google ranking improved.
        </p>
      </>
    ),
    checklist: [
      "Installed heatmap tool on your site",
      "Created two versions of a headline to test",
      "Added a trust badge to your review page",
      "Ran a speed test (Google PageSpeed) and fixed issues",
    ]
  },
  {
    title: "Chapter 6: Scale Your Business",
    icon: <Users size={24} />,
    summary: "Expand by outsourcing and creating more content.",
    content: (
      <>
        <p className="mb-4">When you have a profitable model, it's time to scale.</p>
        
        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 1: Hire Writers</h4>
        <p className="mb-2">Use platforms like Upwork or Fiverr to commission new articles. Provide them with your template and keywords.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah hired a writer for $50/article. She gave them a list of keywords and a sample post. In three months, she added 20 new articles, tripling her traffic.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 2: Translate Content</h4>
        <p className="mb-2">Translate your best posts into other languages to reach new audiences.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Using Weglot, she translated her top five articles into Spanish and German. Within six months, 15% of her traffic came from non‑English pages.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 3: Build a Team</h4>
        <p className="mb-2">As you grow, you may need a VA for admin, a designer for graphics, or an SEO specialist.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah hired a virtual assistant to handle Pinterest scheduling for $5/hour. She gained back 10 hours a week to focus on strategy.
        </p>

        <h4 className="font-bold text-[#6B5E5E] mt-6 mb-2">Step 4: Create Your Own Product</h4>
        <p className="mb-2">Once you have an audience, you can create a course or ebook – 100% profit.</p>
        <p className="text-sm bg-[#006E74]/5 p-3 rounded-xl border border-[#006E74]/10 mb-4">
          <span className="font-bold text-[#F35D2C]">Example:</span> Sarah created a $27 ebook "The Complete Guide to Raw Feeding for Dogs" and promoted it to her email list. She sold 200 copies in the first month – $5,400 profit.
        </p>
      </>
    ),
    checklist: [
      "Identified one task to outsource",
      "Wrote a job description for a writer",
      "Set aside a budget for scaling",
      "Researched translation options",
    ]
  }
];