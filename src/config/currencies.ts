export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  countryLabel: string;
  free: {
    price: string;
    cadence: string;
  };
  lifetime: {
    price: string;
    cadence: string;
  };
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    flag: "🇮🇳",
    countryLabel: "India",
    free: {
      price: "₹0",
      cadence: "no credit card required",
    },
    lifetime: {
      price: "₹249",
      cadence: "one-time payment (5 Macs)",
    },
  },

  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    flag: "🇺🇸",
    countryLabel: "United States",
    free: {
      price: "$0",
      cadence: "no credit card required",
    },
    lifetime: {
      price: "$3",
      cadence: "one-time payment (5 Macs)",
    },
  },

  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    flag: "🇪🇺",
    countryLabel: "Eurozone",
    free: {
      price: "€0",
      cadence: "no credit card required",
    },
    lifetime: {
      price: "€2.79",
      cadence: "one-time payment (5 Macs)",
    },
  },

  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    flag: "🇬🇧",
    countryLabel: "United Kingdom",
    free: {
      price: "£0",
      cadence: "no credit card required",
    },
    lifetime: {
      price: "£2.39",
      cadence: "one-time payment (5 Macs)",
    },
  },

  CAD: {
    code: "CAD",
    symbol: "CA$",
    name: "Canadian Dollar",
    flag: "🇨🇦",
    countryLabel: "Canada",
    free: {
      price: "CA$0",
      cadence: "no credit card required",
    },
    lifetime: {
      price: "CA$3.99",
      cadence: "one-time payment (5 Macs)",
    },
  },

  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    flag: "🇦🇺",
    countryLabel: "Australia",
    free: {
      price: "A$0",
      cadence: "no credit card required",
    },
    lifetime: {
      price: "A$4.49",
      cadence: "one-time payment (5 Macs)",
    },
  },

  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    flag: "🇯🇵",
    countryLabel: "Japan",
    free: {
      price: "¥0",
      cadence: "no credit card required",
    },
    lifetime: {
      price: "¥449",
      cadence: "one-time payment (5 Macs)",
    },
  },
};

export const SUPPORTED_CURRENCY_LIST: CurrencyConfig[] = [
  CURRENCIES.INR,
  CURRENCIES.USD,
  CURRENCIES.EUR,
  CURRENCIES.GBP,
  CURRENCIES.CAD,
  CURRENCIES.AUD,
  CURRENCIES.JPY,
];

// Eurozone member states using EUR
const EUROZONE_COUNTRIES = new Set([
  "AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES", "HR"
]);

/**
 * Resolves the appropriate CurrencyConfig based on a 2-letter ISO country code.
 */
export function resolveCurrencyFromCountry(countryCode?: string): CurrencyConfig {
  if (!countryCode) return CURRENCIES.USD;
  const upper = countryCode.trim().toUpperCase();

  if (upper === "IN") return CURRENCIES.INR;
  if (upper === "US" || upper === "PR" || upper === "GU" || upper === "VI" || upper === "AS") return CURRENCIES.USD;
  if (upper === "GB") return CURRENCIES.GBP;
  if (upper === "CA") return CURRENCIES.CAD;
  if (upper === "AU" || upper === "NZ") return CURRENCIES.AUD;
  if (upper === "JP") return CURRENCIES.JPY;
  if (EUROZONE_COUNTRIES.has(upper)) return CURRENCIES.EUR;

  return CURRENCIES.USD;
}

/**
 * Synchronous client-side fallback based on device timezone and locale.
 */
export function resolveCurrencyFromClient(): CurrencyConfig {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("Delhi") || tz.includes("India")) {
      return CURRENCIES.INR;
    }
    if (tz.includes("London") || tz.includes("Belfast")) {
      return CURRENCIES.GBP;
    }
    if (tz.includes("Tokyo")) {
      return CURRENCIES.JPY;
    }
    if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal") || tz.includes("Edmonton")) {
      return CURRENCIES.CAD;
    }
    if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane") || tz.includes("Perth") || tz.includes("Auckland")) {
      return CURRENCIES.AUD;
    }
    if (tz.startsWith("Europe/")) {
      return CURRENCIES.EUR;
    }

    // Check navigator.languages
    if (typeof navigator !== "undefined" && navigator.languages) {
      for (const lang of navigator.languages) {
        if (lang.endsWith("-IN") || lang === "hi" || lang.startsWith("hi-")) return CURRENCIES.INR;
        if (lang.endsWith("-GB")) return CURRENCIES.GBP;
        if (lang.endsWith("-CA")) return CURRENCIES.CAD;
        if (lang.endsWith("-AU")) return CURRENCIES.AUD;
        if (lang.endsWith("-JP") || lang.startsWith("ja")) return CURRENCIES.JPY;
      }
    }
  } catch {
    // Fallback to USD
  }
  return CURRENCIES.USD;
}
