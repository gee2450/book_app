import { EMOTIONS } from "@/entities/emotion/model/emotions";
import type { EmotionId, EmotionOption } from "@/entities/emotion/model/types";

type EmotionPickerProps = {
  value?: EmotionId | null;
  onChange?: (next: EmotionId | null) => void;
  className?: string;
};

function EmotionButton({
  option,
  selectedId,
  onSelect,
}: {
  option: EmotionOption;
  selectedId: EmotionId | null;
  onSelect: (id: EmotionId) => void;
}) {
  const isSelected = selectedId === option.id;
  const hasSelection = selectedId !== null;
  const isDimmed = hasSelection && !isSelected;

  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={[
        "flex flex-col items-center gap-1",
        "select-none",
        "active:scale-95",
      ].join(" ")}
    >
      <img
        src={option.img}
        alt={option.id.toString()}
        className={[
          "w-14 h-14",
          "object-contain", 
          isDimmed ? "grayscale opacity-50" : "",
          isSelected ? "opacity-100" : "opacity-90",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ imageRendering: "pixelated" }}
      />
    </button>
  );
}

function EmotionPicker({
  value = null,
  onChange,
  className,
}: EmotionPickerProps) {
  const selectedId = value;

  const handleSelect = (id: EmotionId) => {
    const next = selectedId === id ? null : id;
    onChange?.(next);
  };

  return (
    <div
      className={[
        "w-full",
        "flex items-start justify-around",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {EMOTIONS.map((opt) => (
        <EmotionButton
          key={opt.id}
          option={opt}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default EmotionPicker;