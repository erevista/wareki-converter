export interface WarekiResult {
  standard(): string;
  kansuji(): string;
  short(): string;
}

export interface Era {
  name: string;
  abbreviation: string;
  startDate: Date;
}
