import React, { useState } from "react";
import { ICONS } from "../constants";
import { Ic } from "../icons";

export function ImageBlock({ block, onChange, preview }) {
  const [loading, setLoading] = useState(false);
  const [genPrompt, setGenPrompt] = useState(block.aiPrompt || "");

  const generateImage = async () => {
    const prompt = genPrompt || block.description || block.alt || "professional product lifestyle photo";
    setLoading(true);
    try {
      const w = 800, h = 500;
      const src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ", professional, high quality, photorealistic")}?width=${w}&height=${h}&nologo=true&model=flux&seed=${Date.now()}`;
      onChange({ src, aiPrompt: prompt });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const br = block.rounded ?? 12;
  const w = block.width || "100%";
  const h = block.height && block.height !== "auto" ? `${block.height}px` : "auto";

  if (block.src) {
    return (
      <div style={{ background: block.bg || "transparent" }}>
        <img src={block.src} alt={block.alt || ""} style={{ width: w, height: h, objectFit: block.objectFit || "cover", borderRadius: br, display: "block" }} />
        {block.alt && <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>{block.alt}</p>}
        {!preview && (
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={() => onChange({ src: null })} style={{ flex: 1, padding: "6px 0", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 7, color: "#ef4444", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Remove Image</button>
            <button onClick={generateImage} disabled={loading} className="ai-btn" style={{ flex: 1 }}>
              {loading ? <><Ic d={ICONS.loading} s={12} c="#00b4c4" /> Generating…</> : <><Ic d={ICONS.sparkle} s={12} c="#00b4c4" /> Regenerate</>}
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div style={{ background: block.bg || "transparent" }}>
      <div style={{ border: "2px dashed #e5e7eb", background: "#fafafa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", gap: 10, borderRadius: br, cursor: "pointer" }}>
        <Ic d={ICONS.image} s={40} c="#d1d5db" />
        <p style={{ fontSize: 14, color: "#9ca3af", fontWeight: 600, margin: 0 }}>Image Placeholder</p>
        {block.alt && <p style={{ fontSize: 12, color: "#c4c4c4", margin: 0, fontStyle: "italic", textAlign: "center" }}>{block.alt}</p>}
      </div>
      {!preview && (
        <div style={{ marginTop: 10 }}>
          <input className="prop-input" value={genPrompt} onChange={e => setGenPrompt(e.target.value)} placeholder="Describe the image you want to generate…" style={{ marginBottom: 8 }} />
          <button onClick={generateImage} disabled={loading || !genPrompt} className="ai-btn">
            {loading ? <><Ic d={ICONS.loading} s={13} c="#00b4c4" /> Generating AI Image…</> : <><Ic d={ICONS.sparkle} s={13} c="#00b4c4" /> Generate with AI ✦</>}
          </button>
        </div>
      )}
    </div>
  );
}