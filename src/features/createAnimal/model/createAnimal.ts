import { db } from "@/shared/infra/db/appDb";
import type { AnimalType } from "@/entities/animal/model/types";
import type {
  CreateAnimalInput,
  CreateAnimalResult,
} from "./createAnimal.types";
import { nowIso } from "@/shared/lib/appDate";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export async function createAnimal(
  input: CreateAnimalInput,
): Promise<CreateAnimalResult> {
  const animalId = uuid();
  const type: AnimalType = input.type ?? "fox";

  return db.transaction(
    "rw",
    db.animals,
    db.current_animal,
    async () => {
      await db.animals.add({
        id: animalId,
        name: input.name,
        type,
      });

      await db.current_animal.put({
        id: "current",
        animalId,
        feedCnt: 0,
        stage: 1,
        startedAt: nowIso(),
      });

      return {
        animalId,
        currentAnimalId: "current",
      };
    },
  );
}