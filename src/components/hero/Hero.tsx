import React, { useEffect, useRef, useState } from "react";
import { Download, PlayCircle, ShieldCheck, Cpu, HardDrive, Sparkles, Volume2, VolumeX } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Always start muted so video autoplays reliably across page reloads.
    // Audio stays muted until the user manually toggles the button.
    video.muted = true;
    setIsMuted(true);
    video.play().catch(() => {
      /* Autoplay fallback if blocked by browser policy */
    });
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) {
      video.play().catch(() => {});
    }
  };

  return (
    <section className="relative pt-8 pb-10 md:pt-10 md:pb-14 overflow-hidden bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      {/* Background Ambient Mint Glow (Extremely subtle, light-first) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-mint-50/80 via-surface-soft/40 to-transparent dark:from-mint-950/20 dark:via-surface-dark/10 pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Left Column: Headline, Copy & CTAs */}
          <div className="flex flex-col items-start text-left space-y-3.5">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200/70 dark:border-mint-800/40 text-mint-700 dark:text-mint-300 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-mint-500" />
              <span>MAC CLEANUP, SIMPLIFIED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.15]">
              Storage Cleaner & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-600 via-mint-500 to-mint-400">
                Optimizer.
              </span>
            </h1>

            {/* Core Message & Additional Description */}
            <div className="space-y-2 max-w-xl">
              <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200 leading-snug">
                {SITE_CONFIG.coreMessage}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {SITE_CONFIG.subheading}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onNavigate?.("/download");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-sm shadow-lg shadow-mint-700/20 hover:shadow-mint-700/30 transition-all duration-200 active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download MacMint</span>
              </button>

              <a
                href="#smart-space"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-surface-darkSurface hover:bg-slate-50 dark:hover:bg-surface-darkCard text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-200 hover:border-slate-300 active:scale-[0.98]"
              >
                <PlayCircle className="w-4 h-4 text-mint-600 dark:text-mint-400" />
                <span>See how it works</span>
              </a>
            </div>

            {/* Trust Line */}
            <div className="pt-0.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-mint-600" />
              <span>{SITE_CONFIG.trustLine}</span>
            </div>
          </div>

          {/* Right Column: Autoplaying Product Demo Video */}
          <div className="flex justify-center lg:justify-end items-center w-full">
            <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden shadow-xl shadow-slate-900/10 dark:shadow-black/30 border border-slate-200/70 dark:border-slate-800 bg-black">
              <video
                ref={videoRef}
                src="/assets/hero-demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                className="w-full h-full object-cover"
              />
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                style={{ right: "6.33%", bottom: "20.28%", transform: "translate(50%, 50%)" }}
                className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-700 hover:bg-slate-800 text-white shadow-lg border-2 border-blue-500 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20"
              >
                {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

        </div>

        {/* Trust Strip below Hero */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-soft/60 dark:bg-surface-darkSurface/50 border border-slate-100 dark:border-slate-800/40">
            <Cpu className="w-4 h-4 text-mint-600 dark:text-mint-400 mb-1" />
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Native macOS</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Pure Swift & SwiftUI</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-soft/60 dark:bg-surface-darkSurface/50 border border-slate-100 dark:border-slate-800/40">
            <ShieldCheck className="w-4 h-4 text-mint-600 dark:text-mint-400 mb-1" />
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Privacy-Focused</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">100% Local · No Telemetry</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-soft/60 dark:bg-surface-darkSurface/50 border border-slate-100 dark:border-slate-800/40">
            <HardDrive className="w-4 h-4 text-mint-600 dark:text-mint-400 mb-1" />
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Safe Cleanup Guard</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Protected System Allowlist</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-soft/60 dark:bg-surface-darkSurface/50 border border-slate-100 dark:border-slate-800/40">
            <Sparkles className="w-4 h-4 text-mint-600 dark:text-mint-400 mb-1" />
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">macOS 14+</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Sonoma & Sequoia Ready</span>
          </div>
        </div>

      </div>
    </section>
  );
};
