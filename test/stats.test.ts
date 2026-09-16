import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import { countryCodeToFlag, getCountryFlag } from "../src/utils/countryFlags.ts";
import { formatReclaimedBytes, formatStorageScannedSaved } from "../src/utils/formatStorage.ts";
import { analytics } from "../src/services/analytics.ts";

describe("Country Flag Resolution Tests", () => {
  it("converts 2-letter ISO code to flag emoji", () => {
    assert.equal(countryCodeToFlag("IN"), "🇮🇳");
    assert.equal(countryCodeToFlag("US"), "🇺🇸");
    assert.equal(countryCodeToFlag("GB"), "🇬🇧");
    assert.equal(countryCodeToFlag("DE"), "🇩🇪");
    assert.equal(countryCodeToFlag("JP"), "🇯🇵");
    assert.equal(countryCodeToFlag("FR"), "🇫🇷");
  });

  it("handles lowercase ISO codes", () => {
    assert.equal(countryCodeToFlag("in"), "🇮🇳");
    assert.equal(countryCodeToFlag("us"), "🇺🇸");
  });

  it("returns empty string for invalid or missing codes", () => {
    assert.equal(countryCodeToFlag(""), "");
    assert.equal(countryCodeToFlag(undefined), "");
    assert.equal(countryCodeToFlag("USA"), "");
    assert.equal(countryCodeToFlag("1"), "");
  });

  it("resolves flag correctly by country label name", () => {
    assert.equal(getCountryFlag("IN", "India"), "🇮🇳");
    assert.equal(getCountryFlag("US", "United States"), "🇺🇸");
    assert.equal(getCountryFlag(undefined, "United States"), "🇺🇸");
    assert.equal(getCountryFlag(undefined, "Germany"), "🇩🇪");
    assert.equal(getCountryFlag(undefined, "Japan"), "🇯🇵");
    assert.equal(getCountryFlag(undefined, "United Kingdom"), "🇬🇧");
    assert.equal(getCountryFlag(undefined, "Australia"), "🇦🇺");
    assert.equal(getCountryFlag(undefined, "Singapore"), "🇸🇬");
  });

  it("corrects mismatched code and label (prioritizes country name)", () => {
    // Specifically tests the bug reported where United States had code 'IN'
    assert.equal(getCountryFlag("IN", "United States"), "🇺🇸");
    assert.equal(getCountryFlag("US", "India"), "🇮🇳");
  });

  it("supports common country aliases", () => {
    assert.equal(getCountryFlag(undefined, "USA"), "🇺🇸");
    assert.equal(getCountryFlag(undefined, "UK"), "🇬🇧");
    assert.equal(getCountryFlag(undefined, "UAE"), "🇦🇪");
  });
});

describe("Storage Formatting Utilities Tests", () => {
  it("formats zero and negative bytes cleanly", () => {
    assert.equal(formatReclaimedBytes(0), "0 GB");
    assert.equal(formatReclaimedBytes(-100), "0 GB");
    assert.deepEqual(formatStorageScannedSaved(0), { value: "0.00", unit: "GB" });
  });

  it("formats megabytes correctly", () => {
    const bytes500Mb = 500 * 1024 * 1024;
    assert.equal(formatReclaimedBytes(bytes500Mb), "500 MB");
    assert.deepEqual(formatStorageScannedSaved(bytes500Mb), { value: "500", unit: "MB" });
  });

  it("formats gigabytes correctly", () => {
    const bytes10Gb = 10 * 1024 * 1024 * 1024;
    assert.equal(formatReclaimedBytes(bytes10Gb), "10.00 GB");
    assert.deepEqual(formatStorageScannedSaved(bytes10Gb), { value: "10.00", unit: "GB" });
  });

  it("formats large volumes in terabytes correctly", () => {
    // 600 GB should be formatted as GB (since < 1000 GB)
    const bytes600Gb = 644245094400;
    assert.equal(formatReclaimedBytes(bytes600Gb), "600.00 GB");
    assert.deepEqual(formatStorageScannedSaved(bytes600Gb), { value: "600.00", unit: "GB" });

    // 1.5 TB (1500 GB >= 1000 GB threshold -> formatted in TB)
    const bytes1500Gb = 1500 * 1024 * 1024 * 1024;
    assert.equal(formatReclaimedBytes(bytes1500Gb), "1.46 TB");
    assert.deepEqual(formatStorageScannedSaved(bytes1500Gb), { value: "1.46", unit: "TB" });
  });
});

describe("Analytics Service Logic Tests", () => {
  it("maps country codes to names", () => {
    assert.equal(analytics.countryCodeToName("US"), "United States");
    assert.equal(analytics.countryCodeToName("IN"), "India");
    assert.equal(analytics.countryCodeToName("GB"), "United Kingdom");
    assert.equal(analytics.countryCodeToName("DE"), "Germany");
    assert.equal(analytics.countryCodeToName("JP"), "Japan");
    assert.equal(analytics.countryCodeToName("AU"), "Australia");
  });
});
