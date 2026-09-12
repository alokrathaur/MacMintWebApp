import React from "react";
import { Download, ShieldCheck, Cpu, HardDrive, CheckCircle2, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const DownloadPage: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Download DMG",
      desc: "Download the official MacMint universal disk image installer.",
    },
    {
      num: "02",
      title: "Drag to Applications",
      desc: "Double-click the .dmg and drag MacMint into your macOS Applications folder.",
    },
    {
      num: "03",
      title: "Launch & Scan",
      desc: "Open MacMint from Launchpad or Spotlight and run your first storage scan.",
    },
    {
      num: "04",
      title: "Full Disk Access (Optional)",
      desc: "Grant access in System Settings > Privacy to inspect sandboxed app containers.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden shadow-lg border border-mint-300/60 bg-mint-500 mb-5">
            <img
              src="/assets/logo.png"
              alt="MacMint Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/macmint_logo.png";
              }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>OFFICIAL RELEASE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Get MacMint for your Mac.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 font-normal">
            Clean, optimize, and refresh your storage with a native, private macOS utility.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {SITE_CONFIG.downloadUrl.startsWith("http") ? (
              <>
                <a
                  href={SITE_CONFIG.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-base shadow-xl shadow-mint-700/20 transition-all active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" />
                  <span>Download MacMint v{SITE_CONFIG.appVersion} (.dmg)</span>
                </a>
                <a
                  href={SITE_CONFIG.directDmgUrl}
                  download="MacMint.dmg"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white dark:bg-surface-darkSurface hover:bg-slate-50 dark:hover:bg-surface-darkCard text-slate-800 dark:text-slate-200 font-semibold text-base border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all active:scale-[0.98]"
                  title="Direct DMG download mirror"
                >
                  <Download className="w-4 h-4 text-mint-600 dark:text-mint-400" />
                  <span>Direct Mirror</span>
                </a>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert("MacMint v1.0.1 official build packaging is being finalized. Direct download link will be available here shortly!")}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-base shadow-xl shadow-mint-700/20 transition-all active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" />
                  <span>Download MacMint v{SITE_CONFIG.appVersion} (Coming Soon)</span>
                </button>
                <span className="text-xs text-mint-700 dark:text-mint-400 font-medium">Direct download link will be added here shortly</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-mint-600" />
            <span>macOS 14.0 or later • Universal Binary (Apple Silicon & Intel)</span>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 mb-14">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Installation in 4 Easy Steps
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="space-y-2">
                <span className="text-xl font-bold font-mono text-mint-600">
                  {step.num}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* System Requirements & Release Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">System Requirements</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-mint-600 shrink-0" />
                <span>macOS 14.0 (Sonoma) or macOS 15.0 (Sequoia)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-mint-600 shrink-0" />
                <span>Apple Silicon (M1, M2, M3, M4) or 64-bit Intel processor</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-mint-600 shrink-0" />
                <span>Minimum 50 MB available disk space for the app bundle</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Release Notes v1.0.1</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-mint-600 font-bold">•</span>
                <span>Single-window architecture with seamless web-activation deep-link routing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mint-600 font-bold">•</span>
                <span>Authoritative live subscription verification & comprehensive deactivation cache purge</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mint-600 font-bold">•</span>
                <span>Pro feature unlock buttons route directly to in-app Settings without extra popups</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mint-600 font-bold">•</span>
                <span>Cryptographic SHA-256 duplicate file detection and smart selection</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
