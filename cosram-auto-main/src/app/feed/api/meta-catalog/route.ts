import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Împiedică salvarea în cache pe Vercel

export async function GET() {
  try {
    // RECOMANDARE: După ce Meta validează structura, vom înlocui această mașină de test 
    // cu importul real din baza de date a site-ului tău.
    const masiniDinBazaDeDate = [
      {
        id: 'test_cosram_01',
        marca: 'Audi',
        model: 'A4',
        an: 2021,
        km: 120000,
        pret: '19500 EUR', 
        imagine: 'https://cosram.ro', 
        descriere: 'Audi A4 în stare tehnică excelentă, import recent.',
        slug: 'audi-a4-2021' 
      }
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<listings>
  <title>Catalog Auto COSRAM</title>
  <link>https://cosram.ro</link>
`;

    masiniDinBazaDeDate.forEach((car) => {
      xml += `  <vehicle>
    <vehicle_id>${car.id}</vehicle_id>
    <title><![CDATA[${car.marca} ${car.model} ${car.an}]]></title>
    <description><![CDATA[${car.descriere}]]></description>
    <url>https://cosram.ro{car.slug}</url>
    <image>
      <url>${car.imagine}</url>
    </image>
    <make><![CDATA[${car.marca}]]></make>
    <model><![CDATA[${car.model}]]></model>
    <year>${car.an}</year>
    <mileage>
      <value>${car.km}</value>
      <unit>KM</unit>
    </mileage>
    <price>${car.pret}</price>
    <availability>in stock</availability>
  </vehicle>\n`;
    });

    xml += `</listings>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare la generare catalog' }, { status: 500 });
  }
}
