// ───────────────────────────────────────────────
//  Property of CKS  © 2025  |  Manifested by Freedom
// ───────────────────────────────────────────────
// File: tailwind.config.js
// Description: Tailwind framework configuration (content scanning + theme extension).
// Function: Controls content paths & theme customization for utility generation.
// Importance: Correct content globs keep CSS output minimal.
// Connects to: index.html, src/ (all TS/JS/JSX/TSX), postcss.config.js.
// Notes: Add plugins (forms, typography) or theme tokens as design system evolves.
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
