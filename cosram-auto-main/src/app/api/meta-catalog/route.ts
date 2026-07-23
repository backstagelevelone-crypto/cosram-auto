import { NextResponse } from 'next/server';

// Îi spune platformei Vercel să genereze XML-ul live la fiecare accesare, fără cache
export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    // ⚠️ NOTĂ: Aceasta este o listă cu o mașină de test pentru ca Meta să îți aprobe structura.
    // După ce Meta validează link-ul, vom înlocui această listă cu apelul tău real către baza de date.
    const masiniDinBazaDeDate = [
      {
        id: 'cosram_audi_a4_01', // ID unic
        marca: 'Audi',
        model: 'A4',
        an: 2021,
        km: 125000,
        pret: '19500 EUR', // Prețul trebuie să conțină neapărat valoarea și moneda
        imagine: 'https://cosram.ro', // URL complet către imagine, nu cale relativă
        descriere: 'Audi A4 în stare tehnică excelentă, import recent, revizie la zi.',
        slug: 'audi-a4-2021' // Slug-ul folosit pentru link-ul mașinii pe site
      }
    ];

    // Începutul structurii XML obligatorii pentru Meta Automotive Catalog
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<listings>
  <title>Catalog Auto COSRAM</title>
  <link>https://cosram.ro</link>
`;

    // Maparea fiecărei mașini în formatul standard Meta Vehicles
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

    // Returnarea feed-ului XML cu header-ele corecte de conținut și protecție cache
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare la generarea catalogului COSRAM' }, { status: 500 });
  }
}
