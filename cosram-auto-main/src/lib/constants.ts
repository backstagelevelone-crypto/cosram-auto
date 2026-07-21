export const SITE = {
  name: "Cosram Auto",
  tagline: "Mașini Rulate · Buzău",
  location: "Bragareasa, Buzău",
  address: "Str. Toamnei nr. 36, Scutelnici, Bragareasa, jud. Buzău",
  phone: "+40 773 865 488",
  phoneRaw: "40773865488",
  email: "vanzari@cosram.ro",
  whatsapp: "https://wa.me",
  /** Pagina Facebook — actualizează cu URL-ul real al paginii */
  facebook: "https://facebook.com",
  mapsEmbed:
    "https://google.com",
  hours: [
    "Zilnic: 08:00 – 22:00",
    "Sâmbătă: 08:00 – 22:00",
    "Duminică: 10:00 – 18:00",
  ] as const,
} as const;

/** sessionStorage — Facebook scroll prompt dismiss per sesiune */
export const FB_PROMPT_SESSION_KEY = "cosram-fb-prompt-dismissed";

/** Timp minim pe site înainte de afișarea promptului Facebook (ms) */
export const FB_PROMPT_MIN_TIME_MS = 15_000;

export const NAV_LINKS = [
  { href: "#servicii", label: "Servicii" },
  { href: "#stoc", label: "Stoc" },
  { href: "#masini-la-comanda", label: "La comandă" },
  { href: "#livrare", label: "Livrare" },
  { href: "#rate", label: "Rate" },
  { href: "#recenzii", label: "Recenzii" },
] as const;

export const DISPLAY_PARTNERS = [
  {
    name: "TBI Bank",
    logo: "/partners/tbi-bank.svg",
    width: 140,
    height: 48,
    href: "https://tbibank.ro",
  },
  {
    name: "Mogo",
    logo: "/partners/mogo.svg",
    width: 130,
    height: 48,
    href: "https://mogo.ro",
  },
  {
    name: "Garantul Tau",
    href: "https://garantultau.ro",
    logo: "/partners/garantultau.ro.jpeg",
    width: 150,
    height: 50,
  },
  {
    name: "BT Direct",
    logo: "/partners/bt-direct.svg",
    width: 160,
    height: 35,
    href: "https://btdirect.ro",
  },
] as const;

export type WhatsAppCarInquiry = {
  name: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
};

export function getWhatsAppCarMessage(car: WhatsAppCarInquiry | string): string {
  const label =
    typeof car === "string"
      ? car
      : car.name || [car.make, car.model, car.year].filter(Boolean).join(" ");

  return `Bună ziua! Mă interesează acest model: ${label}. Aș dori mai multe detalii despre achiziție.`;
}

export function whatsappCarLink(car: WhatsAppCarInquiry | string): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(getWhatsAppCarMessage(car))}`;
}
