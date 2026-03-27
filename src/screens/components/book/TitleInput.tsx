import { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

type TitleMessage = {
  type: "error" | "warning" | "info";
  text: string;
};

export default function TitleInput({
  value,
  maxLength = 50,
  placeholder = "책 제목을 입력해 주세요",
  message,
  onChange,
  onValidChange,
}: {
  value: string;
  maxLength?: number;
  placeholder?: string;
  message?: TitleMessage | null;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
}) {
  const composingRef = useRef(false);
  const length = value.length;

  const handleChange = (next: string) => {
    if (next.length > maxLength) {
      onChange(next.slice(0, maxLength));
      return;
    }
    onChange(next);
  };

  /* -------------------------------------------------- */
  /* ✅ 내부 기본 검증 */
  /* -------------------------------------------------- */
  const trimmed = value.trim();
  const isEmpty = trimmed.length === 0;
  const hasValidChar = /[A-Za-z0-9가-힣]/.test(trimmed);
  const isValid = !isEmpty && hasValidChar;

  // 부모에게 유효성 상태 전달
  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  // 외부 message가 있으면 우선
  const effectiveMessage: TitleMessage | null =
    message ??
    (isEmpty
      ? {
        type: "error",
        text: "책 제목을 입력해 주세요.",
      }
      : !hasValidChar
        ? {
          type: "error",
          text: "제목에는 한글, 영문 또는 숫자가 최소 1자 포함되어야 합니다.",
        }
        : null);

  const messageColor = (() => {
    switch (effectiveMessage?.type) {
    case "error":
      return "text-red-600";
    case "warning":
      return "text-amber-600";
    case "info":
      return "text-[#3B2A1A]/60";
    default:
      return "text-[#3B2A1A]/60";
    }
  })();

  return (
    <div className="flex flex-col gap-1.5 rounded border border-black/40 px-2 py-1">
      <TextareaAutosize
        className={[
          "w-full",
          "bg-transparent",
          "outline-none resize-none",
          "text-[#3B2A1A] placeholder:text-[#3B2A1A]/60",
          "leading-snug",
        ].join(" ")}
        minRows={1}
        maxRows={2}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onCompositionStart={() => (composingRef.current = true)}
        onCompositionEnd={(e) => {
          composingRef.current = false;
          handleChange((e.target as HTMLTextAreaElement).value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />

      <div className="flex items-start justify-between min-h-4">
        <div className={`text-xs ${messageColor}`}>
          {effectiveMessage?.text}
        </div>

        <div className="text-xs text-[#3B2A1A]/60">
          {Math.min(length, maxLength)}/{maxLength}
        </div>
      </div>
    </div>
  );
}