import { NextResponse } from "next/server";

export async function GET() {

const csv = `id,title,description,vehicle_url,image_url,price,currency,make,model,year,mileage,state_of_vehicle,body_style,fuel_type,transmission,availability
0165820a-0ea1-4442-a4e8-483e6af91e17,Renault Megane 2012,Renault Megane Diesel Manuala,https://cosram.ro/masini/Renaultmegane2012,https://cosram.ro/images/masini/Renaultmegane2012/1.jpg,5499,RON,Renault,Megane,2012,268000,used,HATCHBACK,diesel,manual,available
0165820a-0ea1-4442-a4e8-483e6af91e21,Volkswagen Passat 2013,Volkswagen Passat Diesel Manuala,https://cosram.ro/masini/passatb72.0tdi2013,https://cosram.ro/images/masini/passatb72.0tdi2013/1.jpg,6999,RON,Volkswagen,Passat,2013,227000,used,SEDAN,diesel,manual,available
0165820a-0ea1-4442-a4e8-483e6af91ee7,Ford Focus 2012,Ford Focus Benzina Manuala,https://cosram.ro/masini/ford-focus-2012,https://cosram.ro/images/masini/ford-focus-2012/01.jpg,3999,RON,Ford,Focus,2012,210000,used,HATCHBACK,gasoline,manual,available
aeb998d7-52e9-411b-8472-44cc16d43fb3,Audi A4 2006,Audi A4 Diesel Manuala,https://cosram.ro/masini/Audi-A4-B7-Avant,https://cosram.ro/images/masini/audia4b7/a41.jpeg,4499,RON,Audi,A4,2006,180000,used,SEDAN,diesel,manual,available
d33fc642-c609-49b0-9714-7aa7010d0f66,Skoda Fabia 2009,Skoda Fabia Benzina Manuala,https://cosram.ro/masini/skoda-fabia-2009-portocaliu,https://cosram.ro/images/masini/skoda-fabia-2009-portocaliu/01.jpg,2999,RON,Skoda,Fabia,2009,210000,used,HATCHBACK,gasoline,manual,available
99a0dc79-e6ce-4fae-913c-06687b37bf65,BMW 520D 2006,BMW 520D Diesel Manuala,https://cosram.ro/masini/bmw-520d-2005,https://cosram.ro/images/masini/bmw-520d-2005/1.jpg,4999,RON,BMW,520D,2006,309000,used,SEDAN,diesel,manual,available
4ede9d12-f048-4919-8f46-2923f7abb083,Volkswagen Golf 5 2006,Volkswagen Golf Diesel Manuala,https://cosram.ro/masini/vw-golf-5-2006,https://cosram.ro/images/masini/vw-golf-5-2006/01.jpg,2999,RON,Volkswagen,Golf 5,2006,100000,used,HATCHBACK,diesel,manual,available`;

return new NextResponse(csv, {
    status: 200,
    headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=meta.csv",
        "Cache-Control": "no-cache, no-store, must-revalidate"
    }
});

}
