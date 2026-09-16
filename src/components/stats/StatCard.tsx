import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  isLive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, sublabel, isLive }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-sm p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {isLive && (
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
        )}
      </div>

      <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>

      {sublabel && (
        <div className="mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
          {sublabel}
        </div>
      )}

      {/* Subtle bottom highlight bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mint-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
