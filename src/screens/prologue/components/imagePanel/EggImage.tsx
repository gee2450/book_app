import { getAnimalIdle } from "@/assets/images";


export default function EggImage({
  className,
}: {
  className?: string;
}) {
  const imageUrl = getAnimalIdle({type: 'fox', stage: 1});

  return (
    <img
      src={imageUrl}
      alt="animal"
      className={`min-h-0 h-22.5  mb-5 object-contain object-center ${className ?? ""}`}
      draggable={false}
    />
  );
}