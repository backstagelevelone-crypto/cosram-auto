export type FinancePartnerId = "tbi" | "mogo";

export interface FinancePartner {
  id: FinancePartnerId;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  href: string;
  tagline: string;
  badge: string;
  benefits: string[];
  minPrice: number;
  maxPrice: number;
  downPayments: readonly number[];
  durations: readonly number[];
  defaultDownPayment: number;
  defaultDuration: number;
  defaultPrice: number;
  rateLabel: string;
  disclaimer: string;
  calculation:
    | { type: "annual"; ratePercent: number; rateNote: string }
    | { type: "monthly"; ratePercent: number; daePercent: number; rateNote: string };
}

/** Listă generală — valabilă pentru TBI Bank, Mogo și BT Direct */
export const financingRequiredDocuments = {
  intro:
    "Indiferent de partenerul ales (TBI Bank, Mogo sau BT Direct), dosarul de finanțare auto presupune, de regulă, aceleași categorii de acte. Te ajutăm noi la completare — multe pot fi trimise online.",
  items: [
    "Carte de identitate (original) — pentru toți aplicanții",
    "Dovada veniturilor: fluturaș de salariu, talon de pensie, extras de cont sau alte venituri legale",
    "Factura proformă sau contractul de vânzare-cumpărare pentru mașina aleasă",
    "Cerere de credit și acorduri pentru verificarea la ANAF și Biroul de Credit",
    "Permis de conducere (dacă este solicitat de instituția financiară)",
  ],
  footnote:
    "Lista este orientativă. TBI Bank, Mogo și BT Direct își rezervă dreptul de a solicita documente suplimentare, în funcție de profilul tău de venit și de evaluarea dosarului.",
} as const;

export const financePartners: FinancePartner[] = [
  {
    id: "tbi",
    name: "TBI Bank",
    logo: "/partners/tbi-bank.svg",
    logoWidth: 140,
    logoHeight: 48,
    href: "https://tbibank.ro",
    tagline:
      "Dobândă fixă de la doar 4,9% pe an, fără avans și fără CASCO. Îți iei mașina pe loc din showroom-urile auto partenere.",
    badge: "4,9% / an fix",
    benefits: [
      "Dobândă fixă de la 4,9% pe an",
      "Fără avans și fără CASCO",
      "0% avans și fără garanții",
      "Obții până la 100% din valoarea vehiculului",
      "Sumă pre-aprobată valabilă 30 de zile",
      "Flux online, fără drumuri la bancă",
    ],
    minPrice: 2000,
    maxPrice: 50000,
    downPayments: [0, 10, 20, 30],
    durations: [12, 24, 36, 48, 60],
    defaultDownPayment: 0,
    defaultDuration: 60,
    defaultPrice: 3000,
    rateLabel: "Dobândă fixă de la 4,9% / an",
    disclaimer:
      "Calcul estimativ cu dobândă fixă de 4,9% pe an, conform informațiilor publice TBI Bank. Oferta finală depinde de evaluarea dosarului.",
    calculation: {
      type: "annual",
      ratePercent: 4.9,
      rateNote: "Dobândă fixă de la 4,9% pe an (estimativ)",
    },
  },
  {
    id: "mogo",
    name: "Mogo",
    logo: "/partners/mogo.svg",
    logoWidth: 130,
    logoHeight: 48,
    href: "https://www.mogo.ro",
    tagline:
      "DAE 36,18% · Dobândă lunară 2,61%. Credit auto 100% online, avans 0%, fără CASCO obligatoriu.",
    badge: "DAE 36,18%",
    benefits: [
      "Dobândă lunară 2,61%",
      "DAE reprezentativă 36,18%",
      "Avans 0%",
      "Perioadă de creditare de la 6 luni la 5 ani",
      "Ești proprietarul mașinii din prima zi",
      "Polița CASCO nu este obligatorie",
    ],
    minPrice: 2000,
    maxPrice: 50000,
    downPayments: [0, 10, 20, 30],
    durations: [6, 12, 24, 36, 48, 60],
    defaultDownPayment: 0,
    defaultDuration: 60,
    defaultPrice: 3000,
    rateLabel: "DAE 36,18% · 2,61% / lună",
    disclaimer:
      "Calcul estimativ cu dobândă lunară de 3,39% și DAE reprezentativă de 49,05%, conform informațiilor publice Mogo. Oferta finală depinde de evaluarea dosarului.",
    calculation: {
      type: "monthly",
      ratePercent: 2.61,
      daePercent: 36.18,
      rateNote: "DAE 36,18% · Dobândă lunară 2,61%",
    },
  },
];

export function getFinancePartner(id: FinancePartnerId): FinancePartner {
  return financePartners.find((p) => p.id === id) ?? financePartners[0];
}
