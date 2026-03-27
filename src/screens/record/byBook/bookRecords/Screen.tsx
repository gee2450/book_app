import { useLocation, useNavigate, useParams } from "react-router-dom";

import TopBar from "@/shared/TobBar";
import { PaperFrame } from "../../components";

import View from "./View";
import { useList } from "./useList";
import { MoreButton } from "./components/moreButton";
import type { BookDetailInfo } from "@/entities/book/model";
import type { TabId } from "../../main/Record";

export default function Screen() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const location = useLocation() as { state?: { scope?: TabId, book?: BookDetailInfo } };

  // location.state?.book이 없으면 useList(animalId)만 호출
  const { book, items, isLoading, hasMore, loadMore } = useList(location.state?.scope ?? null, bookId!);
  
  const stateBook = {
    ...book, 
    recordCount: location.state?.book?.recordCount
  } as BookDetailInfo;

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      <TopBar
        title="책별 기록"
        onBack={() => navigate(-1)}
        rightActions={
          <MoreButton
            onClick={() => {
              console.log("book detail open");
              navigate(`/book/${stateBook?.id}`, { state: { book: stateBook } });
            }}
          />
        }
      />

      <PaperFrame>
        <View
          book={stateBook!}
          items={items}
          isLoading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
          onRecordClick={(item) => {
            console.log("record click", item);
            navigate(`/record/${item.id}`);
          }}
        />
      </PaperFrame>
    </div>
  );
}
