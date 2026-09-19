import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What is MacMint?",
    answer:
      "MacMint is a native macOS application built with Swift and SwiftUI designed to reclaim gigabytes of storage space, analyze disk usage with an interactive Sunburst Map, detect duplicates with SHA-256 verification, clean 7 comprehensive categories of caches and developer artifacts, and uninstall applications without leaving leftover container clutter.",
  },
  {
    question: "What categories does Deep Cleanup cover in v1.0.3?",
    answer:
      "MacMint 1.0.3 organizes cleanup across 7 distinct categories with over 40 specialized targets: User Junk (personal caches, logs, trash, Siri suggestions, AddressBook & Apple ID caches), Developer Files (Xcode, Simulator runtimes, Expo, Playwright, Swift PM, ML models, npm, pnpm, Cargo, Gradle, pip, brew), App Junk (Spotify, WhatsApp, Zoom, Telegram, GitHub Desktop, Codex CLI, Slack, Teams, Discord, Steam), Browser Cache (Chrome, Safari, Firefox, Arc, Brave, Edge, Puppeteer, Google Updater), Editor Cache (Antigravity, Cursor, VS Code, Sublime Text, JetBrains, Zed), System Junk (System Diagnostic Pipeline, Diagnostic Reports, Power Logs, ColorSync, inactive system caches), and VM Data (Docker Desktop, Colima, Podman, Android AVD, VMware Fusion .vmwarevm, UTM, VirtualBox, Parallels).",
  },
  {
    question: "How does the 'Scan Mac' button work?",
    answer:
      "MacMint features a direct, single-click 'Scan Mac' engine. When clicked, it scans your entire boot disk as well as all connected external volumes and mounted drives (matching Disk Utility behavior) in parallel, uncovering hidden caches, build outputs, and orphaned simulator files across all drives.",
  },
  {
    question: "Which developer tools and package managers does MacMint support?",
    answer:
      "MacMint provides the industry's most thorough developer cleanup: Xcode DerivedData, legacy iOS/watchOS/tvOS Simulator runtimes, Expo Go & simulator bundles, Playwright browser binaries (Chromium, WebKit, Firefox), AI CLI tool versions (Claude), Swift Package Manager manifests, Hugging Face ML model weights, npm/npx logs & prebuilds, pnpm stores, Ruby gems & Bundler, Rust Cargo registries, Gradle build caches, Python pip & uv bytecode, and Homebrew bottle downloads.",
  },
  {
    question: "Which code editors and IDEs are cleaned?",
    answer:
      "MacMint includes dedicated support for modern AI-assisted and traditional code editors: Antigravity (GPUCache, DawnGraphite, DawnWebGPU, Code Cache), Cursor (Cache_Data, DawnGraphite, GPUCache), VS Code & ShipIt, Sublime Text, JetBrains IDEs (IntelliJ, WebStorm, PyCharm, Android Studio), and Zed editor.",
  },
  {
    question: "How does MacMint handle Virtual Machines and Containers?",
    answer:
      "Virtual machine disks and container layers often consume 50+ GB of invisible storage. MacMint inspects Docker Desktop VM layers and buildx caches, Colima and Podman container storage, Android Virtual Devices (AVD), VMware Fusion virtual machines (.vmwarevm bundles), UTM documents, VirtualBox VMs, and Parallels disks with safe, optional cleanup.",
  },
  {
    question: "How do the live stats and 'clean refresh' telemetry work?",
    answer:
      "MacMint features privacy-preserving, anonymous telemetry. When users perform a cleanup or scan in the Mac app, aggregate metrics (bytes reclaimed and cleanup count) are transmitted securely to our Cloudflare D1 edge database. The live stats page on the website updates automatically every 12 seconds with real, verified storage reclaimed by users worldwide without collecting any personal data or file paths.",
  },
  {
    question: "Can I review files before deleting them?",
    answer:
      "Yes, always. Every category card is interactive—simply tap anywhere inside the box to open the full review screen. The review sidebar is 330pt wide with multi-line text wrapping so no subcategory names are truncated. You can inspect individual file paths, verify exact byte sizes, toggle item selections, and execute batch deletions with automatic Finder fallback for cryptex-protected files.",
  },
  {
    question: "Is MacMint safe to use? Does it delete personal files?",
    answer:
      "MacMint is 100% safe. All deletions pass through CleanerGuard—an immutable, hardcoded allow-list that strictly restricts operations to designated cache, log, and temporary build artifact paths. MacMint will never touch or delete personal documents, desktop files, photos, music, Downloads, or password keychains.",
  },
  {
    question: "Does MacMint require Full Disk Access?",
    answer:
      "Basic user caches and logs can be cleaned without Full Disk Access. However, scanning sandboxed app containers (~/Library/Containers), System Data caches, and diagnostic logs requires Full Disk Access. MacMint includes reactive permission detection—when you toggle Full Disk Access in macOS System Settings and return to MacMint, the permission state updates instantly without requiring an app relaunch.",
  },
  {
    question: "Does MacMint uninstall applications completely?",
    answer:
      "Yes. When you remove an application, MacMint locates and deletes linked Application Support directories, sandbox containers, preference plists, WebKit storage, and background LaunchAgents. It even detects orphaned leftovers from apps you previously uninstalled (such as leftover Xcode developer data).",
  },
  {
    question: "Does MacMint work on Apple Silicon and Intel Macs?",
    answer:
      "Yes. MacMint is compiled as a Universal macOS binary running natively on Apple Silicon (M1, M2, M3, M4) and 64-bit Intel Macs on macOS 14.0 (Sonoma) and macOS 15.0 (Sequoia).",
  },
  {
    question: "How does the System Health and Process Manager feature work?",
    answer:
      "MacMint monitors real-time CPU utilization, physical RAM allocation, memory pressure, and disk throughput every 2 seconds. A dedicated Running Applications and Process Manager view allows you to inspect all active user applications and background processes with their PID and memory consumption, and safely quit or force-quit hanging tasks. Immutable safeguards protect MacMint itself and core system services from accidental termination.",
  },
  {
    question: "What is included in the Lifetime license?",
    answer:
      "The Lifetime license is a one-time payment of $3 that provides lifetime access to all current and future MacMint features for up to 5 Macs, with zero recurring subscriptions.",
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-surface-soft dark:bg-surface-dark transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Answers to common questions.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 font-normal">
            Everything you need to know about safety, permissions, and licensing.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-surface-darkSurface overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-mint-700 dark:hover:text-mint-400 transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-mint-600 dark:text-mint-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
