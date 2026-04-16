import { describe, expect, it } from "vitest";
import { toWestern } from "../src/to-western";

function dateEqual(actual: Date, year: number, month: number, day: number) {
  expect(actual.getFullYear()).toBe(year);
  expect(actual.getMonth() + 1).toBe(month);
  expect(actual.getDate()).toBe(day);
}

describe("toWestern - default format", () => {
  it("parses a Reiwa date", () => {
    dateEqual(toWestern("令和6年3月8日"), 2024, 3, 8);
  });

  it("parses 元年 as year 1", () => {
    dateEqual(toWestern("令和元年5月1日"), 2019, 5, 1);
  });

  it("parses Heisei date", () => {
    dateEqual(toWestern("平成31年4月30日"), 2019, 4, 30);
  });

  it("parses Showa date", () => {
    dateEqual(toWestern("昭和64年1月7日"), 1989, 1, 7);
  });

  it("parses Taisho date", () => {
    dateEqual(toWestern("大正元年7月30日"), 1912, 7, 30);
  });

  it("parses Meiji date", () => {
    dateEqual(toWestern("明治元年9月8日"), 1868, 9, 8);
  });
});

describe("toWestern - short format", () => {
  it("parses R6.3.8", () => {
    dateEqual(toWestern("R6.3.8"), 2024, 3, 8);
  });

  it("parses H1.1.8", () => {
    dateEqual(toWestern("H1.1.8"), 1989, 1, 8);
  });

  it("parses S1.12.25", () => {
    dateEqual(toWestern("S1.12.25"), 1926, 12, 25);
  });

  it("parses T1.7.30", () => {
    dateEqual(toWestern("T1.7.30"), 1912, 7, 30);
  });

  it("parses M1.9.8", () => {
    dateEqual(toWestern("M1.9.8"), 1868, 9, 8);
  });
});

describe("toWestern - kansuji format", () => {
  it("parses 令和六年三月八日", () => {
    dateEqual(toWestern("令和六年三月八日"), 2024, 3, 8);
  });

  it("parses 令和元年五月一日", () => {
    dateEqual(toWestern("令和元年五月一日"), 2019, 5, 1);
  });

  it("parses 平成三十一年四月三十日", () => {
    dateEqual(toWestern("平成三十一年四月三十日"), 2019, 4, 30);
  });

  it("parses 昭和十年一月一日", () => {
    dateEqual(toWestern("昭和十年一月一日"), 1935, 1, 1);
  });
});

describe("toWestern - error cases", () => {
  it("throws for unparseable string", () => {
    expect(() => toWestern("hello")).toThrow();
  });

  it("throws for empty string", () => {
    expect(() => toWestern("")).toThrow();
  });

  it("throws for year 0", () => {
    expect(() => toWestern("令和0年1月1日")).toThrow();
  });

  it("throws for unknown era name", () => {
    expect(() => toWestern("天保6年3月8日")).toThrow();
  });

  it("throws for unknown abbreviation", () => {
    expect(() => toWestern("X6.3.8")).toThrow();
  });
});
