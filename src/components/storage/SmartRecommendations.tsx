import React from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, Clock, Layers, Sparkles } from "lucide-react";

interface Recommendation {
  title: string;
  size: string;
  label: "SAFE TO REVIEW" | "USUALLY REMOVABLE" | "REVIEW RECOMMENDED" | "PROTECTED";
  desc: string;
  icon: React.ReactNode;
}

const recommendations: Recommendation[] = [
  {
    title: "Xcode DerivedData & Caches",
    size: "14.8 GB",
    label: "REVIEW RECOMMENDED",
    desc: "Old build caches and unused iOS simulator runtimes from past projects.",
    icon: <Layers className="w-4 h-4 text-mint-600" />,
  },
  {
    title: "Application & User Caches",
    size: "8.2 GB",
    label: "USUALLY REMOVABLE",
    desc: "Temporary sandbox caches and web data that re-downloads when needed.",
    icon: <Sparkles className="w-4 h-4 text-mint-500" />,
  },
  {
    title: "Duplicate Files",
    size: "8.3 GB",
    label: "SAFE TO REVIEW",
    desc: "Exact byte-for-byte duplicate downloads and documents confirmed by SHA-256.",
    icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
  },
  {
    title: "Large & Forgotten Archives",
    size: "6.1 GB",
    label: "REVIEW RECOMMENDED",
    desc: "Unopened disk images (.dmg) and ZIP archives untouched for 6+ months.",
    icon: <Clock className="w-4 h-4 text-amber-500" />,
  },
  {
    title: "Browser Cache & Service Workers",
    size: "5.4 GB",
    label: "SAFE TO REVIEW",
    desc: "Offline web caches, stale service worker assets, and media buffers.",
    icon: <CheckCircle2 className="w-4 h-4 text-mint-600" />,
  },
  {
    title: "macOS Core & User Documents",
    size: "0 KB Cleanable",
    label: "PROTECTED",
    desc: "System binaries, keychain passwords, and personal files are strictly untouchable.",
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
  },
];

export const SmartRecommendations: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 p-6 sm:p-8 rounded-3xl bg-surface-soft/80 dark:bg-surface-darkSurface/60 border border-slate-200/70 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-mint-700 dark:text-mint-400">
            Smart Recommendations
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            MacMint found space you can review.
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-mint-50 dark:bg-mint-950/30 border border-mint-200/80 dark:border-mint-800/60 text-mint-800 dark:text-mint-300 font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-mint-600" />
          <span>80 GB Available to Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-mint-400/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-surface-darkSurface border border-slate-100 dark:border-slate-800">
                  {rec.icon}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    rec.label === "PROTECTED"
                      ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      : rec.label === "SAFE TO REVIEW"
                      ? "bg-mint-50 text-mint-700 dark:bg-mint-950/40 dark:text-mint-300 border border-mint-200 dark:border-mint-800/60"
                      : rec.label === "USUALLY REMOVABLE"
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                  }`}
                >
                  {rec.label}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {rec.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {rec.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 text-[11px] font-sans">Potential space:</span>
              <span className="font-bold text-mint-700 dark:text-mint-400">{rec.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
