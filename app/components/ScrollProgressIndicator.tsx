"use client";

import { useEffect, useState } from "react";

const sections = [
  "hero",
  "how-it-works",
  "features",
  "testimonials",
  "pricing",
  "final-cta",
];

export default function ScrollProgressIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtFooter, setIsAtFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const footer = document.querySelector("footer");
      const footerTop = footer?.offsetTop || Infinity;

      // Check if footer is in view (near bottom)
      if (scrollPosition >= footerTop - window.innerHeight / 2) {
        setIsAtFooter(true);
        return;
      } else {
        setIsAtFooter(false);
      }

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAtFooter) return null; // Hide when footer is visible

  return (
    <div className="fixed right-8 top-230 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-3">
      {/* "Amsuite horizons" text */}
      <p className="text-[9px] text-[#6B5E5E]/60 uppercase tracking-widest">
        Amsuite horizons
      </p>
      {/* Steps */}
      <div className="flex gap-1">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-0.5 transition-all duration-300 ${
              index === activeIndex
                ? "bg-[#F35D2C] w-8"
                : "bg-[#6B5E5E]/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}