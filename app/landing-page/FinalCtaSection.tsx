"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "./hooks/useInView";
import { ArrowRight, Sparkles, Link2 } from "lucide-react"; // Changed Wand2 to Link2

export default function FinalCtaSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generating page for:", link);
  };

  return (
    <section id="final-cta"
      ref={ref}
      className="relative bg-white py-32 md:py-48 overflow-hidden text-[#6B5E5E]"
    >
      {/* 1. ULTRA-SMOOTH BACKGROUND DEPTH */}
      {/* Large Central Flare - Orange */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#F35D2C]/5 blur-[160px] rounded-full pointer-events-none opacity-60" />
      
      {/* Bottom Horizon Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F35D2C]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F35D2C]/5 to-transparent pointer-events-none" />

      {/* Grid with Masking - using warm gray */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6B5E5E10_1px,transparent_1px),linear-gradient(to_bottom,#6B5E5E10_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_100%,transparent_100%)] opacity-40" />

      {/* Floating Decorative Stats */}
      <div className="absolute top-[15%] left-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1.5 h-1.5 bg-[#006E74] rotate-45" />
          </div>
          <div>
            <p className="text-xs text-[#6B5E5E]">• Get started</p>
            <p className="text-[10px] text-[#6B5E5E]/60">free trial</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[20%] right-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-xs text-[#6B5E5E]">• No credit card</p>
            <p className="text-[10px] text-[#6B5E5E]/60">required</p>
          </div>
          <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1.5 h-1.5 border-r border-b border-[#006E74] rotate-45" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* 2. THE FLOATING CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Badge */}
          <motion.span 
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#006E74]/5 backdrop-blur-md border border-[#006E74]/20 px-5 py-2 rounded-full text-[11px] font-bold mb-10 uppercase tracking-[0.3em] text-[#F35D2C]"
          >
            <Sparkles size={14} className="animate-pulse" />
            Start generating in seconds
          </motion.span>

          {/* Headline with Text-Shadow for "Pop" */}
          <h2 className="text-5xl md:text-7xl font-bold text-[#6B5E5E] mb-8 tracking-tighter leading-[1.1]">
            Ready to turn your links into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#6B5E5E] to-[#9B8F8F]">
              high-converting pages?
            </span>
          </h2>

          <p className="text-[#6B5E5E]/70 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light leading-relaxed">
            Join thousands of affiliates who are already generating <br className="hidden md:block" />
            revenue with AI‑powered content.
          </p>

          {/* 3. THE "COMMAND BAR" INPUT */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="relative group p-1.5 rounded-[32px] bg-white border border-[#006E74]/20 shadow-2xl transition-all duration-500 hover:border-[#006E74]/40"
            >
              {/* Internal Shadow Effect */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
              
              <div className="relative flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-6 py-3">
                  {/* Replaced Wand2 with Link2 - a more relevant icon for a link input */}
                  <Link2 size={20} className="text-[#F35D2C] mr-4 opacity-80" />
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Paste your affiliate link here..."
                    className="w-full bg-transparent text-[#6B5E5E] placeholder-[#6B5E5E]/50 focus:outline-none text-base md:text-lg"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="relative overflow-hidden group/btn bg-[#006E74] text-white px-10 py-4 rounded-[24px] font-bold transition-all duration-300 hover:bg-[#F35D2C] flex items-center justify-center gap-3 active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,110,116,0.2)]"
                >
                  <span className="relative z-10">Generate Page</span>
                  <ArrowRight size={20} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </form>

            {/* 4. HORIZONTAL TRUST LABELS */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-8 md:gap-12"
            >
              {["No credit card", "14-day free trial", "Cancel anytime"].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F35D2C]/40" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B5E5E]/60">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}