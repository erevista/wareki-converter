import { describe, expect, it } from "vitest";
import { toWareki } from "../src/to-wareki";

describe("toWareki - short format", () => {
  it("converts to short format", () => {
    expect(toWareki(new Date(2024, 2, 8)).short()).toBe("R6.3.8");
  });

  it("short format year 1 uses number, not 元", () => {
    expect(toWareki(new Date(2019, 4, 1)).short()).toBe("R1.5.1");
  });

  it("converts Meiji to short format", () => {
    expect(toWareki(new Date(1868, 8, 8)).short()).toBe("M1.9.8");
  });

  it("converts Showa to short format", () => {
    expect(toWareki(new Date(1970, 0, 1)).short()).toBe("S45.1.1");
  });
});

describe("toWareki - kansuji format", () => {
  it("converts to kansuji format", () => {
    expect(toWareki(new Date(2024, 2, 8)).kansuji()).toBe("令和六年三月八日");
  });

  it("kansuji format 元年", () => {
    expect(toWareki(new Date(2019, 4, 1)).kansuji()).toBe("令和元年五月一日");
  });

  it("kansuji double-digit day (29)", () => {
    expect(toWareki(new Date(2024, 1, 29)).kansuji()).toBe("令和六年二月二十九日");
  });

  it("kansuji day 10", () => {
    expect(toWareki(new Date(2024, 0, 10)).kansuji()).toBe("令和六年一月十日");
  });

  it("kansuji double-digit month and day", () => {
    expect(toWareki(new Date(2024, 10, 15)).kansuji()).toBe(
      "令和六年十一月十五日"
    );
  });
});

describe("toWareki - all formats from single result", () => {
  it("returns all three formats from one call", () => {
    const result = toWareki(new Date(2024, 2, 8));
    expect(result.standard()).toBe("令和6年3月8日");
    expect(result.kansuji()).toBe("令和六年三月八日");
    expect(result.short()).toBe("R6.3.8");
  });
});
