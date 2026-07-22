import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CarDetailView from "@/components/pages/CarDetailView";
import {
  buildCarName,
  buildCarTitle,
  formatLocaleNumber,
  formatPrice,
} from "@/lib/car-display";
import {
  getAllCarSlugs,
  getCarBySlug,
  getSimilarCars,
} from "@/lib/cars";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCarSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return { title: "Mașină negăsită | Cosram Auto" };
  }

  return {
    title: `${buildCarName(car)} ${car.an ?? ""} | Mașină în rate | Cosram Auto Buzău`,
    description: `${buildCarName(car)} disponibil la Cosram Auto Buzău. Finanțare rapidă, garanție 12 luni și livrare la domiciliu în toată România.`,
  };
}

export default async function MasinaPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) notFound();

  const similar = await getSimilarCars(car);

  // Folosește direct parametrul "slug" din URL (ex: 'Renaultmegane2012')
  // Se va potrivi 100% cu ID-ul pe care l-ai setat în Catalogul Meta Ads
  const trackingId = slug;
  const trackingPrice = car.pret || 0;

  return (
    <>
      <Navbar />
      <main>
        <CarDetailView car={car} similarCars={similar} />
        
        {/* Script Meta Pixel fixat pentru corelarea corectă a catalogului */}
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
