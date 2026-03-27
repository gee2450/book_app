import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useCurrentAnimal } from "@/entities/animal/data/queries";
import { eunNeun } from "@/shared/lib/koreanJosa";

import { EndingIntro, EndingContent, EndingActionModal } from "./components";

import {
  IMAGE_REVEAL_MS,
  INTRO_1_HOLD_MS,
  INTRO_2_HOLD_MS,
  INTRO_PAUSE_MS,
  INTRO_TEXT_1,
  INTRO_TEXT_2,
  RESULT_TEXT_HOLD_MS,
} from "./model/ending.config";
import {
  getEndingImageByGenre,
  getEndingTitleByGenre,
} from "./model/ending.mapper";
import BlurBackground from "./components/BlurBackground";

type EndingPhase =
  | "intro1"
  | "introPause"
  | "intro2"
  | "imageReveal"
  | "resultTyping"
  | "resultHold"
  | "showButtons";


export default function EndingScreen() {
  const navigate = useNavigate();
  const { data: currentAnimal } = useCurrentAnimal();

  const favoriteGenre = currentAnimal?.favoriteGenre ?? "Unknown";
  const animalName = currentAnimal?.name ?? "이 여우";

  const endingImage = useMemo(
    () => getEndingImageByGenre(favoriteGenre),
    [favoriteGenre]
  );

  const endingJob = useMemo(
    () => getEndingTitleByGenre(favoriteGenre),
    [favoriteGenre]
  );

  const resultText = `${eunNeun(animalName)} [ ${endingJob} ]가 되었어요`;

  const [phase, setPhase] = useState<EndingPhase>("intro1");
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    if (phase !== "introPause") return;

    const timer = window.setTimeout(() => {
      setPhase("intro2");
    }, INTRO_PAUSE_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "imageReveal") return;

    const timer = window.setTimeout(() => {
      setPhase("resultTyping");
    }, IMAGE_REVEAL_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "resultHold") return;

    const timer = window.setTimeout(() => {
      setPhase("showButtons");
    }, RESULT_TEXT_HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleIntro1Done = useCallback(() => {
    window.setTimeout(() => {
      setPhase("introPause");
    }, INTRO_1_HOLD_MS);
  }, []);

  const handleIntro2Done = useCallback(() => {
    window.setTimeout(() => {
      setPhase("imageReveal");
    }, INTRO_2_HOLD_MS);
  }, []);

  const handleResultDone = useCallback(() => {
    window.setTimeout(() => {
      setPhase("resultHold");
    }, 0);
  }, []);

  const handleRestart = () => {
    navigate("/prologue");
  };

  const handleShowActionModal = () => {
    setShowActionModal(true);
  };

  const handleCloseActionModal = () => {
    setShowActionModal(false);
  };

  if (!currentAnimal) return null;

  const showIntroBlack =
    phase === "intro1" || phase === "introPause" || phase === "intro2";

  const showIntro1 = phase === "intro1";
  const showIntro2 = phase === "intro2";

  const showImage =
    phase === "imageReveal" ||
    phase === "resultTyping" ||
    phase === "resultHold" ||
    phase === "showButtons";

  const showResultBox =
    phase === "resultTyping" || phase === "resultHold" || phase === "showButtons";

  const showButtons = phase === "showButtons";

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      <BlurBackground src={endingImage} visible={showImage} />

      <div
        className="relative z-10 h-full w-full flex items-center justify-center cursor-pointer"
        onClick={handleShowActionModal}
      >
        <EndingContent
          src={endingImage}
          showImage={showImage}
          showResultBox={showResultBox}
          resultText={resultText}
          onResultDone={handleResultDone}
          showButtons={showButtons}
        />
      </div>

      {showIntroBlack && showIntro1 && (
        <EndingIntro
          key="intro1"
          visible
          text={INTRO_TEXT_1}
          onDone={handleIntro1Done}
        />
      )}

      {showIntroBlack && showIntro2 && (
        <EndingIntro
          key="intro2"
          visible
          text={INTRO_TEXT_2}
          onDone={handleIntro2Done}
        />
      )}

      <AnimatePresence>
        {showActionModal && (
          <EndingActionModal
            key="action-modal"
            onRestart={handleRestart}
            onClose={handleCloseActionModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}