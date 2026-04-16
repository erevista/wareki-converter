# wareki-converter

[![npm version](https://img.shields.io/npm/v/wareki-converter)](https://www.npmjs.com/package/wareki-converter)
[![license](https://img.shields.io/npm/l/wareki-converter)](./LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/wareki-converter)](https://bundlephobia.com/package/wareki-converter)

Zero-dependency, ultra-lightweight converter between the Japanese era calendar (wareki) and the Western calendar.

## Features

- **Tiny** — < 2 KB (ESM, minified). `dayjs` + locale + plugin is ~7 KB.
- **Zero dependencies**
- **Bidirectional** — Western to wareki and wareki to Western
- **Multiple formats** — standard, kansuji (Chinese numerals), and short
- **Flexible input** — accepts `Date` objects and date strings (`YYYY-MM-DD`, `YYYY/M/D`)
- **TypeScript** — written in TypeScript with full type definitions
- **ESM & CJS** — works in any environment

## Install

```bash
npm install wareki-converter
```

## Quick Start

```ts
import { toWareki, toWestern } from "wareki-converter";

// Western → Wareki
const result = toWareki("2024-03-08");
result.standard(); // "令和6年3月8日"
result.kansuji();  // "令和六年三月八日"
result.short();    // "R6.3.8"

// Wareki → Western
toWestern("令和6年3月8日"); // Date(2024, 2, 8)
```

## Usage

### `toWareki` — Western to Wareki

Accepts a `Date` object or a date string.

```ts
import { toWareki } from "wareki-converter";

// Date object
const result = toWareki(new Date(2024, 2, 8));

// Date string (hyphen or slash separator)
const result = toWareki("2024-03-08");
const result = toWareki("2024/3/8");
```

The returned object provides three output formats:

| Method       | Output             | Description              |
| ------------ | ------------------ | ------------------------ |
| `standard()` | `"令和6年3月8日"`   | Arabic numerals (default)|
| `kansuji()`  | `"令和六年三月八日"` | Chinese numerals         |
| `short()`    | `"R6.3.8"`         | Abbreviated              |

The first year of an era is displayed as `元年` (gannen) instead of `1年`:

```ts
toWareki("2019-05-01").standard(); // "令和元年5月1日"
toWareki("2019-05-01").kansuji();  // "令和元年五月一日"
toWareki("2019-05-01").short();    // "R1.5.1"
```

### `toWestern` — Wareki to Western

Parses any of the three formats and returns a `Date`.

```ts
import { toWestern } from "wareki-converter";

toWestern("令和6年3月8日");   // Date(2024, 2, 8)
toWestern("令和六年三月八日"); // Date(2024, 2, 8)
toWestern("R6.3.8");         // Date(2024, 2, 8)
```

## API Reference

### `toWareki(input: Date | string): WarekiResult`

Converts a Western date to wareki.

| Parameter | Type             | Description                                  |
| --------- | ---------------- | -------------------------------------------- |
| `input`   | `Date \| string` | `Date` object or string in `YYYY-MM-DD` / `YYYY/M/D` format |

**Returns** a `WarekiResult` object with `standard()`, `kansuji()`, and `short()` methods.

**Throws** `Error` if the date is before the Meiji era (1868-09-08) or if the string format is invalid.

### `toWestern(wareki: string): Date`

Parses a wareki string and returns a `Date`.

| Parameter | Type     | Description                                     |
| --------- | -------- | ----------------------------------------------- |
| `wareki`  | `string` | Wareki string in standard, kansuji, or short format |

**Throws** `Error` for invalid or unparseable input.

## Supported Eras

| Era    | Abbreviation | Start      | End        |
| ------ | ------------ | ---------- | ---------- |
| 明治   | M            | 1868-09-08 | 1912-07-29 |
| 大正   | T            | 1912-07-30 | 1926-12-24 |
| 昭和   | S            | 1926-12-25 | 1989-01-07 |
| 平成   | H            | 1989-01-08 | 2019-04-30 |
| 令和   | R            | 2019-05-01 | —          |

## License

[MIT](./LICENSE)
