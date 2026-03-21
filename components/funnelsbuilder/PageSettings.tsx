import React from "react";
import { T } from "./constants";
import { Section } from "./ui/Section";
import { ColorRow } from "./ui/ColorRow";
import { Row } from "./ui/Row";

// Minimal Page interface – only the fields used in this component
interface Page {
  id: string;
  bg?: string;
  blocks?: Array<unknown>; // we only need the length
}

interface PageSettingsProps {
  page: Page | undefined;
  onChange: (patch: Partial<Page>) => void;
}

export function PageSettings({ page, onChange }: PageSettingsProps) {
  return (
    <div style={{ padding: "12px 16px", color: T.text1 }}>
      <p
        style={{
          fontSize: 9,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: 1.8,
          color: T.text3,
          margin: "0 0 14px",
        }}
      >
        Page Settings
      </p>
      <Section title="Page Background">
        <ColorRow
          label="BG Color"
          value={page?.bg}
          onChange={(v: string) => onChange({ bg: v })}
        />
      </Section>
      <Section title="Page Info" defaultOpen={false}>
        <Row label="Page ID">
          <span style={{ fontSize: 11, color: T.text3, fontFamily: "monospace" }}>
            {page?.id}
          </span>
        </Row>
        <Row label="Blocks">
          <span style={{ fontSize: 11, color: T.text3 }}>
            {page?.blocks?.length || 0} blocks
          </span>
        </Row>
      </Section>
    </div>
  );
}