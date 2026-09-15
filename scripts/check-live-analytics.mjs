import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const context=await browser.newContext();const page=await context.newPage();let tagStatus;let measurements=0;
 // Fetch the real tag, but intercept measurement requests to avoid polluting reporting.
 await context.route('**/*',async route=>{
  const u=new URL(route.request().url());
  if(u.pathname.endsWith('/collect')){measurements++;return route.fulfill({status:204,body:''});}
  if(['softtask.co','www.googletagmanager.com'].includes(u.hostname))return route.continue();
  return route.abort();
 });
 page.on('response',r=>{if(r.url().includes('googletagmanager.com/gtag/js?id=G-REH51537N8'))tagStatus=r.status();});
 await page.goto('https://softtask.co/',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>typeof window.google_tag_manager==='object',{},{timeout:20000});
 assert.equal(tagStatus,200);
 assert.ok(!(await context.cookies()).some(c=>c.name.startsWith('_ga')));
 const before=await page.evaluate(()=>Array.from(window.dataLayer||[],x=>Array.from(x)).filter(x=>x[0]==='consent'));
 assert.equal(before[0][2].analytics_storage,'denied');
 await page.getByRole('button',{name:'Accept optional',exact:true}).click();
 await page.waitForFunction(()=>document.cookie.includes('_ga='));
 const after=await page.evaluate(()=>Array.from(window.dataLayer||[],x=>Array.from(x)).filter(x=>x[0]==='consent').at(-1));
 assert.equal(after[2].analytics_storage,'granted');
 assert.equal(await page.locator('#softtask-google-analytics').count(),1);
 const report={url:'https://softtask.co/',tagStatus,defaultStorage:'denied',cookiesBeforeConsent:false,cookiesAfterConsent:true,tagCount:1,interceptedMeasurementRequests:measurements,accountReportingVerified:false};
 await writeFile('../../outputs/search-review/live-analytics.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
