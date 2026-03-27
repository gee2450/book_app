import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedAnimal } from "../model/feedAnimal";
import { animalKeys } from "@/entities/animal/data/keys";
import { recordKeys } from "@/entities/record/data/keys";
import { bookKeys } from "@/entities/book/data/keys";
import type { FeedAnimalInput, FeedAnimalResult } from "../model/feedAnimal.types";


export function useFeedAnimal() {
  const qc = useQueryClient();

  return useMutation<FeedAnimalResult, Error, FeedAnimalInput>({
    mutationFn: feedAnimal,

    onSuccess: async (res) => {
      // currentAnimal 캐시 즉시 반영 (UI 바로 업데이트)
      qc.setQueryData(animalKeys.current(), res.currentAnimal);

      // 오늘의 기록 수 캐시 즉시 반영 (UI 바로 업데이트)
      qc.setQueryData<number>(
        recordKeys.todayCount(res.currentAnimal.id),
        (prev) => (prev ?? 0) + 1
      );

      await Promise.all([
        // record list 새로고침
        qc.invalidateQueries({ 
          queryKey: recordKeys.all, 
          exact: false 
        }),
        // book list 새로고침
        qc.invalidateQueries({
          queryKey: bookKeys.all,
          exact: false,
          type: "all"
        }),
      ]);
    },
  });
}