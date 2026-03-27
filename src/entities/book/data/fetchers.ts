import { db, type BookRow } from "@/shared/infra/db/appDb";
import type { BookDetailInfo } from "@/entities/book/model/types";
import type { BookListPage } from "../model/paging";

export async function fetchBookListPage(params: {
  animalId: string | null;
  cursor: string | null; // updatedAt cursor
  limit: number;
}): Promise<BookListPage> {
  const { animalId, cursor, limit } = params;

  // 1) animalId 있음: 해당 동물이 읽은 책만 + updatedAt desc
  if (animalId) {
    const rows = await db.book_genre_record_cnt
      .where("animalId")
      .equals(animalId)
      .toArray();

    const countMap = new Map<string, number>();
    for (const r of rows) {
      countMap.set(r.bookId, (countMap.get(r.bookId) ?? 0) + r.count);
    }

    const bookIds = Array.from(countMap.keys());
    const total = bookIds.length;

    const bookRows = bookIds.length === 0
      ? []
      : (await db.books.bulkGet(bookIds)).filter(
        (b): b is BookRow => !!b
      );

    const sortedRows = bookRows
      .slice()
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    const pagedRows = cursor
      ? sortedRows.filter((b) => b.updatedAt < cursor).slice(0, limit)
      : sortedRows.slice(0, limit);

    const items: BookDetailInfo[] = pagedRows.map((b) => ({
      id: b.id,
      title: b.title,
      genre: b.genre ?? "Unknown",
      author: b.author ?? null,
      image: b.img ?? null,
      memo: b.memo ?? null,
      updatedAt: b.updatedAt,
      recordCount: countMap.get(b.id) ?? 0,
    }));

    const nextCursor =
      pagedRows.length > 0 ? pagedRows[pagedRows.length - 1].updatedAt : null;

    const hasMore = items.length === limit;

    return { items, total, nextCursor, hasMore };
  }

  // 2) animalId 없음: 전체 books 최신순
  const total = await db.books.count();

  let bookRows: BookRow[];
  if (cursor) {
    bookRows = await db.books
      .where("updatedAt")
      .below(cursor)
      .reverse()
      .limit(limit)
      .toArray();
  } else {
    bookRows = await db.books
      .orderBy("updatedAt")
      .reverse()
      .limit(limit)
      .toArray();
  }

  const bookIds = bookRows.map((b) => b.id);

  const cntRows =
    bookIds.length === 0
      ? []
      : await db.book_genre_record_cnt.where("bookId").anyOf(bookIds).toArray();

  const countMap = new Map<string, number>();
  for (const r of cntRows) {
    countMap.set(r.bookId, (countMap.get(r.bookId) ?? 0) + r.count);
  }

  const items: BookDetailInfo[] = bookRows.map((b) => ({
    id: b.id,
    title: b.title,
    genre: b.genre,
    author: b.author ?? undefined,
    image: b.img ?? null,
    memo: b.memo ?? null,
    recordCount: countMap.get(b.id) ?? 0,
    updatedAt: b.updatedAt,
  }));

  const nextCursor =
    bookRows.length > 0 ? bookRows[bookRows.length - 1].updatedAt : null;
  const hasMore = items.length === limit;

  return { items, total, nextCursor, hasMore };
}