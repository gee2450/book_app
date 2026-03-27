import type { Stage } from "@/entities/animal/model/types";

const HEIGHT_CLASS: Record<Stage, string> = {
  1: "h-[90px]",
  2: "h-[120px]",
  3: "h-[150px]",
  4: "h-[180px]",
  5: "h-[180px]",
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