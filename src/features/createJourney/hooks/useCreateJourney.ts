import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAnimal } from "@/entities/animal/data/queries";
import { journeyKeys } from "@/entities/journey/data/keys";
import { createJourney } from "../model/createJourney";
import type { CurrentAnimal } from "@/entities/animal/model/types";

export function useCreateJourney() {
  const queryClient = useQueryClient();
  const { data: currentAnimal } = useCurrentAnimal();

  return useMutation({
    mutationFn: async () => {
      if (!currentAnimal) throw new Error("No current animal found");

      return createJourney(currentAnimal as CurrentAnimal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journeyKeys.all });
    },
  });
}
