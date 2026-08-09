import { cn } from "@/lib/utils";

const PLACEHOLDER_GRADIENT = "from-slate-700 to-slate-900";

export function isLocalImage(src: string): boolean {
  return src.startsWith("/");
}

export function isRemoteImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function isRenderableImage(src: string): boolean {
  return isLocalImage(src) || isRemoteImage(src);
}

export function getPlaceholderGradient(_src: string): string {
  return PLACEHOLDER_GRADIENT;
}

export function normalizeCarImages(
  images?: string[] | null,
  minCount = 10
): string[] {
  const list = images ?? [];
  if (list.length >= minCount) return list.slice(0, minCount);
  if (list.length === 0) return Array(minCount).fill("placeholder-1");
  return [
    ...list,
    ...Array(minCount - list.length).fill(list[0] ?? "placeholder-1"),
  ];
}

export function imageSlideClassName(className?: string) {
  return cn("object-cover", className);
}
