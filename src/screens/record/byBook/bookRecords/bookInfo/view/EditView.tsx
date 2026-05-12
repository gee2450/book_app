import type { BookInfo, Genre } from "@/entities/book/model/types";
import { useState } from "react";
import {
  BookTitleInput,
  BookMemoPanel,
  BookGenreSelect,
  BookAuthorInput,
  CoverField,
} from "@/screens/components";

export default function EditView({
  book,
  maxChars = 500,
  onChange,
}: {
  book: BookInfo;
  maxChars?: number;
  onChange: (book: BookInfo) => void;
}) {
  const [title, setTitle] = useState(book.title);
  const [genre, setGenre] = useState<Genre>(book.genre);
  const [author, setAuthor] = useState(book.author ?? "");
  const [memo, setMemo] = useState(book.memo ?? "");
  const [image, setImage] = useState<Blob | null>(book.image ?? null);

  const emitChange = (patch: Partial<BookInfo>) => {
    onChange({
      ...book,
      title,
      genre,
      author,
      memo,
      image,
      ...patch,
    });
  };

  const handleTitle = (nextTitle: string) => {
    setTitle(nextTitle);
    emitChange({ title: nextTitle });
  };

  const handleGenre = (nextGenre: Genre) => {
    setGenre(nextGenre);
    emitChange({ genre: nextGenre });
  };

  const handleAuthor = (nextAuthor: string) => {
    setAuthor(nextAuthor);
    emitChange({ author: nextAuthor });
  };

  const handleMemo = (nextMemo: string) => {
    setMemo(nextMemo);
    emitChange({ memo: nextMemo });
  };

  const handleChangeImage = (file: File) => {
    const nextImage: Blob = file;
    setImage(nextImage);
    emitChange({ image: nextImage });
  };

  const handleRemoveImage = () => {
    setImage(null);
    emitChange({ image: null });
  };

  return (
    <div className="flex flex-col items-stretch gap-3">
      <CoverField
        image={image}
        onChangeImage={handleChangeImage}
        onRemoveImage={handleRemoveImage}
      />

      <div className="flex flex-col gap-1">
        책 제목
        <BookTitleInput value={title} onChange={handleTitle} />
      </div>

      <div className="flex flex-col gap-1">
        장르
        <BookGenreSelect value={genre} onChange={handleGenre} />
      </div>

      <div className="flex flex-col gap-1">
        저자
        <BookAuthorInput value={author} onChange={handleAuthor} />
      </div>

      <div className="flex flex-col gap-1">
        책 소개
        <BookMemoPanel
          value={memo}
          onChange={handleMemo}
          maxChars={maxChars}
        />
      </div>
    </div>
  );
}