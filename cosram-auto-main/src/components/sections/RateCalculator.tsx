"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Clock, ExternalLink, FileText, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { calculateLoan, formatEuro } from "@/lib/finance";
import { financePartners, financingRequiredDocuments, getFinancePartner, type FinancePartnerId } from "@/data/finance-partners";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("ro-RO"));
  useEffect(() => { spring.set(value); }, [value, spring]);
  return <motion.span>{display}</motion.span>;
}

function buildWhatsAppLink(partnerName: string, price: number, downPercent: number, months: number, monthly: number) {
  const text = encodeURIComponent(`Salut! Interesat finanțare ${partnerName}.\nPreț: ${formatEuro(price)}\nAvans: ${downPercent}%\nDurată: ${months} luni\nRată: ${formatEuro(monthly)}/lună`);
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
    setPrice(p.defaultPrice);
    setDownPercent(p.defaultDownPayment);
    setMonths(p.defaultDuration);
  }, [partnerId]);

  const loan = useMemo(() => {
    const calc = partner.calculation;
    return calculateLoan({
      price,
      downPaymentPercent: downPercent,
      months,
      annualNominalRatePercent: calc.type === "annual" ? calc.ratePercent : undefined,
      monthlyRatePercent: calc.type === "monthly" ? calc.ratePercent : undefined,
    });
  }, [price, downPercent, months, partner]);

  return (
    <section id="rate" className="bg-[#F7F7F7] py-24 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div className="space-y-4">
          {financePartners.map((p) => (
            <button key={p.id} onClick={() => setPartnerId(p.id)} className={cn("w-full bg-white p-6 rounded-2xl border text-left", p.id === partnerId ? "border-[#C8102E]" : "border-gray-200")}>
              <div className="flex justify-between">
                <span className="font-bold text-lg">{p.name}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">{p.badge}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{p.tagline}</p>
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm md:p-8">
          <h3 className="font-bold text-2xl text-gray-900">{partner.name}</h3>
          <div className="mt-8 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Preț mașină</label>
                <span className="text-xl font-bold text-[#C8102E]">{formatEuro(price)}</span>
              </div>
              <input type="range" min={partner.minPrice} max={partner.maxPrice} step={1} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-[#C8102E]" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatEuro(partner.minPrice)}</span>
                <span>{formatEuro(partner.maxPrice)}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Avans ({downPercent}%)</label>
              <div className="grid grid-cols-4 gap-2">
                {partner.downPayments.map((p) => (
                  <button key={p} onClick={() => setDownPercent(p)} className={cn("py-2 rounded-xl text-sm font-semibold", downPercent === p ? "bg-[#C8102E] text-white" : "bg-gray-100")}>{p}%</button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Durată</label>
              <div className="flex gap-2">
                {partner.durations.map((m) => (
                  <button key={m} onClick={() => setMonths(m)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold", months === m ? "bg-[#C8102E] text-white" : "bg-gray-100")}>{m} luni</button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-black p-6 rounded-2xl text-white">
            <span className="text-xs text-gray-400">Rată lunară estimată</span>
            <div className="text-4xl font-black mt-1"><AnimatedNumber value={loan.monthlyPayment} /> lei / lună</div>
          </div>

          <a href={buildWhatsAppLink(partner.name, price, downPercent, months, loan.monthlyPayment)} target="_blank" rel="noopener noreferrer" className="mt-6 flex w-full justify-center bg-[#C8102E] py-4 text-white font-bold rounded-2xl">
            Aplică pentru finanțare
          </a>
        </div>
      </div>
    </section>
  );
}
