import React from "react";
import { ShieldCheck, Lock, Eye, CheckCircle2, Search, Compass, CheckSquare, Sparkles } from "lucide-react";

export const TrustAndWorkflow: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "SCAN",
      icon: <Search className="w-5 h-5 text-mint-600 dark:text-mint-400" />,
      desc: "Multi-threaded disk scan cataloging caches, developer junk, duplicates, and app leftovers across your drive.",
    },
    {
      num: "02",
      title: "UNDERSTAND",
      icon: <Compass className="w-5 h-5 text-mint-600 dark:text-mint-400" />,
      desc: "Interactive Sunburst radial map and categorized storage breakdowns show you exactly what is taking up space.",
    },
    {
      num: "03",
      title: "REVIEW",
      icon: <CheckSquare className="w-5 h-5 text-mint-600 dark:text-mint-400" />,
      desc: "Fine-tune selections with smart presets or toggle individual folder paths. Nothing is deleted without confirmation.",
    },
    {
      num: "04",
      title: "CLEAN",
      icon: <Sparkles className="w-5 h-5 text-mint-600 dark:text-mint-400" />,
      desc: "Reclaim gigabytes of storage with immediate disk capacity updates and a persistent audit trail in Operation History.",
    },
  ];

  return (
    <div className="space-y-24 py-16 bg-surface-soft dark:bg-surface-dark transition-colors">
      
      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-mint-700 dark:text-mint-400">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Four simple steps to a fresh Mac.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3">
            Designed for total transparency — inspect before you clean.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black font-mono text-mint-600/30 dark:text-mint-400/30">
                    {step.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-mint-50 dark:bg-surface-darkCard border border-mint-100 dark:border-mint-900/50">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[11px] font-semibold text-mint-700 dark:text-mint-400 uppercase tracking-wider">
                Step {idx + 1} of 4
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAFETY & PRIVACY TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Safety Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-mint-50 dark:bg-surface-darkCard border border-mint-100 dark:border-mint-900/50 text-mint-700 dark:text-mint-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Cleaning shouldn't feel risky.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                MacMint is built on a strict, conservative allow-list guard (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">CleanerGuard</code>). Every file marked for deletion is verified against immutable safety rules.
              </p>

              <div className="space-y-2.5 pt-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mint-600 shrink-0" />
                  <span>Personal documents, Desktop files, and Photos are strictly protected</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mint-600 shrink-0" />
                  <span>Conservative symlink handling prevents target directory breakout</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mint-600 shrink-0" />
                  <span>Explicit review dialog with exact item counts before every purge</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mint-600 shrink-0" />
                  <span>Audit trail logged locally in Operation History for full visibility</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-mint-700 dark:text-mint-400">
              Verified Allow-List Guardrails
            </div>
          </div>

          {/* Privacy Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-teal-50 dark:bg-surface-darkCard border border-teal-100 dark:border-teal-900/50 text-teal-700 dark:text-teal-300">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Your files stay yours.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                MacMint is designed to analyze and clean your Mac locally, so you can understand your storage without sending your personal files to a remote service.
              </p>

              <div className="space-y-2.5 pt-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>100% Offline operation — no background telemetry or analytic trackers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>No user accounts, email sign-ins, or remote database sync</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>All file lists, sizes, and audit records stay entirely on your Mac</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Full Disk Access is used solely for local container inspection</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-teal-700 dark:text-teal-400">
              Zero External Network Calls
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
