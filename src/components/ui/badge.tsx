/*
───────────────────────────────────────────────
  Property of CKS  © 2025
  Manifested by Freedom
───────────────────────────────────────────────

File: src/components/ui/badge.tsx

Description: Inline label / pill component for small metadata tokens.
Function: Displays categorical or contextual tags (e.g., city names).
Importance: Enhances scannability and grouping.
Connects to: CityPill, potential future filters.
Notes: Add color variants or semantic styling hooks later.
*/
import React from "react";

export function Badge({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium rounded-full px-2.5 py-1 ${className}`}
      {...props}
    />
  );
}
