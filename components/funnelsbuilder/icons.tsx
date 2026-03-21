import React, { CSSProperties } from "react";
import { ICONS } from "./constants";

interface IcProps {
  d: string | string[];
  s?: number;
  sw?: number;
  c?: string;
  className?: string;
  style?: CSSProperties; // added for custom inline styles
}

export const Ic = ({ d, s = 15, sw = 1.7, c = "currentColor", className = "", style }: IcProps) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke={c}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style} // pass through
  >
    {Array.isArray(d) ? d.map((p: string, i: number) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);