import React from "react";
import { T } from "../constants";

interface LabelProps {
  children: React.ReactNode;
  dim?: boolean; // now optional
}

export const Label = ({ children, dim = false }: LabelProps) => (
  <p
    style={{
      fontSize: 9,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: 1.8,
      color: dim ? T.text3 : T.text2,
      margin: "0 0 8px",
    }}
  >
    {children}
  </p>
);