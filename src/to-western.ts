import { ERAS } from "./eras";
import type { Era } from "./types";

const BY_NAME = new Map<string, Era>(ERAS.map((e) => [e.name, e]));
const BY_ABBR = new Map<string, Era>(ERAS.map((e) => [e.abbreviation, e]));

const E = "明治|大正|昭和|平成|令和";
const KN = "[一二三四五六七八九十]+";
const RE_DEF = new RegExp(`^(${E})(元|\\d+)年(\\d+)月(\\d+)日$`);
const RE_SHORT = /^([MTSHR])(\d+)\.(\d+)\.(\d+)$/;
const RE_KAN = new RegExp(`^(${E})(元|${KN})年(${KN})月(${KN})日$`);

const KM: Record<string, number> = {
  一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9,
};

function kanNum(s: string): number {
  if (s === "十") return 10;
  let r = 0, i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "十") {
      if (r === 0) r = 1;
      r *= 10;
      i++;
      if (i < s.length && KM[s[i]]) { r += KM[s[i]]; i++; }
    } else if (KM[c]) { r = KM[c]; i++; }
    else break;
  }
  return r;
}

export function toWestern(wareki: string): Date {
  let era: Era | undefined;
  let year: number, month: number, day: number;

  let m = wareki.match(RE_DEF);
  if (m) {
    era = BY_NAME.get(m[1]);
    if (m[2] === "元") {
      year = 1;
    } else {
      year = +m[2];
    }
    month = +m[3];
    day = +m[4];
  } else if ((m = wareki.match(RE_SHORT))) {
    era = BY_ABBR.get(m[1]);
    year = +m[2];
    month = +m[3];
    day = +m[4];
  } else if ((m = wareki.match(RE_KAN))) {
    era = BY_NAME.get(m[1]);
    if (m[2] === "元") {
      year = 1;
    } else {
      year = kanNum(m[2]);
    }
    month = kanNum(m[3]);
    day = kanNum(m[4]);
  } else {
    throw new Error(`Invalid wareki string: "${wareki}"`);
  }

  if (!era) throw new Error(`Unknown era in wareki string: "${wareki}"`);
  if (year <= 0) throw new Error(`Invalid year in wareki string: "${wareki}"`);

  return new Date(era.startDate.getFullYear() + year - 1, month - 1, day);
}
