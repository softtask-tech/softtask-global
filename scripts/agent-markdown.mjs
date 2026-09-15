import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export function pageMarkdown(html) {
  const { document } = parseHTML(html);
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const main = document.querySelector('main');
  if (!main || !canonical) throw new Error('Markdown requires main content and a canonical URL');
  const metadata = {
    title: document.querySelector('title')?.textContent,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    url: canonical,
  };
  const structured = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map(node => JSON.parse(node.textContent));
  main.querySelectorAll('script,style,nav,footer,form,dialog,template,noscript,[aria-hidden="true"]').forEach(node => node.remove());
  main.querySelectorAll('h1 br,h2 br,h3 br,h4 br,h5 br,h6 br').forEach(node => node.replaceWith(document.createTextNode(' ')));
  // Keep informative diagram labels; decorative SVGs have already been removed.
  main.querySelectorAll('svg').forEach(node => {
    const labels = [...node.querySelectorAll('title,desc,text')].map(n => n.textContent.trim()).filter(Boolean);
    const replacement = document.createElement('p');
    replacement.textContent = labels.join(' — ');
    node.replaceWith(replacement);
  });
  main.querySelectorAll('a[href],img[src]').forEach(node => {
    const attribute = node.localName === 'a' ? 'href' : 'src';
    const target = new URL(node.getAttribute(attribute), canonical);
    if (['https:', 'http:', 'mailto:', 'tel:'].includes(target.protocol)) node.setAttribute(attribute, target.href);
    else node.removeAttribute(attribute);
  });
  const converter = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
  converter.use(gfm);
  const body = converter.turndown(main.innerHTML);
  return '---\n' + Object.entries(metadata).filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n') + '\n---\n\n' + body +
    (structured.length ? '\n\n## Structured data\n\n```json\n' + JSON.stringify(structured.length === 1 ? structured[0] : structured, null, 2) + '\n```' : '') + '\n';
}

export async function createAgentMarkdown(dir) {
  const root = fileURLToPath(dir);
  let count = 0;
  async function walk(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      if (entry.name === '_agent-markdown') continue;
      const file = join(folder, entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (entry.name === 'index.html') {
        const target = join(root, '_agent-markdown', relative(root, file).replace(/index\.html$/, 'index.md'));
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, pageMarkdown(await readFile(file, 'utf8')));
        count++;
      }
    }
  }
  await walk(root);
  console.log(`Generated ${count} agent Markdown pages`);
}
