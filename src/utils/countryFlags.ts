/**
 * Country flag utilities and canonical mapping for international telemetry
 */

export const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  "united states": "US",
  "usa": "US",
  "u.s.": "US",
  "u.s.a.": "US",
  "india": "IN",
  "united kingdom": "GB",
  "uk": "GB",
  "great britain": "GB",
  "germany": "DE",
  "deutschland": "DE",
  "canada": "CA",
  "france": "FR",
  "japan": "JP",
  "australia": "AU",
  "brazil": "BR",
  "brasil": "BR",
  "singapore": "SG",
  "netherlands": "NL",
  "sweden": "SE",
  "switzerland": "CH",
  "south korea": "KR",
  "korea": "KR",
  "italy": "IT",
  "italia": "IT",
  "spain": "ES",
  "españa": "ES",
  "russia": "RU",
  "china": "CN",
  "taiwan": "TW",
  "hong kong": "HK",
  "mexico": "MX",
  "poland": "PL",
  "ukraine": "UA",
  "indonesia": "ID",
  "vietnam": "VN",
  "turkey": "TR",
  "türkiye": "TR",
  "israel": "IL",
  "united arab emirates": "AE",
  "uae": "AE",
  "saudi arabia": "SA",
  "ireland": "IE",
  "new zealand": "NZ",
  "norway": "NO",
  "denmark": "DK",
  "finland": "FI",
  "austria": "AT",
  "belgium": "BE",
  "portugal": "PT",
  "czech republic": "CZ",
  "czechia": "CZ",
  "greece": "GR",
  "romania": "RO",
  "hungary": "HU",
  "philippines": "PH",
  "malaysia": "MY",
  "thailand": "TH",
  "argentina": "AR",
  "chile": "CL",
  "colombia": "CO",
  "south africa": "ZA",
  "egypt": "EG",
  "nigeria": "NG",
  "kenya": "KE",
  "pakistan": "PK",
  "bangladesh": "BD",
};

/**
 * Maps a 2-letter ISO country code to a Unicode regional indicator flag emoji
 */
export function countryCodeToFlag(code?: string): string {
  if (!code || code.length !== 2) return "";
  const upper = code.toUpperCase();
  // Validate ASCII characters A-Z
  if (upper.charCodeAt(0) < 65 || upper.charCodeAt(0) > 90 || upper.charCodeAt(1) < 65 || upper.charCodeAt(1) > 90) {
    return "";
  }
  const codePoints = upper
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Robust country flag resolver with name-first normalization
 */
export function getCountryFlag(code?: string, label?: string): string {
  // 1. If label matches a known country name, prioritize it to ensure the flag matches the label
  if (label) {
    const normalized = label.trim().toLowerCase();
    if (COUNTRY_NAME_TO_CODE[normalized]) {
      return countryCodeToFlag(COUNTRY_NAME_TO_CODE[normalized]);
    }
  }

  // 2. Otherwise fallback to code
  if (code && code.length === 2) {
    return countryCodeToFlag(code);
  }

  return "";
}
