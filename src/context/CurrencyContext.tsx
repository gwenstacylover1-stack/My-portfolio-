import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type CurrencyCode = 'INR' | 'USD';

const SESSION_CACHE_KEY = 'starak_auto_currency_v1';

interface InitialDetection {
  currency: CurrencyCode;
  hasUrlOverride: boolean;
  hasSessionCache: boolean;
}

function readUrlCurrencyOverride(): CurrencyCode | null {
  try {
    const param = new URLSearchParams(window.location.search)
      .get('currency')
      ?.toLowerCase();
    if (param === 'inr') return 'INR';
    if (param === 'usd') return 'USD';
  } catch {
    // Ignore URL parsing issues
  }
  return null;
}

function readSessionCachedCurrency(): CurrencyCode | null {
  try {
    const cached = window.sessionStorage.getItem(SESSION_CACHE_KEY);
    if (cached === 'INR' || cached === 'USD') {
      return cached;
    }
  } catch {
    // Ignore storage access restrictions
  }
  return null;
}

function detectTimezoneOrLocaleCurrency(): CurrencyCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') {
      return 'INR';
    }
  } catch {
    // Fall back to navigator.language
  }

  try {
    const primaryLocale = (
      navigator.language ||
      navigator.languages?.[0] ||
      ''
    ).toUpperCase();
    if (primaryLocale.endsWith('-IN') || primaryLocale === 'IN') {
      return 'INR';
    }
  } catch {
    // Default to international USD
  }

  return 'USD';
}

function detectInitialCurrency(): InitialDetection {
  const urlOverride = readUrlCurrencyOverride();
  if (urlOverride) {
    return {
      currency: urlOverride,
      hasUrlOverride: true,
      hasSessionCache: false,
    };
  }

  const cached = readSessionCachedCurrency();
  if (cached) {
    return {
      currency: cached,
      hasUrlOverride: false,
      hasSessionCache: true,
    };
  }

  return {
    currency: detectTimezoneOrLocaleCurrency(),
    hasUrlOverride: false,
    hasSessionCache: false,
  };
}

export function formatCurrencyAmount(
  amount: number,
  currency: CurrencyCode,
): string {
  const rounded = Math.round(amount);
  if (currency === 'INR') {
    return `₹${rounded.toLocaleString('en-IN')}`;
  }
  return `$${rounded.toLocaleString('en-US')}`;
}

export function formatCurrencyRange(
  min: number,
  max: number,
  currency: CurrencyCode,
  plusSuffix = false,
): string {
  const suffix = plusSuffix ? '+' : '';
  return `${formatCurrencyAmount(min, currency)} – ${formatCurrencyAmount(max, currency)}${suffix}`;
}

interface CurrencyContextValue {
  currency: CurrencyCode;
  formatMoney: (amount: number) => string;
  formatRange: (min: number, max: number, plusSuffix?: boolean) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [initial] = useState<InitialDetection>(detectInitialCurrency);
  const [currency, setCurrency] = useState<CurrencyCode>(initial.currency);

  // Silent once-per-session IP verification for VPN/traveler accuracy (2.5s timeout, zero errors)
  useEffect(() => {
    if (initial.hasUrlOverride || initial.hasSessionCache) {
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 2500);

    const verifyByIp = async () => {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/country.json', {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) return;
        const data = (await response.json()) as { country?: unknown };
        if (
          typeof data?.country === 'string' &&
          /^[A-Za-z]{2}$/.test(data.country.trim())
        ) {
          const detected: CurrencyCode =
            data.country.trim().toUpperCase() === 'IN' ? 'INR' : 'USD';
          try {
            window.sessionStorage.setItem(SESSION_CACHE_KEY, detected);
          } catch {
            // Ignore storage errors
          }
          if (!cancelled) {
            setCurrency(detected);
          }
        }
      } catch {
        // Silently retain instant timezone/locale detection on network error or timeout
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    void verifyByIp();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [initial.hasUrlOverride, initial.hasSessionCache]);

  const formatMoney = useCallback(
    (amount: number) => formatCurrencyAmount(amount, currency),
    [currency],
  );

  const formatRange = useCallback(
    (min: number, max: number, plusSuffix = false) =>
      formatCurrencyRange(min, max, currency, plusSuffix),
    [currency],
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      formatMoney,
      formatRange,
    }),
    [currency, formatMoney, formatRange],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used inside a CurrencyProvider');
  }
  return ctx;
}
