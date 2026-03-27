import ListItem from "./ListItem";
import { ANIMAL_JOB_APPEARANCE } from "@/entities/animal/model/jobAppearance";
import type { AnimalType } from "@/entities/animal/model/types";
import type { Genre } from "@/entities/book/model";
import type { GenreMetInfo, MetCounts } from "@/entities/journey/model/types";

type Props = {
  animal: AnimalType;
  metCounts: MetCounts;
  onCardClick: (genre: Genre, metInfo: GenreMetInfo) => void;
};

export default function GridList({ animal, metCounts, onCardClick }: Props) {
  const foxJobs = Object.values(ANIMAL_JOB_APPEARANCE[animal]);

  return (
    <div className="w-full h-full overflow-y-scroll min-h-0 mb-5">
      <div className="grid grid-cols-2 gap-1 px-1">
        {foxJobs.map((fox, idx) => {
          const metCount = metCounts[fox.genre];
          return (
            <ListItem
              key={idx}
              name={fox.name}
              imgUrl={fox.imgUrl}
              metCount={metCount.count}
              onClick={() => onCardClick(fox.genre, metCount)}
            />
          );
        })}
      </div>
    </div>
  );
}
