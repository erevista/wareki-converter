import type { Era } from "./types";

// [name, abbreviation, startYear, startMonth(0-based), startDay]
const D: [string, string, number, number, number][] = [
  ["明治", "M", 1868, 8, 8],
  ["大正", "T", 1912, 6, 30],
  ["昭和", "S", 1926, 11, 25],
  ["平成", "H", 1989, 0, 8],
  ["令和", "R", 2019, 4, 1],
];

export const ERAS: Era[] = D.map(([name, abbreviation, y, m, d]) => ({
  name,
  abbreviation,
  startDate: new Date(y, m, d),
}));

export function findEra(date: Date): Era {
  for (let i = ERAS.length - 1; i >= 0; i--) {
    if (date >= ERAS[i].startDate) return ERAS[i];
  }
  throw new Error("Date is before the Meiji era (1868-09-08)");
}
