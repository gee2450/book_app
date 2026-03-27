import { useTypingText } from "../useTypingText";
import { RESULT_TYPING_INTERVAL } from "../model/ending.config";
import { useEffect } from "react";

type Props = {
  text: string;
  onDone?: () => void;
};

export default function EndingResultBox({ text, onDone }: Props) {
  const { displayText } = useTypingText(
    text,
    true,
    onDone,
    RESULT_TYPING_INTERVAL
  );

  useEffect(() => {
    console.log("EndingResultBox mount");
    return () => console.log("EndingResultBox unmount");
  }, []);

  return (
    <div
      className={[
        "w-full transition-all duration-500",
        "translate-y-0 opacity-100"
      ].join(" ")}
    >
      <div className="rounded-xl bg-[#F5E8D2] p-1">
        <div className="h-20 rounded-lg border border-[#D4A574] bg-[#F5E8D2] relative overflow-hidden backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center justify-center">
          <p className="text-center text-base font-semibold leading-relaxed text-[#3B2A1A] sm:text-lg">
            {displayText}
          </p>
        </div>
      </div>
    </div>
  );
}