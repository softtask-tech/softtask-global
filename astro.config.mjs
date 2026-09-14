import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import { createSocialCards } from './scripts/social-cards.mjs';
const indexable = process.env.PUBLIC_SITE_INDEXABLE === 'true';
export default defineConfig({
  site: 'https://softtask.co',
  output: 'static',
  vite: {
    define: {
      'import.meta.env.PUBLIC_SITE_INDEXABLE': JSON.stringify(indexable ? 'true' : 'false'),
    },
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
    {
      name: 'softtask-indexing',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await createSocialCards(dir);
          await writeFile(
            new URL('robots.txt', dir),
            indexable
              ? 'User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://softtask.co/sitemap-index.xml\n'
              : 'User-agent: *\nDisallow: /\n',
          );
          await writeFile(
            new URL('_headers', dir),
            '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n' +
              (indexable ? '' : '  X-Robots-Tag: noindex, nofollow\n'),
          );
        },
      },
    },
  ],
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
