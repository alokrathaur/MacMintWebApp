import React from "react";
import { Hero } from "@/components/hero/Hero";
import { ProductOverview } from "@/components/features/ProductOverview";
import { SunburstMap } from "@/components/sunburst/SunburstMap";
import { SmartRecommendations } from "@/components/storage/SmartRecommendations";
import { ProductShowcase } from "@/components/features/ProductShowcase";
import { TrustAndWorkflow } from "@/components/features/TrustAndWorkflow";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-4">
      {/* 01 & 02: HERO & TRUST STRIP */}
      <Hero onNavigate={onNavigate} />

      {/* 03: PRODUCT OVERVIEW (Bento Grid) */}
      <ProductOverview />

      {/* 04 & 05: SMART SPACE & INTERACTIVE SUNBURST (Flagship Storage Feature) */}
      <section id="smart-space" className="py-20 md:py-28 bg-surface-light dark:bg-surface-dark transition-colors border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>SMART SPACE · RADIAL EXPLORATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
              See exactly where your storage is going.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-normal">
              MacMint turns your storage into an interactive map, so you can understand what's consuming space before deciding what to clean.
            </p>
          </div>

          {/* Interactive Sunburst Map */}
          <SunburstMap />

          {/* Smart Recommendations */}
          <SmartRecommendations />

        </div>
      </section>

      {/* 06 to 12: DEEP CLEANUP, SYSTEM DATA, LARGE FILES, DUPLICATES, APP UNINSTALLER, DEV & OPTIMIZATIONS */}
      <ProductShowcase />

      {/* 13, 14, 15: SAFETY, PRIVACY & HOW IT WORKS */}
      <TrustAndWorkflow />

      {/* 16: PRICING SECTION */}
      <PricingSection onNavigate={onNavigate} />

      {/* 17: FAQ SECTION */}
      <FAQSection />

      {/* 18: FINAL CONVERSION CTA */}
      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};
