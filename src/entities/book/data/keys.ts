export const bookKeys = {
  all: ["books"] as const,

  detail: (bookId: string) => ["book", bookId] as const,

  list: (params: {
    animalId?: string | null;
  }) =>
    [
      "books",
      { animalId: params.animalId ?? "all" },
    ] as const,
};