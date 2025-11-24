import { useEffect, useRef } from 'react';
import { useEntrolyticsContext } from '../context.js';

/**
 * Hook for tracking page views in SPAs
 *
 * Use this with react-router or similar routers to track page changes
 *
 * @example
 * ```tsx
 * function PageTracker() {
 *   const location = useLocation();
 *   useTrackPageView(location.pathname);
 *   return null;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With additional data
 * function PageTracker() {
 *   const location = useLocation();
 *   useTrackPageView(location.pathname, {
 *     title: document.title,
 *     referrer: document.referrer
 *   });
 *   return null;
 * }
 * ```
 */
export function useTrackPageView(
  url: string,
  data?: Record<string, unknown>
) {
  const { track } = useEntrolyticsContext();
  const prevUrlRef = useRef<string>();

  useEffect(() => {
    // Only track if URL changed
    if (prevUrlRef.current === url) return;
    prevUrlRef.current = url;

    track('pageview', {
      url,
      ...data,
    });
  }, [url, data, track]);
}
