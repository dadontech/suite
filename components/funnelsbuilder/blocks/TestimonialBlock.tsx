import React from "react";
import { Editable } from "../editable";

export function TestimonialBlock({ block, onChange, preview }) {
  const initials = (block.name || "SM").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div style={{ background: block.bg || "#ffffff", border: "1px solid #f0f0f0", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
        {[1,2,3,4,5].map(i => <svg key={i} width="14" height="14" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={i <= (block.rating || 5) ? "#F35D2C" : "#e5e7eb"} stroke="none" /></svg>)}
      </div>
      <div style={{ fontSize: 36, color: "#006E74", opacity: 0.12, fontFamily: "Georgia, serif", lineHeight: 0.8, marginBottom: 6 }}>"</div>
      {preview ? <p style={{ fontSize: 15, color: block.quoteColor || "#1a1a2e", lineHeight: 1.65, fontStyle: "italic", margin: "0 0 18px" }}>"{block.quote}"</p>
        : <Editable tag="p" value={block.quote} onChange={v => onChange({ quote: v })} multiline style={{ fontSize: 15, color: block.quoteColor || "#1a1a2e", lineHeight: 1.65, fontStyle: "italic", margin: "0 0 18px", display: "block" }} placeholder="Customer quote…" />}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: block.avatarBg || "#006E7420", display: "flex", alignItems: "center", justifyContent: "center", color: block.avatarColor || "#006E74", fontWeight: 900, fontSize: 13 }}>{initials}</div>
        <div>
          {preview ? <p style={{ fontWeight: 700, fontSize: 14, color: block.nameColor || "#1a1a2e", margin: 0 }}>{block.name}</p>
            : <Editable tag="p" value={block.name} onChange={v => onChange({ name: v })} style={{ fontWeight: 700, fontSize: 14, color: block.nameColor || "#1a1a2e", margin: 0 }} placeholder="Name…" />}
          {preview ? <p style={{ fontSize: 12, color: block.titleColor || "#6B5E5E", margin: 0, opacity: 0.6 }}>{block.title}</p>
            : <Editable tag="p" value={block.title} onChange={v => onChange({ title: v })} style={{ fontSize: 12, color: block.titleColor || "#6B5E5E", margin: 0, opacity: 0.6 }} placeholder="Title / role…" />}
        </div>
      </div>
    </div>
  );
}