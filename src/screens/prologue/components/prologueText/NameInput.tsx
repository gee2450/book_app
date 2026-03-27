import { FrameBox } from "@/screens/components";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

type NameMessage = {
  type: "error" | "warning" | "info";
  text: string;
};

type Props = {
  value: string;
  maxLength?: number;
  placeholder?: string;
  message?: NameMessage | null;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
};

export default function NameInput({
  value,
  maxLength = 10,
  placeholder = "이름 입력하기",
  message,
  onChange,
  onValidChange,
}: Props) {
  const sanitize = (text: string) => {
    return text.replace(/[^A-Za-z가-힣]/g, "").slice(0, maxLength);
  };

  const trimmed = value.trim();
  const sanitized = sanitize(trimmed);

  const isEmpty = trimmed.length === 0;
  const hasOnlyValidChar = trimmed === sanitized;
  const isWithinMaxLength = sanitized.length <= maxLength;
  const isValid = !isEmpty && hasOnlyValidChar && isWithinMaxLength;

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  const effectiveMessage: NameMessage | null =
    message ??
    (isEmpty
      ? {
        type: "error",
        text: "이름을 입력해 주세요.",
      }
      : !hasOnlyValidChar
        ? {
          type: "error",
          text: "이름은 한글 또는 영문만 사용할 수 있어요.",
        }
        : !isWithinMaxLength
          ? {
            type: "error",
            text: `이름은 ${maxLength}자 이하로 입력해 주세요.`,
          }
          : {
            type: "info",
            text: "이름은 나중에 수정할 수 없어요.",
          });

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
    <FrameBox className="w-full px-3" style={{ minHeight: "60px" }}>
      <div className="flex flex-col gap-1.5">
        <TextareaAutosize
          value={value}
          placeholder={placeholder}
          maxRows={1}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className={[
            "w-full bg-transparent text-center",
            "outline-none resize-none overflow-hidden",
            "text-[20px] leading-none",
            "text-[#3B2A1A] placeholder:text-[#3B2A1A]/45",
          ].join(" ")}
        />

        <div className="flex items-start justify-between min-h-4">
          <div className={`text-xs ${messageColor}`}>
            {effectiveMessage?.text}
          </div>

          <div className="text-xs text-[#3B2A1A]/60">
            {Math.min(trimmed.length, maxLength)}/{maxLength}
          </div>
        </div>
      </div>
    </FrameBox>
  );
}