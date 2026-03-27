import Dexie, { type Table } from "dexie";

import type { AnimalType } from "@/entities/animal/model/types";
import type { Genre } from "@/entities/book/model/types";
import type { EmotionId } from "@/entities/emotion/model/types";

export type ISODateString = string;

/** ----------------------------
 *  tables (v1)
 *  ---------------------------- */

export type AnimalRow = {
  id: string;
  name: string;
  type: AnimalType; // e.g. "fox"
};

export type CurrentAnimalRow = {
  /** ✅ 싱글톤 키 */
  id: "current";

  /** 현재 성장중인 동물 id */
  animalId: string;

  /** 누적 먹이 횟수 */
  feedCnt: number;

  /** feedCnt에 따라 변함 */
  stage: 1 | 2 | 3 | 4 | 5;

  startedAt: ISODateString;
  
  streakStartedAt?: ISODateString | null;
  lastFeedAt?: ISODateString | null;

  /** stage=4 되는 순간 결정 (nullable) */
  favoriteGenre?: Genre | null;
};

export type BookRow = {
  id: string;

  title: string;
  genre: Genre;

  author?: string | null;

  /** image url / asset key / base64 key 등 */
  img?: Blob | null;

  memo?: string | null;

  /** 가장 최근 기록 추가 시각 */
  updatedAt: ISODateString;
};

export type RecordRow = {
  id: string;

  animalId: string;
  bookId: string;

  /** 기록 날짜 */
  date: ISODateString;

  /** 먹일 당시 스냅샷 */
  stage: 1 | 2 | 3 | 4 | 5;
  favoriteGenre?: Genre | null;
  genreSnapshot: Genre;

  emotionId?: EmotionId | null;
  memo?: string | null;
};

export type BookGenreRecordCntRow = {
  animalId: string;
  bookId: string;
  genre: Genre;

  count: number; // default 0
};

export type JourneyRow = {
  /** ✅ PK = animalId */
  animalId: string;

  favoriteGenre: Genre;
  feedCnt: number;
  totalRecordCnt: number;

  startedAt: ISODateString;
  endedAt: ISODateString;
};

/** ----------------------------
 *  Dexie DB
 *  ---------------------------- */

export class AppDb extends Dexie {
  animals!: Table<AnimalRow, string>;
  current_animal!: Table<CurrentAnimalRow, "current">;
  books!: Table<BookRow, string>;
  records!: Table<RecordRow, string>;
  book_genre_record_cnt!: Table<BookGenreRecordCntRow, [string, string, Genre]>;
  journeys!: Table<JourneyRow, string>; 

  constructor() {
    super("book-habit-db");

    this.version(1)
      .stores({
        // animals: (id) pk
        animals: "id",

        // current_animal: (id="current") pk
        current_animal: "id",

        // books: (id), (title), (updatedAt)
        books: "id, title, updatedAt, genre",

        // records indexes:
        // (animalId, bookId, date), (animalId, date), (bookId, date), (date)
        records:
          "id, animalId, bookId, date, [animalId+bookId+date], [animalId+date], [bookId+date]",

        // book_genre_record_cnt indexes:
        // pk (animalId, bookId, genre), plus (animalId, bookId), (animalId, genre)
        book_genre_record_cnt:
          "[animalId+bookId+genre], animalId, bookId, genre, [animalId+bookId], [animalId+genre]",

        // journeys indexes:
        journeys: "animalId, [favoriteGenre+endedAt], endedAt",
      })
      .upgrade(async (tx) => {
        const table = tx.table<CurrentAnimalRow, "current">("current_animal");

        const all = await table.toArray();
        if (all.length === 0) return;

        // 과거 버전과의 호환을 위한 확장 타입
        type MaybeLegacyCurrentAnimalRow = CurrentAnimalRow & {
          updatedAt?: ISODateString;
          lastFeedAt?: ISODateString | null;
        };

        const getTime = (row: MaybeLegacyCurrentAnimalRow): ISODateString => {
          return (
            row.updatedAt ??
            row.lastFeedAt ??
            row.startedAt ??
            "0000-00-00T00:00:00.000Z"
          );
        };

        const sorted = [...all].sort((a, b) =>
          getTime(a as MaybeLegacyCurrentAnimalRow) >
          getTime(b as MaybeLegacyCurrentAnimalRow)
            ? -1
            : 1
        );

        const keep = sorted[0] as MaybeLegacyCurrentAnimalRow;

        await table.clear();

        await table.put({
          id: "current",
          animalId: keep.animalId,
          feedCnt: keep.feedCnt ?? 0,
          stage: keep.stage ?? null,
          startedAt: keep.startedAt,
          streakStartedAt: keep.streakStartedAt ?? null,
          lastFeedAt: keep.lastFeedAt ?? null,
          favoriteGenre: keep.favoriteGenre ?? null,
        });
      });
  }
}

export const db = new AppDb();