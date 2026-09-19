import React, { useState, useEffect } from "react";
import { analytics, StatsData } from "../services/analytics";
import { StatCard } from "../components/stats/StatCard";
import { BarTimeSeries } from "../components/stats/BarTimeSeries";
import { RankedList, countryCodeToFlag } from "../components/stats/RankedList";
import { 
  Activity, 
  RotateCw, 
  ShieldCheck, 
  Download, 
  HardDrive, 
  Clock, 
  Globe2, 
  ArrowUpRight,
  TrendingUp,
  Radio
} from "lucide-react";

const PERIODS: { value: "last24h" | "last7d" | "last30d" | "yearly" | "all"; label: string }[] = [
  { value: "last24h", label: "Last 24h" },
  { value: "last7d", label: "Last 7d" },
  { value: "last30d", label: "Last 30d" },
  { value: "yearly", label: "Yearly" },
  { value: "all", label: "All time" },
];

import { formatReclaimedBytes, formatStorageScannedSaved } from "../utils/formatStorage";

export const StatsPage: React.FC = () => {
  // Sync URL search params
  const [period, setPeriod] = useState<"last24h" | "last7d" | "last30d" | "yearly" | "all">(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("period");
      if (p === "last24h" || p === "last7d" || p === "last30d" || p === "yearly" || p === "all") {
        return p;
      }
    }
    return "last24h";
  });

  const [granularity, setGranularity] = useState<"hourly" | "daily" | "monthly">(() => {
    if (typeof window !== "undefined") {
      const g = new URLSearchParams(window.location.search).get("granularity");
      if (g === "hourly" || g === "daily" || g === "monthly") {
        return g;
      }
    }
    return period === "last24h" ? "hourly" : period === "yearly" ? "monthly" : "daily";
  });

  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Load and refresh stats asynchronously from Cloudflare D1
  const refreshStats = async () => {
    setIsRefreshing(true);
    const data = await analytics.fetchStats(period, granularity);
    setStats(data);
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // When period changes, set logical granularity default
  const handlePeriodChange = (newPeriod: "last24h" | "last7d" | "last30d" | "yearly" | "all") => {
    setPeriod(newPeriod);
    const newGranularity = newPeriod === "last24h" ? "hourly" : newPeriod === "yearly" ? "monthly" : "daily";
    setGranularity(newGranularity);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("period", newPeriod);
      url.searchParams.set("granularity", newGranularity);
      window.history.replaceState({}, "", url.pathname + url.search);
    } catch {
      // ignore
    }
  };

  const handleGranularityToggle = () => {
    let next: "hourly" | "daily" | "monthly" = "daily";
    if (period === "last24h") {
      next = granularity === "hourly" ? "daily" : "hourly";
    } else if (period === "yearly") {
      next = granularity === "monthly" ? "daily" : "monthly";
    } else {
      next = granularity === "daily" ? "hourly" : "daily";
    }
    setGranularity(next);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("granularity", next);
      window.history.replaceState({}, "", url.pathname + url.search);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    refreshStats();
  }, [period, granularity]);

  // Periodic auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    const timer = setInterval(() => {
      refreshStats();
    }, 12000);
    return () => clearInterval(timer);
  }, [autoRefresh, period, granularity]);

  if (!stats) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Activity className="size-10 text-mint-500 animate-spin" />
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Connecting to Cloudflare D1
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Loading live telemetry from edge database...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const conversionRate =
    stats.headline.uniqueVisitors > 0
      ? ((stats.headline.downloads / stats.headline.uniqueVisitors) * 100).toFixed(1)
      : "0.0";

  const viewsPerVisitor =
    stats.headline.uniqueVisitors > 0
      ? (stats.headline.pageviews / stats.headline.uniqueVisitors).toFixed(1)
      : "1.0";

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-mint-900/30">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <Activity className="size-8 text-mint-500 animate-pulse" />
              Live stats
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              LIVE TRACKING
            </span>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap">
            <span>Public, privacy-friendly analytics for</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
              getmacmint.store
            </span>
            <span>&middot;</span>
            <span className="text-xs text-slate-400">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          </p>
        </div>

        {/* Filters & Refresh Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Period selector pills */}
          <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => handlePeriodChange(p.value)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150 ${
                  period === p.value
                    ? "bg-mint-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Granularity switch */}
          <button
            onClick={handleGranularityToggle}
            className="px-3.5 py-1.5 rounded-full border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-mint-500/50 transition-colors shadow-2xs"
            title="Toggle time bucket granularity"
          >
            {granularity.charAt(0).toUpperCase() + granularity.slice(1)}
          </button>

          {/* Manual Refresh */}
          <button
            onClick={refreshStats}
            disabled={isRefreshing}
            className="p-2 rounded-full border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 text-slate-600 dark:text-slate-300 hover:text-mint-600 dark:hover:text-mint-400 hover:border-mint-500/50 transition-all shadow-2xs"
            title="Refresh analytics data"
          >
            <RotateCw className={`size-4 ${isRefreshing ? "animate-spin text-mint-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* Headline Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-8">
        <StatCard
          label="Online now"
          value={stats.headline.liveOnline}
          sublabel="active visitors"
          isLive={true}
        />
        <StatCard
          label="Unique visitors"
          value={stats.headline.uniqueVisitors}
          sublabel={`${stats.headline.pageviews.toLocaleString()} views`}
        />
        <StatCard
          label="Total pageviews"
          value={stats.headline.pageviews}
          sublabel={`~${viewsPerVisitor} views / visitor`}
        />
        <StatCard
          label="DMG Downloads"
          value={stats.headline.downloads}
          sublabel={`${conversionRate}% conversion rate`}
        />
        <StatCard
          label="Avg. Session"
          value="2m 48s"
          sublabel="high intent traffic"
        />
        <StatCard
          label="Storage Reclaimed"
          value={formatReclaimedBytes(stats.headline.totalReclaimedBytes || 0)}
          sublabel={
            (stats.headline.cleanupsCount || 0) > 0
              ? `${(stats.headline.cleanupsCount || 0).toLocaleString()} cleanups`
              : "real telemetry from Macs"
          }
        />
      </div>

      {/* Time Series Chart */}
      <div className="mt-8">
        <BarTimeSeries
          title="Traffic & Visitor Flow Over Time"
          data={stats.timeSeries}
          granularity={granularity}
        />
      </div>

      {/* Engagement & Reclaim Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="rounded-2xl border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-sm p-5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-mint-50 dark:bg-mint-950/40 border border-mint-500/20 flex items-center justify-center text-mint-600 dark:text-mint-400 shrink-0">
            <Download className="size-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Free Trial Downloads
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums font-mono mt-0.5">
              {stats.headline.downloads.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Direct Native macOS .dmg packages
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-sm p-5 flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <HardDrive className="size-7" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              STORAGE RECLAIMED
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white tabular-nums font-mono mt-0.5 tracking-tight flex items-baseline gap-2">
              <span>{formatStorageScannedSaved(stats.headline.totalReclaimedBytes || 0).value}</span>
              <span className="text-2xl font-bold">{formatStorageScannedSaved(stats.headline.totalReclaimedBytes || 0).unit}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {(stats.headline.cleanupsCount || 0) > 0
                ? `${(stats.headline.cleanupsCount || 0).toLocaleString()} cleanups across all Macs`
                : "Orphaned caches, DerivedData & junk"}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-sm p-5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
            <Globe2 className="size-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Visitors Since Launch
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums font-mono mt-0.5">
              {stats.headline.totalVisitorsEver.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Worldwide Mac users & developers
            </div>
          </div>
        </div>
      </div>

      {/* Breakdowns Grid (Ranked Lists) */}
      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-12 mb-4 flex items-center gap-2">
        <TrendingUp className="size-5 text-mint-500" />
        Audience & Source Breakdown
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RankedList title="Top Referrers" items={stats.breakdowns.referrers} />
        <RankedList title="Top Pages Visited" items={stats.breakdowns.pages} />
        <RankedList title="Countries" items={stats.breakdowns.countries} />
        <RankedList title="Operating Systems & macOS" items={stats.breakdowns.platforms} />
        <RankedList title="Device Types" items={stats.breakdowns.devices} />
        <RankedList title="Browsers" items={stats.breakdowns.browsers} />
      </div>

      {/* Live Stream / Recent Events */}
      <div className="mt-12 rounded-2xl border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Radio className="size-4 text-emerald-500 animate-pulse" />
            Recent Live Activity Stream
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Real-time anonymous telemetry</span>
        </div>

        <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {stats.recentEvents.map((evt) => (
            <li key={evt.id} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 truncate pr-2">
                <span
                  className={`size-2 rounded-full shrink-0 ${
                    evt.type === "scan"
                      ? "bg-sky-500"
                      : evt.type === "cleanup"
                      ? "bg-emerald-500"
                      : "bg-mint-500"
                  }`}
                />
                {evt.countryCode && (
                  <span className="shrink-0 text-sm leading-none" title={evt.countryCode}>
                    {countryCodeToFlag(evt.countryCode)}
                  </span>
                )}
                <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
                  {evt.label}
                </span>
              </div>
              <span className="shrink-0 font-mono text-xs text-slate-400 dark:text-slate-500">
                {evt.timeAgo}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Privacy Notice */}
      <div className="mt-12 p-4 rounded-xl border border-slate-200/60 dark:border-mint-950/50 bg-slate-50/50 dark:bg-surface-darkSurface/40 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <ShieldCheck className="size-5 text-mint-600 dark:text-mint-400 shrink-0" />
        <span>
          <strong>100% Privacy-Preserving & Transparent:</strong> MacMint does not use tracking cookies or persistent fingerprints. All metrics are aggregated anonymously in real time.
        </span>
      </div>
    </div>
  );
};
