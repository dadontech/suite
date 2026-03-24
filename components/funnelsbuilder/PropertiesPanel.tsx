import React, { useState } from "react";
import { T, ICONS, BD } from "./constants";
import { Ic } from "./icons";
import { Section } from "./ui/Section";
import { ColorRow } from "./ui/ColorRow";
import { Row } from "./ui/Row";
import { Slider } from "./ui/Slider";
import { SegControl } from "./ui/SegControl";
import { PropInput } from "./ui/PropInput";
import { Label } from "./ui/Label";

// Base block interface – common fields used across blocks
interface BaseBlock {
  id?: string; // not always present in patch
  type: string;
  bg?: string;
  headlineColor?: string;
  subtextColor?: string;
  ctaBg?: string;
  ctaColor?: string;
  size?: number;
  weight?: number;
  align?: string;
  lineHeight?: number;
  letterSpacing?: number;
  color?: string;
  fontSize?: number;
  paddingX?: number;
  paddingY?: number;
  borderRadius?: number;
  fullWidth?: boolean;
  rating?: number;
  count?: string;
  text?: string;
  starColor?: string;
  icon?: string;
  title?: string;
  borderColor?: string;
  titleColor?: string;
  textColor?: string;
  headline?: string;
  quote?: string;
  name?: string;
  avatarBg?: string;
  avatarColor?: string;
  quoteColor?: string;
  nameColor?: string;
  hours?: number;
  minutes?: number;
  seconds?: number;
  digitBg?: string;
  digitColor?: string;
  label?: string;
  questionColor?: string;
  answerColor?: string;
  style?: string;
  thickness?: number;
  alt?: string;
  description?: string;
  objectFit?: string;
  width?: string;
  height?: string | number;
  rounded?: number;
  aiPrompt?: string;
  url?: string;
  videoSuggestions?: string;
  [key: string]: unknown; // allow extra fields
}

type AiState = {
  loading: boolean;
  videoLoading: boolean;
};

interface PropertiesPanelProps {
  block: BaseBlock | null;
  onChange: (patch: Partial<BaseBlock>) => void;
}

// Map of block types to human-readable labels
const typeLabels: Record<string, string> = {
  hero: "Hero Section",
  headline: "Headline",
  subheading: "Sub-heading",
  paragraph: "Paragraph",
  button: "Button",
  bullets: "Bullet List",
  stars: "Star Rating",
  callout: "Callout Box",
  guarantee: "Guarantee",
  testimonial: "Testimonial",
  countdown: "Countdown",
  faq: "FAQ",
  divider: "Divider",
  image: "Image",
  video: "Video",
  spacer: "Spacer",
};

export function PropertiesPanel({ block, onChange }: PropertiesPanelProps) {
  const [aiState, setAiState] = useState<AiState>({
    loading: false,
    videoLoading: false,
  });

  if (!block) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: 24,
          textAlign: "center",
          opacity: 0.3,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            border: "2px dashed rgba(0,0,0,0.15)",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <Ic d={ICONS.settings} s={22} c={T.text2} />
        </div>
        <p
          style={{
            color: T.text2,
            fontSize: 12,
            fontWeight: 600,
            margin: "0 0 6px",
          }}
        >
          No block selected
        </p>
        <p style={{ color: T.text3, fontSize: 11, lineHeight: 1.5 }}>
          Click any block on the canvas to edit its properties here
        </p>
      </div>
    );
  }

  const typeLabel = typeLabels[block.type] || block.type;

  // Server endpoint for AI prompts (adjust to your actual endpoint)
  const AI_PROMPT_ENDPOINT = "/api/ai-prompt";

  const generateAIImagePrompt = async () => {
    setAiState((s) => ({ ...s, loading: true }));
    try {
      const res = await fetch(AI_PROMPT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "image-prompt",
          context:
            block.description ||
            block.alt ||
            block.title ||
            "product lifestyle photo",
        }),
      });
      if (!res.ok) throw new Error("Failed to generate prompt");
      const data = await res.json();
      if (data.prompt) onChange({ aiPrompt: data.prompt });
    } catch (e) {
      console.error(e);
    }
    setAiState((s) => ({ ...s, loading: false }));
  };

  const findRelatedVideo = async () => {
    setAiState((s) => ({ ...s, videoLoading: true }));
    try {
      const res = await fetch(AI_PROMPT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "video-queries",
          context: block.title || block.url || "product review",
        }),
      });
      if (!res.ok) throw new Error("Failed to get video suggestions");
      const data = await res.json();
      if (data.queries) onChange({ videoSuggestions: data.queries });
    } catch (e) {
      console.error(e);
    }
    setAiState((s) => ({ ...s, videoLoading: false }));
  };

  const renderProps = () => {
    switch (block.type) {
      case "hero":
        return (
          <>
            <Section title="Background">
              <ColorRow
                label="Page BG"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Headline"
                value={block.headlineColor}
                onChange={(v: string) => onChange({ headlineColor: v })}
              />
              <ColorRow
                label="Subtext"
                value={block.subtextColor}
                onChange={(v: string) => onChange({ subtextColor: v })}
              />
            </Section>
            <Section title="CTA Button">
              <ColorRow
                label="BG Color"
                value={block.ctaBg}
                onChange={(v: string) => onChange({ ctaBg: v })}
              />
              <ColorRow
                label="Text"
                value={block.ctaColor}
                onChange={(v: string) => onChange({ ctaColor: v })}
              />
            </Section>
          </>
        );

      case "headline":
        return (
          <>
            <Section title="Typography">
              <Slider
                label="Size"
                value={block.size ?? 32}
                min={16}
                max={72}
                step={2}
                unit="px"
                onChange={(v: number) => onChange({ size: v })}
              />
              <Row label="Weight">
                <SegControl
                  options={[
                    [400, "Regular"],
                    [600, "Semi"],
                    [800, "Bold"],
                    [900, "Black"],
                  ]}
                  value={block.weight ?? 800}
                  onChange={(v: number) => onChange({ weight: v })}
                />
              </Row>
              <Row label="Align">
                <SegControl
                  options={[
                    ["left", "←"],
                    ["center", "↔"],
                    ["right", "→"],
                  ]}
                  value={block.align ?? "left"}
                  onChange={(v: string) => onChange({ align: v })}
                />
              </Row>
              <Slider
                label="Line H"
                value={block.lineHeight ?? 1.2}
                min={1}
                max={2.5}
                step={0.05}
                onChange={(v: number) => onChange({ lineHeight: v })}
              />
              <Slider
                label="Spacing"
                value={block.letterSpacing ?? 0}
                min={-2}
                max={8}
                step={0.5}
                unit="px"
                onChange={(v: number) => onChange({ letterSpacing: v })}
              />
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Text"
                value={block.color}
                onChange={(v: string) => onChange({ color: v })}
              />
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
          </>
        );

      case "subheading":
        return (
          <>
            <Section title="Typography">
              <Slider
                label="Size"
                value={block.size ?? 18}
                min={12}
                max={40}
                step={1}
                unit="px"
                onChange={(v: number) => onChange({ size: v })}
              />
              <Row label="Align">
                <SegControl
                  options={[
                    ["left", "←"],
                    ["center", "↔"],
                    ["right", "→"],
                  ]}
                  value={block.align ?? "left"}
                  onChange={(v: string) => onChange({ align: v })}
                />
              </Row>
              <Slider
                label="Line H"
                value={block.lineHeight ?? 1.6}
                min={1}
                max={2.5}
                step={0.05}
                onChange={(v: number) => onChange({ lineHeight: v })}
              />
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Text"
                value={block.color}
                onChange={(v: string) => onChange({ color: v })}
              />
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
          </>
        );

      case "paragraph":
        return (
          <>
            <Section title="Typography">
              <Slider
                label="Size"
                value={block.size ?? 15}
                min={11}
                max={28}
                step={1}
                unit="px"
                onChange={(v: number) => onChange({ size: v })}
              />
              <Row label="Align">
                <SegControl
                  options={[
                    ["left", "←"],
                    ["center", "↔"],
                    ["right", "→"],
                    ["justify", "≡"],
                  ]}
                  value={block.align ?? "left"}
                  onChange={(v: string) => onChange({ align: v })}
                />
              </Row>
              <Slider
                label="Line H"
                value={block.lineHeight ?? 1.7}
                min={1}
                max={2.5}
                step={0.05}
                onChange={(v: number) => onChange({ lineHeight: v })}
              />
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Text"
                value={block.color}
                onChange={(v: string) => onChange({ color: v })}
              />
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
          </>
        );

      case "button":
        return (
          <>
            <Section title="Colors">
              <ColorRow
                label="BG Color"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
              <ColorRow
                label="Text Color"
                value={block.color}
                onChange={(v: string) => onChange({ color: v })}
              />
            </Section>
            <Section title="Typography">
              <Slider
                label="Font Size"
                value={block.fontSize ?? 16}
                min={12}
                max={28}
                step={1}
                unit="px"
                onChange={(v: number) => onChange({ fontSize: v })}
              />
            </Section>
            <Section title="Size & Shape">
              <Slider
                label="Padding X"
                value={block.paddingX ?? 32}
                min={8}
                max={80}
                step={2}
                unit="px"
                onChange={(v: number) => onChange({ paddingX: v })}
              />
              <Slider
                label="Padding Y"
                value={block.paddingY ?? 14}
                min={6}
                max={40}
                step={1}
                unit="px"
                onChange={(v: number) => onChange({ paddingY: v })}
              />
              <Slider
                label="Radius"
                value={block.borderRadius ?? 12}
                min={0}
                max={50}
                step={1}
                unit="px"
                onChange={(v: number) => onChange({ borderRadius: v })}
              />
            </Section>
            <Section title="Layout">
              <Row label="Align">
                <SegControl
                  options={[
                    ["left", "←"],
                    ["center", "↔"],
                    ["right", "→"],
                  ]}
                  value={block.align ?? "center"}
                  onChange={(v: string) => onChange({ align: v })}
                />
              </Row>
              <Row label="Width">
                <SegControl
                  options={[
                    [false, "Auto"],
                    [true, "Full"],
                  ]}
                  value={block.fullWidth ?? false}
                  onChange={(v: boolean) => onChange({ fullWidth: v })}
                />
              </Row>
            </Section>
          </>
        );

      case "bullets":
        return (
          <>
            <Section title="Typography">
              <Slider
                label="Font Size"
                value={block.size ?? 15}
                min={12}
                max={24}
                step={1}
                unit="px"
                onChange={(v: number) => onChange({ size: v })}
              />
              <Slider
                label="Line H"
                value={block.lineHeight ?? 1.6}
                min={1}
                max={2.5}
                step={0.05}
                onChange={(v: number) => onChange({ lineHeight: v })}
              />
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Text"
                value={block.color}
                onChange={(v: string) => onChange({ color: v })}
              />
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
          </>
        );

      case "stars":
        return (
          <>
            <Section title="Rating">
              <Row label="Score">
                <div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.1}
                    value={block.rating ?? 5}
                    onChange={(e) =>
                      onChange({ rating: parseFloat(e.target.value) })
                    }
                    style={{ width: "100%", accentColor: T.accent }}
                  />
                  <p
                    style={{
                      fontSize: 11,
                      color: T.text3,
                      textAlign: "right",
                      marginTop: 2,
                    }}
                  >
                    {Number(block.rating ?? 5).toFixed(1)} / 5.0
                  </p>
                </div>
              </Row>
              <Row label="Count">
                <PropInput
                  value={block.count ?? ""}
                  onChange={(v: string) => onChange({ count: v })}
                  placeholder="2,847"
                />
              </Row>
              <Row label="Label">
                <PropInput
                  value={block.text ?? ""}
                  onChange={(v: string) => onChange({ text: v })}
                  placeholder="verified reviews"
                />
              </Row>
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Stars"
                value={block.starColor}
                onChange={(v: string) => onChange({ starColor: v })}
              />
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
          </>
        );

      case "callout":
        return (
          <>
            <Section title="Icon & Label">
              <Row label="Icon">
                <PropInput
                  value={block.icon ?? ""}
                  onChange={(v: string) => onChange({ icon: v })}
                  placeholder="💡"
                />
              </Row>
              <Row label="Label">
                <PropInput
                  value={block.title ?? ""}
                  onChange={(v: string) => onChange({ title: v })}
                  placeholder="Pro Tip"
                />
              </Row>
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
              <ColorRow
                label="Left Border"
                value={block.borderColor}
                onChange={(v: string) => onChange({ borderColor: v })}
              />
              <ColorRow
                label="Title Text"
                value={block.titleColor}
                onChange={(v: string) => onChange({ titleColor: v })}
              />
              <ColorRow
                label="Body Text"
                value={block.textColor}
                onChange={(v: string) => onChange({ textColor: v })}
              />
            </Section>
          </>
        );

      case "guarantee":
        return (
          <>
            <Section title="Colors">
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
              <ColorRow
                label="Border"
                value={block.borderColor}
                onChange={(v: string) => onChange({ borderColor: v })}
              />
              <ColorRow
                label="Headline"
                value={block.headlineColor}
                onChange={(v: string) => onChange({ headlineColor: v })}
              />
              <ColorRow
                label="Body Text"
                value={block.textColor}
                onChange={(v: string) => onChange({ textColor: v })}
              />
            </Section>
          </>
        );

      case "testimonial":
        return (
          <>
            <Section title="Colors">
              <ColorRow
                label="Card BG"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
              <ColorRow
                label="Quote"
                value={block.quoteColor}
                onChange={(v: string) => onChange({ quoteColor: v })}
              />
              <ColorRow
                label="Name"
                value={block.nameColor}
                onChange={(v: string) => onChange({ nameColor: v })}
              />
              <ColorRow
                label="Title"
                value={block.titleColor}
                onChange={(v: string) => onChange({ titleColor: v })}
              />
            </Section>
            <Section title="Avatar">
              <ColorRow
                label="Avatar BG"
                value={block.avatarBg}
                onChange={(v: string) => onChange({ avatarBg: v })}
              />
              <ColorRow
                label="Avatar Text"
                value={block.avatarColor}
                onChange={(v: string) => onChange({ avatarColor: v })}
              />
            </Section>
          </>
        );

      case "countdown":
        return (
          <>
            <Section title="Timer">
              <Row label="Hours">
                <PropInput
                  value={String(block.hours ?? 0)}
                  onChange={(v: string) =>
                    onChange({ hours: parseInt(v) || 0 })
                  }
                />
              </Row>
              <Row label="Minutes">
                <PropInput
                  value={String(block.minutes ?? 0)}
                  onChange={(v: string) =>
                    onChange({ minutes: parseInt(v) || 0 })
                  }
                />
              </Row>
              <Row label="Seconds">
                <PropInput
                  value={String(block.seconds ?? 0)}
                  onChange={(v: string) =>
                    onChange({ seconds: parseInt(v) || 0 })
                  }
                />
              </Row>
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
              <ColorRow
                label="Digit BG"
                value={block.digitBg}
                onChange={(v: string) => onChange({ digitBg: v })}
              />
              <ColorRow
                label="Digit Text"
                value={block.digitColor}
                onChange={(v: string) => onChange({ digitColor: v })}
              />
              <ColorRow
                label="Headline"
                value={block.headlineColor}
                onChange={(v: string) => onChange({ headlineColor: v })}
              />
            </Section>
          </>
        );

      case "faq":
        return (
          <>
            <Section title="Colors">
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
              <ColorRow
                label="Question"
                value={block.questionColor}
                onChange={(v: string) => onChange({ questionColor: v })}
              />
              <ColorRow
                label="Answer"
                value={block.answerColor}
                onChange={(v: string) => onChange({ answerColor: v })}
              />
              <ColorRow
                label="Borders"
                value={block.borderColor}
                onChange={(v: string) => onChange({ borderColor: v })}
              />
            </Section>
          </>
        );

      case "divider":
        return (
          <>
            <Section title="Style">
              <Row label="Style">
                <SegControl
                  options={[
                    ["line", "Line"],
                    ["space", "Space"],
                  ]}
                  value={block.style ?? "line"}
                  onChange={(v: string) => onChange({ style: v })}
                />
              </Row>
              <ColorRow
                label="Color"
                value={block.color}
                onChange={(v: string) => onChange({ color: v })}
              />
              <Slider
                label="Thickness"
                value={block.thickness ?? 1}
                min={1}
                max={8}
                step={1}
                unit="px"
                onChange={(v: number) => onChange({ thickness: v })}
              />
              <Row label="Label">
                <PropInput
                  value={block.label ?? ""}
                  onChange={(v: string) => onChange({ label: v })}
                  placeholder="Optional label…"
                />
              </Row>
            </Section>
          </>
        );

      case "image":
        return (
          <>
            <Section title="Image Settings">
              <Row label="Alt Text">
                <PropInput
                  value={block.alt ?? ""}
                  onChange={(v: string) => onChange({ alt: v })}
                  placeholder="Describe the image…"
                />
              </Row>
              <Row label="Caption">
                <PropInput
                  value={block.description ?? ""}
                  onChange={(v: string) => onChange({ description: v })}
                  placeholder="Optional caption…"
                />
              </Row>
              <Row label="Fit">
                <SegControl
                  options={[
                    ["cover", "Cover"],
                    ["contain", "Contain"],
                    ["fill", "Fill"],
                  ]}
                  value={block.objectFit ?? "cover"}
                  onChange={(v: string) => onChange({ objectFit: v })}
                />
              </Row>
            </Section>
            <Section title="Size & Shape">
              <Row label="Width">
                <PropInput
                  value={block.width ?? ""}
                  onChange={(v: string) => onChange({ width: v })}
                  placeholder="100% or 400px…"
                />
              </Row>
              <Row label="Height">
                <PropInput
                  value={String(block.height ?? "auto")}
                  onChange={(v: string) =>
                    onChange({
                      height: v === "auto" ? "auto" : parseInt(v) || "auto",
                    })
                  }
                  placeholder="auto or 300…"
                />
              </Row>
              <Slider
                label="Radius"
                value={block.rounded ?? 12}
                min={0}
                max={48}
                step={2}
                unit="px"
                onChange={(v: number) => onChange({ rounded: v })}
              />
            </Section>
            <Section title="AI Image Generator">
              <Label>Describe your image</Label>
              <textarea
                className="prop-input"
                rows={3}
                value={block.aiPrompt ?? ""}
                onChange={(e) => onChange({ aiPrompt: e.target.value })}
                placeholder="Describe the image you want to generate…"
                style={{
                  resize: "vertical",
                  marginBottom: 8,
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={generateAIImagePrompt}
                disabled={aiState.loading}
                className="ai-btn"
                style={{ marginBottom: 6 }}
              >
                {aiState.loading ? (
                  <>
                    <Ic d={ICONS.loading} s={12} c={T.teal} /> Generating
                    prompt…
                  </>
                ) : (
                  <>
                    <Ic d={ICONS.wand} s={12} c={T.teal} /> AI Suggest Prompt
                  </>
                )}
              </button>
              <button
                onClick={async () => {
                  const prompt =
                    block.aiPrompt ||
                    block.alt ||
                    "professional product lifestyle photo";
                  const src = `https://image.pollinations.ai/prompt/${encodeURIComponent(
                    prompt + ", professional, high quality",
                  )}?width=800&height=500&nologo=true&seed=${Date.now()}`;
                  onChange({ src });
                }}
                disabled={!block.aiPrompt}
                className="ai-btn"
                style={{
                  background: "rgba(243,93,44,0.1)",
                  borderColor: "rgba(243,93,44,0.3)",
                  color: T.accent,
                }}
              >
                <Ic d={ICONS.sparkle} s={12} c={T.accent} /> Generate AI Image ✦
              </button>
            </Section>
            <Section title="Background">
              <ColorRow
                label="Block BG"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
          </>
        );

      case "video":
        return (
          <>
            <Section title="Video Embed">
              <Label>YouTube or Vimeo URL</Label>
              <Row label="">
                <PropInput
                  value={block.url ?? ""}
                  onChange={(v: string) => onChange({ url: v })}
                  placeholder="https://youtube.com/watch?v=…"
                  mono
                />
              </Row>
              <Row label="Title">
                <PropInput
                  value={block.title ?? ""}
                  onChange={(v: string) => onChange({ title: v })}
                  placeholder="Optional video title…"
                />
              </Row>
              <Slider
                label="Radius"
                value={block.rounded ?? 12}
                min={0}
                max={24}
                step={2}
                unit="px"
                onChange={(v: number) => onChange({ rounded: v })}
              />
            </Section>
            <Section title="AI Suggest Video">
              <button
                onClick={findRelatedVideo}
                disabled={aiState.videoLoading}
                className="ai-btn"
              >
                {aiState.videoLoading ? (
                  <>
                    <Ic d={ICONS.loading} s={12} c={T.teal} /> Searching…
                  </>
                ) : (
                  <>
                    <Ic d={ICONS.sparkle} s={12} c={T.teal} /> Find Related
                    YouTube Videos
                  </>
                )}
              </button>
              {block.videoSuggestions && (
                <div
                  style={{
                    marginTop: 10,
                    background: T.bg3,
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      color: T.text3,
                      marginBottom: 6,
                      fontWeight: 700,
                    }}
                  >
                    SEARCH THESE ON YOUTUBE:
                  </p>
                  <pre
                    style={{
                      fontSize: 11,
                      color: T.text2,
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.6,
                      fontFamily: "inherit",
                    }}
                  >
                    {block.videoSuggestions}
                  </pre>
                </div>
              )}
            </Section>
            <Section title="Colors">
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
          </>
        );

      case "spacer":
        return (
          <>
            <Section title="Spacer">
              <Slider
                label="Height"
                value={Number(block.height) || 48}
                min={8}
                max={300}
                step={8}
                unit="px"
                onChange={(v: number) => onChange({ height: v })}
              />
              <ColorRow
                label="Background"
                value={block.bg}
                onChange={(v: string) => onChange({ bg: v })}
              />
            </Section>
          </>
        );

      default:
        return (
          <p
            style={{
              fontSize: 11,
              color: T.text3,
              fontStyle: "italic",
              padding: "8px 0",
            }}
          >
            No additional properties.
          </p>
        );
    }
  };

  return (
    <div
      style={{
        padding: "12px 16px",
        overflowY: "auto",
        height: "100%",
        color: T.text1,
      }}
      className="panel-slide"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
          paddingBottom: 12,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: T.accent,
            boxShadow: "0 0 8px rgba(243,93,44,0.6)",
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: T.text2,
            letterSpacing: 0.5,
          }}
        >
          {typeLabel}
        </span>
      </div>
      {renderProps()}
      <p
        style={{
          fontSize: 10,
          color: T.text4,
          textAlign: "center",
          marginTop: 8,
        }}
      >
        Click text directly on canvas to edit content
      </p>
    </div>
  );
}
