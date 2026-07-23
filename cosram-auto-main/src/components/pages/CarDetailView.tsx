@@ -5,34 +5,75 @@
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
  formatPrice,
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
@@ -41,43 +82,43 @@
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Contact", {
        content_name: displayName,
        content_category: car.category,
        value: car.price ?? 0,
        content_category: (car as any).category || (car as any).caroserie || "Auto",
        value: car.price ?? (car as any).pret ?? 0,
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
    <div className={cn("rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]", className)}>
      <p className="font-[family-name:var(--font-outfit)] text-xs font-medium uppercase tracking-wide text-[#6B6B6B]">
        Preț
      </p>

      <p className="mt-1 font-[family-name:var(--font-syne)] text-4xl font-bold text-[#C8102E]">
        {car.price != null ? formatPrice(car.price, { spaced: true }) : "-"}
        {car.price != null ? formatPrice(car.price, { spaced: true }) : (car as any).pret != null ? formatPrice((car as any).pret, { spaced: true }) : "-"}
      </p>

      <p className="mt-3 font-[family-name:var(--font-outfit)] text-sm text-[#6B6B6B]">
        {car.monthlyPrice != null ? (
        {car.monthlyPrice != null || (car as any).rataLunara != null ? (
          <>
            Rată de la{" "}
            <span className="font-semibold text-[#111111]">
              {car.monthlyPrice}€/lună
            </span>
            Rată de la <span className="font-semibold text-[#111111]">{car.monthlyPrice || (car as any).rataLunara}€/lună</span>
          </>
        ) : (
          "Contactează-ne pentru o ofertă de finanțare"
        )}
      </p>

      <div className="mt-6 space-y-3">
      {/* Parteneri Creditare */}
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-b border-[rgba(0,0,0,0.06)] py-3">
        <span className="text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B]">Parteneri:</span>
        <div className="flex flex-wrap gap-2 text-[11px] font-bold text-[#111111]">
          <span className="rounded bg-[#F2F2F7] px-2 py-0.5 text-[#1a5632]">BT Direct</span>
          <span className="rounded bg-[#F2F2F7] px-2 py-0.5 text-[#FF5A00]">tbi bank</span>
          <span className="rounded bg-[#F2F2F7] px-2 py-0.5 text-[#4A90E2]">mogo</span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <a
          href={whatsappCarLink(car)}
          target="_blank"
@@ -88,7 +129,6 @@
          <Phone className="h-4 w-4" strokeWidth={2} />
          Cere detalii pe WhatsApp
        </a>

        <a
          href={`tel:${SITE.phoneRaw}`}
          onClick={() => trackContactClick("Telefon")}
@@ -97,15 +137,14 @@
          <Phone className="h-4 w-4" strokeWidth={2} />
          Sună acum
        </a>

        <Link
          href="/#rate"
          onClick={() => trackContactClick("Rate_Button")}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F2F2F7] py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#111111] transition-colors hover:bg-[#E8E8ED]"
        >
          RATE
          Calculează rata
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </Link>

        <a
          href={`mailto:${SITE.email}?subject=Interesat de ${encodeURIComponent(displayName)}`}
          onClick={() => trackContactClick("Email")}
@@ -118,7 +157,6 @@
    </div>
  );
}

function buildSpecs(car: Car): { icon: LucideIcon; label: string; value: string }[] {
  const c = car as any;
  const brand = c.marca || car.make || "";
@@ -129,41 +167,17 @@
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
  const candidates: { icon: LucideIcon; label: string; value: string | undefined }[] = [
    { icon: CarFront, label: "Marcă / Model", value: makeModel || undefined },
    { icon: CalendarDays, label: "An fabricație", value: anulFab },
    { icon: CircleGauge, label: "Kilometraj", value: kmRulaj },
    { icon: Fuel, label: "Combustibil", value: c.combustibil || car.fuel },
    { icon: Settings2, label: "Cutie viteze", value: c.cutieViteze || car.transmission },
    { icon: Cog, label: "Motor", value: c.motor || car.engine },
    {
      icon: Zap,
      label: "Putere",
      value: putereCp,
    },
    { icon: Zap, label: "Putere", value: putereCp },
    { icon: CarFront, label: "Caroserie", value: c.caroserie || car.category },
    { icon: Palette, label: "Culoare", value: c.culoare || car.color },
    {
      icon: DoorOpen,
      label: "Nr. uși",
      value: nrUsi,
    },
    { icon: DoorOpen, label: "Nr. uși", value: nrUsi },
    { icon: CarFront, label: "Tracțiune", value: c.tractiune || car.drive },
    { icon: ShieldCheck, label: "Inspecție tehnică", value: c.inspectieTehnica || car.itp },
  ];
@@ -179,29 +193,23 @@

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
    case "disponibil": return "Disponibil";
    case "rezervat": return "Rezervat";
    case "vandut": return "Vândut";
    default: return "Disponibil";
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

  useEffect(() => {
    if (typeof window !== "undefined") {
@@ -210,125 +218,133 @@
        fbq("track", "ViewContent", {
          content_ids: [car.slug || ""],
          content_type: "product",
          value: car.price || 0,
          value: car.price || (car as any).pret || 0,
          currency: "EUR",
        });
      }
    }
  }, [car]);

  // Conversie securizată pentru a citi caracteristicile dinamice în română sau engleză
  const c = car as any;
  const trackMobileWhatsapp = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Contact", {
        content_name: displayName,
        contact_type: "WhatsApp_Mobile_Bottom"
      });
    }
  };

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
          <Link href="/#stoc" className="mb-6 inline-flex items-center gap-2 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#6B6B6B] transition-colors hover:text-[#111111]">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Înapoi la stoc
          </Link>

          <div className="lg:col-span-5">
            <PricePanel car={car} />
          </div>
        </div>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <CarGallery variant="page" images={images} carName={displayName} activeIndex={activeImage} onIndexChange={setActiveImage} priority />
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
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className={cn(
                    "rounded-full px-3 py-1 font-[family-name:var(--font-outfit)] text-[11px] font-semibold uppercase tracking-wide",
                    car.status === "disponibil" || c.disponibil === "Disponibil" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                  )}>
                    {statusLabel(car.status || c.disponibil?.toLowerCase())}
                  </span>
                </div>
                <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold leading-tight text-[#111111] lg:text-4xl">{title}</h1>
                {subtitle !== "-" && <p className="mt-2 font-[family-name:var(--font-outfit)] text-base text-[#6B6B6B]">{subtitle}</p>}
                <PricePanel car={car} className="mt-6 hidden lg:block" />
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
          <div className="mt-12 space-y-12 lg:mt-16">
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
              </div>
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
        <div className="flex items-center gap-3">
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
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#C8102E] px-5 py-3 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" strokeWidth={2} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
