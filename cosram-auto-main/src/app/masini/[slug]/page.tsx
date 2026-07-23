import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CarDetailView from "@/components/pages/CarDetailView";

import { buildCarName } from "@/lib/car-display";
import { getCarBySlug, getSimilarCars } from "@/lib/cars";


type PageProps = {
  params: Promise<{ slug: string }>;
};


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  const { slug } = await params;

  const car =
    await getCarBySlug(slug) ||
    await getCarBySlug(slug.toLowerCase());


  if (!car) {
    return {
      title: "Mașină negăsită | Cosram Auto",
    };
  }


  const carData = car as any;

  const anulMasinii =
    carData.an ||
    carData.year ||
    "";


  return {
    title:
      `${buildCarName(car)} ${anulMasinii} | Mașină în rate | Cosram Auto Buzău`,

    description:
      `${buildCarName(car)} disponibil la Cosram Auto Buzău. Finanțare rapidă, garanție 12 luni și livrare la domiciliu în toată România.`,
  };
}



export default async function MasinaPage({
  params,
}: PageProps) {


  const { slug } = await params;


  const car =
    await getCarBySlug(slug) ||
    await getCarBySlug(slug.toLowerCase());


  if (!car) notFound();



  const similarRaw = await getSimilarCars(car);



  const carData = car as any;



  const carForView = {

    id:
      carData._id ||
      carData.id ||
      slug,


    slug:
      carData.slug,


    name:
      `${carData.marca || carData.make || ""} ${carData.model || ""}`.trim(),


    make:
      carData.marca || carData.make,


    model:
      carData.model,


    year:
      carData.an || carData.year,


    price:
      carData.pret ?? carData.price,


    monthlyPrice:
      carData.rataLunara ?? carData.monthlyPrice,


    fuel:
      carData.combustibil || carData.fuel,


    transmission:
      carData.cutieViteze || carData.transmission,


    km:
      carData.kilometraj ?? carData.km,


    engine:
      carData.motor || carData.engine,


    power:
      carData.putere ?? carData.power,


    color:
      carData.culoare || carData.color,


    doors:
      carData.nrUsi ?? carData.doors,


    drive:
      carData.tractiune || carData.drive,


    itp:
      carData.inspectieTehnica || carData.itp,


    status:

      carData.disponibil === "Disponibil"
        ? "disponibil"
        :
      carData.disponibil === "Rezervat"
        ? "rezervat"
        :
        "vandut",


    images:
      carData.galerie || carData.images || [],


    features:
      carData.dotari || carData.features || [],


    description:
      carData.evaluareTehnica || carData.description,


    category:
      carData.caroserie || carData.category,

  };



  const trackingId =
    carData.slug || slug;


  const trackingPrice =
    carData.pret ||
    carData.price ||
    0;



  return (

    <>

      <Navbar />


      <main>


        <CarDetailView

          car={carForView}

          similarCars={similarRaw.map((item:any)=>({

            id:
              item._id || item.id,


            slug:
              item.slug,


            name:
              `${item.marca || ""} ${item.model || ""}`.trim(),


            make:
              item.marca,


            model:
              item.model,


            year:
              item.an,


            price:
              item.pret,


            images:
              item.galerie || [],


            features:
              item.dotari || [],


            status:
              item.disponibil === "Disponibil"
                ? "disponibil"
                :
              item.disponibil === "Rezervat"
                ? "rezervat"
                :
                "vandut",

          }))}

        />



        <script

          dangerouslySetInnerHTML={{

            __html: `

              if (
                typeof window !== 'undefined' &&
                typeof fbq === 'function'
              ) {

                fbq('track','ViewContent',{

                  content_ids:['${trackingId}'],

                  content_type:'product',

                  value:${trackingPrice},

                  currency:'EUR'

                });

              }

            `,

          }}

        />


      </main>


      <Footer />


    </>

  );

}
