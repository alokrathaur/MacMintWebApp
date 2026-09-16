import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import { 
  CURRENCIES, 
  SUPPORTED_CURRENCY_LIST, 
  resolveCurrencyFromCountry, 
  resolveCurrencyFromClient 
} from "../src/config/currencies.ts";

describe("Geo-Local Currency Pricing Tests", () => {
  it("resolves Indian Rupees (₹) for India (IN)", () => {
    const curr = resolveCurrencyFromCountry("IN");
    assert.equal(curr.code, "INR");
    assert.equal(curr.symbol, "₹");
    assert.equal(curr.flag, "🇮🇳");
    assert.equal(curr.monthly.price, "₹249");
    assert.equal(curr.yearly.price, "₹166");
    assert.equal(curr.yearly.billedAnnual, "₹1,999");
    assert.equal(curr.lifetime.price, "₹3,999");
  });

  it("resolves US Dollars ($) for United States (US)", () => {
    const curr = resolveCurrencyFromCountry("US");
    assert.equal(curr.code, "USD");
    assert.equal(curr.symbol, "$");
    assert.equal(curr.flag, "🇺🇸");
    assert.equal(curr.monthly.price, "$2.99");
    assert.equal(curr.yearly.price, "$2.08");
    assert.equal(curr.yearly.billedAnnual, "$24.99");
    assert.equal(curr.lifetime.price, "$49.99");
  });

  it("resolves Euros (€) for Eurozone member countries", () => {
    const eurozoneSamples = ["DE", "FR", "IT", "ES", "NL", "IE", "AT", "PT"];
    for (const code of eurozoneSamples) {
      const curr = resolveCurrencyFromCountry(code);
      assert.equal(curr.code, "EUR", `Expected EUR for country ${code}`);
      assert.equal(curr.symbol, "€");
      assert.equal(curr.monthly.price, "€2.79");
      assert.equal(curr.yearly.billedAnnual, "€22.99");
      assert.equal(curr.lifetime.price, "€45.99");
    }
  });

  it("resolves British Pounds (£) for United Kingdom (GB)", () => {
    const curr = resolveCurrencyFromCountry("GB");
    assert.equal(curr.code, "GBP");
    assert.equal(curr.symbol, "£");
    assert.equal(curr.monthly.price, "£2.49");
    assert.equal(curr.yearly.billedAnnual, "£19.99");
    assert.equal(curr.lifetime.price, "£39.99");
  });

  it("resolves Canadian Dollars (CA$) for Canada (CA)", () => {
    const curr = resolveCurrencyFromCountry("CA");
    assert.equal(curr.code, "CAD");
    assert.equal(curr.symbol, "CA$");
    assert.equal(curr.monthly.price, "CA$3.99");
  });

  it("resolves Australian Dollars (A$) for Australia (AU) and NZ", () => {
    const currAU = resolveCurrencyFromCountry("AU");
    assert.equal(currAU.code, "AUD");
    assert.equal(currAU.symbol, "A$");
    assert.equal(currAU.monthly.price, "A$4.49");

    const currNZ = resolveCurrencyFromCountry("NZ");
    assert.equal(currNZ.code, "AUD");
  });

  it("resolves Japanese Yen (¥) for Japan (JP)", () => {
    const curr = resolveCurrencyFromCountry("JP");
    assert.equal(curr.code, "JPY");
    assert.equal(curr.symbol, "¥");
    assert.equal(curr.monthly.price, "¥450");
    assert.equal(curr.lifetime.price, "¥7,500");
  });

  it("gracefully falls back to USD for missing or unknown country codes", () => {
    assert.equal(resolveCurrencyFromCountry(undefined).code, "USD");
    assert.equal(resolveCurrencyFromCountry("").code, "USD");
    assert.equal(resolveCurrencyFromCountry("XX").code, "USD");
  });

  it("verifies all supported currencies have complete metadata and pricing tiers", () => {
    assert.equal(SUPPORTED_CURRENCY_LIST.length, 7);
    for (const c of SUPPORTED_CURRENCY_LIST) {
      assert.ok(c.code.length === 3);
      assert.ok(c.symbol.length > 0);
      assert.ok(c.flag.length > 0);
      assert.ok(c.monthly.price.startsWith(c.symbol) || c.monthly.price.includes(c.symbol));
      assert.ok(c.yearly.price.startsWith(c.symbol) || c.yearly.price.includes(c.symbol));
      assert.ok(c.yearly.billedAnnual.startsWith(c.symbol) || c.yearly.billedAnnual.includes(c.symbol));
      assert.ok(c.lifetime.price.startsWith(c.symbol) || c.lifetime.price.includes(c.symbol));
    }
  });
});
