import type { MetadataRoute } from "next";
import { getListedCars } from "@/lib/cars";

export default function sitemap(): MetadataRoute.Sitemap {
  const cars = getListedCars();

  return [
    {
      url: "https://www.cosram.ro",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    ...cars.map((car) => ({
      url: `https://www.cosram.ro/masini/${car.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];
}
