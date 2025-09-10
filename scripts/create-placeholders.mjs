// scripts/create-placeholders.mjs
import fs from "fs";
import path from "path";

const outDir = path.resolve("public/img");
fs.mkdirSync(outDir, { recursive: true });

// Create placeholder files by copying the JPG files we have
const rawDir = "public/img/raw";
const files = fs.readdirSync(rawDir);

console.log("Creating placeholder WebP files...");

// Map of what we have to what we need
const mapping = {
  "city-tokyo.jpg": ["hero.webp", "hero-480.webp", "hero-768.webp", "hero-1200.webp", "hero-1600.webp"],
  "city-london.jpg": ["vendors.webp", "vendors-480.webp", "vendors-768.webp", "vendors-1200.webp", "vendors-1600.webp"],
  "city-tokyo.jpg": ["city-tokyo.webp", "city-tokyo-480.webp", "city-tokyo-768.webp", "city-tokyo-1200.webp", "city-tokyo-1600.webp"],
  "city-london.jpg": ["city-london.webp", "city-london-480.webp", "city-london-768.webp", "city-london-1200.webp", "city-london-1600.webp"],
  "city-paris.jpg": ["city-paris.webp", "city-paris-480.webp", "city-paris-768.webp", "city-paris-1200.webp", "city-paris-1600.webp"],
  "city-nyc.jpg": ["city-nyc.webp", "city-nyc-480.webp", "city-nyc-768.webp", "city-nyc-1200.webp", "city-nyc-1600.webp"],
  "gallery-1.jpg": ["city-toronto.webp", "city-toronto-480.webp", "city-toronto-768.webp", "city-toronto-1200.webp", "city-toronto-1600.webp"],
  "gallery-3.jpg": ["city-seoul.webp", "city-seoul-480.webp", "city-seoul-768.webp", "city-seoul-1200.webp", "city-seoul-1600.webp"],
  "gallery-1.jpg": ["gallery-1.webp", "gallery-1-480.webp", "gallery-1-768.webp", "gallery-1-1200.webp"],
  "gallery-3.jpg": ["gallery-2.webp", "gallery-2-480.webp", "gallery-2-768.webp", "gallery-2-1200.webp"],
  "gallery-4.jpg": ["gallery-3.webp", "gallery-3-480.webp", "gallery-3-768.webp", "gallery-3-1200.webp"],
  "gallery-6.jpg": ["gallery-4.webp", "gallery-4-480.webp", "gallery-4-768.webp", "gallery-4-1200.webp"],
  "city-tokyo.jpg": ["gallery-5.webp", "gallery-5-480.webp", "gallery-5-768.webp", "gallery-5-1200.webp"],
  "city-london.jpg": ["gallery-6.webp", "gallery-6-480.webp", "gallery-6-768.webp", "gallery-6-1200.webp"],
};

for (const [srcFile, destFiles] of Object.entries(mapping)) {
  const srcPath = path.join(rawDir, srcFile);
  if (fs.existsSync(srcPath)) {
    for (const destFile of destFiles) {
      const destPath = path.join(outDir, destFile);
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Created ${destFile} from ${srcFile}`);
      } catch (e) {
        console.error(`Failed to create ${destFile}: ${e.message}`);
      }
    }
  }
}

console.log("Placeholder creation complete!");
