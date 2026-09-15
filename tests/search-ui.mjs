import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();
await page.addInitScript(()=>localStorage.setItem('softtask-consent-v1',JSON.stringify({version:3,analytics:false,marketing:false,expires:Date.now()+86400000})));
const errors=[];page.on('pageerror',error=>errors.push(error.message));const results=[];await mkdir('../../outputs/search-review',{recursive:true});
try {
  for(const route of ['/','/company/global-delivery/','/solutions/shipment-document-readiness/','/solutions/confidential-knowledge-search/','/services/software-engineering/','/industries/manufacturing/','/contact/','/services/cybersecurity/','/products/kytheos/']){
    for(const width of [320,390,768,1024,1440]){
      await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4322'+route);await page.evaluate(()=>document.fonts.ready);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} overflow ${width}`);
      if([390,768,1440].includes(width)){const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`${route} accessibility ${width}`);}
      if([390,1440].includes(width))await page.screenshot({path:`../../outputs/search-review/${route.replaceAll('/','-')}-${width}.png`,fullPage:true});results.push({route,width,passed:true});
    }
  }
  await page.goto('http://127.0.0.1:4322/contact/?industry=transport-logistics&scenario=case-15');
  assert.equal(await page.locator('[data-optional-context]').getAttribute('open'),'');
  await page.locator('[name=message]').fill('Too short');assert.match(await page.locator('[name=message]').evaluate(el=>el.validationMessage),/20 characters/);
  assert.equal(await page.locator('#message-count').textContent(),'9 / 5,000');
  assert.deepEqual(errors,[]);await writeFile('../../outputs/search-review/browser.json',JSON.stringify({results,errors},null,2));console.log('45 responsive checks, 27 accessibility scans, context prefill and native message validation passed.');
} finally {await browser.close();}
