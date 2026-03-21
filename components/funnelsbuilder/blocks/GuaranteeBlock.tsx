import React from "react";
import { Editable } from "../editable";
import { ICONS } from "../constants";
import { Ic } from "../icons";

export function GuaranteeBlock({ block, onChange, preview }) {
  return (
    <div style={{ display: "flex", gap: 20, background: block.bg || "#f0fff4", border: `1px solid ${block.borderColor || "#86efac"}`, borderRadius: 16, padding: 24 }}>
      <div style={{ width: 56, height: 56, background: "#22c55e", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 16px rgba(34,197,94,0.3)" }}>
        <Ic d={ICONS.guarantee} s={28} c="white" sw={2} />
      </div>
      <div style={{ flex: 1 }}>
        {preview ? <h4 style={{ fontWeight: 900, color: block.headlineColor || "#14532d", fontSize: 17, margin: "0 0 8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>{block.headline}</h4>
          : <Editable tag="h4" value={block.headline} onChange={v => onChange({ headline: v })} style={{ fontWeight: 900, color: block.headlineColor || "#14532d", fontSize: 17, margin: "0 0 8px", display: "block", fontFamily: "'Bricolage Grotesque', sans-serif" }} placeholder="Guarantee headline…" />}
        {preview ? <p style={{ fontSize: 14, color: block.textColor || "#166534", lineHeight: 1.6, margin: 0 }}>{block.text}</p>
          : <Editable tag="p" value={block.text} onChange={v => onChange({ text: v })} multiline style={{ fontSize: 14, color: block.textColor || "#166534", lineHeight: 1.6, margin: 0, display: "block" }} placeholder="Guarantee text…" />}
      </div>
    </div>
  );
}