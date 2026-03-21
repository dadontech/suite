"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, Rocket, Users, Briefcase, BookOpen, FileText, HelpCircle, BookMarked } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: "Templates",
      href: "#",
      dropdown: [
        {
          label: "Blog Templates",
          sub: "AI‑generated blog posts optimized for affiliate marketing",
          icon: <Rocket size={18} />,
          href: "/blog-templates"
        },
        {
          label: "Funnel Templates",
          sub: "High‑converting sales funnels for any product",
          icon: <Users size={18} />,
          href: "/funnel-templates"
        },
        {
          label: "Landing Pages",
          sub: "Professional pages to capture leads and sales",
          icon: <Briefcase size={18} />,
          href: "/page-templates"
        },
      ],
      footer: "Learn more about templates",
    },
    {
      label: "Tools",
      href: "#",
      dropdown: [
        {
          label: "Link Analyzer",
          sub: "Extract product insights and audience data",
          icon: <Rocket size={18} />,
          href: "/analyzer-page"
        },
        {
          label: "SEO Checker",
          sub: "Audit and improve your page's search ranking",
          icon: <Briefcase size={18} />,
          href: "/seo-checker"
        },
      ],
    },
    {
      label: "Resources",
      href: "#",
      dropdown: [
        {
          label: "Blog",
          sub: "Affiliate marketing tips and platform updates",
          icon: <FileText size={18} />,
          href: "/blog"
        },
        {
          label: "Help Center",
          sub: "Guides, tutorials, and FAQs",
          icon: <HelpCircle size={18} />,
          href: "/help-center"
        },
        {
          label: "Affiliate Guide",
          sub: "Step‑by‑step playbook for beginners",
          icon: <BookMarked size={18} />,
          href: "/affiliate-guide"
        },
        {
          label: "Community",
          sub: "Join discussions with other affiliates",
          icon: <Users size={18} />,
          href: "/community"
        },
        {
          label: "Case Studies",
          sub: "Real success stories from our users",
          icon: <Briefcase size={18} />,
          href: "/case-studies"
        },
      ],
    },
    { label: "Pricing", href: "/pricing", dropdown: null },
  ];

  return (
    <nav className="bg-white border-b border-[#006E74]/10 sticky top-0 z-50 py-4">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-12">
          
          {/* LEFT: Logo */}
          <div className="flex flex-1 justify-start">
            <Link href="/" className="text-2xl font-bold text-[#F35D2C] tracking-tight">
              Amsuite
            </Link>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.label} className="relative group px-3 py-2">
                <Link
                  href={item.href}
                  className="flex items-center text-[#6B5E5E] hover:text-[#006E74] text-[15px] font-semibold transition-colors"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={14} className="ml-1 text-[#6B5E5E] group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && item.dropdown.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[320px] bg-white border border-[#006E74]/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                    <div className="p-4 space-y-1">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.label}
                          href={dropItem.href}
                          className="flex items-start p-3 rounded-xl hover:bg-[#006E74]/5 transition-colors group/item"
                        >
                          <div className="mt-1 mr-3 text-[#6B5E5E]/60 group-hover/item:text-[#F35D2C]">
                            {dropItem.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#6B5E5E]">{dropItem.label}</div>
                            <div className="text-xs text-[#6B5E5E]/60 leading-tight mt-0.5">{dropItem.sub}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {item.footer && (
                      <div className="bg-[#006E74]/5 p-4 border-t border-[#006E74]/10">
                        <Link href="#" className="flex items-center text-xs font-semibold text-[#006E74] hover:text-[#F35D2C]">
                           <BookOpen size={14} className="mr-2" /> {item.footer} →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: Auth Buttons */}
          <div className="hidden md:flex items-center justify-end space-x-3 flex-1">
            <Link 
              href="/login" 
              className="px-6 py-2.5 rounded-full border border-[#006E74] text-[#006E74] text-[15px] font-medium hover:bg-[#006E74]/5 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#F35D2C] text-white px-6 py-2.5 rounded-full text-[15px] font-medium hover:bg-opacity-90 transition"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#6B5E5E]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#006E74]/10 p-4 space-y-4">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="block text-lg font-semibold text-[#6B5E5E]">
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#006E74]/10 flex flex-col space-y-3">
            <Link 
              href="/login" 
              className="text-center font-semibold border border-[#006E74] text-[#006E74] py-3 rounded-full hover:bg-[#006E74]/5"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="bg-[#F35D2C] text-white py-3 rounded-full text-center font-semibold hover:bg-opacity-90"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}