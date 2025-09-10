// scripts/fetch-images.mjs
import fs from "fs";
import path from "path";
import https from "https";

const outDir = path.resolve("public/img/raw");
fs.mkdirSync(outDir, { recursive: true });

const IMAGES = [
  // HERO + VENDORS
  ["hero.jpg",    "https://images.unsplash.com/photo-1520975940173-b75b81f2ddb7?q=80&w=2000&auto=format&fit=crop"],
  ["vendors.jpg", "https://images.unsplash.com/photo-1520974722074-3c78c7f1b010?q=80&w=2000&auto=format&fit=crop"],

  // FEATURED CITIES
  ["city-tokyo.jpg",   "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop"],
  ["city-london.jpg",  "https://images.unsplash.com/photo-1448906654166-444d494666b3?q=80&w=2000&auto=format&fit=crop"],
  ["city-toronto.jpg", "https://images.unsplash.com/photo-1542332213-9e4b9b8a2eb3?q=80&w=2000&auto=format&fit=crop"],
  ["city-nyc.jpg",     "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2000&auto=format&fit=crop"],
  ["city-paris.jpg",   "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=2000&auto=format&fit=crop"],
  ["city-seoul.jpg",   "https://images.unsplash.com/photo-1528533606781-c06ea81de5f0?q=80&w=2000&auto=format&fit=crop"],

  // GALLERY (6)
  ["gallery-1.jpg", "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=2000&auto=format&fit=crop"],
  ["gallery-2.jpg", "https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=2000&auto=format&fit=crop"],
  ["gallery-3.jpg", "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=2000&auto=format&fit=crop"],
  ["gallery-4.jpg", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"],
  ["gallery-5.jpg", "https://images.unsplash.com/photo-1520975693411-b34bf0c6b563?q=80&w=2000&auto=format&fit=crop"],
  ["gallery-6.jpg", "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=2000&auto=format&fit=crop"],
];

function fetchToFile(url, dest) {
  return new Promise((resolve, reject) => {
    const get = (u) => {
      https.get(u, { headers: { "User-Agent": "node" } }, (res) => {
        if ([301,302,303,307,308].includes(res.statusCode)) {
          const loc = res.headers.location;
          if (!loc) return reject(new Error(`Redirect with no location: ${u}`));
          return get(loc.startsWith("http") ? loc : new URL(loc, u).href);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${u}`));
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
        file.on("error", reject);
      }).on("error", reject);
    };
    get(url);
  });
}

(async () => {
  for (const [file, url] of IMAGES) {
    const dest = path.join(outDir, file);
    console.log(`↓ ${url}\n→ ${dest}`);
    try { await fetchToFile(url, dest); } catch (e) {
      console.error(`FAIL ${url}: ${e.message}`); process.exitCode = 1;
    }
  }
})();
