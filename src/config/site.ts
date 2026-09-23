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
  tagline: "Storage Cleaner & Optimizer",
  coreMessage: "Reclaim gigabytes. Visualize disk space. Optimize system health.",
  subheading: "MacMint combines interactive Treemap & Sunburst storage maps, 7-category deep cleanup, complete app uninstallation, and real-time process monitoring — safely and transparently on your Mac.",
  trustLine: "Native macOS • Privacy-focused • macOS 14+",
  appVersion: "1.0.4",
  minMacOSVersion: "macOS 14.0 (Sonoma) or later",
  downloadUrl: "https://github.com/alokrathaur/MacMintWebApp/releases/download/v1.0.4/MacMint.dmg",
  directDmgUrl: "/MacMint.dmg",
  directPkgUrl: "/MacMint.pkg",
  previousDmgUrl: "/MacMint-1.0.3.dmg",
  versionHistoryUrl: "/version-history",
  activateUrl: "/activate",
  siteUrl: "https://getmacmint.store",
  apiUrl: "https://macmint-api.macmint.workers.dev",
  supportEmail: "legendprixai@gmail.com",
  xUrl: "https://x.com/alok8feb",
  companyName: "LegendPrix AI",
  companyUrl: "https://legendPrixAi.lol",
  licenseUrl: "/terms",
  
  pricing: {
    free: {
      id: "free-trial",
      name: "Free Download",
      price: "$0",
      cadence: "no credit card required",
      description: "Full preview of your system. Clean up to 500 MB completely free.",
      features: [
        "Smart Space scan with breakdown",
        "Clean up to 500 MB junk files",
        "App leftover scanner preview",
        "Developer project clutter analysis",
        "Duplicate file detection preview",
        "Memory & CPU quick monitoring",
        "Zero tracking, 100% on-device",
      ],
      ctaText: "Download Free",
      ctaUrl: "/MacMint.dmg",
    },
    proLifetime: {
      id: "pro-lifetime",
      name: "Lifetime",
      price: "$3",
      cadence: "one-time payment",
      description: "Pay once, own forever. Full access to all Pro features.",
      badge: "One-time · Lifetime Access",
      isPopular: true,
      features: [
        "All features unlocked forever",
        "Lifetime access to all current and future features",
        "Full developer toolkit & node_modules automation",
        "VMware Fusion (.vmwarevm, .vmdk) & VM disk scan",
        "Complete App Uninstaller with leftover hunter",
        "Cryptographic Duplicate File Finder",
        "System Data Reclaim for container caches",
        "Zero subscriptions, zero telemetry",
        "All future major updates included",
        "Direct 1-on-1 support via X & Email",
      ],
      ctaText: "Get Lifetime Access",
      ctaUrl: "https://macmint-api.macmint.workers.dev/api/checkout?plan=lifetime&product_id=pdt_0NnK3BLNEUP1MFmMyR0oD",
    },
  },
};
