import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CONSENT_STORAGE_KEY = 'neurodigital-website-cookie-consent';
const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const GOOGLE_ANALYTICS_ID = 'G-GSXRNMBYNX';

function clearAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name));
  const names = new Set([...cookieNames, '_ga', '_ga_GSXRNMBYNX', '_gid', '_gat', '_gat_GSXRNMBYNX']);
  const domains = [undefined, window.location.hostname, '.neurodigitalsupport.com'];

  names.forEach((name) => {
    domains.forEach((domain) => {
      const domainAttribute = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; max-age=0; path=/${domainAttribute}`;
    });
  });
}

function readConsent() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || 'null');
    if (
      typeof stored?.analytics === 'boolean' &&
      typeof stored?.updatedAt === 'number' &&
      Date.now() - stored.updatedAt < CONSENT_MAX_AGE
    ) {
      return stored;
    }
  } catch (error) {
    console.error('Unable to read website cookie preferences.', error);
  }
  return null;
}

const CookieConsent = () => {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const analyticsLoaded = useRef(false);

  useEffect(() => {
    const savedConsent = readConsent();
    setConsent(savedConsent);
    setIsOpen(!savedConsent);
    if (!savedConsent?.analytics) clearAnalyticsCookies();

    const openSettings = () => setIsOpen(true);
    window.addEventListener('open-cookie-settings', openSettings);
    return () => window.removeEventListener('open-cookie-settings', openSettings);
  }, []);

  useEffect(() => {
    if (!consent) return;

    if (!consent.analytics) {
      window[`ga-disable-${GOOGLE_ANALYTICS_ID}`] = true;
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
      clearAnalyticsCookies();
      return;
    }

    window[`ga-disable-${GOOGLE_ANALYTICS_ID}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    const shouldLoadAnalytics = !analyticsLoaded.current;
    if (shouldLoadAnalytics) {
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    if (shouldLoadAnalytics) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
      script.onerror = () => {
        console.error('Google Analytics could not be loaded after consent.');
        analyticsLoaded.current = false;
      };
      analyticsLoaded.current = true;
      document.head.appendChild(script);
      window.gtag('js', new Date());
      window.gtag('config', GOOGLE_ANALYTICS_ID, {
        anonymize_ip: true,
        send_page_view: false
      });
    }

    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href
    });
  }, [consent, pathname]);

  const saveConsent = (analytics) => {
    const nextConsent = { analytics, updatedAt: Date.now() };
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextConsent));
    } catch (error) {
      console.error('Unable to save website cookie preferences.', error);
    }
    setConsent(nextConsent);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-emerald-200 bg-white/95 p-4 shadow-[0_-12px_40px_rgba(15,61,50,0.16)] backdrop-blur dark:border-border dark:bg-card/95 sm:p-6"
      role="region"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 id="cookie-consent-title" className="text-base font-extrabold text-slate-950 dark:text-white">
            Your cookie choices
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-muted-foreground">
            Necessary browser storage remembers your choice. With your permission, Google Analytics measures visits to improve this website. Analytics stays off unless you accept, and you can change your choice at any time in Cookie settings.{' '}
            <Link to="/nurotok/cookies" className="font-bold text-emerald-800 underline underline-offset-2 dark:text-emerald-300">
              Cookie details
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {consent ? (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 focus-visible-ring dark:border-border dark:text-foreground dark:hover:bg-white/5"
            >
              Close
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => saveConsent(false)}
            className="rounded-xl border border-emerald-800 px-4 py-2.5 text-sm font-bold text-emerald-900 transition-colors hover:bg-emerald-50 focus-visible-ring dark:border-emerald-300 dark:text-emerald-200 dark:hover:bg-emerald-400/10"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => saveConsent(true)}
            className="rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-900 focus-visible-ring"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieConsent;
