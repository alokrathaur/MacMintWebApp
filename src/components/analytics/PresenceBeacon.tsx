import React, { useEffect } from "react";
import { analytics } from "../../services/analytics";

interface PresenceBeaconProps {
  currentPath: string;
}

export const PresenceBeacon: React.FC<PresenceBeaconProps> = ({ currentPath }) => {
  // 1. Route change telemetry
  useEffect(() => {
    analytics.trackPageView(currentPath);
  }, [currentPath]);

  // 2. Heartbeat loop & visibility change
  useEffect(() => {
    analytics.heartbeat();
    const interval = setInterval(() => {
      analytics.heartbeat();
    }, 15000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        analytics.heartbeat();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 3. Global click listener for DMG download detection
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      const text = (target.textContent || "").toLowerCase();

      if (href.endsWith(".dmg") || href.includes("MacMint.dmg") || text.includes("download free") || text.includes("download now")) {
        analytics.trackDownload("MacMint.dmg");
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
};
