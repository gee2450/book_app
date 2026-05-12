import { genreLabel, type BookDetailInfo } from "@/entities/book/model";
import { ui } from "@/assets/images";
import { useObjectUrl } from "@/shared/lib/useObjectUrl";


type Props = {
  book: BookDetailInfo;
};

const BookListItem = ({ book }: Props) => {
  const objectUrl = useObjectUrl(book.image);

  return (
    <div
      className="flex gap-2 cursor-pointer transition-all py-1"
    >
      {/* 책 이미지 */}
      <img
        src={objectUrl ? objectUrl : ui('open_book.png')}
        alt={book.title}
        className="w-10 h-8 object-cover"
      />

      {/* 📖 텍스트 영역 */}
      <div className="flex flex-1 flex-wrap items-center gap-x-2">
        {/* 제목 */}
        <span className="font-semibold text-base wrap-break-word">
          {book.title}
        </span>

        {/* 장르 */}
        <span
          className="rounded-full flex-1 text-sm whitespace-nowrap">
          {genreLabel[book.genre]}
        </span>
      </div>

      {/* 기록 수 */}
      {book.recordCount !== undefined && (
        // text가 이미지에 비해 위쪽에 붙어서 mt 설정
        <span className="text-gray-500 mt-1">
          기록 {book.recordCount}회
        </span>
      )}
    </div>
  );
};

export default BookListItem;
