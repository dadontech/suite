// ─── Design Tokens ────────────────────────────────────────────────────────────

export const T = {
  bg0: '#FAFAFA',
  bg1: '#FFFFFF',
  bg2: '#F4F5F6',
  bg3: '#EDEEF0',
  bg4: '#E2E4E6',
  border: 'rgba(107,94,94,0.1)',
  borderHover: 'rgba(107,94,94,0.22)',
  accent: '#F35D2C',
  accentDim: 'rgba(243,93,44,0.12)',
  accentHover: 'rgba(243,93,44,0.2)',
  teal: '#006E74',
  tealDim: 'rgba(0,110,116,0.1)',
  tealHover: 'rgba(0,110,116,0.18)',
  text1: '#111111',
  text2: '#4B4545',
  text3: '#8A8080',
  text4: '#C8C0C0',
};

// ─── Global CSS ───────────────────────────────────────────────────────────────

export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(107,94,94,0.14); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(107,94,94,0.26); }

  .fb-root {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    color: ${T.text1};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .fb-root * { font-family: inherit; }

  @keyframes fadeIn      { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeInFast  { from { opacity:0; } to { opacity:1; } }
  @keyframes scaleIn     { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
  @keyframes slideRight  { from { opacity:0; transform:translateX(-14px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideUp     { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin        { to { transform: rotate(360deg); } }
  @keyframes pulse       { 0%,100% { opacity:1; } 50% { opacity:0.38; } }
  @keyframes shimmer     { 0% { background-position:-600px 0; } 100% { background-position:600px 0; } }
  @keyframes glow        { 0%,100% { box-shadow:0 0 0 0 rgba(243,93,44,0); } 50% { box-shadow:0 0 24px 3px rgba(243,93,44,0.22); } }
  @keyframes countTick   { 0%,100% { transform:scale(1); } 50% { transform:scale(1.04); } }
  @keyframes borderPulse { 0%,100% { border-color:rgba(243,93,44,0.3); } 50% { border-color:rgba(243,93,44,0.9); } }

  .block-enter  { animation: fadeIn 0.22s ease forwards; }
  .panel-slide  { animation: slideRight 0.18s ease forwards; }
  .fade-in      { animation: fadeIn 0.28s ease forwards; }
  .scale-in     { animation: scaleIn 0.2s ease forwards; }

  .btn-lift { transition: transform 0.15s, box-shadow 0.15s; }
  .btn-lift:hover  { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(243,93,44,0.35); }
  .btn-lift:active { transform: translateY(0) scale(0.98); }

  .glow-accent  { animation: glow 3.5s ease infinite; }
  .pulse-border { animation: borderPulse 2s ease infinite; }

  .canvas-grid {
    background-image: radial-gradient(circle, rgba(107,94,94,0.055) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  .tooltip { position: relative; }
  .tooltip:hover .tip { opacity: 1; pointer-events: none; }
  .tip {
    position: absolute; bottom: calc(100% + 7px); left: 50%;
    transform: translateX(-50%);
    background: ${T.text1}; color: white;
    font-size: 10px; font-weight: 600; padding: 4px 9px;
    border-radius: 7px; white-space: nowrap;
    opacity: 0; transition: opacity 0.15s; z-index: 200; pointer-events: none;
    letter-spacing: 0.01em;
  }

  .prop-input {
    width: 100%; background: ${T.bg3}; border: 1px solid ${T.border};
    border-radius: 8px; padding: 7px 10px; font-size: 12px;
    color: ${T.text2}; outline: none;
    transition: border-color 0.15s, background 0.15s; font-family: inherit;
  }
  .prop-input:focus { border-color: ${T.accent}; background: ${T.accentDim}; color: ${T.text1}; }
  .prop-input::placeholder { color: ${T.text4}; }

  .seg-btn { padding: 5px 10px; border-radius: 6px; border: none; cursor: pointer; font-size: 11px; font-weight: 700; transition: all 0.15s; font-family: inherit; }
  .seg-btn.active   { background: ${T.accent}; color: white; }
  .seg-btn.inactive { background: ${T.bg3}; color: ${T.text3}; }
  .seg-btn.inactive:hover { background: ${T.bg4}; color: ${T.text2}; }

  .ai-btn {
    display: flex; align-items: center; gap: 6px; padding: 8px 12px;
    border-radius: 9px; border: 1px solid ${T.tealDim};
    background: ${T.tealDim}; color: ${T.teal};
    font-size: 11px; font-weight: 700; cursor: pointer;
    width: 100%; justify-content: center; transition: all 0.15s; font-family: inherit;
  }
  .ai-btn:hover    { background: ${T.tealHover}; border-color: ${T.teal}; }
  .ai-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .block-wrap { border-radius: 12px; transition: box-shadow 0.15s; }
  .block-wrap:hover    { box-shadow: 0 0 0 2px ${T.accentDim}; }
  .block-wrap.selected { box-shadow: 0 0 0 2px ${T.accent}, 0 0 20px ${T.accentDim}; }

  input[type=color] { -webkit-appearance: none; appearance: none; border: none; cursor: pointer; }
  input[type=color]::-webkit-color-swatch-wrapper { padding: 0; }
  input[type=color]::-webkit-color-swatch { border: none; border-radius: 5px; }

  input[type=range] {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 3px; border-radius: 99px;
    outline: none; cursor: pointer; background: ${T.bg4};
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%;
    background: ${T.accent}; cursor: pointer; box-shadow: 0 0 0 3px rgba(243,93,44,0.22);
  }
  input[type=range]::-moz-range-thumb {
    width: 14px; height: 14px; border-radius: 50%;
    background: ${T.accent}; cursor: pointer; border: none; box-shadow: 0 0 0 3px rgba(243,93,44,0.22);
  }
  input[type=range]::-moz-range-track { background: ${T.bg4}; height: 3px; border-radius: 99px; }

  [contenteditable]:empty:before { content: attr(data-ph); opacity: 0.28; font-style: italic; }

  .shimmer {
    background: linear-gradient(90deg, ${T.bg3} 25%, ${T.bg4} 37%, ${T.bg3} 63%);
    background-size: 600px 100%; animation: shimmer 1.4s ease infinite;
  }
`;

// ─── Icon Paths ───────────────────────────────────────────────────────────────

export const ICONS = {
  text:        'M4 6h16M4 12h16M4 18h12',
  h1:          'M4 4h16M4 10h8M4 16h12',
  sub:         'M4 8h16M4 14h10',
  para:        'M4 6h16M4 11h16M4 16h11',
  headline:    'M4 4h16M4 10h8M4 16h12',
  type:        'M4 7V4h16v3M9 20h6M12 4v16',
  columns:     'M3 3h7v18H3zM14 3h7v18h-7z',
  layout:      ['M3 3h7v7H3z','M14 3h7v7h-7z','M14 14h7v7h-7z','M3 14h7v7H3z'],
  divider:     'M3 12h18',
  space:       'M4 15h16M8 9h8',
  image:       ['M21 19H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z','M8.5 13.5l3-4 2.5 3.5 1.5-2 2 2.5'],
  img:         ['M21 19H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z','M8.5 13.5l3-4 2.5 3.5 1.5-2 2 2.5'],
  vid:         ['M15 10l4.55-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.45.894L15 14v-4z','M3 8h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z'],
  play:        ['M5 3l14 9-14 9V3z'],
  btn:         ['M2 9h20v6H2z'],
  rocket:      ['M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z','M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z','M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'],
  timer:       ['M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z','M12 6v6l4 2'],
  alert:       ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z','M12 9v4M12 17h.01'],
  guarantee:   ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','M9 12l2 2 4-4'],
  shield:      'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  countdown:   ['M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z','M12 6v6l4 2'],
  lock:        ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z','M7 11V7a5 5 0 0 1 10 0v4'],
  zap:         'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  gift:        ['M20 12v10H4V12','M2 7h20v5H2z','M12 22V7','M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z','M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'],
  mail:        ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z','M22 6l-10 7L2 6'],
  optin:       ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z','M22 6l-10 7L2 6'],
  star:        'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  quote:       'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z',
  users:       ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2','M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z','M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'],
  trophyGrid:  ['M8 21h8M12 17v4','M5 3h14l-1.68 8.39A2 2 0 0 1 15.36 13H8.64a2 2 0 0 1-1.96-1.61L5 3z','M5 3H3l1.5 8M19 3h2l-1.5 8'],
  list:        'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  comparison:  ['M3 3h8v18H3z','M13 3h8v18h-8z'],
  features:    ['M3 3h7v7H3z','M14 3h7v7h-7z','M3 14h7v7H3z','M14 14h7v7h-7z'],
  stats:       ['M18 20V10','M12 20V4','M6 20v-6'],
  badge:       ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  faq:         ['M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32'],
  article:     'M4 6h16M4 12h16M4 18h12',
  callout:     ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z','M12 9v4M12 17h.01'],
  attention:   'M3 12h18M3 6h18M3 18h12',
  sparkle:     ['M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z'],
  plus:        'M12 5v14M5 12h14',
  trash:       ['M3 6h18','M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
  copy:        ['M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z','M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 0 2 2v1'],
  up:          'M18 15l-6-6-6 6',
  down:        'M6 9l6 6 6-6',
  eye:         ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z','M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  check:       'M20 6L9 17l-5-5',
  chevR:       'M9 18l6-6-6-6',
  chevL:       'M15 18l-6-6 6-6',
  x:           'M18 6L6 18M6 6l12 12',
  arrow:       'M5 12h14M12 5l7 7-7 7',
  undo:        'M3 7v6h6M3.51 15a9 9 0 1 0 .49-3.96',
  redo:        'M21 7v6h-6M20.49 15a9 9 0 1 1-.49-3.96',
  monitor:     ['M20 3H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z','M8 21h8M12 17v4'],
  mobile:      ['M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z','M12 18h.01'],
  tablet:      ['M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z','M12 18h.01'],
  palette:     ['M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.29c0-.47-.19-.9-.48-1.2-.29-.3-.47-.71-.47-1.16C13.05 16.51 13.81 16 14.67 16H16c3.31 0 6-2.69 6-6C22 6.48 17.52 2 12 2z','M7 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-5-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  link:        ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71','M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  settings:    ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z','M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'],
  refresh:     'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
  loading:     'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83',
  wand:        ['M15 4V2','M15 16v-2','M8 9h2','M20 9h2','M17.8 11.8L19 13','M15 9h0','M17.8 6.2L19 5','M3 21l9-9','M12.2 6.2L11 5'],
  globe:       ['M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z','M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
  bg:          ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  fileText:    ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z','M14 2v6h6','M16 13H8M16 17H8M10 9H8'],
  gitBranch:   ['M6 3v12','M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z','M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z','M18 9a9 9 0 0 1-9 9'],
  helpCircle:  ['M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z','M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01'],
  target:      ['M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z','M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z','M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  layers:      ['M12 2L2 7l10 5 10-5-10-5z','M2 17l10 5 10-5','M2 12l10 5 10-5'],
  barChart:    ['M18 20V10','M12 20V4','M6 20v-6'],
  video:       ['M15 10l4.55-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.45.894L15 14v-4z','M3 8h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z'],
  shoppingCart:['M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z','M3 6h18','M16 10a4 4 0 0 1-8 0'],
};

// ─── Element Groups (Left Panel) ──────────────────────────────────────────────

export const ELEMENT_GROUPS = [
  {
    label: 'Heroes',
    color: '#F35D2C',
    items: [
      { type: 'hero',          label: 'Hero Block',      icon: ICONS.rocket    },
      { type: 'hero-dark',     label: 'Dark Hero',       icon: ICONS.rocket    },
      { type: 'attention-bar', label: 'Attention Bar',   icon: ICONS.attention },
      { type: 'article',       label: 'Article Header',  icon: ICONS.article   },
    ],
  },
  {
    label: 'Text',
    color: '#0284C7',
    items: [
      { type: 'headline',   label: 'Headline',     icon: ICONS.h1       },
      { type: 'subheading', label: 'Sub-heading',  icon: ICONS.sub      },
      { type: 'paragraph',  label: 'Paragraph',    icon: ICONS.para     },
      { type: 'callout',    label: 'Callout Box',  icon: ICONS.callout  },
    ],
  },
  {
    label: 'Media',
    color: '#7C3AED',
    items: [
      { type: 'image', label: 'Image', icon: ICONS.image },
      { type: 'video', label: 'Video', icon: ICONS.vid   },
    ],
  },
  {
    label: 'Convert',
    color: '#059669',
    items: [
      { type: 'button',     label: 'CTA Button',   icon: ICONS.btn       },
      { type: 'optin-form', label: 'Email Opt-in', icon: ICONS.optin     },
      { type: 'countdown',  label: 'Countdown',    icon: ICONS.timer     },
      { type: 'guarantee',  label: 'Guarantee',    icon: ICONS.guarantee },
      { type: 'badge',      label: 'Trust Badges', icon: ICONS.badge     },
    ],
  },
  {
    label: 'Social Proof',
    color: '#D97706',
    items: [
      { type: 'testimonial-grid', label: 'Testimonial Grid',   icon: ICONS.trophyGrid },
      { type: 'testimonial',      label: 'Single Testimonial', icon: ICONS.quote      },
      { type: 'stars',            label: 'Star Rating',        icon: ICONS.star       },
      { type: 'stats',            label: 'Stats Bar',          icon: ICONS.stats      },
    ],
  },
  {
    label: 'Content',
    color: '#BE123C',
    items: [
      { type: 'comparison', label: 'Comparison Table', icon: ICONS.comparison },
      { type: 'features',   label: 'Features Grid',    icon: ICONS.features   },
      { type: 'bullets',    label: 'Bullet List',      icon: ICONS.list       },
      { type: 'faq',        label: 'FAQ Accordion',    icon: ICONS.faq        },
    ],
  },
  {
    label: 'Layout',
    color: '#6B7280',
    items: [
      { type: 'divider', label: 'Divider', icon: ICONS.divider },
      { type: 'spacer',  label: 'Spacer',  icon: ICONS.space   },
    ],
  },
];

// ─── Block Defaults ───────────────────────────────────────────────────────────

export const BD: Record<string, Record<string, unknown>> = {

  hero: {
    type: 'hero', variant: 'centered',
    badge: 'Limited Time Offer',
    headline: 'The Fastest Way to Achieve the Results You Want',
    subheadline: 'Join 127,000+ customers who transformed their outcomes in 30 days or less. Completely risk-free.',
    cta: 'Get Instant Access Now', ctaLink: '#',
  },

  'hero-dark': {
    type: 'hero-dark',
    eyebrow: 'EXCLUSIVE OFFER — TODAY ONLY',
    headline: 'Stop Struggling. Start Winning.',
    subheadline: 'THE PROVEN SYSTEM',
    body: 'Discover the exact method used by the top 1% to achieve in 30 days what most people spend years attempting.',
    cta: 'Claim Your Spot Now', ctaLink: '#',
    stats: [
      { value: '127,000+', label: 'Active users'      },
      { value: '94.7%',    label: 'Success rate'      },
      { value: '$2.4M',    label: 'Results generated' },
      { value: '60 days',  label: 'Full guarantee'    },
    ],
  },

  'attention-bar': {
    type: 'attention-bar',
    headline: 'Limited time: 40% off ends tonight at midnight — do not miss this',
  },

  article: {
    type: 'article',
    headline: 'I Tested This for 90 Days. Here Is My Brutally Honest Verdict.',
    subheadline: 'After comparing 7 alternatives and spending over $3,000 in testing, one clear winner emerged.',
    author: 'Marcus Johnson',
    authorTitle: 'March 2026 · 11 min read',
  },

  headline: {
    type: 'headline',
    headline: 'Your Compelling Section Headline Goes Here',
  },

  subheading: {
    type: 'subheading',
    headline: 'A supporting statement that reinforces your message and builds desire in the reader.',
  },

  paragraph: {
    type: 'paragraph',
    body: '<p>Click to edit this paragraph. Write persuasive copy that speaks directly to your reader\'s deepest pain points and desires.</p><p>Keep sentences short and punchy. <strong>Every single word must earn its place.</strong> The goal is to move your reader one step closer to taking action.</p>',
  },

  callout: {
    type: 'callout',
    headline: 'Key Insight',
    body: 'After 90 days of daily testing and a head-to-head comparison against 6 direct competitors, this is the only product I still use and recommend without hesitation.',
  },

  image: {
    type: 'image', imageUrl: '', aspectRatio: '16/9', alt: 'Product hero image',
  },

  video: {
    type: 'video',
    headline: 'Watch the Full Breakdown',
    body: 'See exactly how this works — real results, real people, zero fluff.',
  },

  button: {
    type: 'button', variant: 'primary',
    cta: 'Get Instant Access — Risk Free', ctaLink: '#',
    subheadline: 'Secure checkout · 60-day guarantee · Cancel anytime',
  },

  'optin-form': {
    type: 'optin-form', variant: 'split',
    badge: 'FREE INSTANT ACCESS',
    headline: 'Get Your Free Guide + Exclusive Members Discount',
    subheadline: 'Join 47,000+ subscribers receiving proven strategies every week.',
    cta: 'Send Me the Free Guide',
    body: 'No spam, ever. Unsubscribe with one click at any time.',
    items: [
      'Instant access — guide delivered to your inbox immediately',
      'Exclusive member-only pricing on all products',
      'Weekly strategies used by top 1% performers',
    ],
  },

  countdown: {
    type: 'countdown',
    headline: 'This exclusive price disappears when the timer reaches zero',
    minutes: 25,
  },

  guarantee: {
    type: 'guarantee',
    headline: '60-Day Money-Back Guarantee',
    body: 'Try it completely risk-free for 60 full days. If you are not 100% satisfied for any reason whatsoever, contact us and we will refund every single penny. No questions asked, no hard feelings.',
  },

  badge: {
    type: 'badge',
    items: ['Secure Checkout','SSL Encrypted','256-bit Protection','47,000+ Customers','60-Day Guarantee','Instant Access'],
  },

  'testimonial-grid': {
    type: 'testimonial-grid', variant: 'cards',
    headline: 'Real People. Verified Results.',
    testimonials: [
      { quote: 'This completely transformed how I work. I went from struggling to get results to achieving my goals consistently within the first two weeks.', author: 'Sarah Mitchell', title: 'E-Commerce Director, Verified Buyer', stars: 5 },
      { quote: 'I have tested every product in this category. Nothing comes close to the quality, results, or the value this delivers. I recommend it to everyone.', author: 'Marcus Johnson', title: 'Digital Strategist, Verified Buyer', stars: 5 },
      { quote: 'Our team adopted this across 12 client accounts. The time savings alone justify three times the price. The results are undeniable.', author: 'Priya Kapoor', title: 'Agency Founder, Verified Buyer', stars: 5 },
    ],
  },

  testimonial: {
    type: 'testimonial',
    body: 'Best investment I have made this year. The results started showing within the first week and have only continued to improve. I only wish I had found this two years ago.',
    author: 'David Kim',
    authorTitle: 'Business Owner · Verified Buyer',
  },

  stars: {
    type: 'stars', rating: 4.9,
    ratingCount: '2,847 verified reviews',
    body: 'Rated the top product in this category by independent reviewers.',
  },

  stats: {
    type: 'stats', variant: 'dark',
    stats: [
      { value: '127,000+', label: 'Active Users'       },
      { value: '94.7%',    label: 'Satisfaction Rate'  },
      { value: '$2.4M',    label: 'Revenue Generated'  },
      { value: '60 Days',  label: 'Full Guarantee'     },
    ],
  },

  comparison: {
    type: 'comparison',
    headline: 'Why This Wins Against Every Alternative',
    subheadline: 'A direct, honest head-to-head comparison based on 90 days of testing.',
    leftTitle: 'This Product', rightTitle: 'The Alternative',
    proItems: [
      'Results visible within the first 7 days of use',
      'Dedicated 24/7 support — real humans, fast responses',
      'Lifetime access — no recurring fees, ever',
      'Works for complete beginners with zero prior experience',
      'Free lifetime updates included with every purchase',
    ],
    conItems: [
      'Takes weeks to see any meaningful results',
      'Support tickets go unanswered for 3 to 5 business days',
      'Monthly subscription required after the first year',
      'Steep learning curve requires prior technical knowledge',
      'Updates cost an additional fee each release',
    ],
  },

  features: {
    type: 'features', variant: 'cards',
    headline: 'Everything You Need, Nothing You Do Not',
    subheadline: 'Designed from the ground up to deliver results without the complexity.',
    columns: [
      { icon: 'zap',    title: 'Lightning Fast Setup',    body: 'From zero to full results in under 22 minutes. No technical knowledge required.'                        },
      { icon: 'target', title: 'Precision Targeting',     body: 'Reach exactly the right audience at exactly the right moment, every time.'                              },
      { icon: 'award',  title: '10,000+ Proven Results',  body: 'Built on real data from 10,000 successful implementations across every major niche.'                     },
    ],
  },

  bullets: {
    type: 'bullets',
    headline: 'What You Get When You Order Today',
    items: [
      'Full 60-day money-back guarantee — zero risk',
      'Instant digital access the moment your order is confirmed',
      'Free priority support from real humans, available 24/7',
      '97 dollars worth of exclusive bonuses — included at no charge',
      'Lifetime access to all future updates, completely free',
    ],
  },

  faq: {
    type: 'faq',
    headline: 'Frequently Asked Questions',
    items: [
      'Q: Is there a money-back guarantee? | A: Yes — a full 60-day money-back guarantee. If you are not completely satisfied for any reason, contact us and we will refund every penny. No questions, no hassle.',
      'Q: How quickly will I see results? | A: Most customers report noticeable, measurable improvements within the first 7 days of use. Some see results even faster.',
      'Q: Is this a one-time payment? | A: Yes, completely. One single payment, full lifetime access. No monthly fees, no hidden charges, no surprises — ever.',
      'Q: Does this work for beginners? | A: Absolutely. The system was specifically designed to work for complete beginners with zero prior experience.',
      'Q: What if I need help? | A: Our dedicated support team is available around the clock. We respond to every inquiry within 2 hours, guaranteed.',
    ],
  },

  divider: { type: 'divider' },
  spacer:  { type: 'spacer'  },
};

// ─── Starter Page Templates ───────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

export const PAGES: Record<string, { id: string; label: string; icon: string; bg: string; blocks: Record<string, unknown>[] }> = {

  blog: {
    id: 'blog', label: 'Blog Post', icon: 'fileText', bg: '#FAFAFA',
    blocks: [
      { id: uid(), ...BD['attention-bar'], headline: 'New review published: 90-day independent test — results may surprise you' },
      { id: uid(), ...BD.article },
      { id: uid(), ...BD.image, aspectRatio: '21/9', alt: 'Product review hero' },
      { id: uid(), ...BD.stars },
      { id: uid(), ...BD.paragraph, body: '<p>I will be completely honest with you — I was deeply skeptical when I first heard about this. I had already wasted thousands on products that overpromised and massively underdelivered.</p><p>But after my mentor recommended I give it a genuine 90-day test, I discovered something that genuinely surprised me. <strong>The results were not just real — they compounded.</strong></p>' },
      { id: uid(), ...BD.callout, headline: 'Quick verdict (90-day test)', body: 'After comparing 7 alternatives and spending over $3,000 in direct testing, this is the only product I still use every single day. The value-to-price ratio is the best I have found in this category.' },
      { id: uid(), ...BD.bullets, headline: 'What stood out after 90 days' },
      { id: uid(), ...BD.testimonial },
      { id: uid(), ...BD.paragraph, body: '<h2>The Real-World Test</h2><p>Let me walk you through exactly what happened during my 90-day experiment — the good, the genuinely surprising, and the one thing I wish someone had told me before I started.</p>' },
      { id: uid(), ...BD.comparison },
      { id: uid(), ...BD.button, cta: 'See Full Details + Best Price Available', ctaLink: '#', subheadline: 'No obligation · Secure page · 60-day guarantee' },
    ],
  },

  optin: {
    id: 'optin', label: 'Email Opt-in', icon: 'mail', bg: '#F4F8F5',
    blocks: [
      { id: uid(), ...BD['attention-bar'], headline: 'Claim your exclusive free guide — available for a limited time only' },
      { id: uid(), ...BD.headline, headline: 'Get the Free Guide That 47,000 Subscribers Used to Get Real Results' },
      { id: uid(), ...BD.subheading, headline: 'Enter your details below and we will send it directly to your inbox — completely free, zero spam.' },
      { id: uid(), ...BD['optin-form'] },
      { id: uid(), ...BD.stars, body: 'Rated 4.9 out of 5 by 2,847 verified subscribers.' },
      { id: uid(), ...BD.testimonial, body: 'I signed up expecting the usual filler content. What I got was a genuinely actionable guide that changed how I approach everything. The results started within the first week.', author: 'Rachel Torres', authorTitle: 'Marketing Director · Subscriber since 2023' },
      { id: uid(), ...BD.badge },
    ],
  },

  review: {
    id: 'review', label: 'Review Page', icon: 'eye', bg: '#FFFFFF',
    blocks: [
      { id: uid(), ...BD.headline, headline: 'The Most Comprehensive Honest Review You Will Find Online' },
      { id: uid(), ...BD.stars, rating: 4.9 },
      { id: uid(), ...BD.image, aspectRatio: '16/9', alt: 'Product overview' },
      { id: uid(), ...BD.paragraph, body: '<p>After 90 days of daily use and a direct head-to-head comparison against 6 competing products, here is every detail you need to make a confident, fully informed decision.</p>' },
      { id: uid(), ...BD.features },
      { id: uid(), ...BD.comparison },
      { id: uid(), ...BD['testimonial-grid'] },
      { id: uid(), ...BD.callout, headline: 'Editor\'s Verdict', body: 'If you are serious about getting results, this is the clear choice. The value-to-price ratio is genuinely the best available in this category right now. I recommend it without reservation.' },
      { id: uid(), ...BD.countdown },
      { id: uid(), ...BD.button, cta: 'Get the Best Available Price Now', ctaLink: '#' },
      { id: uid(), ...BD.guarantee },
      { id: uid(), ...BD.faq },
      { id: uid(), ...BD.badge },
    ],
  },

  decision: {
    id: 'decision', label: 'Decision Guide', icon: 'check', bg: '#FFFFFF',
    blocks: [
      { id: uid(), ...BD.headline, headline: 'Here Is Exactly What You Get When You Order Today' },
      { id: uid(), ...BD.features },
      { id: uid(), ...BD.stats },
      { id: uid(), ...BD.bullets },
      { id: uid(), ...BD['testimonial-grid'], variant: 'featured' },
      { id: uid(), ...BD.countdown },
      { id: uid(), ...BD.guarantee },
      { id: uid(), ...BD.button, cta: 'Yes — I Want Instant Access Now', ctaLink: '#' },
      { id: uid(), ...BD.faq },
      { id: uid(), ...BD.badge },
    ],
  },

  checkout: {
    id: 'checkout', label: 'Checkout', icon: 'shoppingCart', bg: '#FBF8F5',
    blocks: [
      { id: uid(), ...BD.countdown, headline: 'Your exclusive discount expires when this timer hits zero' },
      { id: uid(), ...BD.headline, headline: 'You Are One Step Away — Here Is Everything You Receive Today' },
      { id: uid(), ...BD.bullets, headline: 'Complete order summary' },
      { id: uid(), ...BD['testimonial-grid'], variant: 'dark', headline: 'Thousands of verified customers cannot be wrong' },
      { id: uid(), ...BD.stats },
      { id: uid(), ...BD.guarantee },
      { id: uid(), ...BD.button, cta: 'Complete My Secure Order Now', ctaLink: '#', subheadline: '256-bit SSL · Secure checkout · Instant access · 60-day guarantee' },
      { id: uid(), ...BD.badge },
      { id: uid(), ...BD.faq },
    ],
  },

  bridge: {
    id: 'bridge', label: 'Bridge Page', icon: 'layers', bg: '#FAF8F4',
    blocks: [
      { id: uid(), ...BD['attention-bar'], headline: 'Read this before you visit the next page — it changes everything' },
      { id: uid(), ...BD.hero, variant: 'minimal', headline: 'The One Thing That Finally Made the Difference for Me', badge: 'Personal Story' },
      { id: uid(), ...BD.paragraph, body: '<p>Six months ago I was exactly where you probably are right now. I had tried everything, spent more money than I care to admit, and was genuinely close to giving up entirely.</p><p>Then a colleague introduced me to what I am about to share with you. I was skeptical — more skeptical than you are right now. But the results over the following 30 days changed my mind completely.</p>' },
      { id: uid(), ...BD.callout, headline: 'The insight that changed everything', body: 'The difference was not effort or knowledge — it was having the right system. Once I had that, everything else fell into place far faster than I expected.' },
      { id: uid(), ...BD.testimonial },
      { id: uid(), ...BD.bullets, headline: 'What I discovered after 90 days' },
      { id: uid(), ...BD.button, cta: 'See the Full Details on the Next Page', ctaLink: '#' },
    ],
  },

  'vsl-watch': {
    id: 'vsl-watch', label: 'VSL Watch Page', icon: 'video', bg: '#FFFFFF',
    blocks: [
      { id: uid(), ...BD.stars, body: 'Watch the full presentation before this page comes down.' },
      { id: uid(), ...BD.testimonial, body: 'I almost skipped this video. I am so glad I did not. Everything changed after watching it all the way through.', author: 'Amanda Chen', authorTitle: 'Entrepreneur · Verified Buyer' },
      { id: uid(), ...BD.video, headline: 'Watch This Before You Do Anything Else' },
      { id: uid(), ...BD.guarantee },
      { id: uid(), ...BD.countdown },
      { id: uid(), ...BD['testimonial-grid'] },
      { id: uid(), ...BD.button, cta: 'I Am Ready — Take Me to the Order Page', ctaLink: '#' },
    ],
  },

  'flash-deal': {
    id: 'flash-deal', label: 'Flash Deal', icon: 'zap', bg: '#FBF8F5',
    blocks: [
      { id: uid(), ...BD.countdown, headline: 'This exclusive deal disappears the moment this timer hits zero' },
      { id: uid(), ...BD.hero, variant: 'dark', headline: 'The Biggest Discount We Have Ever Offered — Today Only', badge: 'Flash Deal' },
      { id: uid(), ...BD.bullets, headline: 'Everything included in this offer' },
      { id: uid(), ...BD.testimonial },
      { id: uid(), ...BD.guarantee },
      { id: uid(), ...BD.badge },
      { id: uid(), ...BD.button, cta: 'Claim My Exclusive Flash Deal Now', ctaLink: '#', subheadline: 'This price disappears when the timer ends — no exceptions' },
    ],
  },
};