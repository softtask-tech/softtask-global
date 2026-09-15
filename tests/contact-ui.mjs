import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext();
const page=await context.newPage();
const output='../../outputs/contact-review';await mkdir(output,{recursive:true});
try {
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:1000});
    await page.goto('http://127.0.0.1:4322/contact/');
    await page.evaluate(()=>document.fonts.ready);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow at ${width}`);
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`Accessibility at ${width}`);
    assert.ok(await page.locator('[name=phoneCountry] option').count()>200);
    await page.locator('[name=phone]').fill('8123 4567');
    assert.equal(await page.locator('[name=phoneCountry]').getAttribute('required'),'');
    await page.locator('[name=phoneCountry]').selectOption('SG');
    await page.locator('[name=phone]').fill('');
    assert.equal(await page.locator('[name=phoneCountry]').getAttribute('required'),null);
    await page.screenshot({path:`${output}/contact-${width}.png`,fullPage:true});
  }
  console.log('Contact UI: five widths passed overflow, accessibility, country options and optional-phone checks.');
} finally {await browser.close();}
