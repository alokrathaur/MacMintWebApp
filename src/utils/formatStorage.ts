/**
 * Storage formatting utilities for stats dashboard and metrics display
 */

export function formatReclaimedBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 GB";
  const gb = bytes / 1073741824;
  if (gb >= 1000) {
    return `${(gb / 1024).toFixed(2)} TB`;
  }
  if (gb < 1) {
    const mb = bytes / 1048576;
    return `${mb.toFixed(0)} MB`;
  }
  return `${gb.toFixed(2)} GB`;
}

export function formatStorageScannedSaved(bytes: number): { value: string; unit: string } {
  if (!bytes || bytes <= 0) return { value: "0.00", unit: "GB" };
  const gb = bytes / 1073741824;
  if (gb >= 1000) {
    const tb = gb / 1024;
    return { value: tb.toFixed(2), unit: "TB" };
  }
  if (gb < 1) {
    const mb = bytes / 1048576;
    return { value: mb.toFixed(0), unit: "MB" };
  }
  return { value: gb.toFixed(2), unit: "GB" };
}
