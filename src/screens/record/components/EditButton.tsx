import { ui } from "@/assets/images";


export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="더보기"
      className="w-12 h-12 flex items-center justify-center active:scale-95"
    >
      <img
        src={ui("edit.png")}
        alt={ui("edit.png").toString()}
        className="w-7 h-7 object-contain opacity-100 pixelated"
      />
    </button>
  );
}