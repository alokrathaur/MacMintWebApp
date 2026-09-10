import React from "react";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-mint-700 dark:text-mint-400">
            TRANSPARENCY & DATA PRIVACY
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-2">Last updated: September 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            At <strong>MacMint</strong>, your privacy is not an afterthought or an option — it is fundamental to the software's architecture. We believe a system utility must never monitor your habits, upload your file metadata, or phone home with unnecessary telemetry.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">1. Zero Telemetry & Offline Operation</h3>
          <p>
            MacMint does not contain tracking analytics, advertising SDKs, session replay trackers, or user behavioral monitoring libraries. The application operates 100% locally on your Mac. All scanning, hashing, duplicate comparison, and deletion routines execute entirely on your device's CPU/GPU with zero outbound network calls.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">2. File Data & Metadata Handling</h3>
          <p>
            When MacMint scans your drive, filenames, file paths, and byte sizes are processed in volatile system memory purely to generate the user interface display (such as the Sunburst Map and category breakdown). MacMint never transmits, mirrors, or exposes this metadata to remote servers.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. Full Disk Access Permissions</h3>
          <p>
            Certain advanced cleanup tasks (such as inspecting sandboxed container caches in <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">~/Library/Containers</code>) require macOS Full Disk Access. This permission is utilized strictly to read cache sizes and remove specified junk folders upon your explicit click. You can revoke this permission at any time in macOS System Settings.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">4. Persistent Local Audit Trail</h3>
          <p>
            For your transparency, MacMint writes records of completed cleanups to a local JSON file in your application support directory. This enables the "Operation History" view so you can review past operations. This log never leaves your computer.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">5. Contact Information</h3>
          <p>
            If you have questions regarding this privacy policy or our local data practices, please contact us at <a href="mailto:legendprixai@gmail.com" className="text-mint-600 font-semibold underline">legendprixai@gmail.com</a> or reach out on X at <a href="https://x.com/alok8feb" target="_blank" rel="noreferrer" className="text-mint-600 font-semibold underline">@alok8feb</a>.
          </p>
        </div>

      </div>
    </div>
  );
};
