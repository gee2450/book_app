import { db } from "@/shared/infra/db/appDb";
import type { JourneyRow } from "@/shared/infra/db/appDb";
import type { CurrentAnimal } from "@/entities/animal/model/types";
import type { CreateJourneyResult } from "./createJourney.types";
import { nowIso } from "@/shared/lib/appDate";

function toResult(
  journeyRow: JourneyRow,
  currentAnimal: CurrentAnimal,
): CreateJourneyResult {
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
}

export async function createJourney(
  currentAnimal: CurrentAnimal,
): Promise<CreateJourneyResult> {
  const favoriteGenre = currentAnimal.favoriteGenre ?? "Unknown";

  return db.transaction("rw", db.journeys, db.records, async () => {
    const existing = await db.journeys.get(currentAnimal.id);
    if (existing) {
      return toResult(existing, currentAnimal);
    }

    const totalRecordCnt =
      (await db.records.where("animalId").equals(currentAnimal.id).count());

    const journeyRow: JourneyRow = {
      animalId: currentAnimal.id,
      favoriteGenre,
      feedCnt: currentAnimal.feedCnt,
      totalRecordCnt,
      startedAt: currentAnimal.startedAt,
      endedAt: nowIso(),
    };

    await db.journeys.add(journeyRow);

    return toResult(journeyRow, currentAnimal);
  });
}
