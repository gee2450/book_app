import type { CurrentAnimalRow } from "@/shared/infra/db/appDb";
import { isTodayOrYesterday } from "@/shared/lib/date";

function calcNextStage(
  feedCnt: number,
  currentStage: CurrentAnimalRow["stage"]
): CurrentAnimalRow["stage"] {
  if (feedCnt >= 85) return 5;
  if (feedCnt >= 55) return 4;
  if (feedCnt >= 15) return 3;
  if (feedCnt >= 3) return 2;
  return currentStage;
}

function checkIsCompleted(feedCnt: number): boolean {
  return feedCnt >= 100;
}

export function calcNextGrowthState(
  current: CurrentAnimalRow,
  nextFeedCnt: number
) {
  const nextStage = calcNextStage(nextFeedCnt, current.stage);
  const isCompleted = checkIsCompleted(nextFeedCnt);

  return {
    nextStage,
    isCompleted,
    shouldSetFavoriteGenre:
      current.stage !== 4 && nextStage === 4,
  };
}

export function calcNextStreakStartedAt(
  current: CurrentAnimalRow,
  recordDate: string
): string {
  if (!isTodayOrYesterday(current.lastFeedAt)) {
    return recordDate;
  }

  if (!current.streakStartedAt) {
    return recordDate;
  }

  return current.streakStartedAt;
}

export function isSameDay(a?: string | null, b?: string | null): boolean {
  if (!a || !b) return false;

  return a.slice(0, 10) === b.slice(0, 10);
}