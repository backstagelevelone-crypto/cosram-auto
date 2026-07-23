import { NextResponse } from "next/server";
import { masini } from "@/data/masini";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  if (status === "Disponibil") {
    return "AVAILABLE";
  }

  return "UNAVAILABLE";
}

function getBodyStyle(caroserie?: string) {
  switch (caroserie) {
    case "SUV":
      return "SUV";

    case "Sedan":
      return "SEDAN";

    case "Hatchback":
      return "HATCHBACK";

    case "Break":
    case "Combi":
    case "Touring":
      return "WAGON";

    default:
      return "";
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
      // ID unic vehicul
      masina._id,

      // Titlu
      `${masina.marca ?? ""} ${masina.model ?? ""}`.trim(),

      // Descriere
      masina.evaluareTehnica ??
        `${masina.marca ?? ""} ${masina.model ?? ""} ${masina.an ?? ""}`,

      // URL masina
      `${SITE_URL}/masini/${masina.slug}`,

      // Imagine principala
      getImage(masina.galerie),

      // Adresa dealer
      DEALER_ADDRESS,

      // Marca
      masina.marca?.trim() ?? "",

      // Model
      masina.model ?? "",

      // An
      masina.an ?? "",

      // Kilometraj
      masina.kilometraj
        ? `${masina.kilometraj} KM`
        : "",

      // Pret
      masina.pret
        ? `${masina.pret} EUR`
        : "",

      // Disponibilitate
      getAvailability(masina.disponibil),

      // Toate sunt second hand
      "USED",

      // Caroserie compatibila Meta
      getBodyStyle(masina.caroserie),

      // Dealer ID
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
      "Content-Type": "text/csv; charset=utf-8",

      "Content-Disposition":
        'inline; filename="cosram-vehicles-feed.csv"',

      "Cache-Control":
        "no-store",
    },
  });
}
