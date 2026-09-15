import {readFile,readdir,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');const files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(entry.isDirectory()){if(!['_astro','images'].includes(entry.name))await walk(path.join(dir,entry.name));}else if(entry.name.endsWith('.html'))files.push(path.join(dir,entry.name));}}
await walk(root);
const map=[];const failures=[];const links=new Map();
const check=(condition,label)=>{if(!condition)failures.push(label);};
for(const file of files){
  const html=await readFile(file,'utf8');const relative=path.relative(root,file).replaceAll('\\','/');const route=relative==='index.html'?'/':'/'+relative.replace(/index\.html$/,'');
  const graph=JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1])['@graph'];
  const visibleHTML=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  links.set(route,[...visibleHTML.matchAll(/href="(\/[^"#]*)"/g)].map(m=>new URL(m[1],'https://softtask.co').pathname));
  const title=html.match(/<title>(.*?)<\/title>/s)[1];const description=html.match(/<meta name="description" content="([^"]*)"/)[1];
  check((html.match(/<h1(?:\s|>)/g)||[]).length===1,`${route}: one H1`);
  check(html.includes('mailto:contact@softtask.co'),`${route}: direct enquiry email`);
  check(html.includes('Technology for innovators'),`${route}: slogan`);
  check(!/<script[^>]*src="https:\/\/www.googletagmanager/.test(html),`${route}: no unconditional analytics`);
  if(!relative.includes('404'))check(/<meta name="robots" content="index, follow/.test(html),`${route}: indexable production HTML`);
  const answers=graph.find(n=>n['@type']==='FAQPage');
  if(answers){for(const answer of answers.mainEntity)check(visibleHTML.includes(answer.name.replaceAll('&','&amp;'))||visibleHTML.includes(answer.name),`${route}: visible question ${answer.name}`);}
  if(route==='/services/')check(graph.find(n=>n['@type']==='ItemList').itemListElement.length===15,'All 15 pillars in schema');
  map.push({route,title,description,answerCount:answers?.mainEntity.length||0});
}
const robots=await readFile('dist/robots.txt','utf8');check(robots.includes('Allow: /')&&!/Disallow: \/\s*$/m.test(robots),'Production crawl access');
const visited=new Set();const queue=['/'];while(queue.length){const route=queue.shift();if(visited.has(route))continue;visited.add(route);for(const link of links.get(route)||[])if(links.has(link))queue.push(link);}
for(const page of map.filter(p=>!p.route.includes('404')))check(visited.has(page.route),`${page.route}: discoverable through HTML links`);
check(!(await readFile('dist/_headers','utf8')).includes('noindex'),'Production headers');
const sitemap=await readFile('dist/sitemap-0.xml','utf8');
check((sitemap.match(/<loc>/g)||[]).length===files.length-1,'All content pages in sitemap');
check(!sitemap.includes('/404')&&!sitemap.includes('/api/'),'No error or API sitemap URLs');
const llms=await readFile('dist/llms.txt','utf8');check(llms.includes('/solutions/shipment-document-readiness/'),'Text directory includes solution briefs');
await mkdir('../../outputs/search-review',{recursive:true});
await writeFile('../../outputs/search-review/static.json',JSON.stringify({pages:files.length,failures,map},null,2));
await writeFile('planning/SEARCH-PAGE-MAP.md','# Search page map\n\nEvery generated page has a unique title, description and canonical route. These topics are editorial intent mappings, not measured search volumes or rankings.\n\n| Page | Search title | Description |\n|---|---|---|\n'+map.filter(p=>!p.route.includes('404')).map(p=>`| [${p.route}](https://softtask.co${p.route}) | ${p.title.replaceAll('|','—')} | ${p.description.replaceAll('|','—')} |`).join('\n')+'\n');
console.log(JSON.stringify({pages:files.length,failures},null,2));assert.deepEqual(failures,[]);
