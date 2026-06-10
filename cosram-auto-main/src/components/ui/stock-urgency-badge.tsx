import { cn } from "@/lib/utils";

type NavStockBadgeProps = {
  className?: string;
  /** light = text alb pe hero; dark = navbar scrollat / meniu mobil */
  tone?: "light" | "dark";
};

/** Badge mic, interactiv — lângă linkul „Stoc” din navbar. */
export function NavStockBadge({
  className,
  tone = "light",
}: NavStockBadgeProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-300",
        "group-hover/stoc:scale-110 group-hover/stoc:shadow-[0_0_14px_rgba(200,16,46,0.55)]",
        "group-focus-visible/stoc:scale-110 group-focus-visible/stoc:outline-none",
        tone === "light"
          ? "bg-[#C8102E] text-white shadow-[0_0_10px_rgba(200,16,46,0.4)]"
          : "bg-[#C8102E] text-white shadow-[0_2px_8px_rgba(200,16,46,0.35)]",
        className
      )}
      aria-hidden
    >
      <span className="relative flex size-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80 motion-reduce:animate-none" />
        <span className="relative inline-flex size-1.5 rounded-full bg-white" />
      </span>
      Nou
    </span>
  );
}
