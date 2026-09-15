import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
// Requires the account owner's authenticated Wrangler session. No public export endpoint.
const query="SELECT email, topic, created_at, updated_at FROM subscribers WHERE status = 'active' ORDER BY email";
const output=execFileSync(process.execPath,[path.resolve('node_modules/wrangler/bin/wrangler.js'),'d1','execute','DB','--remote','--command',query,'--json'],{encoding:'utf8',maxBuffer:20*1024*1024,stdio:['ignore','pipe','pipe']});
const results=JSON.parse(output);
if(!Array.isArray(results)||results.some(r=>!r.success))throw new Error('Subscriber export failed. Check database access.');
const records=results.flatMap(r=>r.results||[]);
const cell=value=>'"'+String(value??'').replace(/^[=+@\-\t\r]/,"'$&").replaceAll('"','""')+'"';
const rows=[['Email','Topic','First requested (UTC)','Last updated (UTC)'],...records.map(r=>[r.email,r.topic,new Date(r.created_at).toISOString(),new Date(r.updated_at).toISOString()])];
await mkdir('private-exports',{recursive:true});
const file=`private-exports/newsletter-${new Date().toISOString().slice(0,10)}.csv`;
await writeFile(file,'\ufeff'+rows.map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n',{mode:0o600});
console.log(`Saved ${records.length} confirmed subscriptions to ${file}. Use a fresh export before each campaign so withdrawals are respected.`);
