import { masini } from "@/data/masini";

export async function GET() {
  const baseUrl = "https://cosram.ro";

  const masiniDisponibile = masini.filter(
    (masina) => masina.disponibil === "Disponibil"
  );

  const header =
    "id,title,description,url,image,price,brand,model,year,mileage,condition";

  const rows = masiniDisponibile.map((masina) => {
    const title =
      `${masina.marca ?? ""} ${masina.model ?? ""} ${masina.an ?? ""}`.trim();

    const description =
      `${masina.marca ?? ""} ${masina.model ?? ""} - ${masina.combustibil ?? ""} - ${masina.cutieViteze ?? ""} - ${masina.kilometraj ?? 0} km`;

    const image =
      `${baseUrl}${masina.galerie?.[0] ?? ""}`;

    return [
      masina._id,
      title,
      description,
      `${baseUrl}/masini/${masina.slug}`,
      image,
      `${masina.pret ?? ""} EUR`,
      masina.marca ?? "",
      masina.model ?? "",
      masina.an ?? "",
      masina.kilometraj ?? 0,
      "used",
    ]
      .map((value) =>
        `"${String(value).replace(/"/g, '""')}"`
      )
      .join(",");
  });

  const csv = [header, ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "inline; filename=meta.csv",
    },
  });
}
