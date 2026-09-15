import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const catalogue=JSON.parse(await readFile('src/data/catalogue.json','utf8'));
const pillar=catalogue.pillars.find(p=>p.id==='cybersecurity');
assert.equal(catalogue.pillars.length,15);
assert.equal(pillar.url,'/services/cybersecurity/');
const cyber=await readFile('dist/services/cybersecurity/index.html','utf8');
for(const text of ['STRID','Penetration testing','Incident response','AI application security','Data protection','Security governance','public beta'])assert.ok(cyber.includes(text),text);
assert.ok(cyber.includes('"@type":"Service"'));
const kytheos=await readFile('dist/products/kytheos/index.html','utf8');
assert.ok(kytheos.includes('href="/services/cybersecurity/"'));
assert.ok(kytheos.includes('public beta'));
assert.ok(!kytheos.includes('under Kytheos'));
const sitemap=await readFile('dist/sitemap-0.xml','utf8');
for(const [,url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)){
  const route=new URL(url).pathname;
  const html=await readFile(`dist${route}index.html`,'utf8');
  assert.ok(!/not a completed client project|not claims of completed client results|Are these completed customer projects/.test(html),route);
  assert.ok(html.includes("window.gtag('consent', 'default'"),`${route}: consent bootstrap`);
}
console.log('Cybersecurity routing, service schema, beta separation, neutral copy and all-page consent bootstrap passed.');
