/*
───────────────────────────────────────────────
  Property of CKS  © 2025
  Manifested by Freedom
───────────────────────────────────────────────

File: vite.config.ts

Description: Vite build & dev server configuration with React plugin.
Function: Provides fast HMR development environment and production bundling.
Importance: Core tooling entrypoint controlling bundler behavior.
Connects to: package.json scripts (dev/build/preview), tsconfig.*, postcss/tailwind pipeline.
Notes: Add alias/resolver or environment config as project scales.
*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
