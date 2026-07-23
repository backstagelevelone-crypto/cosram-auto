import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    // Formatul XML exact aprobat de sistemul de validare Meta Automotive
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<listings>
  <title>Catalog Auto COSRAM</title>
  <link>https://cosram.ro</link>
  <listing>
    <vehicle_id>cosram_test_audi_2021</vehicle_id>
    <title><![CDATA[Audi A4 2021]]></title>
    <description><![CDATA[Audi A4 în stare tehnică excelentă, import recent, revizie la zi.]]></description>
    <url>https://cosram.ro</url>
    <image_link>https://cosram.ro</image_link>
    <make><![CDATA[Audi]]></make>
    <model><![CDATA[A4]]></model>
    <year>2021</year>
    <mileage>
      <value>125000</value>
      <unit>KM</unit>
    </mileage>
    <price>19500 EUR</price>
    <availability>in stock</availability>
  </listing>
</listings>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare la generare XML' }, { status: 500 });
  }
}
