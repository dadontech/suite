"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Handshake, Globe, TrendingUp, ArrowRight } from "lucide-react";

const partnerTypes = [
  {
    title: "Agency Partners",
    description: "Offer Amsuite to your clients as part of your service – we provide training and support.",
    icon: <Handshake size={32} />,
    color: "bg-[#F35D2C]",
  },
  {
    title: "Technology Partners",
    description: "Integrate with us to expand your platform's capabilities and reach.",
    icon: <Globe size={32} />,
    color: "bg-[#006E74]",
  },
  {
    title: "Affiliate Networks",
    description: "Bring our tools to your network of publishers and earn commissions.",
    icon: <TrendingUp size={32} />,
    color: "bg-[#6B5E5E]",
  },
];

export default function PartnersPage() {
  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 overflow-x-hidden font-sans">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F35D2C]/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#006E74]/10 rounded-full blur-3xl opacity-50" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* Hero Section - Asymmetrical Layout */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006E74]/10 border border-[#006E74]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#F35D2C] mb-6">
              <Sparkles size={14} /> Grow Together
            </span>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 text-[#6B5E5E]">
              PARTNER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F35D2C] to-[#006E74]">WITH US.</span>
            </h1>
            <p className="text-xl text-[#6B5E5E]/70 mb-10 max-w-lg">
              Join our partner ecosystem and help affiliates succeed while growing your own business.
            </p>
            <Link
              href="#apply"
              className="inline-flex items-center gap-2 bg-[#006E74] text-white px-8 py-4 rounded-full font-bold hover:bg-[#F35D2C] transition-all duration-300 shadow-lg shadow-[#006E74]/20"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </motion.div>
          
          {/* Floating partner elements visual - now animated in a circular path */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative h-96">
            {/* AMS shape */}
            <motion.div
              className="absolute top-0 right-10 w-24 h-24 bg-[#F35D2C] rounded-3xl rotate-12 flex items-center justify-center text-white font-black text-xs shadow-lg"
              animate={{
                x: [0, 8, 0, -8, 0],
                y: [0, -8, 0, 8, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 0
              }}
            >
              AMS
            </motion.div>

            {/* Tech shape */}
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 bg-[#006E74] rounded-full flex items-center justify-center text-white font-black shadow-lg"
              animate={{
                x: [0, 8, 0, -8, 0],
                y: [0, 8, 0, -8, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 2.5
              }}
            >
              Tech
            </motion.div>

            {/* Network shape */}
            <motion.div
              className="absolute bottom-10 right-20 w-40 h-20 bg-[#6B5E5E] rounded-tr-[50px] rounded-bl-[50px] flex items-center justify-center text-white font-bold shadow-lg"
              animate={{
                x: [0, -8, 0, 8, 0],
                y: [0, -8, 0, 8, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 5
              }}
            >
              Network
            </motion.div>

            {/* Empty shape */}
            <motion.div
              className="absolute top-40 right-0 w-16 h-16 bg-[#F35D2C]/20 rounded-2xl -rotate-12"
              animate={{
                x: [0, 6, 0, -6, 0],
                y: [0, 6, 0, -6, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: 1.2
              }}
            />
          </motion.div>
        </section>

        {/* Partner Types - Bento Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-32">
          {partnerTypes.map((type, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white border border-[#006E74]/10 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 mb-8 rounded-2xl ${type.color} flex items-center justify-center text-white shadow-lg`}>
                {type.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#6B5E5E] mb-4">{type.title}</h3>
              <p className="text-[#6B5E5E]/70 mb-8 h-20">{type.description}</p>
              <Link href="#" className="text-sm font-bold text-[#F35D2C] hover:text-[#006E74] transition-colors inline-flex items-center gap-1 group">
                Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Why Partner - metric card style */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black text-[#6B5E5E] mb-10 tracking-tighter">Why partner with Amsuite?</h2>
            <div className="space-y-6">
              {[
                "Revenue share & recurring commissions",
                "Dedicated partner manager",
                "Co‑marketing opportunities",
                "Early access to new features"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-[#006E74]/10 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#F35D2C]/10 flex items-center justify-center text-[#F35D2C] flex-shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <span className="text-lg font-semibold text-[#6B5E5E]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#006E74] rounded-[40px] p-10 text-white shadow-2xl shadow-[#006E74]/30">
            <p className="text-2xl italic mb-10 leading-relaxed">"Partnering with Amsuite has been a game‑changer for our agency. Our clients love the results."</p>
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?u=6" alt="Jessica Miller" className="w-16 h-16 rounded-full border-4 border-white/20" />
              <div>
                <p className="font-bold text-xl">Jessica Miller</p>
                <p className="text-white/70">Digital Wave Agency</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section id="apply" className="text-center">
          <div className="bg-[#6B5E5E] rounded-[48px] p-16 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Become a partner</h2>
              <p className="text-white/80 mb-10 max-w-lg mx-auto text-lg">
                Let's talk about how we can grow together.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-white text-[#6B5E5E] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#F35D2C] hover:text-white transition-all duration-300"
              >
                Apply Now <ArrowRight size={20} />
              </Link>
            </div>
            {/* Background design element */}
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full" />
          </div>
        </section>
      </main>
    </div>
  );
}