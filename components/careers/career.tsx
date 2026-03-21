"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, MapPin, ArrowUpRight, Globe, Zap, Heart, Shield, Globe2 } from "lucide-react";
import Link from "next/link";

// Updated positions with affiliate‑relevant titles
const positions = [
  { title: "Senior Frontend Engineer", tag: "Engineering", loc: "Remote", pay: "$140k—$190k" },
  { title: "Product Marketing Manager", tag: "Growth", loc: "London/Remote", pay: "$110k—$150k" },
  { title: "AI Research Lead", tag: "Intelligence", loc: "Remote", pay: "$180k—$240k" },
];

export default function UltimateCareers() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="bg-white text-[#6B5E5E] min-h-screen selection:bg-[#F35D2C]/30 font-sans overflow-hidden">
      
      {/* Background elements – subtle glows using palette colors */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#F35D2C]/5 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#006E74]/5 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#F35D2C]" />
              <span className="text-[#F35D2C] uppercase tracking-[0.5em] text-[10px] font-bold">Amsuite is hiring</span>
            </div>
            
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter mb-12 italic text-[#6B5E5E]">
              BUILD <span className="text-transparent stroke-text">BEYOND</span> <br />
              LIMITS<span className="text-[#006E74]">.</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-12 items-end">
              <p className="text-xl md:text-2xl text-[#6B5E5E]/50 max-w-md font-light leading-relaxed">
                We don't just fill seats. We find the <span className="text-[#6B5E5E] font-medium">builders</span>—the ones who want to shape the future of affiliate marketing with AI.
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 rounded-full border border-[#006E74]/20 flex items-center justify-center group cursor-pointer ml-auto md:ml-0"
              >
                <div className="absolute inset-0 rounded-full border border-[#F35D2C] scale-0 group-hover:scale-100 transition-transform duration-500" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B5E5E]/70 group-hover:text-[#F35D2C]">Scroll</span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CULTURE BENTO */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 h-[500px] rounded-[40px] overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                alt="Workspace"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-4xl font-bold text-[#6B5E5E] mb-2">A Borderless Collective</h3>
                <p className="text-[#6B5E5E]/60">12 countries. 4 continents. 1 mission: empower affiliates.</p>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-4 grid gap-4">
              <div className="bg-[#006E74] text-white rounded-[40px] p-8 flex flex-col justify-between hover:-rotate-2 transition-transform">
                <Globe size={40} className="text-white/50" />
                <p className="text-2xl font-bold leading-tight">Work from any <br /> time zone.</p>
              </div>
              <div className="bg-white border border-[#006E74]/10 rounded-[40px] p-8 flex flex-col justify-between hover:rotate-2 transition-transform">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-2 border-white" alt="member" />
                  ))}
                </div>
                <p className="text-lg font-medium text-[#6B5E5E]/80 italic">"The most talented room I've ever been in."</p>
              </div>
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section className="px-6 py-32 max-w-5xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.4em] text-[#6B5E5E]/30 mb-16">Open Roles</h2>
          <div className="divide-y divide-[#006E74]/10">
            {positions.map((pos, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 20 }}
                className="py-12 flex flex-col md:flex-row md:items-center justify-between group cursor-pointer"
              >
                <div className="flex items-start gap-8">
                  <span className="text-[#006E74] font-mono text-sm mt-2">0{i+1}</span>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-bold text-[#6B5E5E] group-hover:text-[#F35D2C] transition-colors duration-300">
                      {pos.title}
                    </h3>
                    <div className="flex gap-4 mt-4">
                      <span className="text-[10px] border border-[#006E74]/20 px-3 py-1 rounded-full text-[#6B5E5E]/50 uppercase font-bold tracking-widest">{pos.tag}</span>
                      <span className="text-[10px] text-[#6B5E5E]/40 flex items-center gap-1 uppercase tracking-widest"><MapPin size={10}/> {pos.loc}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 md:mt-0 flex items-center gap-8">
                  <span className="hidden md:block text-[#6B5E5E]/30 font-mono">{pos.pay}</span>
                  <div className="w-16 h-16 rounded-full bg-[#F35D2C] text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA – Your provided section */}
        <section className="mt-40 px-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#006E74] to-[#004a4e] rounded-[48px] p-12 md:p-24 text-center">
            <div className="absolute top-0 right-0 opacity-10">
               <Globe2 size={400} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10 text-white">Don't see your role?</h2>
            <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg relative z-10">
              We're always looking for geniuses, rebels, and creators. Send us your portfolio and we'll talk.
            </p>
            <Link
              href="mailto:careers@amsuite.com"
              className="inline-flex items-center gap-3 bg-white text-[#006E74] px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl relative z-10"
            >
              Drop your Resume <ArrowUpRight size={22} />
            </Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(107,94,94,0.2);
        }
      `}</style>
    </div>
  );
}