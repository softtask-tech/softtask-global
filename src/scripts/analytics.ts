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
  loaded = production && typeof analyticsWindow.gtag === 'function';
  if (loaded) analyticsWindow.gtag?.('consent', 'update', {
    analytics_storage: allowed ? 'granted' : 'denied',
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  });
  if (!allowed) clearAnalyticsCookies();
}
export function trackLead(service: string) {
  if (allowed && loaded) analyticsWindow.gtag?.('event', 'generate_lead', { service, method: 'contact_form' });
}
document.addEventListener('click', (event) => {
  const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href^="mailto:"]');
  if (link && allowed && loaded) analyticsWindow.gtag?.('event', 'contact_email_click', { method: 'email' });
});
