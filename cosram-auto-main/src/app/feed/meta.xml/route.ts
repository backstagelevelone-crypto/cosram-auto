import { masini } from "@/data/masini";

export async function GET() {
  const baseUrl = "https://cosram.ro";

  const masiniDisponibile = masini.filter(
    (masina) => masina.disponibil === "Disponibil"
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<vehicles>
${masiniDisponibile
  .map(
    (masina) => `
  <vehicle>
    <id>${masina._id}</id>

    <title>
      ${masina.marca ?? ""} ${masina.model ?? ""} ${masina.an ?? ""}
    </title>

    <price>${masina.pret ?? ""} EUR</price>

    <image_link>
      ${baseUrl}${masina.galerie?.[0] ?? ""}
    </image_link>

    <url>
      ${baseUrl}/masini/${masina.slug}
    </url>

  </vehicle>
`
  )
  .join("")}
</vehicles>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
