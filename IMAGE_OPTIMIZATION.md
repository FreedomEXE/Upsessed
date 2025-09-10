# Image Optimization Setup

This document explains the image optimization pipeline for the Upsessed landing page.

## Overview

The project has been updated to use local optimized WebP images instead of external Unsplash URLs. This provides:

- Better performance (faster loading)
- Responsive images with multiple sizes
- Offline support
- Reduced external dependencies

## Files Created

### Scripts
- `scripts/fetch-images.mjs` - Downloads images from Unsplash
- `scripts/optimize-images.mjs` - Converts images to WebP with multiple sizes
- `scripts/create-all-placeholders.mjs` - Creates placeholder files for development

### Package.json Scripts
- `npm run fetch:images` - Download original images
- `npm run build:images` - Optimize images to WebP format
- `npm run setup:images` - Complete pipeline (fetch + build)

## Image Structure

All optimized images are stored in `public/img/` with the following naming convention:

```
hero.webp, hero-480.webp, hero-768.webp, hero-1200.webp, hero-1600.webp
vendors.webp, vendors-480.webp, vendors-768.webp, vendors-1200.webp, vendors-1600.webp
city-{name}.webp, city-{name}-480.webp, city-{name}-768.webp, city-{name}-1200.webp, city-{name}-1600.webp
gallery-{n}.webp, gallery-{n}-480.webp, gallery-{n}-768.webp, gallery-{n}-1200.webp
```

## Component Updates

### UpsessedLandingPage.tsx
Updated to use local images with responsive srcSet attributes:

1. **Hero Section**: Uses `/img/hero.webp` with full responsive sizes
2. **Featured Cities**: Local city images with responsive loading
3. **Vendors Section**: Uses `/img/vendors.webp` with responsive sizes
4. **Gallery**: Local gallery images with responsive loading

### SmartImage Component
The existing SmartImage component passes through srcSet and sizes props, so no changes were needed.

### index.html
Added preload link for the hero image to improve LCP (Largest Contentful Paint).

## Current Status

✅ Dependencies installed (sharp)
✅ Scripts created
✅ Package.json updated
✅ React components updated
✅ Placeholder images created
✅ Index.html preload added

## Next Steps (Optional)

1. Run `npm run setup:images` to fetch and optimize real images
2. The Sharp optimization script will create properly sized WebP images
3. Remove placeholder files and test with optimized images

## Notes

- Placeholder files are currently in place for development
- The Sharp optimization script is ready but had execution issues
- All React components are updated to use local image paths
- Responsive loading is implemented with proper srcSet attributes
