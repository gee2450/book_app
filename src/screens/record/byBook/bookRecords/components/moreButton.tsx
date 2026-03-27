export function MoreButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="더보기"
      className="w-12 h-12 flex items-center justify-center active:scale-95"
    >
      <span className="text-3xl leading-none text-[#3B2A1A]">⋯</span>
    </button>
  );
}