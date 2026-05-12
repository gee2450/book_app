import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type MemoPanelProps = {
  title?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  maxChars?: number;

  /** ✅ true면 읽기 전용(수정 불가) */
  readOnly?: boolean;

  /** ✅ 읽기 전용일 때 비어있으면 보여줄 문구 */
  emptyText?: string;

  /** ✅ 읽기 전용일 때도 카운터를 보여줄지 */
  showCounterWhenReadOnly?: boolean;
};

function MemoPanel({
  title = "기록 남기기",
  placeholder = "오늘 인상 깊었던 문장이나\n생각을 적어요 좋아요.",
  value = "",
  onChange,
  className,
  maxChars = 300,
  readOnly = false,
  emptyText = "메모가 없어요",
  showCounterWhenReadOnly = false,
}: MemoPanelProps) {
  const composingRef = useRef(false);

  const clamp = (s: string) => (s.length > maxChars ? s.slice(0, maxChars) : s);

  const handleChange = (next: string) => {
    if (readOnly) return;
    if (composingRef.current) {
      onChange?.(next);
      return;
    }
    onChange?.(clamp(next));
  };

  const len = value.length;
  const showCounter = !readOnly || showCounterWhenReadOnly;

  return (
    <NineSliceBox
      frameUrl={ui('memo.png')}
      slice="200 130 130 130"
      borderWidth="10px"
      imageWidth="60px 30px 30px 30px"
      fill
      style={{ borderImageRepeat: "stretch" }}
      className={["relative isolate w-full p-4 mb-3 overflow-visible", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 🐾 발자국 — 맨 아래 */}
      <img
        src={ui('footprint.png')}
        alt="footprint"
        className="pointer-events-none select-none absolute right-1 bottom-1 w-20 opacity-70 z-0"
      />

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="font-black text-lg text-[#3B2A1A] leading-none">
            {title}
          </div>
        </div>

        {/* ✅ body */}
        <div className="relative">
          <TextareaAutosize
            aria-placeholder={emptyText}
            readOnly={readOnly}
            className={[
              "w-full mb-5",
              "bg-transparent",
              "outline-none resize-none",
              "text-base text-[#3B2A1A] placeholder:text-[#3B2A1A]/60",
              "overflow-y-auto overscroll-contain leading-relaxed",
            ].join(" ")}
            style={{ WebkitOverflowScrolling: "touch" }}
            minRows={3}
            maxRows={7}
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            onCompositionStart={() => (composingRef.current = true)}
            onCompositionEnd={(e) => {
              composingRef.current = false;
              handleChange((e.target as HTMLTextAreaElement).value);
            }}
          />

          {showCounter && (
            <div className="pointer-events-none select-none absolute right-10 bottom-1 text-xs text-[#3B2A1A]/60">
              {Math.min(len, maxChars)}/{maxChars}
            </div>
          )}
        </div>
      </div>

      {/* 🖋️ 잉크 — 맨 위 */}
      <img
        src={ui('ink.png')}
        alt="ink"
        className="pointer-events-none select-none absolute -right-2 -bottom-5 w-18 z-20"
      />
    </NineSliceBox>
  );
}

export default MemoPanel;
