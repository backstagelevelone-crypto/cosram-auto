import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalList,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/LegalPageShell";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Politica de cookies | Cosram Auto",
  description: "Informații despre cookie-uri și tehnologii similare utilizate pe Cosram Auto.",
  robots: { index: true, follow: true },
};

export default function PoliticaCookiesPage() {
  return (
    <LegalPageShell
      title="Politica de cookies"
      description="Această pagină explică ce sunt cookie-urile, ce tipuri folosim pe site și cum îți poți gestiona preferințele, conform Regulamentului ePrivacy și GDPR."
    >
      <LegalSection title="1. Ce sunt cookie-urile">
        <p>
          Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău când
          vizitezi {COMPANY.website}. Ne ajută să asigurăm funcționarea site-ului,
          să înțelegem traficul și, cu acordul tău, să măsurăm eficiența
          campaniilor publicitare.
        </p>
      </LegalSection>

      <LegalSection title="2. Cine le utilizează">
        <p>
          Cookie-urile pot fi setate de {COMPANY.legalName} (first-party) sau de
          parteneri tehnologici (third-party), precum Meta (Facebook/Instagram) și
          Google.
        </p>
      </LegalSection>

      <LegalSection title="3. Tipuri de cookie-uri">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.1)]">
                <th className="py-3 pr-4 font-semibold">Categorie</th>
                <th className="py-3 pr-4 font-semibold">Scop</th>
                <th className="py-3 pr-4 font-semibold">Consimțământ</th>
                <th className="py-3 font-semibold">Durată indicativă</th>
              </tr>
            </thead>
            <tbody className="text-[#2A2A2A]">
              <tr className="border-b border-[rgba(0,0,0,0.06)]">
                <td className="py-3 pr-4 font-medium">Strict necesare</td>
                <td className="py-3 pr-4">Funcționare site, securitate, salvare preferințe cookies</td>
                <td className="py-3 pr-4">Nu este necesar (interes legitim)</td>
                <td className="py-3">Sesiune / până la 12 luni</td>
              </tr>
              <tr className="border-b border-[rgba(0,0,0,0.06)]">
                <td className="py-3 pr-4 font-medium">Analiză</td>
                <td className="py-3 pr-4">Google Analytics — statistici agregate de vizitare</td>
                <td className="py-3 pr-4">Da</td>
                <td className="py-3">Până la 24 luni</td>
              </tr>
              <tr className="border-b border-[rgba(0,0,0,0.06)]">
                <td className="py-3 pr-4 font-medium">Marketing</td>
                <td className="py-3 pr-4">Meta Pixel — conversii, audiențe, remarketing</td>
                <td className="py-3 pr-4">Da</td>
                <td className="py-3">Până la 90 zile – 24 luni</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. Meta Pixel (Facebook / Instagram Ads)">
        <p>
          Dacă accepți cookies de marketing, Meta Platforms poate colecta date
          despre vizite (ex. pagini vizitate, acțiuni) pentru măsurarea conversiilor
          și optimizarea reclamelor. Detalii:{" "}
          <a
            href="https://www.facebook.com/privacy/policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C8102E] hover:underline"
          >
            Politica de confidențialitate Meta
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="5. Cum îți gestionezi preferințele">
        <LegalList
          items={[
            "La prima vizită — banner cookies: Accept toate / Doar necesare / Personalizează.",
            "Orice moment — șterge cookies din browser sau revino pe site și resetează preferințele (șterge cookie-urile site-ului din browser).",
            "Browser — setări de blocare/ștergere cookies (Chrome, Safari, Firefox etc.).",
            "Meta — setări reclame în contul Facebook: Ad Preferences.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Consecințe refuz">
        <p>
          Refuzul cookies opționale nu împiedică navigarea de bază, dar limită
          analiza traficului și personalizarea reclamelor.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          Întrebări:{" "}
          <a href={`mailto:${COMPANY.dpoEmail}`} className="text-[#C8102E] hover:underline">
            {COMPANY.dpoEmail}
          </a>
          . Vezi și{" "}
          <Link href="/politica-de-confidentialitate" className="text-[#C8102E] hover:underline">
            Politica de confidențialitate
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
