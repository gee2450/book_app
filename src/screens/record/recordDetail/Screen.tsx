import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/shared";
import View from "./View";
import { useRecordDetail } from "@/entities/record/data/queries";

export default function Screen() {
  const navigate = useNavigate();
  const { recordId } = useParams<{ recordId: string }>();

  const { data: record, isLoading } = useRecordDetail(recordId)

  if (isLoading || !record) {
    return (
      <div className="flex flex-col h-full w-full">
        <TopBar
          title="기록 보기"
          onBack={() => navigate(-1)}
        />
        <div className="flex-1 flex items-center justify-center text-black/50">
          불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      <View
        key={record.id}
        record={record}
      />
    </div>
  );
}