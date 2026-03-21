import React from "react";
import { T, ICONS, ELEMENT_GROUPS } from "./constants";
import { Ic } from "./icons";

// Minimal Block interface (matches the one used in the parent)
interface Block {
  id: string;
  type: string;
  [key: string]: unknown;
}

// Minimal Page interface – only the fields used in this component
interface Page {
  id: string;
  label: string;
  icon: string;
  bg: string;
  blocks: Block[];
}

interface LeftPanelProps {
  leftTab: "elements" | "layers";
  setLeftTab: (tab: "elements" | "layers") => void;
  activePage: Page | undefined;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  setRightTab: (tab: "properties" | "page") => void;
  addBlock: (type: string) => void;
}

export default function LeftPanel({
  leftTab,
  setLeftTab,
  activePage,
  selectedId,
  setSelectedId,
  setRightTab,
  addBlock,
}: LeftPanelProps) {
  return (
    <div
      style={{
        width: 210,
        background: T.bg1,
        borderRight: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", padding: "10px 10px 0", gap: 4, flexShrink: 0 }}>
        {[
          ["elements", "Elements"],
          ["layers", "Layers"],
        ].map(([v, l]) => (
          <button
            key={v}
            onClick={() => setLeftTab(v as "elements" | "layers")}
            style={{
              flex: 1,
              padding: "6px 0",
              borderRadius: "8px 8px 0 0",
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 700,
              transition: "all 0.15s",
              background: leftTab === v ? T.bg2 : "none",
              color: leftTab === v ? T.text1 : T.text3,
              borderBottom: leftTab === v ? `2px solid ${T.accent}` : "2px solid transparent",
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={{ height: 1, background: T.border }} />

      {leftTab === "elements" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px 16px" }}>
          {ELEMENT_GROUPS.map((g) => (
            <div key={g.label} style={{ marginBottom: 14 }}>
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: 1.8,
                  color: g.color + "88",
                  margin: "0 4px 5px",
                }}
              >
                {g.label}
              </p>
              {g.items.map((el) => (
                <button
                  key={el.type}
                  onClick={() => addBlock(el.type)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "7px 10px",
                    borderRadius: 9,
                    border: "none",
                    cursor: "pointer",
                    background: "none",
                    textAlign: "left",
                    marginBottom: 1,
                    transition: "background 0.12s",
                    color: T.text2,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = T.bg4;
                    e.currentTarget.style.color = T.text1;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.color = T.text2;
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: g.color + "18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Ic d={el.icon} s={13} c={g.color} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{el.label}</span>
                  <Ic d={ICONS.plus} s={10} c={T.text4} style={{ marginLeft: "auto" }} />
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {leftTab === "layers" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
          {activePage?.blocks.map((b: Block, i: number) => (
            <button
              key={b.id}
              onClick={() => {
                setSelectedId(b.id);
                setRightTab("properties");
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 10px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                marginBottom: 2,
                transition: "all 0.12s",
                background: selectedId === b.id ? T.accentDim : "none",
                color: selectedId === b.id ? T.accent : T.text2,
                boxShadow: selectedId === b.id ? `inset 0 0 0 1px ${T.accent}` : "none",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: T.text4,
                  width: 14,
                  flexShrink: 0,
                  textAlign: "right",
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, flex: 1, textTransform: "capitalize" }}>
                {b.type}
              </span>
            </button>
          ))}
          {!activePage?.blocks.length && (
            <p
              style={{
                fontSize: 11,
                color: T.text4,
                textAlign: "center",
                padding: "24px 0",
                fontStyle: "italic",
              }}
            >
              No blocks yet.
              <br />
              Add from Elements.
            </p>
          )}
        </div>
      )}
    </div>
  );
}