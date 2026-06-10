import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { COMPANY } from "@/lib/company";

export function LegalPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F7F7] pt-[88px] pb-16">
        <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 font-[family-name:var(--font-outfit)] text-sm text-[#6B6B6B]"
          >
            <Link href="/" className="hover:text-[#111111]">
              Acasă
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#111111]">{title}</span>
          </nav>

          <header className="mb-10 border-b border-[rgba(0,0,0,0.08)] pb-8">
            <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
              Document legal
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-[#111111] md:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 font-[family-name:var(--font-outfit)] text-base leading-relaxed text-[#6B6B6B]">
                {description}
              </p>
            )}
            <p className="mt-4 font-[family-name:var(--font-outfit)] text-sm text-[#6B6B6B]">
              Ultima actualizare: {COMPANY.legalLastUpdated} · Operator:{" "}
              {COMPANY.legalName}
            </p>
          </header>

          <article className="legal-prose">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-[family-name:var(--font-syne)] text-xl font-bold text-[#111111]">
        {title}
      </h2>
      <div className="space-y-4 font-[family-name:var(--font-outfit)] text-[15px] leading-[1.75] text-[#2A2A2A]">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
