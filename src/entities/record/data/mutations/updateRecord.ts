import { type InfiniteData, QueryClient } from "@tanstack/react-query";
import { db, type RecordRow } from "@/shared/infra/db/appDb";
import type { EmotionId } from "@/entities/emotion/model/types";
import type { RecordListPage } from "../../model/paging";

export async function updateRecordWithCache(
  queryClient: QueryClient,
  recordId: string,
  memo: string,
  emotionId: EmotionId
) {
  const count = await db.records.update(recordId, { memo, emotionId });
  if (count !== 1) return false;

  // 단건 수정
  queryClient.setQueryData<RecordRow>(
    ["record", recordId],
    (old) => old ? { ...old, memo, emotionId } : old
  );

  // 리스트 수정
  queryClient.setQueriesData<InfiniteData<RecordListPage>>(
    { queryKey: ["records"] }, (old) => {
      if (!old?.pages) return old;

      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          items: page.items.map((item) =>
            item.id === recordId ? { ...item, memo, emotionId } : item
          ),
        })),
      };
    });

  return true;
}