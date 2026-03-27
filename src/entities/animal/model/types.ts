import type { Genre } from '@entities/book/model/types';

export type AnimalType = 'fox';
export type Stage = 1 | 2 | 3 | 4 | 5;

/**
 * #### 동물의 불변 정보
 * type, name
 */
export interface AnimalInfo {
  id: string;
  type: AnimalType;
  name: string;
}

/**
 * #### 동물의 상세 정보 (AnimalInfo + stage, favoriteGenre)
 * AnimalInfo는 동물의 불변 정보 (type, name)
 * stage: 현재 여정 단계 (1~5)
 * favoriteGenre: 가장 좋아하는 장르
 */
export interface AnimalDetail extends AnimalInfo {
  stage: Stage;
  favoriteGenre?: Genre | null;
}

export interface CurrentAnimal extends AnimalDetail {
  feedCnt: number;
  isCompleted: boolean;
  startedAt: string;
  lastFeedAt?: string | null;
  streakStartedAt?: string | null;
}