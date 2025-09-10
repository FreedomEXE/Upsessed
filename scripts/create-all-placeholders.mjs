// scripts/create-all-placeholders.mjs
import fs from "fs";
import path from "path";

const outDir = "public/img";

const cities = ["tokyo", "london", "toronto", "nyc", "paris", "seoul"];
const galleries = ["1", "2", "3", "4", "5", "6"];
const sizes = ["480", "768", "1200", "1600"];

console.log("Creating all placeholder files...");

// Create city images
for (const city of cities) {
  // Base image
  const basePath = path.join(outDir, `city-${city}.webp`);
  fs.writeFileSync(basePath, "placeholder");
  console.log(`Created city-${city}.webp`);
  
  // Responsive sizes
  for (const size of sizes) {
    const sizePath = path.join(outDir, `city-${city}-${size}.webp`);
    fs.writeFileSync(sizePath, "placeholder");
    console.log(`Created city-${city}-${size}.webp`);
  }
}

// Create gallery images
for (const gallery of galleries) {
  // Base image
  const basePath = path.join(outDir, `gallery-${gallery}.webp`);
  fs.writeFileSync(basePath, "placeholder");
  console.log(`Created gallery-${gallery}.webp`);
  
  // Responsive sizes (only up to 1200 for gallery)
  for (const size of ["480", "768", "1200"]) {
    const sizePath = path.join(outDir, `gallery-${gallery}-${size}.webp`);
    fs.writeFileSync(sizePath, "placeholder");
    console.log(`Created gallery-${gallery}-${size}.webp`);
  }
}

console.log("All placeholder files created!");
