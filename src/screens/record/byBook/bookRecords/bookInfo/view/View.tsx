import { TopBar } from "@/shared";
import type { BookInfo } from "@/entities/book/model/types";
import { EditButton, SaveButton } from "@/screens/record/components";
import { Frame } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditView from "./EditView";
import ReadView from "./ReadView";


export default function View({book, onSave}: {
    book: BookInfo, 
    onSave: (book: BookInfo) => void,
  }) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [draftBook, setDraftBook] = useState<BookInfo>(book);

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleClickSave = () => {
    if (draftBook.title == "") {
      return;
    }

    setIsEditing(false);
    onSave(draftBook);
  };

  return (
    <>
      <TopBar
        title="책 정보"
        onBack={()=>navigate(-1)}
        rightActions={
          isEditing ? (
            <SaveButton onClick={handleClickSave} />
          ) : (
            <EditButton onClick={handleClickEdit} />
          )
        }
      />
      <Frame>
        <div className="flex flex-col gap-4 overflow-y-scroll">
          {isEditing ? (
            <EditView
              key={book.id}
              book={draftBook}
              onChange={setDraftBook}
            /> ) : (
            <ReadView
              book={book}
            />
          )}
        </div>
      </Frame>
    </>
  );
}
