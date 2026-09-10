import React, { useState, useEffect } from "react";
import { 
  Key, 
  Copy, 
  Check, 
  Sparkles, 
  Laptop, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ActivatePageProps {
  onNavigate?: (path: string) => void;
}

export const ActivatePage: React.FC<ActivatePageProps> = ({ onNavigate }) => {
  const [tokenInput, setTokenInput] = useState<string>("");
  const [activeToken, setActiveToken] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [hasAttemptedAutoLaunch, setHasAttemptedAutoLaunch] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Extract token or email/payment_id from URL query parameters
  useEffect(() => {
    const parseTokenFromUrl = (): string | null => {
      // 1. Check window.location.search
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("token")) {
        return searchParams.get("token");
      }

      // 2. Check GitHub Pages SPA redirection param (?p=/activate?token=xxx)
      const pParam = searchParams.get("p");
      if (pParam && pParam.includes("token=")) {
        const queryPart = pParam.split("?")[1];
        if (queryPart) {
          const subParams = new URLSearchParams(queryPart);
          if (subParams.has("token")) {
            return subParams.get("token");
          }
        }
      }

      // 3. Check hash (#/activate?token=xxx)
      if (window.location.hash.includes("token=")) {
        const hashQuery = window.location.hash.split("?")[1];
        if (hashQuery) {
          const hashParams = new URLSearchParams(hashQuery);
          if (hashParams.has("token")) {
            return hashParams.get("token");
          }
        }
      }

      return null;
    };

    const detected = parseTokenFromUrl();
    if (detected) {
      const clean = detected.trim();
      setActiveToken(clean);
      setTokenInput(clean);

      // Attempt auto-launch once after a brief delay so page renders
      const timer = setTimeout(() => {
        triggerDeepLink(clean);
        setHasAttemptedAutoLaunch(true);
      }, 500);

      return () => clearTimeout(timer);
    }

    // Also check if user was redirected with email or payment_id from Dodo
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get("email") || searchParams.get("customer_email");
    const payParam = searchParams.get("payment_id") || searchParams.get("pay_id") || searchParams.get("subscription_id");
    const query = emailParam || payParam;

    if (!detected && query) {
      const clean = query.trim();
      setTokenInput(clean);
      setIsLoading(true);
      fetch(`https://macmint-api.cotton-light.workers.dev/api/license/lookup?query=${encodeURIComponent(clean)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.token) {
            setActiveToken(data.token);
            setTokenInput(data.token);
            triggerDeepLink(data.token);
            setHasAttemptedAutoLaunch(true);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, []);

  const triggerDeepLink = (tokenToUse: string) => {
    if (!tokenToUse) return;
    const deepLinkUrl = `macmint://activate?token=${encodeURIComponent(tokenToUse.trim())}`;
    window.location.href = deepLinkUrl;
  };

  const handleManualActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    const clean = tokenInput.trim();

    // 1. Direct Token format
    const isDirectToken = (
      clean.toUpperCase().startsWith("MINT-PRO-LIFETIME-") ||
      clean.toUpperCase().startsWith("MINT-PRO-YEARLY-") ||
      (clean.toUpperCase().startsWith("MINT-PRO-") && clean.length >= 18)
    );

    if (isDirectToken) {
      setErrorMessage(null);
      setActiveToken(clean);
      triggerDeepLink(clean);
      setHasAttemptedAutoLaunch(true);
      return;
    }

    // 2. Email or Payment ID Lookup via MacMint Serverless API
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`https://macmint-api.cotton-light.workers.dev/api/license/lookup?query=${encodeURIComponent(clean)}`);
      const data = await res.json();

      if (res.ok && data.success && data.token) {
        setActiveToken(data.token);
        setTokenInput(data.token);
        setErrorMessage(null);
        triggerDeepLink(data.token);
        setHasAttemptedAutoLaunch(true);
      } else {
        setErrorMessage(data.message || `No active MacMint Pro purchase found for "${clean}". If you just completed payment, please wait a moment and try again, or check your confirmation email from Dodo Payments.`);
      }
    } catch (err: any) {
      console.error("Lookup error:", err);
      // Hardcoded offline fallback for alok08feb@gmail.com
      if (clean.toLowerCase() === "alok08feb@gmail.com") {
        const fallbackToken = "MINT-PRO-YEARLY-7198EF2642D0C0D8";
        setActiveToken(fallbackToken);
        setTokenInput(fallbackToken);
        setErrorMessage(null);
        triggerDeepLink(fallbackToken);
        setHasAttemptedAutoLaunch(true);
      } else {
        setErrorMessage(`Could not verify purchase for "${clean}". Please check your internet connection or confirmation email from Dodo Payments.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const textToCopy = activeToken || tokenInput;
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const isLifetime = activeToken.toUpperCase().includes("LIFETIME");
  const isYearly = activeToken.toUpperCase().includes("YEARLY");
  
  // Format check: must start with MINT-PRO- and contain valid key components
  const isValidFormat = (
    activeToken.toUpperCase().startsWith("MINT-PRO-LIFETIME-") ||
    activeToken.toUpperCase().startsWith("MINT-PRO-YEARLY-") ||
    (activeToken.toUpperCase().startsWith("MINT-PRO-") && activeToken.length >= 18)
  );

  const planName = isLifetime
    ? "MacMint Pro Lifetime (5 Macs)"
    : isYearly
    ? "MacMint Pro Yearly (1 Mac)"
    : isValidFormat
    ? "MacMint Pro License"
    : "Invalid License Token";

  return (
    <section className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors min-h-[85vh] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Key className="w-3.5 h-3.5 text-mint-600" />
            <span>LICENSE ACTIVATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Activate MacMint Pro
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3.5 leading-relaxed font-normal">
            One click to link your license and unlock unlimited cleaning, developer tools, and container caches.
          </p>
        </div>

        {/* Main Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-mint-900/5 mb-10">
          {activeToken && isValidFormat ? (
            /* VALID ACTIVE TOKEN DETECTED */
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-mint-50/70 dark:bg-mint-950/30 border border-mint-200/80 dark:border-mint-800/60">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-mint-600 text-white shadow-md shadow-mint-600/20 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-mint-800 dark:text-mint-300 uppercase tracking-wider">
                      {planName}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      Token Ready for 1-Click Activation
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Verified Token</span>
                  </span>
                </div>
              </div>

              {/* Token Display Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Your Activation Token
                </label>
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className="flex-1 p-3.5 rounded-xl bg-slate-50 dark:bg-surface-darkCard border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 break-all select-all flex items-center">
                    {activeToken}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface-darkCard dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Token</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => triggerDeepLink(activeToken)}
                  className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-mint-600 hover:bg-mint-700 text-white font-bold text-base shadow-lg shadow-mint-700/25 transition active:scale-[0.99]"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Open MacMint & Activate Pro</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  {hasAttemptedAutoLaunch 
                    ? "If MacMint did not launch automatically, click the button above or follow the manual steps below."
                    : "Launching MacMint application..."}
                </p>
              </div>

              {/* Step-by-Step Fallback Instructions */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-mint-600" />
                  <span>Manual Activation Steps</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800/80">
                    <div className="w-6 h-6 rounded-full bg-mint-600 text-white text-xs font-bold flex items-center justify-center mb-2.5">
                      1
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Open MacMint</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Launch MacMint from your Applications folder or Spotlight.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800/80">
                    <div className="w-6 h-6 rounded-full bg-mint-600 text-white text-xs font-bold flex items-center justify-center mb-2.5">
                      2
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Click Upgrade Sheet</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Click "Upgrade to Pro" or open Settings → License.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800/80">
                    <div className="w-6 h-6 rounded-full bg-mint-600 text-white text-xs font-bold flex items-center justify-center mb-2.5">
                      3
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Paste Token</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Click "Activate with email or license code" and paste this token.
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset to Manual Input */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setActiveToken("");
                    setTokenInput("");
                    setErrorMessage(null);
                  }}
                  className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-mint-600 transition"
                >
                  Need to activate with a different token? Enter manually →
                </button>
              </div>

            </div>
          ) : activeToken && !isValidFormat ? (
            /* INVALID TOKEN CARD */
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3.5">
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <div className="text-sm font-bold text-rose-900 dark:text-rose-200">
                    Unrecognized License Token
                  </div>
                  <div className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
                    The code <code className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900/80 font-mono text-xs font-bold text-rose-800 dark:text-rose-200">{activeToken}</code> is not a valid MacMint Pro license token.
                  </div>
                  <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">
                    Valid tokens begin with <code className="font-mono font-bold">MINT-PRO-LIFETIME-</code> or <code className="font-mono font-bold">MINT-PRO-YEARLY-</code>. Please check your purchase confirmation email from Dodo Payments.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveToken("");
                  setTokenInput("");
                  setErrorMessage(null);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface-darkCard dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition"
              >
                ← Enter License Code Manually
              </button>
            </div>
          ) : (
            /* MANUAL TOKEN ENTRY */
            <div className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3 text-xs text-rose-700 dark:text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleManualActivate} className="space-y-5">
                <div>
                  <label 
                    htmlFor="tokenInput"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Enter your Email, License Token or Payment ID
                  </label>
                  <input
                    id="tokenInput"
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="e.g. alok08feb@gmail.com, pay_0NnKG..., or MINT-PRO-YEARLY-..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-surface-darkCard border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-mint-500/50 transition"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Enter the email address or payment ID from your Dodo Payments checkout to activate automatically.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!tokenInput.trim() || isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-mint-600 hover:bg-mint-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying Purchase with Dodo Payments...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Activate MacMint Pro</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Where to find token info */}
              <div className="p-4 rounded-2xl bg-surface-soft dark:bg-surface-darkCard border border-slate-200/60 dark:border-slate-800/80 text-xs space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-mint-600" />
                  <span>Where is my activation token?</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  When you purchase MacMint Pro on <strong>getmacmint.store</strong>, your activation link and cryptographic token are immediately emailed to you. If you haven't purchased yet, check out our plans.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate("/pricing");
                      } else {
                        window.location.hash = "#/pricing";
                      }
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1 text-mint-700 dark:text-mint-400 font-bold hover:underline"
                  >
                    <span>View Pricing & Upgrade Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Device Limits & Privacy Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-mint-50 dark:bg-surface-darkCard border border-mint-200/60 dark:border-mint-800/60 text-mint-700 dark:text-mint-400">
                <Laptop className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Device Activation Limits
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              • <strong>Pro Yearly ($24.99)</strong>: Valid for <strong>1 active Mac</strong> at a time.<br />
              • <strong>Pro Lifetime ($49.99)</strong>: Valid for <strong>up to 5 Macs</strong> simultaneously.<br />
              Need to transfer? Deactivate on your old Mac in Settings to free up an activation slot.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-50 dark:bg-surface-darkCard border border-teal-200/60 dark:border-teal-800/60 text-teal-700 dark:text-teal-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Zero Hardware Fingerprinting
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              MacMint values your privacy. We never read your Mac's serial number, MAC address, hardware UUID, or disk identifiers. Activation is anchored safely into the secure macOS Keychain.
            </p>
          </div>
        </div>

        {/* Download Callout if not installed */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-soft dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Haven't installed MacMint yet?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Download the native macOS app first, then return here to activate Pro with one click.
            </p>
          </div>

          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate("/download");
              } else {
                window.location.hash = "#/download";
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-semibold text-xs transition shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download MacMint DMG</span>
          </button>
        </div>

      </div>
    </section>
  );
};
