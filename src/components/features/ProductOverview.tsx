import React from "react";
import {
  PieChart,
  Paintbrush,
  Copy,
  Trash2,
  Code2,
  Sliders,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

interface BentoItem {
  icon: React.ReactNode;
  title: string;
  badge: string;
  description: string;
  highlight: string;
  colSpan?: string;
}

const bentoItems: BentoItem[] = [
  {
    icon: <PieChart className="w-6 h-6 text-mint-600 dark:text-mint-400" />,
    title: "Storage Intelligence & Sunburst Map",
    badge: "Flagship",
    description:
      "Interactive radial visualizer and deep directory scanner that exposes hidden gigabytes across applications, system directories, and user archives.",
    highlight: "Multi-Ring Radial Exploration",
    colSpan: "lg:col-span-8",
  },
  {
    icon: <Code2 className="w-6 h-6 text-mint-600 dark:text-mint-400" />,
    title: "Developer Tools & node_modules",
    badge: "Built for Devs",
    description:
      "One-click discovery for Xcode DerivedData, simulator runtimes, npm/yarn node_modules, Cargo caches, and Swift Package Manager build artifacts.",
    highlight: "Auto-Scanned Project Artifacts",
    colSpan: "lg:col-span-4",
  },
  {
    icon: <Paintbrush className="w-6 h-6 text-mint-600 dark:text-mint-400" />,
    title: "Deep Cleanup with Safe Guard",
    badge: "Essential",
    description:
      "Scans system caches, application caches, browser data, and trash. Strictly protected by immutable allow-list guardrails so critical system files are never touched.",
    highlight: "Permanent Direct Deletes",
    colSpan: "lg:col-span-4",
  },
  {
    icon: <Copy className="w-6 h-6 text-mint-600 dark:text-mint-400" />,
    title: "Cryptographic Duplicate Finder",
    badge: "Precision",
    description:
      "Two-tier scanning compares exact file sizes then verifies content using SHA-256 hashing. Smart-select rules help you keep originals and eliminate redundancy.",
    highlight: "Byte-for-Byte Accuracy",
    colSpan: "lg:col-span-4",
  },
  {
    icon: <Trash2 className="w-6 h-6 text-mint-600 dark:text-mint-400" />,
    title: "Complete App Uninstaller",
    badge: "Zero Leftovers",
    description:
      "Removes applications alongside sandboxed containers, Application Support files, preferences, WebKit data, and orphan crash logs.",
    highlight: "Hidden Container Hunter",
    colSpan: "lg:col-span-4",
  },
  {
    icon: <Sliders className="w-6 h-6 text-mint-600 dark:text-mint-400" />,
    title: "System Optimizations & Startup Items",
    badge: "Performance",
    description:
      "Instant maintenance scripts to purge inactive RAM, flush DNS, vacuum Apple Mail envelopes, and manage background LaunchAgents and daemons.",
    highlight: "One-Click Maintenance",
    colSpan: "lg:col-span-12",
  },
];

export const ProductOverview: React.FC = () => {
  return (
    <section id="overview" className="py-20 md:py-28 bg-surface-soft dark:bg-surface-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>SUITE OVERVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Everything you need to keep your Mac clean.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-normal">
            MacMint combines storage analysis, safe cleanup, duplicate detection, app removal,
            developer cleanup and system tools in one native Mac experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {bentoItems.map((item, idx) => (
            <div
              key={idx}
              className={`${item.colSpan || "lg:col-span-4"} group relative p-8 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:shadow-mint-700/5 hover:border-mint-300 dark:hover:border-mint-700 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-mint-50 dark:bg-surface-darkCard border border-mint-100 dark:border-mint-900/50 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-mint-700 dark:group-hover:text-mint-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-mint-700 dark:text-mint-400">
                <span>{item.highlight}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
