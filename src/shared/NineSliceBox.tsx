import React from "react";

export type NineSliceBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  /** 9-slice 프레임 이미지 URL (new URL(...).href 결과든, import된 URL이든 OK) */
  frameUrl: string;
  /**
   * border-image-slice 값
   * ex: "150" / "27" / "0 500" / "30 30 120 30"
   * fill 적용 여부는 fill prop으로 제어
   */
  slice: string;
  /**
   * 실제 DOM border-width (CSS border-width)
   * 예: "16px" / "30px 30px 120px 30px"
   */
  borderWidth: string;
  /**
   * border-image-width 값
   * 예: "16px" / "70px" / "0 60px"
   */
  imageWidth: string;
  /** border-image-slice에 fill을 붙일지 여부 (기본 true) */
  fill?: boolean;
  /** border-image-outset (기본 0) */
  outset?: string;
  /** 배경색/배경이미지 등을 내부(content)에 줄 때 사용 */
  backgroundColor?: string;
};

export function NineSliceBox({
  frameUrl,
  slice,
  borderWidth,
  imageWidth,
  fill = true,
  outset = "0px",
  backgroundColor,
  style,
  children,
  ...rest
}: NineSliceBoxProps) {
  const borderImageSlice = fill ? `${slice} fill` : slice;

  return (
    <div
      {...rest}
      style={{
        borderStyle: "solid",
        borderWidth,
        borderImageSource: `url(${frameUrl})`,
        borderImageSlice,
        borderImageWidth: imageWidth,
        borderImageOutset: outset,
        borderImageRepeat: 'stretch',
        boxSizing: "border-box",
        backgroundColor,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default NineSliceBox;
