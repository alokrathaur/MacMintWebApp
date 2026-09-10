import React, { useState } from "react";
import { BookOpen, Clock, ArrowRight, Search, Sparkles } from "lucide-react";
import { GUIDES, GuideItem } from "@/content/guidesData";

interface GuidesPageProps {
  onNavigate: (path: string) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState("");
  const allGuides = Object.values(GUIDES);

  const filtered = allGuides.filter((g) => {
    const q = search.toLowerCase();
    return (
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-mint-600" />
            <span>MAC STORAGE & MAINTENANCE GUIDES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Practical guides to Mac storage.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 font-normal">
            Step-by-step instructions for troubleshooting disk bloat, reclaiming caches, and optimizing macOS performance.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search guides (e.g., Xcode, cache, duplicate)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-mint-500/30"
            />
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filtered.map((guide) => (
            <div
              key={guide.slug}
              onClick={() => {
                onNavigate(`/guides/${guide.slug}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-surface-darkSurface shadow-sm hover:shadow-xl hover:border-mint-300 dark:hover:border-mint-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Screenshot Header */}
                <div className="h-48 overflow-hidden bg-surface-dark relative border-b border-slate-100 dark:border-slate-800">
                  <img
                    src={guide.screenshot}
                    alt={guide.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-white/90 dark:bg-surface-darkSurface/90 text-mint-700 dark:text-mint-300 backdrop-blur-md shadow-sm border border-slate-200/60 dark:border-slate-700">
                    {guide.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-mint-700 dark:group-hover:text-mint-400 transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-semibold text-mint-700 dark:text-mint-400 border-t border-slate-100 dark:border-slate-800/60">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
