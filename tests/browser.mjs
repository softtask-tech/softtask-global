import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const output = process.env.QA_OUTPUT || 'qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [],
  results = [],
  a11y = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
page.on('pageerror', (e) => errors.push(e.message));
const loadImages = async () =>
  page.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
    await Promise.all(Array.from(document.images).map((i) => i.decode().catch(() => {})));
  });
const assert = (condition, label) => {
  results.push({ label, pass: !!condition });
  if (!condition) console.error('FAIL', label);
};
await page.goto(base, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await loadImages();
await page.screenshot({ path: `${output}/home-cookie-desktop.png` });
await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
await page.reload({ waitUntil: 'networkidle' });
assert(await page.locator('.cookie-banner').isHidden(), 'cookie rejection persists');
for (const [label, width, height] of [
  ['desktop', 1440, 1000],
  ['tablet', 820, 1050],
  ['mobile', 390, 844],
  ['small-mobile', 320, 780],
]) {
  await page.setViewportSize({ width, height });
  await page.evaluate(() => document.fonts.ready);
  await loadImages();
  await page.screenshot({ path: `${output}/home-${label}.png`, fullPage: true });
  await page.screenshot({ path: `${output}/home-${label}-top.png` });
  assert(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    `homepage no overflow ${width}`,
  );
}
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole('button', { name: 'Open navigation' }).click();
assert(await page.locator('#main-nav').isVisible(), 'mobile menu opens');
await page.keyboard.press('Escape');
assert(await page.locator('#main-nav').isHidden(), 'Escape closes mobile menu');
await page.setViewportSize({ width: 1440, height: 1000 });
await page.getByRole('tab', { name: 'Cloud & infrastructure' }).click();
assert(await page.locator('#panel-3').isVisible(), 'capability selector opens correct panel');
await page.keyboard.press('ArrowDown');
assert(
  (await page
    .getByRole('tab', { name: 'Data centre engineering' })
    .getAttribute('aria-selected')) === 'true',
  'capability keyboard navigation',
);
await page.getByRole('button', { name: 'Search website' }).click();
await page.getByRole('searchbox').fill('infrastructure');
assert((await page.locator('#search-results a').count()) > 0, 'search returns results');
await page.getByRole('searchbox').fill('zzzzunfindable');
assert(
  (await page.locator('#search-count').textContent()).includes('No matches'),
  'search empty state',
);
await page.keyboard.press('Escape');
await page.locator('.site-footer .cookie-open').click();
await page.locator('#analytics-choice').check();
await page.getByRole('button', { name: 'Save my choices' }).click();
assert(
  await page.evaluate(
    () => JSON.parse(localStorage.getItem('softtask-consent-v1')).analytics === true,
  ),
  'granular cookie preference saved',
);
for (const path of [
  '/',
  '/services/cloud-infrastructure/',
  '/insights/before-you-move-a-workload/',
  '/contact/',
  '/newsletter/',
  '/products/',
  '/company/',
]) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await loadImages();
  const scan = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  a11y.push({
    path,
    violations: scan.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
    })),
  });
  assert(scan.violations.length === 0, `automated accessibility ${path}`);
  if (path !== '/')
    await page.screenshot({ path: `${output}/${path.replaceAll('/', '-')}.png`, fullPage: true });
}
await page.goto(base + '/contact/?service=cloud-infrastructure', { waitUntil: 'networkidle' });
assert(
  (await page.locator('[name=service]').inputValue()) === 'cloud-infrastructure',
  'service enquiry prefill',
);
await page.locator('[name=name]').fill('Test buyer');
await page.locator('[name=email]').fill('buyer@example.com');
await page.locator('[name=company]').fill('Test company');
await page.locator('[name=country]').selectOption('Singapore');
await page.locator('[name=message]').fill('We would like to discuss a migration assessment.');
await page.locator('[name=consent]').check();
await page.route('**/api/contact', (route) =>
  route.fulfill({
    status: 503,
    contentType: 'application/json',
    body: JSON.stringify({ message: 'Online submissions are not active yet.' }),
  }),
);
await page.getByRole('button', { name: 'Send your enquiry' }).click();
await page.waitForFunction(
  () => document.querySelector('.form-status')?.getAttribute('data-error') === 'true',
);
assert(
  (await page.locator('.form-status').textContent()).includes('not active'),
  'form failure is honest and visible',
);
assert(
  (await page.locator('[name=email]').inputValue()) === 'buyer@example.com',
  'failed submission preserves user input',
);
const queue = ['/'],
  visited = new Set();
while (queue.length) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);
  const response = await page.goto(base + path);
  assert(response.status() === 200, `route ${path}`);
  const links = await page
    .locator('a[href]')
    .evaluateAll((els) => els.map((a) => a.getAttribute('href')));
  for (const link of links) {
    if (link?.startsWith('/') && !link.startsWith('//') && !link.startsWith('/api/')) {
      const parsed = new URL(link, locationOrigin(base));
      if (!visited.has(parsed.pathname)) queue.push(parsed.pathname);
    }
  }
  assert((await page.locator('h1').count()) === 1, `one main heading ${path}`);
  await loadImages();
  assert(
    await page
      .locator('img')
      .evaluateAll((imgs) => imgs.every((i) => i.complete && i.naturalWidth > 0)),
    `images loaded ${path}`,
  );
}
function locationOrigin(url) {
  return new URL(url).origin;
}
await writeFile(
  `${output}/verification.json`,
  JSON.stringify({ results, a11y, errors, routeCount: visited.size }, null, 2),
);
await browser.close();
console.log(
  JSON.stringify({
    checks: results.length,
    failed: results.filter((r) => !r.pass).length,
    jsErrors: errors.length,
    routes: visited.size,
  }),
);
if (errors.length || results.some((r) => !r.pass)) process.exitCode = 1;
