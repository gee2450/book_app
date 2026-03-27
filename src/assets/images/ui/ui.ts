const UI = import.meta.glob(
  "/src/assets/images/ui/*.{png,svg}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;


export function ui(name: string) {
  return UI[`/src/assets/images/ui/${name}`];
}