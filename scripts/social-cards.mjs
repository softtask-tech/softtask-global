import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const escape = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const decode = (s) => s.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
export async function createSocialCards(dir) {
  if(process.platform==='win32' && !process.env.FONTCONFIG_FILE){
    const cache=path.resolve('node_modules/.cache/softtask-fonts');await mkdir(cache,{recursive:true});
    const config=path.join(cache,'fonts.conf');
    await writeFile(config,`<?xml version="1.0"?><fontconfig><dir>C:/Windows/Fonts</dir><cachedir>${cache.replaceAll('\\','/')}</cachedir></fontconfig>`);
    process.env.FONTCONFIG_FILE=config;
  }
  const {default:sharp}=await import('sharp');
  const root = fileURLToPath(dir);
  const destination = path.join(root, 'images/social');
  await mkdir(destination, { recursive: true });
  async function walk(folder) {
    for (const item of await readdir(folder, { withFileTypes: true })) {
      const file = path.join(folder, item.name);
      if (item.isDirectory()) {
        if (item.name !== 'images' && item.name !== '_astro') await walk(file);
        continue;
      }
      if (!item.name.endsWith('.html')) continue;
      const html = await readFile(file, 'utf8');
      const title = decode(
        html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/ \| Soft Task$/, '') || 'Soft Task',
      );
      const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      if (!image) continue;
      const words = title.split(/\s+/);
      const lines = [];
      let line = '';
      for (const word of words) {
        if ((line + ' ' + word).trim().length > 26 && line) {
          lines.push(line);
          line = word;
        } else line = (line + ' ' + word).trim();
      }
      if (line) lines.push(line);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#14382d"/><path d="M990 0V630M0 540H1200" stroke="#4b6953"/><circle cx="990" cy="315" r="180" fill="none" stroke="#638154"/><circle cx="990" cy="315" r="110" fill="none" stroke="#638154"/><path d="M820 500L1100 180" stroke="#d3ed9c" stroke-width="4"/><text x="72" y="100" font-family="Arial,sans-serif" font-size="32" fill="#d3ed9c">soft task.</text>${lines.map((text, i) => `<text x="72" y="${225 + i * 68}" font-family="Arial,sans-serif" font-size="54" fill="#f5f6ef">${escape(text)}</text>`).join('')}<text x="72" y="592" font-family="Arial,sans-serif" font-size="23" fill="#d6e1ce">Enterprise technology • softtask.co</text></svg>`;
      await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(destination, path.basename(new URL(image).pathname)));
    }
  }
  await walk(root);
}
