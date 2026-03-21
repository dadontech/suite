import React, { useState } from "react";

export function StarsBlock({ block, onChange, preview }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "10px 0", background: block.bg || "transparent" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {[1,2,3,4,5].map(i => (
          <svg key={i} width="22" height="22" viewBox="0 0 24 24" style={{ cursor: !preview ? "pointer" : "default" }}
            onMouseEnter={() => !preview && setHov(i)} onMouseLeave={() => !preview && setHov(0)}
            onClick={() => !preview && onChange({ rating: i })}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={i <= (hov || Math.ceil(block.rating || 4.9)) ? (block.starColor || "#F35D2C") : "#e5e7eb"} stroke="none" />
          </svg>
        ))}
        <span style={{ fontWeight: 900, color: "#1a1a2e", fontSize: 17, marginLeft: 6 }}>{Number(block.rating || 4.9).toFixed(1)}</span>
      </div>
      <span style={{ fontSize: 13, color: "#6B5E5E", opacity: 0.55 }}>({block.count || "2,847"} {block.text || "verified reviews"})</span>
    </div>
  );
}