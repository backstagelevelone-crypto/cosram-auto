import { masini } from "@/data/masini";
import { mapMasina, sortCars } from "@/lib/mapCar";
import type { Car } from "@/types/car";

export type { Car };

export function getListedCars(): Car[] {
  return sortCars(masini.map(mapMasina));
}

export function getCarBySlug(slug: string): Car | undefined {
  const doc = masini.find(
    (m) => (m.slug && m.slug === slug) || m._id === slug
  );
  if (!doc || doc.disponibil === "Vandut") return undefined;
  return mapMasina(doc);
}

export function getAllCarSlugs(): string[] {
  return masini
    .filter((m) => m.disponibil !== "Vandut")
    .map((m) => m.slug || m._id)
    .filter(Boolean);
}

export function getSimilarCars(car: Car, limit = 3): Car[] {
  const all = getListedCars();
  return all
    .filter(
      (item) =>
        item.id !== car.id &&
        item.status !== "vandut" &&
        (car.category && item.category
          ? item.category === car.category
          : true)
    )
    .slice(0, limit);
}
