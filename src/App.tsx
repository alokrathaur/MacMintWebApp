import React, { useState, useEffect } from "react";
import { Navbar } from "./components/navigation/Navbar";
import { Footer } from "./components/footer/Footer";
import { HomePage } from "./pages/HomePage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { GuidesPage } from "./pages/GuidesPage";
import { SingleGuidePage } from "./pages/SingleGuidePage";
import { SupportPage } from "./pages/SupportPage";
import { FAQPage } from "./pages/FAQPage";
import { DownloadPage } from "./pages/DownloadPage";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";

export const App: React.FC = () => {
  // Theme state: defaults to light-first
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("macmint-theme");
    if (saved) return saved === "dark";
    return false; // White/light first by default!
  });

  // Client path state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Check for GitHub Pages SPA redirection param: /?p=/guides/clean-mac-cache or hash
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("p");
    if (redirectPath) {
      return redirectPath;
    }
    // Check hash-based deep linking
    if (window.location.hash.startsWith("#/")) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.replace(/\/$/, "") || "/";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("macmint-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("macmint-theme", "light");
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const navigate = (path: string) => {
    setCurrentPath(path);
    // Update browser URL state without reloading
    try {
      window.history.pushState({}, "", path);
    } catch {
      window.location.hash = path;
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname.replace(/\/$/, "") || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Route Dispatcher
  const renderPage = () => {
    if (currentPath === "" || currentPath === "/") {
      return <HomePage onNavigate={navigate} />;
    }
    if (currentPath === "/features") {
      return <FeaturesPage />;
    }
    if (currentPath === "/pricing") {
      return <PricingPage onNavigate={navigate} />;
    }
    if (currentPath === "/guides") {
      return <GuidesPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith("/guides/")) {
      const slug = currentPath.replace("/guides/", "");
      return <SingleGuidePage slug={slug} onNavigate={navigate} />;
    }
    if (currentPath === "/support") {
      return <SupportPage onNavigate={navigate} />;
    }
    if (currentPath === "/faq") {
      return <FAQPage />;
    }
    if (currentPath === "/download") {
      return <DownloadPage />;
    }
    if (currentPath === "/about") {
      return <AboutPage />;
    }
    if (currentPath === "/privacy") {
      return <PrivacyPage />;
    }
    if (currentPath === "/terms") {
      return <TermsPage />;
    }
    // Fallback to Home
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        isDark={isDark}
        toggleDark={toggleDark}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
};
