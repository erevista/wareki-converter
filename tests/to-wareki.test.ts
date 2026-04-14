import { describe, expect, it } from "vitest";
import { toWareki } from "../src/to-wareki";

describe("toWareki - standard format", () => {
  it("converts a Reiwa date", () => {
    expect(toWareki(new Date(2024, 2, 8)).standard()).toBe("令和6年3月8日");
  });

  it("converts Reiwa era start (元年)", () => {
    expect(toWareki(new Date(2019, 4, 1)).standard()).toBe("令和元年5月1日");
  });

  it("converts last day of Heisei", () => {
    expect(toWareki(new Date(2019, 3, 30)).standard()).toBe("平成31年4月30日");
  });

  it("converts Heisei era start (元年)", () => {
    expect(toWareki(new Date(1989, 0, 8)).standard()).toBe("平成元年1月8日");
  });

  it("converts last day of Showa", () => {
    expect(toWareki(new Date(1989, 0, 7)).standard()).toBe("昭和64年1月7日");
  });

  it("converts Showa era start (元年)", () => {
    expect(toWareki(new Date(1926, 11, 25)).standard()).toBe("昭和元年12月25日");
  });

  it("converts last day of Taisho", () => {
    expect(toWareki(new Date(1926, 11, 24)).standard()).toBe("大正15年12月24日");
  });

  it("converts Taisho era start (元年)", () => {
    expect(toWareki(new Date(1912, 6, 30)).standard()).toBe("大正元年7月30日");
  });

  it("converts last day of Meiji", () => {
    expect(toWareki(new Date(1912, 6, 29)).standard()).toBe("明治45年7月29日");
  });

  it("converts Meiji era start (元年)", () => {
    expect(toWareki(new Date(1868, 8, 8)).standard()).toBe("明治元年9月8日");
  });

  it("converts a mid-era date", () => {
    expect(toWareki(new Date(2000, 0, 1)).standard()).toBe("平成12年1月1日");
  });

  it("handles leap year Feb 29", () => {
    expect(toWareki(new Date(2024, 1, 29)).standard()).toBe("令和6年2月29日");
  });
});
