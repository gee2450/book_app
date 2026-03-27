import type { AnimalInfo } from "@/entities/animal/model/types";
import type { BookDetailInfo, Genre } from "@/entities/book/model";

export interface JourneySummary {
  animalInfo: AnimalInfo;

  startedAt: string;
  endedAt: string;

  favoriteGenre: Genre;
  totalRecordCnt: number;
};

export interface JourneyDetail extends JourneySummary {
  records: BookDetailInfo[];
}

export type GenreMetInfo = {
  count: number;
  singleAnimalId: string;
};

export type MetCounts = Record<Genre, GenreMetInfo>;