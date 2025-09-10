// test-optimize.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";

console.log("Starting optimization...");
const inDir = "public/img/raw";
const outDir = "public/img";

try {
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(inDir);
  console.log("Found files:", files);
  
  for (const file of files) {
    if (/\.(jpe?g|png)$/i.test(file)) {
      const base = path.parse(file).name;
      const inPath = path.join(inDir, file);
      console.log(`Processing ${file}...`);
      
      // Create default webp
      const defOut = path.join(outDir, `${base}.webp`);
      await sharp(inPath).resize({ width: 1200 }).webp({ quality: 78 }).toFile(defOut);
      console.log(`Created ${defOut}`);
      
      // Create responsive sizes
      const sizes = [480, 768, 1200, 1600];
      for (const w of sizes) {
        const out = path.join(outDir, `${base}-${w}.webp`);
        await sharp(inPath).resize({ width: w }).webp({ quality: 78 }).toFile(out);
        console.log(`Created ${out}`);
      }
    }
  }
  console.log("Optimization complete!");
} catch (error) {
  console.error("Error:", error);
}
