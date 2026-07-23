import { masini } from "@/data/masini";

export async function GET() {
  const baseUrl = "https://cosram.ro";

  const masiniDisponibile = masini.filter(
    (masina) => masina.disponibil === "Disponibil"
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">

<channel>

<title>COSRAM AUTO - Vehicule</title>
<link>${baseUrl}</link>
<description>Vehicule second hand COSRAM AUTO</description>

${masiniDisponibile
  .map(
    (masina) => `
<item>

<id>${masina._id}</id>

<title><![CDATA[
${`${masina.marca ?? ""} ${masina.model ?? ""} ${masina.an ?? ""}`.trim()}
]]></title>

<description><![CDATA[
${`${masina.marca ?? ""} ${masina.model ?? ""} - ${masina.combustibil ?? ""} - ${masina.cutieViteze ?? ""} - ${masina.kilometraj ?? ""} km`}
]]></description>

<link>
${baseUrl}/masini/${masina.slug}
</link>

<image_link>
${baseUrl}${masina.galerie?.[0] ?? ""}
</image_link>

<price>
${masina.pret ?? ""} EUR
</price>

<brand>
${masina.marca ?? ""}
</brand>

<model>
${masina.model ?? ""}
</model>

<year>
${masina.an ?? ""}
</year>

<mileage>
${masina.kilometraj ?? "0"}
</mileage>

<fuel_type>
${masina.combustibil ?? ""}
</fuel_type>

<transmission>
${masina.cutieViteze ?? ""}
</transmission>

<condition>
used
</condition>

<availability>
in stock
</availability>

</item>
`
  )
  .join("")}

</channel>

</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
