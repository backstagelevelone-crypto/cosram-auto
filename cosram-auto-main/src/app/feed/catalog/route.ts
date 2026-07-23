export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const csv = `id,title,description,url,image_link,price,currency,make,model,year,mileage,condition,body_style,fuel_type,transmission,availability
0165820a-0ea1-4442-a4e8-483e6af91e17,Renault Megane 2012,Renault Megane Diesel Manuala,https://cosram.ro KM,USED,HATCHBACK,DIESEL,MANUAL,AVAILABLE
0165820a-0ea1-4442-a4e8-483e6af91e21,Volkswagen Passat 2013,Volkswagen Passat Diesel Manuala,https://cosram.ro KM,USED,SEDAN,DIESEL,MANUAL,AVAILABLE
0165820a-0ea1-4442-a4e8-483e6af91ee7,Ford Focus 2012,Ford Focus Benzina Manuala,https://cosram.ro KM,USED,HATCHBACK,GASOLINE,MANUAL,AVAILABLE
aeb998d7-52e9-411b-8472-44cc16d43fb3,Audi A4 2006,Audi A4 Diesel Manuala,https://cosram.ro KM,USED,SEDAN,DIESEL,MANUAL,AVAILABLE
d33fc642-c609-49b0-9714-7aa7010d0f66,Skoda Fabia 2009,Skoda Fabia Benzina Manuala,https://cosram.ro KM,USED,HATCHBACK,GASOLINE,MANUAL,AVAILABLE
99a0dc79-e6ce-4fae-913c-06687b37bf65,BMW 520D 2006,BMW 520D Diesel Manuala,https://cosram.ro KM,USED,SEDAN,DIESEL,MANUAL,AVAILABLE
4ede9d12-f048-4919-8f46-2923f7abb083,Volkswagen Golf 5 2006,Volkswagen Golf Diesel Manuala,https://cosram.ro 5,2006,100000 KM,USED,HATCHBACK,DIESEL,MANUAL,AVAILABLE
`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "inline; filename=catalog.csv",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    },
  });
}
