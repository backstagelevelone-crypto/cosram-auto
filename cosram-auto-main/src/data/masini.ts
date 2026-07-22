import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CarDetailView from "@/components/pages/CarDetailView";
import { getCarBySlug, getSimilarCars } from "@/lib/cars"; // Ajustează importurile dacă diferă

type PageProps = {
  params: Promise<{ slug: string }>;
};

// ... păstrează funcțiile generateStaticParams și generateMetadata exact așa cum le ai deja ...

export default async function MasinaPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) notFound();

  const similar = await getSimilarCars(car);

  // Extrege datele pentru tracking pe baza interfeței tale Masina
  const trackingId = car.slug || slug; 
  const trackingPrice = car.pret || 0;

  return (
    <>
      <Navbar />
      <main>
        <CarDetailView car={car} similarCars={similar} />
        
        {/* Injectare script Meta Pixel pentru evenimentul ViewContent (Catalog Ads) */}
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
