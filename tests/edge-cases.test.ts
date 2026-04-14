import { describe, expect, it } from "vitest";
import { toWareki } from "../src/to-wareki";

describe("toWareki - edge cases", () => {
  it("throws for date before Meiji era", () => {
    expect(() => toWareki(new Date(1868, 0, 24))).toThrow(
      "Date is before the Meiji era"
    );
  });

  it("throws for date well before Meiji", () => {
    expect(() => toWareki(new Date(1800, 0, 1))).toThrow(
      "Date is before the Meiji era"
    );
  });

  it("converts era boundary date to new era", () => {
    expect(toWareki(new Date(2019, 4, 1)).standard()).toBe("令和元年5月1日");
  });

  it("converts day before era boundary to old era", () => {
    expect(toWareki(new Date(2019, 3, 30)).standard()).toBe("平成31年4月30日");
  });

  it("trusts JS Date correction for invalid dates", () => {
    const corrected = new Date(2024, 1, 30);
    expect(toWareki(corrected).standard()).toBe("令和6年3月1日");
  });
});

describe("toWareki - string input", () => {
  it("accepts hyphen-separated date string", () => {
    expect(toWareki("2024-03-08").standard()).toBe("令和6年3月8日");
  });

  it("accepts slash-separated date string", () => {
    expect(toWareki("2024/3/8").standard()).toBe("令和6年3月8日");
  });

  it("string input works with all formats", () => {
    expect(toWareki("2019-05-01").standard()).toBe("令和元年5月1日");
    expect(toWareki("2019-05-01").kansuji()).toBe("令和元年五月一日");
    expect(toWareki("2019-05-01").short()).toBe("R1.5.1");
  });

  it("throws for invalid date string format", () => {
    expect(() => toWareki("not-a-date")).toThrow("Invalid date string");
  });

  it("throws for partial date string", () => {
    expect(() => toWareki("2024-03")).toThrow("Invalid date string");
  });

  it("throws for date string before Meiji", () => {
    expect(() => toWareki("1800-01-01")).toThrow(
      "Date is before the Meiji era"
    );
  });
});
