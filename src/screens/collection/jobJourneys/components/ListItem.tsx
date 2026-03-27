import type { FC } from "react";
import NineSliceBox from "@/shared/NineSliceBox";
import type { AnimalType } from "@/entities/animal/model/types";
import { ANIMAL_JOB_APPEARANCE } from "@/entities/animal/model/jobAppearance";
import TravelTag from "./TravelTag";
import type { Genre } from "@/entities/book/model";
import type { JourneySummary } from "@/entities/journey/model/types";
import { ui } from "@/assets/images";


type Props = {
  journey: JourneySummary;
  animalType: AnimalType;
  genre: Genre;
  index: number;
  onClick: (journeyId: string) => void;
};

const ListItem: FC<Props> = ({ journey, animalType, genre, index, onClick }) => {
  const imgUrl = ANIMAL_JOB_APPEARANCE[animalType][genre].imgUrl;

  return (
    <NineSliceBox
      frameUrl={ui("collection_card_big.png")}
      slice="90 60 60 110"
      borderWidth="25px 20px 20px 20px"
      imageWidth="50px 30px 40px 60px"
      fill
      outset="0px"
      className="w-full flex gap-2 cursor-pointer select-none"
      onClick={() => onClick(journey.animalInfo.id)}
      style={{ imageRendering: "pixelated" }}
    >
      <img
        src={imgUrl}
        alt={journey.animalInfo.id}
        className="
          w-30
          object-contain
          pointer-events-none
          select-none
        "
        style={{ imageRendering: "pixelated" }}
      />
      {/* ✅ padding은 내부 content에 */}
      <div className="w-full flex flex-col gap-2">
        <div className="pt-2 px-2 relative flex justify-between items-center">
          <span className="font-bold">{journey.animalInfo.name}</span>
          <TravelTag index={index} />
        </div>

        <div className="h-0 border-b border-[#B7978D]"></div>

        <div className="text-sm">
          {journey.startedAt} ~ { }
          <span className="whitespace-nowrap">
            {journey.endedAt}
          </span>
        </div>

        <div className="h-0 border-b border-[#B7978D]"></div>

        <div className="ml-auto text-sm">기록 횟수: {journey.totalRecordCnt}회</div>
      </div>
    </NineSliceBox>
  );
};

export default ListItem;
