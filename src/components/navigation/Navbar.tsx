import React, { useState, useEffect } from "react";
import { Download, Sun, Moon, Key } from "lucide-react";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isDark: boolean;
  toggleDark: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, isDark, toggleDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-surface-darkSurface/85 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 shadow-sm"
          : "bg-white dark:bg-surface-dark border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo & Name — no nav links; all navigation lives in the footer */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, "/")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 group-hover:scale-105 transition-transform">
            <img
              src="/assets/logo.png"
              alt="MacMint"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/macmint_logo.png";
              }}
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-mint-700 dark:group-hover:text-mint-400 transition-colors">
            MacMint
          </span>
        </a>

        {/* Right: Theme toggle, Activate, Download */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={toggleDark}
            aria-label="Toggle color theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-darkCard border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              onNavigate("/activate");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`hidden sm:inline-flex p-2 rounded-xl border transition active:scale-95 ${
              currentPath === "/activate" || currentPath.startsWith("/activate?")
                ? "bg-mint-50 dark:bg-mint-950/50 border-mint-500/60 text-mint-700 dark:text-mint-300 shadow-sm"
                : "bg-slate-100/90 hover:bg-slate-200/90 dark:bg-surface-darkCard dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-800"
            }`}
            title="Activate License"
            aria-label="Activate License"
          >
            <Key className="w-4 h-4 text-mint-600 dark:text-mint-400" />
          </button>

          <button
            onClick={() => {
              onNavigate("/download");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>

      </div>
    </header>
  );
};
