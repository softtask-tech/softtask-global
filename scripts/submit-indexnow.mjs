import {readFile} from 'node:fs/promises';
const {key,host}=JSON.parse(await readFile('planning/indexnow.json','utf8'));
const xml=await readFile('dist/sitemap-0.xml','utf8');
const urlList=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
if(!urlList.length||urlList.some(url=>new URL(url).hostname!==host))throw new Error('Unexpected sitemap host or empty sitemap');
if(!process.argv.includes('--submit')){console.log(JSON.stringify({urls:urlList.length,status:'Dry run; use --submit after deployment.'}));process.exit(0);}
const keyLocation=`https://${host}/${key}.txt`;
const keyResponse=await fetch(keyLocation,{signal:AbortSignal.timeout(15000)});
if(!keyResponse.ok||(await keyResponse.text()).trim()!==key)throw new Error('Public key file is not deployed');
const home=await fetch(`https://${host}/`,{signal:AbortSignal.timeout(15000)});
if(!home.ok||/noindex/.test(home.headers.get('x-robots-tag')||'')||/<meta name="robots"[^>]*noindex/.test(await home.text()))throw new Error('Live site is not indexable');
const result=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({host,key,keyLocation,urlList}),signal:AbortSignal.timeout(20000)});
console.log(JSON.stringify({status:result.status,urls:urlList.length,meaning:result.status===200?'URLs received; indexing is not guaranteed':result.status===202?'URLs received; key validation pending':'Submission not accepted'}));
if(![200,202].includes(result.status))process.exitCode=1;
