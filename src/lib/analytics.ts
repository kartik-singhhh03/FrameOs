// Central Analytics Event System
// Uses GA4 gtag under the hood — safe for SSR and non-production envs.

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a custom GA4 event.
 * Safe to call anywhere — no crash if GA not loaded or on server.
 */
export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", name, {
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...params,
  });
}

/**
 * Manually send a page_view event (used on route change).
 */
export function trackPageView(url: string): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID as string, {
    page_path: url,
  });
}
