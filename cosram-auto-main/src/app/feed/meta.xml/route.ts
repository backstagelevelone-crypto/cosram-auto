import { masini } from "@/data/masini";

export async function GET() {
  const baseUrl = "https://cosram.ro";

  const masiniDisponibile = masini.filter(
    (masina) => masina.disponibil === "Disponibil"
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">

<channel>

<title>COSRAM AUTO - Vehicule</title>
<link>${baseUrl}</link>
<description>Vehicule second hand COSRAM AUTO</description>

${masiniDisponibile.map((masina) => `

<item>

<g:id>${masina._id}</g:id>

<g:title>
${`${masina.marca ?? ""} ${masina.model ?? ""} ${masina.an ?? ""}`.trim()}
</g:title>

<g:description>
${`${masina.marca ?? ""} ${masina.model ?? ""} - ${masina.combustibil ?? ""} - ${masina.cutieViteze ?? ""} - ${masina.kilometraj ?? ""} km`}
</g:description>

<g:link>${baseUrl}/masini/${masina.slug}</g:link>

<g:image_link>
${baseUrl}${masina.galerie?.[0] ?? ""}
</g:image_link>

<g:price>${masina.pret ?? ""} EUR</g:price>

<g:brand>${masina.marca ?? ""}</g:brand>

<g:model>${masina.model ?? ""}</g:model>

<g:year>${masina.an ?? ""}</g:year>

<g:mileage>
${masina.kilometraj ?? ""}
</g:mileage>

<g:fuel_type>
${masina.combustibil ?? ""}
</g:fuel_type>

<g:transmission>
${masina.cutieViteze ?? ""}
</g:transmission>

<g:condition>used</g:condition>

<g:availability>in stock</g:availability>

</item>

`).join("")}

</channel>

</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
