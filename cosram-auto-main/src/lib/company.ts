/**
 * Date firmă — COSRAM AUTO S.R.L.
 */
export const COMPANY = {
  legalName: "COSRAM AUTO S.R.L.",
  brandName: "Cosram Auto",
  cui: "48833196",
  regCom: "J10/920/2023",
  registeredAddress:
    "Str. Toamnei nr. 36, Scutelnici, Bragareasa, jud. Buzău",
  showroomAddress:
    "Str. Toamnei nr. 36, Scutelnici, Bragareasa, jud. Buzău",
  legalRepresentative: "Chirea Daniela",
  email: "vanzari@cosram.ro",
  dpoEmail: "vanzari@cosram.ro",
  phone: "+40 773 865 488",
  phoneRaw: "40773865488",
  website: "https://www.cosram.ro",
  legalLastUpdated: "1 iunie 2026",
} as const;

export const AGENCY_CREDIT = {
  name: "cosram auto ",
  url: "https://www.cosram.ro/",
} as const;

export const LEGAL_LINKS = [
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
  { href: "/politica-cookies", label: "Politica de cookies" },
] as const;

export const CONSUMER_LINKS = {
  anpc: "https://anpc.ro/",
  anpcSal: "https://anpc.ro/ce-este-sal/",
  euOdr: "https://ec.europa.eu/consumers/odr",
} as const;

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const COOKIE_CONSENT_KEY = "cosram-cookie-consent-v1";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: "",
};
