import React from "react";
import { Editable } from "../editable";

interface ParagraphBlockProps {
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

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ block, onChange, preview }) => {
  const style: React.CSSProperties = {
    fontSize: block.size ?? 15,
    textAlign: block.align ?? "left",
    color: block.color ?? "#6B5E5E",
    lineHeight: block.lineHeight ?? 1.7,
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
      placeholder="Paragraph text… click to edit"
      style={{ ...style, width: "100%", minHeight: 56 }}
    />
  );
};