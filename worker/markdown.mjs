export function prefersMarkdown(accept = '') {
  const ranges = accept.toLowerCase().split(',').map(part => {
    const [type, ...parameters] = part.trim().split(';');
    const parameter = parameters.map(p => p.trim()).find(p => p.startsWith('q='));
    const value = parameter ? Number(parameter.slice(2)) : 1;
    return { type, q: Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0 };
  });
  const quality = type => {
    for (const match of [type, 'text/*', '*/*']) {
      const found = ranges.filter(r => r.type === match);
      if (found.length) return Math.max(...found.map(r => r.q));
    }
    return 0;
  };
  return ranges.some(r => r.type === 'text/markdown') && quality('text/markdown') > 0 && quality('text/markdown') >= quality('text/html');
}

export async function serveNegotiatedAsset(request, env) {
  const url = new URL(request.url);
  // Build artifacts are implementation details; only negotiate at the public URL.
  if (url.pathname.startsWith('/_agent-markdown/')) return new Response('Not found', { status: 404 });
  const markdown = ['GET', 'HEAD'].includes(request.method) && prefersMarkdown(request.headers.get('Accept') || '');
  const headers = new Headers(request.headers);
  if (markdown) {
    for (const name of ['If-None-Match', 'If-Modified-Since', 'Range', 'If-Range']) headers.delete(name);
  }
  const original = await env.ASSETS.fetch(new Request(request, { headers }));
  if (!original.headers.get('Content-Type')?.includes('text/html')) return original;
  const responseHeaders = new Headers(original.headers);
  const vary = responseHeaders.get('Vary');
  if (vary !== '*' && !vary?.split(',').some(v => v.trim().toLowerCase() === 'accept'))
    responseHeaders.set('Vary', vary ? `${vary}, Accept` : 'Accept');
  if (markdown && original.status === 200) {
    let pathname = url.pathname;
    if (pathname.endsWith('/index.html')) pathname = pathname.slice(0, -10);
    if (pathname.endsWith('/')) {
      url.pathname = '/_agent-markdown' + pathname + 'index.md';
      url.search = '';
      const asset = await env.ASSETS.fetch(new Request(url, { method: 'GET' }));
      if (asset.ok && !asset.headers.get('Content-Type')?.includes('text/html')) {
        const text = await asset.text();
        for (const name of ['Content-Length','Content-Encoding','Content-Range','ETag','Last-Modified','Transfer-Encoding']) responseHeaders.delete(name);
        responseHeaders.set('Content-Type', 'text/markdown; charset=utf-8');
        responseHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate');
        responseHeaders.set('X-Markdown-Tokens', String(Math.ceil(new TextEncoder().encode(text).length / 4)));
        responseHeaders.set('X-Markdown-Token-Estimate', 'utf8-bytes-divided-by-4');
        return new Response(request.method === 'HEAD' ? null : text, { headers: responseHeaders });
      }
    }
  }
  return new Response(original.body, { status: original.status, statusText: original.statusText, headers: responseHeaders });
}
