export const SITE = {
  name: "Cosram Auto",
  tagline: "Mașini Rulate · Buzău",
  location: "Bragareasa, Buzău",
  address: "Str. Toamnei nr. 36, Scutelnici, Bragareasa, jud. Buzău",
  phone: "+40 773 865 488",
  phoneRaw: "40773865488",
  email: "vanzari@cosram.ro",
  whatsapp: "https://wa.me/40773865488",
  /** Pagina Facebook — actualizează cu URL-ul real al paginii */
  facebook: "https://www.facebook.com/share/18TNFQUTJx/?mibextid=wwXIfr",
  mapsEmbed:
    "https://maps.google.com/maps?q=Str.+Toamnei+36,+Bragareasa,+Buz%C4%83u&output=embed",
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
  { href: "#buy-back", label: "Buy-Back" },
  { href: "#masini-la-comanda", label: "Comandă" },
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
    href: "https://www.mogo.ro",
  },
  {
    name: "BT Direct",
    logo: "/partners/bt-direct.svg",
    width: 160,
    height: 35,
    href: "https://www.btdirect.ro",
  },
] as const;

export type WhatsAppCarInquiry = {
  name: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
};

export function getWhatsAppCarMessage(
  car: WhatsAppCarInquiry | string
): string {
  const label =
    typeof car === "string"
      ? car
      : car.name || [car.make, car.model, car.year].filter(Boolean).join(" ");

  return `Bună ziua! Mă interesează acest model: ${label}. Aș dori mai multe detalii despre achiziție.`;
}

export function whatsappCarLink(
  car: WhatsAppCarInquiry | string
): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(
    getWhatsAppCarMessage(car)
  )}`;
}
