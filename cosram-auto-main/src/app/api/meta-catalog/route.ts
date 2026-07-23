import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    // Coloanele universale pe care validatorul de vehicule le aprobă direct
    const headers = [
      'vehicle_id',
      'title',
      'description',
      'url',
      'image_link',
      'make',
      'model',
      'year',
      'mileage_value',
      'mileage_unit',
      'price',
      'availability',
      'state_of_vehicle',
      'body_style',
      'dealer_id'
    ].join(',');

    // Datele reale ale mașinii Audi A4 de pe cosram.ro, aliniate la fix
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
      'active',
      'USED',
      'WAGON',
      'cosram_buzau' // ID de dealer ca să nu mai ceară adresa text rigidă din panou
    ].join(',');

    const csvContent = `${headers}\n${row}`;

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare la generare' }, { status: 500 });
  }
}
