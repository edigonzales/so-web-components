import http from "node:http";
import { readFileSync, existsSync, watch } from "node:fs";
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

const clients = new Set();

const notifyReload = () => {
  for (const res of clients) {
    res.write("data: reload\n\n");
  }
};

const startWatcher = () => {
  try {
    watch(root, { recursive: true }, notifyReload);
  } catch {
    watch(root, notifyReload);
  }
};

startWatcher();

const livereloadSnippet = `\n<script type="module">
  const source = new EventSource("/__reload");
  source.addEventListener("message", () => window.location.reload());
</script>\n`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

  if (url.pathname === "/__reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    });
    res.write("\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

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
  if (ext === ".html") {
    const html = readFileSync(filePath, "utf8");
    const withLiveReload = html.includes("</body>")
      ? html.replace("</body>", `${livereloadSnippet}</body>`)
      : `${html}${livereloadSnippet}`;
    res.writeHead(200, {
      "Content-Type": types[ext],
      "Cache-Control": "no-cache"
    });
    res.end(withLiveReload);
    return;
  }

  res.writeHead(200, { "Content-Type": types[ext] ?? "application/octet-stream" });
  res.end(readFileSync(filePath));
});

server.listen(port, () => {
  console.log(`Dev server running at http://localhost:${port}`);
});
