"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Zap, Eye, EyeOff, ArrowLeft, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

const requirements = [
  { label: "8+ characters",     test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter",  test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number",        test: (p: string) => /[0-9]/.test(p) },
  { label: "Special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const strengthLabel = (n: number) => ["", "Weak", "Fair", "Good", "Strong"][n] ?? "";
const strengthColor  = (n: number) =>
  ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-[#006E74]"][n] ?? "bg-[#006E74]";

export default function ResetPasswordPage() {
  const [showPw, setShowPw]       = useState(false);
  const [showCf, setShowCf]       = useState(false);
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const passed   = requirements.filter((r) => r.test(password)).length;
  const allMet   = passed === requirements.length;
  const matches  = password === confirm && confirm.length > 0;
  const canSubmit = allMet && matches;


const searchParams = useSearchParams();
const token = searchParams.get("token");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  if (res.ok) setSubmitted(true);
};

  return (
    <div className="min-h-screen bg-white text-[#6B5E5E] flex font-sans">

      {/* ── LEFT PANEL ── */}
      <div className="w-full lg:w-[50%] flex flex-col bg-white overflow-y-auto relative">

        {/* Logo — pinned top */}
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
                      href="/forgot-password"
                      className="inline-flex items-center gap-1.5 text-sm text-[#6B5E5E]/50 hover:text-[#F35D2C] transition-colors mb-6"
                    >
                      <ArrowLeft size={14} /> Back
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#6B5E5E]">
                      Reset Password
                    </h1>
                    <p className="text-[#6B5E5E]/70 text-sm leading-relaxed">
                      Choose a strong new password for your account.
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* New Password */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[#6B5E5E]">New Password</label>
                      <div className="relative">
                        <input
                          type={showPw ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full border border-[#006E74]/20 rounded-2xl px-4 py-3 text-sm text-[#6B5E5E] focus:outline-none focus:ring-2 focus:ring-[#F35D2C]/30 transition-all pr-12 placeholder-[#6B5E5E]/30 bg-white"
                        />
                        <button type="button" onClick={() => setShowPw(!showPw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-colors">
                          {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {/* Strength bar */}
                      {password.length > 0 && (
                        <div className="space-y-1 pt-0.5">
                          <div className="flex gap-1">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i}
                                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                                  i < passed ? strengthColor(passed) : "bg-[#006E74]/10"
                                }`}
                              />
                            ))}
                          </div>
                          <p className={`text-[11px] font-semibold ${
                            passed <= 1 ? "text-red-400" : passed === 2 ? "text-yellow-500" : passed === 3 ? "text-blue-400" : "text-[#006E74]"
                          }`}>
                            {strengthLabel(passed)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Requirements */}
                    <AnimatePresence>
                      {password.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-2 gap-x-4 gap-y-2 bg-[#FAFAFA] rounded-2xl p-4 border border-[#006E74]/10 overflow-hidden"
                        >
                          {requirements.map((r) => {
                            const ok = r.test(password);
                            return (
                              <div key={r.label}
                                className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                                  ok ? "text-[#006E74]" : "text-[#6B5E5E]/35"
                                }`}>
                                <CheckCircle2 size={11} className={ok ? "text-[#006E74]" : "text-[#6B5E5E]/20"} />
                                {r.label}
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[#6B5E5E]">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showCf ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirm}
                          onChange={(e) => setConfirm(e.target.value)}
                          required
                          className={`w-full border rounded-2xl px-4 py-3 text-sm text-[#6B5E5E] focus:outline-none focus:ring-2 transition-all pr-12 placeholder-[#6B5E5E]/30 bg-white ${
                            confirm.length > 0
                              ? matches
                                ? "border-[#006E74]/40 focus:ring-[#006E74]/20"
                                : "border-red-300 focus:ring-red-200"
                              : "border-[#006E74]/20 focus:ring-[#F35D2C]/30"
                          }`}
                        />
                        <button type="button" onClick={() => setShowCf(!showCf)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-colors">
                          {showCf ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {confirm.length > 0 && !matches && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="text-[11px] text-red-400 font-medium">
                            Passwords do not match
                          </motion.p>
                        )}
                        {matches && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="text-[11px] text-[#006E74] font-medium flex items-center gap-1">
                            <CheckCircle2 size={11} /> Passwords match
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <button type="submit" disabled={!canSubmit}
                      className="w-full bg-[#F35D2C] hover:bg-opacity-90 disabled:opacity-35 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md active:scale-[0.99] mt-1">
                      Reset Password
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
                /* ── Success ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-7">
                    <div className="w-16 h-16 bg-[#006E74]/10 rounded-2xl flex items-center justify-center border border-[#006E74]/15">
                      <ShieldCheck size={30} className="text-[#006E74]" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2 border-[#006E74]/25"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-[#6B5E5E] mb-2">Password updated!</h2>
                  <p className="text-sm text-[#6B5E5E]/60 mb-8 leading-relaxed">
                    Your password has been changed successfully.<br />Sign in with your new password.
                  </p>
                  <Link href="/login"
                    className="block w-full bg-[#F35D2C] hover:bg-opacity-90 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md active:scale-[0.99] text-sm text-center">
                    Sign In to Your Account
                  </Link>
                  <Link href="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-[#6B5E5E]/40 hover:text-[#F35D2C] transition-colors mt-5">
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
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 bg-[#006E74]/10 rounded-2xl flex items-center justify-center border border-[#006E74]/20"
                >
                  <Lock size={36} className="text-[#006E74]" />
                </motion.div>
                <div className="w-full space-y-3">
                  {requirements.map((r, i) => (
                    <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#F35D2C]/40" />
                      <div className="h-1.5 flex-1 bg-[#006E74]/10 rounded-full" />
                      <div className="w-4 h-4 rounded-full border border-[#006E74]/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#006E74]/30" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="w-full bg-[#006E74]/5 rounded-xl p-3 flex items-center gap-3 border border-[#006E74]/10">
                  <div className="w-8 h-8 bg-[#F35D2C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={16} className="text-[#F35D2C]" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-3/4 bg-[#006E74]/20 rounded-full" />
                    <div className="h-1 w-1/2 bg-[#006E74]/10 rounded-full" />
                  </div>
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