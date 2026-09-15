const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const services = new Set([
  'software-engineering',
  'ai-automation',
  'data-engineering',
  'cloud-infrastructure',
  'data-centres',
  'blockchain-engineering',
  'not-sure',
]);
const topics = new Set(['all', 'infrastructure', 'software', 'ai-data']);
export function validate(data, kind) {
  if (!data || typeof data !== 'object' || Array.isArray(data))
    return 'Please provide the form fields.';
  if (typeof data.email !== 'string' || data.email.length > 254 || !emailPattern.test(data.email))
    return 'Enter a valid email address.';
  if (data.consent !== true && data.consent !== 'true') return 'Please confirm the consent choice.';
  if (data.website) return 'The request could not be accepted.';
  if (kind === 'contact') {
    if (data.noticeVersion !== '2026-09-15') return 'Please refresh the page and review the current privacy agreement.';
    for (const [key, min, max] of [
      ['name', 1, 120],
      ['company', 1, 160],
      ['country', 1, 100],
      ['message', 20, 5000],
    ])
      if (typeof data[key] !== 'string' || data[key].trim().length < min || data[key].length > max)
        return `Check the ${key} field and try again.`;
    if (!services.has(data.service)) return 'Choose a capability from the list.';
  } else if (!topics.has(data.topic)) return 'Choose an available newsletter topic.';
  return null;
}
export async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('empty');
  let total = 0;
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > 16000) {
        await reader.cancel();
        throw new Error('large');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.length;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}
const digest = async (value) =>
  Array.from(
    new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))),
    (b) => b.toString(16).padStart(2, '0'),
  ).join('');
const token = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) =>
    b.toString(16).padStart(2, '0'),
  ).join('');
const ready = (env) =>
  env.MAIL_API_KEY && env.MAIL_FROM && env.TURNSTILE_SECRET && env.PUBLIC_TURNSTILE_SITE_KEY;
async function mail(env, to, subject, text, key, replyTo = env.MAIL_REPLY_TO) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.MAIL_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': key,
    },
    body: JSON.stringify({
      from: env.MAIL_FROM, to, subject, text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!r.ok) throw new Error('mail');
  const result = await r.json();
  if (typeof result.id !== 'string' || !result.id) throw new Error('mail');
  return result;
}
async function botCheck(env, data, request, kind) {
  if (
    typeof data['cf-turnstile-response'] !== 'string' ||
    data['cf-turnstile-response'].length > 2048
  )
    return false;
  const payload = { secret: env.TURNSTILE_SECRET, response: data['cf-turnstile-response'] };
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) payload.remoteip = ip;
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await r.json();
  return (
    result.success === true &&
    result.action === kind &&
    result.hostname === new URL(env.SITE_ORIGIN || 'https://softtask.co').hostname
  );
}
function resultPage(title, message, action, rawToken) {
  const form = action
    ? `<form method="post" action="${action}"><input type="hidden" name="token" value="${rawToken}"><button type="submit">${action.endsWith('confirm') ? 'Confirm subscription' : 'Unsubscribe'}</button></form>`
    : '';
  return new Response(
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>${title} | Soft Task</title><style>body{background:#f5f6ef;color:#14382d;font:18px/1.7 system-ui;padding:10vh 24px}main{max-width:650px;margin:auto}h1{font-size:44px;line-height:1.15}button{background:#14382d;color:white;padding:15px 24px;border:0;font:inherit;cursor:pointer}a{color:inherit}a:focus-visible,button:focus-visible{outline:3px solid #ed7040;outline-offset:5px}</style><main><a href="/">Soft Task</a><h1>${title}</h1><p>${message}</p>${form}<p><a href="/insights/">Explore perspectives</a></p></main></html>`,
    {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-store',
        'Referrer-Policy': 'no-referrer',
        'X-Frame-Options': 'DENY',
      },
    },
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '');
    const origin = env.SITE_ORIGIN || 'https://softtask.co';
    if (path === '/api/config')
      return json({
        active: !!(ready(env) && env.NOTIFY_TO),
        newsletterActive: !!(ready(env) && env.DB),
        siteKey: ready(env) ? env.PUBLIC_TURNSTILE_SITE_KEY : null,
      });
    if (!path.startsWith('/api/')) return env.ASSETS.fetch(request);
    if (['/api/confirm', '/api/unsubscribe'].includes(path)) {
      if (!env.DB)
        return resultPage(
          'Service not available yet.',
          'Please return after subscriptions have been activated.',
        );
      if (!['GET', 'POST'].includes(request.method))
        return json({ message: 'Method not allowed.' }, 405);
      let raw = url.searchParams.get('token');
      if (request.method === 'POST') {
        if (request.headers.get('Origin') !== origin)
          return json({ message: 'Invalid request origin.' }, 403);
        if (Number(request.headers.get('Content-Length') || 0) > 1000)
          return json({ message: 'Request too large.' }, 413);
        const body = await request.text();
        if (body.length > 1000) return json({ message: 'Request too large.' }, 413);
        raw = new URLSearchParams(body).get('token');
      }
      if (!raw || !/^[a-f0-9]{64}$/.test(raw))
        return resultPage('This link is not valid.', 'Please request a new subscription email.');
      const hash = await digest(raw);
      const column = path === '/api/confirm' ? 'confirm_hash' : 'unsubscribe_hash';
      try {
        const row = await env.DB.prepare(`SELECT * FROM subscribers WHERE ${column} = ?`)
          .bind(hash)
          .first();
        if (!row || (path === '/api/confirm' && row.confirm_expires < Date.now()))
          return resultPage(
            'This link has expired.',
            'Please return to the newsletter page and request another confirmation.',
          );
        if (request.method === 'GET')
          return resultPage(
            path === '/api/confirm' ? 'Confirm your subscription.' : 'Unsubscribe from updates.',
            path === '/api/confirm'
              ? 'Choose confirm to receive Soft Task updates with your selected preferences.'
              : 'Choose unsubscribe to stop Soft Task newsletter updates.',
            path,
            raw,
          );
        if (path === '/api/unsubscribe') {
          await env.DB.prepare('DELETE FROM subscribers WHERE unsubscribe_hash = ?')
            .bind(hash)
            .run();
          return resultPage(
            'You are unsubscribed.',
            'Your newsletter subscription has been removed.',
          );
        }
        const unsub = token();
        const confirmed = await env.DB.prepare(
          'UPDATE subscribers SET status = ?, topic = pending_topic, confirm_hash = NULL, unsubscribe_hash = ?, updated_at = ? WHERE confirm_hash = ?',
        )
          .bind('active', await digest(unsub), Date.now(), hash)
          .run();
        if (confirmed.meta?.changes !== 1) {
          return resultPage(
            'This link has already been used.',
            'Please return to the newsletter page if you want to update your preferences.',
          );
        }
        try {
          await mail(
            env,
            row.email,
            'Your Soft Task subscription',
            `Your subscription is confirmed. Selected topic: ${row.pending_topic}.\n\nUnsubscribe at any time: ${origin}/api/unsubscribe?token=${unsub}`,
            `welcome-${hash}`,
          );
        } catch {
          console.error('newsletter_welcome_failed');
        }
        return resultPage(
          'Your subscription is confirmed.',
          'You are subscribed to your selected topics. Keep this unsubscribe link if you need it.',
          '/api/unsubscribe',
          unsub,
        );
      } catch {
        return resultPage(
          'Please try again later.',
          'We could not complete the request. No successful change is being reported.',
        );
      }
    }
    if (!['/api/contact', '/api/subscribe'].includes(path))
      return json({ message: 'Endpoint not found.' }, 404);
    if (request.method !== 'POST')
      return json({ message: 'Use the website form to submit a request.' }, 405);
    if (request.headers.get('Origin') !== origin)
      return json({ message: 'Invalid request origin.' }, 403);
    if (!request.headers.get('Content-Type')?.includes('application/json'))
      return json({ message: 'Use the website form to submit a request.' }, 415);
    let data;
    try {
      data = await readBody(request);
    } catch {
      return json({ message: 'The request is invalid or too large.' }, 400);
    }
    const kind = path === '/api/contact' ? 'contact' : 'subscribe';
    const error = validate(data, kind);
    if (error) return json({ message: error }, 422);
    if (!ready(env) || (kind === 'contact' && !env.NOTIFY_TO) || (kind === 'subscribe' && !env.DB))
      return json(
        {
          message:
            'Online submissions are not active yet. Please return when the service is connected.',
        },
        503,
      );
    try {
      if (!(await botCheck(env, data, request, kind)))
        return json({ message: 'Please complete the spam-prevention check and try again.' }, 422);
      data.email = data.email.trim().toLowerCase();
      if (kind === 'contact') {
        const fingerprint = await digest(
          JSON.stringify([data.name, data.email, data.company, data.country, data.service, data.message, Math.floor(Date.now() / 300000)]),
        );
        await mail(
          env,
          env.NOTIFY_TO,
          `Soft Task website enquiry: ${data.service}`,
          `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nMarket: ${data.country}\nCapability: ${data.service}\n\n${data.message}\n\nAgreement recorded: ${new Date().toISOString()}\nNotice version: ${data.noticeVersion}\nVisitor agreed to website terms and use of submitted details to assess and contact them about this enquiry and related project discussions. Marketing subscription: not requested by this form.`,
          `contact-${fingerprint}`,
          data.email,
        );
        return json(
          {
            message:
              'Your enquiry has been accepted for email delivery. Thank you for sharing the context.',
          },
          202,
        );
      }
      const now = Date.now();
      const existing = await env.DB.prepare('SELECT updated_at FROM subscribers WHERE email = ?')
        .bind(data.email)
        .first();
      if (existing && existing.updated_at > now - 60000)
        return json(
          { message: 'Please wait a minute before requesting another confirmation.' },
          429,
        );
      const raw = token(),
        hash = await digest(raw);
      await env.DB.prepare(
        "INSERT INTO subscribers (email, status, topic, pending_topic, confirm_hash, confirm_expires, created_at, updated_at) VALUES (?, 'pending', ?, ?, ?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET pending_topic = excluded.pending_topic, confirm_hash = excluded.confirm_hash, confirm_expires = excluded.confirm_expires, updated_at = excluded.updated_at",
      )
        .bind(data.email, data.topic, data.topic, hash, now + 86400000, now, now)
        .run();
      await mail(
        env,
        data.email,
        'Confirm your Soft Task subscription',
        `Confirm your subscription and selected topic (${data.topic}):\n${origin}/api/confirm?token=${raw}\n\nThis link expires in 24 hours. If you did not request this, ignore this email.`,
        `confirm-${hash}`,
      );
      return json(
        {
          message:
            'Check your inbox for a confirmation link. Your subscription or preference change takes effect only after confirmation.',
        },
        202,
      );
    } catch {
      return json({ message: 'The request could not be completed. Please try again later.' }, 503);
    }
  },
  async scheduled(_event, env) {
    if (env.DB)
      await env.DB.prepare(
        "DELETE FROM subscribers WHERE status = 'pending' AND confirm_expires < ?",
      )
        .bind(Date.now() - 7 * 86400000)
        .run();
  },
};
