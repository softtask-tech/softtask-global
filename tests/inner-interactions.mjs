import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const output=process.env.QA_OUTPUT||'../../outputs/inner-page-revision';await mkdir(output,{recursive:true});
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4322';
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'msedge',headless:true});
const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();const results=[];
const check=(pass,label)=>{results.push({pass:!!pass,label});if(!pass)console.error(label);};
await page.addInitScript(()=>localStorage.setItem('softtask-consent-v1',JSON.stringify({version:1,analytics:false,marketing:false,expires:Date.now()+86400000})));
await page.goto(base+'/company/',{waitUntil:'networkidle'});
await page.getByRole('button',{name:'India',exact:true}).click();
check(await page.locator('#presence-india').isVisible(),'India presence opens');
check((await page.locator('#presence-india address').textContent()).includes('302'),'confirmed India address');
check(await page.locator('#presence-singapore').isHidden(),'only selected location displayed');
await page.getByRole('button',{name:'United States',exact:true}).click();
check((await page.locator('#presence-usa').textContent()).includes('8 The Green'),'legacy USA address');
await page.goto(base+'/products/regulix-one/',{waitUntil:'networkidle'});
await page.locator('[data-flow-step="2"]').click();
check(await page.locator('[data-flow-detail="2"]').isVisible(),'workflow review stage opens');
check(await page.locator('[data-flow-step="2"]').getAttribute('aria-expanded')==='true','workflow announces expanded stage');
check(await page.locator('[data-flow-detail="0"]').isHidden(),'workflow prior stage hidden');
check(await page.locator('.drawing').count()===0,'reduced motion skips draw animation');
await page.goto(base+'/contact/?country=United%20States');check(await page.locator('[name=country]').inputValue()==='United States','US enquiry market prefill');
await page.goto(base+'/products/');
check(await page.locator('a[href="/products/tubblor/"]').count()>0,'internal product discovery');
check(await page.locator('.portfolio-tile img').evaluateAll(imgs=>imgs.every(img=>Math.abs(img.width/img.height-img.naturalWidth/img.naturalHeight)<.03)),'product screenshots preserve aspect ratio');
for(const route of ['/company/','/products/tubblor/','/products/regulix-one/','/products/kytheos/','/services/data-engineering/','/services/blockchain-engineering/']){
  for(const width of [390,1440]){
    await page.setViewportSize({width,height:width===390?844:1000});await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`${output}/top-${route.replaceAll('/','-')}-${width}.png`});
  }
}
const moving=await browser.newContext({reducedMotion:'no-preference'});const motionPage=await moving.newPage();await motionPage.goto(base+'/products/tubblor/',{waitUntil:'networkidle'});await motionPage.locator('.signal-orbit').scrollIntoViewIfNeeded();await motionPage.waitForSelector('.signal-orbit.drawing');check(await motionPage.locator('.signal-orbit').evaluate(e=>getComputedStyle(e.querySelector('.route-line')).animationIterationCount==='1'),'diagram animation runs once');
await writeFile(`${output}/inner-interactions.json`,JSON.stringify(results,null,2));await browser.close();console.log(JSON.stringify({checks:results.length,failed:results.filter(r=>!r.pass).length}));if(results.some(r=>!r.pass))process.exitCode=1;
