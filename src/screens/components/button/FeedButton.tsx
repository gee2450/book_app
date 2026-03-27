import ButtonFrame from "./ButtonFrame";
import { ui } from "@/assets/images";

type FeedButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

function FeedButton({
  text,
  onClick,
  disabled = false,
  className,
}: FeedButtonProps) {
  return (
    <ButtonFrame
      onClick={onClick}
      disabled={disabled}
      className={className}
      contentClassName="gap-2 text-3xl font-bold"
    >
      <img
        src={ui("fox_icon.png")}
        alt=""
        aria-hidden="true"
        className="h-11 -translate-y-0.5 shrink-0"
        draggable={false}
      />
      <span className="-translate-y-0.5">{text}</span>
    </ButtonFrame>
  );
}

export default FeedButton;