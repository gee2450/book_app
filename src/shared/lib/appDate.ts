const DEV_DATE_KEY = "book-app-dev-date";

function isValidDate(value: string | null): value is string {
  if (!value) return false;
  return !Number.isNaN(new Date(value).getTime());
}

/** 앱이 참조하는 현재 시각 */
export function getAppNow(): Date {
  if (import.meta.env.DEV) {
    const stored = localStorage.getItem(DEV_DATE_KEY);
    if (isValidDate(stored)) {
      return new Date(stored);
    }
  }

  return new Date();
}

/** 앱 기준 현재 시각 ISO */
export function nowIso(): string {
  return getAppNow().toISOString();
}

/** YYYY-MM-DD */
export function getAppDateKey(): string {
  const d = getAppNow();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 화면 표시용 */
export function getAppDateLabel(): string {
  const d = getAppNow();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** DEV에서만 하루 전진 */
export function moveAppDateToNextDay(): string {
  const base = getAppNow();
  const next = new Date(base);
  next.setDate(next.getDate() + 1);

  if (import.meta.env.DEV) {
    localStorage.setItem(DEV_DATE_KEY, next.toISOString());
  }

  return next.toISOString();
}

/** 필요하면 나중에만 사용 */
export function clearAppDateOverride() {
  localStorage.removeItem(DEV_DATE_KEY);
}