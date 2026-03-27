import ButtonFrame from "./ButtonFrame";

type TextButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

function TextButton({
  text,
  onClick,
  disabled,
  className,
}: TextButtonProps) {
  return (
    <ButtonFrame
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <span className="-translate-y-0.5 text-3xl font-bold">
        {text}
      </span>
    </ButtonFrame>
  );
}

export default TextButton;