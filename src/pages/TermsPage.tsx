import React from "react";

export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-mint-700 dark:text-mint-400">
            LEGAL AGREEMENT
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400 mt-2">Last updated: September 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            By downloading, installing, or using <strong>MacMint</strong> ("the Software"), developed by <strong>LegendPrix AI</strong>, you agree to be bound by these Terms of Service.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">1. License Grant</h3>
          <p>
            MacMint is licensed, not sold. LegendPrix AI grants you a revocable, non-exclusive, non-transferable personal license to download, install, and execute MacMint on Apple computers owned or controlled by you, subject to the terms of your purchased license tier (Community Free, Pro Yearly, or Pro Lifetime).
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">2. Safe Use & User Responsibility</h3>
          <p>
            While MacMint implements strict allow-list protections (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">CleanerGuard</code>) to safeguard vital operating system files and personal documents, disk cleanup operations permanently remove selected caches, logs, and artifacts from your storage drive. You are responsible for reviewing files marked for deletion before confirming any purge command.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. Disclaimer of Warranties</h3>
          <p>
            The Software is provided "AS IS" and "AS AVAILABLE", without warranty of any kind, express or implied. LegendPrix AI expressly disclaims all warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">4. Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by applicable law, in no event shall LegendPrix AI or its contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use the Software.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">5. Inquiries</h3>
          <p>
            For any legal or licensing questions, please contact <a href="mailto:legendprixai@gmail.com" className="text-mint-600 font-semibold underline">legendprixai@gmail.com</a>.
          </p>
        </div>

      </div>
    </div>
  );
};
