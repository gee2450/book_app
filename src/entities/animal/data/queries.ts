import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/shared/infra/db/appDb";
import { animalKeys } from "./keys";
import type { CurrentAnimal, AnimalInfo } from "../model/types";

export function useCurrentAnimal() {
  const qc = useQueryClient();

  return useQuery({
    queryKey: animalKeys.current(),
    queryFn: async () => {
      const current = await db.current_animal.get("current");
      if (!current) return null;

      await qc.prefetchQuery({
        queryKey: animalKeys.detail(current.animalId),
        queryFn: async () => {
          const animal = await db.animals.get(current.animalId);
          if (!animal) throw new Error("Animal not found");
          return animal as AnimalInfo;
        },
      });

      const animalInfo = await db.animals.get(current.animalId);
      if (!animalInfo) return null;

      return {
        id: current.animalId,
        type: animalInfo.type,
        name: animalInfo.name,
        feedCnt: current.feedCnt,
        stage: current.stage,
        isCompleted: (current.feedCnt ?? 0) >= 100,
        startedAt: current.startedAt,
        streakStartedAt: current.streakStartedAt,
        lastFeedAt: current.lastFeedAt,
        favoriteGenre: current.favoriteGenre,
      } as CurrentAnimal;
    },
  });
}

export function useAnimalDetail(animalId: string) {
  return useQuery({
    queryKey: animalKeys.detail(animalId),
    queryFn: async () => {
      const animal = await db.animals.get(animalId);
      if (!animal) throw new Error("Animal not found");
      return animal as AnimalInfo;
    },
  });
}