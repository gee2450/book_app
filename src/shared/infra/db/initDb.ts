import { db } from "./appDb";
import type { AnimalType } from "@/entities/animal/model/types";
import type { Genre } from "@/entities/book/model/types";
import type { EmotionId } from "@/entities/emotion/model/types";

// 개발용 컬렉션 더미 생성
import dummyDataJson from "./dummyData.json";

export type ISODateString = string;

/** ----------------------------
 *  DB 설계 기준 Row 타입(only schema fields)
 *  ---------------------------- */
type AnimalRow = {
  id: string;
  name: string;
  type: AnimalType;
};

type CurrentAnimalRow = {
  id: "current";
  animalId: string;
  feedCnt: number;
  stage: 1 | 2 | 3 | 4 | 5;
  startedAt: ISODateString;
  streakStartedAt?: ISODateString | null;
  lastFeedAt?: ISODateString | null;
  favoriteGenre?: Genre | null;
};

type BookRow = {
  id: string;
  title: string;
  genre: Genre;
  author?: string | null;
  img?: Blob | null;
  memo?: string | null;
  updatedAt: ISODateString;
};

type RecordRow = {
  id: string;
  animalId: string;
  bookId: string;
  date: ISODateString;

  stage: 1 | 2 | 3 | 4 | 5;
  favoriteGenre?: Genre | null;
  genreSnapshot: Genre;

  emotionId: EmotionId;
  memo?: string | null;
};

type BookGenreRecordCntRow = {
  animalId: string;
  bookId: string;
  genre: Genre;
  count: number;
};

type JourneyRow = {
  animalId: string;
  favoriteGenre: Genre;
  feedCnt: number;
  totalRecordCnt: number;
  startedAt: ISODateString;
  endedAt: ISODateString;
};

type DummyData = {
  animals?: AnimalRow[];
  current_animal?: CurrentAnimalRow | null;
  books?: BookRow[];
  records?: RecordRow[];
  book_genre_record_cnt?: BookGenreRecordCntRow[];
  journeys?: JourneyRow[];
};

const dummyData = dummyDataJson as DummyData;

/** ---------------------------------------
 *  시딩용 normalize (스키마 필드만!)
 *  -------------------------------------- */
function normalizeDummy() {
  const animals: AnimalRow[] = (dummyData.animals ?? []).map((a) => ({
    id: a.id,
    name: a.name ?? "",
    type: a.type,
  }));

  const books: BookRow[] = (dummyData.books ?? []).map((b) => ({
    id: b.id,
    title: b.title,
    genre: b.genre,
    author: b.author ?? null,
    img: b.img,
    memo: b.memo ?? null,
    updatedAt: b.updatedAt,
  }));

  const records: RecordRow[] = (dummyData.records ?? []).map((r) => ({
    id: r.id,
    animalId: r.animalId,
    bookId: r.bookId,
    date: r.date,
    stage: r.stage,
    favoriteGenre: r.favoriteGenre ?? null,
    genreSnapshot: r.genreSnapshot,
    emotionId: r.emotionId,
    memo: r.memo ?? null,
  }));

  const bookGenreCnt: BookGenreRecordCntRow[] = (dummyData.book_genre_record_cnt ?? []).map(
    (x) => ({
      animalId: x.animalId,
      bookId: x.bookId,
      genre: x.genre,
      count: x.count ?? 0,
    })
  );

  const journeys: JourneyRow[] = (dummyData.journeys ?? []).map((j) => ({
    animalId: j.animalId,
    favoriteGenre: j.favoriteGenre,
    feedCnt: j.feedCnt,
    totalRecordCnt: j.totalRecordCnt,
    startedAt: j.startedAt,
    endedAt: j.endedAt,
  }));

  return { animals, books, records, bookGenreCnt, journeys };
}

/** ---------------------------------------
 *  완전 초기 상태 판별
 *  -------------------------------------- */
async function isFreshDb() {
  const [recordCount, journeyCount, animalCount, bookCount] = await Promise.all([
    db.records.count(),
    db.journeys.count(),
    db.animals.count(),
    db.books.count(),
  ]);

  return recordCount === 0 && journeyCount === 0 && animalCount === 0 && bookCount === 0;
}

/** ---------------------------------------
 *  ✅ 외부에서 호출하는 메인 init
 *  -------------------------------------- */
export async function initDb() {
  await db.open();

  // Dexie 인자 제한 회피: 모든 테이블을 트랜잭션에 포함
  await db.transaction("rw", db.tables, async () => {
    if (await isFreshDb()) {
      const { animals, books, records, bookGenreCnt, journeys } = normalizeDummy();

      if (animals.length) await db.animals.bulkPut(animals);
      if (books.length) await db.books.bulkPut(books);
      if (records.length) await db.records.bulkPut(records);
      if (bookGenreCnt.length) await db.book_genre_record_cnt.bulkPut(bookGenreCnt);
      if (journeys.length) await db.journeys.bulkPut(journeys);

      return;
    }
  });
}

/** ---------------------------------------
 *  개발용: 전체 초기화(싹 지우기)
 *  -------------------------------------- */
export async function resetDb() {
  await db.open();
  await db.transaction("rw", db.tables, async () => {
    // FK는 없지만, 습관적으로 child -> parent 순서로 지우면 마음이 편함
    await db.records.clear();
    await db.book_genre_record_cnt.clear();
    await db.journeys.clear();
    await db.current_animal.clear();
    await db.books.clear();
    await db.animals.clear();
  });
}

/** ---------------------------------------
 *  개발용: reset 후 더미 재시딩
 *  -------------------------------------- */
export async function reseedDb() {
  await resetDb();
  await initDb(); // fresh 상태니까 더미 시딩이 들어감
}