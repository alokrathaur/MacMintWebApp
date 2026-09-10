import React from "react";
import { Mail, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";
import { XIcon } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/config/site";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-surface-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-slate-100 dark:border-slate-800">
          
          {/* Column 1: Brand & Bio (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-mint-300/60 shadow-sm bg-mint-500">
                <img
                  src="./assets/logo.png"
                  alt="MacMint Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "./assets/macmint_logo.png";
                  }}
                />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                MacMint
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              MacMint is a modern, privacy-focused native macOS cleanup and storage optimization utility. Pure Swift, zero telemetry, 100% offline analysis.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.xUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="MacMint on X"
                className="p-2 rounded-xl bg-slate-100 dark:bg-surface-darkCard text-slate-600 dark:text-slate-300 hover:text-mint-600 transition"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/features"
                  onClick={(e) => handleLinkClick(e, "/features")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Features & Tools
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  onClick={(e) => handleLinkClick(e, "/pricing")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Pricing & Plans
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleLinkClick(e, "/faq")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/download"
                  onClick={(e) => handleLinkClick(e, "/download")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Download DMG
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, "/about")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  About MacMint
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Storage Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Guides
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/guides/check-mac-storage"
                  onClick={(e) => handleLinkClick(e, "/guides/check-mac-storage")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Check Mac Storage
                </a>
              </li>
              <li>
                <a
                  href="/guides/clean-mac-cache"
                  onClick={(e) => handleLinkClick(e, "/guides/clean-mac-cache")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Clean Mac Cache
                </a>
              </li>
              <li>
                <a
                  href="/guides/find-large-files"
                  onClick={(e) => handleLinkClick(e, "/guides/find-large-files")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Find Large Files
                </a>
              </li>
              <li>
                <a
                  href="/guides/remove-duplicate-files"
                  onClick={(e) => handleLinkClick(e, "/guides/remove-duplicate-files")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Remove Duplicate Files
                </a>
              </li>
              <li>
                <a
                  href="/guides/uninstall-mac-apps"
                  onClick={(e) => handleLinkClick(e, "/guides/uninstall-mac-apps")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Uninstall Mac Apps
                </a>
              </li>
              <li>
                <a
                  href="/guides/clean-xcode-storage"
                  onClick={(e) => handleLinkClick(e, "/guides/clean-xcode-storage")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Xcode Cleanup
                </a>
              </li>
              <li>
                <a
                  href="/guides/free-up-system-data"
                  onClick={(e) => handleLinkClick(e, "/guides/free-up-system-data")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Free Up System Data
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/download"
                  onClick={(e) => handleLinkClick(e, "/download")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Download Installer
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  onClick={(e) => handleLinkClick(e, "/support")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Support</span>
                </a>
              </li>
              {/* Contact on X just below Email support */}
              <li>
                <a
                  href="https://x.com/alok8feb"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition flex items-center gap-1.5 font-medium text-mint-700 dark:text-mint-400"
                >
                  <XIcon className="w-3.5 h-3.5" />
                  <span>Contact on X</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleLinkClick(e, "/privacy")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLinkClick(e, "/terms")}
                  className="hover:text-mint-600 dark:hover:text-mint-400 transition"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {currentYear} {SITE_CONFIG.productName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Made for macOS 14 and later.</span>
            <span>•</span>
            <a
              href="https://legendPrixAi.lol"
              target="_blank"
              rel="noreferrer"
              className="hover:text-mint-600 dark:hover:text-mint-400 transition flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300"
            >
              <span>Built by LegendPrix AI</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
