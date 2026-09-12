import React from "react";
import { Check, X, Sparkles, Download, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface PricingSectionProps {
  onNavigate?: (path: string) => void;
  isDedicatedPage?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate, isDedicatedPage = false }) => {
  const { free, proMonthly, proYearly, proLifetime } = SITE_CONFIG.pricing;

  const handleDownload = () => {
    if (onNavigate) {
      onNavigate("/download");
    } else {
      window.location.hash = "#/download";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckoutClick = async (e: React.MouseEvent, plan: "monthly" | "yearly" | "lifetime", fallbackUrl: string) => {
    if (e.metaKey || e.ctrlKey || e.button === 1) return;
    e.preventDefault();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`${SITE_CONFIG.apiUrl}/api/checkout/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, return_url: "https://getmacmint.store/activate" }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
          return;
        }
      }
    } catch {
      // Fallback to static Dodo buy link
    }
    window.location.href = fallbackUrl;
  };

  const comparisonFeatures: Array<{ name: string; free: boolean | string; monthly: boolean | string; yearly: boolean | string; lifetime: boolean | string }> = [
    { name: "Device Activation Limit", free: "1 Mac (Trial)", monthly: "1 Mac", yearly: "1 Mac", lifetime: "Up to 5 Macs" },
    { name: "Disk Space Sunburst Map & Capacity Analysis", free: true, monthly: true, yearly: true, lifetime: true },
    { name: "Deep Cleanup (System & User Caches, Logs, Trash)", free: true, monthly: true, yearly: true, lifetime: true },
    { name: "Large & Forgotten Files Explorer (>50MB)", free: true, monthly: true, yearly: true, lifetime: true },
    { name: "Node.js Dependencies (node_modules) Auto-Discovery", free: false, monthly: true, yearly: true, lifetime: true },
    { name: "Developer Build Artifacts (Xcode, SPM, Cargo, npm)", free: false, monthly: true, yearly: true, lifetime: true },
    { name: "Cryptographic Duplicate File Finder (SHA-256)", free: false, monthly: true, yearly: true, lifetime: true },
    { name: "Complete App Uninstaller with Hidden Container Removal", free: false, monthly: true, yearly: true, lifetime: true },
    { name: "System Data Reclaim for Sandboxed & Group Containers", free: false, monthly: true, yearly: true, lifetime: true },
    { name: "Startup Items & Background Daemon Manager", free: false, monthly: true, yearly: true, lifetime: true },
    { name: "System Optimizations (RAM Purge, DNS Flush, Spotlight)", free: false, monthly: true, yearly: true, lifetime: true },
    { name: "Operation History & Persistent Audit Log", free: true, monthly: true, yearly: true, lifetime: true },
    { name: "Priority Support via Email & Contact on X", free: false, monthly: true, yearly: true, lifetime: true },
    { name: "All Future Major Updates Included", free: false, monthly: false, yearly: false, lifetime: true },
  ];

  return (
    <section id="pricing" className={`${isDedicatedPage ? "pt-10 pb-16 md:pt-14 md:pb-20" : "py-16 md:py-24"} bg-surface-light dark:bg-surface-dark transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto ${isDedicatedPage ? "mb-10 sm:mb-12" : "mb-14 sm:mb-16"}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Simple, honest pricing.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 leading-relaxed font-normal">
            Start free with essential scanning and storage visualization. Upgrade to Pro for developer tools, deep container removal, and lifetime updates.
          </p>
        </div>

        {/* Pricing Cards: 4 Tiers */}
        <div id="pricing-cards" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 items-stretch scroll-mt-20">
          
          {/* 1. FREE PLAN */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{free.name}</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">{free.description}</p>
              
              <div className="my-5">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                  {free.price}
                </span>
                <span className="text-xs text-slate-500 font-medium ml-2">{free.cadence}</span>
              </div>

              <div className="space-y-2.5 pt-1">
                {free.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleDownload}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface-darkCard dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>{free.ctaText}</span>
              </button>
            </div>
          </div>

          {/* 2. PRO MONTHLY PLAN */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between relative">
            {proMonthly.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800 uppercase tracking-wider">
                {proMonthly.badge}
              </span>
            )}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{proMonthly.name}</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">{proMonthly.description}</p>

              <div className="my-5 flex items-baseline flex-wrap gap-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                  {proMonthly.price}
                </span>
                <span className="text-2xl font-bold line-through text-slate-400 dark:text-slate-500 font-mono decoration-rose-500/70 decoration-2">
                  {proMonthly.originalPrice}
                </span>
                <span className="text-xs text-slate-500 font-medium">{proMonthly.cadence}</span>
              </div>

              <div className="space-y-2.5 pt-1">
                {proMonthly.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a
                href={proMonthly.ctaUrl}
                onClick={(e) => handleCheckoutClick(e, "monthly", proMonthly.ctaUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-sm transition active:scale-[0.98] shadow-sm hover:shadow"
              >
                <span>{proMonthly.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3. PRO YEARLY PLAN */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkSurface border border-mint-200 dark:border-mint-900/60 shadow-sm flex flex-col justify-between relative">
            {proYearly.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/80 dark:text-teal-200 border border-teal-300 dark:border-teal-800 uppercase tracking-wider">
                {proYearly.badge}
              </span>
            )}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{proYearly.name}</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">{proYearly.description}</p>

              <div className="my-5 flex items-baseline flex-wrap gap-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                  {proYearly.price}
                </span>
                <span className="text-2xl font-bold line-through text-slate-400 dark:text-slate-500 font-mono decoration-rose-500/70 decoration-2">
                  {proYearly.originalPrice}
                </span>
                <span className="text-xs text-slate-500 font-medium">{proYearly.cadence}</span>
              </div>

              <div className="space-y-2.5 pt-1">
                {proYearly.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a
                href={proYearly.ctaUrl}
                onClick={(e) => handleCheckoutClick(e, "yearly", proYearly.ctaUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-semibold text-sm transition active:scale-[0.98] shadow-sm hover:shadow"
              >
                <span>{proYearly.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 4. PRO LIFETIME (BEST VALUE) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkSurface border-2 border-mint-500/80 shadow-xl shadow-mint-700/10 flex flex-col justify-between relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full bg-mint-600 text-white uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              {proLifetime.badge}
            </span>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{proLifetime.name}</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">{proLifetime.description}</p>

              <div className="my-5 flex items-baseline flex-wrap gap-2">
                <span className="text-4xl font-extrabold text-mint-700 dark:text-mint-400 font-mono tracking-tight">
                  {proLifetime.price}
                </span>
                <span className="text-2xl font-bold line-through text-slate-400 dark:text-slate-500 font-mono decoration-rose-500/70 decoration-2">
                  {proLifetime.originalPrice}
                </span>
                <span className="text-xs text-slate-500 font-medium">{proLifetime.cadence}</span>
              </div>

              <div className="space-y-2.5 pt-1">
                {proLifetime.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                    <Check className="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a
                href={proLifetime.ctaUrl}
                onClick={(e) => handleCheckoutClick(e, "lifetime", proLifetime.ctaUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-sm shadow-lg shadow-mint-700/20 transition active:scale-[0.98] hover:shadow-mint-700/30"
              >
                <span>{proLifetime.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Already Purchased / Activation Callout */}
        <div className="text-center mb-16 -mt-8">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Already purchased a license?{" "}
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate("/activate");
                } else {
                  window.location.hash = "#/activate";
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-semibold text-mint-700 dark:text-mint-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Activate your MacMint app here</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </p>
        </div>

        {/* COMPARISON TABLE */}
        <div className="rounded-3xl bg-surface-soft/80 dark:bg-surface-darkSurface/60 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 overflow-hidden">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Feature Comparison</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Detailed breakdown of included capabilities across MacMint editions.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="pb-4">Capability</th>
                  <th className="pb-4 text-center">7-Day Free Trial</th>
                  <th className="pb-4 text-center">Pro Monthly ($2.99/mo)</th>
                  <th className="pb-4 text-center">Pro Yearly ($2.08/mo)</th>
                  <th className="pb-4 text-center text-mint-600 dark:text-mint-400">Pro Lifetime (5 Macs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {comparisonFeatures.map((row, i) => (
                  <tr key={i} className="hover:bg-white/60 dark:hover:bg-surface-darkCard transition-colors">
                    <td className="py-3.5 pr-4 font-medium text-slate-800 dark:text-slate-200">{row.name}</td>
                    <td className="py-3.5 text-center">
                      {typeof row.free === "string" ? (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{row.free}</span>
                      ) : row.free ? (
                        <Check className="w-4 h-4 text-mint-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600 font-mono">—</span>
                      )}
                    </td>
                    <td className="py-3.5 text-center">
                      {typeof row.monthly === "string" ? (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{row.monthly}</span>
                      ) : row.monthly ? (
                        <Check className="w-4 h-4 text-mint-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600 font-mono">—</span>
                      )}
                    </td>
                    <td className="py-3.5 text-center">
                      {typeof row.yearly === "string" ? (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{row.yearly}</span>
                      ) : row.yearly ? (
                        <Check className="w-4 h-4 text-mint-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600 font-mono">—</span>
                      )}
                    </td>
                    <td className="py-3.5 text-center">
                      {typeof row.lifetime === "string" ? (
                        <span className="font-semibold text-mint-700 dark:text-mint-300">{row.lifetime}</span>
                      ) : row.lifetime ? (
                        <Check className="w-4 h-4 text-mint-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600 font-mono">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
