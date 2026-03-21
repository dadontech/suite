"use client";

import { motion } from "framer-motion";

interface ToggleProps {
  enabled: boolean;
  onChange: (checked: boolean) => void;
}

export default function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#F35D2C]/30 ${
        enabled ? "bg-[#F35D2C]" : "bg-[#006E74]/20"
      }`}
    >
      <span className="sr-only">Toggle</span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="inline-block h-5 w-5 transform rounded-full bg-white shadow-sm"
        style={{
          x: enabled ? 22 : 2,
        }}
      />
    </button>
  );
}