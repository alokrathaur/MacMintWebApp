import React from "react";
import { Mail, HelpCircle, ShieldCheck, Download, BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { XIcon } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/config/site";

interface SupportPageProps {
  onNavigate: (path: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-mint-600" />
            <span>HELP & SUPPORT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            How can we help?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 font-normal">
            Direct assistance, troubleshooting guides, and developer support for MacMint.
          </p>
        </div>

        {/* Support Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Direct Support Channels */}
          <div className="p-8 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Direct Contact
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Reach out directly with questions, bug reports, feature requests, or license inquiries.
              </p>

              <div className="space-y-4">
                {/* Email Support */}
                <div className="p-4 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-mint-50 dark:bg-surface-darkSurface border border-mint-200/60 dark:border-mint-800/60 text-mint-700 dark:text-mint-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Email Support</div>
                      <div className="text-xs text-slate-500 font-mono">{SITE_CONFIG.supportEmail}</div>
                    </div>
                  </div>
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="px-3 py-1.5 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-xs transition"
                  >
                    Email Us
                  </a>
                </div>

                {/* Contact on X - JUST BELOW EMAIL SUPPORT */}
                <div className="p-4 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-mint-200/80 dark:border-mint-800/80 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-surface-darkSurface border border-teal-200/60 dark:border-teal-800/60 text-teal-700 dark:text-teal-400">
                      <XIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Contact on X</span>
                        <span className="text-[10px] font-bold text-mint-700 dark:text-mint-400 bg-mint-100 dark:bg-mint-950/60 px-1.5 py-0.2 rounded">
                          Direct DM
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono">@alok8feb</div>
                    </div>
                  </div>
                  <a
                    href="https://x.com/alok8feb"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-semibold text-xs transition flex items-center gap-1"
                  >
                    <span>Message</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              Typical response time: under 24 hours.
            </div>
          </div>

          {/* Guides & Documentation */}
          <div className="p-8 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Troubleshooting & Guides
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Step-by-step walkthroughs to common questions about permissions, Xcode caches, and storage recovery.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => onNavigate("/guides/free-up-system-data")}
                  className="w-full p-3 text-left rounded-xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-mint-600 transition"
                >
                  <span>Granting Full Disk Access for System Data</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => onNavigate("/guides/clean-xcode-storage")}
                  className="w-full p-3 text-left rounded-xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-mint-600 transition"
                >
                  <span>Safe Xcode DerivedData & Simulator Cleanup</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => onNavigate("/guides/clean-mac-cache")}
                  className="w-full p-3 text-left rounded-xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-mint-600 transition"
                >
                  <span>Cleaning User & App Caches Without Crashing Apps</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onNavigate("/guides")}
                className="inline-flex items-center gap-2 text-xs font-bold text-mint-700 dark:text-mint-400 hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore all 7 macOS Guides</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
