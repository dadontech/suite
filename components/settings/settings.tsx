"use client";

import { useState } from "react";
import {
  User, Bell, CreditCard, Key,
  Check, AlertTriangle, Eye, EyeOff, Copy,
  Sparkles, Zap, Crown
} from "lucide-react";
import Toggle from "@/app/components/Toggle";

// ─── Tab config ───────────────────────────────────────────────
const TABS = [
  { id: "profile",       label: "Profile",       icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing",       label: "Billing",       icon: CreditCard },
  { id: "api",           label: "API Keys",      icon: Key },
];

// ─── Billing plans ────────────────────────────────────────────
const PLANS = [
  {
    id: "free",
    name: "Base",
    price: 0,
    description: "Perfect for beginners testing the waters.",
    features: [
      "1 generated page per month",
      "Basic AI analysis",
      "Standard blog templates",
      "Community support",
    ],
    icon: <Sparkles size={20} />,
    cta: "Start Free",
    current: false,
    popular: false,
  },
  {
    id: "pro",
    name: "Premium",
    price: 29,
    description: "For serious affiliates ready to scale.",
    features: [
      "10 generated pages per month",
      "Advanced AI analysis",
      "All funnel templates",
      "SEO optimization",
      "Custom domain",
      "Priority support",
    ],
    icon: <Zap size={20} />,
    cta: "Upgrade Now",
    current: true,
    popular: true,
  },
  {
    id: "agency",
    name: "Unlimited",
    price: 99,
    description: "The ultimate plan for agencies & power users.",
    features: [
      "Unlimited pages",
      "Priority AI analysis",
      "Custom funnel builder",
      "Team collaboration",
      "White‑label reports",
      "API access",
    ],
    icon: <Crown size={20} />,
    cta: "Contact Sales",
    current: false,
    popular: false,
  },
];

// ─── Profile Tab ─────────────────────────────────────────────
function ProfileTab() {
  const [form, setForm] = useState({ name: "John Doe", email: "john@example.com", company: "", website: "" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="border border-[#006E74]/10 rounded-2xl p-4 sm:p-7 w-full max-w-3xl">
      <p className="text-sm sm:text-[15px] font-bold text-[#6B5E5E] mb-5">Profile Information</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
        {[
          { label: "Full Name",  key: "name",    type: "text",  placeholder: "John Doe" },
          { label: "Email",      key: "email",   type: "email", placeholder: "john@example.com" },
          { label: "Company",    key: "company", type: "text",  placeholder: "Your company name" },
          { label: "Website",    key: "website", type: "url",   placeholder: "https://yoursite.com" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="block text-[11px] sm:text-[12.5px] font-bold text-[#6B5E5E]/80 mb-1.5">{label}</label>
            <input
              type={type}
              value={form[key]}
              placeholder={placeholder}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full border-[1.5px] border-[#006E74]/20 rounded-xl px-4 py-2.5 text-sm sm:text-[13.5px] text-[#6B5E5E] outline-none focus:border-[#F35D2C] transition-colors bg-white"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-[13.5px] font-bold transition-all
            ${saved ? "bg-[#006E74]" : "bg-[#F35D2C] hover:bg-[#e04e1f] active:scale-95"}`}
        >
          {saved && <Check size={14} strokeWidth={3}/>}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    email: true,
    conversions: true,
    weekly: false,
    marketing: false,
  });

  const rows = [
    { key: "email",       label: "Email Notifications",  desc: "Receive email updates about your campaigns" },
    { key: "conversions", label: "Conversion Alerts",     desc: "Get notified when you make a sale" },
    { key: "weekly",      label: "Weekly Reports",        desc: "Receive weekly performance summaries" },
    { key: "marketing",   label: "Marketing Updates",     desc: "News, tips, and promotional content" },
  ];

  return (
    <div className="border border-[#006E74]/10 rounded-2xl p-4 sm:p-7 w-full max-w-3xl">
      <p className="text-sm sm:text-[15px] font-bold text-[#6B5E5E] mb-1">Notification Preferences</p>
      <div className="mt-4">
        {rows.map((r, i) => (
          <div key={r.key} className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-[18px] gap-2 ${i < rows.length - 1 ? "border-b border-[#006E74]/10" : ""}`}>
            <div>
              <p className="text-sm sm:text-[14px] font-bold text-[#6B5E5E]">{r.label}</p>
              <p className="text-xs sm:text-[12.5px] text-[#6B5E5E]/50 font-medium mt-0.5">{r.desc}</p>
            </div>
            <Toggle
              enabled={prefs[r.key]}
              onChange={(checked) => setPrefs({ ...prefs, [r.key]: checked })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Billing Tab ─────────────────────────────────────────────
function BillingTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
      {PLANS.map((plan) => {
        const isCurrent = plan.current;
        const isPopular = plan.popular;
        return (
          <div
            key={plan.id}
            className={`relative bg-white border rounded-2xl p-5 sm:p-6 flex flex-col h-full transition-all
              ${isPopular
                ? "border-[#F35D2C] shadow-lg scale-105"
                : "border-[#006E74]/10 hover:border-[#006E74]/30"
              }`}
          >
            {isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F35D2C] text-white text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${isPopular ? 'bg-[#F35D2C]/10' : 'bg-[#006E74]/10'}`}>
                <div className={isPopular ? 'text-[#F35D2C]' : 'text-[#006E74]'}>{plan.icon}</div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#6B5E5E]">{plan.name}</h3>
                <p className="text-xs text-[#6B5E5E]/50">{plan.description}</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#6B5E5E]">${plan.price}</span>
              <span className="text-xs sm:text-sm text-[#6B5E5E]/50 ml-1">/month</span>
            </div>

            <ul className="space-y-3 mb-6 flex-1">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                  <Check size={16} className="text-[#F35D2C] flex-shrink-0 mt-0.5" />
                  <span className="text-[#6B5E5E]/80">{feat}</span>
                </li>
              ))}
            </ul>

            {isCurrent ? (
              <button
                disabled
                className="w-full py-3 rounded-xl border border-[#006E74]/20 bg-[#006E74]/5 text-[#6B5E5E]/70 text-xs sm:text-sm font-bold cursor-default"
              >
                Current Plan
              </button>
            ) : (
              <button
                className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold transition-all
                  ${plan.id === 'agency'
                    ? 'bg-white border border-[#006E74]/20 text-[#006E74] hover:bg-[#006E74]/5'
                    : 'bg-[#F35D2C] text-white hover:bg-[#e04e1f] active:scale-95'
                  }`}
              >
                {plan.cta}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── API Keys Tab ─────────────────────────────────────────────
function ApiKeysTab() {
  const [showSecret, setShowSecret] = useState(false);
  const [copiedPub,  setCopiedPub]  = useState(false);
  const [copiedSec,  setCopiedSec]  = useState(false);

  const publicKey  = "pk_live_xxxxxxxxxxxxxxxxxxxx";
  const secretKey  = "sk_live_xxxxxxxxxxxxxxxxxxxx";

  const copy = (val, setCopied) => {
    navigator.clipboard.writeText(val).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#006E74]/10 rounded-2xl p-4 sm:p-7 w-full max-w-3xl">
      <p className="text-sm sm:text-[15px] font-bold text-[#6B5E5E] mb-1">API Keys</p>
      <p className="text-xs sm:text-[13px] text-[#6B5E5E]/50 font-medium mb-6">
        Use these keys to integrate Amsuite with your applications.
      </p>

      {/* Public Key */}
      <div className="mb-5">
        <label className="block text-[11px] sm:text-[12.5px] font-bold text-[#6B5E5E]/80 mb-1.5">Public Key</label>
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <input
            readOnly value={publicKey} type="text"
            className="flex-1 border-[1.5px] border-[#006E74]/20 rounded-xl px-4 py-2.5 text-xs sm:text-[13px] text-[#6B5E5E]/60 font-mono outline-none bg-[#FAFAFA]"
          />
          <button
            onClick={() => copy(publicKey, setCopiedPub)}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-[1.5px] text-xs sm:text-[12.5px] font-bold transition-all whitespace-nowrap
              ${copiedPub ? "bg-[#006E74]/10 border-[#006E74] text-[#006E74]" : "bg-white border-[#006E74]/20 text-[#6B5E5E] hover:bg-[#006E74]/5"}`}
          >
            {copiedPub ? <><Check size={13} strokeWidth={3}/>Copied!</> : <><Copy size={13}/>Copy</>}
          </button>
        </div>
      </div>

      {/* Secret Key */}
      <div className="mb-6">
        <label className="block text-[11px] sm:text-[12.5px] font-bold text-[#6B5E5E]/80 mb-1.5">Secret Key</label>
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <input
            readOnly value={secretKey}
            type={showSecret ? "text" : "password"}
            className="flex-1 border-[1.5px] border-[#006E74]/20 rounded-xl px-4 py-2.5 text-xs sm:text-[13px] text-[#6B5E5E]/60 font-mono outline-none bg-[#FAFAFA]"
          />
          <div className="flex gap-2">
            <button
              onClick={() => copy(secretKey, setCopiedSec)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-[1.5px] text-xs sm:text-[12.5px] font-bold transition-all whitespace-nowrap
                ${copiedSec ? "bg-[#006E74]/10 border-[#006E74] text-[#006E74]" : "bg-white border-[#006E74]/20 text-[#6B5E5E] hover:bg-[#006E74]/5"}`}
            >
              {copiedSec ? <><Check size={13} strokeWidth={3}/>Copied!</> : <><Copy size={13}/>Copy</>}
            </button>
            <button
              onClick={() => setShowSecret((v) => !v)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-[1.5px] border-[#006E74]/20 bg-white text-xs sm:text-[12.5px] font-bold text-[#6B5E5E] hover:bg-[#006E74]/5 transition-all whitespace-nowrap"
            >
              {showSecret ? <><EyeOff size={13}/>Hide</> : <><Eye size={13}/>Reveal</>}
            </button>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 bg-[#F35D2C]/10 border border-[#F35D2C]/20 rounded-xl px-4 py-3.5">
        <AlertTriangle size={15} className="text-[#F35D2C] flex-shrink-0 mt-0.5"/>
        <div>
          <p className="text-xs sm:text-[13px] font-bold text-[#F35D2C]">Keep your secret key safe</p>
          <p className="text-[11px] sm:text-[12px] text-[#F35D2C]/70 mt-0.5">Never share your secret key publicly or in client-side code.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-white min-h-full">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 md:py-8 pb-24 md:pb-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-[28px] font-black text-[#6B5E5E] tracking-tight">Settings</h1>
          <p className="text-xs md:text-sm text-[#6B5E5E]/50 font-medium mt-1">Manage your account and preferences</p>
        </div>

        {/* Tab Bar - scrollable on mobile */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center gap-1 bg-[#006E74]/5 border border-[#006E74]/10 rounded-[13px] p-1.5 w-fit min-w-max">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[9px] text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap
                  ${activeTab === id
                    ? "bg-white text-[#6B5E5E] font-bold shadow-sm"
                    : "text-[#6B5E5E]/50 hover:text-[#6B5E5E] hover:bg-white/60"}`}
              >
                <Icon size={14}/>{label}
              </button>
            ))}
          </div>
        </div>

        {/* Panels */}
        {activeTab === "profile"       && <ProfileTab/>}
        {activeTab === "notifications" && <NotificationsTab/>}
        {activeTab === "billing"       && <BillingTab/>}
        {activeTab === "api"           && <ApiKeysTab/>}
      </div>
    </div>
  );
}