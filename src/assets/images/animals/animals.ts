const animalImages = {
  ...import.meta.glob("/src/assets/images/animals/*/stage*/idle.gif", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("/src/assets/images/animals/*/stage*/*/idle.gif", {
    eager: true,
    import: "default",
  }),
} as Record<string, string>;


export function getAnimalIdle({
  type,
  stage,
  genre,
}: {
  type: string;
  stage: number;
  genre?: string;
}) {
  if (genre) {
    return animalImages[
      `/src/assets/images/animals/${type}/stage${stage}/${genre}/idle.gif`
    ];
  }

  return animalImages[
    `/src/assets/images/animals/${type}/stage${stage}/idle.gif`
  ];
}