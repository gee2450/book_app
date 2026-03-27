import NamePlate from "./NamePlate";
import Image from "./Image";
import CharacterFrame from "../CharacterFrame";
import type { AnimalDetail } from "@/entities/animal/model/types";
import { getAnimalIdle } from "@/assets/images";

type AnimalPanelProps = {
  animal: AnimalDetail;
  height?: number;
  className?: string;
};

function AnimalPanel({ animal, height, className }: AnimalPanelProps) {
  const imageUrl =
    animal.stage >= 4 && animal.favoriteGenre
      ? getAnimalIdle({
        type: animal.type,
        stage: animal.stage,
        genre: animal.favoriteGenre,
      })
      : getAnimalIdle({
        type: animal.type,
        stage: animal.stage,
      });

  return (
    <CharacterFrame
      height={height}
      className={className}
      bottomSlot={<NamePlate name={animal.name} />}
    >
      <div className="relative w-full h-full flex items-end justify-center">
        <div
          className={[
            animal.stage === 1 ? "pb-3" : "",
            "flex min-h-0 items-end justify-center",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Image
            imageUrl={imageUrl}
            stage={animal.stage}
            className="object-contain"
          />
        </div>
      </div>
    </CharacterFrame>
  );
}

export default AnimalPanel;