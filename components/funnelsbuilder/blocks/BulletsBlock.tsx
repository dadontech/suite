import React from "react";
import { Editable } from "../editable";
import { ICONS } from "../constants";
import { Ic } from "../icons";

// Define the shape of the block configuration
interface BulletsBlockProps {
  block: {
    bg?: string;
    items?: string[];
    size?: number;
    color?: string;
    lineHeight?: number;
  };
  onChange: (updated: Partial<{ items: string[] }>) => void;
  preview?: boolean;
}

export function BulletsBlock({ block, onChange, preview }: BulletsBlockProps) {
  const items = block.items ?? [];

  return (
    <div style={{ background: block.bg || "transparent", display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item: string, i: number) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-start" }}>
            {preview ? (
              <span
                style={{
                  fontSize: block.size || 15,
                  color: block.color || "#6B5E5E",
                  lineHeight: block.lineHeight || 1.6,
                }}
              >
                {item}
              </span>
            ) : (
              <Editable
                tag="span"
                value={item}
                onChange={(v: string) => {
                  const newItems = [...items];
                  newItems[i] = v;
                  onChange({ items: newItems });
                }}
                style={{
                  fontSize: block.size || 15,
                  color: block.color || "#6B5E5E",
                  lineHeight: block.lineHeight || 1.6,
                  flex: 1,
                  display: "block",
                }}
                placeholder="Bullet text…"
              />
            )}
          </div>
          {!preview && (
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onChange({ items: items.filter((_, j) => j !== i) })}
              style={{
                background: "none",
                border: "none",
                color: "#ff6b6b",
                cursor: "pointer",
                fontSize: 16,
                opacity: 0.4,
                lineHeight: 1,
                padding: "0 2px",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
      {!preview && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onChange({ items: [...items, "New bullet point — click to edit"] })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#006E74",
            fontSize: 12,
            fontWeight: 700,
            textAlign: "left",
            padding: "4px 0",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ic d={ICONS.plus} s={13} c="#006E74" /> Add bullet
        </button>
      )}
    </div>
  );
}