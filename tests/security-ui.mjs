import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:960});await page.goto('http://127.0.0.1:4322/services/cybersecurity/');
  const reject=page.getByRole('button',{name:'Reject optional',exact:true});if(await reject.isVisible())await reject.click();
  const summary=page.locator('.security-services summary').first();await summary.focus();await page.keyboard.press('Enter');
  await page.getByRole('heading',{name:'Make access a deliberate decision.'}).waitFor();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.equal(await page.locator('.security-path').evaluate(el=>getComputedStyle(el).animationName),'none');
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(audit.violations.map(v=>v.id),[]);
  if(width===390||width===1440){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`../../outputs/search-review/cybersecurity-cover-${width}.png`});}
 }
 console.log('Cybersecurity expanded service panels: keyboard, four screen widths, accessibility and reduced motion passed.');
} finally {await browser.close();}
