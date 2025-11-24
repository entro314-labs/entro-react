// Provider
export { EntrolyticsProvider } from './context.js';
export type { EntrolyticsProviderProps, EntrolyticsConfig } from './context.js';

// Hooks
export { useEntrolytics } from './hooks/useEntrolytics.js';
export { useTrackEvent } from './hooks/useTrackEvent.js';
export { useTrackPageView } from './hooks/useTrackPageView.js';
export { useIdentify } from './hooks/useIdentify.js';

// Components
export { TrackClick } from './components/TrackClick.js';
export type { TrackClickProps } from './components/TrackClick.js';
export { OutboundLink } from './components/OutboundLink.js';
export type { OutboundLinkProps } from './components/OutboundLink.js';
