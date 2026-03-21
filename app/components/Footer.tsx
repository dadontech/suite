"use client";

import { motion } from "framer-motion";
import { useInView } from "@/app/landing-page/hooks/useInView";
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "pricing" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "faqq" },
    ],
    company: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" },
    ],
    resources: [
      { label: "Documentation", href: "/documentation" },
      { label: "Help Center", href: "/help-center" },
      { label: "Affiliate Guide", href: "/affiliate-guide" },
      { label: "API Status", href: "/api-status" },
      { label: "Community", href: "/community" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" },
      { label: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    { icon: <Twitter size={18} />, href: "https://twitter.com/amsuite", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "https://instagram.com/amsuite", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/company/amsuite", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "https://github.com/amsuite", label: "GitHub" },
  ];

  return (
    <footer ref={ref} className="relative bg-white pt-24 pb-12 overflow-hidden text-[#6B5E5E] border-t border-[#006E74]/10">
      {/* 1. BACKGROUND DESIGN ELEMENTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6B5E5E10_1px,transparent_1px),linear-gradient(to_bottom,#6B5E5E10_1px,transparent_1px)] bg-[size:80px_80px] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#F35D2C]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Decorative Stats */}
      <div className="absolute top-[10%] left-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1 h-1 bg-[#006E74] rotate-45" />
          </div>
          <div>
            <p className="text-xs text-[#6B5E5E]">• Contact</p>
            <p className="text-[8px] text-[#6B5E5E]/60">support@amsuite.com</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[15%] right-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-xs text-[#6B5E5E]">• Social</p>
            <p className="text-[8px] text-[#6B5E5E]/60">follow us</p>
          </div>
          <div className="w-5 h-5 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1 h-1 border-r border-b border-[#006E74] rotate-45" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 2. MASSIVE BRAND SECTION */}
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[15vw] lg:text-[12rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#6B5E5E]/10 to-[#6B5E5E]/5 select-none uppercase"
          >
            Amsuite
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 -mt-12 lg:-mt-20 px-2">
            <div>
              <p className="text-xl md:text-2xl text-[#6B5E5E]/70 font-light max-w-md leading-relaxed">
                Turn any affiliate link into a <span className="text-[#6B5E5E] font-medium">high-converting page</span> in seconds. AI-powered, SEO-optimized.
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end justify-end gap-6">
              <div className="flex items-center gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.1, color: "#F35D2C" }}
                    className="w-12 h-12 rounded-2xl bg-[#FAFAFA] border border-[#006E74]/20 flex items-center justify-center text-[#6B5E5E] transition-all hover:bg-white"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. MODERN GRID LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 border-y border-[#006E74]/10 py-16">
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <div key={title}>
              <h4 className="text-[#F35D2C] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-[#6B5E5E]/70 hover:text-[#F35D2C] transition-colors text-sm font-medium flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-[#F35D2C]">—</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 4. CONTACT & NEWSLETTER BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center pb-12">
          {/* Contact Details */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3 text-sm text-[#6B5E5E]/70">
                <div className="w-8 h-8 rounded-full bg-[#006E74]/10 flex items-center justify-center text-[#006E74]">
                  <Mail size={14} />
                </div>
                <a href="mailto:support@amsuite.com" className="hover:text-[#F35D2C] transition-colors">support@amsuite.com</a>
             </div>
             <div className="flex items-center gap-3 text-sm text-[#6B5E5E]/70">
                <div className="w-8 h-8 rounded-full bg-[#006E74]/10 flex items-center justify-center text-[#006E74]">
                  <MapPin size={14} />
                </div>
                <span>San Francisco, CA — Global HQ</span>
             </div>
          </div>

          {/* Newsletter (Command Bar Style) */}
          <div className="relative group lg:col-span-2 max-w-xl lg:ml-auto w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F35D2C] to-[#006E74] rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative flex bg-[#FAFAFA] border border-[#006E74]/20 rounded-full p-1.5">
              <input
                type="email"
                placeholder="Join the newsletter for updates"
                className="flex-1 bg-transparent px-6 text-sm text-[#6B5E5E] focus:outline-none placeholder:text-[#6B5E5E]/50"
              />
              <button className="bg-[#F35D2C] text-white px-6 py-3 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-opacity-90 transition-all">
                Get updates <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 5. FINAL COPYRIGHT */}
        <div className="pt-8 border-t border-[#006E74]/10 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[10px] text-[#6B5E5E]/50 uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Amsuite / Built for Affiliates
          </p>
          <div className="flex items-center gap-2 text-[10px] text-[#6B5E5E]/50 uppercase tracking-widest font-bold">
            <Sparkles size={10} className="text-[#F35D2C]" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}