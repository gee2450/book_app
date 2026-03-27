import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { HomeMenu, PromptText, TestDateBar, HomeStatsCard } from "./components";
import { AnimalPanel, DeviceFrame, FeedButton } from "../components";

import { useCurrentAnimal } from "@/entities/animal/data/queries";
import { useTodayRecordCount } from "@/entities/record/data/queries";
import { recordKeys } from "@/entities/record/data/keys";
import { animalKeys } from "@/entities/animal/data/keys";

import { getStreakDays } from "@/shared/lib/date";
import {
  getAppDateLabel,
  moveAppDateToNextDay,
} from "@/shared/lib/appDate";
import type { Stage } from "@/entities/animal/model/types";
import { db } from "@/shared/infra/db/appDb";

const HomeScreen = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [testDateLabel, setTestDateLabel] = useState(getAppDateLabel());

  const { data: currentAnimal } = useCurrentAnimal();
  const { data: todayRecordCount = 0 } = useTodayRecordCount(currentAnimal?.id);

  useEffect(() => {
    if (currentAnimal?.isCompleted) {
      navigate("/ending");
    }
  }, [currentAnimal?.isCompleted, navigate]);

  if (!currentAnimal) return null;

  const streak = getStreakDays(
    currentAnimal.lastFeedAt,
    currentAnimal.streakStartedAt,
  );

  const goNextDay = async () => {
    moveAppDateToNextDay();
    setTestDateLabel(getAppDateLabel());

    if (currentAnimal.id) {
      await qc.invalidateQueries({
        queryKey: recordKeys.todayCount(currentAnimal.id),
      });
    }
  };

  const handleTestGrowth = async () => {
    if (!currentAnimal) return;

    // stage 5일 때는 Ending으로 이동
    if (currentAnimal.stage === 5) {
      navigate("/ending");
      return;
    }

    const nextStage = (currentAnimal.stage + 1) as Stage;
    const nextFavoriteGenre = currentAnimal.stage === 3 ? "SF" : currentAnimal.favoriteGenre;

    navigate("/growth", {
      state: {
        prevAnimal: currentAnimal,
        nextAnimal: {
          ...currentAnimal,
          stage: nextStage,
          favoriteGenre: nextFavoriteGenre,
        },
      },
    });
  };

  const handleTestAddFeedCnt = async () => {
    if (!currentAnimal) return;

    const newFeedCnt = currentAnimal.feedCnt + 10;

    await db.current_animal.update("current", {
      feedCnt: newFeedCnt,
    });

    // UI 업데이트
    await qc.invalidateQueries({
      queryKey: animalKeys.current(),
    });
  };

  return (
    <DeviceFrame>
      {import.meta.env.DEV && (
        <TestDateBar
          label={testDateLabel}
          onNextDay={goNextDay}
          onTestGrowth={handleTestGrowth}
          onTestAddFeedCnt={handleTestAddFeedCnt}
        />
      )}

      <AnimalPanel animal={currentAnimal} />
      <PromptText animal={currentAnimal} />

      <FeedButton
        text="먹이주기"
        onClick={() => navigate("/feed")}
      />

      <HomeStatsCard
        todayRecordCount={todayRecordCount}
        streak={streak}
      />

      <HomeMenu
        onRecordClick={() => navigate("/record")}
        onCollectionClick={() => navigate("/collection")}
      />
    </DeviceFrame>
  );
};

export default HomeScreen;