import { useState } from "react";
import PopupOverlay from "./Overlay";
import PopupFrame from "./Frame";
import { SelectBookView, AddBookView } from "./views";
import type { BookInfo, DraftBook } from "@/entities/book/model/types";

type BookPopupView = "select" | "add";

type BookPopupProps = {
  open: boolean;
  onClose: () => void;

  /** 선택/추가 성공 시 콜백 */
  onSelectBook?: (book: BookInfo | DraftBook) => void;
};

export default function BookPopup({
  open,
  onClose,
  onSelectBook,
}: BookPopupProps) {
  const [view, setView] = useState<BookPopupView>("select");
  const [draftBooks, setDraftBooks] = useState<DraftBook[]>([]);
  const [initialDraft, setInitialDraft] = useState<DraftBook | undefined>();
  const [addViewKey, setAddViewKey] = useState(0);

  const handleClose = () => {
    setView("select");
    setInitialDraft(undefined);
    onClose();
  };

  const openAddForNew = () => {
    setInitialDraft(undefined);
    setAddViewKey((prev) => prev + 1);
    setView("add");
  };

  const openAddForEdit = (draft: DraftBook) => {
    setInitialDraft(draft);
    setAddViewKey((prev) => prev + 1);
    setView("add");
  };

  return (
    <PopupOverlay open={open} onClose={handleClose}>
      <PopupFrame
        title={view === "select" ? "책 선택" : "새 책 추가"}
        onClose={handleClose}
      >
        {view === "select" ? (
          <SelectBookView
            draftBooks={draftBooks}
            onAddClick={openAddForNew}
            onSelect={(book: BookInfo | DraftBook) => {
              if ((book as DraftBook).isDraft) {
                openAddForEdit(book as DraftBook);
              } else {
                onSelectBook?.(book);
                handleClose();
              }
            }}
            onClose={handleClose}
          />
        ) : (
          <AddBookView
            key={addViewKey}
            initialDraft={initialDraft}
            onBack={() => {
              setView("select");
              setInitialDraft(undefined);
            }}
            onDone={(book: DraftBook) => {
              onSelectBook?.(book);

              setDraftBooks((prev) => {
                const exists = prev.find((b) => b.id === book.id);

                if (exists) {
                  return prev.map((b) => (b.id === book.id ? book : b));
                }

                return [book, ...prev];
              });

              handleClose();
            }}
          />
        )}
      </PopupFrame>
    </PopupOverlay>
  );
}