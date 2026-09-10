import React from "react";
import { Download, PlayCircle, ShieldCheck, Cpu, HardDrive, Sparkles } from "lucide-react";
import { HeroLogo3D } from "./HeroLogo3D";
import { SITE_CONFIG } from "@/config/site";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      {/* Background Ambient Mint Glow (Extremely subtle, light-first) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-mint-50/80 via-surface-soft/40 to-transparent dark:from-mint-950/20 dark:via-surface-dark/10 pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200/70 dark:border-mint-800/40 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-mint-500" />
              <span>MAC CLEANUP, SIMPLIFIED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08]">
              Your Mac, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-600 via-mint-500 to-mint-400">
                refreshed.
              </span>
            </h1>

            {/* Core Message & Additional Description */}
            <div className="space-y-3 max-w-xl">
              <p className="text-xl sm:text-2xl font-medium text-slate-800 dark:text-slate-200 leading-snug">
                {SITE_CONFIG.coreMessage}
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {SITE_CONFIG.subheading}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  onNavigate?.("/download");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-base shadow-lg shadow-mint-700/20 hover:shadow-mint-700/30 transition-all duration-200 active:scale-[0.98]"
              >
                <Download className="w-5 h-5" />
                <span>Download MacMint</span>
              </button>

              <a
                href="#smart-space"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-surface-darkSurface hover:bg-slate-50 dark:hover:bg-surface-darkCard text-slate-800 dark:text-slate-200 font-medium text-base border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-200 hover:border-slate-300 active:scale-[0.98]"
              >
                <PlayCircle className="w-5 h-5 text-mint-600 dark:text-mint-400" />
                <span>See how it works</span>
              </a>
            </div>

            {/* Trust Line */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-mint-600" />
              <span>{SITE_CONFIG.trustLine}</span>
            </div>
          </div>

          {/* Right Column: Subtle 3D Logo with Clutter to Cleanup Story */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <HeroLogo3D />
          </div>

        </div>

        {/* Trust Strip below Hero */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-soft/60 dark:bg-surface-darkSurface/50 border border-slate-100 dark:border-slate-800/40">
            <Cpu className="w-5 h-5 text-mint-600 dark:text-mint-400 mb-1.5" />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Native macOS</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Pure Swift & SwiftUI</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-soft/60 dark:bg-surface-darkSurface/50 border border-slate-100 dark:border-slate-800/40">
            <ShieldCheck className="w-5 h-5 text-mint-600 dark:text-mint-400 mb-1.5" />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Privacy-Focused</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">100% Local · No Telemetry</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-soft/60 dark:bg-surface-darkSurface/50 border border-slate-100 dark:border-slate-800/40">
            <HardDrive className="w-5 h-5 text-mint-600 dark:text-mint-400 mb-1.5" />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Safe Cleanup Guard</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Protected System Allowlist</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-soft/60 dark:bg-surface-darkSurface/50 border border-slate-100 dark:border-slate-800/40">
            <Sparkles className="w-5 h-5 text-mint-600 dark:text-mint-400 mb-1.5" />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">macOS 14+</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Sonoma & Sequoia Ready</span>
          </div>
        </div>

      </div>
    </section>
  );
};
