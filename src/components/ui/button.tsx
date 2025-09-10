/*
───────────────────────────────────────────────
  Property of CKS  © 2025
  Manifested by Freedom
───────────────────────────────────────────────

File: src/components/ui/button.tsx

Description: Reusable styled button component with variant support.
Function: Normalizes button styling & interaction states across UI.
Importance: Centralizes visual consistency and future accessibility enhancements.
Connects to: Other UI components (forms/cards), Tailwind utility classes.
Notes: Add ARIA loading / disabled patterns and more variants as design evolves.
*/
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "secondary" | "outline";
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition border";
    const styles: Record<string, string> = {
      default: "bg-black text-white hover:bg-gray-800 border-black",
      secondary:
        "bg-white text-gray-900 hover:bg-gray-50 border-gray-200 shadow-sm",
      outline:
        "bg-transparent text-gray-900 hover:bg-gray-50 border-gray-300",
    };
    return (
      <button ref={ref} className={`${base} ${styles[variant]} ${className}`} {...props} />
    );
  }
);
Button.displayName = "Button";
