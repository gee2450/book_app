import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAnimal } from "@/entities/animal/data/queries";
import { recordKeys } from "@/entities/record/data/keys";
import { createJourney } from "../model/createJourney";
import type { CreateJourneyInput } from "../model/createJourney.types";

export function useCreateJourney() {
  const queryClient = useQueryClient();
  const { data: currentAnimal } = useCurrentAnimal();

  return useMutation({
    mutationFn: async () => {
      if (!currentAnimal) throw new Error("No current animal found");

      // records에서 현재 animal id와 일치하는 것들을 모두 세기
      const records = queryClient.getQueryData<{ id: string; animalInfo: { id: string } }[]>(
        recordKeys.list({})
      ) ?? [];

      const totalRecordCnt = records.filter(
        (record) => record.animalInfo.id === currentAnimal.id
      ).length;

      const input: CreateJourneyInput = {
        currentAnimal,
        totalRecordCnt,
      };

      return createJourney(input);
    },
    onSuccess: () => {
      // 필요시 journey 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["journeys"] });
    },
  });
}
