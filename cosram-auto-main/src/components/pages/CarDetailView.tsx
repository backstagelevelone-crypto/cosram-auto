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
    <div className="flex items-center gap-2.5 border-b border-[rgba(0,0,0,0.06)] py-4">
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
  const displayName = buildCarTitle(car);
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
  const handleSubmit = () => {
  if (!name.trim() || !phone.trim() || !email.trim()) {
    alert("Completează toate câmpurile.");
    return;
  }

  trackContactClick("WhatsApp_Form");

  const mesaj = `🚗 Solicitare nouă de pe site

Mașină:
${displayName}

Nume:
${name}

Telefon:
${phone}

Email:
${email}

Aștept să fiu contactat pentru mai multe detalii.`;

  const phoneNumber = SITE.phoneRaw.replace(/\D/g, "");

  window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mesaj)}`,
    "_blank"
  );
};

  const trackContactClick = (tipContact: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Contact", {
        content_name: displayName,
        content_category: (car as any).category || (car as any).caroserie || "Auto",
        value: car.price ?? (car as any).pret ?? 0,
        currency: "EUR",
        contact_type: tipContact,
      });
    }
  };

  return (
    <div className={cn("rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]", className)}>
      <div className="grid grid-cols-2 gap-4 border-b border-[rgba(0,0,0,0.06)] pb-3">
        <div>
          <p className="font-[family-name:var(--font-outfit)] text-xs font-medium uppercase tracking-wide text-[#6B6B6B]">
            Preț
          </p>
          <p className="mt-1 font-[family-name:var(--font-syne)] text-[28px] font-bold text-[#C8102E]">
            {car.price != null
              ? formatPrice(car.price, { spaced: true })
              : (car as any).pret != null
              ? formatPrice((car as any).pret, { spaced: true })
              : "-"}
          </p>
        </div>

        <div className="border-l border-[rgba(0,0,0,0.08)] pl-4">
          <p className="font-[family-name:var(--font-outfit)] text-xs font-medium uppercase tracking-wide text-[#6B6B6B]">
            Buy-Back
          </p>
          <p className="mt-1 font-[family-name:var(--font-syne)] text-[28px] font-bold text-[#16A34A]">
            {formatPrice(
              ((car.price ?? (car as any).pret) ?? 0) + 1000,
              { spaced: true }
            )}
          </p>
        </div>
      </div>
      <p className="mt-3 font-[family-name:var(--font-outfit)] text-sm text-[#6B6B6B]">
        {car.monthlyPrice != null || (car as any).rataLunara != null ? (
          <>
            Rată de la <span className="font-semibold text-[#111111]">{car.monthlyPrice || (car as any).rataLunara}€/lună</span>
          </>
        ) : (
          "Contactează-ne pentru o ofertă de finanțare"
        )}
      </p>

      {/* Parteneri Creditare */}
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 border-t border-b border-[rgba(0,0,0,0.06)] py-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B]">Parteneri:</span>
        <div className="flex flex-wrap gap-2 text-[11px] font-bold text-[#111111]">
          <span className="rounded bg-[#F2F2F7] px-2 py-0.5 text-[#1a5632]">BT Direct</span>
          <span className="rounded bg-[#F2F2F7] px-2 py-0.5 text-[#FF5A00]">tbi bank</span>
          <span className="rounded bg-[#F2F2F7] px-2 py-0.5 text-[#4A90E2]">cosram</span>
        </div>
      </div>

      <div className="mt-2 space-y-1">
  <div className="grid grid-cols-2 gap-2">
    <div>
      <label className="mb-0 block text-[12px] font-medium text-[#111111]">
        Nume
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Numele dvs."
        className="w-full rounded-[10px] border border-gray-300 px-2.5 py-1 outline-none focus:border-[#C8102E]"
      />
    </div>

    <div>
      <label className="mb-0 block text-[12px] font-medium text-[#111111]">
        Telefon
      </label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="07xxxxxxxx"
        className="w-full rounded-[10px] border border-gray-300 px-2.5 py-1 outline-none focus:border-[#C8102E]"
      />
    </div>
  </div>

  <div>
    <label className="mb-0 block text-[12px] font-medium text-[#111111]">
      Email
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="email@exemplu.ro"
      className="w-full rounded-[10px] border border-gray-300 px-2.5 py-1 outline-none focus:border-[#C8102E]"
    />
  </div>

  <div>
    <label className="mb-0 block text-[12px] font-medium text-[#111111]">
      Mașină
    </label>

    <div className="rounded-[10px] bg-[#F5F5F5] px-2.5 py-1 font-semibold text-[#111111]">
      {displayName}
    </div>
  </div>

  <button
    type="button"
    onClick={handleSubmit}
    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-1.5 text-[13px] font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition hover:bg-[#20ba5a]"
  >
    <Phone className="h-4 w-4" strokeWidth={2} />
    Trimite solicitarea pe WhatsApp
  </button>
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

  const candidates: { icon: LucideIcon; label: string; value: string | undefined }[] = [
    { icon: CarFront, label: "Marcă / Model", value: makeModel || undefined },
    { icon: CalendarDays, label: "An fabricație", value: anulFab },
    { icon: CircleGauge, label: "Kilometraj", value: kmRulaj },
    { icon: Fuel, label: "Combustibil", value: c.combustibil || car.fuel },
    { icon: Settings2, label: "Cutie viteze", value: c.cutieViteze || car.transmission },
    { icon: Cog, label: "Motor", value: c.motor || car.engine },
    { icon: Zap, label: "Putere", value: putereCp },
    { icon: CarFront, label: "Caroserie", value: c.caroserie || car.category },
    { icon: Palette, label: "Culoare", value: c.culoare || car.color },
    { icon: DoorOpen, label: "Nr. uși", value: nrUsi },
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
    case "disponibil": return "Disponibil";
    case "rezervat": return "Rezervat";
    case "vandut": return "Vândut";
    default: return "Disponibil";
  }
}

export default function CarDetailView({ car, similarCars }: { car: Car; similarCars: Car[]; }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = normalizeCarImages(car.images || (car as any).galerie);
  const specs = buildSpecs(car);
  const displayName = buildCarName(car);
  const title = buildCarTitle(car);
  const subtitle = buildCarSubtitle(car);
  const features = car.features ?? (car as any).dotari ?? [];
  const similar = similarCars ?? [];
  const c = car as any;
  console.log("STATUS:", c.disponibil, car.status);

  const trackMobileWhatsapp = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Contact", {
        content_name: displayName,
        contact_type: "WhatsApp_Mobile_Bottom"
      });
    }
  };

  return (
    <>
      <div className="bg-[#F7F7F7] pb-28 pt-[72px] lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-[family-name:var(--font-outfit)] text-sm text-[#6B6B6B]">
            <Link href="/" className="transition-colors hover:text-[#111111]">Acasă</Link>
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            <Link href="/#stoc" className="transition-colors hover:text-[#111111]">Stoc</Link>
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            <span className="font-medium text-[#111111]">{title}</span>
          </nav>

          <Link href="/#stoc" className="mb-6 inline-flex items-center gap-2 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#6B6B6B] transition-colors hover:text-[#111111]">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Înapoi la stoc
          </Link>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <CarGallery variant="page" images={images} carName={displayName} activeIndex={activeImage} onIndexChange={setActiveImage} priority />
            </div>

            <div className="lg:hidden">
              <PricePanel car={car} className="mt-6" />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
               <div className="mb-5 flex flex-wrap items-center gap-2">

  {(() => {
    const currentStatus =
      c.disponibil?.toString().toLowerCase().trim() ||
      car.status?.toString().toLowerCase().trim();


    return (
      <span
        className={cn(
          "rounded-full px-3 py-1 font-[family-name:var(--font-outfit)] text-[11px] font-semibold uppercase tracking-wide",

          currentStatus === "disponibil" &&
            "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",

          currentStatus === "rezervat" &&
            "bg-amber-50 text-amber-700 ring-1 ring-amber-200",

          currentStatus === "vandut" &&
            "bg-red-50 text-red-700 ring-1 ring-red-200"
        )}
      >
        {statusLabel(currentStatus as Car["status"])}
      </span>
    );

  })()}

</div>
                <h1 className="font-[family-name:var(--font-syne)] text-[28px] font-bold leading-tight text-[#111111] lg:text-4xl">{title}</h1>
                {subtitle !== "-" && <p className="mt-2 font-[family-name:var(--font-outfit)] text-base text-[#6B6B6B]">{subtitle}</p>}
                <PricePanel car={car} className="mt-6 hidden lg:block" />
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-12 lg:mt-10">
            {specs.length > 0 && (
              <section>
                <SectionTitle>Specificații generale</SectionTitle>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-1">
                  {specs.map((spec) => (
                    <SpecCell key={spec.label} icon={spec.icon} label={spec.label} value={spec.value} />
                  ))}
                </div>
              </section>
            )}

            {features.length > 0 && (
              <section>
                <SectionTitle>Dotări &amp; echipamente</SectionTitle>
                <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2.5 font-[family-name:var(--font-outfit)] text-[15px] leading-snug text-[#111111]">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" strokeWidth={1.75} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(car.description || c.evaluareTehnica) && (
              <section>
                <SectionTitle>Evaluare tehnică &amp; recomandare</SectionTitle>
                <div className="mt-6 space-y-4 rounded-2xl bg-white p-6 font-[family-name:var(--font-outfit)] text-[15px] leading-[1.8] text-[#2A2A2A] ring-1 ring-[rgba(0,0,0,0.06)] md:p-8">
                  {(car.description || c.evaluareTehnica).split(/\n\n+/).map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}
          </div>

          {similar.length > 0 && (
            <section className="mt-16 border-t border-[rgba(0,0,0,0.08)] pt-16">
              <SectionTitle>Mașini similare</SectionTitle>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((item, i) => (
                  <CarCard key={item.id || (item as any)._id} car={item} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobil Footer Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(0,0,0,0.08)] bg-white/95 px-4 py-3 pb-safe backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate font-[family-name:var(--font-syne)] text-lg font-bold text-[#C8102E]">
              {car.price != null ? formatPrice(car.price, { spaced: true }) : c.pret != null ? formatPrice(c.pret, { spaced: true }) : "-"}
            </p>
            <p className="font-[family-name:var(--font-outfit)] text-xs text-[#6B6B6B]">
              {car.monthlyPrice != null || c.rataLunara != null ? `de la ${car.monthlyPrice || c.rataLunara}€/lună` : "Finanțare disponibilă"}
            </p>
          </div>
          <a
            href={whatsappCarLink(car)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackMobileWhatsapp}
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#C8102E] px-5 py-1.5 text-[13px] font-[family-name:var(--font-outfit)] text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" strokeWidth={2} /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
