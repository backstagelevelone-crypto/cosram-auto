"use client";

import { motion } from "framer-motion";
import { Truck, Camera, FileSearch, Wrench, Gift } from "lucide-react";
import { BrandWordmark } from "@/components/BrandWordmark";

const benefits = [
  {
    icon: Truck,
    title: "Livrare",
    description:
      "Cu platformele noastre, direct la domiciliu — alegi ziua și intervalul orar, în toată țara.",
  },
  {
    icon: Camera,
    title: "Poze suplimentare",
    description:
      "La cerere: poze extra, filmulețe și motor la rece, personalizat pentru tine.",
  },
  {
    icon: FileSearch,
    title: "Rapoarte",
    description:
      "Istoric verificat prin CarVertical, reprezentanță și carte service.",
  },
  {
    icon: Wrench,
    title: "Revizie",
    description:
      "Revizie totală gratuită pentru toate mașinile din parc (ulei + filtre).",
  },
];

export default function Livrare() {
  return (
    <section
      id="livrare"
      className="relative overflow-hidden bg-[#111111] py-16 px-6 md:px-12 lg:px-20 lg:py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111008] to-[#0A0A0A]" />
      <div className="hero-texture absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            Servicii incluse
          </p>
          <h2 className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 font-[family-name:var(--font-syne)] text-2xl font-bold text-white md:text-3xl">
            <span>Tot ce primești la</span>
            <BrandWordmark variant="red" size="lg" className="inline-block" />
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#9A9A9A]">
            Livrare, transparență și verificare completă — fără costuri ascunse,
            de la prima vizionare până la chei.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
            >
              <item.icon
                className="mb-2.5 h-5 w-5 text-[#C8102E]"
                strokeWidth={1.75}
              />
              <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold leading-snug text-white">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#9A9A9A] sm:text-xs">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-6 flex justify-center border-t border-white/5 pt-5"
        >
          <p className="inline-flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[10px] leading-snug text-[#6B6B6B] sm:text-[11px]">
            <Gift
              className="h-3 w-3 shrink-0 text-[#C8102E]/80"
              strokeWidth={1.75}
              aria-hidden
            />
            <span>
              Toate mașinile noastre beneficiază de un cadou la achiziție.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
