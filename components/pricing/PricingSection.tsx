"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Crown, Rocket, ChevronRight } from "lucide-react";

const plans = [
  {
    name: "Base",
    icon: <Rocket className="w-5 h-5" />,
    description: "Perfect for beginners testing the waters.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1 generated page per month",
      "Basic AI analysis",
      "Standard blog templates",
      "Community support",
    ],
    accent: "#006E74",
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Premium",
    icon: <Zap className="w-5 h-5" />,
    description: "For serious affiliates ready to scale.",
    monthlyPrice: 10,
    yearlyPrice: 99,
    features: [
      "10 generated pages per month",
      "Advanced AI analysis",
      "All funnel templates",
      "SEO optimization",
      "Custom domain",
      "Priority support",
    ],
    accent: "#F35D2C",
    cta: "Upgrade Now",
    popular: true,
  },
  {
    name: "Unlimited",
    icon: <Crown className="w-5 h-5" />,
    description: "The ultimate plan for agencies & power users.",
    monthlyPrice: 25,
    yearlyPrice: 249,
    features: [
      "Unlimited pages",
      "Priority AI analysis",
      "Custom funnel builder",
      "Team collaboration",
      "White‑label reports",
      "API access",
    ],
    accent: "#F35D2C",
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-24 bg-white text-[#6B5E5E] overflow-hidden">
      {/* Background elements – subtle glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F35D2C]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#006E74]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-[#006E74]/20 bg-[#006E74]/5 text-xs font-medium tracking-[0.2em] uppercase text-[#F35D2C] inline-block mb-4"
          >
            Simple, Transparent Pricing
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[#6B5E5E]">
            Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F35D2C] to-[#006E74]">level up?</span>
          </h2>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isYearly ? "text-[#6B5E5E]" : "text-[#6B5E5E]/50"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="group relative w-14 h-7 rounded-full bg-[#006E74]/20 p-1 transition-all hover:bg-[#006E74]/30"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 rounded-full bg-[#F35D2C] shadow-[0_0_15px_rgba(243,93,44,0.3)]"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isYearly ? "text-[#6B5E5E]" : "text-[#6B5E5E]/50"}`}>
                Yearly
              </span>
              <span className="bg-[#F35D2C]/10 text-[#F35D2C] text-[10px] px-2 py-0.5 rounded-md font-bold border border-[#F35D2C]/20">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative group p-8 rounded-[32px] border transition-all duration-500 ${
                plan.popular
                  ? "bg-white border-[#F35D2C]/30 shadow-[0_30px_100px_rgba(243,93,44,0.1)] scale-105"
                  : "bg-white border-[#006E74]/10 hover:border-[#006E74]/30"
              }`}
            >
              {/* Top accent line for popular plan */}
              {plan.popular && (
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#F35D2C] to-transparent" />
              )}

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="p-3 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${plan.accent}10` }}
                >
                  <div style={{ color: plan.accent }}>{plan.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#6B5E5E]">{plan.name}</h3>
                  <p className="text-[#6B5E5E]/50 text-xs">{plan.description}</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-[#6B5E5E]">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-[#6B5E5E]/50 text-sm">
                    /{isYearly ? 'yr' : 'mo'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 group/item">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#006E74]/10 border border-[#006E74]/20 flex items-center justify-center group-hover/item:border-[#F35D2C]/30 transition-colors">
                      <Check className="w-3 h-3" style={{ color: plan.accent }} />
                    </div>
                    <span className="text-sm text-[#6B5E5E]/70 group-hover/item:text-[#6B5E5E] transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-[#F35D2C] text-white hover:bg-opacity-90"
                    : "bg-[#006E74]/10 text-[#006E74] border border-[#006E74]/20 hover:bg-[#006E74]/20"
                }`}
              >
                {plan.cta}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 text-[#6B5E5E]/50 text-sm"
        >
          All plans include a 14‑day free trial. No credit card required. <br />
          Need a custom solution?{" "}
          <span className="text-[#F35D2C] cursor-pointer hover:underline">Contact our sales team</span>
        </motion.p>
      </div>
    </section>
  );
}