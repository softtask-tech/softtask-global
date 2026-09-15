import {chromium} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext();const page=await context.newPage();
let tagLoads=0;const errors=[];page.on('pageerror',e=>errors.push(e.message));
await context.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.hostname==='www.googletagmanager.com'){tagLoads++;return route.fulfill({contentType:'text/javascript',body:'/* Controlled test stub: no Google data is sent. */'});}
  if(url.hostname!=='softtask.co')return route.abort();
  if(url.pathname==='/api/config')return route.fulfill({json:{active:false,siteKey:null,newsletterActive:false}});
  if(url.pathname==='/api/contact')return route.fulfill({status:202,json:{message:'Test enquiry accepted.'}});
  const relative=url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
  try {const file=path.join('dist',relative);const body=await readFile(file);const ext=path.extname(file);return route.fulfill({body,contentType:({'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.png':'image/png','.svg':'image/svg+xml'})[ext]||'application/octet-stream'});}catch{return route.fulfill({status:404,body:'Not found'});}
});
try {
  await page.goto('https://softtask.co/contact/?email=private@example.com&message=private-message');
  await page.getByRole('button',{name:'Reject optional',exact:true}).click();assert.equal(tagLoads,0);
  await page.getByRole('button',{name:'Cookie settings',exact:true}).click();await page.locator('#analytics-choice').check();await page.locator('#save-cookies').click();
  await page.locator('#softtask-google-analytics').waitFor({state:'attached'});assert.equal(tagLoads,1);
  let layer=await page.evaluate(()=>Array.from(window.dataLayer||[],item=>Array.from(item)));
  assert.ok(layer.some(item=>item[0]==='config'&&item[1]==='G-REH51537N8'));
  assert.ok(!JSON.stringify(layer).includes('private@example.com'));assert.ok(!JSON.stringify(layer).includes('private-message'));
  await page.locator('[name=name]').fill('Private Name');await page.locator('[name=email]').fill('private@example.com');await page.locator('[name=company]').fill('Private Company');await page.locator('[name=country]').selectOption({label:'Singapore'});await page.locator('[name=service]').selectOption('ai-automation');await page.locator('[name=message]').fill('This is a private project description for a controlled test.');await page.locator('[name=consent]').check();await page.getByRole('button',{name:'Send your enquiry',exact:true}).click();await page.getByText('Test enquiry accepted.').waitFor();
  layer=await page.evaluate(()=>Array.from(window.dataLayer||[],item=>Array.from(item)));
  assert.ok(layer.some(item=>item[0]==='event'&&item[1]==='generate_lead'));
  assert.ok(!JSON.stringify(layer).includes('Private Name'));assert.ok(!JSON.stringify(layer).includes('private project'));
  await context.addCookies([{name:'_ga',value:'test-cookie',domain:'softtask.co',path:'/',secure:true}]);
  await page.getByRole('button',{name:'Cookie settings',exact:true}).click();await page.locator('#analytics-choice').uncheck();await page.locator('#save-cookies').click();
  assert.equal(await page.evaluate(()=>window['ga-disable-G-REH51537N8']),true);assert.ok(!(await context.cookies()).some(c=>c.name==='_ga'));
  await page.reload();assert.equal(await page.locator('#softtask-google-analytics').count(),0);assert.equal(tagLoads,1);
  assert.deepEqual(errors,[]);console.log('Analytics passed: opt-in only, one tag, clean page URL, non-personal conversion event, withdrawal and persistent rejection. No live analytics or enquiry sent.');
} finally {await browser.close();}
