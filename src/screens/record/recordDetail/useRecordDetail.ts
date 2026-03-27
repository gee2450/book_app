import { useEffect, useState } from "react";
import type { RecordListItemModel } from "@/entities/record/model/types";
import { db } from "@/shared/infra/db/appDb";

type Params = {
  recordId?: string;
};

export function useRecordDetail({
  recordId,
}: Params) {
  const [record, setRecord] = useState<RecordListItemModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (record || !recordId) return;

    let cancelled = false;

    async function fetchRecord() {
      setIsLoading(true);

      if (record || !recordId) return;

      const r = await db.records.get(recordId);
      if (!r || cancelled) return;

      const b = await db.books.get(r.bookId);
      if (!b || cancelled) return;

      const a = await db.animals.get(r.animalId);
      if (!a || cancelled) return;

      const mapped: RecordListItemModel = {
        id: r.id,

        bookInfo: {
          id: r.bookId,
          title: b.title,
          genre: b.genre,
          updatedAt: b.updatedAt
        },

        animalInfo: {
          id: r.animalId,
          type: a.type,
          name: a.name ?? '',
        },

        stageSnapshot: r.stage ?? 1,
        genreSnapshot: r.genreSnapshot ?? undefined,

        date: new Date(r.date).toLocaleDateString(),
        memo: r.memo ?? undefined,
        emotionId: r.emotionId ?? 1,
      };

      if (!cancelled) setRecord(mapped);
      setIsLoading(false);
    }

    fetchRecord();

    return () => {
      cancelled = true;
    };
  }, [record, recordId]);

  return { record, isLoading };
}