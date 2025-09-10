// ───────────────────────────────────────────────
//  Property of CKS  © 2025  |  Manifested by Freedom
// ───────────────────────────────────────────────
// File: postcss.config.js
// Description: PostCSS plugin chain (Tailwind + Autoprefixer).
// Function: Processes CSS directives and adds vendor prefixes.
// Importance: Required for Tailwind layers & cross-browser styling.
// Connects to: tailwind.config.js, src/index.css, package.json scripts.
// Notes: Add cssnano or other optimizers for production later.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
