import React from "react";
import { T } from "../constants";
import { Row } from "./Row";

interface ColorRowProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export function ColorRow({ label, value, onChange }: ColorRowProps) {
  return (
    <Row label={label}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <div style={{ position: "relative", width: 28, height: 28, borderRadius: 7, overflow: "hidden", border: `1px solid ${T.border}`, flexShrink: 0, background: value || "#ffffff" }}>
          <input
            type="color"
            value={value || "#ffffff"}
            onChange={e => onChange(e.target.value)}
            style={{ position: "absolute", inset: "-4px", width: "calc(100% + 8px)", height: "calc(100% + 8px)", opacity: 0, cursor: "pointer" }}
          />
        </div>
        <input
          className="prop-input"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          placeholder="#hex or rgba(…)"
          style={{ flex: 1, fontFamily: "monospace", fontSize: 11 }}
        />
      </div>
    </Row>
  );
}