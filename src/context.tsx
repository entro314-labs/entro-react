import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';

const DEFAULT_HOST = 'https://entrolytics.click';
const SCRIPT_ID = 'entrolytics-script';

export interface EntrolyticsConfig {
  websiteId: string;
  host?: string;
  autoTrack?: boolean;
  respectDnt?: boolean;
  domains?: string[];
}

interface EntrolyticsInstance {
  track: (eventName: string, eventData?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
}

interface EntrolyticsContextValue {
  config: EntrolyticsConfig;
  isLoaded: boolean;
  track: (eventName: string, eventData?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
}

const EntrolyticsContext = createContext<EntrolyticsContextValue | null>(null);

declare global {
  interface Window {
    entrolytics?: EntrolyticsInstance;
  }
}

export interface EntrolyticsProviderProps {
  children: ReactNode;
  websiteId: string;
  host?: string;
  autoTrack?: boolean;
  respectDnt?: boolean;
  domains?: string[];
}

export function EntrolyticsProvider({
  children,
  websiteId,
  host = DEFAULT_HOST,
  autoTrack = true,
  respectDnt = false,
  domains,
}: EntrolyticsProviderProps) {
  const isLoadedRef = useRef(false);

  // Inject tracking script
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById(SCRIPT_ID)) {
      isLoadedRef.current = true;
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `${host.replace(/\/$/, '')}/script.js`;
    script.defer = true;
    script.dataset.websiteId = websiteId;

    if (!autoTrack) {
      script.dataset.autoTrack = 'false';
    }
    if (respectDnt) {
      script.dataset.doNotTrack = 'true';
    }
    if (domains && domains.length > 0) {
      script.dataset.domains = domains.join(',');
    }

    script.onload = () => {
      isLoadedRef.current = true;
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [websiteId, host, autoTrack, respectDnt, domains]);

  const track = (eventName: string, eventData?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;

    const tryTrack = () => {
      if (window.entrolytics) {
        window.entrolytics.track(eventName, eventData);
      } else {
        setTimeout(tryTrack, 100);
      }
    };

    tryTrack();
  };

  const identify = (userId: string, traits?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;

    const tryIdentify = () => {
      if (window.entrolytics) {
        window.entrolytics.identify(userId, traits);
      } else {
        setTimeout(tryIdentify, 100);
      }
    };

    tryIdentify();
  };

  const value = useMemo<EntrolyticsContextValue>(
    () => ({
      config: { websiteId, host, autoTrack, respectDnt, domains },
      isLoaded: isLoadedRef.current,
      track,
      identify,
    }),
    [websiteId, host, autoTrack, respectDnt, domains]
  );

  return (
    <EntrolyticsContext.Provider value={value}>
      {children}
    </EntrolyticsContext.Provider>
  );
}

export function useEntrolyticsContext() {
  const context = useContext(EntrolyticsContext);
  if (!context) {
    throw new Error('useEntrolyticsContext must be used within EntrolyticsProvider');
  }
  return context;
}
