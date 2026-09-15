import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const output='../../outputs/governance-review';
await mkdir(output,{recursive:true});
const sitemap=await readFile('dist/sitemap-0.xml','utf8');
const paths=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).filter(p=>p.startsWith('/governance/')||['/privacy/','/terms/','/cookies/','/accessibility/','/contact/'].includes(p));
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();
const results=[],errors=[];
const check=(pass,label,detail)=>results.push({pass:!!pass,label,detail});
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>localStorage.setItem('softtask-consent-v1',JSON.stringify({version:1,analytics:false,marketing:false,expires:Date.now()+86400000})));
for(const path of paths){
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:960});
    const response=await page.goto('http://127.0.0.1:4322'+path);
    await page.evaluate(()=>document.fonts.ready);
    check(response.status()===200,'Page loads',path);
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow',`${path} ${width}`);
    if([390,768,1440].includes(width)){
      const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      check(a.violations.length===0,'Accessibility scan', {path,width,issues:a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
    }
    if(['/governance/','/privacy/','/governance/grievances/','/governance/security/','/governance/contacts/'].includes(path)&&[390,1440].includes(width))
      await page.screenshot({path:`${output}/${path.replaceAll('/','-')}-${width}.png`,fullPage:true});
  }
  const anchors=await page.locator('.gov-contents nav a').evaluateAll(links=>links.every(a=>document.getElementById(a.hash.slice(1))));
  check(anchors,'Contents links have targets',path);
}
await page.goto('http://127.0.0.1:4322/contact/');
check(await page.locator('[name=consent]').getAttribute('required')!==null,'Consent is required');
check(!(await page.locator('[name=consent]').isChecked()),'Consent is not preselected');
check(await page.locator('[name=noticeVersion]').inputValue()==='2026-09-15','Notice version submitted');
check((await page.locator('.checkbox-field').innerText()).includes('does not subscribe me to marketing'),'No bundled marketing consent');
await page.goto('http://127.0.0.1:4322/privacy/');
check((await page.locator('main').innerText()).includes('Soft Task Singapore Pte. Ltd.'),'Controller named in privacy notice');
check((await page.locator('main').innerText()).includes('proposed for adoption'),'Retention remains accurately labelled');
await page.goto('http://127.0.0.1:4322/governance/contacts/');
check(await page.locator('.gov-contact-list a[href^="mailto:"]').count()===15,'15 public contact routes');
check(await page.locator('a[href="mailto:abuse@softtask.tech"]').count()===0,'Unavailable legacy mailbox omitted');
check(errors.length===0,'No browser exceptions',errors);
await browser.close();
const failures=results.filter(r=>!r.pass);await writeFile(`${output}/checks.json`,JSON.stringify({checks:results.length,failures,results},null,2));
console.log(JSON.stringify({checks:results.length,failures},null,2));if(failures.length)process.exitCode=1;
