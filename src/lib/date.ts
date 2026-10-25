// The arithmetic runs in UTC, so daylight saving time never shifts a day.

export type IsoDate = string;

export type DateRange = { start: IsoDate | null; end: IsoDate | null };

const isoPattern = /^(\d{4})-(\d{2})-(\d{2})$/;

export function toUtcDate(value: IsoDate) {
  const match = isoPattern.exec(value);
  if (!match) return undefined;
  const date = new Date(Date.UTC(+match[1], +match[2] - 1, +match[3]));
  // Rejects days that don't exist, such as February 30th (Date would roll it over to March).
  return date.getUTCMonth() === +match[2] - 1 ? date : undefined;
}

export function toIsoDate(date: Date): IsoDate {
  return date.toISOString().slice(0, 10);
}

export function isIsoDate(value: unknown): boolean {
  return typeof value === 'string' && toUtcDate(value) !== undefined;
}

export function todayIso(): IsoDate {
  const now = new Date();
  return toIsoDate(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
}

export function addDays(value: IsoDate, days: number): IsoDate {
  const date = toUtcDate(value)!;
  date.setUTCDate(date.getUTCDate() + days);
  return toIsoDate(date);
}

export function addMonths(value: IsoDate, months: number): IsoDate {
  const date = toUtcDate(value)!;
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return toIsoDate(date);
}

export function startOfMonth(value: IsoDate): IsoDate {
  return `${value.slice(0, 8)}01`;
}

export function dayOfWeek(value: IsoDate) {
  return toUtcDate(value)!.getUTCDay();
}

export function clampDate(value: IsoDate, min?: IsoDate, max?: IsoDate): IsoDate {
  if (min && value < min) return min;
  if (max && value > max) return max;
  return value;
}

export function monthWeeks(month: IsoDate, weekStartsOn: number): (IsoDate | null)[][] {
  const first = startOfMonth(month);
  const offset = (dayOfWeek(first) - weekStartsOn + 7) % 7;
  const days: (IsoDate | null)[] = Array.from({ length: offset }, () => null);
  for (let day = first; day.slice(0, 7) === first.slice(0, 7); day = addDays(day, 1)) days.push(day);
  while (days.length % 7) days.push(null);
  return Array.from({ length: days.length / 7 }, (_, week) => days.slice(week * 7, week * 7 + 7));
}

export function formatDate(value: IsoDate, locale: string | undefined, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' }).format(toUtcDate(value));
}

export function formatShortDate(value: IsoDate, locale: string | undefined) {
  return formatDate(value, locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function dateOrder(locale: string | undefined): ('day' | 'month' | 'year')[] {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'numeric', year: 'numeric' })
    .formatToParts(new Date(Date.UTC(2026, 9, 25)))
    .filter((part) => part.type === 'day' || part.type === 'month' || part.type === 'year')
    .map((part) => part.type as 'day' | 'month' | 'year');
}

export function parseDate(text: string, locale: string | undefined, reference: IsoDate = todayIso()) {
  const input = text.trim();
  if (!input) return undefined;
  if (isIsoDate(input)) return input;

  let numbers = input.split(/[^\d]+/).filter(Boolean);
  if (numbers.length === 1 && /^\d{4}(\d{2}|\d{4})?$/.test(numbers[0])) {
    const digits = numbers[0];
    numbers = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean);
  }
  if (numbers.length < 2 || numbers.length > 3) return undefined;

  const order = dateOrder(locale).filter((part) => numbers.length === 3 || part !== 'year');
  const parts: Record<string, number> = { year: +reference.slice(0, 4) };
  order.forEach((part, index) => {
    parts[part] = +numbers[index];
  });
  if (parts.year < 100) parts.year += Math.floor(+reference.slice(0, 4) / 100) * 100;

  const iso = `${String(parts.year).padStart(4, '0')}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`;
  return isIsoDate(iso) ? iso : undefined;
}
