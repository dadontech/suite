import React from "react";

interface SpacerBlockProps {
  block: {
    height?: number;
    bg?: string;
  };
  preview?: boolean; // optional, not used but included for consistency
}

export const SpacerBlock: React.FC<SpacerBlockProps> = ({ block }) => {
  const height = block.height ?? 48;
  return (
    <div style={{ height, background: block.bg || "transparent", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: "0 12px",
          border: "1px dashed rgba(0,0,0,0.07)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 10, color: "#ccc", fontWeight: 600 }}>
          SPACER · {height}px
        </span>
      </div>
    </div>
  );
};