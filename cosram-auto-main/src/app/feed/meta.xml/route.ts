import { masini } from "@/data/masini";

export async function GET() {
  const baseUrl = "https://cosram.ro";

  const masiniDisponibile = masini.filter(
    (masina) => masina.disponibil === "Disponibil"
  );

  // Funcție ajutătoare pentru a converti formatele de combustibil în valori acceptate de Meta
  const getFuelType = (fuel: string) => {
    const f = (fuel ?? "").toLowerCase();
    if (f.includes("diesel")) return "DIESEL";
    if (f.includes("benzina") || f.includes("gpl")) return "GASOLINE";
    return "OTHER";
  };

  // Funcție ajutătoare pentru a converti formatele de cutie în valori acceptate de Meta
  const getTransmission = (trans: string) => {
    const t = (trans ?? "").toLowerCase();
    if (t.includes("manual")) return "MANUAL";
    if (t.includes("automat")) return "AUTOMATIC";
    return "MANUAL";
  };

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<listings>
${masiniDisponibile
  .map((masina) => {
    // Ne asigurăm că URL-ul imaginii începe obligatoriu cu https://
    const rawImage = masina.galerie?.[0] ?? "";
    const imageLink = rawImage.startsWith("http") ? rawImage : `${baseUrl}${rawImage}`;

    const titluCurat = `${masina.marca ?? ""} ${masina.model ?? ""} ${masina.an ?? ""}`.trim();
    const descriereCurata = `${masina.marca ?? ""} ${masina.model ?? ""} - ${masina.combustibil ?? ""} - ${masina.cutieViteze ?? ""} - ${masina.kilometraj ?? 0} km`;

    return `  <listing>
    <vehicle_id>${masina._id}</vehicle_id>
    <title><![CDATA[${titluCurat}]]></title>
    <description><![CDATA[${descriereCurata}]]></description>
    <url>${baseUrl}/masini/${masina.slug}</url>
    <image_link>${imageLink}</image_link>
    <price>${masina.pret ?? ""} EUR</price>
    <make>${masina.marca ?? ""}</make>
    <model>${masina.model ?? ""}</model>
    <year>${masina.an ?? ""}</year>
    <mileage>
      <value>${masina.kilometraj ?? 0}</value>
      <unit>KM</unit>
    </mileage>
    <condition>USED</condition>
    <fuel_type>${getFuelType(masina.combustibil)}</fuel_type>
    <transmission>${getTransmission(masina.cutieViteze)}</transmission>
    <availability>AVAILABLE</availability>
  </listing>`;
  })
  .join("\n")}
</listings>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    },
  });
}
