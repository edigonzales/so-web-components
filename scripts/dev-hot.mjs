import { spawn } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");

const server = spawn(process.execPath, ["scripts/dev-server.mjs"], {
  cwd: root,
  stdio: "inherit"
});

const watcher = spawn(process.execPath, ["scripts/dev-watch.mjs"], {
  cwd: root,
  stdio: "inherit"
});

const shutdown = (signal) => {
  server.kill(signal);
  watcher.kill(signal);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

server.on("exit", (code) => {
  if (code !== 0) {
    watcher.kill("SIGTERM");
    process.exit(code ?? 1);
  }
});
