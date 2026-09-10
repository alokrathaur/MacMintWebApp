export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  cadence?: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaUrl: string;
}

export const SITE_CONFIG = {
  productName: "MacMint",
  tagline: "Your Mac, refreshed.",
  coreMessage: "Clean smarter. Reclaim space. Keep your Mac feeling fresh.",
  subheading: "MacMint helps you find unnecessary files, reclaim storage, remove leftovers, clean developer data, and keep your Mac organized — safely and transparently.",
  trustLine: "Native macOS • Privacy-focused • macOS 14+",
  appVersion: "1.0.0",
  minMacOSVersion: "macOS 14.0 (Sonoma) or later",
  downloadUrl: "/download",
  activateUrl: "/activate",
  siteUrl: "https://getmacmint.store",
  supportEmail: "legendprixai@gmail.com",
  xUrl: "https://x.com/alok8feb",
  companyName: "LegendPrix AI",
  companyUrl: "https://legendPrixAi.lol",
  licenseUrl: "/terms",
  
  pricing: {
    free: {
      id: "free",
      name: "7-Day Free Trial",
      price: "$0",
      cadence: "no credit card required",
      description: "7 days full access to basic disk scanning, large file detection, and cache cleanup.",
      features: [
        "7 days full access — no card needed",
        "Interactive Disk Space Sunburst Map",
        "Deep Cleanup cache scanning",
        "Large & old files detection (>50MB)",
        "Review before deleting any item",
        "100% private, zero tracking",
      ],
      ctaText: "Start 7-Day Free Trial",
      ctaUrl: "/download",
    },
    proYearly: {
      id: "pro-yearly",
      name: "Pro Yearly",
      price: "$24.99",
      originalPrice: "$49.99",
      cadence: "/ year (1 Mac)",
      description: "Full power suite for power users, developers, and creative professionals.",
      badge: "1 Mac License",
      features: [
        "All features unlocked for 1 Mac",
        "Project Build Artifacts & node_modules deep cleaner",
        "Xcode DerivedData, simulators & SPM cache purge",
        "Complete App Uninstaller with leftover hunter",
        "Cryptographic Duplicate File Finder",
        "System Data Reclaim for container caches",
        "Startup Items & background daemon manager",
        "System Optimizations (RAM purge, DNS flush)",
        "Priority email & direct X support",
      ],
      ctaText: "Get Pro Yearly",
      ctaUrl: "#pricing",
    },
    proLifetime: {
      id: "pro-lifetime",
      name: "Pro Lifetime",
      price: "$49.44",
      originalPrice: "$99.99",
      cadence: "one-time payment (5 Macs)",
      description: "Pay once, own forever. Full access for up to 5 Mac devices.",
      badge: "Best Value • 5 Macs",
      isPopular: true,
      features: [
        "All features unlocked for up to 5 Macs",
        "Lifetime access to all current and future features",
        "Full developer toolkit & node_modules automation",
        "Complete App Uninstaller with leftover hunter",
        "Cryptographic Duplicate File Finder",
        "System Data Reclaim for container caches",
        "Zero subscriptions, zero telemetry",
        "All future major updates included",
        "Direct 1-on-1 support via X & Email",
      ],
      ctaText: "Get Lifetime Access",
      ctaUrl: "#pricing",
    },
  },
};
