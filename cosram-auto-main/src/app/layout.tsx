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
  title: "Parc Auto Rulate Buzău | Mașini Verificate - Cosram Auto",
  description:
    "Parc auto rulate Buzău. Mașini verificate tehnic, garanție 12 luni, finanțare rapidă. Livrare în toată România.",
  keywords:
    "parc auto rulate buzau, masini second hand buzau, auto rulate buzau, cosram auto",
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
