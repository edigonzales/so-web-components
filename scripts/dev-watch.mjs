import { spawn } from "node:child_process";
import { existsSync, watch } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");

const tscPath = join(root, "node_modules", "typescript", "bin", "tsc");
const tsc = spawn(process.execPath, [tscPath, "-w", "-p", "tsconfig.json"], {
  cwd: root,
  stdio: "inherit"
});

const assetScript = join(root, "scripts", "copy-assets.mjs");

const runCopy = () => {
  spawn(process.execPath, [assetScript], { cwd: root, stdio: "inherit" });
};

let copyTimeout;
const queueCopy = () => {
  clearTimeout(copyTimeout);
  copyTimeout = setTimeout(runCopy, 100);
};

runCopy();

const watchDirs = [join(root, "src", "styles"), join(root, "src", "demo")];
for (const dir of watchDirs) {
  if (!existsSync(dir)) continue;
  watch(dir, { recursive: true }, queueCopy);
}

process.on("SIGINT", () => {
  tsc.kill("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  tsc.kill("SIGTERM");
  process.exit(0);
});
