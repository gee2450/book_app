import type { EmotionId } from "@entities/emotion/model/types";
import { db, type BookRow, type RecordRow } from "@/shared/infra/db/appDb";
import type { RecordListItemModel } from "@/entities/record/model/types";
import type { AnimalInfo } from "@/entities/animal/model/types";
import type { BookInfo } from "@/entities/book/model";
import type { RecordListPage } from "../model/paging";
import { getAppNow } from "@/shared/lib/appDate";


function getTodayRange() {
  const start = getAppNow();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
  };
}

export async function fetchTodayRecordCount(animalId: string): Promise<number> {
  const { startIso, endIso } = getTodayRange();

  return db.records
    .where("[animalId+date]")
    .between(
      [animalId, startIso],
      [animalId, endIso],
      true,
      false
    )
    .count();
}


function formatDateText(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export async function fetchRecordListPage(params: {
  animalId: string | null;
  bookId?: string | null; 
  cursor: string | null;
  limit: number;
}): Promise<RecordListPage> {
  const { animalId, bookId, cursor, limit } = params;

  let recordRows: RecordRow[] = [];

  if (animalId && bookId) {
    const idx = db.records.where("[animalId+bookId+date]");

    if (cursor) {
      recordRows = await idx
        .between(
          [animalId, bookId, ""],
          [animalId, bookId, cursor],
          true,
          false
        )
        .reverse()
        .limit(limit)
        .toArray();
    } else {
      recordRows = await idx
        .between(
          [animalId, bookId, ""],
          [animalId, bookId, "\uffff"],
          true,
          true
        )
        .reverse()
        .limit(limit)
        .toArray();
    }
  } else if (animalId) {
    const idx = db.records.where("[animalId+date]");

    if (cursor) {
      recordRows = await idx
        .between([animalId, ""], [animalId, cursor], true, false)
        .reverse()
        .limit(limit)
        .toArray();
    } else {
      recordRows = await idx
        .between([animalId, ""], [animalId, "\uffff"], true, true)
        .reverse()
        .limit(limit)
        .toArray();
    }
  } else if (bookId) {
    const idx = db.records.where("[bookId+date]");

    if (cursor) {
      recordRows = await idx
        .between([bookId, ""], [bookId, cursor], true, false)
        .reverse()
        .limit(limit)
        .toArray();
    } else {
      recordRows = await idx
        .between([bookId, ""], [bookId, "\uffff"], true, true)
        .reverse()
        .limit(limit)
        .toArray();
    }
  } else {
    if (cursor) {
      recordRows = await db.records
        .where("date")
        .below(cursor)
        .reverse()
        .limit(limit)
        .toArray();
    } else {
      recordRows = await db.records
        .orderBy("date")
        .reverse()
        .limit(limit)
        .toArray();
    }
  }

  const nextCursor = recordRows.length ? recordRows[recordRows.length - 1].date : null;

  /* ----- books join ----- */
  const bookIds = Array.from(new Set(recordRows.map((r) => r.bookId)));
  const books = await db.books.bulkGet(bookIds);

  const bookMap = new Map<string, BookRow | undefined>();
  bookIds.forEach((id, i) => bookMap.set(id, books[i] ?? undefined));

  /* ----- animals join ----- */
  const animalIds = Array.from(new Set(recordRows.map((r) => r.animalId)));
  const animals = await db.animals.bulkGet(animalIds);

  const animalMap = new Map<string, (typeof animals)[number] | undefined>();
  animalIds.forEach((id, i) => animalMap.set(id, animals[i] ?? undefined));

  const items: RecordListItemModel[] = recordRows
    .map((r): RecordListItemModel | null => {
      const book = bookMap.get(r.bookId);
      const animal = animalMap.get(r.animalId);

      if (!book || !animal) return null;

      return {
        id: r.id,

        bookInfo: book as BookInfo,
        animalInfo: animal as AnimalInfo,

        genreSnapshot: r.genreSnapshot ?? "Unknown",
        stageSnapshot: r.stage ?? 1,

        date: formatDateText(r.date),
        memo: (r.memo ?? "").slice(0, 30),
        emotionId: (r.emotionId ?? 1) as EmotionId,
      };
    })
    .filter((v): v is RecordListItemModel => v !== null);

  return {
    items,
    nextCursor,
    hasMore: items.length === limit,
  };
}