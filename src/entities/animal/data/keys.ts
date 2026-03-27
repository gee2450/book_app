export const animalKeys = {
  all: ["animals"] as const,

  detail: (animalId: string) =>
    ["animal", animalId] as const,

  current: () =>
    ["currentAnimal"] as const,
};