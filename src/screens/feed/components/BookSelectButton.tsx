import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type BookSelectButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

function BookSelectButton({
  onClick,
  disabled = false,
  className,
}: BookSelectButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "w-full",
        "h-18",
        "p-0 shrink-0",
        "bg-transparent",
        "border-none",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <NineSliceBox
        frameUrl={ui("button1.png")}
        slice="120" 
        borderWidth="10px"
        imageWidth="30px"
        fill
        className={[
          "w-full",
          "h-full",
          "flex items-center justify-between",
          "px-4",
          "text-xl font-bold",
          "leading-none",
        ].join(" ")}
      >
        {/* 왼쪽: 책 아이콘 + 텍스트 */}
        <div className="flex items-center gap-2 -translate-y-0.5">
          <span className="translate-y-px">📖</span>
          <span className="translate-y-px">책 선택</span>
        </div>

        {/* 오른쪽: 화살표 */}
        <span className="-translate-y-1 text-2xl">›</span>
      </NineSliceBox>
    </button>
  );
}

export default BookSelectButton;
