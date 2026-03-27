import { useNavigate, useSearchParams } from "react-router-dom";
import { TopBar } from "@/shared";
import { ui } from "@/assets/images";
import { PaperFrame } from "../components";
import { TopBanner, RecordButtons } from "./components";
export type TabId = "currentAnimal" | "allJourney";

export default function RecordScreen() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab =
    (searchParams.get("tab") as TabId) ?? "currentAnimal";

  const changeTab = (next: TabId) => {
    setSearchParams({ tab: next }, { replace: true });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <TopBar title="기록 보기" onBack={() => navigate(-1)} />

      <PaperFrame>
        <div className="relative flex-1 w-full overflow-hidden">
          {/* 하단 배경은 전체 화면 기준 absolute */}
          <img
            src={ui("record_bottom.png")}
            alt="record bottom"
            className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
            style={{ imageRendering: "pixelated" }}
          />

          {/* ✅ 그냥 세로로 쌓기 */}
          <div className="relative z-10 flex flex-col">
            <TopBanner tab={tab} onChangeTab={changeTab} />
            <RecordButtons
              onByDate={() => {
                setSearchParams({ tab }, { replace: true });
                navigate("/record/by-date", {
                  state: { scope: tab } // "currentAnimal" | "allJourney"
                });
              }}
              onByBook={() => {
                setSearchParams({ tab }, { replace: true });
                navigate("/record/by-book", {
                  state: { scope: tab } // "currentAnimal" | "allJourney"
                });
              }}
            />
          </div>
        </div>
      </PaperFrame>
    </div>
  );
}
