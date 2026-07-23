import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    // 1. Definim antetul tabelului (header-ul) cu parametrii stricți ceruți de Meta Auto
    const headers = [
      'vehicle_id',
      'title',
      'description',
      'url',
      'image[0].url',
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

    // 2. Adăugăm rândul cu datele reale ale mașinii Audi A4 de pe cosram.ro
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
      'for_sale',
      'USED',
      'WAGON',
      '"Strada Toamnei 36"',
      '"Bragareasa"',
      '"Buzau"',
      '"Romania"'
    ].join(',');

    // Unim capul de tabel cu datele
    const csvContent = `${headers}\n${row}`;

    // Returnăm tabelul CSV direct către Meta
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
