import { useState, useEffect, useMemo, useCallback } from "react";
import { 
  CURRENCIES, 
  CurrencyCode, 
  CurrencyConfig, 
  SUPPORTED_CURRENCY_LIST, 
  resolveCurrencyFromCountry, 
  resolveCurrencyFromClient 
} from "@/config/currencies";
import { SITE_CONFIG, PricingPlan } from "@/config/site";

const STORAGE_KEYS = {
  SELECTED_CURRENCY: "macmint_selected_currency",
  COUNTRY_CODE: "macmint_country_code",
};

export interface LocalizedPricing {
  free: PricingPlan;
  proLifetime: PricingPlan;
}

export function useCurrencyPricing() {
  // Initial state computed synchronously to prevent flash of wrong currency
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(() => {
    try {
      // 1. User manual override in localStorage
      const savedOverride = localStorage.getItem(STORAGE_KEYS.SELECTED_CURRENCY) as CurrencyCode | null;
      if (savedOverride && CURRENCIES[savedOverride]) {
        return savedOverride;
      }

      // 2. Previously cached country in localStorage
      const cachedCountry = localStorage.getItem(STORAGE_KEYS.COUNTRY_CODE);
      if (cachedCountry) {
        return resolveCurrencyFromCountry(cachedCountry).code;
      }

      // 3. Instant client timezone/locale detection
      return resolveCurrencyFromClient().code;
    } catch {
      return "USD";
    }
  });

  const [isManualOverride, setIsManualOverride] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEYS.SELECTED_CURRENCY));
    } catch {
      return false;
    }
  });

  const [detectedCountry, setDetectedCountry] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.COUNTRY_CODE) || "";
    } catch {
      return "";
    }
  });

  // Background check for geo-IP lookup (reuses or verifies api.country.is)
  useEffect(() => {
    let isMounted = true;

    async function checkGeo() {
      try {
        const cachedCountry = localStorage.getItem(STORAGE_KEYS.COUNTRY_CODE);
        if (cachedCountry) {
          if (isMounted) setDetectedCountry(cachedCountry);
          // If no manual override, ensure currency matches cached country
          const manual = localStorage.getItem(STORAGE_KEYS.SELECTED_CURRENCY);
          if (!manual && isMounted) {
            setCurrencyCode(resolveCurrencyFromCountry(cachedCountry).code);
          }
          return;
        }

        const res = await fetch("https://api.country.is", { mode: "cors" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.country && isMounted) {
            setDetectedCountry(data.country);
            localStorage.setItem(STORAGE_KEYS.COUNTRY_CODE, data.country);

            // If user hasn't set manual override, apply resolved currency
            const manual = localStorage.getItem(STORAGE_KEYS.SELECTED_CURRENCY);
            if (!manual) {
              setCurrencyCode(resolveCurrencyFromCountry(data.country).code);
            }
          }
        }
      } catch {
        // Silent fallback
      }
    }

    checkGeo();

    return () => {
      isMounted = false;
    };
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    if (!CURRENCIES[code]) return;
    setCurrencyCode(code);
    setIsManualOverride(true);
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_CURRENCY, code);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const resetToAuto = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_CURRENCY);
      setIsManualOverride(false);
      const country = localStorage.getItem(STORAGE_KEYS.COUNTRY_CODE);
      const resolved = country ? resolveCurrencyFromCountry(country) : resolveCurrencyFromClient();
      setCurrencyCode(resolved.code);
    } catch {
      setCurrencyCode("USD");
    }
  }, []);

  const currentCurrency = useMemo(() => CURRENCIES[currencyCode] || CURRENCIES.USD, [currencyCode]);

  const pricing = useMemo<LocalizedPricing>(() => {
    const base = SITE_CONFIG.pricing;

    return {
      free: {
        ...base.free,
        price: currentCurrency.free.price,
        cadence: currentCurrency.free.cadence,
      },
      proLifetime: {
        ...base.proLifetime,
        price: currentCurrency.lifetime.price,
        cadence: currentCurrency.lifetime.cadence,
      },
    };
  }, [currentCurrency]);

  return {
    currency: currentCurrency,
    currencyCode,
    allCurrencies: SUPPORTED_CURRENCY_LIST,
    setCurrency,
    resetToAuto,
    isManualOverride,
    detectedCountry,
    pricing,
  };
}
