import { type AnimalType } from '@/entities/animal/model/types';
import type { Genre } from '@/entities/book/model';

export const journeyKeys = {
  all: ["journeys"] as const,

  list: (params: { genre: Genre, animalType: AnimalType }) =>
    [
      "journeys",
      {
        genre: params.genre,
        animalType: params.animalType,
      },
    ] as const,

  detail: (journeyId: string) =>
    ["journey", journeyId] as const,
};