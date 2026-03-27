import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAnimalIdle } from "@/assets/images";
import type { CurrentAnimal } from "@/entities/animal/model/types";

type GrowthLocationState = {
  prevAnimal: CurrentAnimal;
  nextAnimal: CurrentAnimal;
};

type Phase =
  | "dim"
  | "focus-prev"
  | "flash"
  | "reveal-next"
  | "hold"
  | "done";

function getAnimalImage(animal: CurrentAnimal) {
  if (animal.stage >= 4 && animal.favoriteGenre) {
    return getAnimalIdle({
      type: animal.type,
      stage: animal.stage,
      genre: animal.favoriteGenre,
    });
  }

  return getAnimalIdle({
    type: animal.type,
    stage: animal.stage,
  });
}

// 파티클 데이터 생성 (컴포넌트 외부에서 순수하게 생성)
function generateParticles() {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 50,
    left: Math.random() * 100,
    duration: 1000 + Math.random() * 500,
  }));
}

const initialParticles = generateParticles();

// 파티클 생성 (별 효과)
const Particles = ({ visible }: { visible: boolean }) => {
  const particles = useMemo(() => {
    return initialParticles;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-35 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            left: `${p.left}%`,
            top: "-10px",
            animation: visible
              ? `fall ${p.duration}ms ease-in forwards`
              : "none",
            animationDelay: `${p.delay}ms`,
            opacity: visible ? 0.8 : 0,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// 동심원 확장 효과
const RingExpand = ({ visible }: { visible: boolean }) => {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={`ring-${i}`}
          className="pointer-events-none absolute z-25 rounded-full border-2 border-white/40"
          style={{
            width: "200px",
            height: "200px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: visible
              ? `expandRing ${800 + i * 100}ms ease-out forwards`
              : "none",
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
      <style>{`
        @keyframes expandRing {
          from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default function GrowthScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as GrowthLocationState | null;

  const [phase, setPhase] = useState<Phase>("dim");

  const prevAnimal = state?.prevAnimal;
  const nextAnimal = state?.nextAnimal;

  const prevSrc = useMemo(
    () => (prevAnimal ? getAnimalImage(prevAnimal) : ""),
    [prevAnimal]
  );

  const nextSrc = useMemo(
    () => (nextAnimal ? getAnimalImage(nextAnimal) : ""),
    [nextAnimal]
  );

  useEffect(() => {
    if (!prevAnimal || !nextAnimal) {
      navigate("/home", { replace: true });
      return;
    }

    const timers = [
      window.setTimeout(() => setPhase("focus-prev"), 300),
      window.setTimeout(() => setPhase("flash"), 1100),
      window.setTimeout(() => setPhase("reveal-next"), 1500),
      window.setTimeout(() => setPhase("hold"), 2500),
      window.setTimeout(() => {
        setPhase("done");
        navigate("/home", { replace: true });
      }, 3400),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [navigate, prevAnimal, nextAnimal]);

  if (!prevAnimal || !nextAnimal) return null;

  const showNext = phase === "reveal-next" || phase === "hold" || phase === "done";
  const flashOn = phase === "flash";
  const dimOn = phase !== "done";

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8EAD8] to-[#EDD5B8]">
      {/* 배경 어두워지는 레이어 */}
      <div
        className={[
          "pointer-events-none absolute inset-0 z-10 bg-black transition-opacity duration-500",
          dimOn ? "opacity-45" : "opacity-0",
        ].join(" ")}
      />

      {/* 파티클 효과 */}
      <Particles visible={flashOn} />

      {/* 동심원 확장 */}
      <RingExpand visible={flashOn} />

      {/* 중앙 primary glow */}
      <div
        className={[
          "pointer-events-none absolute z-20 rounded-full bg-gradient-to-br from-white via-yellow-100 to-transparent blur-3xl transition-all duration-700",
          phase === "focus-prev"
            ? "h-48 w-48 opacity-20"
            : phase === "flash"
              ? "h-80 w-80 opacity-100"
              : phase === "reveal-next"
                ? "h-64 w-64 opacity-40"
                : "h-40 w-40 opacity-0",
        ].join(" ")}
      />

      {/* 보조 glow (warm tone) */}
      <div
        className={[
          "pointer-events-none absolute z-15 rounded-full bg-gradient-to-br from-amber-200 to-transparent blur-2xl transition-all duration-700",
          phase === "flash"
            ? "h-96 w-96 opacity-30"
            : phase === "reveal-next"
              ? "h-80 w-80 opacity-20"
              : "h-64 w-64 opacity-0",
        ].join(" ")}
      />

      {/* 전체 플래시 오버레이 */}
      <div
        className={[
          "pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-white to-transparent transition-opacity duration-300",
          flashOn ? "opacity-80" : "opacity-0",
        ].join(" ")}
      />

      {/* Stage/Level 텍스트 */}
      <div
        className={[
          "pointer-events-none absolute z-50 text-center transition-all duration-700",
          phase === "flash" || phase === "reveal-next" || phase === "hold"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75",
        ].join(" ")}
        style={{
          top: "20%",
        }}
      >
        <div className="text-sm font-bold text-[#8B6F47] opacity-80 mb-2">
          STAGE {prevAnimal?.stage} → {nextAnimal?.stage}
        </div>
        <div className="text-3xl font-black text-[#3B2A1A]">Level UP!</div>
      </div>

      {/* 동물 컨테이너 */}
      <div className="relative z-40 flex items-center justify-center">
        {/* 이전 동물 */}
        <img
          src={prevSrc}
          alt=""
          className={[
            "absolute h-45 w-auto max-w-none object-contain transition-all duration-700",
            showNext
              ? "scale-75 opacity-0 blur-md"
              : phase === "focus-prev"
                ? "scale-125 opacity-100"
                : "scale-100 opacity-100",
          ].join(" ")}
          draggable={false}
        />

        {/* 다음 동물 */}
        <img
          src={nextSrc}
          alt=""
          className={[
            "h-45 w-auto max-w-none object-contain transition-all duration-700",
            showNext
              ? "scale-110 opacity-100"
              : "scale-100 opacity-0 blur-md",
          ].join(" ")}
          draggable={false}
        />
      </div>

      {/* 아래 무지개 그래디언트 빛 */}
      <div
        className={[
          "pointer-events-none absolute bottom-8 z-22 h-24 w-80 rounded-full transition-opacity duration-500",
          phase === "flash" || phase === "reveal-next" || phase === "hold"
            ? "opacity-60"
            : "opacity-0",
        ].join(" ")}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 200, 87, 0.6) 0%, rgba(255, 159, 64, 0.3) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}