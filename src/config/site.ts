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
  downloadUrl: "https://github.com/alokrathaur/MacMintWebApp/releases/download/v1.0.0/MacMint.dmg",
  directDmgUrl: "/MacMint.dmg",
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
      ctaUrl: "https://github.com/alokrathaur/MacMintWebApp/releases/download/v1.0.0/MacMint.dmg",
    },
    proMonthly: {
      id: "pro-monthly",
      name: "Pro Monthly",
      price: "$2.99",
      originalPrice: "$5.99",
      cadence: "/ month (1 Mac)",
      description: "Flexible monthly maintenance. Cancel anytime.",
      badge: "50% OFF OFFER",
      features: [
        "Unlimited cleanup with zero limits",
        "Complete App Uninstaller with leftover hunter",
        "Cryptographic Duplicate File Finder",
        "Node Modules & Docker Clutter Hunter",
        "System Data Reclaim for container caches",
        "Startup Items & background daemon manager",
        "System Optimizations (RAM purge, DNS flush)",
        "Priority email & direct X support",
      ],
      ctaText: "Get Pro Monthly",
      ctaUrl: "https://macmint-api.macmint.workers.dev/api/checkout?plan=monthly&product_id=pdt_0NnRf8hAStsGlqIvFMWBu",
    },
    proYearly: {
      id: "pro-yearly",
      name: "Pro Yearly",
      price: "$2.08",
      originalPrice: "$4.16",
      cadence: "/ month (billed $24.99 annually)",
      description: "Complete maintenance for 1 Mac. Save 58% over monthly.",
      badge: "Save 58% • 1 Mac",
      features: [
        "Unlimited cleanup with zero limits",
        "Complete App Uninstaller with leftover hunter",
        "Cryptographic Duplicate File Finder",
        "Node Modules & Docker Clutter Hunter",
        "System Data Reclaim for container caches",
        "Startup Items & background daemon manager",
        "System Optimizations (RAM purge, DNS flush)",
        "Priority email & direct X support",
      ],
      ctaText: "Get Pro Yearly",
      ctaUrl: "https://macmint-api.macmint.workers.dev/api/checkout?plan=yearly&product_id=pdt_0NnK2o8UfL8CrB7m0gijI",
    },
    proLifetime: {
      id: "pro-lifetime",
      name: "Pro Lifetime",
      price: "$49.99",
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
      ctaUrl: "https://macmint-api.macmint.workers.dev/api/checkout?plan=lifetime&product_id=pdt_0NnK3BLNEUP1MFmMyR0oD",
    },
  },
};
