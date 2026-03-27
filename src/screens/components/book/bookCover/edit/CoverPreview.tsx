import { useObjectUrl } from "@/shared/lib/useObjectUrl";

type Props = {
  image: Blob;
  onClick?: () => void;
};

export default function CoverPreview({ image, onClick }: Props) {
  const src = useObjectUrl(image);

  if (!src) return null;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative w-21 h-21 rounded-md mx-auto",
        "flex flex-col items-center justify-center overflow-hidden",
      ].join(" ")}
    >
      <img
        src={src}
        alt="book cover"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full bg-white/60 text-center text-sm">
        책 변경하기
      </div>
    </button>
  );
}