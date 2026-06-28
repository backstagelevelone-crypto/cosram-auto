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
                { icon: FileText, label: "Doar cu buletinul" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex flex-col items-center justify-center rounded-xl bg-white p-3 text-center border border-[rgba(0,0,0,0.05)] shadow-sm">
                    <Icon className="h-5 w-5 text-[#C8102E] mb-1.5" />
                    <span className="font-[family-name:var(--font-outfit)] text-[11px] font-medium text-[#111111] leading-tight">{item.label}</span>
                  </div>
                );
              })}
            </div>
            
            <button 
              type="button" 
              onClick={() => setDocsOpen(true)}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#C8102E]/40 bg-[#C8102E]/5 p-3 font-[family-name:var(--font-outfit)] text-xs font-medium text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Vezi acte necesare dosar finanțare
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm md:p-8"
          >
            <p className="font-[family-name:var(--font-outfit)] text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
              CALCULATOR RATĂ
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-syne)] text-2xl font-bold text-[#111111]">
              {partner.name}
            </h3>

            <div className="mt-8 space-y-6">
