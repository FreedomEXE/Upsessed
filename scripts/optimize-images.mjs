// scripts/optimize-images.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";

const inDir = path.resolve("public/img/raw");
const outDir = path.resolve("public/img");
fs.mkdirSync(outDir, { recursive: true });

const SIZES = [480, 768, 1200, 1600]; // widths
const files = fs.readdirSync(inDir).filter(f => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const base = path.parse(file).name;
  const inPath = path.join(inDir, file);
  for (const w of SIZES) {
    const out = path.join(outDir, `${base}-${w}.webp`);
    console.log(`→ ${out}`);
    await sharp(inPath).resize({ width: w }).webp({ quality: 78 }).toFile(out);
  }
  // also write a "default" mid-size for simple <img src>
  const defOut = path.join(outDir, `${base}.webp`);
  await sharp(inPath).resize({ width: 1200 }).webp({ quality: 78 }).toFile(defOut);
}
console.log("Done.");
