import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    // 1. Antetul tabelului CSV cu denumirile stricte și corecte cerute de Meta Automotive
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
      'address'
    ].join(',');

    // 2. Datele reale ale mașinii Audi A4 de pe cosram.ro, aliniate la coloane
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
      'active',             // Schimbat din for_sale în active (valoarea corectă în CSV)
      'USED',
      'WAGON',
      '"Strada Toamnei nr. 36, Scutelnici, Bragareasa, jud. Buzau"' // Adresa directă, completă într-o singură coloană
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
