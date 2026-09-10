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
      "MacMint is a native macOS application built with Swift and SwiftUI designed to reclaim storage space, analyze disk usage with an interactive Sunburst Map, detect duplicates, clean developer artifacts (like Xcode and node_modules), and uninstall applications without leaving leftover container clutter.",
  },
  {
    question: "Is MacMint safe to use?",
    answer:
      "Yes. Safety is MacMint's top priority. All deletion tasks are filtered through an immutable allow-list guardrail (CleanerGuard). MacMint strictly isolates cleaning to designated cache, log, and artifact directories. No essential operating system files, user documents, Desktop files, or Photos can ever be removed.",
  },
  {
    question: "Does MacMint delete personal files?",
    answer:
      "Never. MacMint will never touch or remove your personal documents, pictures, music, desktop files, or password keychains. Even when using the Large File Finder or Duplicate Finder, items are highlighted for your explicit manual review and confirmation.",
  },
  {
    question: "Does MacMint require Full Disk Access?",
    answer:
      "Basic system caches and user logs can be cleaned without Full Disk Access. However, scanning sandboxed app containers (~/Library/Containers) and group caches for System Data Reclaim requires granting Full Disk Access in macOS System Settings > Privacy & Security. MacMint provides step-by-step instructions and a live recheck button.",
  },
  {
    question: "What does MacMint clean in Deep Cleanup?",
    answer:
      "Deep Cleanup targets safe-to-delete user caches, application caches, system diagnostic logs, browser service workers, trashed files, developer caches (Xcode DerivedData, CocoaPods, Carthage, Cargo, npm), and discovered project build artifacts (including node_modules).",
  },
  {
    question: "Can I review files before deleting them?",
    answer:
      "Yes, always. MacMint is designed around transparency. You can expand categories down to individual file paths, inspect exact byte sizes, deselect items you want to keep, and see a final confirmation dialog before any purge operation executes.",
  },
  {
    question: "Does MacMint find duplicate files accurately?",
    answer:
      "Yes. MacMint uses a two-tier algorithm: it first groups files with identical byte sizes, and then verifies their contents using cryptographic SHA-256 hashing to guarantee byte-for-byte identity. It never deletes duplicates automatically without your review.",
  },
  {
    question: "How does MacMint handle Xcode and developer data?",
    answer:
      "MacMint provides dedicated developer cleanup modules. It scans for Xcode DerivedData, legacy iOS/watchOS simulator runtime caches, archives, Swift Package Manager caches, and project-level node_modules directories, allowing you to reclaim tens of gigabytes in one click.",
  },
  {
    question: "Does MacMint uninstall applications completely?",
    answer:
      "Yes. When you uninstall an app through MacMint, it searches for linked Application Support folders, sandbox containers, preference plists, WebKit storage, and LaunchAgent daemons so that no orphan clutter is left behind.",
  },
  {
    question: "Does MacMint work on Apple Silicon and Intel Macs?",
    answer:
      "Yes. MacMint is compiled as a Universal macOS binary that runs natively on Apple Silicon (M1, M2, M3, M4) as well as Intel-based Macs running macOS 14.0 (Sonoma) or macOS 15.0 (Sequoia).",
  },
  {
    question: "Is there a free version available?",
    answer:
      "Yes. The Community Free edition includes the complete Disk Space Sunburst Map, basic deep cache scanning, large files discovery (>50MB), and local audit history with no time limits.",
  },
  {
    question: "What is included in the Pro Lifetime license?",
    answer:
      "Pro Lifetime grants permanent access to all current and future features of MacMint with no recurring subscription fees, valid for all Mac devices associated with your Apple ID.",
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
