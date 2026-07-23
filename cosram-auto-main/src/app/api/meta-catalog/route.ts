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


function getAvailability() {
  return "AVAILABLE";
}


function getFuelType(fuel?: string) {
  switch (fuel) {
    case "Benzina":
      return "GASOLINE";

    case "Diesel":
      return "DIESEL";

    case "Electric":
      return "ELECTRIC";

    case "Hibrid":
      return "HYBRID";

    default:
      return "";
  }
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


function getEngineSize(engine?: string) {
  if (!engine) return "";

  const match = engine
    .replace(",", ".")
    .match(/\d+(\.\d+)?/);

  return match ? match[0] : "";
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
    "address.region",
    "address.country",

    "transmission",

    "body_style",

    "fuel_type",

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


  const rows = masini

    // scoatem mașinile vândute din feed
    .filter(
      (masina) =>
        masina.disponibil !== "Vandut"
    )


    .map((masina) => {

      return [

        // ID unic
        masina._id,


        // Titlu
        `${masina.marca ?? ""} ${masina.model ?? ""}`
          .trim(),


        // Descriere
        masina.evaluareTehnica ??
          `${masina.marca ?? ""} ${masina.model ?? ""}`,


        // Meta availability
        getAvailability(),


        // Meta condition
        "USED_VEHICLE",


        // Preț
        masina.pret
          ? `${masina.pret} EUR`
          : "",


        // Imagine
        getImage(masina.galerie),


        // URL
        `${SITE_URL}/masini/${masina.slug}`,


        // Adresă
        "Str. Toamnei 36",

        "Buzău",

        "Buzău",

        "RO",


        // Cutie
        masina.cutieViteze === "Automata"
          ? "AUTOMATIC"
          : "MANUAL",


        // Caroserie
        getBodyStyle(masina.caroserie),


        // Combustibil
        getFuelType(masina.combustibil),


        // Marca
        masina.marca?.trim() ?? "",


        // Model
        masina.model ?? "",


        // An
        masina.an ?? "",


        // Stare
        "USED",


        // Dealer
        "cosram",

        "COSRAM",


        // Kilometri
        "KM",

        masina.kilometraj ?? 1,


        // Motor numeric
        getEngineSize(masina.motor),


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
