import { readFileSync } from "node:fs";
import { globSync } from "glob";

const files = globSync("src/**/*.ts", { nodir: true });
let ok = true;

for (const f of files) {
  const s = readFileSync(f, "utf8");
  if (s.includes(" any")) {
    console.warn(`[lint] ${f}: contains 'any' (avoid using any)`);
    ok = false;
  }
}
process.exit(ok ? 0 : 1);
