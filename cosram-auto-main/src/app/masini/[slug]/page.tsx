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

  const title = buildCarTitle(car);
  const pricePart =
    car.price != null ? `${formatPrice(car.price)} — ` : "";
  const yearPart = car.year != null ? ` ${car.year}` : "";
  const kmPart =
    car.km != null ? `${formatLocaleNumber(car.km)} km` : null;
  const metaParts = [
    buildCarName(car),
    kmPart,
    car.fuel,
    car.transmission,
    car.description,
  ].filter(Boolean);

  return {
    title: `${buildCarName(car)} ${car.year ?? ""} | Mașină în rate | Cosram Auto Buzău`,
    description: `${buildCarName(car)} disponibil la Cosram Auto Buzău. Finanțare rapidă, garanție 12 luni și livrare la domiciliu în toată România.`,
  };
}

export default async function MasinaPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) notFound();

  const similar = await getSimilarCars(car);

  return (
    <>
      <Navbar />
      <main>
        <CarDetailView car={car} similarCars={similar} />
      </main>
      <Footer />
    </>
  );
}
