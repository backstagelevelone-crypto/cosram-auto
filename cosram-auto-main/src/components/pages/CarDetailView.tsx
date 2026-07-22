"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CarFront,
  ChevronRight,
  CircleGauge,
  Cog,
  DoorOpen,
  Fuel,
  Mail,
  Phone,
  Palette,
  Settings2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

        <a
          href={`tel:${SITE.phoneRaw}`}
          onClick={() => trackContactClick("Telefon")}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#111111] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Sună acum
        </a>

        <Link
          href="/#rate"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F2F2F7] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#111111] transition-colors hover:bg-[#E8E8ED]"
        >
          RATE
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </Link>

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

function buildSpecs(car: Car): { icon: LucideIcon; label: string; value: string }[] {
  const c = car as any;
  const brand = c.marca || car.make || "";
  const modelStr = c.model || car.model || "";
  const makeModel = [brand, modelStr].filter(Boolean).join(" ");
  const anulFab = c.an != null ? String(c.an) : car.year != null ? String(car.year) : undefined;
  const kmRulaj = c.kilometraj != null ? `${formatLocaleNumber(c.kilometraj)} km` : car.km != null ? `${formatLocaleNumber(car.km)} km` : undefined;
  const putereCp = c.putere != null ? `${c.putere} CP` : car.power != null ? `${car.power} CP` : undefined;
  const nrUsi = c.nrUsi != null ? String(c.nrUsi) : car.doors != null ? String(car.doors) : undefined;

  const candidates: {
    icon: LucideIcon;
    label: string;
    value: string | undefined;
  }[] = [
    {
      icon: CarFront,
      label: "Marcă / Model",
      value: makeModel || undefined,
    },
    {
      icon: CalendarDays,
      label: "An fabricație",
      value: anulFab,
    },
    {
      icon: CircleGauge,
      label: "Kilometraj",
      value: kmRulaj,
    },
    { icon: Fuel, label: "Combustibil", value: c.combustibil || car.fuel },
    { icon: Settings2, label: "Cutie viteze", value: c.cutieViteze || car.transmission },
    { icon: Cog, label: "Motor", value: c.motor || car.engine },
    {
      icon: Zap,
      label: "Putere",
      value: putereCp,
    },
    { icon: CarFront, label: "Caroserie", value: c.caroserie || car.category },
    { icon: Palette, label: "Culoare", value: c.culoare || car.color },
    {
      icon: DoorOpen,
      label: "Nr. uși",
      value: nrUsi,
    },
    { icon: CarFront, label: "Tracțiune", value: c.tractiune || car.drive },
    { icon: ShieldCheck, label: "Inspecție tehnică", value: c.inspectieTehnica || car.itp },
  ];

  return candidates
    .filter((item) => hasValue(item.value))
    .map((item) => ({
      icon: item.icon,
      label: item.label,
      value: item.value as string,
    }));
}

function statusLabel(status: Car["status"]): string {
  switch (status) {
    case "disponibil":
      return "Disponibil";
    case "rezervat":
      return "Rezervat";
    case "vandut":
      return "Vândut";
    default:
      return "Disponibil";
  }
}

export default function CarDetailView({
  car,
  similarCars,
}: {
  car: Car;
  similarCars: Car[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = normalizeCarImages(car.images);
  const displayName = buildCarName(car);
  const title = buildCarTitle(car);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fbq = (window as any).fbq;
      if (typeof fbq === "function" && car) {
        fbq("track", "ViewContent", {
          content_ids: [car.slug || ""],
          content_type: "product",
          value: car.price || 0,
          currency: "EUR",
        });
      }
    }
  }, [car]);

  // Conversie securizată pentru a citi caracteristicile dinamice în română sau engleză
  const c = car as any;

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
          <Link href="/#stoc" className="transition-colors hover:text-[#111111]">
            Stoc
          </Link>
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          <span className="font-medium text-[#111111]">{title}</span>
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

        {/* Zona Restaurată: Detaliile Tehnice Completesub Galerie */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10 border-t border-[rgba(0,0,0,0.06)] pt-10">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#111111]">
                Specificații Tehnice
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 font-[family-name:var(--font-outfit)] text-sm">
                <div className="rounded-xl bg-white p-4 border border-[rgba(0,0,0,0.04)]">
                  <p className="text-[#6B6B6B]">An fabricație</p>
                  <p className="mt-0.5 font-semibold text-[#111111]">{c.an || c.year || "-"}</p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-[rgba(0,0,0,0.04)]">
                  <p className="text-[#6B6B6B]">Kilometraj</p>
                  <p className="mt-0.5 font-semibold text-[#111111]">
                    {c.kilometraj != null ? `${c.kilometraj.toLocaleString()} km` : c.km != null ? `${c.km.toLocaleString()} km` : "-"}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-[rgba(0,0,0,0.04)]">
                  <p className="text-[#6B6B6B]">Combustibil</p>
                  <p className="mt-0.5 font-semibold text-[#111111]">{c.combustibil || c.fuel || "-"}</p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-[rgba(0,0,0,0.04)]">
                  <p className="text-[#6B6B6B]">Transmisie</p>
                  <p className="mt-0.5 font-semibold text-[#111111]">{c.cutieViteze || c.transmission || "-"}</p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-[rgba(0,0,0,0.04)]">
                  <p className="text-[#6B6B6B]">Motor</p>
                  <p className="mt-0.5 font-semibold text-[#111111]">{c.motor || "-"}</p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-[rgba(0,0,0,0.04)]">
                  <p className="text-[#6B6B6B]">Putere</p>
                  <p className="mt-0.5 font-semibold text-[#111111]">{c.putere ? `${c.putere} CP` : c.hp ? `${c.hp} CP` : "-"}</p>
                </div>
              </div>
            </div>

            {(c.evaluareTehnica || c.description) && (
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-[#111111]">
                  Descriere și Evaluare
                </h3>
                <p className="mt-3 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#555555] bg-white p-5 rounded-2xl border border-[rgba(0,0,0,0.04)]">
                  {c.evaluareTehnica || c.description}
                </p>
              </div>
            )}

            {c.dotari && c.dotari.length > 0 && (
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-[#111111]">
                  Dotări și Echipamente
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 font-[family-name:var(--font-outfit)] text-sm text-[#555555]">
                  {c.dotari.map((dotare: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[rgba(0,0,0,0.03)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" />
                      {dotare}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
