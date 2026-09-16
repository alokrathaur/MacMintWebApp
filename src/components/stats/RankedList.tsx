import React from "react";

export interface RankedItem {
  label: string;
  count: number;
  code?: string;
}

interface RankedListProps {
  title: string;
  items: RankedItem[];
  formatValue?: (n: number) => string;
}

const COUNTRY_NAME_TO_CODE: Record<string, string> = {
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

// Map 2-letter ISO country code to flag emoji
export function countryCodeToFlag(code?: string): string {
  if (!code || code.length !== 2) return "";
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

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

export const RankedList: React.FC<RankedListProps> = ({
  title,
  items,
  formatValue,
}) => {
  const max = Math.max(1, ...items.map((i) => i.count));
  const total = items.reduce((s, i) => s + i.count, 0);

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </h3>
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
          {items.length} items
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400 py-4 text-center">No data recorded yet.</p>
      ) : (
        <ul className="space-y-1.5">
          {items.slice(0, 8).map((item) => {
            const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
            const barWidth = Math.max(3, (item.count / max) * 100);
            const isCountryList = title.toLowerCase().includes("countr");
            const flag = isCountryList ? getCountryFlag(item.code, item.label) : (item.code ? countryCodeToFlag(item.code) : "");

            return (
              <li key={item.label} className="relative group">
                {/* Proportional background fill bar */}
                <div
                  className="absolute inset-y-0 left-0 rounded-lg bg-mint-500/10 dark:bg-mint-500/20 group-hover:bg-mint-500/20 dark:group-hover:bg-mint-500/30 transition-all duration-200"
                  style={{ width: `${barWidth}%` }}
                />

                {/* Content */}
                <div className="relative flex items-center justify-between px-3 py-1.5 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 truncate min-w-0 pr-2">
                    {flag && <span className="shrink-0 text-base leading-none">{flag}</span>}
                    <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
                    <span>{formatValue ? formatValue(item.count) : item.count.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 w-8 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
