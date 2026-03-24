import React from "react";
import { Editable } from "../editable";

interface CalloutBlockProps {
  block: {
    bg?: string;
    borderColor?: string;
    icon?: string;
    title?: string;
    titleColor?: string;
    text?: string;
    textColor?: string;
  };
  onChange: (update: Partial<{ title: string; text: string }>) => void;
  preview?: boolean;
}

export function CalloutBlock({ block, onChange, preview }: CalloutBlockProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: 20,
        borderRadius: 14,
        background: block.bg || "#e0f9f9",
        borderLeft: `4px solid ${block.borderColor || "#00b4c4"}`,
      }}
    >
      <div
        style={{
          fontSize: 22,
          flexShrink: 0,
          lineHeight: 1,
          marginTop: 2,
        }}
      >
        {block.icon || "💡"}
      </div>
      <div style={{ flex: 1 }}>
        {preview ? (
          <p
            style={{
              fontWeight: 800,
              fontSize: 12,
              margin: "0 0 6px",
              color: block.titleColor || "#003d40",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {block.title}
          </p>
        ) : (
          <Editable
            tag="p"
            value={block.title || ""}
            onChange={(v) => onChange({ title: v })}
            style={{
              fontWeight: 800,
              fontSize: 12,
              margin: "0 0 6px",
              color: block.titleColor || "#003d40",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              display: "block",
            }}
            placeholder="Title…"
          />
        )}
        {preview ? (
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              margin: 0,
              color: block.textColor || "#1a3a3a",
            }}
          >
            {block.text}
          </p>
        ) : (
          <Editable
            tag="p"
            value={block.text || ""}
            onChange={(v) => onChange({ text: v })}
            multiline
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              margin: 0,
              color: block.textColor || "#1a3a3a",
              display: "block",
            }}
            placeholder="Callout content…"
          />
        )}
      </div>
    </div>
  );
}