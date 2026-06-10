import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { COMPANY, CONSUMER_LINKS, LEGAL_LINKS, AGENCY_CREDIT } from "@/lib/company";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { BrandWordmark } from "@/components/BrandWordmark";

const navLinks = [
  ...NAV_LINKS,
  { href: "/#stoc", label: "Vezi stocul" },
];

const legalLinks: {
  href: string;
  label: string;
  external?: boolean;
}[] = [
  ...LEGAL_LINKS,
  { href: CONSUMER_LINKS.anpc, label: "ANPC", external: true },
  {
    href: CONSUMER_LINKS.euOdr,
    label: "Soluționare online litigii (UE)",
    external: true,
  },
];

export default function FooterGlow() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-8 w-full overflow-hidden bg-[#0E0E0E] px-4 pt-16 pb-8 sm:px-6 md:px-12">
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#C8102E]/[0.04] blur-3xl" />
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-[#C8102E]/[0.03] blur-3xl" />
      </div>

      <div className="footer-glass-panel relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1A1A1A] shadow-md ring-1 ring-white/10">
              <Image
                src="/logo.png"
                alt="Cosram Auto"
                width={40}
                height={40}
                className="h-8 w-8 object-contain"
              />
            </span>
            <BrandWordmark variant="on-dark" size="md" />
          </Link>

          <p className="mb-4 max-w-xs text-center text-sm leading-relaxed text-[#9A9A9A] md:text-left">
            Partenerul tău de încredere pentru mașini rulate în Buzău. Finanțare
            rapidă, transparență totală și garanție inclusă.
          </p>

          <div className="space-y-1.5 text-center font-[family-name:var(--font-outfit)] text-[11px] leading-relaxed text-[#6B6B6B] md:text-left">
            <p className="font-semibold tracking-wide text-[#9A9A9A] uppercase">
              {COMPANY.legalName}
            </p>
            <p>{COMPANY.registeredAddress}</p>
            <p>
              CUI {COMPANY.cui} · Reg. Com. {COMPANY.regCom}
            </p>
          </div>

          <div className="mt-5 flex gap-3">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Cosram Auto"
              className="text-[#C8102E]/90 transition hover:text-white"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Cosram Auto"
              className="text-[#C8102E]/90 transition hover:text-white"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-[#C8102E]/80 uppercase">
              Navigare
            </div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#8A8A8A] transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-[#C8102E]/80 uppercase">
              Legal
            </div>
            <ul className="space-y-2">
              {legalLinks.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#8A8A8A] transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8A8A8A] transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-[#C8102E]/80 uppercase">
              Contact
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 md:justify-start"
                >
                  <MessageCircle
                    className="size-4 shrink-0 text-[#C8102E]/90"
                    strokeWidth={1.75}
                  />
                  <span className="text-[#8A8A8A] transition group-hover:text-white">
                    WhatsApp
                  </span>
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8102E]/60 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#C8102E]/80" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="flex items-center justify-center gap-2 md:justify-start"
                >
                  <Phone
                    className="size-4 shrink-0 text-[#C8102E]/90"
                    strokeWidth={1.75}
                  />
                  <span className="text-[#8A8A8A] transition hover:text-white">
                    {SITE.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center justify-center gap-2 md:justify-start"
                >
                  <Mail
                    className="size-4 shrink-0 text-[#C8102E]/90"
                    strokeWidth={1.75}
                  />
                  <span className="text-[#8A8A8A] transition hover:text-white">
                    {SITE.email}
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start justify-center gap-2 md:justify-start">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-[#C8102E]/90"
                    strokeWidth={1.75}
                  />
                  <address className="max-w-[200px] text-left text-[#8A8A8A] not-italic">
                    {SITE.address}
                  </address>
                </div>
              </li>
              <li>
                <div className="flex items-start justify-center gap-2 md:justify-start">
                  <Clock
                    className="mt-0.5 size-4 shrink-0 text-[#C8102E]/90"
                    strokeWidth={1.75}
                  />
                  <div className="space-y-0.5 text-left text-[#8A8A8A]">
                    {SITE.hours.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="relative z-10 mt-10 space-y-2 text-center font-[family-name:var(--font-outfit)] text-xs text-[#6B6B6B]">
        <p>
          © {year}{" "}
          <span className="text-[#C8102E]/90">{COMPANY.brandName}</span> ·{" "}
          {COMPANY.legalName} · Toate drepturile rezervate
        </p>
        <p>
          Acest website a fost realizat de{" "}
          <a
            href={AGENCY_CREDIT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C8102E]/80 underline-offset-2 transition hover:text-[#C8102E] hover:underline"
          >
            {AGENCY_CREDIT.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
