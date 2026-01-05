import { mkdirSync, copyFileSync } from "node:fs";
import { dirname } from "node:path";

const pairs = [
  ["src/styles/tokens.css", "dist/styles/tokens.css"],
  ["src/styles/reset.css", "dist/styles/reset.css"],
  ["src/styles/fonts.css", "dist/styles/fonts.css"]
];

for (const [src, dest] of pairs) {
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
}
console.log("Copied CSS to dist/styles.");
