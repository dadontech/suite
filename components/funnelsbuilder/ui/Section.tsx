import React, { useState, ReactNode } from "react";
import { T, ICONS } from "../constants";
import { Ic } from "../icons";
import { Divider } from "./Divider";

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 2 }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 0", background: "none", border: "none", cursor: "pointer" }}>
        <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.8, color: T.text3 }}>{title}</span>
        <Ic d={open ? ICONS.up : ICONS.down} s={11} c={T.text3} />
      </button>
      {open && <div style={{ animation: "fadeIn 0.15s ease" }}>{children}</div>}
      <Divider />
    </div>
  );
}