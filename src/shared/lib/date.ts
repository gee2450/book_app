import { getAppNow } from "./appDate";

const DAY_MS = 1000 * 60 * 60 * 24;

export function formatDisplayDate(
  dateStr: string,
  locale: string = navigator.language
): string {
  const d = new Date(dateStr);

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function diffCalendarDays(a: Date, b: Date): number {
  const aa = startOfDay(a);
  const bb = startOfDay(b);
  return Math.floor((aa.getTime() - bb.getTime()) / DAY_MS);
}

/** target이 today 기준으로 오늘(0일 차)인지 어제(1일 차)인지 */
export function isTodayOrYesterday(targetIso: string | null | undefined): boolean {
  if (!targetIso) return false;

  const diff = diffCalendarDays(getAppNow(), new Date(targetIso));
  return diff === 0 || diff === 1;
}

export function getStreakDays(
  lastFeedAt: string | null | undefined,
  streakStartedAt: string | null | undefined
): number {
  if (!lastFeedAt || !streakStartedAt) return 0;
  if (!isTodayOrYesterday(lastFeedAt)) return 0;

  const days = diffCalendarDays(new Date(lastFeedAt), new Date(streakStartedAt));
  return days + 1;
}