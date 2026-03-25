"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Zap, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login", formData);
  };

  return (
    <div className="min-h-screen bg-white text-[#6B5E5E] flex font-sans">

      {/* ── LEFT PANEL: Form – perfectly centered ── */}
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

        {/* Form – centered vertically */}
        <div className="flex-1 flex items-center justify-center px-8 md:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#6B5E5E]">Welcome Back</h1>
              <p className="text-[#6B5E5E]/70 text-sm">Sign in to your affiliate dashboard.</p>
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-4 mb-8">
              <button className="w-full flex items-center justify-center gap-2 border border-[#006E74]/20 py-2.5 rounded-xl text-sm font-medium hover:bg-[#006E74]/5 transition-colors text-[#6B5E5E]">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                </svg>
                Sign in with Google
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#006E74]/10"></div></div>
              <span className="relative bg-white px-4 text-xs text-[#6B5E5E]/40">or</span>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#6B5E5E]">Email</label>
                <input 
                  type="email" 
                  placeholder="affiliate@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border border-[#006E74]/20 rounded-2xl px-4 py-3 text-sm text-[#6B5E5E] focus:outline-none focus:ring-2 focus:ring-[#F35D2C]/30 focus:border-transparent transition-all bg-white placeholder-[#6B5E5E]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#6B5E5E]">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                    className="w-full border border-[#006E74]/20 rounded-2xl px-4 py-3 text-sm text-[#6B5E5E] focus:outline-none focus:ring-2 focus:ring-[#F35D2C]/30 transition-all pr-12 placeholder-[#6B5E5E]/30"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B5E5E]/40 hover:text-[#F35D2C]">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#6B5E5E]/80">
                  <input 
                    type="checkbox" 
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className="accent-[#F35D2C]"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-sm text-[#006E74] hover:text-[#F35D2C] transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="w-full bg-[#F35D2C] hover:bg-opacity-90 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md active:scale-[0.99] mt-2">
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-[#6B5E5E]/70 mt-8">
              Don&apos;t have an account? <Link href="/signup" className="text-[#F35D2C] font-semibold hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Dashboard Visualization ── */}
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
            className="relative border border-[#006E74]/20 bg-white backdrop-blur-xl rounded-2xl p-1 shadow-[0_0_50px_rgba(243,93,44,0.1)]"
          >
            <div className="border border-[#006E74]/10 rounded-xl p-8 h-[550px] relative overflow-hidden flex flex-col">
              <div className="flex gap-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#F35D2C]" />
                <div className="w-12 h-1 bg-[#006E74]/20 rounded-full" />
              </div>

              <div className="space-y-6 flex-1">
                {/* Stats */}
                <div className="space-y-2">
                  <div className="h-4 w-1/3 bg-[#F35D2C]/20 rounded animate-pulse" />
                  <div className="h-2 w-full bg-[#006E74]/10 rounded" />
                  <div className="h-2 w-[90%] bg-[#006E74]/10 rounded" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="h-24 rounded-lg bg-[#006E74]/5 border border-[#006E74]/10 p-4 flex flex-col justify-end">
                      <div className="h-1 w-full bg-[#F35D2C]/40 rounded" />
                      <div className="h-1 w-2/3 bg-[#F35D2C]/40 rounded mt-1" />
                      <span className="text-xs text-[#6B5E5E]/70 mt-2">Commission</span>
                   </div>
                   <div className="h-24 rounded-lg bg-[#006E74]/5 border border-[#006E74]/10 p-4 flex flex-col justify-end">
                      <div className="h-1 w-full bg-[#F35D2C]/40 rounded" />
                      <div className="h-1 w-2/3 bg-[#F35D2C]/40 rounded mt-1" />
                      <span className="text-xs text-[#6B5E5E]/70 mt-2">Clicks</span>
                   </div>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#F35D2C] shadow-[0_0_8px_rgba(243,93,44,0.3)]" />
                      <div className="h-1 flex-1 bg-[#006E74]/10 rounded" />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                   <div className="bg-[#F35D2C]/5 border border-[#F35D2C]/20 rounded-lg p-4">
                      <CheckCircle2 size={16} className="text-[#006E74] mb-2" />
                      <span className="text-xs text-[#6B5E5E]/80">Earnings up 34%</span>
                   </div>
                   <div className="bg-[#F35D2C]/5 border border-[#F35D2C]/20 rounded-lg p-4">
                      <CheckCircle2 size={16} className="text-[#006E74] mb-2" />
                      <span className="text-xs text-[#6B5E5E]/80">12k active today</span>
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