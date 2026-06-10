import type { Metadata } from "next";
import { Syne, Outfit, Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import LegalProviders from "@/components/LegalProviders";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cosram.ro"),

  title: {
    default: "Mașini în Rate și Auto Rulate Buzău | COSRAM Auto",
    template: "%s | COSRAM Auto",
  },

  description:
    "Mașini second hand import Germania, finanțare în rate, garanție și livrare în toată România. Parc auto din Buzău cu autoturisme verificate.",

  keywords: [
    "masini in rate",
    "masini in rate buzau",
    "parc auto buzau",
    "auto rulate buzau",
    "masini second hand buzau",
    "import auto germania",
    "finantare auto",
    "credit auto",
    "masini fara avans",
  ],

  openGraph: {
    title: "COSRAM Auto - Mașini în Rate și Auto Rulate",
    description:
      "Parc auto din Buzău. Mașini verificate, finanțare rapidă și livrare în toată România.",
    url: "https://www.cosram.ro",
    siteName: "COSRAM Auto",
    locale: "ro_RO",
    type: "website",
  },

  alternates: {
    canonical: "https://www.cosram.ro",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${syne.variable} ${outfit.variable} ${playfair.variable} ${GeistSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <LegalProviders />
      </body>
    </html>
  );
}
