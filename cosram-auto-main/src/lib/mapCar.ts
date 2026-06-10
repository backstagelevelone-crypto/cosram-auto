import type { Car } from "@/types/car";
import type { Masina } from "@/data/masini";
import { buildCarName } from "@/lib/car-display";

function mapFuel(combustibil: Masina["combustibil"]): Car["fuel"] | undefined {
  if (!combustibil) return undefined;
  if (combustibil === "Hibrid") return "Hybrid";
  return combustibil;
}

function mapStatus(disponibil: Masina["disponibil"]): Car["status"] {
  switch (disponibil) {
    case "Disponibil":
      return "disponibil";
    case "Rezervat":
      return "rezervat";
    case "Vandut":
      return "vandut";
    default:
      return "disponibil";
  }
}

function mapImages(galerie: Masina["galerie"]): string[] {
  if (!galerie?.length) return [];
  return galerie.filter((path): path is string => Boolean(path?.trim()));
}

export function mapMasina(doc: Masina): Car {
  const images = mapImages(doc.galerie);
  const car: Car = {
    id: doc._id,
    slug: doc.slug || undefined,
    make: doc.marca || undefined,
    model: doc.model || undefined,
    year: doc.an ?? undefined,
    name: "",
    price: doc.pret ?? undefined,
    monthlyPrice: doc.rataLunara ?? undefined,
    fuel: mapFuel(doc.combustibil),
    transmission: doc.cutieViteze || undefined,
    km: doc.kilometraj ?? undefined,
    engine: doc.motor || undefined,
    power: doc.putere ?? undefined,
    color: doc.culoare || undefined,
    doors: doc.nrUsi ?? undefined,
    drive: doc.tractiune || undefined,
    itp: doc.inspectieTehnica || undefined,
    status: mapStatus(doc.disponibil),
    images,
    features: doc.dotari?.filter(Boolean) ?? [],
    description: doc.evaluareTehnica || undefined,
    category: doc.caroserie || undefined,
  };

  car.name = buildCarName(car);
  return car;
}

const STATUS_ORDER: Record<Car["status"], number> = {
  disponibil: 0,
  rezervat: 1,
  vandut: 2,
};

export function sortCars(cars: Car[]): Car[] {
  return [...cars].sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
  );
}
