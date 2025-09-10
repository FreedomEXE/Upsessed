/*
───────────────────────────────────────────────
  Property of CKS  © 2025
  Manifested by Freedom
───────────────────────────────────────────────

File: src/App.tsx

Description: Top-level application component wrapper.
Function: Provides a clean seam for adding global providers later.
Importance: Simplifies future composition (routing, state, theming).
Connects to: UpsessedLandingPage.tsx, main.tsx.
Notes: Expand with ErrorBoundary / Router when needed.
*/
import UpsessedLandingPage from "./UpsessedLandingPage";
export default function App() {
  return <UpsessedLandingPage />;
}
