# @entro314labs/entro-react

React SDK for [Entrolytics](https://entrolytics.click) - First-party growth analytics for the edge.

> **Note:** For Next.js applications, use [@entro314labs/entro-nextjs](https://www.npmjs.com/package/@entro314labs/entro-nextjs) instead.

## Installation

```bash
npm install @entro314labs/entro-react
# or
pnpm add @entro314labs/entro-react
```

## Quick Start

```tsx
import { EntrolyticsProvider, useTrackEvent } from '@entro314labs/entro-react';

function App() {
  return (
    <EntrolyticsProvider websiteId="your-website-id">
      <YourApp />
    </EntrolyticsProvider>
  );
}

function CheckoutButton() {
  const trackEvent = useTrackEvent();

  return (
    <button onClick={() => trackEvent('checkout_start', { cart_value: 99.99 })}>
      Checkout
    </button>
  );
}
```

## API Reference

### EntrolyticsProvider

Wrap your app with the provider to enable analytics.

```tsx
<EntrolyticsProvider
  websiteId="your-website-id"
  host="https://entrolytics.click"  // Optional, for self-hosted
  autoTrack={true}                   // Auto-track page views (default: true)
  respectDnt={false}                 // Respect Do Not Track (default: false)
  domains={['example.com']}          // Cross-domain tracking (optional)
>
  <App />
</EntrolyticsProvider>
```

### Hooks

#### useTrackEvent

Track custom events.

```tsx
const trackEvent = useTrackEvent();

trackEvent('button_click', {
  variant: 'primary',
  location: 'hero'
});
```

#### useTrackPageView

Track page views in SPAs (use with react-router).

```tsx
import { useLocation } from 'react-router-dom';
import { useTrackPageView } from '@entro314labs/entro-react';

function PageTracker() {
  const location = useLocation();
  useTrackPageView(location.pathname);
  return null;
}
```

#### useIdentify

Identify users for logged-in tracking.

```tsx
const identify = useIdentify();

useEffect(() => {
  if (user) {
    identify(user.id, {
      email: user.email,
      plan: user.subscription
    });
  }
}, [user, identify]);
```

#### useEntrolytics

Access all Entrolytics functionality.

```tsx
const { track, identify, config, isLoaded } = useEntrolytics();
```

### Components

#### TrackClick

Wrapper component that tracks clicks on its child.

```tsx
import { TrackClick } from '@entro314labs/entro-react';

<TrackClick event="cta_click" data={{ variant: 'hero' }}>
  <button>Get Started</button>
</TrackClick>
```

#### OutboundLink

Link component that automatically tracks outbound clicks.

```tsx
import { OutboundLink } from '@entro314labs/entro-react';

<OutboundLink href="https://github.com/..." event="github_click">
  View on GitHub
</OutboundLink>
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  EntrolyticsConfig,
  EntrolyticsProviderProps,
  TrackClickProps,
  OutboundLinkProps
} from '@entro314labs/entro-react';
```

## Bundle Size

This package is tree-shakeable and optimized for minimal bundle size:

- Provider + useTrackEvent: ~1.2KB gzipped
- Full package: ~2KB gzipped

## License

MIT License - see [LICENSE](LICENSE) file for details.
