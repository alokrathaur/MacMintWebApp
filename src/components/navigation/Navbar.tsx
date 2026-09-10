import React, { useState, useEffect } from "react";
import { Download, Menu, X, Sun, Moon, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isDark: boolean;
  toggleDark: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, isDark, toggleDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Smart Space", path: "/#smart-space" },
    { name: "Pricing", path: "/pricing" },
    { name: "Guides", path: "/guides" },
    { name: "Support", path: "/support" },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (path.startsWith("/#")) {
      if (currentPath !== "/") {
        onNavigate("/");
        setTimeout(() => {
          const id = path.replace("/#", "");
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const id = path.replace("/#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-surface-darkSurface/85 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, "/")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-mint-300/60 shadow-sm group-hover:scale-105 transition-transform bg-mint-500">
            <img
              src="./assets/logo.png"
              alt="MacMint"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "./assets/macmint_logo.png";
              }}
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-mint-700 dark:group-hover:text-mint-400 transition-colors">
            MacMint
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`text-sm font-medium transition-colors hover:text-mint-600 dark:hover:text-mint-400 ${
                  isActive
                    ? "text-mint-700 dark:text-mint-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={toggleDark}
            aria-label="Toggle color theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-darkCard border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Download Button */}
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

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-surface-darkSurface/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-darkCard transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("/download");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-mint-600 text-white font-semibold text-sm shadow transition"
            >
              <Download className="w-4 h-4" />
              <span>Download MacMint</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
