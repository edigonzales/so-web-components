import { mkdirSync, copyFileSync } from "node:fs";
import { dirname } from "node:path";

const pairs = [
  ["src/styles/tokens.css", "dist/styles/tokens.css"],
  ["src/styles/reset.css", "dist/styles/reset.css"],
  ["src/styles/fonts.css", "dist/styles/fonts.css"],
  ["src/styles/FrutigerLTW05-55Roman.woff2", "dist/styles/FrutigerLTW05-55Roman.woff2"],
  ["src/styles/FrutigerLTW05-75Black.woff2", "dist/styles/FrutigerLTW05-75Black.woff2"],
  ["src/demo/index.html", "dist/demo/index.html"],
  ["src/demo/cdn-demo.html", "dist/demo/cdn-demo.html"]
];

for (const [src, dest] of pairs) {
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
}
console.log("Copied assets to dist/ (styles + demo).");
