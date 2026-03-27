import { useMemo } from "react";
import type { Genre } from "@/entities/book/model/types";
import { useJourneysList } from "@/entities/journey/data/queries";
import { GENRES } from "@/entities/book/model";
import type { MetCounts } from "@/entities/journey/model/types";

type Result = {
  metCounts: MetCounts;
  isLoading: boolean;
};

function createEmptyMetCounts(): MetCounts {
  const base = {} as MetCounts;
  for (const genre of GENRES) {
    base[genre] = {count: 0, singleAnimalId: ""};
  }
  return base;
}

export function useList(): Result {
  const { data: journeys = [], isLoading } = useJourneysList();

  const metCounts = useMemo(() => {
    const counts = createEmptyMetCounts();

    for (const journey of journeys) {
      const genre: Genre = journey.favoriteGenre; 
      counts[genre] = {
        count: (counts[genre].count ?? 0) + 1, 
        singleAnimalId: journey.animalId
      };
    }

    return counts;
  }, [journeys]);

  return {
    metCounts,
    isLoading,
  };
}