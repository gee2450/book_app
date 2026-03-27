
export default function CoverAddButton({
  onClick,
  className,
  label = "책 표지 추가하기",
  optionalText = "(선택)",
}: {
  onClick?: () => void;
  className?: string;
  label?: string;
  optionalText?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full max-w-130 pb-3",
        "flex flex-col items-center justify-center",
        "rounded-2xl border-2 border-dashed border-[#6B4B3C]/35 bg-white/10",
        "text-[#3B2A1A] hover:bg-white/15",
        className ?? "",
      ].join(" ")}
      aria-label={`${label} ${optionalText}`}
    >
      {/* Plus */}
      <div className="leading-none">
        <span className="text-5xl font-bold text-[#6B4B3C]/70">+</span>
      </div>

      {/* Label */}
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold tracking-[-0.02em]">
          {label}
        </span>
        <span className="font-semibold text-[#3B2A1A]/70">
          {optionalText}
        </span>
      </div>
    </button>
  );
}
