import type { RecordListItemModel } from "./types";

export type RecordListPage = {
  items: RecordListItemModel[];
  nextCursor: string | null; // 마지막 record.date
  hasMore: boolean;
};