import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  /** Pe fundal închis (footer, hero nav) sau deschis (nav scrollat) */
  variant?: "on-dark" | "on-light" | "red";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "text-[1.05rem] md:text-[1.15rem]",
  md: "text-[1.2rem] md:text-[1.35rem]",
  lg: "text-[1.45rem] md:text-[1.65rem]",
};

export function BrandWordmark({
  variant = "on-dark",
  size = "md",
  className,
}: BrandWordmarkProps) {
  return (
    <span
      className={cn(
        "brand-wordmark leading-none",
        variant === "on-dark"
          ? "brand-wordmark--dark"
          : variant === "red"
            ? "brand-wordmark--red"
            : "brand-wordmark--light",
        sizeClass[size],
        className
      )}
    >
      Cosram
      <span className="brand-wordmark-tld ml-[0.12em]">Auto</span>
    </span>
  );
}
