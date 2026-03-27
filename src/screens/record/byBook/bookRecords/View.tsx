import type { BookDetailInfo } from "@/entities/book/model/types";
import type { RecordListItemModel } from "@/entities/record/model/types";

import { BookTitleWithGenre, RecordList, RecordListItem } from "./components";

type Props = {
  book: BookDetailInfo;
  items: RecordListItemModel[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  onRecordClick: (item: RecordListItemModel) => void;
};

export default function View({
  book,
  items,
  isLoading,
  hasMore,
  loadMore,
  onRecordClick,
}: Props) {
  const scrollKey = `book-records:${book.id}`;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-5 pt-4">
        <BookTitleWithGenre title={book.title} genre={book.genre} />

        <div className="mt-3 flex items-center justify-center gap-2 text-[16px] font-bold text-black/70">
          <span>총</span>
          <span className="text-[20px] font-extrabold">
            {book.recordCount ?? items.length}
          </span>
          <span>번 여우에게 먹이 줬어요</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 pt-4">
        <RecordList<RecordListItemModel>
          items={items}
          isLoading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
          emptyText="이 책 기록이 없어요"
          scrollKey={scrollKey}
          getKey={(it) => it.id}
          onItemClick={onRecordClick}
          renderItem={(it) => <RecordListItem item={it} />}
        />
      </div>
    </div>
  );
}