import React from "react";
import { T } from "../constants";
import { Row } from "./Row";

interface SliderProps {
  label: string;
  value?: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, step = 1, unit = "", onChange }: SliderProps) {
  return (
    <Row label={label}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        <div style={{ flex: 1, padding: "0 4px" }}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value ?? min}
            onChange={e => onChange(Number(e.target.value))}
            style={{ width: "100%", accentColor: T.accent, margin: 0 }}
          />
        </div>
        <span style={{ fontSize: 11, color: T.text3, minWidth: 32, textAlign: "right" }}>
          {value ?? min}{unit}
        </span>
      </div>
    </Row>
  );
}