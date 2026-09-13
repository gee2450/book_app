import { ui } from "@/assets/images";

export default function BookImage({
  className,
}: {
  className?: string;
}) {
  const imageUrl = ui('prologue_book.webp')
  
  return (
    <img
      src={imageUrl}
      alt="book"
      className={`h-40 mb-5 object-contain ${className ?? ""}`}
      draggable={false}
    />
  );
}