import React, { useEffect } from "react";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FAQSection } from "@/components/faq/FAQSection";

interface PricingPageProps {
  onNavigate?: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    // When /pricing opens, scroll down so all three products including buy buttons are fully in view
    const scrollDownTimer = setTimeout(() => {
      const cardsEl = document.getElementById("pricing-cards");
      if (cardsEl) {
        const rect = cardsEl.getBoundingClientRect();
        // Offset below sticky navbar (approx 68px)
        const targetScrollY = window.pageYOffset + rect.top - 76;
        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: "smooth",
        });
      }
    }, 120);

    return () => clearTimeout(scrollDownTimer);
  }, []);

  return (
    <div>
      <PricingSection onNavigate={onNavigate} isDedicatedPage={true} />
      <FAQSection />
    </div>
  );
};
