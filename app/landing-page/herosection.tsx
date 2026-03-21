"use client";

import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("how-it-works");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full bg-white text-[#6B5E5E] overflow-hidden flex flex-col justify-center items-center">
      
      {/* Background Decorative Elements - Positioned relative to screen edges */}
      <div className="absolute top-[15%] left-[10%] opacity-40 hidden lg:block">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-2 h-2 bg-[#006E74] rotate-45" />
          </div>
          <div>
            <p className="text-xs text-[#6B5E5E]">• Cortex</p>
            <p className="text-[10px] text-[#6B5E5E]/60">20,945</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[25%] right-[10%] opacity-40 hidden lg:block">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-[#6B5E5E]">• Meeton</p>
            <p className="text-[10px] text-[#6B5E5E]/60">440</p>
          </div>
          <div className="w-8 h-8 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
             <div className="w-2 h-2 border-r border-b border-[#006E74] rotate-45" />
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 bg-[#006E74]/10 border border-[#006E74]/20 px-4 py-1.5 rounded-full text-xs font-medium mb-8 hover:bg-[#006E74]/20 transition-colors cursor-pointer group">
          <span className="w-4 h-4 rounded-full bg-[#F35D2C] flex items-center justify-center text-[10px] text-white">G</span>
          <span className="text-[#6B5E5E]">Unlock Your Assets Spark!</span>
          <ArrowUpRight size={14} className="text-[#6B5E5E]/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6 bg-gradient-to-b from-[#6B5E5E] to-[#9B8F8F] bg-clip-text text-transparent text-center">
          One-click to turn <br />
          <span className="text-[#6B5E5E]">any affiliate link</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[#6B5E5E]/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-center">
          Our AI analyzes the product, writes compelling copy, designs a
          matching funnel, and publishes it live – all in seconds.
        </p>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-4 mb-16">
          <button className="bg-transparent border border-[#006E74] text-[#006E74] px-8 py-3 rounded-full font-medium hover:bg-[#006E74] hover:text-white transition flex items-center gap-2 text-sm">
            Generate Page
            <ArrowUpRight size={18} />
          </button>
          <button className="bg-[#F35D2C] text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition text-sm">
            Discover More
          </button>
        </div>

        {/* Bottom Logo Strip - Animated Marquee */}
        <div className="w-full pt-12 border-t border-[#6B5E5E]/10 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              {/* First set */}
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">AMAZON</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">CLICKBANK</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">SHOPIFY</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">CJ</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">RAKUTEN</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">WEALTHY AFFILIATE</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">EXPERT NAIRA</span>
              {/* Duplicate set for seamless loop */}
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">AMAZON</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">CLICKBANK</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">SHOPIFY</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">CJ</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">RAKUTEN</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">WEALTHY AFFILIATE</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter text-[#6B5E5E] mx-3">EXPERT NAIRA</span>
            </div>
          </div>
        </div>
      </div>


      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#F35D2C]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Animation styles */}
      <style jsx>{`
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}