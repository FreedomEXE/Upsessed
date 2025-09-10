/*
───────────────────────────────────────────────
  Property of CKS  © 2025
  Manifested by Freedom
───────────────────────────────────────────────

File: src/components/ui/input.tsx

Description: Styled input field primitive.
Function: Provides consistent base styling for text/email inputs.
Importance: Keeps form UI cohesive across sections.
Connects to: Vendor form, newsletter form.
Notes: Consider accessibility enhancements (aria-invalid) + variants later.
*/
import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
      {...props}
    />
  );
}
