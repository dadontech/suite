import React from "react";
import { Editable } from "../editable";

export function SubheadingBlock({ block, onChange, preview }) {
  const st = { fontSize: block.size || 18, fontWeight: 500, textAlign: block.align || "left", color: block.color || "#6B5E5E", lineHeight: block.lineHeight || 1.6, background: block.bg || "transparent", display: "block" };
  if (preview) return <p style={{ ...st, margin: 0 }}>{block.text}</p>;
  return <Editable tag="p" value={block.text} onChange={v => onChange({ text: v })} multiline placeholder="Sub-heading text…" style={{ ...st, margin: 0, width: "100%" }} />;
}