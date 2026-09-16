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

import { countryCodeToFlag, getCountryFlag } from "../../utils/countryFlags";
export { countryCodeToFlag, getCountryFlag };

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
