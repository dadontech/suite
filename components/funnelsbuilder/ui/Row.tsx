import React, { ReactNode } from "react";
import { T } from "../constants";

interface RowProps {
  label?: string;
  children: ReactNode;
  gap?: number;
}

export const Row = ({ label, children, gap = 8 }: RowProps) => (
  <div style={{ display: "flex", alignItems: "center", gap, marginBottom: 8 }}>
    {label && <span style={{ fontSize: 11, color: T.text3, width: 56, flexShrink: 0, lineHeight: 1.3 }}>{label}</span>}
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);