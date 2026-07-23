import { NextResponse } from "next/server";
import { masini } from "@/data/masini";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = "https://www.cosram.ro";

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
  return status === "Disponibil"
    ? "AVAILABLE"
    : "UNAVAILABLE";
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

    "availability",
    "condition",

    "price",

    "image[0].url",

    "url",

    "address.addr1",
    "address.city",
    "address.country",

    "transmission",
    "body_style",
    "fuel_type",
    "vehicle_type",

    "make",
    "model",
    "year",

    "state_of_vehicle",

    "dealer_id",
    "dealer_name",

    "mileage.unit",
    "mileage.value",

    "engine_size",
    "horse_power",
  ];


  const rows = masini.map((masina) => {

    return [

      // ID unic
      masina._id,


      // Titlu
      `${masina.marca ?? ""} ${masina.model ?? ""}`.trim(),


      // Descriere
      masina.evaluareTehnica ??
        `${masina.marca ?? ""} ${masina.model ?? ""}`,


      // Disponibilitate Meta
      getAvailability(masina.disponibil),


      // Conditie
      "USED",


      // Pret ISO currency
      masina.pret
        ? `${masina.pret} EUR`
        : "",


      // Imagine principala
      getImage(masina.galerie),


      // URL masina
      `${SITE_URL}/masini/${masina.slug}`,


      // Adresa dealer
      "Str. Toamnei 36",

      "Buzău",

      "RO",


      // Cutie viteze
      masina.cutieViteze === "Automata"
        ? "AUTOMATIC"
        : "MANUAL",


      // Caroserie Meta
      getBodyStyle(masina.caroserie),


      // Combustibil
      masina.combustibil
        ? masina.combustibil.toUpperCase()
        : "",


      // Tip vehicul
      "CAR",


      // Marca
      masina.marca?.trim() ?? "",


      // Model
      masina.model ?? "",


      // An
      masina.an ?? "",


      // Stare vehicul
      "USED",


      // Dealer ID
      "cosram",


      // Dealer name
      "COSRAM",


      // Kilometri
      "KM",

      masina.kilometraj ?? "",


      // Motor
      masina.motor ?? "",


      // Cai putere
      masina.putere ?? "",
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
        'inline; filename="cosram-meta-vehicles.csv"',


      "Cache-Control":
        "no-store",
    },

  });
}
