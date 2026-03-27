import { getAppNow } from "./appDate";

const DAY_MS = 1000 * 60 * 60 * 24;

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