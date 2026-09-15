const measurementId = 'G-REH51537N8';
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: `ga-disable-${string}`]: boolean };
const analyticsWindow = window as unknown as AnalyticsWindow;
let allowed = false;
let loaded = false;
const production = ['softtask.co', 'www.softtask.co'].includes(location.hostname);
function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of ['', location.hostname, '.softtask.co']) document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ''} SameSite=Lax; Secure`;
  }
}
export function setAnalyticsConsent(granted: boolean) {
  allowed = granted && production;
  analyticsWindow[`ga-disable-${measurementId}`] = !allowed;
  if (!allowed) {
    if (loaded) analyticsWindow.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    clearAnalyticsCookies();
    return;
  }
  if (loaded) { analyticsWindow.gtag?.('consent', 'update', { analytics_storage: 'granted' }); return; }
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = function () { analyticsWindow.dataLayer!.push(arguments); };
  const gtag = analyticsWindow.gtag;
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('consent', 'update', { analytics_storage: 'granted' });
  gtag('js', new Date());
  let referrer = '';
  try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch {}
  gtag('config', measurementId, {
    send_page_view: false,
    page_location: `${location.origin}${location.pathname}`,
    page_referrer: referrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 15552000,
  });
  gtag('event', 'page_view', { page_title: document.title, page_location: `${location.origin}${location.pathname}`, page_referrer: referrer });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.id = 'softtask-google-analytics';
  document.head.append(script);
  loaded = true;
}
export function trackLead(service: string) {
  if (allowed && loaded) analyticsWindow.gtag?.('event', 'generate_lead', { service, method: 'contact_form' });
}
document.addEventListener('click', (event) => {
  const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href^="mailto:"]');
  if (link && allowed && loaded) analyticsWindow.gtag?.('event', 'contact_email_click', { method: 'email' });
});
