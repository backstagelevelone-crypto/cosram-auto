import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalList,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/LegalPageShell";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Politica de confidențialitate | Cosram Auto",
  description:
    "Politica de confidențialitate și prelucrare a datelor personale Cosram Auto — GDPR.",
  robots: { index: true, follow: true },
};

export default function PoliticaConfidentialitatePage() {
  return (
    <LegalPageShell
      title="Politica de confidențialitate"
      description="Informăm vizitatorii și clienții despre modul în care colectăm, utilizăm și protejăm datele personale, în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația română aplicabilă."
    >
      <LegalSection title="1. Operatorul de date">
        <p>
          Operatorul datelor cu caracter personal este{" "}
          <strong>{COMPANY.legalName}</strong>, CUI {COMPANY.cui}, înregistrată
          la Registrul Comerțului sub nr. {COMPANY.regCom}, cu sediul social în{" "}
          {COMPANY.registeredAddress}, reprezentată legal de{" "}
          {COMPANY.legalRepresentative} (denumită în continuare „{COMPANY.brandName}”
          sau „Operatorul”).
        </p>
        <p>
          Contact date personale / GDPR:{" "}
          <a href={`mailto:${COMPANY.dpoEmail}`} className="text-[#C8102E] hover:underline">
            {COMPANY.dpoEmail}
          </a>{" "}
          · Telefon: {COMPANY.phone}
        </p>
      </LegalSection>

      <LegalSection title="2. Domeniul de aplicare">
        <p>
          Prezenta politică se aplică prelucrării datelor personale obținute prin
          site-ul {COMPANY.website}, formulare de contact, WhatsApp, telefon, email,
          campanii publicitare online (inclusiv Meta/Facebook/Instagram) și
          interacțiunile legate de solicitări de oferte, finanțare sau achiziție
          auto.
        </p>
      </LegalSection>

      <LegalSection title="3. Ce date colectăm">
        <LegalList
          items={[
            "Date de identificare și contact: nume, prenume, telefon, email, adresă (dacă le furnizați voluntar).",
            "Date privind solicitarea auto: model preferat, buget, perioada de finanțare, mesaje trimise prin WhatsApp/email.",
            "Date tehnice: adresă IP, tip browser, dispozitiv, pagini vizitate, sursa traficului, cookie identifiers.",
            "Date generate prin cookies/tehnologii similare (Meta Pixel, Google Analytics — doar cu consimțământul dvs., unde este cazul).",
            "Date furnizate partenerilor de finanțare (TBI Bank, Mogo etc.) doar cu acordul dvs. explicit, pentru analiza dosarului de credit.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Scopuri și temeiuri legale">
        <LegalList
          items={[
            "Răspuns la solicitări și oferirea de informații despre vehicule — interes legitim / demersuri precontractuale (art. 6 alin. (1) lit. b și f GDPR).",
            "Comunicări comerciale (oferte, follow-up) — consimțământ (art. 6 alin. (1) lit. a GDPR) sau interes legitim, după caz.",
            "Măsurare trafic și performanță site (Analytics) — consimțământ (art. 6 alin. (1) lit. a GDPR).",
            "Publicitate și remarketing (Meta Pixel) — consimțământ (art. 6 alin. (1) lit. a GDPR).",
            "Obligații legale (facturare, contabilitate, litigii) — obligație legală (art. 6 alin. (1) lit. c GDPR).",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Destinatari și transferuri">
        <p>Datele pot fi comunicate, strict cât este necesar, către:</p>
        <LegalList
          items={[
            "Furnizori IT / hosting (ex: Vercel, servicii email).",
            "Meta Platforms Ireland Ltd. — publicitate și măsurare conversii (dacă ați acceptat cookies marketing).",
            "Google Ireland Ltd. — analiză trafic (dacă ați acceptat cookies analiză).",
            "Parteneri financiari (TBI Bank, Mogo) — doar cu acordul dvs. pentru finanțare.",
            "Autorități publice, când legea o impune.",
          ]}
        />
        <p>
          Nu vindem datele personale. Transferurile în afara SEE se pot realiza pe
          baza clauzelor contractuale standard UE sau a altor garanții prevăzute de
          GDPR (ex. Meta, Google — conform documentației lor de conformitate).
        </p>
      </LegalSection>

      <LegalSection title="6. Perioada de stocare">
        <LegalList
          items={[
            "Solicitări neconcretizate: până la 24 luni de la ultima interacțiune, dacă nu vă opuneți.",
            "Date contractuale / tranzacții: conform termenelor legale contabile și fiscale (de regulă 5–10 ani).",
            "Consimțământ marketing: până la retragere sau expirarea scopului.",
            "Cookie-uri: conform duratelor din Politica de cookies.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Drepturile persoanei vizate">
        <p>Conform GDPR, aveți dreptul la:</p>
        <LegalList
          items={[
            "informare și acces la date;",
            "rectificare;",
            "ștergere („dreptul de a fi uitat”), în condițiile legii;",
            "restricționarea prelucrării;",
            "portabilitatea datelor;",
            "opoziție față de prelucrare bazată pe interes legitim;",
            "retragerea consimțământului (fără a afecta legalitatea prelucrării anterioare);",
            "depunere plângere la ANSPDCP.",
          ]}
        />
        <p>
          ANSPDCP:{" "}
          <a
            href="https://www.dataprotection.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C8102E] hover:underline"
          >
            www.dataprotection.ro
          </a>
        </p>
        <p>
          Pentru exercitarea drepturilor:{" "}
          <a href={`mailto:${COMPANY.dpoEmail}`} className="text-[#C8102E] hover:underline">
            {COMPANY.dpoEmail}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="8. Securitatea datelor">
        <p>
          Aplicăm măsuri tehnice și organizatorice rezonabile (HTTPS, acces
          restricționat, parole, backup) pentru protejarea datelor împotriva
          accesului neautorizat, pierderii sau alterării.
        </p>
      </LegalSection>

      <LegalSection title="9. Minori">
        <p>
          Site-ul nu este destinat persoanelor sub 16 ani. Nu colectăm în mod
          intenționat date de la minori.
        </p>
      </LegalSection>

      <LegalSection title="10. Modificări">
        <p>
          Putem actualiza această politică. Versiunea curentă este publicată pe{" "}
          {COMPANY.website}/politica-de-confidentialitate cu data actualizării:{" "}
          {COMPANY.legalLastUpdated}.
        </p>
        <p>
          Vezi și:{" "}
          <Link href="/politica-cookies" className="text-[#C8102E] hover:underline">
            Politica de cookies
          </Link>
          ,{" "}
          <Link href="/termeni-si-conditii" className="text-[#C8102E] hover:underline">
            Termeni și condiții
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
