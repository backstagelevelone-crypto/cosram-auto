import { NextResponse } from "next/server";

// Înlocuiește cu sursa ta de date
async function getVehicles() {
  return [
    {
      id: "12345",
      title: "BMW X5 xDrive30d",
      description: "BMW X5 xDrive30d, istoric complet, stare excelentă.",
      slug: "bmw-x5-xdrive30d-12345",
      image: "https://example.com/images/bmw-x5.jpg",
      make: "BMW",
      model: "X5",
      year: 2021,
      mileage: 54000,
      price: 46990,
      availability: "in stock",
      condition: "used",
      bodyStyle: "SUV",
      dealerId: "dealer_001",
    },
  ];
}

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";

  const str = String(value);

  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}

export async function GET() {
  const vehicles = await getVehicles();

  const headers = [
    "vehicle_id",
    "title",
    "description",
    "url",
    "image_link",
    "make",
    "model",
    "year",
    "mileage_value",
    "mileage_unit",
    "price",
    "availability",
    "state_of_vehicle",
    "body_style",
    "dealer_id",
  ];

  const rows = vehicles.map((vehicle) => [
    vehicle.id,
    vehicle.title,
    vehicle.description,
    `https://example.com/masina/${vehicle.slug}`,
    vehicle.image,
    vehicle.make,
    vehicle.model,
    vehicle.year,
    vehicle.mileage,
    "KM", // Meta acceptă KM sau MI
    `${vehicle.price} RON`,
    vehicle.availability, // "in stock"
    vehicle.condition, // "used", "new", "cpo"
    vehicle.bodyStyle, // SUV, Sedan, Hatchback etc.
    vehicle.dealerId,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="meta-vehicles-feed.csv"',
      "Cache-Control": "public, max-age=300",
    },
  });
}
