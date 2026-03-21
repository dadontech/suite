"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "./hooks/useInView";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Health & Wellness Affiliate",
    content: "I've tripled my conversions since using this platform. The AI writes better copy than I ever could, and the funnel templates are proven winners.",
    avatar: "AR",
    color: "#F35D2C",
  },
  {
    name: "Sarah Chen",
    role: "Tech Reviewer",
    content: "The SEO optimization alone is worth it. My pages rank on first page within weeks. Plus the editor is so intuitive – I can tweak anything in minutes.",
    avatar: "SC",
    color: "#006E74",
  },
  {
    name: "Marcus Webb",
    role: "E-commerce Affiliate",
    content: "I was skeptical at first, but the link analyzer understood my product perfectly. The generated page looked professional and converted 8% on day one.",
    avatar: "MW",
    color: "#F35D2C",
  },
  {
    name: "Priya Kapoor",
    role: "Digital Course Creator",
    content: "Being able to publish on my own domain is huge. The platform handles all the technical stuff so I can focus on promoting. Highly recommend.",
    avatar: "PK",
    color: "#006E74",
  },
];

export default function TestimonialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // AUTOMATIC ANIMATION LOGIC
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Swaps every 5 seconds

    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 30 : -30,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 30 : -30,
      transition: {
        duration: 0.4,
      },
    }),
  };

  return (
    <section id="testimonials" ref={ref} className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6B5E5E10_1px,transparent_1px),linear-gradient(to_bottom,#6B5E5E10_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Floating Decorative Stats */}
      <div className="absolute top-[15%] left-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1.5 h-1.5 bg-[#006E74] rotate-45" />
          </div>
          <div>
            <p className="text-xs text-[#6B5E5E]">• Testimonials</p>
            <p className="text-[10px] text-[#6B5E5E]/60">4.9/5 rating</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[20%] right-[5%] opacity-30 hidden lg:block">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-xs text-[#6B5E5E]">• Social proof</p>
            <p className="text-[10px] text-[#6B5E5E]/60">1,200+ reviews</p>
          </div>
          <div className="w-6 h-6 rounded-full border border-[#006E74] flex items-center justify-center bg-white">
            <div className="w-1.5 h-1.5 border-r border-b border-[#006E74] rotate-45" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#6B5E5E] mb-6 tracking-tight leading-tight">
              Trusted by affiliates <br />
              <span className="bg-gradient-to-r from-[#F35D2C] to-[#ff8e6e] bg-clip-text text-transparent">worldwide</span>
            </h2>
            <p className="text-[#6B5E5E]/70 text-base md:text-lg">
              Join thousands of happy affiliates who’ve boosted their income.
            </p>
          </motion.div>
        </div>

        {/* AUTOMATIC CAROUSEL */}
        <div className="relative h-[450px] flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full max-w-[500px] bg-white border border-[#6B5E5E]/10 rounded-[40px] p-10 md:p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] flex flex-col items-center text-center"
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg"
                style={{ backgroundColor: testimonials[currentIndex].color }}
              >
                {testimonials[currentIndex].avatar}
              </div>

              <div>
                <h4 className="font-bold text-[#6B5E5E] text-xl">{testimonials[currentIndex].name}</h4>
                <p className="text-xs text-[#6B5E5E]/50 uppercase tracking-widest mt-1">{testimonials[currentIndex].role}</p>
              </div>

              <div className="flex justify-center gap-1 my-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#F35D2C] text-[#F35D2C]" />
                ))}
                <span className="ml-2 text-[#6B5E5E] font-bold text-sm">5.0</span>
              </div>

              <p className="text-[#6B5E5E]/80 text-lg leading-relaxed font-light italic relative px-4">
                <Quote className="absolute -top-4 -left-2 w-8 h-8 text-[#6B5E5E]/5" />
                &quot;{testimonials[currentIndex].content}&quot;
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Background Decorative Stacks (review.png style) */}
          <div className="absolute w-[450px] h-[400px] bg-gray-50/50 border border-[#6B5E5E]/5 rounded-[40px] translate-x-8 translate-y-4 -z-10 hidden md:block" />
          <div className="absolute w-[450px] h-[400px] bg-gray-50/30 border border-[#6B5E5E]/5 rounded-[40px] translate-x-16 translate-y-8 -z-20 hidden md:block" />
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-4 mt-12">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-[#6B5E5E]/10 flex items-center justify-center text-[#6B5E5E] hover:bg-gray-50 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-[#6B5E5E]/10 flex items-center justify-center text-[#6B5E5E] hover:bg-gray-50 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Proof Text */}
        <div className="mt-20 text-center">
          <p className="text-[10px] text-[#6B5E5E]/40 uppercase tracking-[0.5em]">
            Trusted by 1,200+ affiliates worldwide
          </p>
        </div>
      </div>
    </section>
  );
}