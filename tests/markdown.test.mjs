import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { prefersMarkdown, serveNegotiatedAsset } from '../worker/markdown.mjs';
import worker from '../worker/index.mjs';
import { pageMarkdown } from '../scripts/agent-markdown.mjs';

test('Accept negotiation respects explicit preference, wildcards and refusal', () => {
  for (const accept of ['', '*/*', 'text/html', 'text/*', 'text/markdown;q=0', 'text/markdown;q=0.5,text/html', 'text/markdown;q=bogus']) assert.equal(prefersMarkdown(accept), false, accept);
  for (const accept of ['text/markdown', 'text/html,text/markdown', 'text/markdown;q=0.9,text/html;q=0.8', 'TEXT/MARKDOWN; charset=utf-8', 'text/markdown,text/*;q=0.5']) assert.equal(prefersMarkdown(accept), true, accept);
});

test('conversion keeps content, tables, absolute links and schema without executable/UI clutter', () => {
  const md = pageMarkdown('<html><head><title>Test</title><link rel="canonical" href="https://softtask.co/test/"><script type="application/ld+json">{"@type":"WebPage"}</script></head><body><main><h1>Useful title</h1><p>A &amp; B <a href="/contact/">Contact</a></p><nav>MENU NOISE</nav><script>TRACKING NOISE</script><form>FORM NOISE</form><table><thead><tr><th>Problem</th><th>Solution</th></tr></thead><tbody><tr><td>Delay</td><td>Automation</td></tr></tbody></table></main></body></html>');
  assert.match(md, /# Useful title/); assert.match(md, /A & B/);
  assert.match(md, /https:\/\/softtask.co\/contact\//); assert.match(md, /\| Delay \| Automation \|/);
  assert.match(md, /"@type": "WebPage"/); assert.doesNotMatch(md, /NOISE|<script|<table/);
});

function environment() {
  const seen = [];
  return { seen, ASSETS: { async fetch(request) {
    seen.push(request);
    const url = new URL(request.url);
    if (url.pathname.startsWith('/_agent-markdown/')) return new Response('# Content\n\nClean content.', {headers:{'Content-Type':'text/markdown'}});
    if (url.pathname === '/image.png') return new Response('image', {headers:{'Content-Type':'image/png'}});
    if (url.pathname === '/redirect') return new Response(null, {status:308,headers:{Location:'/redirect/'}});
    return new Response(request.method === 'HEAD' ? null : '<html>Browser content</html>', {status:url.pathname==='/missing/'?404:200,headers:{'Content-Type':'text/html','Vary':'Accept-Encoding','ETag':'html-only','Content-Security-Policy':"default-src 'self'"}});
  } } };
}
test('Markdown gets its own headers and HTML validators never select the Markdown variant', async () => {
  const env=environment();
  const response=await serveNegotiatedAsset(new Request('https://softtask.co/company/?utm_source=x',{headers:{Accept:'text/markdown','If-None-Match':'html-only',Range:'bytes=0-5'}}),env);
  assert.equal(response.headers.get('Content-Type'),'text/markdown; charset=utf-8');
  assert.equal(response.headers.get('Vary'),'Accept-Encoding, Accept');
  assert.equal(response.headers.get('ETag'),null);assert.ok(Number(response.headers.get('X-Markdown-Tokens'))>0);
  assert.equal(response.headers.get('Content-Security-Policy'),"default-src 'self'");
  assert.equal(env.seen[0].headers.get('If-None-Match'),null);
  assert.equal(env.seen[0].headers.get('Range'),null);
  assert.equal(new URL(env.seen[1].url).search,'');
  assert.match(await response.text(),/^# Content/);
});
test('browser, HEAD, redirects, missing pages, files and private routes behave correctly', async () => {
  const env=environment();
  const browser=await serveNegotiatedAsset(new Request('https://softtask.co/'),env);
  assert.match(await browser.text(),/Browser content/);assert.match(browser.headers.get('Vary'),/Accept/);
  const head=await serveNegotiatedAsset(new Request('https://softtask.co/',{method:'HEAD',headers:{Accept:'text/markdown'}}),env);
  assert.match(head.headers.get('Content-Type'),/text\/markdown/);assert.equal(await head.text(),'');
  for (const [path,status,type] of [['/redirect',308,null],['/missing/',404,'text/html'],['/image.png',200,'image/png'],['/_agent-markdown/index.md',404,null]]) {
    const r=await serveNegotiatedAsset(new Request('https://softtask.co'+path,{headers:{Accept:'text/markdown'}}),env);
    assert.equal(r.status,status);if(type)assert.equal(r.headers.get('Content-Type'),type);
  }
  const api=await worker.fetch(new Request('https://softtask.co/api/config',{headers:{Accept:'text/markdown'}}),env);
  assert.match(api.headers.get('Content-Type'),/application\/json/);
  const preview=await worker.fetch(new Request('https://example.workers.dev/',{headers:{Accept:'text/markdown'}}),env);
  assert.match(preview.headers.get('X-Robots-Tag'),/noindex/);
});
test('every built public page has Markdown with its heading, canonical URL and no scripts', async () => {
  let count=0;
  async function walk(dir) {
    for (const item of await readdir(dir,{withFileTypes:true})) {
      const path=join(dir,item.name);
      if(item.isDirectory() && item.name!=='_agent-markdown') await walk(path);
      else if(item.name==='index.html') {
        const md=await readFile(join('dist/_agent-markdown',path.slice(5).replace(/index\.html$/,'index.md')),'utf8');
        assert.match(md,/^# .+/m,path);assert.match(md,/url: "https:\/\/softtask.co\//,path);
        assert.doesNotMatch(md,/<script\b|<style\b|googletagmanager\.com\/gtag|cf-turnstile-response/i,path);
        count++;
      }
    }
  }
  await walk('dist');assert.ok(count>=103);console.log(`Checked ${count} Markdown pages`);
});
