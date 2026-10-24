import { build } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const outDir = path.join(root, 'app/src/main/assets/renderer');

await mkdir(outDir, { recursive: true });

const result = await build({
  entryPoints: [path.join(here, 'src/renderer.js')],
  bundle: true,
  format: 'iife',
  globalName: 'MateRendererBundle',
  target: ['chrome100'],
  minify: true,
  sourcemap: false,
  legalComments: 'none',
  outfile: path.join(outDir, 'renderer.js'),
  metafile: true,
  logLevel: 'info',
});

await cp(path.join(here, 'src/index.html'), path.join(outDir, 'index.html'));

const bytes = Object.values(result.metafile.outputs).reduce((sum, o) => sum + o.bytes, 0);
console.log(`renderer.js + index.html -> ${path.relative(root, outDir)} (${(bytes / 1024).toFixed(0)} KiB)`);
