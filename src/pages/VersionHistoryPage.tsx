import React from "react";
import {
  CheckCircle2,
  Sparkles,
  Download,
  ShieldCheck,
  Terminal,
  Cpu,
  HardDrive,
  ArrowRight,
  ExternalLink,
  Zap,
  Lock,
  Layers,
  Clock
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface VersionHistoryPageProps {
  onNavigate?: (path: string) => void;
}

export const VersionHistoryPage: React.FC<VersionHistoryPageProps> = ({ onNavigate }) => {
  const versions = [
    {
      version: "1.0.3",
      badge: "Latest and Stable Release",
      badgeType: "latest",
      date: "September 19, 2026",
      title: "Comprehensive 7-Category Deep Clean, Direct Whole-Disk Scanning & Next-Gen Editor/Developer Cleaners",
      summary: "MacMint 1.0.3 introduces massive expansions across all 7 Deep Cleanup categories with 40+ specialized targets (including Antigravity, Cursor, Expo, Playwright, Claude AI CLI, and Hugging Face ML models), direct single-click whole-disk and external volume scanning, compact responsive category cards with top-right watermarks, and a wide subcategory review sidebar with zero text truncation.",
      downloadAvailable: true,
      downloadUrl: "/MacMint.dmg",
      downloadFileName: "MacMint.dmg",
      features: [
        {
          title: "Comprehensive 7-Category Deep Clean Expansion",
          desc: "Systematically expanded all 7 categories (User Junk, Developer Files, App Junk, Browser Cache, Editor Cache, System Junk, VM Data) with over 40 dedicated cleanup targets while strictly preserving all existing locations."
        },
        {
          title: "Single Direct 'Scan Mac' Engine",
          desc: "Simplified scanning by replacing multi-step dropdowns with a single, direct 'Scan Mac' button. Automatically scans the entire startup volume and all mounted external volumes in parallel (matching Disk Utility behavior)."
        },
        {
          title: "Next-Gen Code Editor & AI Tooling Caches",
          desc: "Added dedicated support for Antigravity editor caches (GPUCache, DawnGraphite, DawnWebGPU, Code Cache), Cursor editor, VS Code & ShipIt, Sublime Text, JetBrains IDEs, and Zed editor."
        },
        {
          title: "Modern Developer Ecosystem Cleaners",
          desc: "Added specialized targets for Expo Go/simulator caches, Playwright browser binaries, AI CLI versions (Claude), Swift Package Manager manifests, Hugging Face ML model weights, npm/pnpm caches, Ruby gems, Cargo crates, Gradle builds, Python pip/uv, and Homebrew bottles."
        },
        {
          title: "macOS System Telemetry & Power Log Reclaim",
          desc: "Added safe targets for system diagnostic pipelines (/private/var/db/DiagnosticPipeline), diagnostic reports (/Library/Logs/DiagnosticReports), system power logs (/private/var/db/powerlog), and ColorSync system caches."
        },
        {
          title: "Virtual Machine & Container Hunters",
          desc: "Identifies and safely cleans Docker Desktop VM layers and buildx caches, Colima and Podman container storage, Android Virtual Devices (AVD), VMware Fusion virtual machines (.vmwarevm), UTM, VirtualBox, and Parallels VMs."
        },
        {
          title: "Compact 14-Inch Display Responsive Layout",
          desc: "Redesigned category cards with a compact 125pt height so all 3 grid rows fit comfortably on 14-inch MacBook screens (such as M1/M2/M3) without vertical scrolling. Tapping anywhere inside the box immediately opens the review screen."
        },
        {
          title: "Top-Right Watermark & Non-Truncating Sidebar",
          desc: "Moved background watermark icons to the top-right to prevent overlap with badge icons, and widened the review sidebar to 330pt with multi-line text wrapping so long subcategory names are fully visible without ellipsis."
        },
        {
          title: "System Health, Running Applications & Live Process Manager",
          desc: "Introduced real-time CPU utilization, RAM allocation, memory pressure gauge, and disk I/O monitoring. Added a dedicated Running Applications list and Process Manager with single-click process termination and MacMint self-protection safeguards."
        }
      ]
    },
    {
      version: "1.0.2",
      badge: "Previous Stable Release",
      badgeType: "stable",
      date: "September 16, 2026",
      title: "macOS 27 Full Disk Access Support, Finder Batch Deletion & Orphaned Xcode / Simulator Cleaners",
      summary: "This update introduces complete compatibility with macOS 27 and macOS 15 Sequoia Full Disk Access detection, reactive permission syncing, Finder batch operations for deleting Xcode simulator files and leftover residues after Xcode uninstall, and extensive developer cache cleaners.",
      downloadAvailable: true,
      downloadUrl: "/MacMint.dmg",
      downloadFileName: "MacMint.dmg",
      features: [
        {
          title: "Global Storage Reclaimed Tracking",
          desc: "Added global telemetry tracking to measure the total storage reclaimed by MacMint users worldwide. Storage cleanup activity is now aggregated to provide a global view of space reclaimed across Mac devices. No personal files or file contents are collected as part of this tracking."
        },
        {
          title: "Finder Batch Deletion for Xcode Simulator & Uninstalled Leftovers",
          desc: "Implemented a unified Finder batch operation via Apple Events for privileged developer paths. Safely and completely removes multi-gigabyte Xcode simulator runtimes, device caches, and orphaned residues left after Xcode uninstallation in a single, prompt-free operation."
        },
        {
          title: "Multi-Probe Full Disk Access Engine (macOS 27 & Earlier)",
          desc: "Implemented a non-blocking multi-layered probe checking ~/Library/Safari, sandboxed containers (~/Library/Containers/com.apple.stocks, ~/Library/Containers/com.apple.Home), ~/Library/Mail, ~/Library/Messages, System TCC, and Time Machine preferences. Works seamlessly across macOS 14 Sonoma, macOS 15 Sequoia, and macOS 27 without kernel hangs."
        },
        {
          title: "Instant Reactive Permission Sync",
          desc: "Integrated NSApplication.didBecomeActiveNotification listener. When toggling Full Disk Access in macOS System Settings and switching back to MacMint, the permission state refreshes automatically and dismisses warning banners without requiring manual app relaunch."
        },
        {
          title: "Deep Simulator Runtimes & Devices Cleaner",
          desc: "Added dedicated targets in Deep Cleanup for /Library/Developer/CoreSimulator, ~/Library/Developer/CoreSimulator, ~/Library/Developer/CoreDevice, and XCTestDevices. Allows users to safely recover 3 GB to 20+ GB of orphaned dyld shared caches and device images left behind after Xcode removal."
        },
        {
          title: "Xcode User Data & Coding Assistant Residual Cleaner",
          desc: "Targets leftover Xcode caches, CodingAssistant models (550+ MB), documentation caches, user settings, and indexing databases in ~/Library/Developer/Xcode, ~/Library/Application Support/Xcode, and ~/Library/Caches/com.apple.dt.Xcode."
        },
        {
          title: "Developer Disk Images & Frameworks Cleaner",
          desc: "Identifies and safely cleans legacy physical device disk images and developer support frameworks in /Library/Developer/DeveloperDiskImages, DeviceKit, PrivateFrameworks, and system CoreDevice (~300+ MB)."
        },
        {
          title: "App Uninstaller: Orphaned Xcode Leftovers Hunter",
          desc: "When Xcode.app is no longer in /Applications, the App Uninstaller automatically detects leftover developer residues and presents an 'Xcode (Leftover Residue)' entry with an itemized breakdown for 1-click removal."
        },
        {
          title: "Safe Privileged Removal & SIP Resilience",
          desc: "CleanerGuard allowlist strictly permits developer cleanup targets while firmly protecting CommandLineTools. Root-owned developer folders escalate via native macOS administrator authentication, with recursive fallback ensuring SIP-locked cryptex mounts do not halt the cleaning of unlocked multi-gigabyte cache directories."
        }
      ]
    },
    {
      version: "1.0.1",
      badge: "",
      badgeType: "previous",
      date: "September 12, 2026",
      title: "StoreKit 2 Mac App Store Licensing, Live Traffic Analytics & Dark Mode Polish",
      summary: "Introduced native StoreKit 2 subscriptions for the Mac App Store, offline cryptographic license key activation, global live traffic tracking, and refined dark mode aesthetics.",
      downloadAvailable: false,
      features: [
        {
          title: "StoreKit 2 & Offline License System",
          desc: "Native in-app purchase support for Mac App Store (MAS), monthly/yearly Pro upgrades, and cryptographically signed offline license key activation for direct-distribution customers."
        },
        {
          title: "Live Global Traffic & Device Analytics",
          desc: "Real-time country-level visit analytics with ISO flag icons, daily/monthly/yearly live trend metrics, and privacy-preserving presence beacon."
        },
        {
          title: "System Optimization Suite",
          desc: "Added RAM purging, DNS cache flushing, Spotlight re-indexing, startup item manager, and launch agent toggling."
        },
        {
          title: "Refined Dark Mode & Glassmorphism Design",
          desc: "Overhauled interface with rich dark mode tokens, subtle borders, interactive hover states, and smooth spring animations."
        }
      ]
    },
    {
      version: "1.0.0",
      badge: "Initial Release",
      badgeType: "initial",
      date: "September 08, 2026",
      title: "Foundation of MacMint — Safe, Transparent macOS System Cleaner",
      summary: "The inaugural release of MacMint, built specifically for modern macOS (macOS 14 Sonoma, macOS 15 Sequoia, and beyond) with safety-first design principles.",
      downloadAvailable: false,
      features: [
        {
          title: "Deep Cleanup Engine (8 Core Categories)",
          desc: "Scans User Caches, Application Logs, Trash, Browser Data, Developer Project Build Artifacts (node_modules, .next, .turbo), and Xcode DerivedData."
        },
        {
          title: "Strict Cleaner Guard Allowlist",
          desc: "Hardcoded filesystem barrier that refuses any deletion request targeting personal documents, system binaries, or core macOS directories."
        },
        {
          title: "Interactive Sunburst Disk Map",
          desc: "High-performance D3/Canvas hierarchical visualizer displaying disk space consumption by folder depth and file weight."
        },
        {
          title: "Duplicate & Large File Hunters",
          desc: "Quickly locates duplicate files using SHA-256 hashing and categorizes files larger than 100 MB, 500 MB, and 1 GB with QuickLook and Finder reveal."
        }
      ]
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint-500/10 text-mint-700 dark:text-mint-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-mint-500/20">
          <Clock className="w-3.5 h-3.5" />
          <span>Release Notes & Changelog</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
          Version History
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          Explore every feature, platform update, and performance enhancement introduced across MacMint releases.
        </p>

        {/* Quick Jump Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
          <span className="text-slate-400 mr-1">Quick Jump:</span>
          {versions.map((v) => (
            <a
              key={v.version}
              href={`#v${v.version.replace(/\./g, "-")}`}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-surface-darkSurface hover:bg-mint-50 dark:hover:bg-mint-950/30 hover:text-mint-600 dark:hover:text-mint-400 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200/60 dark:border-slate-800"
            >
              v{v.version} {v.badgeType === "latest" ? "(Latest & Stable)" : ""}
            </a>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-16">
        {versions.map((ver) => {
          const anchorId = `v${ver.version.replace(/\./g, "-")}`;
          const isLatest = ver.badgeType === "latest";

          return (
            <div key={ver.version} id={anchorId} className="relative scroll-mt-28">
              {/* Timeline Marker Icon */}
              <div
                className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ${isLatest
                    ? "bg-mint-500 text-white ring-mint-500/20 shadow-lg shadow-mint-500/30"
                    : "bg-slate-300 dark:bg-slate-700 text-white ring-slate-100 dark:ring-surface-dark"
                  }`}
              >
                {isLatest ? <Zap className="w-3 h-3" /> : <div className="w-2 h-2 rounded-full bg-white" />}
              </div>

              {/* Version Card Container */}
              <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${isLatest
                  ? "bg-white dark:bg-surface-darkSurface border-mint-500/30 shadow-xl shadow-mint-500/5 ring-1 ring-mint-500/10"
                  : "bg-surface-soft dark:bg-surface-darkSurface/60 border-slate-200/80 dark:border-slate-800 shadow-sm"
                }`}>
                {/* Version Header Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
                      v{ver.version}
                    </h2>

                    {ver.badge && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isLatest
                          ? "bg-mint-500 text-white shadow-sm shadow-mint-600/30"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}>
                        {ver.badge}
                      </span>
                    )}

                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      • {ver.date}
                    </span>
                  </div>

                  {ver.downloadAvailable && (
                    <a
                      href={ver.downloadUrl || SITE_CONFIG.directDmgUrl}
                      download={ver.downloadFileName || "MacMint.dmg"}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs shadow-md transition-all active:scale-[0.98] w-fit ${isLatest
                          ? "bg-mint-600 hover:bg-mint-700 text-white shadow-mint-700/20"
                          : "bg-slate-100 dark:bg-surface-darkSurface hover:bg-slate-200 dark:hover:bg-surface-darkCard text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-sm"
                        }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download v{ver.version} (.dmg)</span>
                    </a>
                  )}
                </div>

                {/* Subtitle & Summary */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {ver.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {ver.summary}
                  </p>
                </div>

                {/* Section: Implemented Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mint-700 dark:text-mint-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Implemented Features & Capabilities</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {ver.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-4 rounded-2xl bg-white/70 dark:bg-surface-darkCard/50 border border-slate-200/60 dark:border-slate-800/80 space-y-1"
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {feat.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                              {feat.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Card */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-mint-600 to-mint-700 text-white text-center shadow-xl shadow-mint-700/20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <ShieldCheck className="w-10 h-10 mx-auto text-mint-200" />
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Keep your Mac running at peak speed
          </h3>
          <p className="text-sm sm:text-base text-mint-100 leading-relaxed font-normal">
            Download the latest universal release (v{SITE_CONFIG.appVersion}) for macOS 14 Sonoma, macOS 15 Sequoia, and macOS 27.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={SITE_CONFIG.directDmgUrl}
              download="MacMint.dmg"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-mint-800 hover:bg-mint-50 font-bold text-base shadow-lg transition-all active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              <span>Download MacMint v{SITE_CONFIG.appVersion} (.dmg)</span>
            </a>
            <button
              onClick={() => {
                onNavigate?.("/pricing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-mint-800/40 hover:bg-mint-800/60 text-white font-semibold text-base transition-all active:scale-[0.98] border border-white/20"
            >
              <span>View Pro Features</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
