import React from "react";
import { Editable } from "../editable";

export function ParagraphBlock({ block, onChange, preview }) {
  const st = { fontSize: block.size || 15, textAlign: block.align || "left", color: block.color || "#6B5E5E", lineHeight: block.lineHeight || 1.7, background: block.bg || "transparent", display: "block" };
  if (preview) return <p style={{ ...st, margin: 0 }}>{block.text}</p>;
  return <Editable tag="p" value={block.text} onChange={v => onChange({ text: v })} multiline placeholder="Paragraph text… click to edit" style={{ ...st, margin: 0, width: "100%", minHeight: 56 }} />;
}