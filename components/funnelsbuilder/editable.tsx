import React, { useRef, useEffect, ElementType, CSSProperties, KeyboardEvent } from "react";

interface EditableProps {
  value: string;
  onChange: (newValue: string) => void;
  tag?: ElementType;
  placeholder?: string;
  multiline?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function Editable({
  value,
  onChange,
  tag: Tag = "span",
  placeholder = "Click to edit…",
  multiline = false,
  style: s = {},
  className = "",
}: EditableProps) {
  const ref = useRef<HTMLElement>(null);
  const active = useRef(false);

  useEffect(() => {
    if (ref.current && !active.current && ref.current.textContent !== (value || "")) {
      ref.current.textContent = value || "";
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-ph={placeholder}
      className={`editable-focus ${className}`}
      style={{ cursor: "text", outline: "none", ...s }}
      onFocus={() => {
        active.current = true;
      }}
      onBlur={() => {
        active.current = false;
        onChange(ref.current?.textContent || "");
      }}
      onInput={() => {
        onChange(ref.current?.textContent || "");
      }}
      onKeyDown={handleKeyDown}
    />
  );
}