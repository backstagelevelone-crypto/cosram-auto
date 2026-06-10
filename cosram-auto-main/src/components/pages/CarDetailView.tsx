"use client";

import { useState } from "react";
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
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, whatsappCarLink } from "@/lib/constants";
import { normalizeCarImages } from "@/lib/car-images";
import {
  buildCarName,
  buildCarSubtitle,
  buildCarTitle,
  formatLocaleNumber,
  formatPrice,
  hasValue,
} from "@/lib/car-display";
import type { Car } from "@/types/car";
import CarGallery from "@/components/ui/CarGallery";
import CarCard from "@/components/ui/CarCard";

const iconProps = {
  strokeWidth: 1.75,
  className: "h-[22px] w-[22px] text-[#C8102E]",
} as const;

function SpecCell({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3.5 border-b border-[rgba(0,0,0,0.06)] py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#F2F2F7]">
        <Icon {...iconProps} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-[family-name:var(--font-outfit)] text-[11px] font-medium uppercase tracking-wide text-[#6B6B6B]">
          {label}
        </p>
        <p className="mt-0.5 font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-[#111111]">
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b-2 border-[#111111] pb-2 font-[family-name:var(--font-syne)] text-sm font-bold uppercase tracking-wide text-[#111111]">
      {children}
    </h2>
  );
}

function PricePanel({ car, className }: { car: Car; className?: string }) {
  const displayName = buildCarName(car);

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
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition-all hover:bg-[#A50E26] hover:shadow-[0_8px_24px_rgba(200,16,46,0.35)]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          WhatsApp
        </a>
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#111111] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Sună acum
        </a>
        <Link
          href="/#rate"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F2F2F7] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#111111] transition-colors hover:bg-[#E8E8ED]"
        >
          Calculează rata
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </Link>
        <a
          href={`mailto:${SITE.email}?subject=Interesat de ${encodeURIComponent(displayName)}`}
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
  const makeModel = [car.make, car.model].filter(Boolean).join(" ");
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
      value: car.year != null ? String(car.year) : undefined,
    },
    {
      icon: CircleGauge,
      label: "Kilometraj",
      value: car.km != null ? `${formatLocaleNumber(car.km)} km` : undefined,
    },
    { icon: Fuel, label: "Combustibil", value: car.fuel },
    { icon: Settings2, label: "Cutie viteze", value: car.transmission },
    { icon: Cog, label: "Motor", value: car.engine },
    {
      icon: Zap,
      label: "Putere",
      value: car.power != null ? `${car.power} CP` : undefined,
    },
    { icon: CarFront, label: "Caroserie", value: car.category },
    { icon: Palette, label: "Culoare", value: car.color },
    {
      icon: DoorOpen,
      label: "Nr. uși",
      value: car.doors != null ? String(car.doors) : undefined,
    },
    { icon: CarFront, label: "Tracțiune", value: car.drive },
    { icon: ShieldCheck, label: "Inspecție tehnică", value: car.itp },
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
  const [activeImage, setActiveImage] = useState(0);
  const images = normalizeCarImages(car.images);
  const specs = buildSpecs(car);
  const displayName = buildCarName(car);
  const title = buildCarTitle(car);
  const subtitle = buildCarSubtitle(car);
  const features = car.features ?? [];
  const similar = similarCars ?? [];

  return (
    <>
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
                activeIndex={activeImage}
                onIndexChange={setActiveImage}
                priority
              />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 font-[family-name:var(--font-outfit)] text-[11px] font-semibold uppercase tracking-wide",
                      car.status === "disponibil"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : car.status === "rezervat"
                          ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                          : "bg-[#F2F2F7] text-[#6B6B6B] ring-1 ring-[rgba(0,0,0,0.06)]"
                    )}
                  >
                    {statusLabel(car.status)}
                  </span>
                  {car.category ? (
                    <span className="rounded-full bg-white px-3 py-1 font-[family-name:var(--font-outfit)] text-[11px] font-medium uppercase tracking-wide text-[#6B6B6B] ring-1 ring-[rgba(0,0,0,0.06)]">
                      {car.category}
                    </span>
                  ) : null}
                </div>

                <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold leading-tight text-[#111111] lg:text-4xl">
                  {title}
                </h1>
                {subtitle !== "-" ? (
                  <p className="mt-2 font-[family-name:var(--font-outfit)] text-base text-[#6B6B6B]">
                    {subtitle}
                  </p>
                ) : null}

                <PricePanel car={car} className="mt-6 hidden lg:block" />
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-12 lg:mt-16">
            {specs.length > 0 ? (
              <section>
                <SectionTitle>Specificații generale</SectionTitle>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                  {specs.map((spec) => (
                    <SpecCell
                      key={spec.label}
                      icon={spec.icon}
                      label={spec.label}
                      value={spec.value}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {features.length > 0 ? (
              <section>
                <SectionTitle>Dotări &amp; echipamente</SectionTitle>
                <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 font-[family-name:var(--font-outfit)] text-[15px] leading-snug text-[#111111]"
                    >
                      <BadgeCheck
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]"
                        strokeWidth={1.75}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {car.description ? (
              <section>
                <SectionTitle>Evaluare tehnică &amp; recomandare</SectionTitle>
                <div className="mt-6 space-y-4 rounded-2xl bg-white p-6 font-[family-name:var(--font-outfit)] text-[15px] leading-[1.8] text-[#2A2A2A] ring-1 ring-[rgba(0,0,0,0.06)] md:p-8">
                  {car.description.split(/\n\n+/).map((paragraph, i) => (
                    <p key={`${i}-${paragraph.slice(0, 48)}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {similar.length > 0 ? (
            <section className="mt-16 border-t border-[rgba(0,0,0,0.08)] pt-16">
              <SectionTitle>Mașini similare</SectionTitle>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((item, i) => (
                  <CarCard key={item.id} car={item} index={i} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(0,0,0,0.08)] bg-white/95 px-4 py-3 pb-safe backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-[family-name:var(--font-syne)] text-lg font-bold text-[#C8102E]">
              {car.price != null ? formatPrice(car.price, { spaced: true }) : "-"}
            </p>
            <p className="font-[family-name:var(--font-outfit)] text-xs text-[#6B6B6B]">
              {car.monthlyPrice != null
                ? `de la ${car.monthlyPrice}€/lună`
                : "Finanțare disponibilă"}
            </p>
          </div>
          <a
            href={whatsappCarLink(car)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#C8102E] px-5 py-3 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
