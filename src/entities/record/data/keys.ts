export const recordKeys = {
  all: ["records"] as const,

  detail: (recordId: string) => ["record", recordId] as const,

  list: (params: { animalId?: string | null; bookId?: string | null }) =>
    [
      "records",
      {
        animalId: params.animalId ?? "all",
        bookId: params.bookId ?? "all",
      },
    ] as const,
  
  todayCount: (animalId: string) => [...recordKeys.all, "todayCount", animalId] as const,
};