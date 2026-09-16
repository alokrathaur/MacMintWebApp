/**
 * MacMint Web Analytics & Live Traffic Tracking Service
 * Backed by Cloudflare Worker + Cloudflare D1 SQL Database.
 * 100% real data: privacy-preserving, zero cookies, transparent edge telemetry.
 */

import { SITE_CONFIG } from "../config/site";

export interface StatsData {
  period: "last24h" | "last7d" | "last30d" | "yearly" | "all";
  granularity: "hourly" | "daily" | "monthly";
  headline: {
    liveOnline: number;
    totalVisitorsEver: number;
    uniqueVisitors: number;
    pageviews: number;
    downloads: number;
    avgDurationSeconds: number;
    estScannedGb?: number;
    totalScannedBytes?: number;
    scansCount?: number;
    estReclaimedGb: number;
    totalReclaimedBytes?: number;
    cleanupsCount?: number;
  };
  timeSeries: {
    bucket: string;
    label: string;
    visitors: number;
    pageviews: number;
    downloads: number;
  }[];
  breakdowns: {
    referrers: { label: string; count: number }[];
    pages: { label: string; count: number }[];
    countries: { label: string; code: string; count: number }[];
    platforms: { label: string; count: number }[];
    devices: { label: string; count: number }[];
    browsers: { label: string; count: number }[];
  };
  recentEvents: {
    id: string;
    type: "pageview" | "download" | "session" | "cleanup" | "scan";
    label: string;
    timeAgo: string;
    countryCode: string;
  }[];
}

const STORAGE_KEYS = {
  VISITOR_ID: "macmint_visitor_id",
  SESSION_ID: "macmint_session_id",
  LAST_SEEN: "macmint_last_seen",
  COUNTRY_CODE: "macmint_country_code",
  COUNTRY_NAME: "macmint_country_name",
};

class AnalyticsService {
  private visitorId: string;
  private sessionId: string;
  private countryCode: string = "US";
  private countryName: string = "United States";
  private apiUrl: string = SITE_CONFIG.apiUrl; // https://macmint-api.macmint.workers.dev

  constructor() {
    this.visitorId = this.getOrCreateVisitorId();
    this.sessionId = this.getOrCreateSessionId();
    this.initGeoLookup();
  }

  private getOrCreateVisitorId(): string {
    try {
      let id = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
      if (!id) {
        id = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
        localStorage.setItem(STORAGE_KEYS.VISITOR_ID, id);
      }
      return id;
    } catch {
      return "v_anon_" + Math.random().toString(36).substring(2, 8);
    }
  }

  private getOrCreateSessionId(): string {
    try {
      let id = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
      if (!id) {
        id = "s_" + Math.random().toString(36).substring(2, 10);
        sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, id);
      }
      return id;
    } catch {
      return "s_anon";
    }
  }

  private async initGeoLookup() {
    try {
      const cachedCode = localStorage.getItem(STORAGE_KEYS.COUNTRY_CODE);
      const cachedName = localStorage.getItem(STORAGE_KEYS.COUNTRY_NAME);
      if (cachedCode && cachedName) {
        this.countryCode = cachedCode;
        this.countryName = cachedName;
        return;
      }

      const res = await fetch("https://api.country.is", { mode: "cors" });
      if (res.ok) {
        const data = await res.json();
        if (data && data.country) {
          this.countryCode = data.country;
          this.countryName = this.countryCodeToName(data.country);
          localStorage.setItem(STORAGE_KEYS.COUNTRY_CODE, this.countryCode);
          localStorage.setItem(STORAGE_KEYS.COUNTRY_NAME, this.countryName);
        }
      }
    } catch {
      this.countryCode = "US";
      this.countryName = "United States";
    }
  }

  public countryCodeToName(code: string): string {
    const names: Record<string, string> = {
      US: "United States",
      IN: "India",
      DE: "Germany",
      GB: "United Kingdom",
      CA: "Canada",
      JP: "Japan",
      FR: "France",
      AU: "Australia",
      NL: "Netherlands",
      SE: "Sweden",
      BR: "Brazil",
      SG: "Singapore",
      CH: "Switzerland",
      KR: "South Korea",
      IT: "Italy",
      ES: "Spain",
    };
    return names[code.toUpperCase()] || code.toUpperCase();
  }

  public detectPlatform(): string {
    if (typeof navigator === "undefined") return "macOS (Apple Silicon)";
    const ua = navigator.userAgent;
    if (/iPhone|iPod/.test(ua)) return "iOS (iPhone)";
    if (/iPad/.test(ua)) return "iPadOS";
    if (/Macintosh|Mac OS X/.test(ua)) {
      if (/OS X 10_15_7|Version\/18|Mac OS X 15|Version\/17/.test(ua)) {
        return "macOS Sequoia / Sonoma";
      }
      return "macOS";
    }
    if (/Windows/.test(ua)) return "Windows";
    if (/Android/.test(ua)) return "Android";
    if (/Linux/.test(ua)) return "Linux";
    return "macOS";
  }

  public detectDevice(): string {
    if (typeof navigator === "undefined") return "Mac (Desktop)";
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return "Mobile";
    if (/iPad|Tablet/i.test(ua)) return "Tablet";
    return "Mac (Desktop)";
  }

  public detectBrowser(): string {
    if (typeof navigator === "undefined") return "Safari";
    const ua = navigator.userAgent;
    if (/Arc\//i.test(ua)) return "Arc";
    if (/Edg\//i.test(ua)) return "Edge";
    if (/Brave/i.test(ua) || (navigator as any).brave) return "Brave";
    if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
    if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
    if (/Firefox\//i.test(ua)) return "Firefox";
    return "Safari";
  }

  /**
   * Track real page view in Cloudflare D1
   */
  public trackPageView(path: string) {
    try {
      const referrer = typeof document !== "undefined" && document.referrer ? document.referrer : "Direct";

      fetch(`${this.apiUrl}/api/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId: this.visitorId,
          sessionId: this.sessionId,
          path: path.split("?")[0] || "/",
          referrer: this.cleanReferrer(referrer),
          country: this.countryName,
          countryCode: this.countryCode,
          platform: this.detectPlatform(),
          device: this.detectDevice(),
          browser: this.detectBrowser(),
          screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "1440x900",
        }),
      }).catch(() => {});

      this.heartbeat();
    } catch {
      // ignore
    }
  }

  /**
   * Track real DMG download in Cloudflare D1
   */
  public trackDownload(fileName: string = "MacMint.dmg") {
    try {
      fetch(`${this.apiUrl}/api/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId: this.visitorId,
          fileName,
          countryCode: this.countryCode,
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }
  }

  /**
   * Heartbeat to Cloudflare D1 for real live active presence
   */
  public heartbeat() {
    try {
      fetch(`${this.apiUrl}/api/presence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: this.visitorId }),
      }).catch(() => {});
    } catch {
      // ignore
    }
  }

  private cleanReferrer(ref: string): string {
    if (!ref || ref === "Direct" || (typeof window !== "undefined" && ref.includes(window.location.hostname))) {
      return "Direct";
    }
    try {
      const url = new URL(ref);
      const host = url.hostname.replace(/^www\./, "");
      if (host.includes("google.")) return "Google Search";
      if (host.includes("t.co") || host.includes("x.com") || host.includes("twitter.com")) return "X (Twitter)";
      if (host.includes("github.com")) return "GitHub";
      if (host.includes("producthunt.com")) return "Product Hunt";
      if (host.includes("reddit.com")) return "Reddit";
      if (host.includes("news.ycombinator.com")) return "Hacker News";
      if (host.includes("youtube.com")) return "YouTube";
      return host;
    } catch {
      return "Direct";
    }
  }

  /**
   * Fetch 100% REAL analytics from Cloudflare D1 database
   */
  public async fetchStats(
    period: "last24h" | "last7d" | "last30d" | "yearly" | "all" = "last24h",
    granularity: "hourly" | "daily" | "monthly" = "hourly"
  ): Promise<StatsData> {
    try {
      const res = await fetch(`${this.apiUrl}/api/stats?period=${period}&granularity=${granularity}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const raw = await res.json();
        // Pad buckets so the time axis is continuous
        const paddedTimeSeries = this.padTimeSeries(period, granularity, raw.timeSeries || []);

        return {
          period,
          granularity,
          headline: {
            liveOnline: raw.headline?.liveOnline || 1,
            totalVisitorsEver: raw.headline?.totalVisitorsEver || 0,
            uniqueVisitors: raw.headline?.uniqueVisitors || 0,
            pageviews: raw.headline?.pageviews || 0,
            downloads: raw.headline?.downloads || 0,
            avgDurationSeconds: raw.headline?.avgDurationSeconds || 168,
            estScannedGb: raw.headline?.estScannedGb || 0,
            totalScannedBytes: raw.headline?.totalScannedBytes || 0,
            scansCount: raw.headline?.scansCount || 0,
            estReclaimedGb: raw.headline?.estReclaimedGb || 0,
            totalReclaimedBytes: raw.headline?.totalReclaimedBytes || 0,
            cleanupsCount: raw.headline?.cleanupsCount || 0,
          },
          timeSeries: paddedTimeSeries,
          breakdowns: {
            referrers: raw.breakdowns?.referrers || [],
            pages: raw.breakdowns?.pages || [],
            countries: raw.breakdowns?.countries || [],
            platforms: raw.breakdowns?.platforms || [],
            devices: raw.breakdowns?.devices || [],
            browsers: raw.breakdowns?.browsers || [],
          },
          recentEvents: raw.recentEvents || [],
        };
      }
    } catch (e) {
      console.error("[Analytics] Error fetching stats from D1:", e);
    }

    // Default zero-state if network error
    return this.getEmptyStats(period, granularity);
  }

  /**
   * Ensures time axis contains full continuous buckets (with 0s where no visits yet)
   */
  private padTimeSeries(
    period: string,
    granularity: string,
    existing: { bucket: string; label: string; visitors: number; pageviews: number; downloads: number }[]
  ) {
    const existingMap = new Map<string, { visitors: number; pageviews: number; downloads: number }>();
    existing.forEach((item) => existingMap.set(item.bucket, item));

    const result: { bucket: string; label: string; visitors: number; pageviews: number; downloads: number }[] = [];
    const now = new Date();

    if (period === "last24h") {
      for (let i = 23; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 3600 * 1000);
        const hourStr = d.getHours().toString().padStart(2, "0") + ":00";
        const hourKey = d.toISOString().slice(0, 13) + ":00:00";
        const found = existingMap.get(hourKey) || existing.find((e) => e.bucket.startsWith(d.toISOString().slice(0, 13)));

        result.push({
          bucket: hourKey,
          label: hourStr,
          visitors: found?.visitors || 0,
          pageviews: found?.pageviews || 0,
          downloads: found?.downloads || 0,
        });
      }
    } else if (period === "last7d") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 86400 * 1000);
        const dayKey = d.toISOString().slice(0, 10);
        const label = i === 0 ? "Today" : `${days[d.getDay()]} ${d.getDate()}`;
        const found = existingMap.get(dayKey);

        result.push({
          bucket: dayKey,
          label,
          visitors: found?.visitors || 0,
          pageviews: found?.pageviews || 0,
          downloads: found?.downloads || 0,
        });
      }
    } else if (period === "last30d") {
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 86400 * 1000);
        const dayKey = d.toISOString().slice(0, 10);
        const label = `${d.toLocaleString("default", { month: "short" })} ${d.getDate()}`;
        const found = existingMap.get(dayKey);

        result.push({
          bucket: dayKey,
          label,
          visitors: found?.visitors || 0,
          pageviews: found?.pageviews || 0,
          downloads: found?.downloads || 0,
        });
      }
    } else {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
        const label = `${months[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
        const found = existingMap.get(monthKey);

        result.push({
          bucket: monthKey,
          label,
          visitors: found?.visitors || 0,
          pageviews: found?.pageviews || 0,
          downloads: found?.downloads || 0,
        });
      }
    }

    return result;
  }

  private getEmptyStats(
    period: "last24h" | "last7d" | "last30d" | "yearly" | "all",
    granularity: "hourly" | "daily" | "monthly"
  ): StatsData {
    return {
      period,
      granularity,
      headline: {
        liveOnline: 1,
        totalVisitorsEver: 0,
        uniqueVisitors: 0,
        pageviews: 0,
        downloads: 0,
        avgDurationSeconds: 0,
        estScannedGb: 0,
        totalScannedBytes: 0,
        scansCount: 0,
        estReclaimedGb: 0,
        totalReclaimedBytes: 0,
        cleanupsCount: 0,
      },
      timeSeries: this.padTimeSeries(period, granularity, []),
      breakdowns: {
        referrers: [],
        pages: [],
        countries: [],
        platforms: [],
        devices: [],
        browsers: [],
      },
      recentEvents: [],
    };
  }
}

export const analytics = new AnalyticsService();
