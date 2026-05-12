import type { ReactNode, ButtonHTMLAttributes } from "react";
import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";

type ButtonFrameProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "type">;

function ButtonFrame({
  children,
  onClick,
  disabled = false,
  type = "button",
  className,
  contentClassName,
}: ButtonFrameProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={[
        "w-full h-17 shrink-0 p-0 bg-transparent border-none",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <NineSliceBox
        frameUrl={ui("button.png")}
        slice="50"
        borderWidth="10px"
        imageWidth="25px"
        className={[
          "relative w-full h-full",
          "flex items-center justify-center",
          "leading-none select-none",
          disabled ? "grayscale-[0.8]" : "",
          contentClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </NineSliceBox>
    </button>
  );
}

export default ButtonFrame;