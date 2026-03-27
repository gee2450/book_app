import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";


export default function BookMemoPanel({
  value, 
  onChange,
  maxChars = 500,
}: {
  value?: string;
  onChange: (value: string) => void;
  maxChars?: number;
}) {
  const composingRef = useRef(false);
  const len = value?.length || 0;
  const handleChange = (value: string) => {
    onChange(value);
  }

  return (
    <div className="border border-black/40 rounded-md py-1 px-2 text-right">
      <TextareaAutosize
        aria-placeholder={"책 소개를 입력해 주세요"}
        className={[
          "w-full",
          "bg-transparent",
          "outline-none resize-none",
          "text-base text-[#3B2A1A] placeholder:text-[#3B2A1A]/60",
          "overflow-y-auto overscroll-contain leading-relaxed",
        ].join(" ")}
        style={{ WebkitOverflowScrolling: "touch" }}
        minRows={3}
        maxRows={7}
        value={value}
        placeholder={"책 소개를 입력해 주세요"}
        onChange={(e) => handleChange(e.target.value)}
        onCompositionStart={() => (composingRef.current = true)}
        onCompositionEnd={(e) => {
          composingRef.current = false;
          handleChange((e.target as HTMLTextAreaElement).value);
        }}
      />
      <div className="pointer-events-none select-none text-xs text-[#3B2A1A]/60">
        {Math.min(len, maxChars)}/{maxChars}
      </div>
    </div>
  );
}
