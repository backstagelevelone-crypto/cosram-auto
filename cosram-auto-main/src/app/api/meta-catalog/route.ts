import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    // 1. Spargem adresa în coloane separate cerute de sistemul lor și punem statusul exact
    const headers = [
      'vehicle_id',
      'title',
      'description',
      'url',
      'image.url',
      'make',
      'model',
      'year',
      'mileage.value',
      'mileage.unit',
      'price',
      'availability',
      'state_of_vehicle',
      'body_style',
      'street_address',
      'city',
      'region',
      'country'
    ].join(',');

    // 2. Datele aliniate perfect la capul de tabel
    const row = [
      'cosram_audi_a4_2006',
      '"Audi A4 2006"',
      '"Audi A4 2.0 Diesel din 2006 disponibil la parcul auto COSRAM Auto Buzău."',
      'https://cosram.ro',
      'https://cosram.ro',
      '"Audi"',
      '"A4"',
      '2006',
      '250000',
      'KM',
      '4499 EUR',
      'AVAILABLE',        // Asta este singura valoare acceptată din documentație!
      'USED',
      'WAGON',
      '"Strada Toamnei nr. 36"',
      '"Bragareasa"',
      '"Buzau"',
      '"Romania"'
    ].join(',');

    const csvContent = `${headers}\n${row}`;

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare la generare CSV' }, { status: 500 });
  }
}
