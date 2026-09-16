import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Globe, RotateCcw } from "lucide-react";
import { CurrencyCode, CurrencyConfig } from "@/config/currencies";

interface CurrencySelectorProps {
  currentCurrency: CurrencyConfig;
  allCurrencies: CurrencyConfig[];
  onSelectCurrency: (code: CurrencyCode) => void;
  onResetAuto?: () => void;
  isManualOverride?: boolean;
  detectedCountry?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currentCurrency,
  allCurrencies,
  onSelectCurrency,
  onResetAuto,
  isManualOverride = false,
  detectedCountry,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-surface-darkSurface hover:bg-slate-50 dark:hover:bg-surface-darkCard border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-sm transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-mint-500/20"
          aria-haspopup="true"
          aria-expanded={isOpen}
          title="Change currency"
        >
          <span className="text-sm leading-none">{currentCurrency.flag}</span>
          <span className="font-mono font-bold tracking-tight">{currentCurrency.code}</span>
          <span className="text-slate-400 font-medium">({currentCurrency.symbol})</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isManualOverride && onResetAuto && (
          <button
            type="button"
            onClick={onResetAuto}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-slate-500 hover:text-mint-600 dark:text-slate-400 dark:hover:text-mint-400 hover:bg-slate-100 dark:hover:bg-surface-darkCard transition"
            title="Reset to your automatically detected local currency"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Auto</span>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-64 rounded-2xl bg-white dark:bg-surface-darkSurface border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/40 z-50 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-mint-600" />
              <span>Select Currency</span>
            </span>
            {detectedCountry && (
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Geo: {detectedCountry}
              </span>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto py-1 space-y-0.5">
            {allCurrencies.map((c) => {
              const isSelected = c.code === currentCurrency.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onSelectCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-xs transition ${
                    isSelected
                      ? "bg-mint-50/80 dark:bg-mint-950/30 text-mint-900 dark:text-mint-300 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-surface-darkCard"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base leading-none">{c.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold tracking-tight">{c.code}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-mono font-medium">({c.symbol})</span>
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        {c.countryLabel}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
