import { masini } from "@/data/masini";

export async function GET() {
  const baseUrl = "https://cosram.ro";

  const header =
    "vehicle_id,title,description,url,image,price,make,model,year,mileage,state_of_vehicle,body_style,address,city,country\n";

  const rows = masini
    .filter((m) => m.disponibil === "Disponibil")
    .map((m) => {
      const title = `${m.marca} ${m.model} ${m.an}`;

      const description =
        `${m.marca} ${m.model} ${m.combustibil} ${m.cutieViteze} ${m.kilometraj} km`;

      const image = `${baseUrl}${m.galerie?.[0]}`;

      const body =
        `${m.marca} ${m.model}`.toLowerCase().includes("passat") ||
        `${m.marca} ${m.model}`.toLowerCase().includes("a4") ||
        `${m.marca} ${m.model}`.toLowerCase().includes("520")
          ? "SEDAN"
          : "HATCHBACK";

      return [
        m._id,
        title,
        description,
        `${baseUrl}/masini/${m.slug}`,
        image,
        `${m.pret}.00 EUR`,
        m.marca,
        m.model,
        m.an,
        m.kilometraj ?? 0,
        "USED",
        body,
        "COSRAM AUTO",
        "Buzau",
        "RO",
      ]
        .map((x) => `"${String(x ?? "").replace(/"/g, '""')}"`)
        .join(",");
    })
    .join("\n");

  return new Response(header + rows, {
    headers: {
      "Content-Type": "text/csv",
    },
  });
}
