import React, { useState } from "react";
import { T, ICONS } from "./constants";
import { Ic } from "./icons";

// Minimal Page interface – we only need the fields used in this component
interface Page {
  id: string;
  label: string;
  icon: string;
  blocks: { length: number }; // we only need the block count
  // we don't need full block details here
}

interface LaunchModalProps {
  pages: Page[];
  onClose: () => void;
  onDone: () => void;
}

export function LaunchModal({ pages, onClose, onDone }: LaunchModalProps) {
  const [step, setStep] = useState<"review" | "launching" | "done">("review");
  const launch = async () => {
    setStep("launching");
    await new Promise((r) => setTimeout(r, 2600));
    setStep("done");
  };

  if (step === "done") {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}>
        <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 24, padding: 48, maxWidth: 440, width: "100%", margin: "0 16px", textAlign: "center", animation: "scaleIn 0.3s ease", boxShadow: "0 40px 120px rgba(0,0,0,0.2)" }}>
          <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 24px" }}>
            <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: "rgba(34,197,94,0.12)", animation: "pulse 2s ease infinite" }} />
            <div style={{ width: 80, height: 80, background: "rgba(34,197,94,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(34,197,94,0.3)" }}>
              <Ic d={ICONS.check} s={40} c="#22c55e" sw={3} />
            </div>
          </div>
          <h2 style={{ fontWeight: 900, color: T.text1, fontSize: 26, margin: "0 0 10px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Your Funnel is Live 🚀</h2>
          <p style={{ color: T.text2, fontSize: 14, margin: "0 0 28px", lineHeight: 1.6 }}>All {pages.length} pages published and active. Analytics is tracking. Email sequences armed.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
            {[
              ["📄", pages.length, "Pages Live"],
              ["📧", "5", "Email Sequences"],
              ["📊", "Live", "Analytics"],
              ["🔒", "SSL", "Secured"],
            ].map((s, i) => (
              <div key={i} style={{ background: T.bg3, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s[0]}</div>
                <div style={{ fontWeight: 900, color: T.teal, fontSize: 18 }}>{s[1]}</div>
                <div style={{ fontSize: 10, color: T.text3, marginTop: 2 }}>{s[2]}</div>
              </div>
            ))}
          </div>
          <button onClick={onDone} style={{ width: "100%", padding: "15px 0", background: T.accent, color: "white", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 900, cursor: "pointer", boxShadow: "0 8px 32px rgba(243,93,44,0.4)" }} className="btn-lift">
            Go to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  if (step === "launching") {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}>
        <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 24, padding: 48, maxWidth: 360, width: "100%", margin: "0 16px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, margin: "0 auto 20px" }}>
            <svg style={{ animation: "spin 0.9s linear infinite", width: 64, height: 64 }} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke={T.accentDim} strokeWidth="2" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 style={{ fontWeight: 900, color: T.text1, fontSize: 20, margin: "0 0 10px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Publishing Your Funnel…</h2>
          <p style={{ color: T.text2, fontSize: 13, lineHeight: 1.6 }}>Setting up pages, activating tracking, and arming your email sequences.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", padding: 16 }}>
      <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 24, width: "100%", maxWidth: 520, boxShadow: "0 40px 120px rgba(0,0,0,0.2)", overflow: "hidden", animation: "scaleIn 0.25s ease" }}>
        <div style={{ background: T.bg2, padding: "28px 28px 24px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, background: T.accentDim, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ic d={ICONS.rocket} s={18} c={T.accent} />
            </div>
            <h2 style={{ fontWeight: 900, color: T.text1, fontSize: 20, fontFamily: "'Bricolage Grotesque', sans-serif" }}>Ready to Launch</h2>
          </div>
          <p style={{ color: T.text3, fontSize: 13 }}>Your funnel is fully configured and ready to go live.</p>
        </div>
        <div style={{ padding: 28 }}>
          <div style={{ background: T.tealDim, border: `1px solid ${T.tealDim}`, borderRadius: 16, padding: 18, marginBottom: 22 }}>
            <p style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2, color: T.text3, margin: "0 0 14px" }}>Funnel Flow</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {pages.map((p, i) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ background: T.bg3, border: `1px solid ${T.border}`, borderRadius: 11, padding: "8px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <Ic d={ICONS[p.icon as keyof typeof ICONS]} s={18} c={T.text2} />
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: T.text1, margin: 0 }}>{p.label}</p>
                      <p style={{ fontSize: 10, color: T.text3, margin: 0 }}>{p.blocks.length} blocks</p>
                    </div>
                  </div>
                  {i < pages.length - 1 && <Ic d={ICONS.chevR} s={11} c={T.text4} />}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {[
              `${pages.length} funnel pages ready to publish`,
              "High-converting copy configured on all pages",
              "CTA buttons and conversion paths active",
              "5-step email follow-up sequence armed",
              "Analytics & pixel tracking initialised",
              "Mobile-responsive layout verified",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 18, height: 18, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic d={ICONS.check} s={9} c="#22c55e" sw={3} />
                </div>
                <span style={{ fontSize: 13, color: T.text2 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "13px 0", border: `1px solid ${T.border}`, borderRadius: 13, fontSize: 13, fontWeight: 700, background: "none", color: T.text2, cursor: "pointer" }}>
              Back to Editor
            </button>
            <button onClick={launch} style={{ flex: 2, padding: "13px 0", background: T.accent, color: "white", border: "none", borderRadius: 13, fontSize: 14, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 24px rgba(243,93,44,0.4)" }} className="btn-lift">
              <Ic d={ICONS.rocket} s={15} c="white" sw={2} /> Launch Funnel Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}