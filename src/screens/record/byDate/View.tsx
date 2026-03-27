import TopBar from "@/shared/TobBar";
import { RecordListItem, RecordList } from "./components";
import { PaperFrame } from "../components";
import type { RecordListItemModel } from "@/entities/record/model/types";
import type { TabId } from "../main/Record";

type Props = {
  title?: string;
  scope: TabId;
  onBack: () => void;
  items: RecordListItemModel[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  onItemClick: (item: RecordListItemModel) => void;
};

export default function View({
  title = "날짜별 기록",
  scope,
  onBack,
  items,
  isLoading,
  hasMore,
  loadMore,
  onItemClick,
}: Props) {
  const scrollKey = `record-date-list:${scope}`;

  return (
    <div className="flex flex-col h-full w-full">
      <TopBar title={title} onBack={onBack} />
      <PaperFrame>
        <RecordList<RecordListItemModel>
          items={items}
          isLoading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
          emptyText="날짜별 기록이 없어요"
          scrollKey={scrollKey}
          onItemClick={onItemClick}
          getKey={(it) => it.id}
          renderItem={(it) => <RecordListItem item={it} />}
        />
      </PaperFrame>
    </div>
  );
}