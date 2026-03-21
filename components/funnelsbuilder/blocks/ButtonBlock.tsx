import React from "react";
import { Editable } from "../editable";

export function ButtonBlock({ block, onChange, preview }) {
  const bg = block.bg || "#F35D2C";
  const color = block.color || "#ffffff";
  const br = block.borderRadius ?? 12;
  const px = block.paddingX ?? 32;
  const py = block.paddingY ?? 14;
  const fs = block.fontSize ?? 16;
  const align = { left: "flex-start", center: "center", right: "flex-end" }[block.align] || "center";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align }}>
      <div style={{ background: bg, color, fontWeight: 900, fontSize: fs, padding: `${py}px ${px}px`, borderRadius: br, cursor: "pointer", display: "inline-block", width: block.fullWidth ? "100%" : "auto", textAlign: block.fullWidth ? "center" : "left", boxShadow: `0 6px 24px ${bg}40`, letterSpacing: 0.2, transition: "all 0.2s", border: block.borderStyle === "outline" ? `2px solid ${bg}` : "none" }}>
        {preview ? block.text : <Editable tag="span" value={block.text} onChange={v => onChange({ text: v })} placeholder="Button text…" />}
      </div>
      {block.subtext && (
        <div style={{ fontSize: 12, color: "#6B5E5E", opacity: 0.5, marginTop: 8, textAlign: align === "center" ? "center" : "left" }}>
          {preview ? block.subtext : <Editable tag="span" value={block.subtext} onChange={v => onChange({ subtext: v })} placeholder="Trust text…" />}
        </div>
      )}
    </div>
  );
}