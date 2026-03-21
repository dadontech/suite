"use client";

import { useState } from "react";
import {
  Zap,
  Search,
  Edit3,
  Layout,
  Globe,
  BarChart,
  Shield,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import { useInView } from "./hooks/useInView";

export default function FeaturesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Our AI instantly analyzes any affiliate link, extracting product details, key selling points, and target audience insights.",
      color: "#F35D2C",
      baseFlex: 2, // larger card
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Optimized",
      description: "Every generated page includes meta tags, structured data, and fast loading to rank high.",
      color: "#006E74",
      baseFlex: 1,
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Easy Editing",
      description: "Tweak headlines, images, and copy with our intuitive inline editor. No coding required.",
      color: "#F35D2C",
      baseFlex: 1,
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Funnel Templates",
      description: "Choose from proven structures: lead magnets, reviews, comparisons, and more.",
      color: "#006E74",
      baseFlex: 1,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Custom Domains",
      description: "Publish on your own domain or use our subdomain. Either way, your page goes live instantly.",
      color: "#F35D2C",
      baseFlex: 2,
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Built-in Analytics",
      description: "Track views, clicks, and conversions. Know exactly how your pages are performing.",
      color: "#006E74",
      baseFlex: 1,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Link Cloaking",
      description: "Keep your affiliate links clean and trustworthy with automatic cloaking.",
      color: "#F35D2C",
      baseFlex: 1,
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Responsive",
      description: "All pages look stunning on any device – desktop, tablet, or phone.",
      color: "#006E74",
      baseFlex: 1,
    },
  ];

  // Define rows by indices (exactly as before)
  const rows = [
    [0, 1, 2], // Row 1: AI (flex 2), SEO (1), Easy (1)
    [3, 4, 5], // Row 2: Funnel (1), Custom (2), Analytics (1)
    [6, 7],    // Row 3: LinkCloak (1), Mobile (1)
  ];

  // For a given row and its indices, compute flex values for each card in that row
  const getRowFlexValues = (rowIndices: number[]) => {
    return rowIndices.map((index) => {
      if (hoveredIndex === null) return features[index].baseFlex;
      if (hoveredIndex === index) return 2; // hovered card expands to 2
      if (rowIndices.includes(hoveredIndex)) {
        // If a card in this row is hovered, any card originally flex 2 becomes flex 1
        if (features[index].baseFlex === 2) return 1;
      }
      return features[index].baseFlex;
    });
  };

  return (
    <section id="features" ref={ref} className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Background Perspective Grid */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#6B5E5E20_1px,transparent_1px),linear-gradient(to_bottom,#6B5E5E20_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Floating Decorative Stats */}
      <div className="absolute top-[15%] left-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1.5 h-1.5 bg-[#006E74] rotate-45" />
          </div>
          <div>
            <p className="text-xs text-[#6B5E5E]">• Features</p>
            <p className="text-[10px] text-[#6B5E5E]/60">8 capabilities</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[20%] right-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-xs text-[#6B5E5E]">• Benefits</p>
            <p className="text-[10px] text-[#6B5E5E]/60">AI powered</p>
          </div>
          <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1.5 h-1.5 border-r border-b border-[#006E74] rotate-45" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-flex items-center gap-2 bg-[#006E74]/10 border border-[#006E74]/20 px-4 py-1.5 rounded-full text-[10px] font-medium mb-6 uppercase tracking-[0.2em] text-[#6B5E5E]">
            <span className="w-2 h-2 rounded-full bg-[#F35D2C] animate-pulse" />
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-6xl font-semibold text-[#6B5E5E] mb-6 tracking-tight leading-tight">
            Everything you need to <br />
            <span className="bg-gradient-to-r from-[#6B5E5E] to-[#9B8F8F] bg-clip-text text-transparent">succeed as an affiliate</span>
          </h2>

          <p className="text-[#6B5E5E]/70 text-base md:text-lg">
            Powerful features that save you time and boost conversions.
          </p>
        </div>

        {/* Rows */}
        <div className="space-y-6">
          {rows.map((rowIndices, rowIndex) => {
            const flexValues = getRowFlexValues(rowIndices);
            return (
              <div key={rowIndex} className="flex gap-6">
                {rowIndices.map((cardIndex, posInRow) => {
                  const feature = features[cardIndex];
                  const flexValue = flexValues[posInRow];
                  return (
                    <div
                      key={cardIndex}
                      className={`group relative bg-[#FAFAFA] border border-[#006E74]/20 rounded-[32px] p-8 transition-all duration-700 ease-in-out hover:border-[#006E74]/40 hover:shadow-[0_0_40px_-15px_rgba(0,110,116,0.2)] flex flex-col justify-between ${
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                      }`}
                      style={{
                        flex: `${flexValue} 1 0px`,
                        transitionDelay: `${cardIndex * 50}ms`,
                        willChange: 'flex, border-color, box-shadow',
                      }}
                      onMouseEnter={() => setHoveredIndex(cardIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Inner Gradient Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none"
                        style={{ background: `radial-gradient(circle at 10% 10%, ${feature.color}15 0%, transparent 60%)` }}
                      />

                      <div className="relative z-10 flex justify-between items-start">
                        {/* Glassmorphic Icon */}
                        <div
                          className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center border border-[#6B5E5E]/10 backdrop-blur-xl bg-[#6B5E5E]/5 group-hover:scale-110 transition-transform duration-700 ease-in-out shadow-lg"
                          style={{ color: feature.color }}
                        >
                          {feature.icon}
                        </div>
                        <ArrowUpRight size={18} className="text-[#6B5E5E]/40 group-hover:text-[#F35D2C] transition-colors duration-700 ease-in-out" />
                      </div>

                      <div className="relative z-10 mt-auto">
                        <h3 className="text-xl font-bold text-[#6B5E5E] mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-[#6B5E5E]/60 leading-relaxed line-clamp-2 group-hover:text-[#6B5E5E]/80 transition-colors duration-700 ease-in-out">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className={`mt-20 flex flex-col items-center transition-all duration-1000 delay-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="bg-[#006E74]/10 border border-[#006E74]/20 p-2 rounded-full flex items-center gap-6 px-8 backdrop-blur-md">
            <p className="text-sm text-[#6B5E5E]/70">Ready to create your first page?</p>
            <div className="h-6 w-[1px] bg-[#006E74]/20" />
            <button className="bg-[#F35D2C] text-white text-xs font-bold py-2.5 px-6 rounded-full hover:bg-opacity-90 transition-all duration-700 ease-in-out active:scale-95 shadow-[0_0_20px_rgba(243,93,44,0.3)]">
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Background Ambient Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#F35D2C]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#006E74]/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}