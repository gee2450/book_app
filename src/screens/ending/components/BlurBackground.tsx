export default function BlurBackground({
  src,
  visible,
}: {
  src: string;
  visible: boolean;
}) {
  return (
    <img
      src={src}
      alt=""
      className={[
        "absolute inset-0 h-full w-full object-cover",
        "scale-110 blur-2xl",
        "transition-opacity duration-1000",
        visible ? "opacity-40" : "opacity-0",
      ].join(" ")}
    />
  );
}