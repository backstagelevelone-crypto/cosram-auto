import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Catalog Auto COSRAM</title>
    <link>https://cosram.ro</link>
    <description>Stoc masini rulate Cosram Auto</description>
    <item>
      <vehicle_id>cosram_audi_a4_2006</vehicle_id>
      <id>cosram_audi_a4_2006</id>
      <title><![CDATA[Audi A4 2006]]></title>
      <description><![CDATA[Audi A4 2.0 Diesel din 2006 disponibil la parcul auto COSRAM Auto Buzău.]]></description>
      <link>https://cosram.ro</link>
      <image_link>https://cosram.ro</image_link>
      <brand><![CDATA[Audi]]></brand>
      <make><![CDATA[Audi]]></make>
      <model><![CDATA[A4]]></model>
      <year>2006</year>
      <mileage>
        <value>250000</value>
        <unit>KM</unit>
      </mileage>
      <price>4499 EUR</price>
      <availability>in stock</availability>
      <condition>used</condition>
      <state_of_vehicle>Used</state_of_vehicle>
      <body_style>WAGON</body_style>
    </item>
  </channel>
</rss>`;

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
