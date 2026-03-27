import TopBar from "@/shared/TobBar";
import { useNavigate } from "react-router-dom";
import { GridList } from "./components";
import { CollectionFrame } from "../components";
import type { Genre } from "@/entities/book/model";
import { useList } from "./useList";
import type { GenreMetInfo } from "@/entities/journey/model/types";
import { ui } from "@/assets/images";


const CollectionScreen = () => {
  const navigate = useNavigate();

  // TODO: 실제 데이터로 교체
  const animal = "fox";
  const {metCounts} = useList();

  const handleCardClick = (genre: Genre, metInfo: GenreMetInfo) => {
    if (metInfo.count === 0) return;

    if (metInfo.count === 1) {
      navigate(`/collection/journeys/${metInfo.singleAnimalId}`);
    } else {
      navigate(`/collection/jobs/${genre}`, { state: { genre, animal, metInfo: metInfo } });
    }
  };

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      <TopBar title="여우 컬랙션" onBack={() => navigate(-1)} />
      <CollectionFrame>
        <div className="w-full flex flex-col items-center gap-2">
          <img
            src={ui('divider.png')}
            alt="divider"
            className="w-[80%] pointer-events-none"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="flex flex-col items-center justify-center">
            <span>여우는 가장 많이 먹은</span>
            <span>이야기의 색으로 자라요</span>
          </div>
        </div>
        <GridList animal={animal} metCounts={metCounts} onCardClick={handleCardClick} />
      </CollectionFrame>
    </div>
  );
};

export default CollectionScreen;
