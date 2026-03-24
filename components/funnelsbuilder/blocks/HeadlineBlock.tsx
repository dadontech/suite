import React from "react";
import { Editable } from "../editable";

interface HeadlineBlockProps {
  block: {
    text?: string;
    size?: number;
    weight?: number;
    align?: "left" | "center" | "right";
    color?: string;
    lineHeight?: number;
    letterSpacing?: number;
    bg?: string;
  };
  onChange: (update: { text: string }) => void;
  preview?: boolean;
}

export const HeadlineBlock: React.FC<HeadlineBlockProps> = ({ block, onChange, preview }) => {
  const style: React.CSSProperties = {
    fontSize: block.size ?? 32,
    fontWeight: block.weight ?? 800,
    textAlign: block.align ?? "left",
    color: block.color ?? "#1a1a2e",
    lineHeight: block.lineHeight ?? 1.2,
    letterSpacing: (block.letterSpacing ?? 0) + "px",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    background: block.bg ?? "transparent",
    display: "block",
    margin: 0,
  };

  if (preview) {
    return <h2 style={style}>{block.text}</h2>;
  }

  return (
    <Editable
      tag="h2"
      value={block.text ?? ""}
      onChange={(v) => onChange({ text: v })}
      placeholder="Your headline…"
      style={{ ...style, width: "100%" }}
    />
  );
};