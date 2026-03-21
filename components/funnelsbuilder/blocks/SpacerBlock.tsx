import React from "react";

export function SpacerBlock({ block }) {
  return <div style={{ height: block.height || 48, background: block.bg || "transparent", position: "relative" }}>
    <div style={{ position: "absolute", inset: "0 12px", border: "1px dashed rgba(0,0,0,0.07)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 10, color: "#ccc", fontWeight: 600 }}>SPACER · {block.height || 48}px</span>
    </div>
  </div>;
}