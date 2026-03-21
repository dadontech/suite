import React from "react";

interface PropInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mono?: boolean; // now optional
}

export function PropInput({ value, onChange, placeholder, mono = false }: PropInputProps) {
  return (
    <input
      className={`prop-input ${mono ? "font-mono text-[11px]" : ""}`}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}