/*
───────────────────────────────────────────────
  Property of CKS  © 2025
  Manifested by Freedom
───────────────────────────────────────────────

File: src/components/SmartImage.tsx

Description: Resilient image component with automatic fallback.
Function: Replaces broken external images with local SVG placeholder.
Importance: Prevents broken image icons degrading UX.
Connects to: UpsessedLandingPage.tsx (all visual sections), public/img/fallback.svg.
Notes: Extend later with blur placeholder / decoding strategies.
*/
import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export default function SmartImage({
  fallbackSrc = "/img/fallback.svg",
  onError,
  loading = "lazy",
  decoding = "async",
  crossOrigin = "anonymous",
  referrerPolicy = "no-referrer",
  ...rest
}: Props) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.dataset.fallbackShown) {
      img.dataset.fallbackShown = "1";
      img.src = fallbackSrc;
    }
    onError?.(e);
  };

  return (
    <img
      loading={loading}
      decoding={decoding}
      crossOrigin={crossOrigin as any}
      referrerPolicy={referrerPolicy as any}
      onError={handleError}
      {...rest}
    />
  );
}
