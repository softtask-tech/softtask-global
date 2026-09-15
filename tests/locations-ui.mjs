import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();
 await page.addInitScript(()=>localStorage.setItem('softtask-consent-v1',JSON.stringify({version:3,analytics:false,marketing:false,expires:Date.now()+86400000})));
 for(const route of ['/','/company/locations/','/company/locations/singapore/','/company/locations/india/','/company/locations/uae/','/company/locations/usa/','/company/locations/saudi/','/newsletter/']){
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:960});await page.goto('http://127.0.0.1:4322'+route);
   const overflow=await page.evaluate(()=>Array.from(document.querySelectorAll('main *')).filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,class:el.className,text:el.textContent?.slice(0,65)})).slice(0,8));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} ${width}: overflow ${JSON.stringify(overflow)}`);
   assert.equal(await page.locator('footer a[href="/company/locations/usa/"]').count(),1);
   if(width===390){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(result.violations.map(v=>v.id),[],route);}
  }
 }
 console.log('32 location/footer/newsletter responsive checks and 8 accessibility scans passed.');
}finally{await browser.close();}
