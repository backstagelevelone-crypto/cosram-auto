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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // Căutăm mașina încercând și varianta cu litere mici
  const car = await getCarBySlug(slug) || await getCarBySlug(slug.toLowerCase());

  if (!car) {
    return { title: "Mașină negăsită | Cosram Auto" };
  }

  const carData = car as any;
  const anulMasinii = carData.an || carData.year || "";

  return {
    title: `${buildCarName(car)} ${anulMasinii} | Mașină în rate | Cosram Auto Buzău`,
    description: `${buildCarName(car)} disponibil la Cosram Auto Buzău. Finanțare rapidă, garanție 12 luni și livrare la domiciliu în toată România.`,
  };
}

export default async function MasinaPage({ params }: PageProps) {
  const { slug } = await params;
  // Căutăm mașina în ambele variante de scriere pentru siguranță
  const car = await getCarBySlug(slug) || await getCarBySlug(slug.toLowerCase());

  if (!car) notFound();

  const similar = await getSimilarCars(car);
  const carData = car as any;

  // Trimitem ID-ul în formatul exact pe care îl folosește Catalogul Meta Ads
  const trackingId = carData.slug || slug;
  const trackingPrice = carData.pret || carData.price || 0;

  return (
    <>
      <Navbar />
      <main>
        <CarDetailView car={car} similarCars={similar} />
        
        {/* Script Meta Pixel securizat pentru litere mari/mici */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && typeof fbq === 'function') {
                fbq('track', 'ViewContent', {
                  content_ids: ['${trackingId}'],
                  content_type: 'product',
                  value: ${trackingPrice},
                  currency: 'EUR'
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
