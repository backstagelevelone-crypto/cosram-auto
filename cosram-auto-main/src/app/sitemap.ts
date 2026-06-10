import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.cosram.ro",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
