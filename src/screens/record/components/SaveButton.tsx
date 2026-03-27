import { ui } from "@/assets/images";


export default function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="더보기"
      className="w-12 h-12 flex items-center justify-center active:scale-95"
    >
      <img
        src={ui("save.png")}
        alt={ui("save.png").toString()}
        className="w-[1.6rem] h-[1.6rem] object-contain opacity-100 pixelated"
      />
    </button>
  );
}