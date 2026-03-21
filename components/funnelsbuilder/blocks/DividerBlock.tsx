import React from "react";

export function DividerBlock({ block }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, background: block.bg || "transparent" }}>
      <div style={{ flex: 1, borderTop: `${block.thickness || 1}px solid ${block.color || "#e5e7eb"}` }} />
      {block.label && <span style={{ fontSize: 10, color: "#ccc", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>{block.label}</span>}
      <div style={{ flex: 1, borderTop: `${block.thickness || 1}px solid ${block.color || "#e5e7eb"}` }} />
    </div>
  );
}