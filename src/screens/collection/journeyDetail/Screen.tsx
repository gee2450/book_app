import { TopBar } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";
import { CollectionFrame } from "../components";
import { ANIMAL_JOB_APPEARANCE } from "@/entities/animal/model/jobAppearance";
import { OneLine, BookList, BookListItem } from "./components";
import { useJourney } from "@/entities/journey/data/queries";
import { ui } from "@/assets/images";
import { formatDate } from "@/shared/lib/date";


const Screen = () => {
  const navigate = useNavigate();
  const { animalId } = useParams<{ animalId?: string }>();
  
  const { data: journey } = useJourney(animalId || null);

  if (!journey) return;

  const animalType = journey.animalInfo.type;
  const genre = journey.favoriteGenre;

  const job = ANIMAL_JOB_APPEARANCE[animalType][genre];
  const jobLabel = job.name;

  const imgUrl = ANIMAL_JOB_APPEARANCE[animalType][genre].imgUrl;

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      <TopBar title={jobLabel} onBack={() => navigate(-1)} />
      <CollectionFrame>
        <div className="min-h-0 w-full flex flex-1 flex-col items-center gap-2 mb-5 overflow-y-scroll">
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
              <span>{journey.animalInfo.name}</span>
              <img alt="divider_right" src={ui('divider_half.png')} className="w-10 pointer-events-none scale-x-[-1]" />
            </div>
            <span>{formatDate(journey.startedAt)} ~ {formatDate(journey.endedAt)}</span>
          </div>
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
          <OneLine>먹인 횟수: {journey.totalRecordCnt}</OneLine>
          <div className="flex items-center gap-2">
            <img alt="divider_left" src={ui('divider_half.png')} className="w-10 pointer-events-none" />  
            <span>이 여우가 먹은 이야기</span>
            <img alt="divider_right" src={ui('divider_half.png')} className="w-10 pointer-events-none scale-x-[-1]" />
          </div>
          <BookList className="mb-2">
            {journey.records.map((b) => (
              <BookListItem key={b.id} book={b} />
            ))}
          </BookList>
          {/* TODO: 어디까지 타고 들어갈수 있게 해야할지 모르겠음. 일단 비활성화 */}
          {/* <OneLine>
            <div className="w-full text-center">{journey.name}의 기록 모두 보기 →</div>
          </OneLine> */}
        </div>

      </CollectionFrame>
    </div>
  );
};

export default Screen;
