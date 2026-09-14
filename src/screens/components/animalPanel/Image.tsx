import type { Stage } from "@/entities/animal/model/types";

const HEIGHT_CLASS: Record<Stage, string> = {
  1: "h-22.5",
  2: "h-28",
  3: "h-32",
  4: "h-38",
  5: "h-38",
};

export default function Image({ imageUrl, stage, className }: { imageUrl: string; stage: Stage; className?: string }) {
  return (
    <img
      src={imageUrl}
      alt="animal"
      className={`min-h-0 ${HEIGHT_CLASS[stage]} object-contain object-center ${className ?? ""}`}
    />
  );
}