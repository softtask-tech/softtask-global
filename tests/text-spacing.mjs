import {chromium} from '@playwright/test';
import {readFile,writeFile} from 'node:fs/promises';
const urls=[...(await readFile('dist/sitemap-0.xml','utf8')).matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const browser=await chromium.launch({channel:'msedge',headless:true});const findings=[];
try{const page=await browser.newPage({viewport:{width:390,height:900},reducedMotion:'reduce'});
for(const path of urls){await page.goto('http://127.0.0.1:4322'+path);const issues=await page.evaluate(()=>Array.from(document.querySelectorAll('main h2,main h3')).flatMap(h=>{const p=h.nextElementSibling;if(p?.tagName!=='P')return [];const a=h.getBoundingClientRect(),b=p.getBoundingClientRect();if(!a.height||!b.height)return [];return b.top-a.bottom<11?[{heading:h.textContent?.trim(),gap:Math.round(b.top-a.bottom)}]:[]}));if(issues.length)findings.push({path,issues});}
await writeFile('../../outputs/search-review/spacing.json',JSON.stringify({pages:urls.length,findings},null,2));console.log(JSON.stringify({pages:urls.length,findings},null,2));if(findings.length)process.exitCode=1;
}finally{await browser.close();}
