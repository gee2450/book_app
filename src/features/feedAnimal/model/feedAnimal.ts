import { db, type CurrentAnimalRow } from "@/shared/infra/db/appDb";
import type { CurrentAnimal } from "@/entities/animal/model/types";

import {
  uuid,
  getCurrentAnimalRow,
  getCurrentAnimalInfo,
  getBookOrThrow,
  buildRecordRow,
  updateBookGenreRecordCount,
  calcFavoriteGenre,
} from "./feedAnimal.helpers";
import type { FeedAnimalInput, FeedAnimalResult } from "./feedAnimal.types";
import { calcNextStage, calcNextStreakStartedAt, checkIsCompleted, isSameDay } from "./feedAnimal.rules";
import { nowIso } from "@/shared/lib/appDate";


export async function feedAnimal(
  input: FeedAnimalInput
): Promise<FeedAnimalResult> {
  const now = nowIso();

  return db.transaction(
    "rw",
    [db.current_animal, db.animals, db.books, db.records, db.book_genre_record_cnt, db.journeys],
    async () => {
      const current = await getCurrentAnimalRow();
      const animal = await getCurrentAnimalInfo(current.animalId);
      const book = await getBookOrThrow(input.bookId);

      const recordDate = input.date ?? now;
      const genreSnapshot = book.genre;
      const recordId = uuid();

      await db.records.add(
        buildRecordRow({
          recordId,
          current,
          bookId: input.bookId,
          genreSnapshot,
          recordDate,
          emotionId: input.emotionId,
          memo: input.memo,
        })
      );

      await db.books.update(input.bookId, {
        updatedAt: recordDate,
      });

      await updateBookGenreRecordCount({
        animalId: current.animalId,
        bookId: input.bookId,
        genre: genreSnapshot,
      });

      const alreadyFedToday = current.lastFeedAt && isSameDay(current.lastFeedAt, recordDate);

      const nextFeedCnt = alreadyFedToday
        ? current.feedCnt ?? 0
        : (current.feedCnt ?? 0) + 1;
      
      const nextStage = calcNextStage(nextFeedCnt, current.stage);
      const isCompleted = checkIsCompleted(nextFeedCnt);

      let nextFavoriteGenre = current.favoriteGenre;
      if (current.stage !== 4 && nextStage === 4) {
        nextFavoriteGenre = await calcFavoriteGenre(current.animalId);
      }

      const nextStreakStartedAt = calcNextStreakStartedAt(current, recordDate);

      const nextCurrentRow: CurrentAnimalRow = {
        id: "current",
        animalId: current.animalId,
        feedCnt: nextFeedCnt,
        stage: nextStage,
        startedAt: current.startedAt,
        streakStartedAt: nextStreakStartedAt,
        lastFeedAt: recordDate,
        favoriteGenre: nextFavoriteGenre ?? null,
      };

      await db.current_animal.put(nextCurrentRow);

      // Journey 자동 생성 (feedCnt >= 100일 때)
      if (isCompleted) {
        const totalRecordCnt = await db.records
          .where("animalId")
          .equals(current.animalId)
          .count();

        await db.journeys.add({
          animalId: current.animalId,
          favoriteGenre: nextFavoriteGenre ?? "Unknown",
          feedCnt: nextFeedCnt,
          totalRecordCnt,
          startedAt: current.startedAt,
          endedAt: recordDate,
        });
      }

      const nextCurrent: CurrentAnimal = {
        ...nextCurrentRow,
        id: nextCurrentRow.animalId,
        isCompleted: isCompleted,
        type: animal.type,
        name: animal.name,
      };

      return {
        currentAnimal: nextCurrent,
      };
    }
  );
}