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
      className="relative mx-auto w-21 h-21"
    >
      <div className="relative w-full h-full overflow-hidden rounded-md">
        <img
          src={src}
          alt="book cover"
          className="block w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 w-full bg-white/60 text-center text-sm">
          책 변경하기
        </div>
      </div>
    </button>
  );
}