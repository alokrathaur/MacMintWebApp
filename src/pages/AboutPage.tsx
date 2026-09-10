import React from "react";
import { Sparkles, ShieldCheck, Heart, ArrowUpRight, Cpu, Code2, Lock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const AboutPage: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>OUR MISSION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Built to make Mac maintenance feel simple.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 font-normal">
            A native utility crafted with respect for user privacy, safety guardrails, and system stability.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 space-y-8 mb-16">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why We Created MacMint
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Modern macOS storage management often feels like a guessing game. System Settings presents a monolithic, opaque "System Data" block, while legacy Mac cleaners bombard users with intrusive popups, continuous background daemons, and questionable telemetry.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We built MacMint to be the antithesis of bloated utilities: a high-performance native application written in pure Swift and SwiftUI that runs 100% offline, gives you complete inspection of every target directory before anything is touched, and never removes a file without your consent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <div className="space-y-2">
              <Cpu className="w-5 h-5 text-mint-600" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pure Swift</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Zero Electron. Lightweight memory footprint and native responsiveness.</p>
            </div>
            <div className="space-y-2">
              <Lock className="w-5 h-5 text-mint-600" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Local</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">No telemetry, zero cloud sync, and no background analytics tracking.</p>
            </div>
            <div className="space-y-2">
              <ShieldCheck className="w-5 h-5 text-mint-600" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Immutable Guard</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">CleanerGuard allow-list guarantees personal files are never touched.</p>
            </div>
          </div>
        </div>

        {/* Company & Creator Link */}
        <div className="p-8 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-mint-700 dark:text-mint-400">
              Developed & Maintained
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Built by LegendPrix AI
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Crafting premium native software and intelligent macOS tooling.
            </p>
          </div>

          <a
            href={SITE_CONFIG.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-semibold text-xs transition"
          >
            <span>Visit legendPrixAi.lol</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
