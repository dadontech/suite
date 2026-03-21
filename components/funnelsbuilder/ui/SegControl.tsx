import React from "react";

interface SegControlProps<T> {
  options: Array<[T, string]>;
  value: T;
  onChange: (value: T) => void;
}

export function SegControl<T>({ options, value, onChange }: SegControlProps<T>) {
  return (
    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {options.map(([v, l]) => (
        <button
          key={String(v)}
          className={`seg-btn ${value === v ? "active" : "inactive"}`}
          onClick={() => onChange(v)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}