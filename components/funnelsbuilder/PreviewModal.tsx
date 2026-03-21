import React, { useState } from "react";
import { T, ICONS } from "./constants";
import { Ic } from "./icons";
import { BlockWrapper, PaletteProvider, type Palette } from "./BlockWrapper";

interface Page {
  id: string;
  label: string;
  icon: string;
  bg: string;
  blocks: any[];
}

interface VideoSuggestionData {
  title: string;
  embedUrl?: string;
  searchUrl?: string;
  videoUrl?: string;
}

interface PreviewModalProps {
  pages: Page[];
  startPage: string;
  video?: VideoSuggestionData;
  palette: Palette;
  onClose: () => void;
}

export function PreviewModal({ pages, startPage, video, palette, onClose }: PreviewModalProps) {
  const [pid, setPid] = useState(startPage);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const page = pages.find(p => p.id === pid) || pages[0];

  const devices = {
    desktop: { width: "100%", maxWidth: 1400, shadow: "shadow-2xl", radius: "rounded-xl" },
    tablet:  { width: 820,    maxWidth: 820,   shadow: "shadow-2xl", radius: "rounded-2xl" },
    mobile:  { width: 390,    maxWidth: 390,   shadow: "shadow-2xl", radius: "rounded-3xl" },
  };
  const current = devices[device];

  const noop = () => {};
  const noopUpdate = () => {};
  const noopMove = () => {};

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm">
      {/* Top bar – unchanged */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/10 bg-black/80 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
          >
            <Ic d={ICONS.chevL} s={14} c="currentColor" />
            Back to Editor
          </button>
          <div className="w-px h-5 bg-white/20" />
          <div className="flex items-center gap-2 overflow-x-auto max-w-[60vw]">
            {pages.map((p, i) => (
              <div key={p.id} className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setPid(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    pid === p.id
                      ? "bg-accent text-white shadow-lg"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Ic d={ICONS[p.icon as keyof typeof ICONS]} s={12} c={pid === p.id ? "white" : "currentColor"} />
                  {p.label}
                </button>
                {i < pages.length - 1 && <Ic d={ICONS.chevR} s={8} c="white/30" />}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
          {[
            { id: "desktop", icon: ICONS.monitor, label: "Desktop" },
            { id: "tablet", icon: ICONS.tablet, label: "Tablet" },
            { id: "mobile", icon: ICONS.mobile, label: "Mobile" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id as typeof device)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                device === d.id
                  ? "bg-accent text-white shadow-md"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Ic d={d.icon} s={12} c="currentColor" />
              <span className="hidden sm:inline">{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Video suggestion card – same as before */}
      {video && (
        <div className="mx-auto mt-4 w-full max-w-4xl px-4">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-lg">
            {video.embedUrl ? (
              <>
                <div className="w-32 h-20 rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-black/20">
                  <iframe
                    src={video.embedUrl}
                    className="w-full h-full border-none"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-accent text-xs font-bold uppercase tracking-wider mb-1">🎥 Recommended Video</p>
                  <p className="text-white font-semibold text-sm">{video.title}</p>
                </div>
                <a
                  href={video.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-colors no-underline shadow-md"
                >
                  <Ic d={ICONS.eye} s={12} c="white" />
                  Watch Video
                </a>
              </>
            ) : video.searchUrl ? (
              <>
                <div className="flex-1">
                  <p className="text-accent text-xs font-bold uppercase tracking-wider mb-1">🔍 Suggested Search</p>
                  <p className="text-white font-semibold text-sm">{video.title}</p>
                </div>
                <a
                  href={video.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-colors no-underline shadow-md"
                >
                  <Ic d={ICONS.youtube} s={12} c="white" />
                  Search YouTube
                </a>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Preview canvas */}
      <div className="flex-1 overflow-y-auto flex justify-center items-start py-8 px-4">
        <div
          className="transition-all duration-300 ease-out"
          style={{ width: typeof current.width === "number" ? current.width : current.width, maxWidth: current.maxWidth }}
        >
          {device !== "desktop" && (
            <div className="bg-black/20 backdrop-blur-sm rounded-t-2xl p-2 border border-white/10 border-b-0">
              <div className="flex justify-center">
                <div className="w-24 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          )}
          <div
            className={`
              bg-white overflow-hidden transition-all duration-300
              ${device === "desktop" ? "rounded-xl shadow-2xl" : ""}
              ${device === "tablet" ? "rounded-2xl shadow-2xl" : ""}
              ${device === "mobile" ? "rounded-3xl shadow-2xl" : ""}
            `}
            style={{ background: page.bg || "#ffffff" }}
          >
            <div style={{ padding: device === "mobile" ? "0 12px" : "56px 56px 0" }}>
              <PaletteProvider palette={palette}>
                {page.blocks.map((block, idx) => (
                  <BlockWrapper
                    key={block.id}
                    block={block}
                    index={idx}
                    total={page.blocks.length}
                    selected={false}
                    preview={true}                       // ← disable editing in preview
                    onSelect={noop}
                    onUpdate={noopUpdate}
                    onMove={noopMove}
                    onDelete={noop}
                    onDuplicate={noop}
                  />
                ))}
                <div className="h-12" />
              </PaletteProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}