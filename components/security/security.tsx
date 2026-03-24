"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Lock, Key, Eye, Server, CheckCircle, Globe, FileText } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 overflow-x-hidden font-sans">
      
      {/* Subtle Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center">
        <div className="absolute top-0 w-[800px] h-[600px] bg-[#F35D2C]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#006E74]/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-32">
        
        {/* Hero Section */}
        <section className="text-center mb-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-6 text-[#6B5E5E]">
              SECURITY.
            </h1>
            <p className="text-lg text-[#6B5E5E]/70 max-w-2xl mx-auto mb-10 font-light">
              We take the protection of your data seriously. Learn about the measures we take to keep your information safe.
            </p>
            {/* Removed Get Started button as requested */}
          </motion.div>
        </section>

        {/* Central Graphic (Dome & Shield) */}
        <section className="relative w-full h-[400px] flex justify-center items-center overflow-hidden mb-32">
          {/* Decorative floating nodes */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#F35D2C]/50 rounded-sm shadow-[0_0_10px_#F35D2C]" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#006E74]/50 rounded-sm shadow-[0_0_10px_#006E74]" />
          
          <div className="absolute w-[200%] md:w-[150%] h-[800px] border-t border-[#006E74]/20 bg-gradient-to-b from-[#F35D2C]/[0.02] to-transparent rounded-[100%] top-[60%] left-1/2 -translate-x-1/2"></div>
          
          <div className="absolute w-[150%] md:w-[100%] h-[800px] border-t border-[#006E74]/10 rounded-[100%] top-[70%] left-1/2 -translate-x-1/2"></div>

          {/* Center Shield */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-48 h-56 mt-20"
          >
            {/* Outer Shield Stroke */}
            <div className="absolute inset-0 border-[3px] border-[#006E74]/20 rounded-t-full rounded-b-[40%] flex justify-center items-center shadow-[0_0_50px_rgba(243,93,44,0.05)]">
              {/* Inner Shield */}
              <div className="w-32 h-40 border-2 border-[#F35D2C]/40 rounded-t-full rounded-b-[40%] flex justify-center items-center relative overflow-hidden bg-white">
                {/* Two-tone fill for the inner shield */}
                <div className="absolute inset-0 w-1/2 bg-[#F35D2C] opacity-90"></div>
                <div className="absolute inset-0 left-1/2 w-1/2 bg-[#006E74] opacity-20"></div>
                <Shield size={64} className="text-white relative z-20" strokeWidth={1} />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Security pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {[
            { icon: <Shield size={24} />, title: "Encryption", desc: "256‑bit SSL/TLS for all data in transit; AES‑256 at rest." },
            { icon: <Lock size={24} />, title: "Access Control", desc: "Role‑based permissions, principle of least privilege." },
            { icon: <Key size={24} />, title: "Authentication", desc: "2FA, SSO, and hardware key support." },
            { icon: <Eye size={24} />, title: "Threat Monitoring", desc: "24/7 SIEM, anomaly detection, automated alerts." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-[#006E74]/10 rounded-2xl p-8 hover:border-[#F35D2C]/30 transition-all shadow-sm"
            >
              <div className="w-12 h-12 mb-6 rounded-lg bg-[#F35D2C]/10 flex items-center justify-center text-[#F35D2C]">
                {item.icon}
              </div>
              <h3 className="text-xl font-medium text-[#6B5E5E] mb-2">{item.title}</h3>
              <p className="text-sm text-[#6B5E5E]/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed sections - Expanded with serious details */}
        <section className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#FAFAFA] border border-[#006E74]/10 rounded-2xl p-10 md:p-12">
              <h2 className="text-3xl font-medium text-[#6B5E5E] mb-4">Data Encryption</h2>
              <p className="text-[#6B5E5E]/70 leading-relaxed text-lg font-light mb-4">
                All data transmitted between your browser and our servers is encrypted using TLS 1.3 with strong cipher suites. Stored data, including database backups and file storage, is encrypted at rest using AES‑256 with per‑customer keys. We also support customer‑managed keys for enterprise plans.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">TLS 1.3 with Perfect Forward Secrecy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">AES‑256 encryption for data at rest (FIPS 140‑2 validated modules)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">Automated key rotation every 90 days</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#FAFAFA] border border-[#006E74]/10 rounded-2xl p-10 md:p-12 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#006E74] mb-4">Compliance</div>
              <p className="text-3xl font-medium text-[#6B5E5E] mb-2">ISO 27001 Certified</p>
              <p className="text-base text-[#6B5E5E]/60 font-light">Our infrastructure meets industry‑leading standards; audited annually by third parties.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 bg-[#FAFAFA] border border-[#006E74]/10 rounded-2xl p-10 md:p-12 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#006E74] mb-4">Audit Logs</div>
              <p className="text-3xl font-medium text-[#6B5E5E] mb-2">Full Visibility</p>
              <p className="text-base text-[#6B5E5E]/60 font-light mb-4">All access to your data is logged with timestamps, IP, and actor identity. Logs are immutable and retained for 1 year.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">Cloud‑native audit trail (AWS CloudTrail, Azure Monitor)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">Real‑time alerting on suspicious patterns</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-[#FAFAFA] border border-[#006E74]/10 rounded-2xl p-10 md:p-12">
              <h2 className="text-3xl font-medium text-[#6B5E5E] mb-4">Access Monitoring</h2>
              <p className="text-[#6B5E5E]/70 leading-relaxed text-lg font-light mb-4">
                We maintain detailed audit logs of who accesses what and when. Suspicious activity triggers alerts to our security team. You can also view your account&apos;s access history in real time through the dashboard.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">User access logs available via dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">Automated alerts for multiple failed logins, API key usage anomalies</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#FAFAFA] border border-[#006E74]/10 rounded-2xl p-10 md:p-12">
              <h2 className="text-3xl font-medium text-[#6B5E5E] mb-4">Vulnerability Management</h2>
              <p className="text-[#6B5E5E]/70 leading-relaxed text-lg font-light mb-4">
                We conduct regular penetration tests and code reviews. We also run a bug bounty program – if you find a vulnerability, we&apos;ll reward you. Our security team follows a strict disclosure policy.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">Quarterly external penetration tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">Continuous dependency scanning (Dependabot, Snyk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#F35D2C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#6B5E5E]/80">Bug bounty via HackerOne (rewards up to $5,000)</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#FAFAFA] border border-[#006E74]/10 rounded-2xl p-10 md:p-12 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#006E74] mb-4">Responsible Disclosure</div>
              <p className="text-3xl font-medium text-[#6B5E5E] mb-2">security@amsuite.com</p>
              <p className="text-base text-[#6B5E5E]/60 font-light">Report issues to our team – we&apos;ll respond within 24 hours and coordinate disclosure.</p>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="mt-32 text-center">
          <div className="bg-[#FAFAFA] border border-[#006E74]/10 rounded-[32px] p-16 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#F35D2C]/5 blur-[80px] rounded-full pointer-events-none" />
            
            <h2 className="text-3xl md:text-4xl font-medium text-[#6B5E5E] mb-4 relative z-10">Your data is in safe hands</h2>
            <p className="text-[#6B5E5E]/60 mb-12 max-w-lg mx-auto text-lg font-light relative z-10">
              We comply with leading global standards and regulations.
            </p>
            
            <div className="flex justify-center flex-wrap gap-12 relative z-10">
              <div className="flex flex-col items-center">
                <Shield size={32} className="text-[#006E74] mb-2" />
                <span className="text-sm font-bold text-[#6B5E5E]">GDPR</span>
              </div>
              <div className="flex flex-col items-center">
                <Lock size={32} className="text-[#F35D2C] mb-2" />
                <span className="text-sm font-bold text-[#6B5E5E]">CCPA</span>
              </div>
              <div className="flex flex-col items-center">
                <Server size={32} className="text-[#006E74] mb-2" />
                <span className="text-sm font-bold text-[#6B5E5E]">SOC2</span>
              </div>
              <div className="flex flex-col items-center">
                <FileText size={32} className="text-[#F35D2C] mb-2" />
                <span className="text-sm font-bold text-[#6B5E5E]">ISO 27001</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}