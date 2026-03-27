import { useMemo } from "react";
import { ui } from "@/assets/images";
import type { TabId } from "../Record";

type Props = {
  tab: TabId;
  onChangeTab: (v: TabId) => void;
};

function TopBanner({ tab, onChangeTab }: Props) {
  const subtitle = useMemo(() => "여우가 읽은\n기억들을 모아두어요", []);

  return (
    <div className="relative w-full">
      <img
        src={ui("record_top.png")}
        alt="record top"
        className="w-full pointer-events-none select-none mt-18"
        style={{ imageRendering: "pixelated" }}
      />

      <div className="absolute inset-0 flex flex-col items-center px-6">
        <div className="w-full max-w-105 mt-2">
          <RecordTabs value={tab} onChange={onChangeTab} />
        </div>

        <div className="w-full max-w-105 mt-10 text-center text-[#3B2A1A]">
          <div className="text-2xl font-black leading-tight whitespace-pre-line">
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 탭(이번 여우 / 전체 여행) */
function RecordTabs({
  value,
  onChange,
}: {
  value: TabId;
  onChange: (v: TabId) => void;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full overflow-hidden rounded-full border border-[#3B2A1A]/20 bg-[#E9D8C3]/70">
        <TabPill active={value === "currentAnimal"} onClick={() => onChange("currentAnimal")}>
          이번 여우
        </TabPill>
        <TabPill active={value === "allJourney"} onClick={() => onChange("allJourney")}>
          전체 여행
        </TabPill>
      </div>
    </div>
  );
}

function TabPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 py-2",
        "text-base font-black",
        "transition",
        active ? "bg-[#E9C46A] text-[#3B2A1A] shadow-sm" : "bg-transparent text-[#3B2A1A]/70",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default TopBanner;