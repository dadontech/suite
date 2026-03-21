export const parseVideoUrl = (url: string) => {
  if (!url) return null;
  // YouTube
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (m) return { type: "youtube", id: m[1], embed: `https://www.youtube.com/embed/${m[1]}?autoplay=0&rel=0` };
  // Vimeo
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return { type: "vimeo", id: m[1], embed: `https://player.vimeo.com/video/${m[1]}` };
  // Direct embed
  if (url.includes("youtube.com/embed/")) return { type: "youtube", id: "", embed: url };
  return null;
};

export const uid = () => `b${Date.now()}${Math.random().toString(36).slice(2, 6)}`;