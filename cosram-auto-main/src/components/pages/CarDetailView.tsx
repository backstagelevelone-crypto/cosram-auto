"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, whatsappCarLink } from "@/lib/constants";
import { normalizeCarImages } from "@/lib/car-images";
import {
  buildCarName,
  buildCarTitle,
  formatPrice,
} from "@/lib/car-display";
import type { Car } from "@/types/car";
import CarGallery from "@/components/ui/CarGallery";

function PricePanel({ car, className }: { car: Car; className?: string }) {
  const displayName = buildCarName(car);

  // Trimite evenimentul de contact către Facebook doar pentru acțiuni reale de contact
  const trackContactClick = (tipContact: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Contact", {
        content_name: displayName,
        content_category: car.category,
        value: car.price ?? 0,
        currency: "EUR",
        contact_type: tipContact,
      });
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <p className="font-[family-name:var(--font-outfit)] text-xs font-medium uppercase tracking-wide text-[#6B6B6B]">
        Preț
      </p>

      <p className="mt-1 font-[family-name:var(--font-syne)] text-4xl font-bold text-[#C8102E]">
        {car.price != null ? formatPrice(car.price, { spaced: true }) : "-"}
      </p>

      <p className="mt-3 font-[family-name:var(--font-outfit)] text-sm text-[#6B6B6B]">
        {car.monthlyPrice != null ? (
          <>
            Rată de la{" "}
            <span className="font-semibold text-[#111111]">
              {car.monthlyPrice}€/lună
            </span>
          </>
        ) : (
          "Contactează-ne pentru o ofertă de finanțare"
        )}
      </p>

      <div className="mt-6 space-y-3">

        {/* WhatsApp - rămâne Contact */}
        <a
          href={whatsappCarLink(car)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick("WhatsApp")}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition-all hover:bg-[#A50E26] hover:shadow-[0_8px_24px_rgba(200,16,46,0.35)]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Cere detalii pe WhatsApp
        </a>

        {/* Telefon - rămâne Contact */}
        <a
          href={`tel:${SITE.phoneRaw}`}
          onClick={() => trackContactClick("Telefon")}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#111111] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Sună acum
        </a>

        {/* RATE - fără eveniment Contact */}
        <Link
          href="/#rate"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F2F2F7] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#111111] transition-colors hover:bg-[#E8E8ED]"
        >
          RATE
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </Link>

        {/* Email - rămâne Contact */}
        <a
          href={`mailto:${SITE.email}?subject=Interesat de ${encodeURIComponent(displayName)}`}
          onClick={() => trackContactClick("Email")}
          className="flex w-full items-center justify-center gap-2 py-2 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#6B6B6B] transition-colors hover:text-[#C8102E]"
        >
          <Mail className="h-4 w-4" strokeWidth={1.75} />
          Trimite email
        </a>
      </div>
    </div>
  );
}

export default function CarDetailView({
  car,
}: {
  car: Car;
  similarCars: Car[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = normalizeCarImages(car.images);
  const displayName = buildCarName(car);
  const title = buildCarTitle(car);

  return (
    <div className="bg-[#F7F7F7] pb-28 pt-[72px] lg:pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">

        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 font-[family-name:var(--font-outfit)] text-sm text-[#6B6B6B]"
        >
          <Link href="/" className="transition-colors hover:text-[#111111]">
            Acasă
          </Link>

          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />

          <Link
            href="/#stoc"
            className="transition-colors hover:text-[#111111]"
          >
            Stoc
          </Link>

          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />

          <span className="font-medium text-[#111111]">
            {title}
          </span>
        </nav>


        <Link
          href="/#stoc"
          className="mb-6 inline-flex items-center gap-2 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#6B6B6B] transition-colors hover:text-[#111111]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Înapoi la stoc
        </Link>


        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">

          <div className="lg:col-span-7">
            <CarGallery
              variant="page"
              images={images}
              carName={displayName}
              activeIndex={activeIndex}
              onIndexChange={setActiveIndex}
            />
          </div>


          <div className="lg:col-span-5">
            <PricePanel car={car} />
          </div>

        </div>
      </div>
    </div>
  );
}
