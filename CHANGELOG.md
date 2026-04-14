# Changelog

## [0.1.0] - 2026-04-03

### Added

- `toWareki(date, options?)` - Convert Date to wareki string
  - Default format: `令和6年3月8日`
  - Short format: `R6.3.8`
  - Kansuji format: `令和六年三月八日`
- `fromWareki(wareki)` - Parse wareki string to Date
  - Supports all 3 output formats as input
- Support for 5 eras: 明治, 大正, 昭和, 平成, 令和
- 元年 notation for first year of each era
- TypeScript type definitions included
- Dual CJS/ESM output
