import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { GENRE } from "@/entities/book/model/types";

import {
  HomeMenu,
  PromptText,
  HomeStatsCard,
  DevModeModal,
} from "./components";

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
import { calcNextGrowthState } from "@/features/feedAnimal/model/feedAnimal.rules";
import { calcFavoriteGenre } from "@/features/feedAnimal/model/feedAnimal.helpers";

const HomeScreen = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [testDateLabel, setTestDateLabel] = useState(getAppDateLabel());
  const [devModeOpen, setDevModeOpen] = useState(false);

  const { data: currentAnimal } = useCurrentAnimal();
  const { data: todayRecordCount = 0 } = useTodayRecordCount(
    currentAnimal?.id,
  );

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

    if (currentAnimal.stage === 5) {
      navigate("/ending");
      return;
    }

    const nextStage = (currentAnimal.stage + 1) as Stage;

    navigate("/growth", {
      state: {
        prevAnimal: currentAnimal,
        nextAnimal: {
          ...currentAnimal,
          stage: nextStage,
        },
      },
    });

    setDevModeOpen(false);
  };

  const handleTestAddFeedCnt = async () => {
    if (!currentAnimal) return;

    const current = await db.current_animal.get("current");
    if (!current) return;

    const newFeedCnt = currentAnimal.feedCnt + 10;
    
    const {
      nextStage,
      shouldSetFavoriteGenre,
    } = calcNextGrowthState(current, newFeedCnt);

    let nextFavoriteGenre = current.favoriteGenre;

    if (shouldSetFavoriteGenre) {
      nextFavoriteGenre =
        (await calcFavoriteGenre(current.animalId)) ?? GENRE.Unknown;
    }

    await db.current_animal.update("current", {
      feedCnt: newFeedCnt,
      stage: nextStage,
      favoriteGenre: nextFavoriteGenre ?? null,
    });

    await qc.invalidateQueries({
      queryKey: animalKeys.current(),
    });

    await db.current_animal.update("current", {
      feedCnt: newFeedCnt,
    });

    await qc.invalidateQueries({
      queryKey: animalKeys.current(),
    });
  };

  return (
    <DeviceFrame 
      {...(import.meta.env.DEV
        ? { onDevModeClick: () => setDevModeOpen(true) }
        : {})}>
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

      <DevModeModal
        open={devModeOpen}
        label={testDateLabel}
        onClose={() => setDevModeOpen(false)}
        onNextDay={goNextDay}
        onTestGrowth={handleTestGrowth}
        onTestAddFeedCnt={handleTestAddFeedCnt}
      />
    </DeviceFrame>
  );
};

export default HomeScreen;