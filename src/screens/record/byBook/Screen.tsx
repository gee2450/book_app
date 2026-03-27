import { useLocation, useNavigate } from "react-router-dom";
import View from "./View";
import { useList } from "./useList";
import type { BookDetailInfo } from "@/entities/book/model/types";
import type { TabId } from "../main/Record";

export default function Screen() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { scope?: TabId } };
  const { items, totalCount, isLoading, hasMore, loadMore } = useList(location.state?.scope);

  const onItemClick = (book: BookDetailInfo) => {
    navigate(`/record/by-book/${book.id}`, { state: { scope: location.state?.scope, book } });
  };

  return (
    <View
      items={items}
      totalCount={totalCount}
      isLoading={isLoading}
      hasMore={hasMore}
      loadMore={loadMore}
      onBack={() => navigate(-1)}
      onItemClick={onItemClick}
    />
  );
}
