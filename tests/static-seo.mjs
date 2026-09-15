import {readdir,readFile,access} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');const pages=[];const titles=new Set(),descriptions=new Set();const failures=[];
async function walk(folder){for(const item of await readdir(folder,{withFileTypes:true})){if(item.isDirectory()){if(!['images','_astro'].includes(item.name))await walk(path.join(folder,item.name));}else if(item.name.endsWith('.html'))pages.push(path.join(folder,item.name));}}
await walk(root);
const check=(pass,message)=>{if(!pass)failures.push(message);};
for(const file of pages){
  const html=await readFile(file,'utf8');const title=html.match(/<title>(.*?)<\/title>/)?.[1];const description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  check(title&&!titles.has(title),`Duplicate/missing title: ${file}`);titles.add(title);
  check(description?.length>50&&!descriptions.has(description),`Duplicate/missing description: ${file}`);descriptions.add(description);
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];check(canonical?.startsWith('https://softtask.co/'),`Canonical: ${file}`);
  const image=html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  try{await access(path.join(root,new URL(image).pathname));}catch{failures.push(`Missing social image: ${file}`);}
  const schema=html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/)?.[1];
  try{const graph=JSON.parse(schema)['@graph'];check(graph.some(n=>n['@type']==='WebPage'),`Missing WebPage: ${file}`);}catch{failures.push(`Invalid structured data: ${file}`);}
  for(const match of html.matchAll(/href="(\/[^"#]*)"/g)){
    if(match[1].startsWith('//')||match[1].startsWith('/api/'))continue;
    const url=new URL(match[1].replaceAll('&amp;','&'),'https://softtask.co');const target=path.join(root,url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname);
    try{await access(target);}catch{failures.push(`Broken local link ${match[1]} from ${path.relative(root,file)}`);}
  }
  // A visitor's international dialling-code option is not a company-office claim.
  const presenceCopy=html.replace(/<select\b[^>]*name="phoneCountry"[^>]*>[\s\S]*?<\/select>/g,'');
  check(!/United Kingdom|London|Tallinn/.test(presenceCopy),`Inactive/unapproved presence: ${file}`);
}
console.log(JSON.stringify({pages:pages.length,failures},null,2));if(failures.length)process.exitCode=1;
