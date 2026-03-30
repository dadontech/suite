"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Mail, ArrowLeft } from "lucide-react";

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 font-sans">

      {/* Logo — top left */}
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
          <div className="w-20 h-20 rounded-2xl bg-[#F35D2C]/10 flex items-center justify-center">
            <Mail size={36} className="text-[#F35D2C]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#6B5E5E] mb-3">
          Check your inbox
        </h1>
        <p className="text-[#6B5E5E]/70 text-sm leading-relaxed mb-8">
          We&apos;ve sent a confirmation link to your email address.
          Click the link to activate your account and get started.
        </p>

        {/* Info card */}
        <div className="bg-[#FAFAFA] border border-[#006E74]/10 rounded-2xl p-5 mb-8 text-left space-y-3">
          {[
            "Check your spam or junk folder if you don't see it",
            "The link expires in 24 hours",
            "You must confirm before signing in",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F35D2C] mt-1.5 shrink-0" />
              <p className="text-sm text-[#6B5E5E]/70">{tip}</p>
            </div>
          ))}
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-[#6B5E5E]/60 hover:text-[#F35D2C] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </motion.div>
    </div>
  );
}