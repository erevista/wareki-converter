import { findEra } from "./eras";
import type { WarekiResult } from "./types";

const DATE_PATTERN = /^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/;

function parseDate(input: Date | string): Date {
  if (input instanceof Date) return input;
  if (!DATE_PATTERN.test(input)) {
    throw new Error(`Invalid date string: "${input}"`);
  }
  const [y, m, d] = input.split(/[-/]/).map(Number);
  return new Date(y, m - 1, d);
}

function formatYear(year: number): string {
  if (year === 1) return "元";
  return String(year);
}

function formatYearKansuji(year: number): string {
  if (year === 1) return "元";
  return toKansuji(year);
}

export function toWareki(input: Date | string): WarekiResult {
  const date = parseDate(input);
  const era = findEra(date);
  const year = date.getFullYear() - era.startDate.getFullYear() + 1;
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {
    standard: () =>
      `${era.name}${formatYear(year)}年${month}月${day}日`,
    kansuji: () =>
      `${era.name}${formatYearKansuji(year)}年${toKansuji(month)}月${toKansuji(day)}日`,
    short: () => `${era.abbreviation}${year}.${month}.${day}`,
  };
}

const K = "〇一二三四五六七八九".split("");

function toKansuji(n: number): string {
  if (n < 10) return K[n];
  if (n === 10) return "十";
  const t = Math.floor(n / 10);
  const o = n % 10;
  const suffix = o ? K[o] : "";
  if (t === 1) return `十${suffix}`;
  return `${K[t]}十${suffix}`;
}
