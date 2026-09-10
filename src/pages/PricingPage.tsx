import React from "react";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FAQSection } from "@/components/faq/FAQSection";

interface PricingPageProps {
  onNavigate?: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <PricingSection onNavigate={onNavigate} />
      <FAQSection />
    </div>
  );
};
