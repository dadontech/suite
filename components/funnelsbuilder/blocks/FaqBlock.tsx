import React, { useState } from "react";
import { Editable } from "../editable";
import { ICONS } from "../constants";
import { Ic } from "../icons";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqBlockProps {
  block: {
    items?: FaqItem[];
    bg?: string;
    borderColor?: string;
    questionColor?: string;
    answerColor?: string;
  };
  onChange: (update: { items: FaqItem[] }) => void;
  preview?: boolean;
}

export const FaqBlock: React.FC<FaqBlockProps> = ({ block, onChange, preview }) => {
  const [open, setOpen] = useState<number | null>(null);
  const items = block.items ?? [];

  return (
    <div
      style={{
        background: block.bg || "transparent",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: `1px solid ${block.borderColor || "#e5e7eb"}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              cursor: "pointer",
              background: open === i ? "#fafafa" : "white",
            }}
            onClick={() => preview && setOpen(open === i ? null : i)}
          >
            {preview ? (
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: block.questionColor || "#1a1a2e",
                }}
              >
                {item.q}
              </span>
            ) : (
              <Editable
                tag="span"
                value={item.q}
                onChange={(v) => {
                  const newItems = [...items];
                  newItems[i] = { ...newItems[i], q: v };
                  onChange({ items: newItems });
                }}
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: block.questionColor || "#1a1a2e",
                  flex: 1,
                }}
                placeholder="Question…"
              />
            )}
            <Ic d={open === i ? ICONS.up : ICONS.down} s={14} c="#9ca3af" />
          </div>
          {(!preview || open === i) && (
            <div
              style={{
                padding: "10px 18px 16px",
                borderTop: "1px solid #f3f4f6",
              }}
            >
              {preview ? (
                <p
                  style={{
                    fontSize: 14,
                    color: block.answerColor || "#6B5E5E",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.a}
                </p>
              ) : (
                <Editable
                  tag="p"
                  value={item.a}
                  onChange={(v) => {
                    const newItems = [...items];
                    newItems[i] = { ...newItems[i], a: v };
                    onChange({ items: newItems });
                  }}
                  multiline
                  style={{
                    fontSize: 14,
                    color: block.answerColor || "#6B5E5E",
                    lineHeight: 1.6,
                    margin: 0,
                    display: "block",
                  }}
                  placeholder="Answer…"
                />
              )}
            </div>
          )}
        </div>
      ))}
      {!preview && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            onChange({
              items: [
                ...items,
                { q: "New question?", a: "Your answer here." },
              ],
            })
          }
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
          <Ic d={ICONS.plus} s={13} c="#006E74" /> Add question
        </button>
      )}
    </div>
  );
};