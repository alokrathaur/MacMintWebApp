import React from "react";
import { ArrowLeft, Clock, ShieldCheck, AlertTriangle, Lightbulb, ArrowRight, BookOpen } from "lucide-react";
import { GUIDES, GuideItem } from "@/content/guidesData";

interface SingleGuidePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const SingleGuidePage: React.FC<SingleGuidePageProps> = ({ slug, onNavigate }) => {
  const guide: GuideItem | undefined = GUIDES[slug];

  if (!guide) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Guide not found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested guide article does not exist or has been moved.</p>
        <button
          onClick={() => onNavigate("/guides")}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-mint-600 text-white text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all guides</span>
        </button>
      </div>
    );
  }

  return (
    <article className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
        <div className="mb-8">
          <button
            onClick={() => {
              onNavigate("/guides");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-mint-600 dark:hover:text-mint-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Storage & Optimization Guides</span>
          </button>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-slate-200/80 dark:border-slate-800 pb-10 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard text-mint-700 dark:text-mint-400 border border-mint-200 dark:border-mint-800/60">
              {guide.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {guide.summary}
          </p>
        </div>

        {/* Featured Screenshot */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl bg-surface-dark">
          <img
            src={guide.screenshot.startsWith("./") ? guide.screenshot.slice(1) : guide.screenshot}
            alt={guide.title}
            className="w-full h-auto object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes("/guides/assets/")) {
                target.src = target.src.replace("/guides/assets/", "/assets/");
              }
            }}
          />
        </div>

        {/* Table of Contents Card */}
        <div className="p-6 rounded-2xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 mb-12">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-mint-600" />
            <span>Table of Contents</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
            {guide.toc.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-mint-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step-by-Step Sections */}
        <div className="space-y-10 mb-14">
          {guide.steps.map((step, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {step.heading}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.content}
              </p>
              {step.tip && (
                <div className="p-4 rounded-xl bg-mint-50/70 dark:bg-mint-950/20 border border-mint-200/80 dark:border-mint-850 text-xs sm:text-sm text-mint-900 dark:text-mint-200 flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-mint-600 shrink-0 mt-0.5" />
                  <span>{step.tip}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Warnings & Tips Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* Warnings */}
          <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Important Considerations</span>
            </div>
            <ul className="space-y-2 text-xs text-amber-900 dark:text-amber-200">
              {guide.warnings.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="p-6 rounded-2xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/50 space-y-3">
            <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Pro Optimization Tips</span>
            </div>
            <ul className="space-y-2 text-xs text-teal-900 dark:text-teal-200">
              {guide.tips.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Guides */}
        {guide.related.length > 0 && (
          <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Related macOS Storage Guides
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guide.related.map((relSlug) => {
                const relGuide = GUIDES[relSlug];
                if (!relGuide) return null;
                return (
                  <button
                    key={relSlug}
                    onClick={() => {
                      onNavigate(`/guides/${relSlug}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="p-4 text-left rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-surface-darkSurface hover:border-mint-400 dark:hover:border-mint-700 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-mint-600 dark:text-mint-400 uppercase">
                        {relGuide.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1 group-hover:text-mint-600 transition">
                        {relGuide.title}
                      </h5>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-mint-600 transition">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
