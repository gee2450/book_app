import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAnimal,
  type CreateAnimalInput,
  type CreateAnimalResult,
} from "../model";
import { animalKeys } from "@/entities/animal/data/keys";

export function useCreateAnimal() {
  const qc = useQueryClient();

  return useMutation<CreateAnimalResult, Error, CreateAnimalInput>({
    mutationFn: createAnimal,

    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: animalKeys.current(),
        type: "all"
      });
    },
  });
}