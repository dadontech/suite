import React, { useState, useEffect } from "react";

export function CountdownBlock({ block }) {
  const [t, setT] = useState({ h: block.hours || 1, m: block.minutes || 47, s: block.seconds || 32 });
  useEffect(() => {
    const i = setInterval(() => setT(p => {
      const { h, m, s } = p;
      if (s > 0) return { h, m, s: s - 1 };
      if (m > 0) return { h, m: m - 1, s: 59 };
      if (h > 0) return { h: h - 1, m: 59, s: 59 };
      return { h: 0, m: 0, s: 0 };
    }), 1000);
    return () => clearInterval(i);
  }, []);
  const pad = n => String(n).padStart(2, "0");
  return (
    <div style={{ background: block.bg || "#1a1a2e", borderRadius: 16, padding: 22, textAlign: "center" }}>
      <p style={{ color: block.headlineColor || "#F35D2C", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 16px" }}>{block.headline || "⚡ Offer Expires In:"}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        {[["Hours", t.h], ["Minutes", t.m], ["Seconds", t.s]].map(([lbl, val]) => (
          <div key={lbl} style={{ textAlign: "center" }}>
            <div style={{ background: block.digitBg || "#F35D2C", color: block.digitColor || "#ffffff", fontWeight: 900, fontSize: 30, width: 64, height: 64, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 24px ${block.digitBg || "#F35D2C"}50`, fontFamily: "'Bricolage Grotesque', monospace" }}>{pad(val)}</div>
            <p style={{ color: block.labelColor || "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 6 }}>{lbl}</p>
          </div>
        ))}
      </div>
      {block.subtext && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 12 }}>{block.subtext}</p>}
    </div>
  );
}