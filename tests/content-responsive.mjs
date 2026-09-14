import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4322';
const output = process.env.QA_OUTPUT || '../../outputs/inner-page-revision';
await mkdir(output, { recursive: true });
const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
await page.addInitScript(() =>
  localStorage.setItem(
    'softtask-consent-v1',
    JSON.stringify({
      version: 1,
      analytics: false,
      marketing: false,
      expires: Date.now() + 86400000,
    }),
  ),
);
const results = [],
  errors = [],
  titles = new Set(),
  descriptions = new Set();
page.on('pageerror', (e) => errors.push(e.message));
const check = (pass, label, detail) => {
  results.push({ pass: !!pass, label, detail });
  if (!pass) console.error(label, detail || '');
};
for (const path of paths) {
  await page.goto(base + path);
  await page.evaluate(() => document.fonts.ready);
  const seo = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name=description]')?.content,
    canonical: document.querySelector('link[rel=canonical]')?.href,
    robots: document.querySelector('meta[name=robots]')?.content,
    schema: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),
  }));
  check(!titles.has(seo.title), `unique title ${path}`);
  titles.add(seo.title);
  check(
    seo.description?.length > 50 && !descriptions.has(seo.description),
    `unique useful description ${path}`,
  );
  descriptions.add(seo.description);
  check(seo.canonical === `https://softtask.co${path}`, `canonical ${path}`);
  check(seo.robots.includes('noindex'), `preview protected ${path}`);
  check(
    seo.schema['@graph'].some((n) => n['@type'] === 'WebPage'),
    `structured page ${path}`,
  );
  for (const width of [320, 390, 620, 768, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1024 });
    const overflow = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      items: [...document.querySelectorAll('main *')]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          return (
            r.width > 0 &&
            (r.right > innerWidth + 1 || r.left < -1) &&
            getComputedStyle(e).position !== 'absolute' &&
            !e.closest('.capability-tabs')
          );
        })
        .slice(0, 4)
        .map((e) => e.tagName + '.' + e.className),
    }));
    check(
      overflow.scroll <= width + 1,
      `layout ${path} at ${width}`,
      overflow.scroll > width + 1 ? overflow : undefined,
    );
  }
}
for (const path of [
  '/company/how-we-work/',
  '/company/',
  '/company/locations/',
  '/company/engagement-models/',
  '/products/tubblor/',
  '/products/regulix-one/',
  '/products/kytheos/',
  '/services/blockchain-engineering/',
  '/services/blockchain-engineering/exchange-development/',
  '/services/blockchain-engineering/web3-development/',
  '/products/',
  '/services/data-centres/',
  '/services/software-engineering/',
  '/services/ai-automation/',
  '/insights/ai-pilot-to-production/',
  '/contact/',
]) {
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1050 });
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
      await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
      await document.fonts.ready;
    });
    await page.screenshot({
      path: `${output}/${path.replaceAll('/', '-')}-${width}.png`,
      fullPage: true,
    });
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    check(
      !scan.violations.length,
      `accessibility ${path} at ${width}`,
      scan.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
    );
  }
}
await page.goto(base + '/company/how-we-work/');
await page.getByText('Do we need a complete specification?', { exact: true }).click();
check(
  (await page.locator('.project-faq details').first().getAttribute('open')) !== null,
  'delivery FAQ opens',
);
await page.goto(base + '/');
await page.setViewportSize({ width: 390, height: 844 });
check(
  (await page.locator('[role=tablist]').getAttribute('aria-orientation')) === 'horizontal',
  'mobile tab orientation',
);
await page.getByRole('tab', { name: 'Software engineering', exact: true }).focus();
await page.keyboard.press('End');
check(
  (await page
    .getByRole('tab', { name: 'Blockchain & Web3 engineering', exact: true })
    .getAttribute('aria-selected')) === 'true',
  'mobile last capability accessible by keyboard',
);
check(errors.length === 0, 'no JavaScript errors', errors);
await writeFile(
  `${output}/content-responsive.json`,
  JSON.stringify({ pages: paths.length, results, errors }, null, 2),
);
await browser.close();
console.log(
  JSON.stringify({
    pages: paths.length,
    checks: results.length,
    failed: results.filter((r) => !r.pass).length,
  }),
);
if (results.some((r) => !r.pass)) process.exitCode = 1;
