import NineSliceBox from "@/shared/NineSliceBox";
import type { BookInfo, DraftBook } from "@/entities/book/model/types";
import { ui } from "@/assets/images";
import { useObjectUrl } from "@/shared/lib/useObjectUrl";

type Props = {
  item: BookInfo | DraftBook;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  badge?: string;
};

type BookCardFrameProps = {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function BookCardFrame({
  selected = false,
  children,
  onClick,
  className,
}: BookCardFrameProps) {
  return (
    <NineSliceBox
      frameUrl={selected ? ui("selected_book_card.png") : ui("record_card.png")}
      slice={selected ? "30 60 50 60" : "30 60 30 60"}
      borderWidth="15px 20px 15px 20px"
      imageWidth={selected ? "10px 13px 13px 13px" : "10px 20px 5px 20px"}
      fill
      onClick={onClick}
      className={[
        "w-full",
        "box-border",
        "flex items-center gap-3",
        className,
      ].join(" ")}
    >
      {children}
    </NineSliceBox>
  );
}

export default function BookItem({
  item,
  selected = false,
  onClick,
  className = "",
  badge,
}: Props) {
  const src = useObjectUrl(item.image);

  return (
    <BookCardFrame selected={selected} onClick={onClick} className={className}>
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-md grid place-items-center bg-white/20 border border-black/10 font-black text-xl overflow-hidden">
          <img
            alt="book-img"
            src={src || ui("book_default.png")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0 leading-tight">
        <div className="flex items-center gap-2">
          <div className="font-extrabold text-[#3B2A1A] truncate">
            {item.title}
          </div>

          {badge && (
            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 border border-amber-300">
              {badge}
            </span>
          )}
        </div>

        {(item.genre || item.author) && (
          <div className="mt-1 text-sm text-[#3B2A1A]/80 truncate">
            {item.genre && <span className="mr-3">{item.genre}</span>}
            {item.author && (
              <span className="text-[#3B2A1A]/75">저자, {item.author}</span>
            )}
          </div>
        )}
      </div>
    </BookCardFrame>
  );
}