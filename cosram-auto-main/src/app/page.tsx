import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Parteneri from "@/components/sections/Parteneri";
import StocSection from "@/components/sections/StocSection";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import SeoContent from "@/components/SeoContent";
import FacebookScrollPrompt from "@/components/FacebookScrollPrompt";

const Servicii = dynamic(() => import("@/components/sections/Servicii"));
const Livrare = dynamic(() => import("@/components/sections/Livrare"));
const RateCalculator = dynamic(
  () => import("@/components/sections/RateCalculator")
);
const Recenzii = dynamic(() => import("@/components/sections/Recenzii"));
const MasiniLaComanda = dynamic(
  () => import("@/components/sections/MasiniLaComanda")
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Parteneri />
        <Servicii />
        <StocSection />
        <MasiniLaComanda />
        <Livrare />
        <RateCalculator />
        <Recenzii />
        <SeoContent />
      </main>
      <Footer />
      <FacebookScrollPrompt />
      <WhatsAppFab />
    </>
  );
}
