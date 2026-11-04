import { defineConfig } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { destinations } from './src/content.js';

// Hospedagem estática: gera dist/roteiros/<slug>/index.html (mesmo app, com título e descrição próprios)
// para que o acesso direto e a atualização da página funcionem sem regra de redirecionamento no servidor.
// Também gera 404.html (o app exibe "destino não encontrado" para slugs inválidos).
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function destinationPages() {
  return {
    name: 'destination-pages',
    apply: 'build',
    closeBundle() {
      const out = 'dist';
      const html = readFileSync(join(out, 'index.html'), 'utf8');
      for (const d of destinations) {
        const title = esc(`Roteiro de ${d.name} | MRL Travel`);
        const desc = esc(`Roteiro de viagem para ${d.name} (${d.state}). ${d.description} Baixe o PDF no site da MRL Travel.`);
        const page = html
          .replace(/<title>.*?<\/title>/, () => `<title>${title}</title>`)
          .replace(/(<meta name="description" content=")[^"]*"/, (_, p) => `${p}${desc}"`);
        mkdirSync(join(out, 'roteiros', d.slug), { recursive: true });
        writeFileSync(join(out, 'roteiros', d.slug, 'index.html'), page);
      }
      writeFileSync(join(out, '404.html'), html);
    },
  };
}
export default defineConfig({ plugins: [destinationPages()] });
