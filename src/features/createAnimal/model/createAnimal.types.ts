import type { AnimalType } from "@/entities/animal/model/types";

export type CreateAnimalInput = {
  name: string;
  type?: AnimalType;
};

export type CreateAnimalResult = {
  animalId: string;
  currentAnimalId: "current";
};