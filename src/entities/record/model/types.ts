import type { AnimalInfo, Stage } from "@/entities/animal/model/types";
import type { BookInfo, Genre } from "@/entities/book/model/types";
import type { EmotionId } from "@/entities/emotion/model/types";


/**
 * #### 기록 리스트에서의 기록 정보 (RecordListItemModel)
 * id, bookInfo, animalInfo, stageSnapshot, genreSnapshot, date, emotionId, memo
 */
export interface RecordListItemModel{
  id: string;

  bookInfo: BookInfo;
  animalInfo: AnimalInfo;

  // animal의 기록 시점의 stage, genre 스냅샷
  stageSnapshot: Stage;
  genreSnapshot: Genre;

  date: string;
  emotionId: EmotionId;
  memo?: string;
};