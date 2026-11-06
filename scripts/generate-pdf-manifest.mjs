// Gera src/pdf-manifest.json com os PDFs realmente presentes em public/roteiros/.
// Formato: { "<slug>": "/roteiros/<slug>.pdf" }. Só aceita nomes no padrão slug.pdf (a-z, 0-9, hífen).
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'roteiros');
const target = join(root, 'src', 'pdf-manifest.json');

export function generatePdfManifest() {
  const manifest = {};
  if (existsSync(dir)) {
    for (const file of readdirSync(dir).sort()) {
      const m = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.pdf$/.exec(file);
      if (m && statSync(join(dir, file)).isFile()) manifest[m[1]] = `/roteiros/${file}`;
    }
  }
  const json = JSON.stringify(manifest, null, 2) + '\n';
  const current = existsSync(target) ? readFileSync(target, 'utf8') : '';
  if (json !== current) writeFileSync(target, json); // evita loop de HMR quando nada mudou
  return manifest;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('pdf-manifest:', generatePdfManifest());
}
