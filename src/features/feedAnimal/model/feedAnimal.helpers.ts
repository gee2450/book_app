import { db, type CurrentAnimalRow, type RecordRow } from "@/shared/infra/db/appDb";
import type { EmotionId } from "@/entities/emotion/model/types";
import type { Genre } from "@/entities/book/model/types";


export function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export async function getCurrentAnimalRow(): Promise<CurrentAnimalRow> {
  const current = await db.current_animal.get("current");

  if (!current) {
    throw new Error("current animal not found");
  }

  return current;
}

export async function getCurrentAnimalInfo(animalId: string) {
  const animal = await db.animals.get(animalId);

  if (!animal) {
    throw new Error(`animal not found: ${animalId}`);
  }

  return animal;
}

export async function getBookOrThrow(bookId: string) {
  const book = await db.books.get(bookId);

  if (!book) {
    throw new Error(`book not found: ${bookId}`);
  }

  return book;
}

export function buildRecordRow(params: {
  recordId: string;
  current: CurrentAnimalRow;
  bookId: string;
  genreSnapshot: Genre;
  recordDate: string;
  emotionId: EmotionId;
  memo?: string | null;
}): RecordRow {
  const {
    recordId,
    current,
    bookId,
    genreSnapshot,
    recordDate,
    emotionId,
    memo,
  } = params;

  return {
    id: recordId,
    animalId: current.animalId,
    stage: current.stage,
    favoriteGenre: current.favoriteGenre,
    bookId,
    genreSnapshot,
    date: recordDate,
    emotionId: emotionId ?? null,
    memo: memo ?? null,
  };
}

export async function updateBookGenreRecordCount(params: {
  animalId: string;
  bookId: string;
  genre: Genre;
}) {
  const { animalId, bookId, genre } = params;

  const key: [string, string, Genre] = [animalId, bookId, genre];
  const agg = await db.book_genre_record_cnt.get(key);

  if (!agg) {
    await db.book_genre_record_cnt.add({
      animalId,
      bookId,
      genre,
      count: 1,
    });
    return;
  }

  await db.book_genre_record_cnt.put({
    ...agg,
    count: (agg.count ?? 0) + 1,
  });
}

export async function calcFavoriteGenre(animalId: string): Promise<Genre | null> {
  const rows = await db.book_genre_record_cnt
    .where("animalId")
    .equals(animalId)
    .toArray();

  if (rows.length === 0) return null;

  let best: Genre | null = null;
  let bestVal = -1;

  for (const row of rows) {
    const count = row.count ?? 0;
    if (count > bestVal) {
      bestVal = count;
      best = row.genre;
    }
  }

  return best;
}