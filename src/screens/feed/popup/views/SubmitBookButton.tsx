type Props = {
  onClick: () => void;
  canSubmit: boolean;
  forceAdd: boolean;
  isSaving: boolean;
  isEdit: boolean;
};

export default function SubmitBookButton({
  onClick,
  canSubmit,
  forceAdd,
  isSaving,
  isEdit,
}: Props) {
  const label = isSaving ? "추가 중..." : isEdit ? "수정 완료" : "추가";

  const className = [
    "flex-1 rounded-xl border border-black/25 py-3 font-extrabold",
    !canSubmit
      ? "cursor-not-allowed bg-orange-300/40 opacity-60"
      : forceAdd
        ? "bg-orange-400 hover:bg-orange-400/90"
        : "bg-orange-300/70 hover:bg-orange-300/80",
  ].join(" ");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!canSubmit}
      className={className}
    >
      {label}
    </button>
  );
}