import React from "react";
import { Sparkles, PieChart, Paintbrush, Copy, Trash2, Code2, Sliders, ShieldCheck, Activity, Cpu, HardDrive, Zap, XCircle } from "lucide-react";
import { ProductShowcase } from "@/components/features/ProductShowcase";
import { SunburstMap } from "@/components/sunburst/SunburstMap";
import { SmartRecommendations } from "@/components/storage/SmartRecommendations";
import { SITE_CONFIG } from "@/config/site";

export const FeaturesPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-mint-600" />
            <span>DEEP FEATURE CATALOG</span>
          </div>
          <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white">
            Everything MacMint can do.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-normal">
            From multi-ring radial storage exploration and live System Health with process quit to Xcode cache purge and background daemon management.
          </p>
        </div>

        {/* Feature Category Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-24 text-center">
          <div className="p-3.5 rounded-2xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/60 dark:border-slate-800">
            <PieChart className="w-5 h-5 text-mint-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Storage Map</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/60 dark:border-slate-800">
            <Paintbrush className="w-5 h-5 text-mint-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Deep Clean</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/60 dark:border-slate-800">
            <Copy className="w-5 h-5 text-mint-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Duplicates</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/60 dark:border-slate-800">
            <Trash2 className="w-5 h-5 text-mint-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Uninstaller</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/60 dark:border-slate-800">
            <Code2 className="w-5 h-5 text-mint-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Developer</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/60 dark:border-slate-800">
            <Activity className="w-5 h-5 text-mint-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">System Health</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/60 dark:border-slate-800">
            <Sliders className="w-5 h-5 text-mint-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Optimizer</span>
          </div>
        </div>

        {/* Embedded Interactive Sunburst Demonstration */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-mint-700 dark:text-mint-400">
              FEATURE 01 · SMART SPACE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              Interactive Treemap & Sunburst Radial Map
            </h2>
          </div>
          <SunburstMap />
          <SmartRecommendations />
        </div>

        {/* Feature 02: System Health & Running Applications */}
        <div className="mb-24 p-8 sm:p-10 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Activity className="w-3.5 h-3.5 text-mint-600" />
              <span>NEW IN V1.0.3 · SYSTEM HEALTH & PROCESS MANAGER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Real-time hardware telemetry and live process control.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              MacMint provides instant visibility into your Mac's vital signs. Monitor live CPU load, physical RAM pressure, disk read/write throughput, and running applications—with safe, single-click process termination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-mint-50 dark:bg-mint-950/40 text-mint-600 dark:text-mint-400 w-fit mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Live CPU & RAM Telemetry</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Per-core CPU percentage, active vs wired RAM allocation, memory pressure gauge, and disk I/O metrics refreshed every 2 seconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-mint-50 dark:bg-mint-950/40 text-mint-600 dark:text-mint-400 w-fit mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Running Applications</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Separate dedicated menu item displaying all active user applications with app icons, PID, memory footprint, and CPU utilization.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-mint-50 dark:bg-mint-950/40 text-mint-600 dark:text-mint-400 w-fit mb-3">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Safe Process Quit & Self-Protection</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Terminate hanging or runaway processes with SIGTERM/SIGKILL fallback. Includes immutable safeguards that prevent quitting MacMint or critical macOS components.
              </p>
            </div>
          </div>
        </div>

        {/* Product Showcase with Real Screenshots */}
        <ProductShowcase />

      </div>
    </div>
  );
};
