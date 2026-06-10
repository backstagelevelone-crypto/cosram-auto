import type { Car } from "@/types/car";

export function formatLocaleNumber(value?: number | null): string {
  if (value == null || Number.isNaN(value)) return "-";
  return value.toLocaleString("ro-RO");
}

export function formatPrice(
  value?: number | null,
  options?: { suffix?: string; spaced?: boolean }
): string {
  if (value == null || Number.isNaN(value)) return "-";
  const suffix = options?.suffix ?? "€";
  const spaced = options?.spaced ?? false;
  return `${value.toLocaleString("ro-RO")}${spaced && suffix ? " " : ""}${suffix}`;
}

export function buildCarTitle(car: Pick<Car, "make" | "model">): string {
  return [car.make, car.model].filter(Boolean).join(" ") || "Mașină";
}

export function buildCarName(car: Car): string {
  const parts = [car.make, car.model].filter(Boolean);
  if (car.year != null) parts.push(String(car.year));
  if (car.engine) parts.push(`· ${car.engine}`);
  return parts.join(" ") || car.make || "Mașină";
}

export function buildCarSubtitle(car: Car): string {
  const parts: string[] = [];
  if (car.engine) parts.push(car.engine);
  if (car.year != null) parts.push(String(car.year));
  return parts.join(" · ") || "-";
}

export function isCarClickable(car: Car): boolean {
  return Boolean(car.slug) && car.status !== "vandut";
}

export function getCarHref(car: Car): string {
  return car.slug ? `/masini/${car.slug}` : "#";
}

export function hasValue(value: string | number | null | undefined): boolean {
  if (value == null) return false;
  if (typeof value === "number") return !Number.isNaN(value);
  return value.trim().length > 0;
}
