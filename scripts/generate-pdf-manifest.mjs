// Gera src/pdf-manifest.json com os PDFs realmente presentes em public/roteiros/.
// Aceita tanto <slug>.pdf quanto nomes descritivos como Roteiro_<Destino>_5_Dias_MRL_Travel.pdf.
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'roteiros');
const target = join(root, 'src', 'pdf-manifest.json');

const ignoredWords = new Set(['roteiro', 'dias', 'dia', 'mrl', 'travel']);
const slugFromFilename = (file) => file
  .replace(/\.pdf$/i, '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .split(/[^a-z0-9]+/)
  .filter(part => part && !/^\d+$/.test(part) && !ignoredWords.has(part))
  .join('-');

export function generatePdfManifest() {
  const manifest = {};
  if (existsSync(dir)) {
    const pdfs = readdirSync(dir)
      .filter(file => /\.pdf$/i.test(file) && statSync(join(dir, file)).isFile())
      // Nomes descritivos têm prioridade quando também existe uma cópia <slug>.pdf.
      .sort((a, b) => Number(/^roteiro[^a-z0-9]/i.test(b)) - Number(/^roteiro[^a-z0-9]/i.test(a)) || a.localeCompare(b));
    for (const file of pdfs) {
      const slug = slugFromFilename(file);
      if (slug && !manifest[slug]) manifest[slug] = `/roteiros/${encodeURIComponent(file)}`;
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
