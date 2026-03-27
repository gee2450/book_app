import { useTypingText } from "../useTypingText";
import { INTRO_TYPING_INTERVAL } from "../model/ending.config";

type Props = {
  visible: boolean;
  text: string;
  onDone?: () => void;
};

export default function EndingIntro({ visible, text, onDone }: Props) {
  const { displayText } = useTypingText(
    text,
    visible,
    onDone,
    INTRO_TYPING_INTERVAL
  );

  return (
    <div
      className={[
        "absolute inset-0 z-30 flex items-center justify-center px-8 transition-opacity duration-1000",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        "bg-black",
      ].join(" ")}
    >
      <p className="whitespace-pre-line text-center text-[24px] font-medium leading-relaxed text-white">
        {displayText}
      </p>
    </div>
  );
}