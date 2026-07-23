import { NextResponse } from "next/server";
import { masini } from "@/data/masini";

const SITE_URL = "https://www.cosram.ro";

const DEALER_ADDRESS =
  "Brăgăreasa, Str. Toamnei 36, Buzău, România";

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";

  const text = String(value);

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\n")
  ) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function getAvailability(status?: string) {
  switch (status) {
    case "Disponibil":
      return "available";

    case "Vandut":
      return "sold";

    case "Rezervat":
      return "sold";

    default:
      return "available";
  }
}

function getImage(galerie?: string[]) {
  if (!galerie || galerie.length === 0) {
    return "";
  }

  return `${SITE_URL}${galerie[0]}`;
}

export async function GET() {
  const headers = [
    "vehicle_id",
    "title",
    "description",
    "url",
    "image",
    "address",
    "make",
    "model",
    "year",
    "mileage",
    "price",
    "availability",
    "state_of_vehicle",
    "body_style",
    "dealer_id",
  ];

  const rows = masini.map((masina) => {
    return [
      masina._id,

      `${masina.marca ?? ""} ${masina.model ?? ""}`.trim(),

      masina.evaluareTehnica ??
        `${masina.marca ?? ""} ${masina.model ?? ""} - ${masina.an ?? ""}`,

      `${SITE_URL}/masini/${masina.slug}`,

      getImage(masina.galerie),

      DEALER_ADDRESS,

      masina.marca?.trim() ?? "",

      masina.model ?? "",

      masina.an ?? "",

      masina.kilometraj
        ? `${masina.kilometraj} KM`
        : "0 KM",

      masina.pret
        ? `${masina.pret} EUR`
        : "",

      getAvailability(masina.disponibil),

      "used",

      masina.caroserie ?? "",

      "cosram",
    ];
  });

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row.map(escapeCsv).join(",")
    ),
  ].join("\n");


  return new NextResponse(csv, {
    headers: {
      "Content-Type":
        "text/csv; charset=utf-8",

      "Content-Disposition":
        'inline; filename="meta-vehicles-feed.csv"',

      "Cache-Control":
        "public, max-age=300",
    },
  });
}
