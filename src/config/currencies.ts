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
  monthly: {
    price: string;
    originalPrice: string;
    cadence: string;
  };
  yearly: {
    price: string;               // Monthly equivalent shown on card, e.g. "₹166", "$2.08"
    originalPrice: string;       // Monthly original strikethrough, e.g. "₹333", "$4.16"
    cadence: string;             // e.g. "/ month (billed ₹1,999 annually)"
    billedAnnual: string;        // Total billed amount, e.g. "₹1,999", "$24.99"
    billedAnnualOriginal: string;// Total original annual, e.g. "₹3,999", "$49.99"
  };
  lifetime: {
    price: string;
    originalPrice: string;
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
    monthly: {
      price: "₹249",
      originalPrice: "₹499",
      cadence: "/ month (1 Mac)",
    },
    yearly: {
      price: "₹166",
      originalPrice: "₹333",
      cadence: "/ month (billed ₹1,999 annually)",
      billedAnnual: "₹1,999",
      billedAnnualOriginal: "₹3,999",
    },
    lifetime: {
      price: "₹3,999",
      originalPrice: "₹7,999",
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
    monthly: {
      price: "$2.99",
      originalPrice: "$5.99",
      cadence: "/ month (1 Mac)",
    },
    yearly: {
      price: "$2.08",
      originalPrice: "$4.16",
      cadence: "/ month (billed $24.99 annually)",
      billedAnnual: "$24.99",
      billedAnnualOriginal: "$49.99",
    },
    lifetime: {
      price: "$49.99",
      originalPrice: "$99.99",
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
    monthly: {
      price: "€2.79",
      originalPrice: "€5.49",
      cadence: "/ month (1 Mac)",
    },
    yearly: {
      price: "€1.92",
      originalPrice: "€3.84",
      cadence: "/ month (billed €22.99 annually)",
      billedAnnual: "€22.99",
      billedAnnualOriginal: "€45.99",
    },
    lifetime: {
      price: "€45.99",
      originalPrice: "€89.99",
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
    monthly: {
      price: "£2.49",
      originalPrice: "£4.99",
      cadence: "/ month (1 Mac)",
    },
    yearly: {
      price: "£1.66",
      originalPrice: "£3.33",
      cadence: "/ month (billed £19.99 annually)",
      billedAnnual: "£19.99",
      billedAnnualOriginal: "£39.99",
    },
    lifetime: {
      price: "£39.99",
      originalPrice: "£79.99",
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
    monthly: {
      price: "CA$3.99",
      originalPrice: "CA$7.99",
      cadence: "/ month (1 Mac)",
    },
    yearly: {
      price: "CA$2.75",
      originalPrice: "CA$5.50",
      cadence: "/ month (billed CA$32.99 annually)",
      billedAnnual: "CA$32.99",
      billedAnnualOriginal: "CA$65.99",
    },
    lifetime: {
      price: "CA$64.99",
      originalPrice: "CA$129.99",
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
    monthly: {
      price: "A$4.49",
      originalPrice: "A$8.99",
      cadence: "/ month (1 Mac)",
    },
    yearly: {
      price: "A$3.08",
      originalPrice: "A$6.16",
      cadence: "/ month (billed A$36.99 annually)",
      billedAnnual: "A$36.99",
      billedAnnualOriginal: "A$73.99",
    },
    lifetime: {
      price: "A$74.99",
      originalPrice: "A$149.99",
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
    monthly: {
      price: "¥450",
      originalPrice: "¥900",
      cadence: "/ month (1 Mac)",
    },
    yearly: {
      price: "¥316",
      originalPrice: "¥632",
      cadence: "/ month (billed ¥3,800 annually)",
      billedAnnual: "¥3,800",
      billedAnnualOriginal: "¥7,600",
    },
    lifetime: {
      price: "¥7,500",
      originalPrice: "¥15,000",
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
