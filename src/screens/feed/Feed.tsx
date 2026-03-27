import { TopBar, EmotionPicker } from "@/shared";
import { MemoPanel, FeedButton, ReadBookCover } from "../components";
import { useNavigate } from "react-router-dom";
import { BookSelectButton, HintBox, FeedFrame } from "./components";
import { useState } from "react";
import type { EmotionId } from "@/entities/emotion/model/types";
import { Popup } from "./popup";
import type { BookInfo, DraftBook } from "@/entities/book/model/types";
import { db } from "@/shared/infra/db/appDb";
import { useFeedAnimal } from "@/features/feedAnimal/hooks/useFeedAnimal";
import { ui } from "@/assets/images";
import { getAppNow } from "@/shared/lib/appDate";

const FeedScreen = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState<BookInfo | DraftBook>();
  const [open, setOpen] = useState(false);

  const [memo, setMemo] = useState("");
  const [emotion, setEmotion] = useState<EmotionId | null>(null);

  const canFeed = !!book && emotion !== null;

  function isDraftBook(b: DraftBook | BookInfo) {
    return (b as DraftBook).isDraft === true;
  }

  const { mutateAsync: feed, isPending } = useFeedAnimal();

  const handleFeed = async () => {
    if (!book || emotion === null || isPending) return;

    const prevCurrent = await db.current_animal.get("current");
    if (!prevCurrent) return;

    let realBookId = book.id;

    if (isDraftBook(book)) {
      realBookId = crypto.randomUUID();
      const now = getAppNow().toISOString();

      await db.books.add({
        id: realBookId,
        title: book.title,
        author: book.author ?? null,
        genre: book.genre,
        img: book.image ?? null,
        memo: book.memo ?? null,
        updatedAt: now,
      });
    }

    const res = await feed({
      bookId: realBookId,
      emotionId: emotion,
      memo: memo.trim() ? memo.trim() : null,
    });

    const nextCurrent = res.currentAnimal;
    const stageChanged = prevCurrent.stage !== nextCurrent.stage;

    if (nextCurrent.feedCnt >= 100) {
      navigate("/ending");
      return;
    }

    if (stageChanged) {
      navigate("/growth", {
        state: {
          prevAnimal: {
            ...prevCurrent,
            type: "fox",
          },
          nextAnimal: nextCurrent,
        },
      });
      return;
    }

    navigate(-1);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <TopBar title="먹이주기" onBack={() => navigate(-1)} />
        <FeedFrame className="flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div key={book?.id} className="flex flex-col gap-1">
              <HintBox />

              {book ? (
                <div className="flex gap-5">
                  <ReadBookCover image={book.image} onClick={() => setOpen(true)} />
                  <div className="mt-2 flex flex-1 flex-col">
                    <span>{book.title}</span>
                    {book.author && <span>{book.author}</span>}
                    <span>{book.genre}</span>
                  </div>
                </div>
              ) : (
                <BookSelectButton onClick={() => setOpen(true)} />
              )}

              <img src={ui("divider_simple.png")} alt="divider" className="w-full" />

              <div className="text-center">이야기를 먹고 든 생각은?</div>
              <EmotionPicker value={emotion} onChange={setEmotion} />

              <MemoPanel
                title="메모하기"
                placeholder="생각나는 대로 적어보세요."
                value={memo}
                onChange={setMemo}
              />
            </div>
          </div>

          <FeedButton
            text="먹이주기"
            disabled={!canFeed}
            onClick={handleFeed}
          />
        </FeedFrame>
      </div>

      <Popup
        open={open}
        onClose={() => setOpen(false)}
        onSelectBook={(b) => setBook(b)}
      />
    </>
  );
};

export default FeedScreen;