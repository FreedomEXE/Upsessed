// scripts/fix-placeholders.mjs
import fs from "fs";
import path from "path";

const rawDir = "public/img/raw";
const outDir = "public/img";

console.log("Fixing placeholder files with actual images...");

// Mapping of what actual files we have to what placeholders we need
const mappings = [
  // Hero and vendors
  { from: "city-tokyo.jpg", to: ["hero.webp", "hero-480.webp", "hero-768.webp", "hero-1200.webp", "hero-1600.webp"] },
  { from: "city-london.jpg", to: ["vendors.webp", "vendors-480.webp", "vendors-768.webp", "vendors-1200.webp", "vendors-1600.webp"] },
  
  // Cities
  { from: "city-tokyo.jpg", to: ["city-tokyo.webp", "city-tokyo-480.webp", "city-tokyo-768.webp", "city-tokyo-1200.webp", "city-tokyo-1600.webp"] },
  { from: "city-london.jpg", to: ["city-london.webp", "city-london-480.webp", "city-london-768.webp", "city-london-1200.webp", "city-london-1600.webp"] },
  { from: "city-paris.jpg", to: ["city-paris.webp", "city-paris-480.webp", "city-paris-768.webp", "city-paris-1200.webp", "city-paris-1600.webp"] },
  { from: "city-nyc.jpg", to: ["city-nyc.webp", "city-nyc-480.webp", "city-nyc-768.webp", "city-nyc-1200.webp", "city-nyc-1600.webp"] },
  { from: "gallery-1.jpg", to: ["city-toronto.webp", "city-toronto-480.webp", "city-toronto-768.webp", "city-toronto-1200.webp", "city-toronto-1600.webp"] },
  { from: "gallery-3.jpg", to: ["city-seoul.webp", "city-seoul-480.webp", "city-seoul-768.webp", "city-seoul-1200.webp", "city-seoul-1600.webp"] },
  
  // Gallery
  { from: "gallery-1.jpg", to: ["gallery-1.webp", "gallery-1-480.webp", "gallery-1-768.webp", "gallery-1-1200.webp"] },
  { from: "gallery-3.jpg", to: ["gallery-2.webp", "gallery-2-480.webp", "gallery-2-768.webp", "gallery-2-1200.webp"] },
  { from: "gallery-4.jpg", to: ["gallery-3.webp", "gallery-3-480.webp", "gallery-3-768.webp", "gallery-3-1200.webp"] },
  { from: "gallery-6.jpg", to: ["gallery-4.webp", "gallery-4-480.webp", "gallery-4-768.webp", "gallery-4-1200.webp"] },
  { from: "city-tokyo.jpg", to: ["gallery-5.webp", "gallery-5-480.webp", "gallery-5-768.webp", "gallery-5-1200.webp"] },
  { from: "city-london.jpg", to: ["gallery-6.webp", "gallery-6-480.webp", "gallery-6-768.webp", "gallery-6-1200.webp"] }
];

for (const mapping of mappings) {
  const sourcePath = path.join(rawDir, mapping.from);
  
  if (fs.existsSync(sourcePath)) {
    const sourceData = fs.readFileSync(sourcePath);
    
    for (const targetFile of mapping.to) {
      const targetPath = path.join(outDir, targetFile);
      try {
        fs.writeFileSync(targetPath, sourceData);
        console.log(`✓ Fixed ${targetFile} using ${mapping.from}`);
      } catch (error) {
        console.error(`✗ Failed to fix ${targetFile}: ${error.message}`);
      }
    }
  } else {
    console.warn(`⚠ Source file ${mapping.from} not found, skipping`);
  }
}

console.log("Placeholder fix complete!");
