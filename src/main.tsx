/*
───────────────────────────────────────────────
  Property of CKS  © 2025
  Manifested by Freedom
───────────────────────────────────────────────

File: src/main.tsx

Description: React application bootstrap file.
Function: Creates React root and renders <App/> into #root.
Importance: Entry point for hydration and runtime initialization.
Connects to: index.html (#root), App.tsx, index.css (global styles).
Notes: Add Suspense/error boundaries or providers (query, router, state) here later.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
