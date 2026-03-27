import Dexie from "dexie";
import { db, type BookGenreRecordCntRow, type BookRow, type JourneyRow } from "@/shared/infra/db/appDb";
import type { BookDetailInfo, Genre } from "@/entities/book/model";
import type { AnimalInfo, AnimalType } from "@/entities/animal/model/types";
import type { JourneyDetail, JourneySummary } from "@/entities/journey/model/types";


type AnimalRow = {
  id: string;
  type: AnimalType;
  name?: string | null;
};

export async function fetchJourneySummariesByGenre(params: {
  genre: Genre;
  animalType: AnimalType;
}): Promise<{ journeys: JourneySummary[]; metCount: number }> {
  const { genre, animalType } = params;

  // 1) journeys: 복합 인덱스 [favoriteGenre+endedAt]로 최신순
  const journeyRows = (await db.journeys
    .where("[favoriteGenre+endedAt]")
    .between([genre, Dexie.minKey], [genre, Dexie.maxKey])
    .reverse()
    .toArray()) as unknown as JourneyRow[];

  if (journeyRows.length === 0) return { journeys: [], metCount: 0 };

  // 2) animals: bulkGet으로 한 번에
  const animalIds = Array.from(new Set(journeyRows.map((j) => j.animalId)));
  const animals = (await db.animals.bulkGet(animalIds)) as Array<AnimalRow | undefined>;

  const animalById = new Map<string, AnimalRow>();
  for (const a of animals) if (a) animalById.set(a.id, a);

  // 3) join + animalType 필터 + summary 변환
  const journeys: JourneySummary[] = [];
  for (const j of journeyRows) {
    const a = animalById.get(j.animalId);
    if (!a) continue;
    if (a.type !== animalType) continue;

    journeys.push({
      animalInfo: {
        id: a.id,
        type: a.type,
        name: a.name ?? null,
      },

      startedAt: j.startedAt,
      endedAt: j.endedAt,

      favoriteGenre: j.favoriteGenre,
      totalRecordCnt: j.totalRecordCnt

    } as JourneySummary);
  }

  return { journeys, metCount: journeys.length };
}

export async function fetchJourneyDetail(animalId: string): Promise<JourneyDetail> {
  if (!animalId) throw new Error("animalId is required");

  // 1) 해당 animalId인 journeys row 다 가져오기
  const journey = await db.journeys.get(animalId);
  if (!journey) throw new Error("Journey not found");

  // 2) animal 정보 가져오기
  const animal = await db.animals.get(animalId);
  if (!animal) throw new Error("Animal not found");

  const animalInfo: AnimalInfo = {
    id: animal.id,
    type: animal.type,
    name: animal.name ?? null,
  };

  // 3-1) book_genre_record_cnt에서 해당 animalId row 전부
  const cntRows = (await db.book_genre_record_cnt
    .where("animalId")
    .equals(animalId)
    .toArray()) as BookGenreRecordCntRow[];

  // 3-2) 해당 row들의 book 정보 가져오기 (bulkGet)
  const bookIds = Array.from(new Set(cntRows.map((r) => r.bookId)));
  const books = (await db.books.bulkGet(bookIds)) as Array<BookRow| undefined>;

  const bookById = new Map<string, BookRow>();
  for (const b of books) {
    if (b) bookById.set(b.id, b);
  }

  // 3-3) (genreSnapshot, count, book)로 리스트 만들기
  const bookGenreCounts: BookDetailInfo[] = [];
  for (const r of cntRows) {
    const book = bookById.get(r.bookId);
    if (!book) continue;

    bookGenreCounts.push({
      id: book.id,
      title: book.title,
      author: book.author,
      image: book.img,
      memo: book.memo,
      updatedAt: book.updatedAt,

      genre: r.genre,
      recordCount: r.count,
    } as BookDetailInfo);
  }

  bookGenreCounts.sort((a, b) => b.recordCount - a.recordCount);

  return {
    animalInfo: animalInfo,

    startedAt: journey.startedAt,
    endedAt: journey.endedAt,

    favoriteGenre: journey.favoriteGenre,
    totalRecordCnt: journey.totalRecordCnt,

    records: bookGenreCounts,
  };
}