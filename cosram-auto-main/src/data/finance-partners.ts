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

export const financingRequiredDocuments = {
  intro:
    "Indiferent de partenerul ales (TBI Bank, Mogo sau BT Direct), dosarul de finanțare auto presupune, de regulă, aceleași categorii de acte.",
  items: [
    "Carte de identitate (original) — pentru toți aplicanții",
    "Dovada veniturilor daca nu se vad la ANAF",
    "Minim 3 luni la actualul loc de munca",
  ],
  footnote: "Lista este orientativă.",
} as const;

export const financePartners: FinancePartner[] = [
  {
    id: "tbi",
    name: "TBI Bank",
    logo: "/partners/tbi-bank.svg",
    logoWidth: 140,
    logoHeight: 48,
    href: "https://tbibank.ro",
    tagline: "Dobândă fixă de la doar 4,9% pe an, fără avans și fără CASCO.",
    badge: "4,9% / an fix",
    benefits: ["Dobândă fixă de la 4,9% pe an", "Fără avans și fără CASCO"],
    minPrice: 10000,
    maxPrice: 250000,
    downPayments:,
    durations:,
    defaultDownPayment: 0,
    defaultDuration: 60,
    defaultPrice: 50000,
    rateLabel: "Dobândă fixă de la 4,9% / an",
    disclaimer: "Calcul estimativ.",
    calculation: { type: "annual", ratePercent: 4.9, rateNote: "Dobândă fixă" },
  },
  {
    id: "mogo",
    name: "Mogo",
    logo: "/partners/mogo.svg",
    logoWidth: 130,
    logoHeight: 48,
    href: "https://mogo.ro",
    tagline: "DAE 36,18% · Credit auto 100% online, avans 0%.",
    badge: "DAE 36,18%",
    benefits: ["Dobândă lunară 2,61%", "Avans 0%"],
    minPrice: 10000,
    maxPrice: 250000,
    downPayments:,
    durations:,
    defaultDownPayment: 0,
    defaultDuration: 60,
    defaultPrice: 50000,
    rateLabel: "DAE 36,18%",
    disclaimer: "Calcul estimativ.",
    calculation: { type: "monthly", ratePercent: 2.61, daePercent: 36.18, rateNote: "Mogo" },
  },
];

export function getFinancePartner(id: FinancePartnerId): FinancePartner {
  return financePartners.find((p) => p.id === id) || financePartners[0];
}
