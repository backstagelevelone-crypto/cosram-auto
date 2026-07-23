import { masini } from "@/data/masini";

export async function GET() {
  const baseUrl = "https://cosram.ro";

  const masiniDisponibile = masini.filter(
    (masina) => masina.disponibil === "Disponibil"
  );

  const header =
    "vehicle_id,title,description,url,image,price,make,model,year,mileage,state_of_vehicle,body_style,address,city,state,country,latitude,longitude\n";

  const rows = masiniDisponibile
    .map((masina) => {
      const title = `${masina.marca ?? ""} ${
        masina.model ?? ""
      } ${masina.an ?? ""}`.trim();

      const description =
        `${masina.marca ?? ""} ${masina.model ?? ""} - ` +
        `${masina.combustibil ?? ""} - ` +
        `${masina.cutieViteze ?? ""} - ` +
        `${masina.kilometraj ?? 0} km`;

      const url = `${baseUrl}/masini/${masina.slug}`;

      const image =
        masina.galerie && masina.galerie.length > 0
          ? `${baseUrl}${masina.galerie[0]}`
          : `${baseUrl}/images/logo.png`;

      let bodyStyle = "HATCHBACK";

      const masinaText =
        `${masina.marca ?? ""} ${masina.model ?? ""}`.toLowerCase();

      if (
        masinaText.includes("a4") ||
        masinaText.includes("passat") ||
        masinaText.includes("520")
      ) {
        bodyStyle = "SEDAN";
      }

      const data = [
        masina._id, // vehicle_id
        title,
        description,
        url,
        image,
        `${masina.pret ?? 0} EUR`,
        masina.marca ?? "",
        masina.model ?? "",
        masina.an ?? "",
        masina.kilometraj ?? 0,
        "USED",
        bodyStyle,

        // Dealer address
        "COSRAM AUTO",
        "Buzau",
        "Buzau",
        "RO",

        // Coordonate Buzau
        "45.1500",
        "26.8200",
      ];

      return data
        .map((valoare) =>
          `"${String(valoare).replace(/"/g, '""')}"`
        )
        .join(",");
    })
    .join("\n");

  const csv = header + rows;

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
