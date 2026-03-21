import React, { useState, useEffect } from "react";
import { parseVideoUrl } from "../utils";
import { ICONS } from "../constants";
import { Ic } from "../icons";

interface VideoBlockProps {
  block: {
    url?: string;
    title?: string;
    bg?: string;
    rounded?: number;
    [key: string]: unknown;
  };
  onChange: (patch: Partial<VideoBlockProps["block"]>) => void;
  preview?: boolean;
}

export function VideoBlock({ block, onChange, preview = false }: VideoBlockProps) {
  const [urlInput, setUrlInput] = useState(block.url || "");
  const parsed = parseVideoUrl(block.url || "");
  const br = block.rounded ?? 12;

  // Sync input when block.url changes (e.g., after auto‑embed)
  useEffect(() => {
    const newUrl = block.url || "";
    if (urlInput !== newUrl) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setUrlInput(newUrl);
    }
  }, [block.url, urlInput]);

  const handleEmbed = () => {
    if (urlInput.trim()) onChange({ url: urlInput.trim() });
  };

  const handleRemove = () => {
    onChange({ url: "" });
    setUrlInput("");
  };

  // If we have a valid URL, show the video player
  if (parsed) {
    return (
      <div style={{ background: block.bg || "transparent" }}>
        <div
          style={{
            borderRadius: br,
            overflow: "hidden",
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
          }}
        >
          <iframe
            src={parsed.embed}
            title={block.title || "Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          />
        </div>
        {block.title && (
          <p
            style={{
              fontSize: 13,
              color: "#6B5E5E",
              textAlign: "center",
              marginTop: 10,
              fontWeight: 500,
            }}
          >
            {block.title}
          </p>
        )}
        {!preview && (
          <button
            onClick={handleRemove}
            style={{
              width: "100%",
              marginTop: 10,
              padding: "7px",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.15)",
              borderRadius: 8,
              color: "#ef4444",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Remove Video
          </button>
        )}
      </div>
    );
  }

  // No URL – show placeholder and input (only in edit mode)
  return (
    <div style={{ background: block.bg || "transparent" }}>
      <div
        style={{
          background: "#0f0f1e",
          borderRadius: br,
          padding: "48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            background: "rgba(243,93,44,0.15)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ic d={ICONS.play} s={28} c="#F35D2C" sw={1.5} />
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 600 }}>
          Video Block
        </p>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
          Paste a YouTube or Vimeo URL to embed
        </p>
      </div>
      {!preview && (
        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <input
            className="prop-input"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=…"
            onKeyDown={(e) => e.key === "Enter" && handleEmbed()}
            style={{ flex: 1 }}
          />
          <button
            onClick={handleEmbed}
            style={{
              padding: "7px 14px",
              background: "#F35D2C",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Embed
          </button>
        </div>
      )}
    </div>
  );
}