import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import data from '../src/data/catalogue.json' with {type:'json'};
const output='../../outputs/catalogue-review';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();
await page.addInitScript(()=>localStorage.setItem('softtask-consent-v1',JSON.stringify({version:1,analytics:false,marketing:false,expires:Date.now()+86400000})));
const results=[],errors=[];const check=(pass,label,detail)=>results.push({pass:!!pass,label,detail});page.on('pageerror',e=>errors.push(e.message));
const paths=['/','/services/','/industries/','/solutions/','/contact/','/services/ai-automation/responsible-ai/',...data.pillars.filter(p=>p.scope.length).map(p=>p.url),...data.industries.map(i=>`/industries/${i.id}/`)];
for(const path of paths){
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});const response=await page.goto('http://127.0.0.1:4322'+path);await page.evaluate(()=>document.fonts.ready);
  check(response.status()===200,'Route loads',path);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No overflow',{path,width});
  if(['/services/','/industries/','/industries/transport-logistics/','/contact/','/services/ai-automation/responsible-ai/'].includes(path)&&[390,768,1440].includes(width)){
   const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();check(!a.violations.length,'Accessibility',{path,width,issues:a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
   if(width!==768)await page.screenshot({path:`${output}/${path.replaceAll('/','-')}-${width}.png`,fullPage:true});
  }
 }
}
await page.goto('http://127.0.0.1:4322/services/');check(await page.locator('.pillar-item').count()===15,'15 pillars visible');
await page.locator('summary').filter({hasText:'What we do'}).first().click();check(await page.locator('.mega[open] .catalogue-menu a').count()===17,'Capability menu links');
await page.locator('summary').filter({hasText:'Who we serve'}).first().click();check(await page.locator('.mega[open]').count()===1,'Only one mega menu opens');check(await page.locator('.mega[open] .catalogue-menu a').count()===18,'Industry menu links');await page.screenshot({path:`${output}/menu-desktop.png`});await page.keyboard.press('Escape');check(await page.locator('.mega[open]').count()===0,'Escape closes menu');
await page.goto('http://127.0.0.1:4322/industries/');await page.locator('#industry-search').fill('pharmacy');check(await page.locator('[data-filter-item]:visible').count()===1,'Sub-sector search');await page.reload();check(await page.locator('#industry-search').inputValue()==='pharmacy','Search state persists in URL');await page.locator('#industry-search').fill('zzzz');check(await page.locator('[data-filter-empty]').isVisible(),'Empty search feedback');
await page.goto('http://127.0.0.1:4322/industries/transport-logistics/#case-16');check(await page.locator('#case-16').isVisible(),'Deep link selects second scenario');check(!(await page.locator('#case-15').isVisible()),'Unselected scenario hidden after enhancement');await page.locator('[data-scenario-target=case-15]').click();check(await page.locator('#case-15').isVisible(),'Scenario selection');await page.locator('#case-15 a.button').click();check(await page.locator('[name=industry]').inputValue()==='transport-logistics','Enquiry keeps industry');check(await page.locator('[name=scenario]').inputValue()==='case-15','Enquiry keeps workflow');await page.locator('[name=industry]').selectOption('manufacturing');check(await page.locator('[name=scenario]').inputValue()==='','Industry change clears mismatched workflow');
await page.goto('http://127.0.0.1:4322/services/ai-automation/responsible-ai/');await page.locator('[data-guard-target=action]').click();check(await page.locator('[data-guard-panel=action]').isVisible(),'Guardrail example selection');
const staticContext=await browser.newContext({javaScriptEnabled:false});const staticPage=await staticContext.newPage();await staticPage.goto('http://127.0.0.1:4322/industries/transport-logistics/');check(await staticPage.locator('#case-15').isVisible()&&await staticPage.locator('#case-16').isVisible(),'Both scenarios readable without JavaScript');await staticContext.close();
check(errors.length===0,'No browser errors',errors);await browser.close();const failures=results.filter(r=>!r.pass);await writeFile(`${output}/checks.json`,JSON.stringify({checks:results.length,failures,results},null,2));console.log(JSON.stringify({checks:results.length,failures},null,2));if(failures.length)process.exitCode=1;
