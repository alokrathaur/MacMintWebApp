import React from "react";
import { Download, ArrowRight, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface FinalCTAProps {
  onNavigate: (path: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-surface-soft/80 dark:bg-surface-darkSurface/40 border-t border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="p-10 sm:p-16 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
          
          <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-md border border-mint-300/60 bg-mint-500">
            <img
              src="./assets/logo.png"
              alt="MacMint"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "./assets/macmint_logo.png";
              }}
            />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Ready to refresh your Mac?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            See what's taking up space. Review what can be cleaned. Keep control of what stays.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate?.("/download");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-base shadow-lg shadow-mint-700/20 transition-all active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              <span>Download MacMint</span>
            </button>

            <button
              onClick={() => {
                onNavigate("/features");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface-darkCard dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base transition active:scale-[0.98]"
            >
              <span>Explore Features</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-mint-600" />
            <span>macOS 14 Sonoma & macOS 15 Sequoia • Free & Pro Available</span>
          </div>

        </div>

      </div>
    </section>
  );
};
