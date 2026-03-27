import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type BookSelectPopupProps = {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Frame({
  onClose,
  title = "책 선택",
  children
}: BookSelectPopupProps) {
  return (
    <NineSliceBox
      frameUrl={ui("popup.png")}
      slice="100 64 100 64"
      borderWidth="14px 20px 30px 20px"
      imageWidth="50px 32px 60px 32px"
      fill
      className="pt-13 relative w-full box-border flex flex-col gap-3 h-[78dvh]"
    >
      {/* Header */}
      <div className="w-full absolute top-0 left-0">
        <div className="relative flex items-center justify-between">
          <div className="font-extrabold text-[18px] w-full text-center">{title}</div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-0 text-[20px] leading-none px-2 py-1 rounded-md hover:bg-black/5 active:scale-95"
          >
            ✕
          </button>
        </div>
      </div>

      {children}
    </NineSliceBox>
  );
}
