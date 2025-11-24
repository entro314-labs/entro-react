import { useCallback } from 'react';
import { useEntrolyticsContext } from '../context.js';

/**
 * Hook for tracking custom events
 *
 * @example
 * ```tsx
 * function CheckoutButton() {
 *   const trackEvent = useTrackEvent();
 *
 *   const handlePurchase = () => {
 *     trackEvent('purchase', { revenue: 99.99, currency: 'USD' });
 *   };
 *
 *   return <button onClick={handlePurchase}>Buy Now</button>;
 * }
 * ```
 */
export function useTrackEvent() {
  const { track } = useEntrolyticsContext();

  return useCallback(
    (eventName: string, eventData?: Record<string, unknown>) => {
      track(eventName, eventData);
    },
    [track]
  );
}
