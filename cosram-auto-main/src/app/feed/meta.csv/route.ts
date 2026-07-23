import { masini } from "@/data/masini";

export async function GET() {
  const baseUrl = "https://cosram.ro";

  const masiniDisponibile = masini.filter(
    (masina) => masina.disponibil === "Disponibil"
  );

  const header =
    "vehicle_id,title,description,url,image,price,make,model,year,mileage,state_of_vehicle,body_style\n";

  const rows = masiniDisponibile
    .map((masina) => {
      const title = `${masina.marca ?? ""} ${
        masina.model ?? ""
      } ${masina.an ?? ""}`.trim();

      const description = `${masina.marca ?? ""} ${
        masina.model ?? ""
      } - ${masina.combustibil ?? ""} - ${
        masina.cutieViteze ?? ""
      } - ${masina.kilometraj ?? 0} km`;

      const url = `${baseUrl}/masini/${masina.slug}`;

      const image = masina.galerie?.[0]
        ? `${baseUrl}${masina.galerie[0]}`
        : "";

      const price = `${masina.pret ?? 0} EUR`;

      const make = masina.marca ?? "";
      const model = masina.model ?? "";
      const year = masina.an ?? "";
      const mileage = masina.kilometraj ?? 0;

      let bodyStyle = "HATCHBACK";

      const masinaText = `${make} ${model}`.toLowerCase();

      if (
        masinaText.includes("a4") ||
        masinaText.includes("passat") ||
        masinaText.includes("520")
      ) {
        bodyStyle = "SEDAN";
      }

      return [
        masina._id,
        title,
        description,
        url,
        image,
        price,
        make,
        model,
        year,
        mileage,
        "USED",
        bodyStyle,
      ]
        .map((x) => `"${String(x).replace(/"/g, '""')}"`)
        .join(",");
    })
    .join("\n");

  const csv = header + rows;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
    },
  });
}
