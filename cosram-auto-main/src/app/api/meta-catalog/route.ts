import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    // Structura XML oficială și aprobată nativ de Meta pentru cataloagele de mașini
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<listings>
  <title>Catalog Auto COSRAM</title>
  <link>https://cosram.ro</link>
  <listing>
    <vehicle_id>cosram_audi_a4_2006</vehicle_id>
    <title><![CDATA[Audi A4 2006]]></title>
    <description><![CDATA[Audi A4 2.0 Diesel din 2006 disponibil la parcul auto COSRAM Auto Buzău.]]></description>
    <url>https://cosram.ro</url>
    <image>
      <url>https://cosram.ro</url>
    </image>
    <make><![CDATA[Audi]]></make>
    <model><![CDATA[A4]]></model>
    <year>2006</year>
    <mileage>
      <value>250000</value>
      <unit>KM</unit>
    </mileage>
    <price>4499 EUR</price>
    <availability>for_sale</availability>
    <state_of_vehicle>Used</state_of_vehicle>
    <body_style>WAGON</body_style>
    <address format="simple">
      <street_address><![CDATA[Strada Toamnei 36]]></street_address>
      <city><![CDATA[Bragareasa]]></city>
      <region><![CDATA[Buzau]]></region>
      <country><![CDATA[Romania]]></country>
    </address>
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
