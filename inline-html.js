const fs   = require("fs");
const path = require("path");

const outDir = "./out";
let html = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

function readFile(href) {
  const rel = href.startsWith("/") ? href.slice(1) : href;
  const fp  = path.join(outDir, rel);
  return fs.existsSync(fp) ? fs.readFileSync(fp, "utf8") : null;
}

// 1. Inline CSS
html = html.replace(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*\/?>/gi, (m, href) => {
  const css = readFile(href);
  return css ? `<style>${css}</style>` : m;
});

// 2. Quitar preloads de scripts
html = html.replace(/<link[^>]+as="script"[^>]*\/?>/gi, "");

// 3. Juntar todos los chunks JS en orden
const chunkDir = path.join(outDir, "_next/static/chunks");
const appDir   = path.join(chunkDir, "app");

const ordered = [
  path.join(chunkDir, "polyfills-42372ed130431b0a.js"),
  path.join(chunkDir, "webpack-616e068a201ad621.js"),
];
fs.readdirSync(chunkDir).forEach(f => {
  if (!f.endsWith(".js")) return;
  const full = path.join(chunkDir, f);
  if (!ordered.includes(full)) ordered.push(full);
});
if (fs.existsSync(appDir)) {
  fs.readdirSync(appDir).forEach(f => {
    if (f.endsWith(".js")) ordered.push(path.join(appDir, f));
  });
}

const allJS = ordered
  .filter(p => fs.existsSync(p))
  .map(p => fs.readFileSync(p, "utf8"))
  .join("\n;\n");

// 4. Eliminar todos los <script src=.../_next/...>
html = html.replace(/<script[^>]+src="[^"]*_next[^"]*"[^>]*><\/script>/gi, "");

// 5. Inyectar JS unificado antes de </body>
html = html.replace("</body>", `<script>${allJS}</script></body>`);

// 6. Guardar
fs.writeFileSync("./v-inventario-preview.html", html, "utf8");
const mb = (fs.statSync("./v-inventario-preview.html").size / 1024 / 1024).toFixed(1);
console.log("✅ v-inventario-preview.html listo (" + mb + " MB)");
