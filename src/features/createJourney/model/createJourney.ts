import { db } from "@/shared/infra/db/appDb";
import type { JourneyRow } from "@/shared/infra/db/appDb";
import type {
  CreateJourneyInput,
  CreateJourneyResult,
} from "./createJourney.types";
import { nowIso } from "@/shared/lib/appDate";


export async function createJourney(
  input: CreateJourneyInput,
): Promise<CreateJourneyResult> {
  const { currentAnimal, totalRecordCnt } = input;

  // favoriteGenre 처리 (없으면 "Unknown")
  const favoriteGenre = currentAnimal.favoriteGenre ?? "Unknown";

  const journeyRow: JourneyRow = {
    animalId: currentAnimal.id,
    favoriteGenre,
    feedCnt: 0, // feedCnt는 저장하지 않으므로 0으로 설정
    totalRecordCnt,
    startedAt: currentAnimal.startedAt,
    endedAt: nowIso(),
  };

  return db.transaction("rw", db.journeys, async () => {
    await db.journeys.add(journeyRow);

    return {
      journeyId: currentAnimal.id,
      journey: {
        animalInfo: {
          id: currentAnimal.id,
          type: currentAnimal.type,
          name: currentAnimal.name,
        },
        startedAt: journeyRow.startedAt,
        endedAt: journeyRow.endedAt,
        favoriteGenre: journeyRow.favoriteGenre,
        totalRecordCnt: journeyRow.totalRecordCnt,
      },
    };
  });
}
