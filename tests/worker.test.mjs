import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { validate, readBody } from '../worker/index.mjs';
import catalogue from '../src/data/catalogue.json' with { type: 'json' };

test('concurrent confirmation cannot consume the same token twice', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('Must not send a second email');
  });
  const DB = {
    prepare() {
      return {
        bind() {
          return {
            first: async () => ({
              email: 'reader@example.com',
              pending_topic: 'all',
              confirm_expires: Date.now() + 10000,
            }),
            run: async () => ({ meta: { changes: 0 } }),
          };
        },
      };
    },
  };
  const response = await worker.fetch(
    new Request('https://softtask.co/api/confirm', {
      method: 'POST',
      headers: {
        Origin: 'https://softtask.co',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${'a'.repeat(64)}`,
    }),
    { DB },
  );
  assert.match(await response.text(), /already been used/);
});
const valid = {
  noticeVersion: '2026-09-15',
  name: 'A Buyer',
  email: 'buyer@example.com',
  company: 'Example',
  country: 'Singapore',
  service: 'cloud-infrastructure',
  message: 'We need to review our workload migration.',
  consent: 'true',
};
const request = (body, extra = {}) =>
  new Request('https://softtask.co/api/contact', {
    method: 'POST',
    headers: { Origin: 'https://softtask.co', 'Content-Type': 'application/json', ...extra },
    body: JSON.stringify(body),
  });
test('all 15 capability pillars are accepted and industry context must match its scenario',()=>{
  for(const pillar of catalogue.pillars)assert.equal(validate({...valid,service:pillar.id},'contact'),null);
  assert.equal(validate({...valid,industry:'transport-logistics',scenario:'case-15'},'contact'),null);
  for(const context of [{industry:'invented'},{industry:'manufacturing',scenario:'case-15'},{scenario:'case-15'},{industry:'transport-logistics',scenario:'invented'}])
    assert.ok(validate({...valid,...context},'contact'));
});
test('valid request is unavailable without delivery configuration, never successful', async () => {
  const r = await worker.fetch(request(valid), {});
  assert.equal(r.status, 503);
  assert.match((await r.json()).message, /not active/);
});
test('optional phone accepts international numbers and rejects incomplete selections', () => {
  assert.equal(validate({...valid,phoneCountry:'SG',phone:'8123 4567'},'contact'),null);
  assert.equal(validate({...valid,phoneCountry:'US',phone:'202-555-0123'},'contact'),null);
  for(const phone of [{phone:'81234567'},{phone:'81234567',phoneCountry:'XX'},{phone:'bad',phoneCountry:'SG'},{phone:'1',phoneCountry:'SG'}])assert.ok(validate({...valid,...phone},'contact'));
});
test('known alternate origins work only with matching request and challenge hosts', async (t) => {
  let host='www.softtask.co';
  let sent;
  t.mock.method(globalThis,'fetch',async(url,options)=>{
    if(String(url).includes('siteverify'))return Response.json({success:true,action:'contact',hostname:host});
    sent=JSON.parse(options.body);return Response.json({id:'test-origin-mail'});
  });
  const make=(origin,requestOrigin=origin)=>new Request(`${origin}/api/contact`,{method:'POST',headers:{Origin:requestOrigin,'Content-Type':'application/json'},body:JSON.stringify({...valid,phoneCountry:'SG',phone:'8123 4567','cf-turnstile-response':'test-token'})});
  const env={...configured,ADDITIONAL_SITE_ORIGINS:'https://www.softtask.co,https://softtaskglobalwebsite.softtask-tech.workers.dev'};
  assert.equal((await worker.fetch(make('https://www.softtask.co'),env)).status,202);
  assert.match(sent.text,/Phone: \+6581234567/);
  assert.equal((await worker.fetch(make('https://www.softtask.co','https://evil.example'),env)).status,403);
  assert.equal((await worker.fetch(make('https://evil.example'),env)).status,403);
  host='softtask.co';
  assert.equal((await worker.fetch(make('https://www.softtask.co'),env)).status,422);
  host='softtaskglobalwebsite.softtask-tech.workers.dev';
  assert.equal((await worker.fetch(make(`https://${host}`),env)).status,202);
});
test('rejects malformed fields and missing consent', () => {
  assert.equal(validate(valid, 'contact'), null);
  for (const change of [
    { email: 'wrong' },
    { consent: false },
    { message: 'short' },
    { service: 'invented' },
    { website: 'spam' },
    { name: '' },
    { noticeVersion: 'old' },
    { noticeVersion: undefined },
  ])
    assert.ok(validate({ ...valid, ...change }, 'contact'));
});
test('rejects cross-origin and unsupported method', async () => {
  assert.equal(
    (await worker.fetch(request(valid, { Origin: 'https://evil.example' }), {})).status,
    403,
  );
  assert.equal(
    (await worker.fetch(new Request('https://softtask.co/api/contact'), {})).status,
    405,
  );
});
test('limits actual streamed body rather than trusting Content-Length', async () => {
  await assert.rejects(() =>
    readBody(
      new Request('https://softtask.co/api/contact', { method: 'POST', body: 'x'.repeat(17000) }),
    ),
  );
});
test('newsletter cannot accept a subscription without dependencies', async () => {
  const r = await worker.fetch(
    new Request('https://softtask.co/api/subscribe', {
      method: 'POST',
      headers: { Origin: 'https://softtask.co', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'reader@example.com', topic: 'all', consent: true }),
    }),
    {},
  );
  assert.equal(r.status, 503);
});
test('configuration does not expose secrets', async () => {
  const r = await worker.fetch(new Request('https://softtask.co/api/config'), {
    MAIL_API_KEY: 'private',
    TURNSTILE_SECRET: 'private',
  });
  assert.deepEqual(await r.json(), { active: false, newsletterActive: false, siteKey: null });
});
test('static requests pass through to asset binding', async () => {
  const r = await worker.fetch(new Request('https://softtask.co/services/'), {
    ASSETS: { fetch: () => new Response('asset') },
  });
  assert.equal(await r.text(), 'asset');
});
test('canonical public pages remain indexable while previews and errors are excluded',async()=>{
  const env={ASSETS:{fetch:()=>new Response('public content')}};
  const canonical=await worker.fetch(new Request('https://softtask.co/services/'),env);
  assert.equal(canonical.headers.get('x-robots-tag'),null);
  const www=await worker.fetch(new Request('https://www.softtask.co/services/?source=ref'),env);
  assert.equal(www.status,308);assert.equal(www.headers.get('location'),'https://softtask.co/services/?source=ref');
  const preview=await worker.fetch(new Request('https://softtaskglobalwebsite.softtask-tech.workers.dev/services/'),env);
  assert.match(preview.headers.get('x-robots-tag'),/noindex/);
  const robots=await worker.fetch(new Request('https://softtaskglobalwebsite.softtask-tech.workers.dev/robots.txt'),env);
  assert.match(await robots.text(),/Disallow: \//);
  const missing=await worker.fetch(new Request('https://softtask.co/missing/'),{ASSETS:{fetch:()=>new Response('missing',{status:404})}});
  assert.equal(missing.status,404);assert.match(missing.headers.get('x-robots-tag'),/noindex/);
});

const configured = {
  SITE_ORIGIN: 'https://softtask.co',
  MAIL_API_KEY: 'test-only',
  MAIL_FROM: 'test@example.com',
  NOTIFY_TO: 'test@example.com',
  TURNSTILE_SECRET: 'test-only',
  PUBLIC_TURNSTILE_SITE_KEY: 'test-public',
};
test('provider failure is not reported as successful delivery', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) =>
    String(url).includes('siteverify')
      ? Response.json({ success: true, action: 'contact', hostname: 'softtask.co' })
      : Response.json({ error: 'unavailable' }, { status: 503 }),
  );
  const r = await worker.fetch(
    request({ ...valid, 'cf-turnstile-response': 'test-token' }),
    configured,
  );
  assert.equal(r.status, 503);
});
test('provider acceptance returns a precise delivery message', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return String(url).includes('siteverify')
      ? Response.json({ success: true, action: 'contact', hostname: 'softtask.co' })
      : Response.json({ id: 'mock-email' });
  });
  const r = await worker.fetch(
    request({ ...valid, 'cf-turnstile-response': 'test-token' }),
    configured,
  );
  assert.equal(r.status, 202);
  assert.match((await r.json()).message, /accepted for email delivery/);
  assert.equal(calls[1].body.to, 'test@example.com');
  assert.equal(calls[1].body.reply_to, valid.email);
  assert.equal(calls[1].body.from, configured.MAIL_FROM);
  assert.match(calls[1].body.text, /Notice version: 2026-09-15/);
  assert.match(calls[1].body.text, /Agreement recorded: \d{4}-\d{2}-\d{2}T/);
  assert.match(calls[1].body.text, /Marketing subscription: not requested/);
  assert.match(calls[1].body.html, /https:\/\/softtask.co\/logo.png/);
  assert.equal(calls[2].body.to, valid.email);
  assert.match(calls[2].body.text, /within one working day/);
  assert.ok(calls[2].body.text.includes(valid.message));
  assert.match(calls[2].body.html, /We have received your enquiry/);
  for (const value of [valid.name, valid.email, valid.company, valid.country, valid.service, valid.message])
    assert.ok(calls[1].body.text.includes(value));
});

test('acknowledgement failure preserves the received enquiry and reports the email issue', async t => {
  let emails=0;
  t.mock.method(globalThis,'fetch',async url=>{
    if(String(url).includes('siteverify'))return Response.json({success:true,action:'contact',hostname:'softtask.co'});
    return ++emails===1?Response.json({id:'accepted-notification'}):new Response('unavailable',{status:503});
  });
  const r=await worker.fetch(request({...valid,'cf-turnstile-response':'test'}),configured);
  assert.equal(r.status,202);assert.equal(emails,2);
  assert.match((await r.json()).message,/acknowledgement email could not be sent/);
});

test('mailbox readiness enables contact without enabling unconfigured newsletter storage', async () => {
  const r = await worker.fetch(new Request('https://softtask.co/api/config'), configured);
  assert.deepEqual(await r.json(), { active: true, newsletterActive: false, siteKey: 'test-public' });
});

test('a malformed successful provider response does not claim acceptance', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) =>
    String(url).includes('siteverify')
      ? Response.json({ success: true, action: 'contact', hostname: 'softtask.co' })
      : Response.json({}),
  );
  const r = await worker.fetch(request({ ...valid, 'cf-turnstile-response': 'test-token' }), configured);
  assert.equal(r.status, 503);
});

test('recipient cannot be overridden by submitted fields and different services have different delivery keys', async (t) => {
  const sent = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (String(url).includes('siteverify'))
      return Response.json({ success: true, action: 'contact', hostname: 'softtask.co' });
    sent.push({ body: JSON.parse(options.body), key: options.headers['Idempotency-Key'] });
    return Response.json({ id: 'mock-email' });
  });
  for (const service of ['cloud-infrastructure', 'software-engineering']) {
    const r = await worker.fetch(request({ ...valid, service, to: 'attacker@example.com', 'cf-turnstile-response': 'test-token' }), configured);
    assert.equal(r.status, 202);
  }
  assert.equal(sent[0].body.to, configured.NOTIFY_TO);
  assert.notEqual(sent[0].key, sent[2].key);
});
test('Turnstile fails closed for invalid responses and unavailable verification', async (t) => {
  let outcome;
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.match(String(url), /challenges.cloudflare.com\/turnstile\/v0\/siteverify$/);
    assert.ok(options.signal);
    calls++;
    if (outcome instanceof Error) throw outcome;
    return outcome;
  });
  for (const token of [undefined, '', '   ', 'x'.repeat(2049)]) {
    const r = await worker.fetch(request({ ...valid, 'cf-turnstile-response': token }), configured);
    assert.equal(r.status, 422);
  }
  assert.equal(calls, 0);
  for (outcome of [
    Response.json({ success: true, action: 'subscribe', hostname: 'softtask.co' }),
    Response.json({ success: 'true', action: 'contact', hostname: 'softtask.co' }),
    Response.json({ success: false, 'error-codes': ['timeout-or-duplicate'] }),
    Response.json({ success: true, action: 'contact', hostname: 'softtask.co' }, { status: 500 }),
    Response.json(null),
    new Response('invalid json'),
    new Error('network unavailable'),
  ]) {
    const r = await worker.fetch(request({ ...valid, 'cf-turnstile-response': 'test-token' }), configured);
    assert.equal(r.status, 422);
  }
  assert.equal(calls, 7);
});

test('a valid challenge from the wrong hostname is rejected', async (t) => {
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => {
    calls++;
    return Response.json({ success: true, action: 'contact', hostname: 'other.example' });
  });
  const r = await worker.fetch(
    request({ ...valid, 'cf-turnstile-response': 'test-token' }),
    configured,
  );
  assert.equal(r.status, 422);
  assert.equal(calls, 1);
});
test('newsletter is pending until explicit POST confirmation, with hashed tokens and working unsubscribe', async (t) => {
  let row = null;
  const sent = [];
  const DB = {
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async first() {
              if (sql.includes('WHERE email')) return row?.email === args[0] ? row : null;
              if (sql.includes('WHERE confirm_hash'))
                return row?.confirm_hash === args[0] ? row : null;
              if (sql.includes('WHERE unsubscribe_hash'))
                return row?.unsubscribe_hash === args[0] ? row : null;
              throw new Error('Unexpected query');
            },
            async run() {
              if (sql.startsWith('INSERT'))
                row = {
                  email: args[0],
                  status: 'pending',
                  topic: args[1],
                  pending_topic: args[2],
                  confirm_hash: args[3],
                  confirm_expires: args[4],
                  created_at: args[5],
                  updated_at: args[6],
                };
              else if (sql.startsWith('UPDATE')) {
                row.status = args[0];
                row.topic = row.pending_topic;
                row.unsubscribe_hash = args[1];
                row.confirm_hash = null;
              } else if (sql.startsWith('DELETE')) row = null;
              return { meta: { changes: 1 } };
            },
          };
        },
      };
    },
  };
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (String(url).includes('siteverify'))
      return Response.json({ success: true, action: 'subscribe', hostname: 'softtask.co' });
    sent.push(JSON.parse(options.body));
    return Response.json({ id: 'mock-email' });
  });
  const env = { ...configured, MAIL_REPLY_TO: 'contact@softtask.co', DB };
  const signup = new Request('https://softtask.co/api/subscribe', {
    method: 'POST',
    headers: { Origin: 'https://softtask.co', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'reader@example.com',
      topic: 'ai-data',
      consent: true,
      'cf-turnstile-response': 'test-token',
    }),
  });
  const result = await worker.fetch(signup, env);
  assert.equal(result.status, 202);
  assert.equal(row.status, 'pending');
  assert.equal(sent[0].reply_to, 'contact@softtask.co');
  const raw = sent[0].text.match(/token=([a-f0-9]{64})/)[1];
  assert.notEqual(row.confirm_hash, raw);
  const confirmUrl = `https://softtask.co/api/confirm?token=${raw}`;
  await worker.fetch(new Request(confirmUrl), env);
  assert.equal(row.status, 'pending', 'link-scanner GET must not subscribe');
  const confirm = await worker.fetch(
    new Request('https://softtask.co/api/confirm', {
      method: 'POST',
      headers: {
        Origin: 'https://softtask.co',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${raw}`,
    }),
    env,
  );
  assert.match(await confirm.text(), /Your subscription is confirmed/);
  assert.equal(row.status, 'active');
  assert.equal(row.topic, 'ai-data');
  assert.equal(row.confirm_hash, null);
  const unsub = sent[1].text.match(/token=([a-f0-9]{64})/)[1];
  await worker.fetch(new Request(`https://softtask.co/api/unsubscribe?token=${unsub}`), env);
  assert.equal(row.status, 'active', 'link-scanner GET must not unsubscribe');
  await worker.fetch(
    new Request('https://softtask.co/api/unsubscribe', {
      method: 'POST',
      headers: {
        Origin: 'https://softtask.co',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${unsub}`,
    }),
    env,
  );
  assert.equal(row, null);
});
