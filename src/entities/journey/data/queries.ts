import type { AnimalType } from '@/entities/animal/model/types';
import { useQuery } from "@tanstack/react-query";
import { journeyKeys } from "./keys";
import { db } from "@/shared/infra/db/appDb";
import type { Genre } from "@/entities/book/model";
import { fetchJourneyDetail, fetchJourneySummariesByGenre } from "./fetchers";


/** 전체 여행 컬렉션 목록 */
export function useJourneysList() {
  return useQuery({
    queryKey: journeyKeys.all,
    queryFn: async () => {
      return db.journeys.orderBy("animalId").toArray();
    },
  });
}

export function useGenreJourneysList(genre: Genre, animalType: AnimalType) {
  return useQuery({
    queryKey: journeyKeys.list({genre, animalType}),
    queryFn: () => fetchJourneySummariesByGenre({ genre, animalType }),
    enabled: !!genre && !!animalType,
  });
}

export function useJourney(animalId: string | null) {
  return useQuery({
    queryKey: journeyKeys.detail(animalId ?? ""),
    queryFn: () => fetchJourneyDetail(animalId!),
    enabled: !!animalId,
  })
}