import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
const dir = process.env.QA_OUTPUT || 'qa';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({
  channel: 'msedge',
  headless: true,
  args: ['--remote-debugging-port=9225'],
});
try {
  const result = await lighthouse(process.env.TEST_BASE_URL || 'http://127.0.0.1:4322', {
    port: 9225,
    output: ['html', 'json'],
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  await writeFile(`${dir}/lighthouse.html`, result.report[0]);
  await writeFile(`${dir}/lighthouse.json`, result.report[1]);
  console.log(
    JSON.stringify(
      Object.fromEntries(Object.entries(result.lhr.categories).map(([k, v]) => [k, v.score])),
    ),
  );
} finally {
  await browser.close();
}
