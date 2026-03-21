"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  // Getting Started
  {
    category: "Getting Started",
    question: "How does the AI generate pages from my affiliate link?",
    answer: "Our AI analyzes the product page, extracts key information like title, description, features, and images. It then generates compelling copy, selects relevant images, and builds a professionally designed blog page and funnel tailored to your audience.",
  },
  {
    category: "Getting Started",
    question: "Do I need any technical skills to use the platform?",
    answer: "No technical skills required. Simply paste your affiliate link, and our platform does the rest. You can edit the generated content with our intuitive inline editor if you wish.",
  },
  {
    category: "Getting Started",
    question: "How long does it take to generate a page?",
    answer: "Most pages are generated in under 30 seconds. Complex funnels with multiple steps may take up to 60 seconds.",
  },
  {
    category: "Getting Started",
    question: "Can I see a preview before publishing?",
    answer: "Yes, after generation you'll see a full preview. You can make edits and only publish when you're satisfied.",
  },

  // Members and Pricing
  {
    category: "Members and Pricing",
    question: "What happens if I cancel my subscription?",
    answer: "You can cancel anytime. Your published pages will remain live, but you'll lose access to editing and premium features. You can export your content before canceling.",
  },
  {
    category: "Members and Pricing",
    question: "Is there a free trial?",
    answer: "Yes, all paid plans include a 14-day free trial. No credit card required to start.",
  },
  {
    category: "Members and Pricing",
    question: "Do you offer discounts for annual billing?",
    answer: "Yes, annual plans include a 20% discount compared to monthly billing.",
  },
  {
    category: "Members and Pricing",
    question: "Can I switch plans later?",
    answer: "Absolutely. You can upgrade or downgrade your plan at any time from your dashboard. Changes are prorated.",
  },

  // Domains & SEO
  {
    category: "Domains & SEO",
    question: "Can I use my own custom domain?",
    answer: "Yes, Pro and Business plans allow you to connect your own custom domain. Free plan uses our subdomain (yourname.amsuite.com).",
  },
  {
    category: "Domains & SEO",
    question: "Will my pages be indexed by search engines?",
    answer: "Absolutely. All pages are SEO-optimized with meta tags, structured data, and fast loading. They are automatically submitted to search engines for indexing.",
  },
  {
    category: "Domains & SEO",
    question: "Can I edit the meta title and description?",
    answer: "Yes, the editor allows you to customize all SEO settings, including meta titles, descriptions, and keywords.",
  },
  {
    category: "Domains & SEO",
    question: "Do you support SSL on custom domains?",
    answer: "Yes, we automatically provision SSL certificates for all custom domains via Let's Encrypt.",
  },

  // Account & Technical Issues
  {
    category: "Account & Technical Issues",
    question: "I forgot my password. How can I reset it?",
    answer: "Click 'Forgot password' on the login page. We'll send a reset link to your email. If you don't receive it within a few minutes, check your spam folder.",
  },
  {
    category: "Account & Technical Issues",
    question: "Can I change my email address?",
    answer: "Yes, you can update your email in Account Settings. A verification email will be sent to the new address.",
  },
  {
    category: "Account & Technical Issues",
    question: "The AI generated content is not accurate. What can I do?",
    answer: "Our AI uses the product page as a source, but sometimes details may be misinterpreted. You can manually edit any part of the generated content. If the issue persists, please contact support.",
  },
  {
    category: "Account & Technical Issues",
    question: "How do I delete my account?",
    answer: "Go to Account Settings and click 'Delete Account'. This will permanently remove all your data and published pages. We recommend exporting any content first.",
  },
];

const categories = [
  "Getting Started",
  "Members and Pricing",
  "Domains & SEO",
  "Account & Technical Issues",
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("Getting Started");

  const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-white text-[#6B5E5E] font-sans overflow-hidden">
      
      {/* Soft Background Gradients – using palette colors very subtly */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#F35D2C]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#006E74]/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 lg:grid lg:grid-cols-12 lg:gap-20 items-start">
        
        {/* Left Column: Header & Categories (Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 mb-16 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#6B5E5E]">
            Frequently asked <span className="text-[#F35D2C]">questions</span>
          </h1>
          <p className="text-[#6B5E5E]/70 mb-10 text-lg leading-relaxed max-w-sm">
            Everything you need to know about features, membership, and troubleshooting.
          </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-[#F35D2C] text-white shadow-md"
                    : "bg-white border border-[#006E74]/20 text-[#6B5E5E]/70 hover:border-[#F35D2C]/30 hover:text-[#F35D2C]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: FAQ Accordions & Support Card */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex flex-col mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div key={index} className="border-b border-[#006E74]/10 pb-6">
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="w-full flex items-center justify-between text-left group"
                        >
                          <h3 className="text-lg font-medium pr-8 text-[#6B5E5E] group-hover:text-[#F35D2C] transition-colors">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0 text-[#006E74] group-hover:text-[#F35D2C] transition-colors">
                            {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                          </div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="pt-4 text-[#6B5E5E]/70 leading-relaxed">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[#6B5E5E]/50 italic py-8">No questions in this category yet.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* "Still have questions?" Card */}
          <div className="bg-[#FAFAFA] border border-[#006E74]/20 rounded-[24px] p-8 md:p-10">
            <h4 className="text-xl font-bold text-[#6B5E5E] mb-3">Still have questions?</h4>
            <p className="text-[#6B5E5E]/70 mb-8 text-sm md:text-base leading-relaxed max-w-md">
              Contact our support team and we will make sure everything is clear and intuitive for you!
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#F35D2C] hover:bg-opacity-90 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}