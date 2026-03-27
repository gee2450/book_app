import { ui } from '@/assets/images/ui/ui';
import { useObjectUrl } from '@/shared/lib/useObjectUrl';


export default function ReadBookCover({ image, onClick }: { image?: Blob | null, onClick?: () => void }) {
  const objectUrl = useObjectUrl(image)
  
  return (
    <div
      className={[
        "w-21 h-21 rounded-md",
        "flex items-center justify-center overflow-hidden",
      ].join(" ")}
      onClick={onClick}
    >
      <img src={objectUrl || ui('book_default.png')} alt="book cover" className="w-full h-full object-cover" />
    </div>
  );
}