import TopBar from "@/shared/TobBar";
import { PaperFrame } from "../components";
import { BookList, BookListItem, BookCountBanner } from "./components";

import type { BookDetailInfo } from "@/entities/book/model/types";
import { ui } from "@/assets/images";


type Props = {
  items: BookDetailInfo[];
  totalCount?: number;
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  onBack: () => void;
  onItemClick: (book: BookDetailInfo) => void;
};

export default function View({
  items,
  totalCount,
  isLoading,
  hasMore,
  loadMore,
  onBack,
  onItemClick,
}: Props) {
  return (
    <div className="flex flex-col h-full w-full min-h-0">
      <TopBar title="책별 기록" onBack={onBack} />

      <PaperFrame>
        <div className="flex h-full min-h-0 flex-col">
          <div className="shrink-0 px-5 pt-2">
            <BookCountBanner count={totalCount ?? 0} />
          </div>

          <div className="flex-1 min-h-0 pt-3 pb-5">
            <BookList<BookDetailInfo>
              items={items}
              isLoading={isLoading}
              hasMore={hasMore}
              loadMore={loadMore}
              emptyText="책 기록이 없어요"
              getKey={(it) => it.id}
              renderItem={(it) => (
                <BookListItem
                  item={it}
                  fallbackCoverUrl={ui("book_default.png")}
                  onClick={() => onItemClick(it)}
                />
              )}
            />
          </div>
        </div>
      </PaperFrame>
    </div>
  );
}
