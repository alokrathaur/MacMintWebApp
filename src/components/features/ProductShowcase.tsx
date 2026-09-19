import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
} from "lucide-react";

interface ShowcaseFeature {
  id: string;
  tag: string;
  headline: string;
  description: string;
  bullets: string[];
  screenshot: string;
  sunburstScreenshot?: string;
  badge: string;
  reverse?: boolean;
  video?: {
    src: string;
    title: string;
    duration: string;
  };
}

const features: ShowcaseFeature[] = [
  {
    id: "disk-space",
    tag: "DISK SPACE ANALYSIS",
    headline: "See your entire disk as one interactive map.",
    description:
      "Switch between a color-coded Treemap and a multi-ring Sunburst to instantly spot which folders and massive files are eating your storage — including VMware virtual disks (.vmwarevm, .vmdk), Docker containers, and media libraries — then drill down without ever opening Finder.",
    bullets: [
      "Treemap and Sunburst views — switch instantly",
      "Scans massive virtual machine disks: VMware Fusion (.vmwarevm, .vmdk), Docker layers, UTM, and Parallels",
      "Live folder sizes down to the file, with one-click drill-down",
      "One-click Rescan keeps the map in sync with your disk",
      "Largest Files across the whole volume in one sortable list",
    ],
    screenshot: "/assets/screenshots/05_disk_space.png",
    sunburstScreenshot: "/assets/screenshots/02_disk_space_sunburst.png",
    badge: "Treemap + Sunburst",
    video: {
      src: "/assets/videos/disk_space.mp4",
      title: "Disk Space Analysis Demo",
      duration: "0:58",
    },
  },
  {
    id: "system-health",
    tag: "LIVE SYSTEM HEALTH",
    headline: "Your Mac's vitals, at a glance.",
    description:
      "A real-time dashboard for CPU load and temperature, memory pressure, GPU usage, battery health, network throughput, and thermal state — plus the running apps and processes behind them.",
    bullets: [
      "CPU, GPU, memory, battery, network, and thermal in one view",
      "Running Applications and Top Processes with one-click Quit",
      "One-tap Quick Clean the moment things start feeling busy",
      "Zero third-party monitoring services — 100% on-device",
    ],
    screenshot: "/assets/screenshots/system_health.png",
    badge: "Real-Time Monitor",
    reverse: true,
  },
  {
    id: "deep-clean",
    tag: "7-CATEGORY DEEP CLEANUP & DEVELOPER SUITE",
    headline: "Clean what you don't need across 7 categories.",
    description:
      "Inspect and safely eliminate redundant caches, logs, browser data, and developer build artifacts. MacMint 1.0.3 features a single direct 'Scan Mac' engine that scans your whole disk and external volumes, organizing clutter into 7 clear categories with 40+ specialized cleanup targets.",
    bullets: [
      "7 Dedicated Categories: User Junk, Developer Files, App Junk, Browser Cache, Editor Cache, System Junk, and VM Data",
      "VMware & Virtual Disks: Scans VMware Fusion (.vmwarevm, .vmdk), Docker VM layers, Android AVD, UTM, and VirtualBox",
      "Developer & AI Tooling: Xcode, Simulator runtimes, Expo, Playwright, Claude AI CLI, Hugging Face ML, Swift PM, npm & pnpm",
      "Modern Code Editors: Antigravity, Cursor, VS Code & ShipIt, Sublime Text, JetBrains IDEs, and Zed",
      "Interactive Review: Compact cards with top-right watermarks, tap-to-review, and 330pt wide non-truncating subcategory sidebar",
    ],
    screenshot: "/assets/screenshots/01_deep_cleanup.png",
    badge: "7 Categories • 40+ Targets",
    video: {
      src: "/assets/videos/deep_clean.mp4",
      title: "Deep Cleanup Demo",
      duration: "1:38",
    },
  },
  {
    id: "system-data",
    tag: "SYSTEM DATA RECLAIM",
    headline: "Demystify and reclaim the 'System Data' bar.",
    description:
      "macOS Storage often displays dozens of gigabytes categorized vaguely as 'System Data'. MacMint cuts through the fog by targeting sandboxed app containers, group caches, and obsolete simulator runtimes that ordinary cleaners miss.",
    bullets: [
      "Full visibility into ~/Library/Containers and Group Containers",
      "Safe cleanup with immediate storage verification down to 0 MB",
      "Requires Full Disk Access for transparent, authorized access",
      "Never touches keychain credentials, bookmarks, or personal documents",
    ],
    screenshot: "/assets/screenshots/02_system_data.png",
    badge: "Container Hunter",
    reverse: true,
  },
  {
    id: "large-files",
    tag: "LARGE & FORGOTTEN FILES",
    headline: "Find the files that actually matter.",
    description:
      "Quickly sort through gigabytes of forgotten installers, high-res video renders, VM disks, and ZIP archives. Filter by size and age to free up substantial storage in seconds.",
    bullets: [
      "Size filters: >1 GB, >500 MB, >100 MB, and custom thresholds",
      "Categorized by Videos, Archives, Disk Images, Documents, and Others",
      "Integrated macOS Quick Look preview (Space bar) and Reveal in Finder",
      "Clear safety labels with 'Review recommended' protections",
    ],
    screenshot: "/assets/screenshots/03_large_files.png",
    badge: "Quick Look Support",
  },
  {
    id: "duplicate-files",
    tag: "DUPLICATE FILE FINDER",
    headline: "Find duplicates without guessing.",
    description:
      "Eliminate redundant files safely. MacMint pairs instant file size grouping with cryptographic SHA-256 content verification to guarantee byte-for-byte matches before suggesting cleanups.",
    bullets: [
      "Cryptographic SHA-256 verification prevents accidental deletions",
      "Smart-select rules: Auto-select newest, oldest, or keep originals",
      "Side-by-side path comparisons and Quick Look preview",
      "No guessing, no risk of corrupting unique files",
    ],
    screenshot: "/assets/screenshots/04_duplicate_files.png",
    badge: "SHA-256 Verified",
    reverse: true,
  },
  {
    id: "app-uninstaller",
    tag: "APP UNINSTALLER",
    headline: "Uninstall apps completely with zero leftovers.",
    description:
      "Dragging an app to the Trash leaves behind hundreds of megabytes in Application Support, Caches, Preferences, WebKit databases, and LaunchAgents. MacMint hunts down all associated files for thorough removal.",
    bullets: [
      "Discovers deep hidden caches in ~/Library and system domains",
      "Calculates true total disk impact across all linked directories",
      "Safely disables associated background agents and helpers",
      "Displays individual associated files before you confirm removal",
    ],
    screenshot: "/assets/screenshots/06_app_uninstaller.png",
    badge: "Zero Leftovers",
    video: {
      src: "/assets/videos/uninstall_apps.mp4",
      title: "App Uninstaller Demo",
      duration: "1:00",
    },
  },
  {
    id: "optimizations",
    tag: "SYSTEM TOOLS & OPTIMIZATION",
    headline: "Make macOS work the way you want.",
    description:
      "One-click maintenance routines to keep your Mac running as smoothly as day one. Purge inactive memory back to the macOS pool, flush DNS lookups, re-index Spotlight, and manage startup daemons.",
    bullets: [
      "Purge inactive RAM with a single click",
      "Flush stale DNS cache entries and restart mDNSResponder safely",
      "Re-index sluggish Spotlight search databases with mdutil",
      "Control user and system LaunchAgents without touching Terminal",
    ],
    screenshot: "/assets/screenshots/08_system_optimization.png",
    badge: "One-Click Maintenance",
    reverse: true,
    video: {
      src: "/assets/videos/system_optimizer.mp4",
      title: "System Optimizer Demo",
      duration: "0:59",
    },
  },
];

// All available screenshots for full lightbox gallery navigation, in priority order
const allGalleryScreenshots = [
  { src: "/assets/screenshots/02_disk_space_sunburst.png", title: "Disk Space Analysis (Sunburst Map)", badge: "Radial View" },
  { src: "/assets/screenshots/05_disk_space.png", title: "Disk Space Analysis (Treemap)", badge: "Interactive Map" },
  { src: "/assets/screenshots/system_health.png", title: "Live System Health Dashboard", badge: "Real-Time Monitor" },
  { src: "/assets/screenshots/01_deep_cleanup.png", title: "Deep Cleanup", badge: "7 Categories" },
  { src: "/assets/screenshots/02_system_data.png", title: "System Data Reclaim", badge: "Container Hunter" },
  { src: "/assets/screenshots/03_large_files.png", title: "Large & Forgotten Files", badge: "Quick Look" },
  { src: "/assets/screenshots/04_duplicate_files.png", title: "Duplicate Files Finder", badge: "SHA-256" },
  { src: "/assets/screenshots/06_app_uninstaller.png", title: "App Uninstaller & Leftovers", badge: "Zero Leftovers" },
  { src: "/assets/screenshots/07_startup_items.png", title: "Startup Items & LaunchAgents", badge: "Boot Optimization" },
  { src: "/assets/screenshots/08_system_optimization.png", title: "System Optimizations & Maintenance", badge: "One-Click" },
  { src: "/assets/screenshots/09_operation_history.png", title: "Operation History & Audit Log", badge: "Local Audit" },
  { src: "/assets/screenshots/10_settings.png", title: "Settings & Custom Exclusions", badge: "Configurable" },
];

export const ProductShowcase: React.FC = () => {
  // Disk space view switcher state (Sunburst vs Treemap)
  const [diskMapTab, setDiskMapTab] = useState<"sunburst" | "treemap">("sunburst");
  // Lightbox modal state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  // Video modal state
  const [activeVideoModal, setActiveVideoModal] = useState<{
    src: string;
    title: string;
    duration: string;
  } | null>(null);

  const openLightbox = (screenshotSrc: string) => {
    const idx = allGalleryScreenshots.findIndex((s) => s.src === screenshotSrc);
    setActiveLightboxIndex(idx !== -1 ? idx : 0);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % allGalleryScreenshots.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + allGalleryScreenshots.length) % allGalleryScreenshots.length
      );
    }
  };

  // Keyboard navigation for Lightbox & Video Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        setActiveVideoModal(null);
      }
      if (activeLightboxIndex === null) return;
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, activeVideoModal]);

  return (
    <section id="showcase" className="py-20 md:py-28 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {features.map((feat) => (
          <div
            key={feat.id}
            id={feat.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center scroll-mt-24 ${
              feat.reverse ? "lg:grid-flow-dense" : ""
            }`}
          >
            {/* Text Information Column */}
            <div
              className={`lg:col-span-5 space-y-6 ${
                feat.reverse ? "lg:col-start-8" : ""
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200/80 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider">
                <span>{feat.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {feat.headline}
              </h3>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {feat.description}
              </p>

              <ul className="space-y-3 pt-2">
                {feat.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Clickable Screenshot Display Column */}
            <div
              className={`lg:col-span-7 ${
                feat.reverse ? "lg:col-start-1" : ""
              }`}
            >
              {/* View Switcher Tabs for Disk Space (Sunburst vs Treemap) */}
              {feat.sunburstScreenshot && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-surface-darkCard border border-slate-200/80 dark:border-slate-800 shadow-sm w-fit mb-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDiskMapTab("sunburst");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      diskMapTab === "sunburst"
                        ? "bg-mint-600 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Sunburst Map
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDiskMapTab("treemap");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      diskMapTab === "treemap"
                        ? "bg-mint-600 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Treemap View
                  </button>
                </div>
              )}

              <div
                onClick={() =>
                  openLightbox(
                    feat.id === "disk-space" && diskMapTab === "sunburst" && feat.sunburstScreenshot
                      ? feat.sunburstScreenshot
                      : feat.screenshot
                  )
                }
                className="relative group cursor-zoom-in rounded-2xl md:rounded-3xl p-1.5 md:p-2 bg-gradient-to-b from-slate-200/70 via-slate-100 to-slate-200/70 dark:from-slate-800 dark:via-surface-darkSurface dark:to-slate-800 shadow-2xl shadow-slate-200/70 dark:shadow-none border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-mint-700/15 hover:border-mint-400 dark:hover:border-mint-600"
              >
                {/* Real crisp native MacMint screenshot */}
                <div className="overflow-hidden rounded-xl md:rounded-2xl bg-surface-dark relative">
                  <img
                    src={
                      feat.id === "disk-space" && diskMapTab === "sunburst" && feat.sunburstScreenshot
                        ? feat.sunburstScreenshot
                        : feat.screenshot
                    }
                    alt={feat.headline}
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.015]"
                    loading="lazy"
                  />

                  {/* Hover Fullscreen Prompt Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-white/95 dark:bg-surface-darkSurface/95 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-mint-600" />
                      <span>Click to view full screen</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white/90 dark:bg-surface-darkSurface/90 border border-slate-200/80 dark:border-slate-700 shadow-md backdrop-blur-md text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {feat.id === "disk-space" ? (diskMapTab === "sunburst" ? "Sunburst Map" : "Treemap View") : feat.badge}
                </div>
              </div>
            </div>

          </div>
        ))}

      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL WITH LEFT / RIGHT NAVIGATION & CLOSE BUTTON */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Bar: Title & Close Button */}
          <div
            className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-mint-500/20 text-mint-300 border border-mint-500/30">
                {allGalleryScreenshots[activeLightboxIndex].badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {allGalleryScreenshots[activeLightboxIndex].title}
              </h4>
            </div>

            <button
              onClick={closeLightbox}
              aria-label="Close full screen view"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            aria-label="Previous screenshot"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/10 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            aria-label="Next screenshot"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/10 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Full-Screen Image Container */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allGalleryScreenshots[activeLightboxIndex].src}
              alt={allGalleryScreenshots[activeLightboxIndex].title}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Bottom Counter Bar */}
          <div
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs text-white/80 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              {activeLightboxIndex + 1} of {allGalleryScreenshots.length}
            </span>
            <span>•</span>
            <span className="hidden sm:inline text-white/60">
              Use ← / → keys to navigate, Esc to close
            </span>
          </div>
        </div>
      )}

      {/* DIRECT VIDEO PLAYER LIGHTBOX MODAL */}
      {activeVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* macOS Window Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/95 border-b border-slate-800 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block" />
                <span className="ml-2 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
                  MacMint · {activeVideoModal.title}
                  <span className="text-slate-500 font-normal">({activeVideoModal.duration})</span>
                </span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                aria-label="Close video player"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Direct HTML5 Video Player */}
            <div className="relative aspect-[1952/1510] max-h-[75vh] w-full bg-black flex items-center justify-center">
              <video
                key={activeVideoModal.src}
                src={activeVideoModal.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
