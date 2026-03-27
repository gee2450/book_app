import { useEffect, useRef, useState } from "react";
import type { DraftBook, Genre } from "@/entities/book/model/types";
import {
  BookAuthorInput,
  BookGenreSelect,
  BookMemoPanel,
  BookTitleInput,
  CoverField,
} from "@/screens/components";
import { buildDraftBook, hasDuplicateTitle } from "./bookForm.utils";
import SubmitBookButton from "./SubmitBookButton";

type Props = {
  onBack: () => void;
  onDone: (book: DraftBook) => void;
  initialDraft?: DraftBook | null;
};

export default function AddBookView({
  onBack,
  onDone,
  initialDraft,
}: Props) {
  const [title, setTitle] = useState(initialDraft?.title ?? "");
  const [author, setAuthor] = useState(initialDraft?.author ?? "");
  const [genre, setGenre] = useState<Genre>(initialDraft?.genre ?? "Unknown");
  const [memo, setMemo] = useState(initialDraft?.memo ?? "");
  const [image, setImage] = useState<Blob | null>(initialDraft?.image ?? null);

  const [isSaving, setIsSaving] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(
    !!initialDraft?.title?.trim()
  );

  const [forceAdd, setForceAdd] = useState(false);
  const [dupMessage, setDupMessage] = useState<string | null>(null);

  const draftId = useRef(initialDraft?.id ?? `draft_${Date.now()}`).current;

  useEffect(() => {
    setForceAdd(false);
    setDupMessage(null);
  }, [title, author, genre]);

  const canSubmit = isTitleValid && !isSaving;

  const handleChangeImage = (file: File) => {
    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleAdd = async () => {
    if (!canSubmit) return;

    if (!forceAdd) {
      const dup = await hasDuplicateTitle(title);
      if (dup) {
        setDupMessage("같은 책이 이미 책장에 있어요. 그래도 이 책을 추가할까요?");
        setForceAdd(true);
        return;
      }
    }

    setIsSaving(true);

    try {
      const draft = buildDraftBook({
        draftId,
        initialDraft,
        title,
        author,
        genre,
        image,
        memo,
      });

      onDone(draft);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-col min-h-0 flex-1 overflow-y-scroll gap-3">
        <CoverField
          image={image}
          onChangeImage={handleChangeImage}
          onRemoveImage={handleRemoveImage}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold opacity-80">책 제목</label>
          <BookTitleInput
            value={title}
            onChange={setTitle}
            onValidChange={setIsTitleValid}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold opacity-80">책 저자(선택)</label>
          <BookAuthorInput value={author} onChange={setAuthor} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold opacity-80">책 장르</label>
          <BookGenreSelect value={genre} onChange={setGenre} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold opacity-80">책 소개(선택)</label>
          <BookMemoPanel value={memo} onChange={setMemo} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {dupMessage && (
          <div className="text-xs font-bold text-amber-700">{dupMessage}</div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-black/25 bg-white/35 py-3 font-extrabold hover:bg-white/45"
          >
            뒤로
          </button>

          <SubmitBookButton
            onClick={handleAdd}
            canSubmit={canSubmit}
            forceAdd={forceAdd}
            isSaving={isSaving}
            isEdit={!!initialDraft}
          />
        </div>
      </div>
    </div>
  );
}