import type { JourneySummary } from "@/entities/journey/model/types";
import type { CurrentAnimal } from "@/entities/animal/model/types";

export interface CreateJourneyInput {
  currentAnimal: CurrentAnimal;
  totalRecordCnt: number;
}

export interface CreateJourneyResult {
  journeyId: string;
  journey: JourneySummary;
}
