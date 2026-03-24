"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowLeft, Send, Mail, RotateCcw, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#6B5E5E] flex font-sans">

      {/* ── LEFT PANEL ── */}
      <div className="w-full lg:w-[50%] flex flex-col bg-white overflow-y-auto relative">

        {/* Logo — pinned top, never affects centering */}
        <div className="absolute top-0 left-0 right-0 px-8 md:px-16 py-6 z-10">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 bg-[#F35D2C] rounded-lg flex items-center justify-center shadow-lg shadow-orange-200">
              <Zap size={18} className="text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#6B5E5E]">
              Amsuite<span className="text-[#F35D2C]">.</span>
            </span>
          </Link>
        </div>

        {/* Form — perfectly centered */}
        <div className="flex-1 flex items-center justify-center px-8 md:px-16">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-8">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1.5 text-sm text-[#6B5E5E]/50 hover:text-[#F35D2C] transition-colors mb-6"
                    >
                      <ArrowLeft size={14} /> Back to Sign In
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#6B5E5E]">
                      Forgot Password?
                    </h1>
                    <p className="text-[#6B5E5E]/70 text-sm leading-relaxed">
                      No worries. Enter your email and we&apos;ll send you reset instructions.
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[#6B5E5E]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="affiliate@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-[#006E74]/20 rounded-2xl px-4 py-3 text-sm text-[#6B5E5E] focus:outline-none focus:ring-2 focus:ring-[#F35D2C]/30 focus:border-transparent transition-all bg-white placeholder-[#6B5E5E]/30"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#F35D2C] hover:bg-opacity-90 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <Send size={15} />
                      Send Reset Instructions
                    </button>
                  </form>

                  <p className="text-center text-sm text-[#6B5E5E]/70 mt-8">
                    Remember your password?{" "}
                    <Link href="/login" className="text-[#F35D2C] font-semibold hover:underline">
                      Sign In
                    </Link>
                  </p>
                </motion.div>

              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-[#F35D2C]/10 rounded-2xl flex items-center justify-center border border-[#F35D2C]/15">
                      <Mail size={30} className="text-[#F35D2C]" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2 border-[#F35D2C]/20"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-[#6B5E5E] mb-2">Check your inbox</h2>
                  <p className="text-sm text-[#6B5E5E]/60 mb-1">We sent a reset link to</p>
                  <p className="text-sm font-bold text-[#F35D2C] mb-8 break-all">{email}</p>

                  <div className="w-full bg-[#FAFAFA] border border-[#006E74]/10 rounded-2xl p-5 text-left space-y-3 mb-6">
                    {[
                      "The link expires in 30 minutes.",
                      "Check your spam folder if you don't see it.",
                      "You can only use the link once.",
                    ].map((tip, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={13} className="text-[#006E74] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-[#6B5E5E]/60 leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full border border-[#006E74]/20 text-[#6B5E5E] font-semibold py-3 rounded-2xl hover:bg-[#006E74]/5 transition-all text-sm flex items-center justify-center gap-2 mb-5"
                  >
                    <RotateCcw size={13} /> Resend Email
                  </button>

                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-colors"
                  >
                    <ArrowLeft size={13} /> Back to Sign In
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="hidden lg:flex flex-1 bg-[#FAFAFA] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, #006E74 0px, #006E74 1px, transparent 1px, transparent 40px)` }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(90deg, #006E74 0px, #006E74 1px, transparent 1px, transparent 40px)` }} />
        <div className="absolute w-[500px] h-[500px] bg-[#F35D2C]/10 blur-[120px] rounded-full" />

        <div className="relative z-10 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative border border-[#006E74]/20 bg-white rounded-2xl p-1 shadow-[0_0_50px_rgba(243,93,44,0.1)]"
          >
            <div className="border border-[#006E74]/10 rounded-xl p-8 h-[480px] relative overflow-hidden flex flex-col">
              <div className="flex gap-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#F35D2C]" />
                <div className="w-12 h-1 bg-[#006E74]/20 rounded-full" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 bg-[#F35D2C]/10 rounded-2xl flex items-center justify-center border border-[#F35D2C]/20"
                >
                  <Mail size={36} className="text-[#F35D2C]" />
                </motion.div>
                <div className="w-full space-y-2">
                  {[80, 60, 70].map((w, i) => (
                    <motion.div key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                      style={{ width: `${w}%` }}
                      className="h-1.5 bg-[#006E74]/10 rounded-full mx-auto origin-left"
                    />
                  ))}
                </div>
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-[#F35D2C]" />
                  <motion.div animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-[#F35D2C]"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F35D2C]/5 to-transparent pointer-events-none -rotate-12" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}