import React from "react";
import { Editable } from "../editable";

interface HeroBlockProps {
  block: {
    bg?: string;
    ctaBg?: string;
    eyebrow?: string;
    headline?: string;
    headlineColor?: string;
    subtext?: string;
    subtextColor?: string;
    ctaText?: string;
    ctaColor?: string;
    ctaSubtext?: string;
  };
  onChange: (update: Partial<{
    eyebrow: string;
    headline: string;
    subtext: string;
    ctaText: string;
    ctaSubtext: string;
  }>) => void;
  preview?: boolean;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ block, onChange, preview }) => {
  const bg = block.bg ?? "#fff8f5";
  const ctaBg = block.ctaBg ?? "#F35D2C";

  return (
    <div style={{ padding: "56px 32px", textAlign: "center", background: bg, position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 20% 50%, ${ctaBg}12 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #006E7410 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
        {preview ? (
          <div
            style={{
              display: "inline-block",
              background: `${ctaBg}18`,
              color: ctaBg,
              fontSize: 10,
              fontWeight: 800,
              padding: "4px 14px",
              borderRadius: 99,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              marginBottom: 16,
              border: `1px solid ${ctaBg}30`,
            }}
          >
            {block.eyebrow}
          </div>
        ) : (
          <Editable
            tag="div"
            value={block.eyebrow ?? ""}
            onChange={(v) => onChange({ eyebrow: v })}
            placeholder="Eyebrow text…"
            style={{
              display: "inline-block",
              background: `${ctaBg}18`,
              color: ctaBg,
              fontSize: 10,
              fontWeight: 800,
              padding: "4px 14px",
              borderRadius: 99,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              marginBottom: 16,
              border: `1px solid ${ctaBg}30`,
            }}
          />
        )}
        {preview ? (
          <h1
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: block.headlineColor ?? "#1a1a2e",
              lineHeight: 1.15,
              margin: "0 0 16px",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            {block.headline}
          </h1>
        ) : (
          <Editable
            tag="h1"
            value={block.headline ?? ""}
            onChange={(v) => onChange({ headline: v })}
            placeholder="Main headline…"
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: block.headlineColor ?? "#1a1a2e",
              lineHeight: 1.15,
              margin: "0 0 16px",
              display: "block",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          />
        )}
        {preview ? (
          <p
            style={{
              fontSize: 17,
              color: block.subtextColor ?? "#6B5E5E",
              lineHeight: 1.65,
              margin: "0 0 28px",
            }}
          >
            {block.subtext}
          </p>
        ) : (
          <Editable
            tag="p"
            value={block.subtext ?? ""}
            onChange={(v) => onChange({ subtext: v })}
            multiline
            placeholder="Supporting text…"
            style={{
              fontSize: 17,
              color: block.subtextColor ?? "#6B5E5E",
              lineHeight: 1.65,
              margin: "0 0 28px",
              display: "block",
            }}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div
            style={{
              background: ctaBg,
              color: block.ctaColor ?? "#ffffff",
              fontWeight: 900,
              fontSize: 17,
              padding: "16px 36px",
              borderRadius: 14,
              cursor: "pointer",
              boxShadow: `0 8px 32px ${ctaBg}40`,
              transition: "transform 0.2s",
              letterSpacing: 0.2,
            }}
          >
            {preview ? (
              block.ctaText
            ) : (
              <Editable
                tag="span"
                value={block.ctaText ?? ""}
                onChange={(v) => onChange({ ctaText: v })}
                placeholder="CTA text…"
              />
            )}
          </div>
          <div
            style={{
              fontSize: 12,
              color: block.subtextColor ?? "#6B5E5E",
              opacity: 0.55,
              letterSpacing: 0.3,
            }}
          >
            {preview ? (
              block.ctaSubtext
            ) : (
              <Editable
                tag="span"
                value={block.ctaSubtext ?? ""}
                onChange={(v) => onChange({ ctaSubtext: v })}
                placeholder="Trust/social proof…"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};