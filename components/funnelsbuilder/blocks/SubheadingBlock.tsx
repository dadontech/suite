import React from "react";
import { Editable } from "../editable";

interface SubheadingBlockProps {
  block: {
    text?: string;
    size?: number;
    align?: "left" | "center" | "right";
    color?: string;
    lineHeight?: number;
    bg?: string;
  };
  onChange: (update: { text: string }) => void;
  preview?: boolean;
}

export const SubheadingBlock: React.FC<SubheadingBlockProps> = ({ block, onChange, preview }) => {
  const style: React.CSSProperties = {
    fontSize: block.size ?? 18,
    fontWeight: 500,
    textAlign: block.align ?? "left",
    color: block.color ?? "#6B5E5E",
    lineHeight: block.lineHeight ?? 1.6,
    background: block.bg ?? "transparent",
    display: "block",
    margin: 0,
  };

  if (preview) {
    return <p style={style}>{block.text}</p>;
  }

  return (
    <Editable
      tag="p"
      value={block.text ?? ""}
      onChange={(v) => onChange({ text: v })}
      multiline
      placeholder="Sub-heading text…"
      style={{ ...style, width: "100%" }}
    />
  );
};