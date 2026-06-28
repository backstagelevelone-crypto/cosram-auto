"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  Percent,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { calculateLoan, formatEuro } from "@/lib/finance";
import {
  financePartners,
  financingRequiredDocuments,
  getFinancePartner,
  type FinancePartnerId,
} from "@/data/finance-partners";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString("ro-RO")
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

function buildWhatsAppLink(
  partnerName: string,
  price: number,
  downPercent: number,
  months: number,
  monthly: number
) {
  const text = encodeURIComponent(
    `Salut! Sunt interesat de finanțare prin ${partnerName}.\n` +
      `Mașină: ${formatEuro(price)}\n` +
      `Avans: ${downPercent}%\n` +
      `Durată: ${months} luni\n` +
      `Rată estimată: ${formatEuro(monthly)}/lună`
  );
  return `${SITE.whatsapp}?text=${text}`;
}

export default function RateCalculator() {
  const [partnerId, setPartnerId] = useState<FinancePartnerId>("tbi");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  const partner = getFinancePartner(partnerId);
  const [price, setPrice] = useState(partner.defaultPrice);
  const [downPercent, setDownPercent] = useState(partner.defaultDownPayment);
  const [months, setMonths] = useState(partner.defaultDuration);

  useEffect(() => {
    const p = getFinancePartner(partnerId);
    setPrice((prev) => Math.min(Math.max(prev, p.minPrice), p.maxPrice));
    setDownPercent(p.defaultDownPayment);
    setMonths(p.defaultDuration);
  }, [partnerId]);

  const loan = useMemo(() => {
    const calc = partner.calculation;
    if (calc.type === "annual") {
      return calculateLoan({
        price,
        downPaymentPercent: downPercent,
        months,
        annualNominalRatePercent: calc.ratePercent,
      });
    }
    return calculateLoan({
      price,
      downPaymentPercent: downPercent,
      months,
      monthlyRatePercent: calc.ratePercent,
    });
  }, [price, downPercent, months, partner]);

  return (
    <section id="rate" className="relative overflow-hidden bg-[#F7F7F7] py-24 px-6 md:px-12 lg:px-20">
      <div className="hero-diagonal-grid pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 max-w-2xl"
        >
          <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            Finanțare
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-[#111111] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Finanțare în{" "}
            <span className="text-[#C8102E]">15 minute.</span>
          </h2>
          <p className="mt-4 font-[family-name:var(--font-outfit)] text-base leading-relaxed text-[#6B6B6B]">
            Alege partenerul potrivit, calculează rata lunară și aplică direct
            online — fără drumuri inutile.
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {financePartners.map((p) => {
              const selected = p.id === partnerId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPartnerId(p.id)}
                  className={cn(
                    "group w-full rounded-2xl border bg-white p-6 text-left transition-all duration-300 md:p-7",
                    selected
                      ? "border-[#C8102E]/30 shadow-[0_12px_40px_rgba(200,16,46,0.08)] ring-1 ring-[#C8102E]/20"
                      : "border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 items-center">
                      <Image
                        src={p.logo}
                        alt={p.name}
                        width={p.logoWidth}
                        height={p.logoHeight}
                        unoptimized
                        className="h-9 w-auto object-contain md:h-10"
                      />
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1 font-[family-name:var(--font-outfit)] text-[11px] font-semibold uppercase tracking-wide",
                        selected
                          ? "bg-[#C8102E] text-white"
                          : "bg-[#F7F7F7] text-[#6B6B6B]"
                      )}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <p className="mt-4 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#6B6B6B]">
                    {p.tagline}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {p.benefits.slice(0, 4).map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 font-[family-name:var(--font-outfit)] text-sm text-[#111111]"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {selected && p.benefits.length > 4 && (
                    <ul className="mt-2 space-y-2.5 border-t border-[rgba(0,0,0,0.06)] pt-4">
                      {p.benefits.slice(4).map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2.5 font-[family-name:var(--font-outfit)] text-sm text-[#111111]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="font-[family-name:var(--font-outfit)] text-xs text-[#6B6B6B]">
                      {selected ? "Selectat pentru calcul" : "Click pentru calcul"}
                    </span>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-[family-name:var(--font-outfit)] text-xs font-medium text-[#C8102E] hover:underline"
                    >
                      Site oficial
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </button>
              );
            })}

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Clock, label: "Aprobare rapidă" },
                { icon: Shield, label: "Fără CASCO obligatoriu" },
                { icon: Percent, label: "Rate fixe / clare" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/70 px-3 py-4 text-center"
                >
                  <Icon className="mx-auto h-4 w-4 text-[#C8102E]" />
                  <p className="mt-2 font-[family-name:var(--font-outfit)] text-[11px] leading-snug text-[#6B6B6B]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-5">
              <div>
                <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6B6B]">
                  Calculator rată
                </p>
                <p className="mt-1 font-[family-name:var(--font-syne)] text-lg font-bold text-[#111111]">
                  {partner.name}
                </p>
              </div>
              <span className="rounded-full bg-[#C8102E]/8 px-3 py-1 font-[family-name:var(--font-outfit)] text-xs font-medium text-[#C8102E]">
                {partner.rateLabel}
              </span>
            </div>

            <div className="space-y-8">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label
                    htmlFor="price-range"
                    className="font-[family-name:var(--font-outfit)] text-sm font-medium text-[#111111]"
                  >
                    Preț mașină
                  </label>
                  <span className="font-[family-name:var(--font-syne)] text-lg font-bold text-[#C8102E]">
                    {price.toLocaleString("ro-RO")}€
                  </span>
                </div>
                <input
                  id="price-range"
                  type="range"
                  min={partner.minPrice}
                  max={partner.maxPrice}
                  step={100}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#EFEFEF] accent-[#C8102E] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8102E] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(200,16,46,0.35)]"
                />
                <div className="mt-1 flex justify-between font-[family-name:var(--font-outfit)] text-xs text-[#6B6B6B]">
                  <span>{partner.minPrice.toLocaleString("ro-RO")}€</span>
                  <span>{partner.maxPrice.toLocaleString("ro-RO")}€</span>
                </div>
              </div>

              <div>
                <p className="mb-3 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#111111]">
                  Avans
                </p>
                <div className="flex gap-2">
                  {partner.downPayments.map((dp) => (
                    <button
                      key={dp}
                      type="button"
                      onClick={() => setDownPercent(dp)}
                      className={cn(
                        "flex-1 rounded-full py-2.5 font-[family-name:var(--font-outfit)] text-sm font-medium transition-all duration-300",
                        downPercent === dp
                          ? "bg-[#C8102E] text-white shadow-[0_4px_16px_rgba(200,16,46,0.25)]"
                          : "bg-[#F7F7F7] text-[#6B6B6B] hover:bg-[#EFEFEF]"
                      )}
                    >
                      {dp}%
                    </button>
                  ))}
                </div>
                <p className="mt-2 font-[family-name:var(--font-outfit)] text-xs text-[#6B6B6B]">
                  Avans estimativ: {formatEuro(loan.downPayment)}
                </p>
              </div>

              <div>
                <p className="mb-3 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#111111]">
                  Durată
                </p>
                <div className="flex flex-wrap gap-2">
                  {partner.durations.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setMonths(d)}
                      className={cn(
                        "rounded-full px-4 py-2.5 font-[family-name:var(--font-outfit)] text-sm font-medium transition-all duration-300",
                        months === d
                          ? "bg-[#C8102E] text-white shadow-[0_4px_16px_rgba(200,16,46,0.25)]"
                          : "bg-[#F7F7F7] text-[#6B6B6B] hover:bg-[#EFEFEF]"
                      )}
                    >
                      {d} luni
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#111111] p-6 text-white">
                <p className="font-[family-name:var(--font-outfit)] text-sm text-white/60">
                  Rată lunară estimată
                </p>
                <p className="mt-1 font-[family-name:var(--font-syne)] text-4xl font-bold md:text-5xl">
                  <AnimatedNumber value={loan.monthlyPayment} />€
                  <span className="text-lg font-medium text-white/50"> / lună</span>
                </p>
                <p className="mt-2 font-[family-name:var(--font-outfit)] text-xs text-white/45">
                  {partner.calculation.rateNote}
                </p>

                <button
                  type="button"
                  onClick={() => setShowBreakdown((v) => !v)}
                  className="mt-4 inline-flex items-center gap-1.5 font-[family-name:var(--font-outfit)] text-xs font-medium text-white/70 transition-colors hover:text-white"
                >
                  Detalii calcul
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      showBreakdown && "rotate-180"
                    )}
                  />
                </button>

                {showBreakdown && (
                  <div className="mt-4 space-y-2 border-t border-white/10 pt-4 font-[family-name:var(--font-outfit)] text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">Sumă finanțată</span>
                      <span>{formatEuro(loan.financedAmount)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">Avans</span>
                      <span>{formatEuro(loan.downPayment)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">Cost dobândă estimat</span>
                      <span>{formatEuro(loan.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between gap-4 font-medium">
                      <span className="text-white/55">Total de plată</span>
                      <span>{formatEuro(loan.totalPayable)}</span>
                    </div>
                  </div>
                )}
              </div>

              <p className="font-[family-name:var(--font-outfit)] text-xs leading-relaxed text-[#6B6B6B]">
                {partner.disclaimer}
              </p>

              <a
                href={buildWhatsAppLink(
                  partner.name,
                  price,
                  downPercent,
                  months,
                  loan.monthlyPayment
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] py-4 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition-all duration-300 hover:bg-[#A50E26] hover:shadow-[0_8px_24px_rgba(200,16,46,0.35)]"
              >
                Aplică pentru finanțare
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setDocsOpen(true)}
                className="mx-auto flex items-center justify-center gap-2 rounded-full border border-[rgba(0,0,0,0.1)] bg-[#F7F7F7] px-5 py-2.5 font-[family-name:var(--font-outfit)] text-xs font-medium text-[#6B6B6B] transition-colors hover:border-[#C8102E]/25 hover:bg-white hover:text-[#111111]"
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-[#C8102E]" />
                De ce acte am nevoie?
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={docsOpen} onOpenChange={setDocsOpen}>
        <DialogContent className="gap-0 border-[rgba(0,0,0,0.08)] bg-white p-0 sm:max-w-md">
          <DialogHeader className="border-b border-[rgba(0,0,0,0.06)] px-6 py-5 pr-12">
            <DialogTitle className="font-[family-name:var(--font-syne)] text-lg font-bold text-[#111111]">
              De ce acte am nevoie?
            </DialogTitle>
            <DialogDescription className="font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#6B6B6B]">
              TBI Bank, Mogo, BT Direct · listă orientativă
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5">
            <p className="font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#111111]">
              {financingRequiredDocuments.intro}
            </p>

            <ul className="mt-4 space-y-3">
              {financingRequiredDocuments.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-[family-name:var(--font-outfit)] text-sm text-[#111111]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-5 rounded-xl bg-[#F7F7F7] px-4 py-3 font-[family-name:var(--font-outfit)] text-xs leading-relaxed text-[#6B6B6B]">
              {financingRequiredDocuments.footnote}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
