import type { Metadata } from "next";
import { Syne, Outfit, Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
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
  metadataBase: new URL("https://cosram.ro"),

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
    url: "https://cosram.ro",
    siteName: "COSRAM Auto",
    locale: "ro_RO",
    type: "website",
  },

  alternates: {
    canonical: "https://cosram.ro",
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
        {/* Google Tag Manager / Analytics */}
        <Script
          src="https://googletagmanager.com"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16466740120');
          `}
        </Script>

        {/* Noul Meta Pixel Oficial Curat Cosram.ronew */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e);
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://facebook.net');
              fbq('init', '1582059960261179');
              fbq('track', 'PageView');
            `,
          }}
        />

        {children}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Cosram Auto",
              url: "https://cosram.ro",
              telephone: "+40773865488",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bragareasa-Buzău",
                addressCountry: "RO",
              },
              areaServed: "Romania",
            }),
          }}
        />
        <LegalProviders />
      </body>
    </html>
  );
}
