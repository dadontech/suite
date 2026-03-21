import React from "react";
import { Editable } from "../editable";

export function HeadlineBlock({ block, onChange, preview }) {
  const st = { fontSize: block.size || 32, fontWeight: block.weight || 800, textAlign: block.align || "left", color: block.color || "#1a1a2e", lineHeight: block.lineHeight || 1.2, letterSpacing: (block.letterSpacing || 0) + "px", fontFamily: "'Bricolage Grotesque', sans-serif", background: block.bg || "transparent", display: "block" };
  if (preview) return <h2 style={{ ...st, margin: 0 }}>{block.text}</h2>;
  return <Editable tag="h2" value={block.text} onChange={v => onChange({ text: v })} placeholder="Your headline…" style={{ ...st, margin: 0, width: "100%" }} />;
}