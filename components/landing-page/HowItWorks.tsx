"use client";

import { Link as LinkIcon, Edit, Globe, ArrowUpRight } from "lucide-react";
import { useInView } from "./hooks/useInView";

export default function HowItWorks() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const steps = [
    {
      icon: <LinkIcon className="w-8 h-8" />,
      title: "Paste Your Link",
      description:
        "Enter any affiliate link from Amazon, ClickBank, Shopify, or any other network. Our AI instantly analyzes the product and its target audience.",
      gradient: "from-[#F35D2C]/20 via-[#F35D2C]/5 to-transparent",
      glow: "group-hover:shadow-[0_0_50px_-12px_rgba(243,93,44,0.4)]",
      accent: "text-[#F35D2C]",
      borderGradient: ["#F35D2C", "#006E74"],
      speed: 8, // seconds per loop
    },
    {
      icon: <Edit className="w-8 h-8" />,
      title: "AI Generates Content",
      description:
        "We write compelling copy, design a matching blog layout, and create a high-converting funnel – all tailored to your product and audience.",
      gradient: "from-[#006E74]/20 via-[#006E74]/5 to-transparent",
      glow: "group-hover:shadow-[0_0_50px_-12px_rgba(0,110,116,0.4)]",
      accent: "text-[#006E74]",
      borderGradient: ["#006E74", "#F35D2C"],
      speed: 10,
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Publish & Profit",
      description:
        "Your page goes live on a fast, SEO-optimized URL. Edit anytime, track analytics, and start earning commissions immediately.",
      gradient: "from-[#6B5E5E]/20 via-[#6B5E5E]/5 to-transparent",
      glow: "group-hover:shadow-[0_0_50px_-12px_rgba(107,94,94,0.4)]",
      accent: "text-[#6B5E5E]",
      borderGradient: ["#6B5E5E", "#F35D2C"],
      speed: 12,
    },
  ];

  return (
    <section id="how-it-works"
      ref={ref}
      className="relative bg-white overflow-hidden"
    >
      {/* Perspective Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-[linear-gradient(to_right,#6B5E5E20_1px,transparent_1px),linear-gradient(to_bottom,#6B5E5E20_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-20" />

      {/* Floating Decorative Stats */}
      <div className="absolute top-[15%] left-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1.5 h-1.5 bg-[#006E74] rotate-45" />
          </div>
          <div>
            <p className="text-xs text-[#6B5E5E]">• Workflow</p>
            <p className="text-[10px] text-[#6B5E5E]/60">3 steps</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[20%] right-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-xs text-[#6B5E5E]">• Automation</p>
            <p className="text-[10px] text-[#6B5E5E]/60">AI powered</p>
          </div>
          <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1.5 h-1.5 border-r border-b border-[#006E74] rotate-45" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 bg-[#006E74]/10 border border-[#006E74]/20 px-4 py-1.5 rounded-full text-[10px] font-medium mb-6 uppercase tracking-[0.2em] text-[#6B5E5E]">
            <span className="w-2 h-2 rounded-full bg-[#F35D2C] animate-pulse" />
            Simple Process
          </div>
          
          <h2 className="text-4xl md:text-6xl font-semibold text-[#6B5E5E] mb-6 tracking-tight leading-tight">
            From Link to Live Page in <br />
            <span className="bg-linear-to-r from-[#6B5E5E] to-[#9B8F8F] bg-clip-text text-transparent">Three Steps</span>
          </h2>

          <p className="text-[#6B5E5E]/70 text-base md:text-lg">
            No design skills, no writing, no technical hassle. Just paste and publish.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative bg-[#FAFAFA] border border-[#6B5E5E]/10 rounded-[32px] p-10 transition-all duration-500 ${step.glow} hover:border-[#6B5E5E]/20 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Animated Border SVG - Continuous moving line */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100% 100%"
                preserveAspectRatio="none"
              >
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="32"
                  fill="none"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth="2"
                  strokeDasharray="1200" // approximate perimeter
                  strokeDashoffset="0"
                  style={{
                    animation: `moveDash ${step.speed}s linear infinite`,
                  }}
                />
                <defs>
                  <linearGradient id={`gradient-${index}`} gradientTransform="rotate(45)">
                    <stop offset="0%" stopColor={step.borderGradient[0]} />
                    <stop offset="100%" stopColor={step.borderGradient[1]} />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inner Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-[32px] pointer-events-none`} />

              {/* Visual Card Asset (Glassmorphism Circle) */}
              <div className="relative w-full aspect-square mb-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent rounded-2xl" />
                <div className="relative z-10 w-32 h-32 rounded-full bg-[#6B5E5E]/5 border border-[#6B5E5E]/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                   <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#6B5E5E]/10 flex items-center justify-center">
                      <div className={step.accent}>{step.icon}</div>
                   </div>
                </div>
              </div>

              {/* Content Details */}
              <h3 className="text-2xl font-semibold text-[#6B5E5E] mb-4 flex items-center justify-between">
                {step.title}
                <ArrowUpRight size={18} className="text-[#6B5E5E]/40 group-hover:text-[#F35D2C] transition-colors" />
              </h3>
              <p className="text-[#6B5E5E]/70 text-sm leading-relaxed mb-8">
                {step.description}
              </p>

              {/* Step Counter */}
              <div className="text-[10px] font-bold text-[#6B5E5E]/40 uppercase tracking-widest border-t border-[#6B5E5E]/10 pt-6">
                Step 0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Proof Section */}
        <div className={`mt-24 text-center transition-all duration-1000 delay-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-xs text-[#6B5E5E]/50 uppercase tracking-[0.3em] mb-8">
                Trusted by 20,000+ affiliates across top networks
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 opacity-30 grayscale hover:opacity-100 transition-opacity">
                <span className="text-lg font-bold tracking-tighter text-[#6B5E5E]">AMAZON</span>
                <span className="text-lg font-bold tracking-tighter text-[#6B5E5E]">CLICKBANK</span>
                <span className="text-lg font-bold tracking-tighter text-[#6B5E5E]">SHOPIFY</span>
                <span className="text-lg font-bold tracking-tighter text-[#6B5E5E]">RAKUTEN</span>
            </div>
        </div>
      </div>

      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#F35D2C]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#006E74]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Keyframes for continuous moving dash */}
      <style jsx>{`
        @keyframes moveDash {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -2400; /* double the dasharray for seamless loop */
          }
        }
      `}</style>
    </section>
  );
}