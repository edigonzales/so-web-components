import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const root = join(__dirname, "dist");
const port = process.env.PORT ? Number(process.env.PORT) : 5173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".map": "application/json; charset=utf-8"
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  let path = url.pathname;
  if (path === "/") path = "/demo/index.html";
  const filePath = join(root, path);

  if (!existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Not found: ${path}

Hint: run "npm run build" first (it copies demo + styles into dist/).`);
    return;
  }

  const ext = extname(filePath);
  res.writeHead(200, { "Content-Type": types[ext] ?? "application/octet-stream" });
  res.end(readFileSync(filePath));
});

server.listen(port, () => {
  console.log(`Dev server running at http://localhost:${port}`);
});
