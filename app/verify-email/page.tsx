"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";

function VerifyEmailContent() {
  const params  = useSearchParams();
  const success = params.get("success");
  const error   = params.get("error");

  const states = {
    success: {
      icon:    <CheckCircle2 size={36} className="text-[#006E74]" />,
      bg:      "bg-[#006E74]/10",
      title:   "Email confirmed!",
      message: "Your account is now active. You can sign in and start using Amsuite.",
      cta:     { label: "Go to Sign In", href: "/login" },
    },
    expired: {
      icon:    <Clock size={36} className="text-amber-500" />,
      bg:      "bg-amber-50",
      title:   "Link expired",
      message: "This confirmation link has expired. Sign up again to receive a new one.",
      cta:     { label: "Back to Sign Up", href: "/signup" },
    },
    invalid: {
      icon:    <XCircle size={36} className="text-red-500" />,
      bg:      "bg-red-50",
      title:   "Invalid link",
      message: "This confirmation link is invalid or has already been used.",
      cta:     { label: "Back to Sign Up", href: "/signup" },
    },
    server: {
      icon:    <XCircle size={36} className="text-red-500" />,
      bg:      "bg-red-50",
      title:   "Something went wrong",
      message: "We couldn't verify your email. Please try again or contact support.",
      cta:     { label: "Back to Sign Up", href: "/signup" },
    },
  };

  const key   = success ? "success" : (error as keyof typeof states) ?? "invalid";
  const state = states[key] ?? states.invalid;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 font-sans">

      {/* Logo */}
      <div className="absolute top-0 left-0 px-8 py-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-[#F35D2C] rounded-lg flex items-center justify-center shadow-lg shadow-orange-200">
            <Zap size={18} className="text-white" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#6B5E5E]">
            Amsuite<span className="text-[#F35D2C]">.</span>
          </span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-2xl ${state.bg} flex items-center justify-center`}>
            {state.icon}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#6B5E5E] mb-3">
          {state.title}
        </h1>
        <p className="text-[#6B5E5E]/70 text-sm leading-relaxed mb-8">
          {state.message}
        </p>

        <Link
          href={state.cta.href}
          className="inline-flex items-center gap-2 bg-[#F35D2C] text-white font-semibold px-6 py-3 rounded-2xl hover:bg-opacity-90 transition-all shadow-md"
        >
          {state.cta.label}
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}