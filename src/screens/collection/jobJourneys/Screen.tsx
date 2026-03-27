import TopBar from "@/shared/TobBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CollectionFrame } from "../components";
import { ANIMAL_JOB_APPEARANCE } from "@/entities/animal/model/jobAppearance";
import type { AnimalType } from "@/entities/animal/model/types";
import ListItem from "./components/ListItem";
import type { JourneySummary } from "@/entities/journey/model/types";
import type { Genre } from "@/entities/book/model";
import { useGenreJourneysList } from "@/entities/journey/data/queries";
import { ui } from "@/assets/images";


type ScreenLocationState = {
  genre?: Genre;
  animal?: AnimalType;
};

const DEFAULT_GENRE: Genre = "Literature";
const DEFAULT_ANIMAL: AnimalType = "fox";

const Screen = () => {
  const navigate = useNavigate();

  const { genre: paramGenre } = useParams<{ genre?: Genre }>();
  const location = useLocation() as { state: ScreenLocationState | null };

  const stateGenre = location.state?.genre;
  const stateAnimal = location.state?.animal;

  const genre: Genre = paramGenre ?? stateGenre ?? DEFAULT_GENRE;
  const animalType: AnimalType = stateAnimal ?? DEFAULT_ANIMAL;

  const job = ANIMAL_JOB_APPEARANCE[animalType][genre];
  const jobLabel = job.name;

  const {data} = useGenreJourneysList(genre, animalType);

  const journeys = data?.journeys ?? [];
  const metCount = data?.metCount ?? 0;

  const handleCardClick = (journeyId: string, journey: JourneySummary) => {
    navigate(`/collection/journeys/${journeyId}`, { state: { animalType, genre, journey } });
  }

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      <TopBar title={jobLabel} onBack={() => navigate(-1)} />
      <CollectionFrame>
        <div className="h-full flex flex-col flex-1 gap-2">
          <div className="w-full flex flex-col items-center gap-2">
            <img
              src={ui('divider.png')}
              alt="divider"
              className="w-[70%] pointer-events-none"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="flex flex-col w-full items-center">
              <span className="text-lg font-bold">{jobLabel}</span>
              <div className="flex items-center gap-2">
                <img alt="divider_left" src={ui('divider_half.png')} className="w-10 pointer-events-none" />
                <span>총 만남 : {metCount}회</span>
                <img alt="divider_right" src={ui('divider_half.png')} className="w-10 pointer-events-none scale-x-[-1]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-y-scroll mb-10 pr-1">
            {journeys.map((journey, idx) => (
              <ListItem
                key={journey.animalInfo.id}
                journey={journey}
                animalType={animalType}
                genre={genre}
                index={idx}
                onClick={() =>
                  handleCardClick(journey.animalInfo.id, journey)
                }
              />
            ))}
          </div>
        </div>
      </CollectionFrame>
    </div>
  );
};

export default Screen;
