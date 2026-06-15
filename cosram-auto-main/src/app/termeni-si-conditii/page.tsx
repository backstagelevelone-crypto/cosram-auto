import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalList,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/LegalPageShell";
import { COMPANY, CONSUMER_LINKS } from "@/lib/company";

export const metadata: Metadata = {
  title: "Termeni și condiții | Cosram Auto",
  description: "Termenii și condițiile de utilizare a site-ului Cosram Auto.",
  robots: { index: true, follow: true },
};

export default function TermeniSiConditiiPage() {
  return (
    <LegalPageShell
      title="Termeni și condiții"
      description="Regulile de utilizare a site-ului și condițiile generale aplicabile serviciilor oferite de parcul auto Cosram Auto."
    >
      <LegalSection title="1. Informații despre comerciant (OUG 34/2004)">
        <LegalList
          items={[
            `Denumire: ${COMPANY.legalName}`,
            `CUI: ${COMPANY.cui}`,
            `Nr. Reg. Com.: ${COMPANY.regCom}`,
            `Sediu social / showroom: ${COMPANY.registeredAddress}`,
            `Email: ${COMPANY.email}`,
            `Telefon: ${COMPANY.phone}`,
            `Website: ${COMPANY.website}`,
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Obiect">
        <p>
          Prezentele termeni reglementează accesul și utilizarea site-ului{" "}
          {COMPANY.brandName}, precum și relația cu clienții interesați de
          achiziția de autovehicule second-hand, servicii de intermediere
          finanțare (prin parteneri bancari) și informații comerciale.
        </p>
      </LegalSection>

      <LegalSection title="3. Servicii oferite">
        <LegalList
          items={[
            "Prezentarea stocului de autovehicule rulate disponibile spre vânzare.",
            "Furnizarea de informații tehnice și comerciale la solicitare.",
            "Asistență pentru finanțare auto prin parteneri (TBI Bank, Mogo etc.) — contractul de credit se încheie direct cu instituția financiară.",
            "Contact prin telefon, WhatsApp, email sau la showroom.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Prețuri și disponibilitate">
        <p>
          Prețurile afișate pe site sunt exprimate în EUR, includ TVA dacă este
          cazul conform facturării legale, și sunt orientative până la confirmarea
          scrisă. Stocul poate fi modificat; vehiculele pot fi rezervate sau vândute
          înainte de actualizarea online. Ratele lunare afișate sunt estimative —
          oferta finală de finanțare aparține partenerului bancar.
        </p>
      </LegalSection>

      <LegalSection title="5. Proces de achiziție">
        <p>
          Achiziția se finalizează la showroom sau prin documente contractuale
          semnate (factură, contract vânzare-cumpărare, proces verbal predare-primire).
          Site-ul nu constituie ofertă fermă, ci invitație la negociere (invitatio ad
          negotium), cu excepția cazurilor în care se specifică explicit altfel.
        </p>
      </LegalSection>

      <LegalSection title="6. Garanție și conformitate">
        <p>
          [COMPLETARE: descrie garanția legală/comercială oferită — ex. 12 luni,
          ce acoperă, exclusii, procedura de reclamație. Consultă avocat/ANPC pentru
          formulare exactă.]
        </p>
      </LegalSection>

      <LegalSection title="7. Dreptul de retragere">
        <p>
          Pentru consumatori: autovehiculele achiziționate pot fi exceptate de la
          dreptul de retragere de 14 zile în anumite condiții prevăzute de lege
          (OUG 34/2004, art. 16 lit. g — bunuri confecționate după specificații clare
          / livrate la domiciliu). Orice retragere produce costuri aferente conform legislatiei in vigoare precum si a ordinelor interne al companiei.Detaliile se comunică la semnarea contractului.
        </p>
      </LegalSection>

      <LegalSection title="8. Proprietate intelectuală">
        <p>
          Conținutul site-ului (texte, imagini, logo, design) aparține{" "}
          {COMPANY.legalName} sau licențiatorilor. Reproducerea fără acord scris este
          interzisă.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitarea răspunderii">
        <p>
          Depunem eforturi rezonabile pentru acuratețea informațiilor, însă nu
          garantăm absența erorilor tehnice sau a indisponibilității temporare a
          site-ului. Nu răspundem pentru deciziile luate exclusiv pe baza informațiilor
          de pe site fără verificare la showroom.
        </p>
      </LegalSection>

      <LegalSection title="10. Protecția datelor">
        <p>
          Prelucrarea datelor personale este descrisă în{" "}
          <Link href="/politica-de-confidentialitate" className="text-[#C8102E] hover:underline">
            Politica de confidențialitate
          </Link>{" "}
          și{" "}
          <Link href="/politica-cookies" className="text-[#C8102E] hover:underline">
            Politica de cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="11. Soluționarea litigiilor">
        <p>
          Litigiile se soluționează pe cale amiabilă. Consumatorii pot apela:
        </p>
        <LegalList
          items={[
            `ANPC: ${CONSUMER_LINKS.anpc}`,
            `Soluționare alternativă (SAL): ${CONSUMER_LINKS.anpcSal}`,
            `Platforma SOL/ODR UE: ${CONSUMER_LINKS.euOdr}`,
          ]}
        />
        <p>
          În lipsa înțelegerii, litigiile sunt de competența instanțelor din România,
          conform legii aplicabile.
        </p>
      </LegalSection>

      <LegalSection title="12. Lege aplicabilă">
        <p>Prezentul document este guvernat de legea română.</p>
      </LegalSection>

      <LegalSection title="13. Modificări">
        <p>
          Ne rezervăm dreptul de a modifica termenii. Versiunea aplicabilă este cea
          publicată online la data accesării. Ultima actualizare:{" "}
          {COMPANY.legalLastUpdated}.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
