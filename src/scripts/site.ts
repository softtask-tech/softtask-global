import { animate } from 'motion/mini';
import './catalogue';

document.querySelectorAll<HTMLElement>('[data-presence]').forEach((root) => {
  root.querySelectorAll<HTMLButtonElement>('[data-presence-target]').forEach((button) => {
    button.addEventListener('click', () => {
      root.querySelectorAll<HTMLButtonElement>('[data-presence-target]').forEach((item) => {
        const selected = item === button;
        item.setAttribute('aria-pressed', String(selected));
        item.classList.toggle('is-selected', selected);
      });
      root
        .querySelectorAll<HTMLElement>('[data-presence-panel]')
        .forEach(
          (panel) => (panel.hidden = panel.dataset.presencePanel !== button.dataset.presenceTarget),
        );
    });
  });
});
document.querySelectorAll<HTMLElement>('[data-workflow]').forEach((root) => {
  root.querySelectorAll<HTMLButtonElement>('[data-flow-step]').forEach((button) => {
    button.addEventListener('click', () => {
      root
        .querySelectorAll<HTMLButtonElement>('[data-flow-step]')
        .forEach((item) => item.setAttribute('aria-expanded', String(item === button)));
      root
        .querySelectorAll<HTMLElement>('[data-flow-detail]')
        .forEach((panel) => (panel.hidden = panel.dataset.flowDetail !== button.dataset.flowStep));
    });
  });
});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('drawing');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 },
  );
  document.querySelectorAll('[data-draw]').forEach((element) => observer.observe(element));
}
const marketField = document.querySelector<HTMLSelectElement>('select[name=country]');
const selectedMarket = new URLSearchParams(location.search).get('country');
if (
  marketField &&
  selectedMarket &&
  Array.from(marketField.options).some((option) => option.value === selectedMarket)
)
  marketField.value = selectedMarket;

const q = <T extends HTMLElement>(s: string) => document.querySelector<T>(s);
const nav = q<HTMLElement>('#main-nav');
const menu = q<HTMLButtonElement>('.mobile-toggle');
function closeMenu() {
  nav?.classList.remove('is-open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Open navigation');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  nav?.classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openDialog = document.querySelector<HTMLDialogElement>('dialog[open]');
    if (openDialog) {
      e.preventDefault();
      openDialog.close();
    }
    document.querySelectorAll<HTMLDetailsElement>('.mega[open]').forEach((d) => (d.open = false));
    if (nav?.classList.contains('is-open')) {
      closeMenu();
      menu?.focus();
    }
  }
});
document.addEventListener('click', (e) => {
  if (!(e.target instanceof Element)) return;
  if (!e.target.closest('.mega'))
    document.querySelectorAll<HTMLDetailsElement>('.mega[open]').forEach((d) => (d.open = false));
});
document.querySelectorAll<HTMLDialogElement>('dialog').forEach((d) => {
  d.querySelector('.dialog-close')?.addEventListener('click', () => d.close());
  d.addEventListener('click', (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
        d.close();
    }
  });
});

const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[role=tab]'));
const compactTabs = matchMedia('(max-width: 620px)');
function updateTabOrientation() {
  q('[role=tablist]')?.setAttribute(
    'aria-orientation',
    compactTabs.matches ? 'horizontal' : 'vertical',
  );
}
updateTabOrientation();
compactTabs.addEventListener('change', updateTabOrientation);
function activateTab(index: number, focus = false) {
  tabs.forEach((t, i) => {
    t.setAttribute('aria-selected', String(i === index));
    t.tabIndex = i === index ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls') || '');
    if (panel) panel.hidden = i !== index;
  });
  if (focus) {
    tabs[index].focus({ preventScroll: true });
    if (compactTabs.matches)
      tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => activateTab(i));
  t.addEventListener('keydown', (e) => {
    let next = i;
    if (['ArrowDown', 'ArrowRight'].includes(e.key)) next = (i + 1) % tabs.length;
    else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    activateTab(next, true);
  });
});

type Consent = { version: number; analytics: boolean; marketing: boolean; expires: number };
const consentKey = 'softtask-consent-v1';
let current: Consent | null = null;
try {
  const saved = JSON.parse(localStorage.getItem(consentKey) || 'null');
  if (
    saved?.version === 1 &&
    saved.expires > Date.now() &&
    typeof saved.analytics === 'boolean' &&
    typeof saved.marketing === 'boolean'
  )
    current = saved;
} catch {}
const banner = q<HTMLElement>('.cookie-banner');
const cookieDialog = q<HTMLDialogElement>('#cookie-dialog');
if (banner) banner.hidden = !!current;
function saveConsent(analytics: boolean, marketing: boolean) {
  current = { version: 1, analytics, marketing, expires: Date.now() + 180 * 86400000 };
  try {
    localStorage.setItem(consentKey, JSON.stringify(current));
  } catch {}
  if (banner) banner.hidden = true;
  document.dispatchEvent(new CustomEvent('softtask:consent', { detail: current }));
  cookieDialog?.close();
}
document
  .querySelectorAll<HTMLElement>('[data-consent]')
  .forEach((b) =>
    b.addEventListener('click', () =>
      saveConsent(b.dataset.consent === 'accept', b.dataset.consent === 'accept'),
    ),
  );
document.querySelectorAll('.cookie-open').forEach((b) =>
  b.addEventListener('click', () => {
    const a = q<HTMLInputElement>('#analytics-choice'),
      m = q<HTMLInputElement>('#marketing-choice');
    if (a) a.checked = current?.analytics ?? false;
    if (m) m.checked = current?.marketing ?? false;
    cookieDialog?.showModal();
  }),
);
q('#save-cookies')?.addEventListener('click', () =>
  saveConsent(
    q<HTMLInputElement>('#analytics-choice')?.checked ?? false,
    q<HTMLInputElement>('#marketing-choice')?.checked ?? false,
  ),
);

type SearchItem = { title: string; description: string; url: string };
const items: SearchItem[] = JSON.parse(q('#search-data')?.textContent || '[]');
const searchDialog = q<HTMLDialogElement>('#search-dialog');
const search = q<HTMLInputElement>('#site-search');
function renderSearch() {
  const term = search?.value.trim().toLowerCase() || '';
  const matches = items.filter((i) => (i.title + ' ' + i.description).toLowerCase().includes(term));
  const target = q('#search-results');
  if (!target) return;
  target.replaceChildren();
  matches.slice(0, 8).forEach((i) => {
    const a = document.createElement('a');
    a.href = i.url;
    const title = document.createElement('strong');
    title.textContent = i.title;
    const desc = document.createElement('span');
    desc.textContent = i.description;
    a.append(title, desc);
    target.append(a);
  });
  const count = q('#search-count');
  if (count)
    count.textContent = matches.length
      ? `${Math.min(matches.length, 8)} ${term ? 'matching results' : 'suggested pages'}`
      : 'No matches. Try a broader term, such as cloud or data.';
}
document.querySelectorAll('.search-open').forEach((b) =>
  b.addEventListener('click', () => {
    renderSearch();
    searchDialog?.showModal();
    search?.focus();
  }),
);
search?.addEventListener('input', renderSearch);

document.querySelectorAll<HTMLFormElement>('form[data-endpoint]').forEach((form) => {
  const service = form.querySelector<HTMLSelectElement>('[name=service]');
  const requested = new URLSearchParams(location.search).get('service');
  if (service && requested && Array.from(service.options).some((o) => o.value === requested))
    service.value = requested;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector<HTMLElement>('.form-status');
    const button = form.querySelector<HTMLButtonElement>('[type=submit]');
    if (!status || !button) return;
    status.hidden = false;
    status.dataset.error = 'false';
    status.textContent = 'Sending your request…';
    button.disabled = true;
    const data = Object.fromEntries(new FormData(form));
    data.consent = String(new FormData(form).get('consent') === 'on');
    try {
      const response = await fetch(form.dataset.endpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.message || 'Your request could not be sent. Please try again later.',
        );
      status.textContent = result.message;
      form.reset();
    } catch (error) {
      status.dataset.error = 'true';
      status.textContent =
        error instanceof Error && error.message && !error.message.includes('JSON')
          ? error.message
          : 'Online submissions are not available yet. Please return when this service is connected.';
    } finally {
      button.disabled = false;
      status.focus();
      const widget = form.querySelector<HTMLElement>('.turnstile-mount');
      if (widget?.dataset.widgetId) {
        const api = (window as unknown as { turnstile?: { reset: (id: string) => void } })
          .turnstile;
        api?.reset(widget.dataset.widgetId);
      }
    }
  });
});

const hero = q<HTMLElement>('.hero-photo');
if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  animate(
    hero,
    { clipPath: ['inset(0 0 0 7%)', 'inset(0 0 0 0%)'] },
    { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  );
}

// Load anti-abuse controls only on requested form pages and only when configured.
if (document.querySelector('.turnstile-mount')) {
  fetch('/api/config')
    .then((r) => (r.ok ? r.json() : null))
    .then((config) => {
      if (!config?.siteKey) return;
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => {
        const api = (
          window as unknown as { turnstile: { render: (el: Element, options: object) => string } }
        ).turnstile;
        document.querySelectorAll<HTMLElement>('.turnstile-mount').forEach((el) => {
          const enabled = el.dataset.action === 'contact' ? config.active : config.newsletterActive;
          if (!enabled) return;
          el.dataset.widgetId = api.render(el, {
            sitekey: config.siteKey,
            action: el.dataset.action,
            theme: 'light',
          });
          const note = el.closest('form')?.querySelector('.form-note');
          if (note) note.textContent = 'Your request is processed only when you submit this form.';
        });
      };
      document.head.append(script);
    })
    .catch(() => {});
}
