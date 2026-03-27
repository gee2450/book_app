import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import TopBar from "@/shared/TobBar";
import { EmotionPicker } from "@/shared";
import type { EmotionId } from "@/entities/emotion/model/types";
import type { RecordListItemModel } from "@/entities/record/model/types";

import { MemoPanel, AnimalPanel } from "@/screens/components";
import { EditButton, SaveButton } from "../components";
import { updateRecordWithCache } from "@/entities/record/data/mutations/updateRecord";

import { BottomBar, Frame, TopBanner } from "./components";

type Props = {
  record: RecordListItemModel;
};

export default function View({ record }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  // 편집 중에만 쓰는 draft (원본은 record/query)
  const [draft, setDraft] = useState<{
    memo: string;
    emotionId: EmotionId | null;
  }>({
    memo: "",
    emotionId: record.emotionId,
  });

  const handleClickEdit = () => {
    setDraft({
      memo: record.memo ?? "",
      emotionId: record.emotionId,
    });
    setIsEditing(true);
  };

  const handleClickSave = useCallback(async () => {
    if (draft.emotionId == null) {
      alert("감정을 선택해주세요");
      return;
    }

    await updateRecordWithCache(queryClient, record.id, draft.memo, draft.emotionId);

    setIsEditing(false);
  }, [draft.memo, draft.emotionId, queryClient, record.id]);

  const memoValue = isEditing ? draft.memo : record.memo ?? "";
  const emotionId = isEditing ? draft.emotionId : record.emotionId;

  return (
    <>
      <TopBar
        title="기록 보기"
        onBack={() => navigate(-1)}
        rightActions={
          isEditing ? (
            <SaveButton onClick={handleClickSave} />
          ) : (
            <EditButton onClick={handleClickEdit} />
          )
        }
      />

      <Frame>
        <div className="flex flex-col gap-1 flex-1 min-h-0 overflow-y-auto">
          <TopBanner
            book={record.bookInfo}
            genreSnapshot={record.genreSnapshot}
            dateText={record.date}
            emotionId={emotionId}
            readOnly={!isEditing}
          />

          <AnimalPanel
            animal={{
              ...record.animalInfo,
              stage: record.stageSnapshot,
              favoriteGenre: record.genreSnapshot,
            }}
          />

          {isEditing && (
            <EmotionPicker
              value={draft.emotionId}
              onChange={(v) => setDraft((prev) => ({ ...prev, emotionId: v }))}
            />
          )}

          <MemoPanel
            title="메모"
            value={memoValue}
            onChange={isEditing ? (v) => setDraft((prev) => ({ ...prev, memo: v })) : undefined}
            readOnly={!isEditing}
            emptyText="메모가 없어요"
            showCounterWhenReadOnly={false}
          />

          <div className="h-16" />
        </div>

        <BottomBar />
      </Frame>
    </>
  );
}